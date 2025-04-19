
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout action
    logout();
    
    // Redirect to login page
    navigate("/login");
  }, [logout, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold mb-2">Logging out...</h1>
        <p className="text-muted-foreground">You will be redirected shortly.</p>
      </div>
    </div>
  );
};

export default Logout;
