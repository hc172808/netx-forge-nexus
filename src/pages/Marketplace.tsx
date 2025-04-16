
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar } from "@/components/ui/avatar";
import { BarChart3, Filter, Search, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Token, TokenList } from "@/components/marketplace/TokenList";

const dummyTokens: Token[] = [
  {
    id: "1",
    name: "NETX Coin",
    symbol: "NETX",
    logo: "https://placehold.co/200x200/4c54e8/ffffff.png?text=NETX",
    price: 0.0845,
    change24h: 5.23,
    marketCap: 8450000,
    volume24h: 1250000,
  },
  {
    id: "2",
    name: "Contractor Token",
    symbol: "CONTX",
    logo: "https://placehold.co/200x200/33a3ee/ffffff.png?text=CONTX",
    price: 0.082,
    change24h: 2.18,
    marketCap: 4100000,
    volume24h: 820000,
  },
  {
    id: "3",
    name: "Developer Token",
    symbol: "DEVX",
    logo: "https://placehold.co/200x200/42c9af/ffffff.png?text=DEVX",
    price: 0.025,
    change24h: -1.24,
    marketCap: 2500000,
    volume24h: 350000,
  },
  {
    id: "4",
    name: "Builder Token",
    symbol: "BUILDX",
    logo: "https://placehold.co/200x200/f97316/ffffff.png?text=BUILDX",
    price: 0.0156,
    change24h: 7.56,
    marketCap: 1560000,
    volume24h: 312000,
  },
  {
    id: "5",
    name: "Security Token",
    symbol: "SECX",
    logo: "https://placehold.co/200x200/dc2626/ffffff.png?text=SECX",
    price: 0.0325,
    change24h: -0.82,
    marketCap: 3250000,
    volume24h: 195000,
  },
  {
    id: "6",
    name: "Analytics Token",
    symbol: "ANLX",
    logo: "https://placehold.co/200x200/8b5cf6/ffffff.png?text=ANLX",
    price: 0.0093,
    change24h: 12.5,
    marketCap: 930000,
    volume24h: 279000,
  },
  {
    id: "7",
    name: "Infrastructure Token",
    symbol: "INFX",
    logo: "https://placehold.co/200x200/4f46e5/ffffff.png?text=INFX",
    price: 0.0418,
    change24h: 3.28,
    marketCap: 4180000,
    volume24h: 627000,
  },
];

const dummyTopHolders = [
  { rank: 1, address: "0x1a2b...3c4d", amount: "15,000,000 NETX", percentage: "15.00%" },
  { rank: 2, address: "0x5e6f...7g8h", amount: "9,500,000 NETX", percentage: "9.50%" },
  { rank: 3, address: "0x9i0j...1k2l", amount: "8,200,000 NETX", percentage: "8.20%" },
  { rank: 4, address: "0x3m4n...5o6p", amount: "7,800,000 NETX", percentage: "7.80%" },
  { rank: 5, address: "0x7q8r...9s0t", amount: "6,500,000 NETX", percentage: "6.50%" },
  { rank: 6, address: "0x1u2v...3w4x", amount: "5,850,000 NETX", percentage: "5.85%" },
  { rank: 7, address: "0x5y6z...7a8b", amount: "4,920,000 NETX", percentage: "4.92%" },
  { rank: 8, address: "0x9c0d...1e2f", amount: "4,100,000 NETX", percentage: "4.10%" },
  { rank: 9, address: "0x3g4h...5i6j", amount: "3,750,000 NETX", percentage: "3.75%" },
  { rank: 10, address: "0x7k8l...9m0n", amount: "3,200,000 NETX", percentage: "3.20%" },
];

export default function Marketplace() {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  
  const handleTokenSelect = (token: Token) => {
    setSelectedToken(token);
  };
  
  const handleBuyToken = () => {
    console.log("Buy", selectedToken);
    // In a real app, this would open a trading interface
  };
  
  const handleSellToken = () => {
    console.log("Sell", selectedToken);
    // In a real app, this would open a trading interface
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Token Marketplace</h1>
        
        <div className="flex gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tokens..."
              className="pl-8"
            />
          </div>
          
          <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Filter Tokens</DialogTitle>
                <DialogDescription>
                  Customize your marketplace view
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Price Range (USD)</Label>
                  <div className="pt-4 px-2">
                    <Slider
                      defaultValue={[0, 100]}
                      max={100}
                      step={1}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0] / 1000}</span>
                    <span>${priceRange[1] / 1000}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Market Cap</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select market cap range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="s">Small (&lt; $1M)</SelectItem>
                      <SelectItem value="m">Medium ($1M - $10M)</SelectItem>
                      <SelectItem value="l">Large (&gt; $10M)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>24h Change</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select price change" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="positive">Positive only</SelectItem>
                      <SelectItem value="negative">Negative only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="newTokens">Show New Tokens Only</Label>
                  <Switch id="newTokens" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowFilterDialog(false)}>
                  Reset
                </Button>
                <Button onClick={() => setShowFilterDialog(false)}>
                  Apply Filters
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TokenList 
            tokens={dummyTokens} 
            onTokenSelect={handleTokenSelect} 
          />
        </div>
        
        <div className="space-y-6">
          {selectedToken ? (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10">
                      <img src={selectedToken.logo} alt={selectedToken.name} />
                    </Avatar>
                    <div>
                      <CardTitle>{selectedToken.name}</CardTitle>
                      <CardDescription>{selectedToken.symbol}</CardDescription>
                    </div>
                  </div>
                  <Badge 
                    variant={selectedToken.change24h >= 0 ? "outline" : "destructive"} 
                    className={selectedToken.change24h >= 0 ? "text-green-500 border-green-200 bg-green-50" : ""}
                  >
                    <span className="flex items-center gap-1">
                      {selectedToken.change24h >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {selectedToken.change24h >= 0 ? "+" : ""}{selectedToken.change24h.toFixed(2)}%
                    </span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-0">
                <div className="text-3xl font-bold mb-6">
                  ${selectedToken.price.toFixed(selectedToken.price < 0.01 ? 6 : 4)}
                </div>
                
                <Tabs defaultValue="overview">
                  <TabsList className="w-full">
                    <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                    <TabsTrigger value="holders" className="flex-1">Top Holders</TabsTrigger>
                    <TabsTrigger value="stats" className="flex-1">Stats</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Market Cap</p>
                        <p className="font-medium">
                          ${new Intl.NumberFormat('en-US', {
                            notation: "compact",
                            compactDisplay: "short",
                          }).format(selectedToken.marketCap)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Volume (24h)</p>
                        <p className="font-medium">
                          ${new Intl.NumberFormat('en-US', {
                            notation: "compact",
                            compactDisplay: "short",
                          }).format(selectedToken.volume24h)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Circulating Supply</p>
                        <p className="font-medium">
                          {new Intl.NumberFormat('en-US', {
                            notation: "compact",
                            compactDisplay: "short",
                          }).format(selectedToken.marketCap / selectedToken.price)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">All-Time High</p>
                        <p className="font-medium">
                          ${(selectedToken.price * (1 + Math.random() * 0.5)).toFixed(4)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="font-medium mb-2">Price Chart</h3>
                      <div className="h-[200px] bg-accent/30 rounded-md flex items-center justify-center">
                        <BarChart3 className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="holders" className="mt-4">
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="text-right">Percentage</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {dummyTopHolders.slice(0, 5).map((holder) => (
                            <TableRow key={holder.rank}>
                              <TableCell>{holder.rank}</TableCell>
                              <TableCell className="font-mono text-xs">
                                {holder.address}
                              </TableCell>
                              <TableCell className="text-right">
                                {holder.amount.replace("NETX", selectedToken.symbol)}
                              </TableCell>
                              <TableCell className="text-right">
                                {holder.percentage}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="stats" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Launch Date</p>
                        <p className="font-medium">Jan 15, 2025</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Creator Fee</p>
                        <p className="font-medium">1.5%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Mintable</p>
                        <p className="font-medium">{Math.random() > 0.5 ? "Yes" : "No"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Mutable</p>
                        <p className="font-medium">{Math.random() > 0.5 ? "Yes" : "No"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Update Authority</p>
                        <p className="font-medium">{Math.random() > 0.5 ? "Yes" : "No"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Freeze Authority</p>
                        <p className="font-medium">{Math.random() > 0.5 ? "Yes" : "No"}</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex gap-2 pt-6">
                <Button 
                  className="flex-1 bg-primary"
                  onClick={handleBuyToken}
                >
                  Buy
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleSellToken}
                >
                  Sell
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Token Details</CardTitle>
                <CardDescription>
                  Select a token to view details
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">
                  Click on a token in the list to view its details
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
