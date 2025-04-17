
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, ArrowDown, ArrowRight, ArrowUp, BarChart4, TrendingDown, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Sample trading pairs
const tradingPairs = [
  { id: "netx-usdt", base: "NETX", quote: "USDT", price: 0.0845, change24h: 5.23 },
  { id: "netx-eth", base: "NETX", quote: "ETH", price: 0.000052, change24h: 2.87 },
  { id: "contx-netx", base: "CONTX", quote: "NETX", price: 0.952, change24h: -1.24 },
  { id: "devx-netx", base: "DEVX", quote: "NETX", price: 0.325, change24h: 7.56 },
  { id: "buildx-netx", base: "BUILDX", quote: "NETX", price: 0.187, change24h: -0.82 },
];

// Sample order history
const orderHistory = [
  { id: "1", pair: "NETX/USDT", type: "buy", price: 0.0842, amount: 1200, total: 101.04, status: "completed", date: "2025-04-16 14:32" },
  { id: "2", pair: "NETX/ETH", type: "sell", price: 0.000051, amount: 500, total: 0.0255, status: "completed", date: "2025-04-15 09:15" },
  { id: "3", pair: "CONTX/NETX", type: "buy", price: 0.945, amount: 800, total: 756, status: "completed", date: "2025-04-14 17:22" },
  { id: "4", pair: "NETX/USDT", type: "sell", price: 0.0838, amount: 350, total: 29.33, status: "completed", date: "2025-04-13 11:05" },
];

// Sample open orders
const openOrders = [
  { id: "5", pair: "NETX/USDT", type: "buy", price: 0.0830, amount: 1500, total: 124.5, date: "2025-04-17 08:45" },
  { id: "6", pair: "DEVX/NETX", type: "sell", price: 0.330, amount: 600, total: 198, date: "2025-04-17 10:12" },
];

export default function Trading() {
  const [selectedPair, setSelectedPair] = useState(tradingPairs[0]);
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState(selectedPair.price.toString());
  
  // Calculate total based on amount and price
  const total = parseFloat(amount) * parseFloat(price) || 0;
  
  // Fee calculation (0.2% trading fee)
  const fee = total * 0.002;
  
  // Function to handle trading pair change
  const handlePairChange = (pairId: string) => {
    const pair = tradingPairs.find(p => p.id === pairId);
    if (pair) {
      setSelectedPair(pair);
      setPrice(pair.price.toString());
    }
  };
  
  // Function to handle order submission
  const handleSubmitOrder = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (!price || parseFloat(price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    
    // Show payment confirmation dialog
    if (!window.confirm(`This trading operation will cost ${fee.toFixed(6)} ${orderType === "buy" ? selectedPair.quote : selectedPair.base} in fees. Do you want to proceed?`)) {
      return;
    }
    
    // Process the order
    toast.success(`${orderType.toUpperCase()} order placed successfully`, {
      description: `${amount} ${orderType === "buy" ? selectedPair.base : selectedPair.quote} at ${price} ${selectedPair.quote}`
    });
    
    // Reset form
    setAmount("");
  };
  
  // Function to handle order cancellation
  const handleCancelOrder = (orderId: string) => {
    toast.success(`Order ${orderId} cancelled successfully`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Trading</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trading Chart Area */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">
                  {selectedPair.base}/{selectedPair.quote}
                </CardTitle>
                <CardDescription>
                  Current Price: {selectedPair.price} {selectedPair.quote}
                </CardDescription>
              </div>
              <Badge 
                variant={selectedPair.change24h >= 0 ? "default" : "destructive"} 
                className={selectedPair.change24h >= 0 ? "bg-green-500 hover:bg-green-600" : ""}
              >
                <span className="flex items-center gap-1">
                  {selectedPair.change24h >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {selectedPair.change24h >= 0 ? "+" : ""}{selectedPair.change24h.toFixed(2)}%
                </span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-6 h-[300px] bg-muted/20 rounded-md flex items-center justify-center">
              <div className="text-center">
                <BarChart4 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Trading chart will be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Order Form */}
        <Card>
          <CardHeader>
            <CardTitle>Place Order</CardTitle>
            <CardDescription>
              Trading fee: 0.2%
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="pair">Trading Pair</Label>
                <Select value={selectedPair.id} onValueChange={handlePairChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trading pair" />
                  </SelectTrigger>
                  <SelectContent>
                    {tradingPairs.map((pair) => (
                      <SelectItem key={pair.id} value={pair.id}>
                        {pair.base}/{pair.quote}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <div className="flex rounded-md overflow-hidden mb-2">
                  <Button 
                    type="button" 
                    className={`flex-1 rounded-none ${orderType === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-muted'}`}
                    onClick={() => setOrderType('buy')}
                  >
                    BUY
                  </Button>
                  <Button 
                    type="button" 
                    className={`flex-1 rounded-none ${orderType === 'sell' ? 'bg-red-600 hover:bg-red-700' : 'bg-muted'}`}
                    onClick={() => setOrderType('sell')}
                  >
                    SELL
                  </Button>
                </div>
                
                <Alert variant="outline" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Trading Requires Payment</AlertTitle>
                  <AlertDescription>
                    Trading operations cost {fee.toFixed(6)} {orderType === "buy" ? selectedPair.quote : selectedPair.base} in fees.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="price">Price ({selectedPair.quote})</Label>
                    <Input 
                      id="price" 
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      step="0.000001"
                      min="0"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="amount">Amount ({selectedPair.base})</Label>
                    <Input 
                      id="amount" 
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      step="0.000001"
                      min="0"
                    />
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex justify-between text-sm pb-1">
                      <span>Total</span>
                      <span>{total.toFixed(6)} {selectedPair.quote}</span>
                    </div>
                    <div className="flex justify-between text-sm pb-1">
                      <span>Fee (0.2%)</span>
                      <span>{fee.toFixed(6)} {orderType === "buy" ? selectedPair.quote : selectedPair.base}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full ${orderType === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                    onClick={handleSubmitOrder}
                  >
                    {orderType === 'buy' ? 'Buy' : 'Sell'} {selectedPair.base}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Order History and Open Orders */}
      <div>
        <Tabs defaultValue="open-orders">
          <TabsList className="mb-4">
            <TabsTrigger value="open-orders">Open Orders</TabsTrigger>
            <TabsTrigger value="order-history">Order History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="open-orders">
            <Card>
              <CardHeader>
                <CardTitle>Open Orders</CardTitle>
                <CardDescription>
                  Your active trading orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                {openOrders.length > 0 ? (
                  <div className="rounded-md border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Pair</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {openOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>{order.pair}</TableCell>
                            <TableCell>
                              <Badge variant={order.type === 'buy' ? 'default' : 'destructive'} className={order.type === 'buy' ? 'bg-green-500' : ''}>
                                {order.type.toUpperCase()}
                              </Badge>
                            </TableCell>
                            <TableCell>{order.price}</TableCell>
                            <TableCell>{order.amount}</TableCell>
                            <TableCell>{order.total}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleCancelOrder(order.id)}
                              >
                                Cancel
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No open orders</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="order-history">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>
                  Your past trading activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                {orderHistory.length > 0 ? (
                  <div className="rounded-md border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Pair</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orderHistory.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>{order.pair}</TableCell>
                            <TableCell>
                              <Badge variant={order.type === 'buy' ? 'default' : 'destructive'} className={order.type === 'buy' ? 'bg-green-500' : ''}>
                                {order.type.toUpperCase()}
                              </Badge>
                            </TableCell>
                            <TableCell>{order.price}</TableCell>
                            <TableCell>{order.amount}</TableCell>
                            <TableCell>{order.total}</TableCell>
                            <TableCell>
                              <Badge variant="default" className="bg-blue-500">
                                {order.status.toUpperCase()}
                              </Badge>
                            </TableCell>
                            <TableCell>{order.date}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No order history</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
