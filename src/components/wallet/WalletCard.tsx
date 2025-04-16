
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, ExternalLink, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface WalletCardProps {
  address: string;
  balance: string;
  tokenSymbol: string;
  onChange?: () => void;
  onSend?: () => void;
  onReceive?: () => void;
  className?: string;
}

export function WalletCard({
  address,
  balance,
  tokenSymbol,
  onChange,
  onSend,
  onReceive,
  className,
}: WalletCardProps) {
  const [showAddress, setShowAddress] = useState(false);
  
  const formatAddress = (address: string) => {
    if (!showAddress) {
      return address.substring(0, 6) + "..." + address.substring(address.length - 4);
    }
    return address;
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    // You would normally show a toast notification here
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 pb-8">
        <CardTitle className="flex justify-between">
          <span>My NETX Wallet</span>
          {onChange && (
            <Button variant="ghost" size="sm" onClick={onChange}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Change
            </Button>
          )}
        </CardTitle>
        <CardDescription>Manage your assets</CardDescription>
      </CardHeader>
      <CardContent className="p-6 -mt-6">
        <div className="bg-card border rounded-lg p-4 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Wallet Address</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={() => setShowAddress(!showAddress)}
            >
              {showAddress ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <div className="flex items-center gap-2 mb-6">
            <code className="font-mono text-sm bg-secondary/50 px-2 py-1 rounded flex-1 overflow-hidden text-ellipsis">
              {formatAddress(address)}
            </code>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8" 
              onClick={copyToClipboard}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground mb-1">
            Balance
          </div>
          <div className="text-3xl font-bold mb-2">
            {balance} <span className="text-lg font-medium">{tokenSymbol}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 px-6">
        <Button 
          className="flex-1 bg-primary"
          onClick={onSend}
        >
          Send
        </Button>
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={onReceive}
        >
          Receive
        </Button>
      </CardFooter>
    </Card>
  );
}
