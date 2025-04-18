import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WalletCard } from "@/components/wallet/WalletCard";
import { SendTokenModal } from "@/components/wallet/SendTokenModal";
import { ReceiveTokenModal } from "@/components/wallet/ReceiveTokenModal";
import { ManageWalletsModal } from "@/components/wallet/ManageWalletsModal";
import { ExportPrivateKeyModal } from "@/components/wallet/ExportPrivateKeyModal";
import { BackupWalletModal } from "@/components/wallet/BackupWalletModal";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { Copy, Download, ExternalLink, FileText, Fingerprint, Import, Key, Plus, Wallet as WalletIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  createWallet, 
  getActiveWallet, 
  getWalletBalance, 
  getWallets, 
  importWalletWithSeedPhrase, 
  setActiveWallet,
  validateSeedPhrase,
  type Wallet as WalletType
} from "@/services/walletService";
import { toast } from "sonner";

const dummyTokenBalances = [
  {
    id: "1",
    name: "NETX Coin",
    symbol: "NETX",
    logo: "https://placehold.co/200x200/4c54e8/ffffff.png?text=NETX",
    balance: "2,500.00",
    value: "$211.25",
  },
  {
    id: "2",
    name: "Contractor Token",
    symbol: "CONTX",
    logo: "https://placehold.co/200x200/33a3ee/ffffff.png?text=CONTX",
    balance: "5,000.00",
    value: "$410.00",
  },
  {
    id: "3",
    name: "Developer Token",
    symbol: "DEVX",
    logo: "https://placehold.co/200x200/42c9af/ffffff.png?text=DEVX",
    balance: "10,000.00",
    value: "$250.00",
  },
];

const dummyTransactionHistory = [
  {
    id: "tx1",
    type: "Receive",
    token: "NETX",
    amount: "+500 NETX",
    from: "0xabcd...1234",
    to: "You",
    date: "Apr 15, 2025",
    status: "Completed",
  },
  {
    id: "tx2",
    type: "Send",
    token: "CONTX",
    amount: "-200 CONTX",
    from: "You",
    to: "0xefgh...5678",
    date: "Apr 14, 2025",
    status: "Completed",
  },
  {
    id: "tx3",
    type: "Buy",
    token: "DEVX",
    amount: "+1,000 DEVX",
    from: "Exchange",
    to: "You",
    date: "Apr 12, 2025",
    status: "Completed",
  },
  {
    id: "tx4",
    type: "Sell",
    token: "NETX",
    amount: "-100 NETX",
    from: "You",
    to: "Exchange",
    date: "Apr 10, 2025",
    status: "Completed",
  },
];

export default function Wallet() {
  const [sendModalOpen, setIsSendModalOpen] = useState(false);
  const [receiveModalOpen, setIsReceiveModalOpen] = useState(false);
  const [manageWalletsModalOpen, setManageWalletsModalOpen] = useState(false);
  const [exportPrivateKeyModalOpen, setExportPrivateKeyModalOpen] = useState(false);
  const [backupWalletModalOpen, setBackupWalletModalOpen] = useState(false);
  const [createWalletOpen, setCreateWalletOpen] = useState(false);
  const [importWalletOpen, setImportWalletOpen] = useState(false);
  
  const { toast: hookToast } = useToast();
  const navigate = useNavigate();
  
  const [seedPhrase, setSeedPhrase] = useState("");
  const [walletPassword, setWalletPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [walletName, setWalletName] = useState("");
  const [activeWallet, setActiveWalletState] = useState<WalletType | null>(null);
  const [walletBalance, setWalletBalance] = useState("0.00");
  const [creationType, setCreationType] = useState<'secret-phrase' | 'swift' | 'choose'>('choose');
  const [walletList, setWalletList] = useState<WalletType[]>([]);
  
  useEffect(() => {
    const wallet = getActiveWallet();
    setActiveWalletState(wallet);
    
    const wallets = getWallets();
    setWalletList(wallets);
    
    if (wallet) {
      getWalletBalance(wallet.address).then(balance => {
        setWalletBalance(balance);
      });
    }
  }, []);
  
  const handleWalletChange = (walletId: string) => {
    setActiveWallet(walletId);
    const wallet = getWallets().find(w => w.id === walletId);
    setActiveWalletState(wallet || null);
    
    if (wallet) {
      getWalletBalance(wallet.address).then(balance => {
        setWalletBalance(balance);
      });
    }
  };
  
  const handleSendToken = (address: string, amount: string) => {
    console.log("Sending", amount, "to", address);
    hookToast({
      title: "Transaction Initiated",
      description: `Sending ${amount} NETX to ${address.substring(0, 8)}...`,
    });
  };
  
  const createWalletWithSecretPhrase = () => {
    if (walletPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    
    if (walletPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    const newWallet = createWallet('secret-phrase', walletPassword, walletName);
    
    if (newWallet) {
      const generatedSeedPhrase = seedPhrase || "Your seed phrase has been generated";
      
      toast.success("Wallet Created", {
        description: "New wallet created with Secret Phrase. Keep your password and seed phrase safe!",
      });
      
      setWalletList(getWallets());
      
      setActiveWalletState(newWallet);
      setWalletBalance("0.00");
      
      setCreateWalletOpen(false);
      
      setWalletPassword("");
      setConfirmPassword("");
      setWalletName("");
      setSeedPhrase("");
    } else {
      toast.error("Failed to create wallet");
    }
  };
  
  const createWalletWithSwift = () => {
    if (walletPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    
    if (walletPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    const newWallet = createWallet('swift', walletPassword, walletName);
    
    if (newWallet) {
      toast.success("Swift Wallet Initialized", {
        description: "New Swift Wallet created successfully.",
      });
      
      setWalletList(getWallets());
      
      setActiveWalletState(newWallet);
      setWalletBalance("0.00");
      
      setCreateWalletOpen(false);
      
      setWalletPassword("");
      setConfirmPassword("");
      setWalletName("");
    } else {
      toast.error("Failed to create wallet");
    }
  };
  
  const importWallet = (type: string) => {
    if (type === "phrase" && seedPhrase) {
      if (!validateSeedPhrase(seedPhrase)) {
        toast.error("Invalid seed phrase. Please check and try again.");
        return;
      }
      
      if (walletPassword.length < 8) {
        toast.error("Password must be at least 8 characters long");
        return;
      }
      
      if (walletPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      
      const newWallet = importWalletWithSeedPhrase(seedPhrase, walletPassword, walletName);
      
      if (newWallet) {
        toast.success("Wallet Imported", {
          description: "Your wallet has been imported via seed phrase.",
        });
        
        setWalletList(getWallets());
        
        setActiveWalletState(newWallet);
        setWalletBalance("0.00");
        
        setImportWalletOpen(false);
        
        setSeedPhrase("");
        setWalletPassword("");
        setConfirmPassword("");
        setWalletName("");
      } else {
        toast.error("Failed to import wallet");
      }
    } else if (type === "backup") {
      toast.info("Google Drive Connection", {
        description: "Connecting to Google Drive for wallet restoration... (not implemented)",
      });
    } else if (type === "viewonly" && walletAddress) {
      toast.success("View-Only Wallet Added", {
        description: `Wallet ${walletAddress.substring(0, 8)}... added in view-only mode.`,
      });
      
      setImportWalletOpen(false);
      
      setWalletAddress("");
      setWalletName("");
    } else {
      toast.error("Please fill in all required fields");
    }
  };
  
  const handleExplorer = () => {
    navigate("/explorer");
  };
  
  const handleManageWallets = () => {
    setManageWalletsModalOpen(true);
  };
  
  const handleExportPrivateKey = () => {
    setExportPrivateKeyModalOpen(true);
  };
  
  const handleBackupWallet = () => {
    setBackupWalletModalOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Wallet</h1>
        
        <div className="flex gap-2">
          <Dialog open={createWalletOpen} onOpenChange={setCreateWalletOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create New Wallet
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Wallet</DialogTitle>
                <DialogDescription>
                  Choose how you want to create your new NETX wallet
                </DialogDescription>
              </DialogHeader>
              {creationType === 'secret-phrase' || creationType === 'swift' ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="walletName">Wallet Name (Optional)</Label>
                    <Input 
                      id="walletName" 
                      placeholder="My NETX Wallet" 
                      value={walletName}
                      onChange={(e) => setWalletName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="walletPassword">Wallet Password</Label>
                    <Input 
                      id="walletPassword" 
                      type="password" 
                      placeholder="Enter a secure password"
                      value={walletPassword}
                      onChange={(e) => setWalletPassword(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Min. 8 characters. This password will encrypt your wallet data.
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
                    />
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={creationType === 'secret-phrase' ? createWalletWithSecretPhrase : createWalletWithSwift}
                  >
                    Create {creationType === 'secret-phrase' ? 'Secret Phrase' : 'Swift'} Wallet
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => setCreationType('choose')}
                  >
                    Back
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-24 flex flex-col items-center justify-center"
                      onClick={() => {
                        setCreationType('secret-phrase');
                        setWalletPassword("");
                        setConfirmPassword("");
                      }}
                    >
                      <Key className="h-6 w-6 mb-2" />
                      <span>Create with Secret Phrase</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-24 flex flex-col items-center justify-center"
                      onClick={() => {
                        setCreationType('swift');
                        setWalletPassword("");
                        setConfirmPassword("");
                      }}
                    >
                      <Fingerprint className="h-6 w-6 mb-2" />
                      <span>Create with Swift Wallet</span>
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
          
          <Dialog open={importWalletOpen} onOpenChange={setImportWalletOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Import className="h-4 w-4 mr-2" />
                Import Wallet
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import Wallet</DialogTitle>
                <DialogDescription>
                  Import an existing wallet to your NETX account
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="phrase">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="phrase">Seed Phrase</TabsTrigger>
                  <TabsTrigger value="backup">Google Drive</TabsTrigger>
                  <TabsTrigger value="viewonly">View Only</TabsTrigger>
                </TabsList>
                <TabsContent value="phrase">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="seedPhrase">Enter your seed phrase</Label>
                      <Input 
                        id="seedPhrase" 
                        placeholder="Enter 12, 18, or 24-word seed phrase" 
                        value={seedPhrase}
                        onChange={(e) => setSeedPhrase(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter your 12, 18, or 24-word recovery phrase, with spaces between each word
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="walletName">Wallet Name (Optional)</Label>
                      <Input 
                        id="walletName" 
                        placeholder="My Imported Wallet" 
                        value={walletName}
                        onChange={(e) => setWalletName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="walletPassword">New Wallet Password</Label>
                      <Input 
                        id="walletPassword" 
                        type="password" 
                        value={walletPassword}
                        onChange={(e) => setWalletPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="backup">
                  <div className="py-4 flex flex-col items-center justify-center text-center">
                    <Download className="h-8 w-8 mb-2 text-primary" />
                    <h3 className="text-lg font-medium mb-2">Restore from Google Drive</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Connect to your Google Drive to restore a backed up wallet
                    </p>
                    <Button onClick={() => importWallet("backup")}>
                      Connect to Google Drive
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="viewonly">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="walletAddress">Wallet Address</Label>
                      <Input 
                        id="walletAddress" 
                        placeholder="Enter wallet address" 
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        View-only wallets can only monitor balances and transactions
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="walletName">Wallet Name (Optional)</Label>
                      <Input 
                        id="walletName" 
                        placeholder="e.g. My View-Only Wallet" 
                        value={walletName}
                        onChange={(e) => setWalletName(e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button 
                  type="submit" 
                  onClick={() => importWallet(
                    document.querySelector('[role="tabpanel"][data-state="active"]')?.getAttribute('data-value') || "phrase"
                  )}
                >
                  Import Wallet
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1">
          {activeWallet ? (
            <WalletCard
              address={activeWallet.address}
              balance={walletBalance}
              tokenSymbol="NETX"
              onSend={() => setIsSendModalOpen(true)}
              onReceive={() => setIsReceiveModalOpen(true)}
            />
          ) : (
            <Card className="flex flex-col justify-center items-center p-8 text-center">
              <WalletIcon className="h-12 w-12 mb-4 text-muted-foreground" />
              <h2 className="text-xl font-bold mb-2">No Wallet Found</h2>
              <p className="text-muted-foreground mb-4">Create a new wallet or import an existing one</p>
              <div className="flex gap-2">
                <Button onClick={() => setCreateWalletOpen(true)}>Create Wallet</Button>
                <Button variant="outline" onClick={() => setImportWalletOpen(true)}>Import Wallet</Button>
              </div>
            </Card>
          )}
          
          {activeWallet && (
            <div className="mt-4 flex gap-2 flex-col">
              <Button variant="outline" className="justify-start" onClick={handleManageWallets}>
                <WalletIcon className="h-4 w-4 mr-2" />
                Manage Wallets
              </Button>
              <Button variant="outline" className="justify-start" onClick={handleExplorer}>
                <ExternalLink className="h-4 w-4 mr-2" />
                View in Explorer
              </Button>
              <Button variant="outline" className="justify-start" onClick={handleExportPrivateKey}>
                <FileText className="h-4 w-4 mr-2" />
                Export Private Key
              </Button>
              <Button variant="outline" className="justify-start" onClick={handleBackupWallet}>
                <Copy className="h-4 w-4 mr-2" />
                Backup Wallet
              </Button>
            </div>
          )}
        </div>
        
        {activeWallet ? (
          <div className="col-span-1 lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Token Balances</CardTitle>
                <CardDescription>
                  Manage your NETX blockchain assets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Token</TableHead>
                        <TableHead>Balance</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dummyTokenBalances.map((token) => (
                        <TableRow key={token.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <img src={token.logo} alt={token.name} />
                              </Avatar>
                              <div>
                                <div className="font-medium">{token.name}</div>
                                <div className="text-xs text-muted-foreground">{token.symbol}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {token.balance}
                          </TableCell>
                          <TableCell>
                            {token.value}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => setIsSendModalOpen(true)}
                              >
                                Send
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => setIsReceiveModalOpen(true)}
                              >
                                Receive
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>
                  Recent activity for this wallet
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Token</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="hidden md:table-cell">From/To</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dummyTransactionHistory.map((tx) => (
                        <TableRow key={tx.id}>
                          <TableCell>
                            <div className={`font-medium ${
                              tx.type === "Receive" || tx.type === "Buy" 
                                ? "text-green-500" 
                                : "text-red-500"
                            }`}>
                              {tx.type}
                            </div>
                          </TableCell>
                          <TableCell>{tx.token}</TableCell>
                          <TableCell className={
                            tx.amount.startsWith("+") ? "text-green-500" : "text-red-500"
                          }>
                            {tx.amount}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {tx.type === "Send" || tx.type === "Sell" ? tx.to : tx.from}
                          </TableCell>
                          <TableCell className="text-right">
                            {tx.date}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 text-right">
                  <Button variant="outline" size="sm" onClick={() => navigate("/history")}>View All Transactions</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="col-span-1 lg:col-span-2">
            <Card className="flex flex-col justify-center items-center p-12 h-full">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Create a wallet to get started</h3>
                <p className="text-muted-foreground mb-4">Your wallet information will appear here</p>
              </div>
            </Card>
          </div>
        )}
      </div>
      
      <SendTokenModal
        open={sendModalOpen}
        onOpenChange={setIsSendModalOpen}
        availableBalance={activeWallet ? walletBalance.replace(/,/g, '') : "0"}
        tokenSymbol="NETX"
        onSend={handleSendToken}
      />
      
      <ReceiveTokenModal
        open={receiveModalOpen}
        onOpenChange={setIsReceiveModalOpen}
        walletAddress={activeWallet?.address || ""}
        tokenSymbol="NETX"
      />
      
      <ManageWalletsModal
        open={manageWalletsModalOpen}
        onOpenChange={setManageWalletsModalOpen}
        onWalletSelect={handleWalletChange}
        wallets={walletList}
        activeWalletId={activeWallet?.id}
      />
      
      <ExportPrivateKeyModal
        open={exportPrivateKeyModalOpen}
        onOpenChange={setExportPrivateKeyModalOpen}
        walletAddress={activeWallet?.address || ""}
      />
      
      <BackupWalletModal
        open={backupWalletModalOpen}
        onOpenChange={setBackupWalletModalOpen}
        walletAddress={activeWallet?.address || ""}
      />
    </div>
  );
}
