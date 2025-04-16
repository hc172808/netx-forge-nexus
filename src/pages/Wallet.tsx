
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WalletCard } from "@/components/wallet/WalletCard";
import { SendTokenModal } from "@/components/wallet/SendTokenModal";
import { ReceiveTokenModal } from "@/components/wallet/ReceiveTokenModal";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { Copy, Download, ExternalLink, FileText, Fingerprint, Import, Key, Plus, Wallet as WalletIcon } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const dummyWalletData = {
  address: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
  balance: "2,500.00",
  tokenSymbol: "NETX",
};

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
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [receiveModalOpen, setReceiveModalOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // New states for wallet creation
  const [seedPhrase, setSeedPhrase] = useState("");
  const [walletPassword, setWalletPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [walletName, setWalletName] = useState("");
  
  const handleSendToken = (address: string, amount: string) => {
    console.log("Sending", amount, "to", address);
    toast({
      title: "Transaction Initiated",
      description: `Sending ${amount} NETX to ${address.substring(0, 8)}...`,
    });
  };
  
  const createWalletWithSecretPhrase = () => {
    // In a real app, this would create a wallet with the seed phrase
    toast({
      title: "Wallet Created",
      description: "New wallet created with Secret Phrase.",
    });
  };
  
  const createWalletWithSwift = () => {
    // In a real app, this would create a wallet with Swift
    toast({
      title: "Swift Wallet Initialized",
      description: "New Swift Wallet created successfully.",
    });
  };
  
  const importWallet = (type: string) => {
    if (type === "phrase" && seedPhrase) {
      toast({
        title: "Wallet Imported",
        description: "Your wallet has been imported via seed phrase.",
      });
    } else if (type === "backup") {
      toast({
        title: "Google Drive Connection",
        description: "Connecting to Google Drive for wallet restoration...",
      });
    } else if (type === "viewonly" && walletAddress) {
      toast({
        title: "View-Only Wallet Added",
        description: `Wallet ${walletAddress.substring(0, 8)}... added in view-only mode.`,
      });
    }
  };
  
  const handleExplorer = () => {
    navigate("/explorer");
  };
  
  const handleManageWallets = () => {
    toast({
      title: "Wallet Management",
      description: "Opening wallet management interface...",
    });
  };
  
  const handleExportPrivateKey = () => {
    toast({
      title: "Security Warning",
      description: "Exporting private keys should be done with caution. Your private key will be displayed securely.",
    });
  };
  
  const handleBackupWallet = () => {
    toast({
      title: "Wallet Backup",
      description: "Starting wallet backup process...",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Wallet</h1>
        
        <div className="flex gap-2">
          <Dialog>
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
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center"
                    onClick={createWalletWithSecretPhrase}
                  >
                    <Key className="h-6 w-6 mb-2" />
                    <span>Create with Secret Phrase</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center"
                    onClick={createWalletWithSwift}
                  >
                    <Fingerprint className="h-6 w-6 mb-2" />
                    <span>Create with Swift Wallet</span>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog>
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
                <Button type="submit" onClick={() => importWallet(
                  document.querySelector('[role="tabpanel"][data-state="active"]')?.getAttribute('data-value') || "phrase"
                )}>Import Wallet</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1">
          <WalletCard
            address={dummyWalletData.address}
            balance={dummyWalletData.balance}
            tokenSymbol={dummyWalletData.tokenSymbol}
            onSend={() => setSendModalOpen(true)}
            onReceive={() => setReceiveModalOpen(true)}
            onChange={() => console.log("Change wallet")}
          />
          
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
        </div>
        
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
                              onClick={() => setSendModalOpen(true)}
                            >
                              Send
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => setReceiveModalOpen(true)}
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
      </div>
      
      <SendTokenModal
        open={sendModalOpen}
        onOpenChange={setSendModalOpen}
        availableBalance={dummyWalletData.balance.replace(/,/g, '')}
        tokenSymbol={dummyWalletData.tokenSymbol}
        onSend={handleSendToken}
      />
      
      <ReceiveTokenModal
        open={receiveModalOpen}
        onOpenChange={setReceiveModalOpen}
        walletAddress={dummyWalletData.address}
        tokenSymbol={dummyWalletData.tokenSymbol}
      />
    </div>
  );
}
