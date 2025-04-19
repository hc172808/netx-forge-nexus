
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";
import { getActiveWallet, Wallet, createWallet, importWalletWithSeedPhrase } from '@/services/walletService';

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
        if (activeWallet) {
          setUser(activeWallet);
          toast.success("Welcome back!", {
            description: `Logged in as ${activeWallet.name}`
          });
        } else {
          // Create admin account if no wallet exists
          const adminWallet = createWallet(
            'swift', 
            'Zaq12wsx@!', 
            'kenrick hector',
            undefined,
            'netlifegy@gmail.com',
            'netlifegy'
          );
          
          if (adminWallet) {
            setUser(adminWallet);
            toast.success("Admin account created automatically", {
              description: "You've been logged in as admin"
            });
          }
        }
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
      // Create a new wallet if this is the first login
      const existingWallet = getActiveWallet();
      if (!existingWallet) {
        const newWallet = createWallet('swift', password, 'New User', undefined, email);
        if (newWallet) {
          setUser(newWallet);
          toast.success("Account created successfully!", {
            description: "You've been automatically logged in"
          });
          return true;
        }
      } else if (email === 'netlifegy@gmail.com' && password === 'Zaq12wsx@!') {
        setUser(existingWallet);
        toast.success("Login successful", {
            description: "Welcome back!"
        });
        return true;
      }
      
      toast.error("Login failed", {
        description: "Invalid email or password"
      });
      return false;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login error", {
        description: "An error occurred during login. Please try again."
      });
      return false;
    }
  };

  const loginWithWallet = async (recoveryPhrase: string, password: string): Promise<boolean> => {
    try {
      const importedWallet = importWalletWithSeedPhrase(recoveryPhrase, password);
      if (importedWallet) {
        setUser(importedWallet);
        toast.success("Wallet login successful", {
            description: "Welcome back!"
        });
        return true;
      }
      
      toast.error("Wallet login failed", {
        description: "Invalid recovery phrase or password"
      });
      return false;
    } catch (error) {
      console.error("Wallet login error:", error);
      toast.error("Login error", {
        description: "An error occurred during wallet login. Please try again."
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    toast.success("Logged out", {
      description: "You have been logged out successfully"
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
