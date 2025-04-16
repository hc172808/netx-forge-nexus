
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Copy, Download, File, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BackupWalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  walletAddress: string;
}

export function BackupWalletModal({
  open,
  onOpenChange,
  walletAddress,
}: BackupWalletModalProps) {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [seedPhrase, setSeedPhrase] = useState("");
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);
  
  // Mock seed phrase - in a real app this would be generated securely
  const mockSeedPhrase = "witch collapse practice feed shame open despair creek road again ice least";
  
  const handleBackup = (type: string) => {
    if (type === "seed") {
      setSeedPhrase(mockSeedPhrase);
    } else if (type === "file") {
      // In a real app, this would create an encrypted file
      const blob = new Blob(
        [`{"address":"${walletAddress}","encrypted":"...","version":"1.0"}`], 
        { type: "application/json" }
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "wallet-backup.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Backup Created",
        description: "Your wallet backup file has been downloaded.",
      });
    } else if (type === "cloud") {
      toast({
        title: "Cloud Backup Initiated",
        description: "Connecting to Google Drive for backup...",
      });
    }
  };
  
  const copySeedPhrase = () => {
    navigator.clipboard.writeText(seedPhrase);
    toast({
      title: "Copied to Clipboard",
      description: "Your seed phrase has been copied.",
    });
  };
  
  const resetForm = () => {
    setPassword("");
    setConfirmPassword("");
    setSeedPhrase("");
    setShowSeedPhrase(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) {
        resetForm();
      }
      onOpenChange(newOpen);
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Backup Wallet</DialogTitle>
          <DialogDescription>
            Securely backup your wallet to recover it later if needed
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="seed" className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="seed">Seed Phrase</TabsTrigger>
            <TabsTrigger value="file">File Backup</TabsTrigger>
            <TabsTrigger value="cloud">Cloud Backup</TabsTrigger>
          </TabsList>
          
          <TabsContent value="seed">
            {!seedPhrase ? (
              <div className="space-y-4 py-2">
                <p className="text-sm text-muted-foreground">
                  Your seed phrase is the master key to your wallet. Write it down and store it in a secure location.
                </p>
                
                <div className="space-y-2">
                  <Button onClick={() => handleBackup("seed")} className="w-full">
                    Show Recovery Phrase
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 py-2">
                <Card className="p-4 bg-secondary/20">
                  <p className="text-center font-mono break-words text-sm">
                    {seedPhrase}
                  </p>
                </Card>
                
                <div className="flex justify-center">
                  <Button variant="outline" size="sm" onClick={copySeedPhrase}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy to clipboard
                  </Button>
                </div>
                
                <p className="text-sm text-destructive font-medium text-center">
                  IMPORTANT: Never share your seed phrase with anyone!
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="file">
            <div className="space-y-4 py-2">
              <p className="text-sm text-muted-foreground">
                Export an encrypted backup file containing your wallet data.
              </p>
              
              <div className="space-y-2">
                <Label htmlFor="backupPassword">Password</Label>
                <Input 
                  id="backupPassword" 
                  type="password"
                  placeholder="Create a backup password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmBackupPassword">Confirm Password</Label>
                <Input 
                  id="confirmBackupPassword" 
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              
              <Button 
                onClick={() => handleBackup("file")} 
                disabled={!password || password !== confirmPassword}
                className="w-full"
              >
                <Save className="mr-2 h-4 w-4" />
                Download Backup File
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="cloud">
            <div className="space-y-4 py-2">
              <p className="text-sm text-muted-foreground">
                Store an encrypted backup of your wallet in your Google Drive account.
              </p>
              
              <div className="text-center py-6">
                <File className="mx-auto h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-medium mb-2">Google Drive Backup</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your wallet data will be encrypted before it's stored in your Google Drive
                </p>
              </div>
              
              <Button 
                onClick={() => handleBackup("cloud")} 
                className="w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                Connect to Google Drive
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
