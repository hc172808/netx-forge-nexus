
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Activity, BarChart4, ChevronLeft, ChevronRight, 
  CreditCard, Database, History, Home, 
  LayoutDashboard, LogOut, PlusCircle, Receipt, 
  Settings, ShoppingCart, Users, Wallet 
} from "lucide-react";
import { useState } from "react";

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  submenu?: NavItem[];
};

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Wallet",
    href: "/wallet",
    icon: Wallet,
  },
  {
    title: "Marketplace",
    href: "/marketplace",
    icon: ShoppingCart,
  },
  {
    title: "Token Creation",
    href: "/token-creation",
    icon: PlusCircle,
  },
  {
    title: "Transaction History",
    href: "/history",
    icon: History,
  },
  {
    title: "Exchange",
    href: "/exchange",
    icon: CreditCard,
  },
  {
    title: "Explorer",
    href: "/explorer",
    icon: Database,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart4,
  },
];

const adminNavItems: NavItem[] = [
  {
    title: "Admin Panel",
    href: "/admin",
    icon: Settings,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={cn(
      "bg-sidebar text-sidebar-foreground border-r border-border flex flex-col h-screen sticky top-0 transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center h-16 px-4 border-b border-border justify-between">
        {!collapsed && (
          <Link to="/" className="flex items-center space-x-2">
            <Activity className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">NETX Forge</span>
          </Link>
        )}
        {collapsed && (
          <Link to="/" className="mx-auto">
            <Activity className="w-6 h-6 text-primary" />
          </Link>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <ScrollArea className="flex-1 py-2">
        <nav className="grid gap-1 px-2">
          {mainNavItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
                location.pathname === item.href && "bg-secondary text-foreground font-medium",
                collapsed && "justify-center px-0"
              )}
            >
              <item.icon className={cn("h-5 w-5", location.pathname === item.href && "text-primary")} />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
        
        {!collapsed && <div className="py-2 px-4 text-xs font-medium text-muted-foreground">Admin</div>}
        
        <nav className="grid gap-1 px-2">
          {adminNavItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
                location.pathname === item.href && "bg-secondary text-foreground font-medium",
                collapsed && "justify-center px-0"
              )}
            >
              <item.icon className={cn("h-5 w-5", location.pathname === item.href && "text-primary")} />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      
      <div className="border-t border-border p-4">
        <Link 
          to="/logout" 
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
            collapsed && "justify-center px-0"
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );
}
