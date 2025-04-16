
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  AlertCircle, ArrowUpDown, Ban, Check, Coins, Database, Edit, Plus, Search, Server, Trash, UserCheck 
} from "lucide-react";
import { useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Mock data for tokens
const initialTokens = [
  { 
    id: "1", 
    name: "NETX Coin", 
    symbol: "NETX", 
    marketCap: "1,250,000", 
    status: "active", 
    creator: "Admin (Genesis)",
    createdAt: "Jan 01, 2025"
  },
  { 
    id: "2", 
    name: "Contractor Token", 
    symbol: "CONTX", 
    marketCap: "450,000", 
    status: "active", 
    creator: "0xef43...7891",
    createdAt: "Mar 15, 2025"
  },
  { 
    id: "3", 
    name: "Developer Token", 
    symbol: "DEVX", 
    marketCap: "210,000", 
    status: "active", 
    creator: "0xab12...3456",
    createdAt: "Mar 20, 2025"
  },
  { 
    id: "4", 
    name: "Test Token", 
    symbol: "TEST", 
    marketCap: "5,000", 
    status: "pending", 
    creator: "0x9876...5432",
    createdAt: "Apr 10, 2025"
  },
];

// Mock data for nodes
const initialNodes = [
  { 
    id: "node-001", 
    name: "Main Node Alpha", 
    type: "main", 
    status: "online", 
    ip: "192.168.1.1", 
    region: "US-East",
    connections: 24,
    lastSeen: "1 min ago" 
  },
  { 
    id: "node-002", 
    name: "Main Node Beta", 
    type: "main", 
    status: "online", 
    ip: "192.168.1.2", 
    region: "Europe",
    connections: 18,
    lastSeen: "2 min ago" 
  },
  { 
    id: "node-003", 
    name: "Slave Node 1", 
    type: "slave", 
    status: "online", 
    ip: "192.168.2.1", 
    region: "Asia",
    connections: 12,
    lastSeen: "5 min ago" 
  },
  { 
    id: "node-004", 
    name: "Slave Node 2", 
    type: "slave", 
    status: "offline", 
    ip: "192.168.2.2", 
    region: "US-West",
    connections: 0,
    lastSeen: "1 hour ago" 
  },
];

export default function Admin() {
  const [tokens, setTokens] = useState(initialTokens);
  const [nodes, setNodes] = useState(initialNodes);
  const [tokenSearchValue, setTokenSearchValue] = useState("");
  const [nodeSearchValue, setNodeSearchValue] = useState("");
  const { toast } = useToast();
  
  // New state for form data
  const [newTokenData, setNewTokenData] = useState({
    name: "",
    symbol: "",
    marketCap: "",
    status: "pending",
    creator: "Admin"
  });
  
  const [newNodeData, setNewNodeData] = useState({
    name: "",
    type: "slave",
    ip: "",
    region: "US-East"
  });

  // Functions for token management
  const disableToken = (id: string) => {
    setTokens(tokens.map(token => 
      token.id === id ? { ...token, status: token.status === "active" ? "disabled" : "active" } : token
    ));
    
    toast({
      title: "Token Status Updated",
      description: "The token status has been successfully changed.",
    });
  };

  const removeToken = (id: string) => {
    setTokens(tokens.filter(token => token.id !== id));
    
    toast({
      title: "Token Removed",
      description: "The token has been successfully removed from the system.",
    });
  };
  
  const addNewToken = () => {
    const newToken = {
      id: (tokens.length + 1).toString(),
      name: newTokenData.name,
      symbol: newTokenData.symbol,
      marketCap: newTokenData.marketCap,
      status: newTokenData.status,
      creator: newTokenData.creator,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    };
    
    setTokens([...tokens, newToken]);
    setNewTokenData({
      name: "",
      symbol: "",
      marketCap: "",
      status: "pending",
      creator: "Admin"
    });
    
    toast({
      title: "Token Added",
      description: `New token ${newTokenData.name} (${newTokenData.symbol}) has been created.`,
    });
  };

  const filteredTokens = tokens.filter(token => 
    token.name.toLowerCase().includes(tokenSearchValue.toLowerCase()) || 
    token.symbol.toLowerCase().includes(tokenSearchValue.toLowerCase())
  );

  // Functions for node management
  const toggleNodeStatus = (id: string) => {
    setNodes(nodes.map(node => 
      node.id === id ? { ...node, status: node.status === "online" ? "offline" : "online" } : node
    ));
    
    toast({
      title: "Node Status Updated",
      description: "The node status has been successfully changed.",
    });
  };

  const removeNode = (id: string) => {
    setNodes(nodes.filter(node => node.id !== id));
    
    toast({
      title: "Node Removed",
      description: "The node has been successfully removed from the network.",
    });
  };
  
  const addNewNode = (type: "main" | "slave") => {
    const newNode = {
      id: `node-${(nodes.length + 1).toString().padStart(3, '0')}`,
      name: newNodeData.name,
      type: type,
      status: "offline",
      ip: newNodeData.ip,
      region: newNodeData.region,
      connections: 0,
      lastSeen: "Just now"
    };
    
    setNodes([...nodes, newNode]);
    setNewNodeData({
      name: "",
      type: "slave",
      ip: "",
      region: "US-East"
    });
    
    toast({
      title: "Node Added",
      description: `New ${type} node "${newNodeData.name}" has been added to the network.`,
    });
  };

  const filteredNodes = nodes.filter(node => 
    node.name.toLowerCase().includes(nodeSearchValue.toLowerCase()) || 
    node.id.toLowerCase().includes(nodeSearchValue.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Admin</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold mt-2">Admin Panel</h1>
        <p className="text-muted-foreground">Manage tokens, nodes, and system configurations</p>
      </div>
      
      <Tabs defaultValue="tokens">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tokens">
            <Coins className="mr-2 h-4 w-4" />
            Token Management
          </TabsTrigger>
          <TabsTrigger value="nodes">
            <Server className="mr-2 h-4 w-4" />
            Node Configuration
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tokens" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Token Management</CardTitle>
              <CardDescription>
                Add, remove, or disable tokens in the NETX Forge ecosystem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-72">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tokens..."
                    className="pl-8"
                    value={tokenSearchValue}
                    onChange={(e) => setTokenSearchValue(e.target.value)}
                  />
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Token
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Token</DialogTitle>
                      <DialogDescription>
                        Create a new token in the NETX Forge ecosystem.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="token-name" className="text-right">
                          Name
                        </Label>
                        <Input 
                          id="token-name" 
                          value={newTokenData.name} 
                          onChange={(e) => setNewTokenData({...newTokenData, name: e.target.value})} 
                          className="col-span-3" 
                          placeholder="e.g. NETX Token"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="token-symbol" className="text-right">
                          Symbol
                        </Label>
                        <Input 
                          id="token-symbol" 
                          value={newTokenData.symbol} 
                          onChange={(e) => setNewTokenData({...newTokenData, symbol: e.target.value})} 
                          className="col-span-3" 
                          placeholder="e.g. NTX"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="token-market-cap" className="text-right">
                          Market Cap
                        </Label>
                        <Input 
                          id="token-market-cap" 
                          value={newTokenData.marketCap} 
                          onChange={(e) => setNewTokenData({...newTokenData, marketCap: e.target.value})} 
                          className="col-span-3" 
                          placeholder="e.g. 1,000,000"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={addNewToken}>Add Token</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Market Cap</TableHead>
                      <TableHead>Created By</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTokens.map((token) => (
                      <TableRow key={token.id}>
                        <TableCell className="font-medium">{token.name}</TableCell>
                        <TableCell>{token.symbol}</TableCell>
                        <TableCell>${token.marketCap}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{token.creator}</span>
                            <span className="text-xs text-muted-foreground">{token.createdAt}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {token.status === "active" ? (
                            <Badge className="bg-green-500">Active</Badge>
                          ) : token.status === "disabled" ? (
                            <Badge variant="secondary">Disabled</Badge>
                          ) : (
                            <Badge variant="outline">Pending</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => {}}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => disableToken(token.id)}
                            >
                              {token.status === "active" ? (
                                <Ban className="h-4 w-4 text-destructive" />
                              ) : (
                                <Check className="h-4 w-4 text-green-500" />
                              )}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => removeToken(token.id)}
                              className="text-destructive"
                            >
                              <Trash className="h-4 w-4" />
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
        </TabsContent>
        
        <TabsContent value="nodes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Node Configuration</CardTitle>
              <CardDescription>
                Manage main and slave nodes in the NETX Forge network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-72">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search nodes..."
                    className="pl-8"
                    value={nodeSearchValue}
                    onChange={(e) => setNodeSearchValue(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Main Node
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Main Node</DialogTitle>
                        <DialogDescription>
                          Add a new main node to the NETX Forge network.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="node-name" className="text-right">
                            Name
                          </Label>
                          <Input 
                            id="node-name" 
                            value={newNodeData.name} 
                            onChange={(e) => setNewNodeData({...newNodeData, name: e.target.value})} 
                            className="col-span-3" 
                            placeholder="e.g. Main Node Alpha"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="node-ip" className="text-right">
                            IP Address
                          </Label>
                          <Input 
                            id="node-ip" 
                            value={newNodeData.ip} 
                            onChange={(e) => setNewNodeData({...newNodeData, ip: e.target.value})} 
                            className="col-span-3" 
                            placeholder="e.g. 192.168.1.1"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="node-region" className="text-right">
                            Region
                          </Label>
                          <Input 
                            id="node-region" 
                            value={newNodeData.region} 
                            onChange={(e) => setNewNodeData({...newNodeData, region: e.target.value})} 
                            className="col-span-3" 
                            placeholder="e.g. US-East"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={() => addNewNode("main")}>Add Main Node</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Slave Node
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Slave Node</DialogTitle>
                        <DialogDescription>
                          Add a new slave node to the NETX Forge network.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="node-name-slave" className="text-right">
                            Name
                          </Label>
                          <Input 
                            id="node-name-slave" 
                            value={newNodeData.name} 
                            onChange={(e) => setNewNodeData({...newNodeData, name: e.target.value})} 
                            className="col-span-3" 
                            placeholder="e.g. Slave Node 1"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="node-ip-slave" className="text-right">
                            IP Address
                          </Label>
                          <Input 
                            id="node-ip-slave" 
                            value={newNodeData.ip} 
                            onChange={(e) => setNewNodeData({...newNodeData, ip: e.target.value})} 
                            className="col-span-3" 
                            placeholder="e.g. 192.168.1.2"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="node-region-slave" className="text-right">
                            Region
                          </Label>
                          <Input 
                            id="node-region-slave" 
                            value={newNodeData.region} 
                            onChange={(e) => setNewNodeData({...newNodeData, region: e.target.value})} 
                            className="col-span-3" 
                            placeholder="e.g. US-East"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={() => addNewNode("slave")}>Add Slave Node</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Node ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>Connections</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Seen</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredNodes.map((node) => (
                      <TableRow key={node.id}>
                        <TableCell className="font-mono text-xs">{node.id}</TableCell>
                        <TableCell className="font-medium">{node.name}</TableCell>
                        <TableCell>
                          {node.type === "main" ? (
                            <Badge className="bg-primary">Main</Badge>
                          ) : (
                            <Badge variant="secondary">Slave</Badge>
                          )}
                        </TableCell>
                        <TableCell>{node.region}</TableCell>
                        <TableCell>{node.connections}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className={`h-2 w-2 rounded-full mr-2 ${
                              node.status === "online" ? "bg-green-500" : "bg-destructive"
                            }`} />
                            {node.status === "online" ? "Online" : "Offline"}
                          </div>
                        </TableCell>
                        <TableCell>{node.lastSeen}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => {}}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => toggleNodeStatus(node.id)}
                            >
                              {node.status === "online" ? (
                                <Ban className="h-4 w-4 text-destructive" />
                              ) : (
                                <Check className="h-4 w-4 text-green-500" />
                              )}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => removeNode(node.id)}
                              className="text-destructive"
                            >
                              <Trash className="h-4 w-4" />
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
