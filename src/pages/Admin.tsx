
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  AlertCircle, ArrowUpDown, Ban, Check, Coins, Database, Edit, Plus, Search, Server, 
  Trash, UserCheck, Smartphone, Cpu, HardDrive, Download
} from "lucide-react";
import { useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

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

// New mock data for app builds
const initialAppBuilds = [
  {
    id: "app-001",
    name: "NETX Mobile Wallet",
    type: "mobile",
    platform: "Android",
    status: "completed",
    version: "1.0.0",
    createdAt: "Apr 15, 2025",
    downloadUrl: "#"
  },
  {
    id: "app-002",
    name: "NETX Mobile Wallet",
    type: "mobile",
    platform: "iOS",
    status: "completed",
    version: "1.0.0",
    createdAt: "Apr 15, 2025",
    downloadUrl: "#"
  },
  {
    id: "app-003",
    name: "NETX Mining Tool",
    type: "desktop",
    platform: "Windows",
    status: "completed",
    version: "1.0.0",
    createdAt: "Apr 16, 2025",
    downloadUrl: "#"
  },
  {
    id: "app-004",
    name: "NETX Node Operator",
    type: "server",
    platform: "Linux",
    status: "building",
    version: "1.0.0",
    createdAt: "Apr 19, 2025",
    progress: 65
  }
];

export default function Admin() {
  const [tokens, setTokens] = useState(initialTokens);
  const [nodes, setNodes] = useState(initialNodes);
  const [appBuilds, setAppBuilds] = useState(initialAppBuilds);
  const [tokenSearchValue, setTokenSearchValue] = useState("");
  const [nodeSearchValue, setNodeSearchValue] = useState("");
  const [appSearchValue, setAppSearchValue] = useState("");
  
  // Add missing state variables
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
  
  // New state for app build dialog
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [buildApp, setBuildApp] = useState({
    name: "",
    type: "mobile",
    platform: "Android"
  });
  
  // Functions for token management
  const disableToken = (id: string) => {
    setTokens(tokens.map(token => 
      token.id === id ? { ...token, status: token.status === "active" ? "disabled" : "active" } : token
    ));
    
    toast.success("Token Status Updated", {
      description: "The token status has been successfully changed."
    });
  };

  const removeToken = (id: string) => {
    setTokens(tokens.filter(token => token.id !== id));
    
    toast.success("Token Removed", {
      description: "The token has been successfully removed from the system."
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
    
    toast.success("Token Added", {
      description: `New token ${newTokenData.name} (${newTokenData.symbol}) has been created.`
    });
  };

  // Functions for node management
  const toggleNodeStatus = (id: string) => {
    setNodes(nodes.map(node => 
      node.id === id ? { ...node, status: node.status === "online" ? "offline" : "online" } : node
    ));
    
    toast.success("Node Status Updated", {
      description: "The node status has been successfully changed."
    });
  };

  const removeNode = (id: string) => {
    setNodes(nodes.filter(node => node.id !== id));
    
    toast.success("Node Removed", {
      description: "The node has been successfully removed from the network."
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
    
    toast.success("Node Added", {
      description: `New ${type} node "${newNodeData.name}" has been added to the network.`
    });
  };

  // Functions for app management
  const startBuildApp = () => {
    // Validate build data
    if (!buildApp.name) {
      toast.error("Build Failed", {
        description: "Please provide a name for the app."
      });
      return;
    }
    
    setIsBuilding(true);
    setBuildProgress(0);
    
    // Simulate build process
    const interval = setInterval(() => {
      setBuildProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const newApp = {
              id: `app-${(appBuilds.length + 1).toString().padStart(3, '0')}`,
              name: buildApp.name,
              type: buildApp.type,
              platform: buildApp.platform,
              status: "completed",
              version: "1.0.0",
              createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
              downloadUrl: "#"
            };
            
            setAppBuilds(prev => [...prev, newApp]);
            setIsBuilding(false);
            
            toast.success("Build Completed", {
              description: `The ${buildApp.name} for ${buildApp.platform} has been built successfully.`
            });
            
            setBuildApp({
              name: "",
              type: "mobile",
              platform: "Android"
            });
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };

  const filteredTokens = tokens.filter(token => 
    token.name.toLowerCase().includes(tokenSearchValue.toLowerCase()) || 
    token.symbol.toLowerCase().includes(tokenSearchValue.toLowerCase())
  );

  const filteredNodes = nodes.filter(node => 
    node.name.toLowerCase().includes(nodeSearchValue.toLowerCase()) || 
    node.id.toLowerCase().includes(nodeSearchValue.toLowerCase())
  );
  
  const filteredApps = appBuilds.filter(app => 
    app.name.toLowerCase().includes(appSearchValue.toLowerCase()) || 
    app.platform.toLowerCase().includes(appSearchValue.toLowerCase())
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
        <p className="text-muted-foreground">Manage tokens, nodes, system configurations, and app builds</p>
      </div>
      
      <Tabs defaultValue="tokens">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tokens">
            <Coins className="mr-2 h-4 w-4" />
            Token Management
          </TabsTrigger>
          <TabsTrigger value="nodes">
            <Server className="mr-2 h-4 w-4" />
            Node Configuration
          </TabsTrigger>
          <TabsTrigger value="apps">
            <Smartphone className="mr-2 h-4 w-4" />
            App Builder
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
        
        <TabsContent value="apps" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>App Builder</CardTitle>
              <CardDescription>
                Build and manage mobile, mining, and node operation applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-72">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search apps..."
                    className="pl-8"
                    value={appSearchValue}
                    onChange={(e) => setAppSearchValue(e.target.value)}
                  />
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Build New App
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Build New Application</DialogTitle>
                      <DialogDescription>
                        Create a new application for the NETX Forge ecosystem.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="app-name" className="text-right">
                          App Name
                        </Label>
                        <Input 
                          id="app-name" 
                          value={buildApp.name} 
                          onChange={(e) => setBuildApp({...buildApp, name: e.target.value})} 
                          className="col-span-3" 
                          placeholder="e.g. NETX Mobile Wallet"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="app-type" className="text-right">
                          App Type
                        </Label>
                        <select 
                          id="app-type" 
                          value={buildApp.type} 
                          onChange={(e) => setBuildApp({...buildApp, type: e.target.value})} 
                          className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="mobile">Mobile Wallet</option>
                          <option value="desktop">Mining Tool</option>
                          <option value="server">Node Operator</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="app-platform" className="text-right">
                          Platform
                        </Label>
                        <select 
                          id="app-platform" 
                          value={buildApp.platform} 
                          onChange={(e) => setBuildApp({...buildApp, platform: e.target.value})} 
                          className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {buildApp.type === 'mobile' && (
                            <>
                              <option value="Android">Android</option>
                              <option value="iOS">iOS</option>
                            </>
                          )}
                          {buildApp.type === 'desktop' && (
                            <>
                              <option value="Windows">Windows</option>
                              <option value="macOS">macOS</option>
                              <option value="Linux">Linux</option>
                            </>
                          )}
                          {buildApp.type === 'server' && (
                            <>
                              <option value="Linux">Linux</option>
                              <option value="Docker">Docker</option>
                            </>
                          )}
                        </select>
                      </div>
                      
                      {isBuilding && (
                        <div className="space-y-2 mt-2">
                          <Label>Build Progress</Label>
                          <Progress value={buildProgress} className="h-2" />
                          <p className="text-sm text-muted-foreground text-center">{buildProgress}% - Building application...</p>
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button onClick={startBuildApp} disabled={isBuilding}>
                        {isBuilding ? "Building..." : "Start Build"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Platform</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApps.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">{app.name}</TableCell>
                        <TableCell>
                          {app.type === "mobile" ? (
                            <Badge className="bg-blue-500 flex w-fit items-center">
                              <Smartphone className="mr-1 h-3 w-3" />
                              Mobile
                            </Badge>
                          ) : app.type === "desktop" ? (
                            <Badge className="bg-purple-500 flex w-fit items-center">
                              <Cpu className="mr-1 h-3 w-3" />
                              Desktop
                            </Badge>
                          ) : (
                            <Badge className="bg-green-500 flex w-fit items-center">
                              <HardDrive className="mr-1 h-3 w-3" />
                              Server
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{app.platform}</TableCell>
                        <TableCell>v{app.version}</TableCell>
                        <TableCell>{app.createdAt}</TableCell>
                        <TableCell>
                          {app.status === "completed" ? (
                            <Badge className="bg-green-500">Completed</Badge>
                          ) : app.status === "building" ? (
                            <div className="space-y-1">
                              <Badge variant="outline">Building</Badge>
                              <Progress value={app.progress} className="h-1" />
                            </div>
                          ) : (
                            <Badge variant="secondary">Failed</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {app.status === "completed" && (
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="text-green-500"
                                onClick={() => toast.success("Download started", {
                                  description: `Downloading ${app.name} for ${app.platform}...`
                                })}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-destructive"
                              onClick={() => {
                                setAppBuilds(appBuilds.filter(a => a.id !== app.id));
                                toast.success("App Removed", {
                                  description: `${app.name} for ${app.platform} has been removed.`
                                });
                              }}
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
