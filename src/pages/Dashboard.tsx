
import { StatCard } from "@/components/ui/stat-card";
import { WalletCard } from "@/components/wallet/WalletCard";
import { SendTokenModal } from "@/components/wallet/SendTokenModal";
import { ReceiveTokenModal } from "@/components/wallet/ReceiveTokenModal";
import { CashOutModal } from "@/components/wallet/CashOutModal";
import { DownloadSection } from "@/components/downloads/DownloadSection";
import { Activity, BarChart4, Coins, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getActiveWallet } from "@/services/walletService";

const dummyWalletData = {
  address: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
  balance: "2,500.00",
  tokenSymbol: "NETX",
};

const dummyStats = [
  {
    title: "NETX Price",
    value: "$0.0845",
    icon: <Coins />,
    trend: "up" as const,
    trendValue: "+5.23% (24h)",
  },
  {
    title: "Market Cap",
    value: "$8.45M",
    icon: <BarChart4 />,
    trend: "up" as const,
    trendValue: "+2.54% (24h)",
  },
  {
    title: "Total Transactions",
    value: "1.2M",
    icon: <Activity />,
    trend: "up" as const,
    trendValue: "+12,583 today",
  },
  {
    title: "Active Nodes",
    value: "128",
    icon: <TrendingUp />,
    trend: "neutral" as const,
    trendValue: "No change (24h)",
  },
];

const dummyTokenTransactions = [
  {
    id: "1",
    token: "NETX",
    type: "Buy",
    amount: "500 NETX",
    value: "$42.25",
    time: "2 hours ago",
  },
  {
    id: "2",
    token: "CONTX",
    type: "Sell",
    amount: "200 CONTX",
    value: "$16.40",
    time: "5 hours ago",
  },
  {
    id: "3",
    token: "NETX",
    type: "Transfer",
    amount: "50 NETX",
    value: "$4.23",
    time: "Yesterday",
  },
  {
    id: "4",
    token: "DEVX",
    type: "Buy",
    amount: "1,000 DEVX",
    value: "$25.00",
    time: "Yesterday",
  },
];

const dummyTopTokens = [
  {
    id: "1",
    name: "NETX Coin",
    symbol: "NETX",
    logo: "https://placehold.co/200x200/4c54e8/ffffff.png?text=NETX",
    change: "+5.23%",
    price: "$0.0845",
  },
  {
    id: "2",
    name: "Contractor Token",
    symbol: "CONTX",
    logo: "https://placehold.co/200x200/33a3ee/ffffff.png?text=CONTX",
    change: "+2.18%",
    price: "$0.0820",
  },
  {
    id: "3",
    name: "Developer Token",
    symbol: "DEVX",
    logo: "https://placehold.co/200x200/42c9af/ffffff.png?text=DEVX",
    change: "-1.24%",
    price: "$0.0250",
  },
  {
    id: "4",
    name: "Builder Token",
    symbol: "BUILDX",
    logo: "https://placehold.co/200x200/f97316/ffffff.png?text=BUILDX",
    change: "+7.56%",
    price: "$0.0156",
  },
];

export default function Dashboard() {
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [receiveModalOpen, setReceiveModalOpen] = useState(false);
  const [cashOutModalOpen, setCashOutModalOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(dummyWalletData.balance);
  const [showCashOut, setShowCashOut] = useState(false);
  
  useEffect(() => {
    // Check if user has enough balance to show cash out button (100,000 NETX)
    const balance = parseFloat(walletBalance.replace(/,/g, ''));
    setShowCashOut(balance >= 100000);
    
    // In a real app, you would also check admin settings to see if cash out is enabled
    // checkAdminSettings();
  }, [walletBalance]);
  
  const handleSendToken = (address: string, amount: string) => {
    console.log("Sending", amount, "to", address);
    // In a real application, this would call a blockchain transaction
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="space-y-6 flex-1">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dummyStats.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                trend={stat.trend}
                trendValue={stat.trendValue}
              />
            ))}
          </div>
          
          <DownloadSection />
          
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Status</CardTitle>
              <CardDescription>
                Overview of the NETX blockchain network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="transactions">
                <TabsList className="mb-4">
                  <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
                  <TabsTrigger value="tokens">Top Tokens</TabsTrigger>
                </TabsList>
                
                <TabsContent value="transactions">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Token</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead className="hidden md:table-cell">Value</TableHead>
                          <TableHead className="text-right">Time</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dummyTokenTransactions.map((tx) => (
                          <TableRow key={tx.id}>
                            <TableCell className="font-medium">{tx.token}</TableCell>
                            <TableCell>{tx.type}</TableCell>
                            <TableCell>{tx.amount}</TableCell>
                            <TableCell className="hidden md:table-cell">{tx.value}</TableCell>
                            <TableCell className="text-right">{tx.time}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="mt-4 text-right">
                    <Button variant="outline" size="sm">View All Transactions</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="tokens">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Token</TableHead>
                          <TableHead>Symbol</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead className="text-right">24h Change</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dummyTopTokens.map((token) => (
                          <TableRow key={token.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <img src={token.logo} alt={token.name} />
                                </Avatar>
                                <span className="font-medium">{token.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{token.symbol}</TableCell>
                            <TableCell>{token.price}</TableCell>
                            <TableCell className={`text-right ${token.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                              {token.change}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="mt-4 text-right">
                    <Button variant="outline" size="sm">View All Tokens</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full md:w-80">
          <WalletCard
            address={dummyWalletData.address}
            balance={walletBalance}
            tokenSymbol={dummyWalletData.tokenSymbol}
            onSend={() => setSendModalOpen(true)}
            onReceive={() => setReceiveModalOpen(true)}
            onCashOut={showCashOut ? () => setCashOutModalOpen(true) : undefined}
          />
        </div>
      </div>
      
      <SendTokenModal
        open={sendModalOpen}
        onOpenChange={setSendModalOpen}
        availableBalance={walletBalance.replace(/,/g, '')}
        tokenSymbol={dummyWalletData.tokenSymbol}
        onSend={handleSendToken}
      />
      
      <ReceiveTokenModal
        open={receiveModalOpen}
        onOpenChange={setReceiveModalOpen}
        walletAddress={dummyWalletData.address}
        tokenSymbol={dummyWalletData.tokenSymbol}
      />
      
      {showCashOut && (
        <CashOutModal
          open={cashOutModalOpen}
          onOpenChange={setCashOutModalOpen}
          balance={walletBalance}
          tokenSymbol={dummyWalletData.tokenSymbol}
        />
      )}
    </div>
  );
}
