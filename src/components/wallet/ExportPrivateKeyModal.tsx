
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Copy, Eye, EyeOff, ShieldAlert } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExportPrivateKeyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  walletAddress: string;
}

export function ExportPrivateKeyModal({
  open,
  onOpenChange,
  walletAddress,
}: ExportPrivateKeyModalProps) {
  const [password, setPassword] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock private key - in a real app this would be fetched securely
  const mockPrivateKey = "3a1076bf45ab87712ad64ccb3b10217737f7faacbf2872e88fdd9a537d8fe266";

  const handleExport = () => {
    // In a real app, this would decrypt and verify the private key
    if (password === "password") { // Mock password check
      setPrivateKey(mockPrivateKey);
      setError(null);
    } else {
      setError("Invalid password");
      setPrivateKey("");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(privateKey);
    toast({
      title: "Copied to Clipboard",
      description: "Your private key has been copied securely.",
    });
  };

  const resetForm = () => {
    setPassword("");
    setPrivateKey("");
    setShowPrivateKey(false);
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) {
        resetForm();
      }
      onOpenChange(newOpen);
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export Private Key</DialogTitle>
          <DialogDescription>
            Access your private key for this wallet
          </DialogDescription>
        </DialogHeader>
        
        <Alert variant="destructive" className="my-4">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Security Warning</AlertTitle>
          <AlertDescription>
            Never share your private key with anyone. Anyone with your private key has complete control over your wallet.
          </AlertDescription>
        </Alert>
        
        <div className="grid gap-4 py-4">
          {!privateKey ? (
            <>
              <Label htmlFor="walletAddress">Wallet Address</Label>
              <Input 
                id="walletAddress" 
                value={walletAddress} 
                readOnly 
                className="bg-secondary/20"
              />
              
              <div className="grid gap-2">
                <Label htmlFor="password">Enter Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your wallet password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="privateKey">Private Key</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPrivateKey(!showPrivateKey)}
                    className="h-8 w-8 p-0"
                  >
                    {showPrivateKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    id="privateKey"
                    type={showPrivateKey ? "text" : "password"}
                    value={privateKey}
                    readOnly
                    className="font-mono text-xs"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyToClipboard}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Make sure no one is watching your screen
                </p>
              </div>
              
              <Alert className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Store this private key in a secure location, such as a password manager or hardware device.
                </AlertDescription>
              </Alert>
            </>
          )}
        </div>
        
        <DialogFooter>
          {!privateKey ? (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleExport}>
                Export Key
              </Button>
            </>
          ) : (
            <Button onClick={handleClose}>
              Done
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
