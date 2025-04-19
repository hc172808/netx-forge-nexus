
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";
import { 
  getActiveWallet, 
  Wallet, 
  createWallet, 
  importWalletWithSeedPhrase, 
  connectExternalWallet 
} from '@/services/walletService';

interface AuthContextType {
  user: Wallet | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithWallet: (recoveryPhrase: string, password: string) => Promise<boolean>;
  loginWithExternalWallet: (providerName: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  loginWithWallet: async () => false,
  loginWithExternalWallet: async () => false,
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
          try {
            const adminWallet = createWallet(
              'swift', 
              'Zaq12wsx@!', 
              'Kenrick Hector',
              undefined,
              'netlifegy@gmail.com',
              'netlifegy'
            );
            
            if (adminWallet) {
              setUser(adminWallet);
              toast.success("Admin account created automatically", {
                description: "You've been logged in as admin"
              });
              console.log("Admin account created:", adminWallet);
            }
          } catch (error) {
            console.error("Error creating admin wallet:", error);
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
      // First check if this is the admin account
      const wallets = localStorage.getItem('netx-wallets');
      const parsedWallets = wallets ? JSON.parse(wallets) : [];
      
      // Check if this is the admin login
      if (email === 'netlifegy@gmail.com' && password === 'Zaq12wsx@!') {
        const adminWallet = parsedWallets.find((w: Wallet) => w.email === 'netlifegy@gmail.com');
        if (adminWallet) {
          setUser(adminWallet);
          localStorage.setItem('netx-active-wallet', adminWallet.id);
          toast.success("Login successful", {
            description: "Welcome back, Admin!"
          });
          return true;
        }
      }
      
      // Check if the email exists in any wallet
      const existingWallet = parsedWallets.find((w: Wallet) => w.email === email);
      
      if (existingWallet) {
        // In a real app, we would verify the password here
        // For now, we'll just simulate successful login
        setUser(existingWallet);
        localStorage.setItem('netx-active-wallet', existingWallet.id);
        toast.success("Login successful", {
          description: "Welcome back!"
        });
        return true;
      }
      
      // If no wallet with this email exists, create a new one
      const newWallet = createWallet('swift', password, 'New User', undefined, email);
      if (newWallet) {
        setUser(newWallet);
        toast.success("Account created successfully!", {
          description: "You've been automatically logged in"
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
      console.log("Attempting wallet login with seed phrase");
      
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
  
  const loginWithExternalWallet = async (providerName: string): Promise<boolean> => {
    try {
      const connected = await connectExternalWallet(providerName);
      if (connected) {
        const activeWallet = getActiveWallet();
        if (activeWallet) {
          setUser(activeWallet);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error(`${providerName} login error:`, error);
      toast.error("Login error", {
        description: `An error occurred during ${providerName} login. Please try again.`
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('netx-active-wallet');
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
        loginWithExternalWallet,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
