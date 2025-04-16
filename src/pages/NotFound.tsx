
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
          <div className="mt-4">
            <Link to="/wallet" className="text-primary hover:underline mx-2">Wallet</Link>
            <Link to="/marketplace" className="text-primary hover:underline mx-2">Marketplace</Link>
            <Link to="/exchange" className="text-primary hover:underline mx-2">Exchange</Link>
            <Link to="/explorer" className="text-primary hover:underline mx-2">Explorer</Link>
            <Link to="/admin" className="text-primary hover:underline mx-2">Admin</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
