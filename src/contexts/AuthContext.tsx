
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";
import { getActiveWallet, Wallet } from '@/services/walletService';

interface AuthContextType {
  user: Wallet | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithWallet: (recoveryPhrase: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  loginWithWallet: async () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Wallet | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const activeWallet = getActiveWallet();
        setUser(activeWallet);
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // For now, this is a simple check as we don't have a real backend yet
      // This would be replaced with a real API call
      if (email === 'admin@example.com' && password === 'password') {
        // Simulate getting the active wallet
        const activeWallet = getActiveWallet();
        if (activeWallet) {
          setUser(activeWallet);
          toast({
            title: "Login successful",
            description: "You are now logged in",
          });
          return true;
        }
      }
      
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      return false;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const loginWithWallet = async (recoveryPhrase: string, password: string): Promise<boolean> => {
    try {
      // This would be replaced with a real API call to validate the wallet
      // For demo purposes, just check if recovery phrase is provided
      if (recoveryPhrase && password) {
        // Simulate getting the active wallet
        const activeWallet = getActiveWallet();
        if (activeWallet) {
          setUser(activeWallet);
          toast({
            title: "Login successful",
            description: "You are now logged in with your wallet",
          });
          return true;
        }
      }
      
      toast({
        title: "Wallet login failed",
        description: "Invalid recovery phrase or password",
        variant: "destructive",
      });
      return false;
    } catch (error) {
      console.error("Wallet login error:", error);
      toast({
        title: "Login error",
        description: "An error occurred during wallet login. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    // Clear any local storage/cookies
    // localStorage.removeItem("auth-token"); 
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider 
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithWallet,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
