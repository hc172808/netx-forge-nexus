
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Activity, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <Activity className="h-12 w-12 text-primary mx-auto mb-6" />
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          This page doesn't exist in the NETX Forge Nexus
        </p>
        <p className="text-muted-foreground mb-4">
          The page "{location.pathname}" could not be found.
        </p>
        <div className="space-y-2">
          <Button asChild size="lg">
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Return to Dashboard
            </Link>
          </Button>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Link to="/wallet" className="text-primary hover:underline">Wallet</Link>
            <Link to="/marketplace" className="text-primary hover:underline">Marketplace</Link>
            <Link to="/exchange" className="text-primary hover:underline">Exchange</Link>
            <Link to="/explorer" className="text-primary hover:underline">Explorer</Link>
            <Link to="/admin" className="text-primary hover:underline">Admin</Link>
            <Link to="/analytics" className="text-primary hover:underline">Analytics</Link>
            <Link to="/history" className="text-primary hover:underline">History</Link>
            <Link to="/settings" className="text-primary hover:underline">Settings</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
