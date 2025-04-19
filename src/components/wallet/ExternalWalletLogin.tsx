
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface ExternalWalletLoginProps {
  onSuccess?: () => void;
}

const ExternalWalletLogin: React.FC<ExternalWalletLoginProps> = ({ onSuccess }) => {
  const { loginWithExternalWallet } = useAuth();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleWalletLogin = async (walletName: string) => {
    if (isLoading) return;
    
    setIsLoading(walletName);
    try {
      const success = await loginWithExternalWallet(walletName);
      if (success) {
        toast.success(`Connected to ${walletName}`, {
          description: "Wallet connected successfully"
        });
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error(`Error connecting to ${walletName}:`, error);
      toast.error(`Failed to connect to ${walletName}`, {
        description: "Please try again"
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Connect Wallet</CardTitle>
        <CardDescription>
          Connect to an external wallet provider
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          variant="outline" 
          className="w-full justify-between"
          onClick={() => handleWalletLogin("Phantom")}
          disabled={!!isLoading}
        >
          <div className="flex items-center">
            <img 
              src="https://phantom.app/favicon.ico" 
              alt="Phantom" 
              className="w-5 h-5 mr-2" 
            />
            Phantom Wallet
          </div>
          {isLoading === "Phantom" && <Loader2 className="h-4 w-4 animate-spin" />}
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-between"
          onClick={() => handleWalletLogin("MetaMask")}
          disabled={!!isLoading}
        >
          <div className="flex items-center">
            <img 
              src="https://metamask.io/favicon.ico" 
              alt="MetaMask" 
              className="w-5 h-5 mr-2" 
            />
            MetaMask
          </div>
          {isLoading === "MetaMask" && <Loader2 className="h-4 w-4 animate-spin" />}
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-between"
          onClick={() => handleWalletLogin("Trust Wallet")}
          disabled={!!isLoading}
        >
          <div className="flex items-center">
            <img 
              src="https://trustwallet.com/favicon.ico" 
              alt="Trust Wallet" 
              className="w-5 h-5 mr-2" 
            />
            Trust Wallet
          </div>
          {isLoading === "Trust Wallet" && <Loader2 className="h-4 w-4 animate-spin" />}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExternalWalletLogin;
