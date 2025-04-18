
import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useAuth } from "@/contexts/AuthContext";

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { user } = useAuth();
  
  // Automatically close sidebar on mobile when changing routes
  useEffect(() => {
    if (!isDesktop) {
      setSidebarOpen(false);
    }
  }, [location, isDesktop]);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile sidebar toggle */}
      {!isDesktop && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="fixed top-4 left-4 z-50"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      )}
      
      {/* Sidebar with conditional styling for mobile/desktop */}
      <div 
        className={`
          fixed top-0 left-0 z-40 h-full transition-transform duration-300 ease-in-out
          ${isDesktop ? 'translate-x-0 w-64' : sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'}
        `}
      >
        <Sidebar />
      </div>
      
      {/* Overlay for mobile sidebar */}
      {!isDesktop && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Main content */}
      <main 
        className={`
          flex-1 overflow-hidden transition-all duration-300 ease-in-out
          ${isDesktop ? 'ml-64' : ''}
        `}
      >
        <div className="container py-6 px-4 md:px-6 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
