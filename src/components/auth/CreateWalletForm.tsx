
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { KeyRound, AlertTriangle, Copy, Eye, EyeOff, RefreshCw } from "lucide-react";
import { createWallet, generateSeedPhrase, importWalletWithSeedPhrase } from "@/services/walletService";
import { toast } from "sonner";

interface CreateWalletFormProps {
  onSuccess?: () => void;
}

export function CreateWalletForm({ onSuccess }: CreateWalletFormProps) {
  const [activeTab, setActiveTab] = useState<"create" | "import">("create");
  const [walletName, setWalletName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [seedPhrase, setSeedPhrase] = useState(generateSeedPhrase());
  const [importSeedPhrase, setImportSeedPhrase] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasConfirmedBackup, setHasConfirmedBackup] = useState(false);
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);

  const regenerateSeedPhrase = () => {
    setSeedPhrase(generateSeedPhrase());
    setHasConfirmedBackup(false);
  };

  const copySeedPhrase = () => {
    navigator.clipboard.writeText(seedPhrase);
    toast({
      title: "Copied to clipboard",
      description: "Seed phrase has been copied to your clipboard",
    });
  };

  const handleCreateWallet = async () => {
    if (!hasConfirmedBackup) {
      toast({
        title: "Backup required",
        description: "Please confirm that you've backed up your seed phrase",
        variant: "destructive"
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const newWallet = createWallet('secret-phrase', password, walletName, seedPhrase);
      
      if (newWallet) {
        toast({
          title: "Wallet created",
          description: "Your new wallet has been created successfully",
        });
        
        if (onSuccess) onSuccess();
      } else {
        throw new Error("Failed to create wallet");
      }
    } catch (error) {
      console.error("Error creating wallet:", error);
      toast({
        title: "Error creating wallet",
        description: "An error occurred while creating your wallet. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportWallet = async () => {
    if (!importSeedPhrase) {
      toast({
        title: "Seed phrase required",
        description: "Please enter your seed phrase",
        variant: "destructive"
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const importedWallet = importWalletWithSeedPhrase(importSeedPhrase, password, walletName);
      
      if (importedWallet) {
        toast({
          title: "Wallet imported",
          description: "Your wallet has been imported successfully",
        });
        
        if (onSuccess) onSuccess();
      } else {
        throw new Error("Failed to import wallet");
      }
    } catch (error) {
      console.error("Error importing wallet:", error);
      toast({
        title: "Error importing wallet",
        description: "An error occurred while importing your wallet. Please ensure your seed phrase is correct.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Wallet Management</CardTitle>
        <CardDescription>Create a new wallet or import an existing one</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as "create" | "import")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create New</TabsTrigger>
            <TabsTrigger value="import">Import Existing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="walletName">Wallet Name (Optional)</Label>
              <Input 
                id="walletName" 
                placeholder="My Main Wallet" 
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="seedPhrase">Seed Phrase</Label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2"
                  onClick={regenerateSeedPhrase}
                  type="button"
                  disabled={isLoading}
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  <span className="text-xs">Generate New</span>
                </Button>
              </div>
              
              <div className="relative">
                <div className="bg-muted p-3 rounded-md font-mono text-sm relative">
                  {showSeedPhrase ? (
                    seedPhrase
                  ) : (
                    "••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"
                  )}
                </div>
                <div className="absolute right-2 top-2 flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={() => setShowSeedPhrase(!showSeedPhrase)}
                    type="button"
                  >
                    {showSeedPhrase ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={copySeedPhrase}
                    type="button"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <Alert className="mt-2">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Important!</AlertTitle>
                <AlertDescription className="text-xs mt-1">
                  Write down your seed phrase and store it in a secure location. Anyone with access to this phrase can control your wallet. We cannot recover it for you if lost.
                </AlertDescription>
              </Alert>
              
              <div className="flex items-center space-x-2 mt-2">
                <input 
                  type="checkbox" 
                  id="confirmBackup" 
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                  checked={hasConfirmedBackup}
                  onChange={() => setHasConfirmedBackup(!hasConfirmedBackup)}
                  disabled={isLoading}
                />
                <Label htmlFor="confirmBackup" className="text-sm">
                  I have backed up my seed phrase in a secure location
                </Label>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Create a password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Password will be used to encrypt your private keys
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="Confirm your password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <Button 
              className="w-full mt-4" 
              onClick={handleCreateWallet}
              disabled={isLoading || !password || password !== confirmPassword || !hasConfirmedBackup}
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                  Creating...
                </>
              ) : (
                <>
                  <KeyRound className="h-4 w-4 mr-2" />
                  Create Wallet
                </>
              )}
            </Button>
          </TabsContent>
          
          <TabsContent value="import" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="importWalletName">Wallet Name (Optional)</Label>
              <Input 
                id="importWalletName" 
                placeholder="My Imported Wallet" 
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="importSeedPhrase">Seed Phrase</Label>
              <Input 
                id="importSeedPhrase" 
                placeholder="Enter your 12, 18, or 24-word recovery phrase" 
                value={importSeedPhrase}
                onChange={(e) => setImportSeedPhrase(e.target.value)}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Enter your recovery phrase, with words separated by spaces
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="importPassword">Password</Label>
              <Input 
                id="importPassword" 
                type="password" 
                placeholder="Create a password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Password will be used to encrypt your private keys
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="importConfirmPassword">Confirm Password</Label>
              <Input 
                id="importConfirmPassword" 
                type="password" 
                placeholder="Confirm your password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <Button 
              className="w-full mt-4" 
              onClick={handleImportWallet}
              disabled={isLoading || !importSeedPhrase || !password || password !== confirmPassword}
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                  Importing...
                </>
              ) : (
                <>
                  <KeyRound className="h-4 w-4 mr-2" />
                  Import Wallet
                </>
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-col p-6">
        <p className="text-xs text-muted-foreground text-center">
          For your security, all wallet data is encrypted and stored locally on your device.
        </p>
      </CardFooter>
    </Card>
  );
}
