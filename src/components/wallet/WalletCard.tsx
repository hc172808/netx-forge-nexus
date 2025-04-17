
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, CreditCard, Info, Send, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface WalletCardProps {
  address: string;
  balance: string;
  tokenSymbol: string;
  onSend: () => void;
  onReceive: () => void;
  onCashOut?: () => void;
}

export function WalletCard({ 
  address, 
  balance, 
  tokenSymbol, 
  onSend, 
  onReceive,
  onCashOut
}: WalletCardProps) {
  const [isAddressCopied, setIsAddressCopied] = useState(false);
  
  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(address);
    setIsAddressCopied(true);
    toast.success("Address copied to clipboard");
    
    setTimeout(() => {
      setIsAddressCopied(false);
    }, 2000);
  };

  // Format address for display
  const formattedAddress = `${address.substring(0, 8)}...${address.substring(address.length - 8)}`;
  
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center space-x-2">
          <Wallet className="h-5 w-5 text-primary" />
          <span>My Wallet</span>
        </CardTitle>
        <CardDescription>Manage your funds securely</CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-4">
          <div className="flex flex-col space-y-1.5">
            <div className="text-sm font-medium text-muted-foreground">Address</div>
            <div className="flex items-center">
              <div className="text-sm font-medium mr-2 truncate">{formattedAddress}</div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={copyAddressToClipboard}
              >
                <Copy className={`h-3.5 w-3.5 ${isAddressCopied ? 'text-green-500' : 'text-muted-foreground'}`} />
                <span className="sr-only">Copy address</span>
              </Button>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <div className="text-sm font-medium text-muted-foreground">Balance</div>
            <div className="flex items-end">
              <div className="text-2xl font-bold">{balance}</div>
              <div className="ml-1 text-sm font-medium">{tokenSymbol}</div>
            </div>
            <div className="text-xs text-muted-foreground">
              Estimated value: ${(parseFloat(balance.replace(/,/g, '')) * 0.0845).toFixed(2)} USD
            </div>
          </div>
          
          <div className="pt-2 grid grid-cols-2 gap-2">
            <Button 
              variant="default" 
              className="w-full" 
              onClick={onSend}
            >
              <Send className="mr-2 h-4 w-4" />
              Send
            </Button>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={onReceive}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Receive
            </Button>
          </div>
          
          {onCashOut && (
            <Button 
              variant="secondary" 
              className="w-full" 
              onClick={onCashOut}
            >
              <Info className="mr-2 h-4 w-4" />
              Cash Out
            </Button>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="link" className="p-0 h-auto text-xs w-full text-muted-foreground">
          View transaction history
        </Button>
      </CardFooter>
    </Card>
  );
}
