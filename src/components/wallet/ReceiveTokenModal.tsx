
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Copy } from "lucide-react";
import QRCode from "react-qr-code";

interface ReceiveTokenModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  walletAddress: string;
  tokenSymbol: string;
}

export function ReceiveTokenModal({
  open,
  onOpenChange,
  walletAddress,
  tokenSymbol,
}: ReceiveTokenModalProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    // You would normally show a toast notification here
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Receive {tokenSymbol}</DialogTitle>
          <DialogDescription>
            Share your wallet address to receive {tokenSymbol} tokens.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center py-4 space-y-4">
          <div className="bg-white p-4 rounded-lg">
            <QRCode value={walletAddress} size={200} />
          </div>
          <div className="w-full space-y-2">
            <p className="text-sm text-muted-foreground">Your Wallet Address</p>
            <div className="flex items-center gap-2">
              <code className="font-mono text-sm bg-secondary/50 px-3 py-2 rounded flex-1 overflow-hidden break-all">
                {walletAddress}
              </code>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={copyToClipboard}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
