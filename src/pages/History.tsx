
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowDownUp, ArrowLeft, ArrowRight, Calendar, Check, ChevronRight, Download, ExternalLink, FileText, Filter, Search, SlidersHorizontal } from "lucide-react";

export default function History() {
  // Dummy transaction data
  const transactions = [
    {
      id: "tx-001",
      type: "Send",
      token: "NETX",
      amount: "-500 NETX",
      from: "You",
      to: "0x3c4d...9z8y",
      date: "Apr 16, 2025",
      time: "14:32:05",
      status: "Completed",
      fee: "0.001 NETX"
    },
    {
      id: "tx-002",
      type: "Receive",
      token: "CONTX",
      amount: "+1,200 CONTX",
      from: "0x5e6f...1a2b",
      to: "You",
      date: "Apr 15, 2025",
      time: "09:12:45",
      status: "Completed",
      fee: "0.001 NETX"
    },
    {
      id: "tx-003",
      type: "Swap",
      token: "NETX → DEVX",
      amount: "-200 NETX / +1,600 DEVX",
      from: "You",
      to: "Exchange",
      date: "Apr 15, 2025",
      time: "08:47:22",
      status: "Completed",
      fee: "0.002 NETX"
    },
    {
      id: "tx-004",
      type: "Create Token",
      token: "TEST",
      amount: "10,000 TEST",
      from: "You",
      to: "N/A",
      date: "Apr 14, 2025",
      time: "16:23:17",
      status: "Completed",
      fee: "10 NETX"
    },
    {
      id: "tx-005",
      type: "Burn",
      token: "TEST",
      amount: "-1,000 TEST",
      from: "You",
      to: "0x0000...0000",
      date: "Apr 14, 2025",
      time: "16:42:39",
      status: "Completed",
      fee: "0.001 NETX"
    },
    {
      id: "tx-006",
      type: "Buy",
      token: "CONTX",
      amount: "+500 CONTX",
      from: "Exchange",
      to: "You",
      date: "Apr 13, 2025",
      time: "11:05:52",
      status: "Completed",
      fee: "0.002 NETX"
    },
    {
      id: "tx-007",
      type: "Stake",
      token: "NETX",
      amount: "-1,000 NETX",
      from: "You",
      to: "Staking Pool",
      date: "Apr 12, 2025",
      time: "09:32:18",
      status: "Completed",
      fee: "0.001 NETX"
    },
    {
      id: "tx-008",
      type: "Send",
      token: "DEVX",
      amount: "-300 DEVX",
      from: "You",
      to: "0x7g8h...3c4d",
      date: "Apr 10, 2025",
      time: "14:17:33",
      status: "Completed",
      fee: "0.001 NETX"
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Transaction History</h1>
        <p className="text-muted-foreground">View and manage your blockchain transactions</p>
      </div>
      
      <Tabs defaultValue="all">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all">All Transactions</TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
            <TabsTrigger value="received">Received</TabsTrigger>
            <TabsTrigger value="swaps">Swaps</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="bg-card border rounded-md p-4 mb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-9"
              />
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[120px]">
                  <SelectValue placeholder="Token" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tokens</SelectItem>
                  <SelectItem value="NETX">NETX</SelectItem>
                  <SelectItem value="CONTX">CONTX</SelectItem>
                  <SelectItem value="DEVX">DEVX</SelectItem>
                  <SelectItem value="TEST">TEST</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <TabsContent value="all">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction</TableHead>
                      <TableHead>Token</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="hidden md:table-cell">From/To</TableHead>
                      <TableHead className="hidden md:table-cell">Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-full ${
                              tx.type === 'Receive' || tx.type === 'Buy' 
                                ? 'bg-green-500/10' 
                                : tx.type === 'Send' || tx.type === 'Burn'
                                ? 'bg-red-500/10'
                                : 'bg-blue-500/10'
                            }`}>
                              <ArrowDownUp className={`h-3.5 w-3.5 ${
                                tx.type === 'Receive' || tx.type === 'Buy' 
                                  ? 'text-green-500' 
                                  : tx.type === 'Send' || tx.type === 'Burn'
                                  ? 'text-red-500'
                                  : 'text-blue-500'
                              }`} />
                            </div>
                            <div>
                              <div className="font-medium">{tx.type}</div>
                              <div className="text-xs text-muted-foreground">
                                {tx.id}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <Badge variant="outline">{tx.token}</Badge>
                        </TableCell>
                        
                        <TableCell className={
                          tx.amount.startsWith('+') ? 'text-green-500' : 
                          tx.amount.startsWith('-') ? 'text-red-500' : ''
                        }>
                          {tx.amount}
                        </TableCell>
                        
                        <TableCell className="hidden md:table-cell">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1 text-xs">
                              <span className="text-muted-foreground">From:</span>
                              <span className="font-mono">{tx.from}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs mt-0.5">
                              <span className="text-muted-foreground">To:</span>
                              <span className="font-mono">{tx.to}</span>
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell className="hidden md:table-cell">
                          <div className="flex flex-col">
                            <div className="text-xs">{tx.date}</div>
                            <div className="text-xs text-muted-foreground">{tx.time}</div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                            <span className="text-xs">{tx.status}</span>
                          </div>
                        </TableCell>
                        
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex items-center justify-between p-4">
                <div className="text-sm text-muted-foreground">
                  Showing 8 of 125 transactions
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" disabled>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="icon">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sent">
          <Card>
            <CardHeader>
              <CardTitle>Sent Transactions</CardTitle>
              <CardDescription>
                All outgoing transactions from your wallets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>Select this tab to view your sent transactions</p>
                <p className="text-sm">This content would show filtered transactions</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="received">
          <Card>
            <CardHeader>
              <CardTitle>Received Transactions</CardTitle>
              <CardDescription>
                All incoming transactions to your wallets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>Select this tab to view your received transactions</p>
                <p className="text-sm">This content would show filtered transactions</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="swaps">
          <Card>
            <CardHeader>
              <CardTitle>Swap Transactions</CardTitle>
              <CardDescription>
                All token swap transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>Select this tab to view your swap transactions</p>
                <p className="text-sm">This content would show filtered transactions</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="other">
          <Card>
            <CardHeader>
              <CardTitle>Other Transactions</CardTitle>
              <CardDescription>
                Other transactions such as token creation, staking, etc.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>Select this tab to view other transaction types</p>
                <p className="text-sm">This content would show filtered transactions</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Transaction Summary</CardTitle>
          <CardDescription>
            Analysis of your transaction activities
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Transactions</div>
            <div className="text-3xl font-bold">125</div>
            <div className="text-xs text-green-500 mt-1">+12 in the last 7 days</div>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="text-sm text-muted-foreground mb-1">Transaction Value</div>
            <div className="text-3xl font-bold">5,420 NETX</div>
            <div className="text-xs text-green-500 mt-1">+320 NETX in the last 7 days</div>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="text-sm text-muted-foreground mb-1">Network Fees Paid</div>
            <div className="text-3xl font-bold">12.25 NETX</div>
            <div className="text-xs text-muted-foreground mt-1">Average: 0.001 NETX per transaction</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
