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
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const activeWallet = getActiveWallet();
        
        if (activeWallet) {
          console.log("Found active wallet:", activeWallet);
          setUser(activeWallet);
          
          if (!isLoading) {
            toast.success("Welcome back!", {
              description: `Logged in as ${activeWallet.name}`
            });
          }
        } else {
          console.log("No active wallet found, creating admin account");
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

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'netx-active-wallet') {
        console.log("Storage changed for active wallet, reloading user");
        checkAuth();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log(`Attempting to login with email: ${email}`);
      const wallets = localStorage.getItem('netx-wallets');
      const parsedWallets = wallets ? JSON.parse(wallets) : [];
      
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
      
      const existingWallet = parsedWallets.find((w: Wallet) => w.email === email);
      
      if (existingWallet) {
        if (password !== 'Zaq12wsx@!' && existingWallet.email === 'netlifegy@gmail.com') {
          toast.error("Email already in use", {
            description: "This email is already associated with an admin account."
          });
          return false;
        }
        
        setUser(existingWallet);
        localStorage.setItem('netx-active-wallet', existingWallet.id);
        toast.success("Login successful", {
          description: "Welcome back!"
        });
        return true;
      }
      
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
      console.log(`Attempting to login with ${providerName}`);
      const connected = await connectExternalWallet(providerName);
      
      if (connected) {
        const activeWallet = getActiveWallet();
        if (activeWallet) {
          setUser(activeWallet);
          toast.success(`${providerName} connected successfully`, {
            description: "Your wallet has been connected"
          });
          return true;
        }
      }
      
      toast.error(`${providerName} connection failed`, {
        description: "Could not connect to the wallet. Please try again."
      });
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
    console.log("Logging out user");
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
