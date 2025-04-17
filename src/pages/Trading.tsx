
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeftRight, LineChart, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const tokens = [
  {
    id: "1",
    name: "NETX Coin",
    symbol: "NETX",
    price: 0.0845,
    change: "+2.5%",
    volume: "$1.2M",
    marketCap: "$8.4M",
    logo: "https://placehold.co/200x200/4c54e8/ffffff.png?text=NETX",
  },
  {
    id: "2",
    name: "Contractor Token",
    symbol: "CONTX",
    price: 0.0820,
    change: "-0.8%",
    volume: "$950K",
    marketCap: "$6.1M",
    logo: "https://placehold.co/200x200/33a3ee/ffffff.png?text=CONTX",
  },
  {
    id: "3",
    name: "Developer Token",
    symbol: "DEVX",
    price: 0.0250,
    change: "+5.3%",
    volume: "$560K",
    marketCap: "$2.5M",
    logo: "https://placehold.co/200x200/42c9af/ffffff.png?text=DEVX",
  },
  {
    id: "4",
    name: "Network Token",
    symbol: "NTX",
    price: 0.1250,
    change: "+1.2%",
    volume: "$1.5M",
    marketCap: "$12.5M",
    logo: "https://placehold.co/200x200/e84c4c/ffffff.png?text=NTX",
  },
  {
    id: "5",
    name: "Governance Token",
    symbol: "GOVX",
    price: 0.0750,
    change: "-1.5%",
    volume: "$850K",
    marketCap: "$7.5M",
    logo: "https://placehold.co/200x200/e84ce8/ffffff.png?text=GOVX",
  },
];

export default function Trading() {
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [slippage, setSlippage] = useState<string>("0.5");
  const [orderType, setOrderType] = useState<string>("market");
  const [limitPrice, setLimitPrice] = useState<string>("");
  
  // Constants
  const TRADING_FEE = 0.002; // 0.2% fee
  
  // Calculate receive amount based on input amount, prices, and fee
  const calculateReceiveAmount = (amount: string, inputToken: typeof tokens[0], outputToken: typeof tokens[0]) => {
    if (!amount || isNaN(parseFloat(amount))) return "";
    
    const inputAmount = parseFloat(amount);
    const inputValue = inputAmount * inputToken.price;
    const outputAmount = inputValue / outputToken.price;
    
    // Apply trading fee
    const amountAfterFee = outputAmount * (1 - TRADING_FEE);
    
    return amountAfterFee.toFixed(6);
  };
  
  // Handle input amount change
  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setToAmount(calculateReceiveAmount(value, fromToken, toToken));
  };
  
  // Handle token swap button
  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    
    // Recalculate amounts
    if (fromAmount) {
      setToAmount(calculateReceiveAmount(fromAmount, toToken, fromToken));
    }
  };
  
  // Handle trade execution
  const handleTrade = () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    const calculatedAmount = calculateReceiveAmount(fromAmount, fromToken, toToken);
    
    toast.success("Trade Executed", {
      description: `Successfully swapped ${fromAmount} ${fromToken.symbol} for ${calculatedAmount} ${toToken.symbol}`,
    });
    
    // Reset form
    setFromAmount("");
    setToAmount("");
  };
  
  return (
    <div className="space-y-6 container mx-auto max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-2xl font-bold">Trading</h1>
        <div className="flex gap-2 mt-2 md:mt-0">
          <Button variant="default" size="sm">
            <LineChart className="h-4 w-4 mr-2" />
            Charts
          </Button>
          <Button variant="outline" size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            Trading History
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2">
          <Tabs defaultValue="swap" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="swap">Swap</TabsTrigger>
              <TabsTrigger value="limit">Limit Order</TabsTrigger>
              <TabsTrigger value="pool">Liquidity Pool</TabsTrigger>
            </TabsList>
            
            <TabsContent value="swap">
              <Card>
                <CardHeader>
                  <CardTitle>Swap Tokens</CardTitle>
                  <CardDescription>
                    Exchange tokens instantly at the current market price
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fromToken">From</Label>
                      <div className="flex gap-2">
                        <select 
                          id="fromToken" 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={fromToken.id}
                          onChange={(e) => {
                            const token = tokens.find(t => t.id === e.target.value);
                            if (token) {
                              setFromToken(token);
                              if (fromAmount) {
                                setToAmount(calculateReceiveAmount(fromAmount, token, toToken));
                              }
                            }
                          }}
                        >
                          {tokens.map((token) => (
                            <option 
                              key={token.id} 
                              value={token.id}
                              disabled={token.id === toToken.id}
                            >
                              {token.symbol} - {token.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fromAmount">Amount</Label>
                      <Input 
                        id="fromAmount" 
                        type="number" 
                        placeholder="0.00"
                        value={fromAmount}
                        onChange={(e) => handleFromAmountChange(e.target.value)}
                      />
                      <div className="text-sm text-muted-foreground flex justify-between">
                        <span>Price: ${fromToken.price.toFixed(4)}</span>
                        <span>Fee: 0.2%</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-center my-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={handleSwapTokens}
                        className="rounded-full h-8 w-8"
                      >
                        <ArrowLeftRight className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="toToken">To</Label>
                      <div className="flex gap-2">
                        <select 
                          id="toToken" 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={toToken.id}
                          onChange={(e) => {
                            const token = tokens.find(t => t.id === e.target.value);
                            if (token) {
                              setToToken(token);
                              if (fromAmount) {
                                setToAmount(calculateReceiveAmount(fromAmount, fromToken, token));
                              }
                            }
                          }}
                        >
                          {tokens.map((token) => (
                            <option 
                              key={token.id} 
                              value={token.id}
                              disabled={token.id === fromToken.id}
                            >
                              {token.symbol} - {token.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="toAmount">You Receive</Label>
                      <Input 
                        id="toAmount" 
                        type="text" 
                        placeholder="0.00"
                        value={toAmount}
                        readOnly 
                        className="bg-muted"
                      />
                      <div className="text-sm text-muted-foreground">
                        Price: ${toToken.price.toFixed(4)}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="slippage">Slippage Tolerance</Label>
                      <div className="flex gap-2">
                        <Button 
                          variant={slippage === "0.1" ? "default" : "outline"} 
                          size="sm"
                          onClick={() => setSlippage("0.1")}
                        >
                          0.1%
                        </Button>
                        <Button 
                          variant={slippage === "0.5" ? "default" : "outline"} 
                          size="sm"
                          onClick={() => setSlippage("0.5")}
                        >
                          0.5%
                        </Button>
                        <Button 
                          variant={slippage === "1.0" ? "default" : "outline"} 
                          size="sm"
                          onClick={() => setSlippage("1.0")}
                        >
                          1.0%
                        </Button>
                        <Input 
                          type="number" 
                          placeholder="Custom" 
                          className="max-w-[100px]"
                          value={!["0.1", "0.5", "1.0"].includes(slippage) ? slippage : ""}
                          onChange={(e) => setSlippage(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <Button className="w-full" onClick={handleTrade}>
                      Swap {fromToken.symbol} to {toToken.symbol}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="limit">
              <Card>
                <CardHeader>
                  <CardTitle>Limit Order</CardTitle>
                  <CardDescription>
                    Set a price to buy or sell tokens automatically
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {/* Similar to swap but with limit price input */}
                    <div className="space-y-2">
                      <Label htmlFor="orderType">Order Type</Label>
                      <div className="flex gap-2">
                        <Button 
                          variant={orderType === "market" ? "default" : "outline"} 
                          className="flex-1"
                          onClick={() => setOrderType("market")}
                        >
                          Market
                        </Button>
                        <Button 
                          variant={orderType === "limit" ? "default" : "outline"} 
                          className="flex-1"
                          onClick={() => setOrderType("limit")}
                        >
                          Limit
                        </Button>
                      </div>
                    </div>
                    
                    {/* From Token */}
                    <div className="space-y-2">
                      <Label htmlFor="limitFromToken">From</Label>
                      <select 
                        id="limitFromToken" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {tokens.map((token) => (
                          <option key={token.id} value={token.id}>
                            {token.symbol} - {token.name}
                          </option>
                        ))}
                      </select>
                      <Input 
                        type="number" 
                        placeholder="Amount" 
                      />
                    </div>
                    
                    {/* To Token */}
                    <div className="space-y-2">
                      <Label htmlFor="limitToToken">To</Label>
                      <select 
                        id="limitToToken" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {tokens.map((token) => (
                          <option key={token.id} value={token.id}>
                            {token.symbol} - {token.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Limit Price - only show if limit order type */}
                    {orderType === "limit" && (
                      <div className="space-y-2">
                        <Label htmlFor="limitPrice">Limit Price</Label>
                        <Input 
                          id="limitPrice" 
                          type="number" 
                          placeholder="0.00"
                          value={limitPrice}
                          onChange={(e) => setLimitPrice(e.target.value)}
                        />
                        <div className="text-sm text-muted-foreground">
                          Current price: $0.0845
                        </div>
                      </div>
                    )}
                    
                    <Button className="w-full">
                      Place {orderType} Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="pool">
              <Card>
                <CardHeader>
                  <CardTitle>Liquidity Pool</CardTitle>
                  <CardDescription>
                    Add tokens to liquidity pools and earn trading fees
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 space-y-4">
                      <h3 className="font-medium">My Liquidity Positions</h3>
                      
                      <div className="text-center py-8 text-muted-foreground">
                        You don't have any active liquidity positions
                      </div>
                      
                      <Button className="w-full">
                        Add Liquidity
                      </Button>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-4">Available Pools</h3>
                      
                      <div className="space-y-2">
                        {[
                          { pair: "NETX/CONTX", tvl: "$240,000", apy: "24%" },
                          { pair: "NETX/DEVX", tvl: "$180,000", apy: "18%" },
                          { pair: "CONTX/DEVX", tvl: "$120,000", apy: "15%" }
                        ].map((pool, index) => (
                          <div key={index} className="flex justify-between items-center p-3 border rounded">
                            <div>
                              <div className="font-medium">{pool.pair}</div>
                              <div className="text-sm text-muted-foreground">TVL: {pool.tvl}</div>
                            </div>
                            <div>
                              <div className="text-green-500 font-medium">{pool.apy} APY</div>
                              <Button size="sm" variant="outline" className="mt-1">
                                Add
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Overview</CardTitle>
              <CardDescription>
                Latest prices for NETX tokens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tokens.map((token) => (
                  <div key={token.id} className="flex justify-between items-center border-b pb-2 last:border-b-0 last:pb-0">
                    <div className="flex items-center gap-2">
                      <img src={token.logo} alt={token.symbol} className="w-6 h-6 rounded-full" />
                      <div>
                        <div className="font-medium">{token.symbol}</div>
                        <div className="text-xs text-muted-foreground">{token.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div>${token.price.toFixed(4)}</div>
                      <div className={`text-xs ${token.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {token.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Trading Stats</CardTitle>
              <CardDescription>
                24h network statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">24h Volume</div>
                    <div className="text-xl font-bold">$2.34M</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Transactions</div>
                    <div className="text-xl font-bold">12,540</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Active Traders</div>
                    <div className="text-xl font-bold">1,245</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Trading Fee</div>
                    <div className="text-xl font-bold">0.2%</div>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="text-sm text-muted-foreground mb-2">Network Status</div>
                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>Operational - All systems running</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
