import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {
  Activity,
  BarChart4,
  Coins,
  DollarSign,
  Edit,
  FileText,
  History,
  Lock,
  Plus,
  Trash,
  Upload as UploadIcon,
  Shield,
  Settings,
  Layers,
  Star
} from "lucide-react";
import { useState } from "react";

// Initial mock data for tokens
const initialTokens = [
  {
    id: "1",
    name: "NETX Token",
    symbol: "NETX",
    totalSupply: "1,000,000,000",
    marketCap: "$25,000,000",
    creationDate: "Jan 15, 2025",
    status: "Active"
  },
  {
    id: "2",
    name: "Quantum Coin",
    symbol: "QTC",
    totalSupply: "500,000,000",
    marketCap: "$15,000,000",
    creationDate: "Feb 22, 2025",
    status: "Active"
  },
  {
    id: "3",
    name: "BlockForge",
    symbol: "BFG",
    totalSupply: "750,000,000",
    marketCap: "$18,500,000",
    creationDate: "Mar 10, 2025",
    status: "Paused"
  }
];

export default function AdminTokens() {
  const [tokens, setTokens] = useState(initialTokens);
  const [searchValue, setSearchValue] = useState("");
  const { toast } = useToast();
  
  // New token form state
  const [newTokenData, setNewTokenData] = useState({
    name: "",
    symbol: "",
    totalSupply: "",
    mintable: true,
    mutable: true,
    freezeAuthority: false
  });
  
  // Add new token
  const addNewToken = () => {
    const newToken = {
      id: (tokens.length + 1).toString(),
      name: newTokenData.name,
      symbol: newTokenData.symbol,
      totalSupply: newTokenData.totalSupply,
      marketCap: "N/A",
      creationDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: "Active"
    };
    
    setTokens([...tokens, newToken]);
    setNewTokenData({
      name: "",
      symbol: "",
      totalSupply: "",
      mintable: true,
      mutable: true,
      freezeAuthority: false
    });
    
    toast({
      title: "Token Created",
      description: `New token ${newTokenData.name} (${newTokenData.symbol}) has been created.`,
    });
  };
  
  // Pause/resume token
  const toggleTokenStatus = (tokenId: string) => {
    setTokens(tokens.map(token => 
      token.id === tokenId ? { 
        ...token, 
        status: token.status === "Active" ? "Paused" : "Active"
      } : token
    ));
    
    toast({
      title: "Token Status Updated",
      description: "The token status has been updated successfully.",
    });
  };
  
  // Delete token
  const deleteToken = (tokenId: string) => {
    setTokens(tokens.filter(token => token.id !== tokenId));
    
    toast({
      title: "Token Deleted",
      description: "The token has been deleted successfully.",
    });
  };
  
  const filteredTokens = tokens.filter(token => 
    token.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchValue.toLowerCase())
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
              <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Token Management</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold mt-2">Token Management</h1>
        <p className="text-muted-foreground">Create and manage platform tokens</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Coins className="h-4 w-4 mr-2 text-primary" />
              Total Tokens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{tokens.length}</div>
            <p className="text-muted-foreground text-sm">Active and paused tokens</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-primary" />
              Total Market Cap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${tokens.reduce((sum, token) => {
                const marketCap = token.marketCap.startsWith('$') 
                  ? parseFloat(token.marketCap.replace(/[$,]/g, '')) 
                  : 0;
                return sum + marketCap;
              }, 0).toLocaleString()}
            </div>
            <p className="text-muted-foreground text-sm">Combined value of all tokens</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Activity className="h-4 w-4 mr-2 text-primary" />
              Active Tokens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {tokens.filter(token => token.status === "Active").length}
            </div>
            <p className="text-muted-foreground text-sm">Currently active tokens</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Token Listing</CardTitle>
          <CardDescription>
            Create, manage and monitor all tokens on the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-72">
              <Activity className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tokens..."
                className="pl-8"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Token
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Token</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new token on the platform.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tokenName" className="text-right">
                      Token Name
                    </Label>
                    <Input 
                      id="tokenName" 
                      value={newTokenData.name} 
                      onChange={(e) => setNewTokenData({...newTokenData, name: e.target.value})} 
                      placeholder="e.g. NETX Token" 
                      className="col-span-3" 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tokenSymbol" className="text-right">
                      Symbol
                    </Label>
                    <Input 
                      id="tokenSymbol" 
                      value={newTokenData.symbol} 
                      onChange={(e) => setNewTokenData({...newTokenData, symbol: e.target.value})} 
                      placeholder="e.g. NETX" 
                      className="col-span-3" 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tokenSupply" className="text-right">
                      Total Supply
                    </Label>
                    <Input 
                      id="tokenSupply" 
                      value={newTokenData.totalSupply} 
                      onChange={(e) => setNewTokenData({...newTokenData, totalSupply: e.target.value})} 
                      placeholder="e.g. 1,000,000,000" 
                      className="col-span-3" 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="mintable" className="text-right">
                      Mintable
                    </Label>
                    <div className="flex items-center space-x-2 col-span-3">
                      <Switch 
                        id="mintable" 
                        checked={newTokenData.mintable}
                        onCheckedChange={(checked) => setNewTokenData({...newTokenData, mintable: checked})}
                      />
                      <span className="text-sm text-muted-foreground">Allow minting additional tokens</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="mutable" className="text-right">
                      Mutable
                    </Label>
                    <div className="flex items-center space-x-2 col-span-3">
                      <Switch 
                        id="mutable" 
                        checked={newTokenData.mutable}
                        onCheckedChange={(checked) => setNewTokenData({...newTokenData, mutable: checked})}
                      />
                      <span className="text-sm text-muted-foreground">Allow token metadata updates</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="freezeAuthority" className="text-right">
                      Freeze Authority
                    </Label>
                    <div className="flex items-center space-x-2 col-span-3">
                      <Switch 
                        id="freezeAuthority" 
                        checked={newTokenData.freezeAuthority}
                        onCheckedChange={(checked) => setNewTokenData({...newTokenData, freezeAuthority: checked})}
                      />
                      <span className="text-sm text-muted-foreground">Enable account freezing capability</span>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={addNewToken}>Create Token</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Token</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Total Supply</TableHead>
                  <TableHead>Market Cap</TableHead>
                  <TableHead>Creation Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTokens.map((token) => (
                  <TableRow key={token.id}>
                    <TableCell className="font-medium">{token.name}</TableCell>
                    <TableCell>{token.symbol}</TableCell>
                    <TableCell>{token.totalSupply}</TableCell>
                    <TableCell>{token.marketCap}</TableCell>
                    <TableCell>{token.creationDate}</TableCell>
                    <TableCell>
                      <Badge className={token.status === "Active" ? "bg-green-500" : "bg-amber-500"}>
                        {token.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleTokenStatus(token.id)}
                        >
                          {token.status === "Active" ? (
                            <>
                              <Lock className="h-4 w-4 mr-1" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Activity className="h-4 w-4 mr-1" />
                              Resume
                            </>
                          )}
                        </Button>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Token</DialogTitle>
                              <DialogDescription>
                                Update token properties and settings.
                              </DialogDescription>
                            </DialogHeader>
                            {/* Edit token form would go here */}
                            <DialogFooter>
                              <Button>Save Changes</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => deleteToken(token.id)}
                        >
                          <Trash className="h-4 w-4 text-destructive" />
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
    </div>
  );
}
