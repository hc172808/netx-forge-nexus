
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart4, Box, Check, ChevronRight, Coins, Database, ExternalLink, 
  FileText, Link, Network, Search, Server, Shield, Timer, Upload
} from "lucide-react";

export default function Explorer() {
  // Mock blockchain data
  const latestBlocks = [
    { id: "1258741", time: "2 mins ago", transactions: 24, miner: "0x1a2b...7z8y", size: "45.2 KB" },
    { id: "1258740", time: "5 mins ago", transactions: 18, miner: "0x3c4d...9z8y", size: "38.7 KB" },
    { id: "1258739", time: "7 mins ago", transactions: 32, miner: "0x5e6f...1a2b", size: "51.4 KB" },
    { id: "1258738", time: "10 mins ago", transactions: 12, miner: "0x7g8h...3c4d", size: "29.5 KB" },
    { id: "1258737", time: "15 mins ago", transactions: 27, miner: "0x9i0j...5e6f", size: "43.8 KB" },
  ];
  
  const latestTransactions = [
    { hash: "0xfe25...7c91", from: "0x1a2b...7z8y", to: "0x3c4d...9z8y", value: "500 NETX", time: "1 min ago" },
    { hash: "0x72ab...1f43", from: "0x5e6f...1a2b", to: "0x7g8h...3c4d", value: "1,200 CONTX", time: "3 mins ago" },
    { hash: "0xc914...8d27", from: "0x9i0j...5e6f", to: "0x1a2b...7z8y", value: "800 DEVX", time: "5 mins ago" },
    { hash: "0x5e72...9f14", from: "0x3c4d...9z8y", to: "0x5e6f...1a2b", value: "350 NETX", time: "8 mins ago" },
    { hash: "0x8f19...3d67", from: "0x7g8h...3c4d", to: "0x9i0j...5e6f", value: "650 CONTX", time: "12 mins ago" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Blockchain Explorer</h1>
        <p className="text-muted-foreground">Explore the NETX blockchain - blocks, transactions, tokens, and more</p>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input 
          className="pl-10 h-12 text-lg" 
          placeholder="Search by address, transaction hash, block, token..." 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Box className="h-4 w-4 mr-2 text-primary" />
              Latest Block
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestBlocks[0].id}</div>
            <p className="text-muted-foreground text-sm">{latestBlocks[0].time}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Timer className="h-4 w-4 mr-2 text-primary" />
              Block Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4s</div>
            <p className="text-muted-foreground text-sm">Average block generation</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Shield className="h-4 w-4 mr-2 text-primary" />
              Network Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-xl font-medium">Healthy</span>
            </div>
            <p className="text-muted-foreground text-sm">100% uptime</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Database className="h-4 w-4 mr-2 text-primary" />
              Chain Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">58.7 GB</div>
            <p className="text-muted-foreground text-sm">Total blockchain data</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="blocks">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="blocks">
            <Box className="h-4 w-4 mr-2" />
            Blocks
          </TabsTrigger>
          <TabsTrigger value="transactions">
            <FileText className="h-4 w-4 mr-2" />
            Transactions
          </TabsTrigger>
          <TabsTrigger value="nodes">
            <Server className="h-4 w-4 mr-2" />
            Network
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="blocks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Latest Blocks</CardTitle>
              <CardDescription>
                Recently mined blocks on the NETX blockchain
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Block</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Txns</TableHead>
                      <TableHead>Miner</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {latestBlocks.map((block, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Box className="h-4 w-4 text-primary" />
                            {block.id}
                          </div>
                        </TableCell>
                        <TableCell>{block.time}</TableCell>
                        <TableCell>{block.transactions}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <img src="https://placehold.co/30x30/33a3ee/ffffff.png?text=M" alt="Miner" />
                            </Avatar>
                            {block.miner}
                          </div>
                        </TableCell>
                        <TableCell>{block.size}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 text-right">
                <Button variant="outline">View All Blocks</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Latest Transactions</CardTitle>
              <CardDescription>
                Recently executed transactions on the NETX blockchain
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tx Hash</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {latestTransactions.map((tx, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            {tx.hash}
                          </div>
                        </TableCell>
                        <TableCell>{tx.from}</TableCell>
                        <TableCell>{tx.to}</TableCell>
                        <TableCell>{tx.value}</TableCell>
                        <TableCell>{tx.time}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 text-right">
                <Button variant="outline">View All Transactions</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="nodes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Network Status</CardTitle>
              <CardDescription>
                Active nodes in the NETX blockchain network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {[
                  { title: "Active Nodes", value: "42", icon: Server },
                  { title: "Main Nodes", value: "15", icon: Database },
                  { title: "Slave Nodes", value: "27", icon: Link },
                  { title: "Network Performance", value: "98.7%", icon: BarChart4 },
                  { title: "Average Latency", value: "85ms", icon: Timer },
                  { title: "Synced Nodes", value: "100%", icon: Check },
                ].map((item, index) => (
                  <div key={index} className="bg-secondary/20 rounded-lg p-4 flex items-center gap-3">
                    <div className="bg-secondary rounded-full p-2">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{item.title}</div>
                      <div className="text-xl font-bold">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Node ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Connections</TableHead>
                      <TableHead>Uptime</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { id: "node-001", type: "main", region: "US-East", status: "online", connections: 24, uptime: "99.9%" },
                      { id: "node-002", type: "main", region: "Europe", status: "online", connections: 18, uptime: "99.8%" },
                      { id: "node-003", type: "slave", region: "Asia", status: "online", connections: 12, uptime: "99.7%" },
                      { id: "node-004", type: "slave", region: "US-West", status: "online", connections: 21, uptime: "99.9%" },
                      { id: "node-005", type: "slave", region: "Australia", status: "online", connections: 15, uptime: "99.5%" },
                    ].map((node, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-mono text-sm">{node.id}</TableCell>
                        <TableCell>
                          {node.type === "main" ? (
                            <Badge className="bg-primary">Main</Badge>
                          ) : (
                            <Badge variant="secondary">Slave</Badge>
                          )}
                        </TableCell>
                        <TableCell>{node.region}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            Online
                          </div>
                        </TableCell>
                        <TableCell>{node.connections}</TableCell>
                        <TableCell>{node.uptime}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-4 flex justify-between">
                <div className="flex items-center text-sm">
                  <Network className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>Network map is refreshed every 5 minutes</span>
                </div>
                <Button variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Network Map
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
