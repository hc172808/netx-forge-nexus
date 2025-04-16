
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownUp, ArrowRightLeft, Calculator, ChevronDown, ChevronUp, Repeat, Wallet } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function Exchange() {
  const [fromToken, setFromToken] = useState("NETX");
  const [toToken, setToToken] = useState("CONTX");
  const [fromAmount, setFromAmount] = useState("1");
  const [toAmount, setToAmount] = useState("4.2");
  
  const dummyTokens = [
    {
      symbol: "NETX",
      name: "NETX Coin",
      balance: "2,500.00",
      price: 1,
      logo: "https://placehold.co/200x200/4c54e8/ffffff.png?text=NETX"
    },
    {
      symbol: "CONTX",
      name: "Contractor Token",
      balance: "5,000.00",
      price: 0.24,
      logo: "https://placehold.co/200x200/33a3ee/ffffff.png?text=CONTX"
    },
    {
      symbol: "DEVX",
      name: "Developer Token",
      balance: "10,000.00",
      price: 0.12,
      logo: "https://placehold.co/200x200/42c9af/ffffff.png?text=DEVX"
    }
  ];
  
  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    
    setFromAmount(toAmount);
    calculateToAmount(toAmount, toToken, fromToken);
  };
  
  const calculateToAmount = (amount: string, from: string, to: string) => {
    const fromTokenData = dummyTokens.find(t => t.symbol === from);
    const toTokenData = dummyTokens.find(t => t.symbol === to);
    
    if (fromTokenData && toTokenData && amount) {
      const exchangeRate = fromTokenData.price / toTokenData.price;
      const result = (parseFloat(amount) * exchangeRate).toFixed(2);
      setToAmount(result);
    }
  };
  
  const handleFromAmountChange = (amount: string) => {
    setFromAmount(amount);
    calculateToAmount(amount, fromToken, toToken);
  };
  
  const handleFromTokenChange = (token: string) => {
    setFromToken(token);
    calculateToAmount(fromAmount, token, toToken);
  };
  
  const handleToTokenChange = (token: string) => {
    setToToken(token);
    calculateToAmount(fromAmount, fromToken, token);
  };
  
  const getExchangeRate = () => {
    const fromTokenData = dummyTokens.find(t => t.symbol === fromToken);
    const toTokenData = dummyTokens.find(t => t.symbol === toToken);
    
    if (fromTokenData && toTokenData) {
      const rate = (fromTokenData.price / toTokenData.price).toFixed(4);
      return `1 ${fromToken} = ${rate} ${toToken}`;
    }
    return "";
  };
  
  const currentFromToken = dummyTokens.find(t => t.symbol === fromToken);
  const currentToToken = dummyTokens.find(t => t.symbol === toToken);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Exchange</h1>
        <p className="text-muted-foreground">Swap tokens instantly on the NETX Forge Exchange</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Swap Tokens</CardTitle>
              <CardDescription>
                Exchange tokens at the best available rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <div className="flex justify-between mb-1">
                      <label className="text-sm font-medium">From</label>
                      {currentFromToken && (
                        <span className="text-sm text-muted-foreground">
                          Balance: {currentFromToken.balance} {currentFromToken.symbol}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="w-full">
                        <Input 
                          type="number" 
                          value={fromAmount}
                          onChange={(e) => handleFromAmountChange(e.target.value)}
                          className="text-lg" 
                        />
                      </div>
                      
                      <Select 
                        value={fromToken}
                        onValueChange={handleFromTokenChange}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select token" />
                        </SelectTrigger>
                        <SelectContent>
                          {dummyTokens.map(token => (
                            <SelectItem 
                              key={token.symbol} 
                              value={token.symbol}
                              disabled={token.symbol === toToken}
                            >
                              <div className="flex items-center gap-2">
                                <Avatar className="h-5 w-5">
                                  <img src={token.logo} alt={token.name} />
                                </Avatar>
                                {token.symbol}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={handleSwapTokens}
                      className="rounded-full bg-background border h-10 w-10 shadow-md"
                    >
                      <ArrowDownUp className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <div className="flex justify-between mb-1">
                      <label className="text-sm font-medium">To</label>
                      {currentToToken && (
                        <span className="text-sm text-muted-foreground">
                          Balance: {currentToToken.balance} {currentToToken.symbol}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="w-full">
                        <Input 
                          type="number" 
                          value={toAmount}
                          readOnly
                          className="text-lg" 
                        />
                      </div>
                      
                      <Select 
                        value={toToken}
                        onValueChange={handleToTokenChange}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select token" />
                        </SelectTrigger>
                        <SelectContent>
                          {dummyTokens.map(token => (
                            <SelectItem 
                              key={token.symbol} 
                              value={token.symbol}
                              disabled={token.symbol === fromToken}
                            >
                              <div className="flex items-center gap-2">
                                <Avatar className="h-5 w-5">
                                  <img src={token.logo} alt={token.name} />
                                </Avatar>
                                {token.symbol}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/20 p-3 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Exchange Rate</span>
                      <span>{getExchangeRate()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Network Fee</span>
                      <span>0.001 NETX</span>
                    </div>
                  </div>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Repeat className="h-4 w-4 mr-2" />
                      Swap Tokens
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Swap</DialogTitle>
                      <DialogDescription>
                        Review the details of your token swap
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {currentFromToken && (
                            <Avatar className="h-8 w-8">
                              <img src={currentFromToken.logo} alt={currentFromToken.name} />
                            </Avatar>
                          )}
                          <div>
                            <div className="font-medium">{fromAmount} {fromToken}</div>
                            <div className="text-xs text-muted-foreground">From your wallet</div>
                          </div>
                        </div>
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {currentToToken && (
                            <Avatar className="h-8 w-8">
                              <img src={currentToToken.logo} alt={currentToToken.name} />
                            </Avatar>
                          )}
                          <div>
                            <div className="font-medium">{toAmount} {toToken}</div>
                            <div className="text-xs text-muted-foreground">To your wallet</div>
                          </div>
                        </div>
                        <ChevronUp className="h-5 w-5 text-green-500" />
                      </div>
                      
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Exchange Rate</span>
                          <span>{getExchangeRate()}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Network Fee</span>
                          <span>0.001 NETX</span>
                        </div>
                        <div className="flex justify-between text-sm font-medium">
                          <span>Total</span>
                          <span>{fromAmount} {fromToken}</span>
                        </div>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Confirm Swap</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Trading Pairs</CardTitle>
              <CardDescription>
                Popular token pairs on NETX Forge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { pair: "NETX/CONTX", rate: "1 = 4.2", change: "+2.5%" },
                  { pair: "NETX/DEVX", rate: "1 = 8.3", change: "-0.8%" },
                  { pair: "DEVX/CONTX", rate: "1 = 0.5", change: "+1.2%" },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer">
                    <div>
                      <div className="font-medium">{item.pair}</div>
                      <div className="text-sm text-muted-foreground">{item.rate}</div>
                    </div>
                    <div className={item.change.startsWith("+") ? "text-green-500" : "text-red-500"}>
                      {item.change}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" className="w-full">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculator
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Your Recent Swaps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { from: "500 NETX", to: "2,100 CONTX", time: "2 hours ago" },
                  { from: "1,000 DEVX", to: "120 NETX", time: "1 day ago" },
                  { from: "200 CONTX", to: "100 DEVX", time: "3 days ago" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm">
                        <span>{item.from}</span>
                        <span className="text-muted-foreground">→</span>
                        <span>{item.to}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <Button variant="outline" className="w-full">View All Transactions</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
