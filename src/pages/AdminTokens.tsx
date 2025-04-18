
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  ArrowUpDown, 
  Coins, 
  Edit, 
  Image, 
  Plus, 
  Search, 
  Settings, 
  Shield, 
  Tag, 
  Trash, 
  Upload,
  WalletCards,
  Lock
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

// Initial mock data for tokens
const initialTokens = [
  { 
    id: "1", 
    name: "NETX Coin", 
    symbol: "NETX", 
    marketCap: "1,250,000", 
    supply: "1,000,000",
    price: "1.25",
    status: "active", 
    creator: "Admin (Genesis)",
    createdAt: "Jan 01, 2025"
  },
  { 
    id: "2", 
    name: "Contractor Token", 
    symbol: "CONTX", 
    marketCap: "450,000", 
    supply: "900,000",
    price: "0.50",
    status: "active", 
    creator: "0xef43...7891",
    createdAt: "Mar 15, 2025"
  },
  { 
    id: "3", 
    name: "Developer Token", 
    symbol: "DEVX", 
    marketCap: "210,000", 
    supply: "420,000",
    price: "0.50",
    status: "active", 
    creator: "0xab12...3456",
    createdAt: "Mar 20, 2025"
  },
  { 
    id: "4", 
    name: "Test Token", 
    symbol: "TEST", 
    marketCap: "5,000", 
    supply: "10,000",
    price: "0.50",
    status: "pending", 
    creator: "0x9876...5432",
    createdAt: "Apr 10, 2025"
  },
];

export default function AdminTokens() {
  const [tokens, setTokens] = useState(initialTokens);
  const [searchValue, setSearchValue] = useState("");
  const { toast } = useToast();
  
  // New token form state
  const [newTokenData, setNewTokenData] = useState({
    name: "",
    symbol: "",
    initialSupply: "",
    decimals: "18",
    price: "0.1"
  });

  // Authority settings
  const [authoritySettings, setAuthoritySettings] = useState({
    mintable: true,
    mutable: true,
    updateAuthority: true,
    freezeAuthority: false
  });
  
  // Mint price state
  const [mintPrice, setMintPrice] = useState(100);
  
  const toggleAuthoritySetting = (setting: keyof typeof authoritySettings) => {
    setAuthoritySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    toast({
      title: "Authority Setting Updated",
      description: `${setting} has been ${!authoritySettings[setting] ? 'enabled' : 'disabled'}`
    });
  };
  
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
    const marketCap = (parseFloat(newTokenData.initialSupply) * parseFloat(newTokenData.price)).toLocaleString();
    
    const newToken = {
      id: (tokens.length + 1).toString(),
      name: newTokenData.name,
      symbol: newTokenData.symbol,
      marketCap: marketCap,
      supply: newTokenData.initialSupply,
      price: newTokenData.price,
      status: "pending",
      creator: "Admin",
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    };
    
    setTokens([...tokens, newToken]);
    setNewTokenData({
      name: "",
      symbol: "",
      initialSupply: "",
      decimals: "18",
      price: "0.1"
    });
    
    toast({
      title: "Token Added",
      description: `New token ${newTokenData.name} (${newTokenData.symbol}) has been created.`,
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
        <p className="text-muted-foreground">Create and manage tokens in the NETX ecosystem</p>
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
            <p className="text-muted-foreground text-sm">Created tokens</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <WalletCards className="h-4 w-4 mr-2 text-primary" />
              Network Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${tokens.reduce((sum, token) => sum + parseFloat(token.marketCap.replace(/,/g, '')), 0).toLocaleString()}
            </div>
            <p className="text-muted-foreground text-sm">Total market capitalization</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Shield className="h-4 w-4 mr-2 text-primary" />
              Active Tokens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{tokens.filter(t => t.status === "active").length}</div>
            <p className="text-muted-foreground text-sm">Currently active tokens</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="tokens">
        <TabsList>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="settings">Token Authority Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tokens">
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
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Create New Token</DialogTitle>
                      <DialogDescription>
                        Create a new token in the NETX Forge ecosystem.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
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
                        <Label htmlFor="token-supply" className="text-right">
                          Initial Supply
                        </Label>
                        <Input 
                          id="token-supply" 
                          value={newTokenData.initialSupply} 
                          onChange={(e) => setNewTokenData({...newTokenData, initialSupply: e.target.value})} 
                          className="col-span-3" 
                          placeholder="e.g. 1,000,000"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="token-decimals" className="text-right">
                          Decimals
                        </Label>
                        <Select
                          value={newTokenData.decimals}
                          onValueChange={(value) => setNewTokenData({...newTokenData, decimals: value})}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6">6 (like USDC)</SelectItem>
                            <SelectItem value="8">8 (like BTC)</SelectItem>
                            <SelectItem value="9">9</SelectItem>
                            <SelectItem value="12">12</SelectItem>
                            <SelectItem value="18">18 (like ETH)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="token-price" className="text-right">
                          Initial Price ($)
                        </Label>
                        <Input 
                          id="token-price" 
                          value={newTokenData.price} 
                          onChange={(e) => setNewTokenData({...newTokenData, price: e.target.value})} 
                          className="col-span-3" 
                          placeholder="e.g. 0.1"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">
                          Token Image
                        </Label>
                        <div className="col-span-3">
                          <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full border border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                              <Image className="h-6 w-6 text-gray-400" />
                            </div>
                            <Button type="button" variant="outline" size="sm">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Logo
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Recommended: 512x512px PNG or SVG with transparent background
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right">
                          Token Authority
                        </Label>
                        <div className="col-span-3 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label className="text-sm">Mintable</Label>
                              <p className="text-xs text-muted-foreground">Allow new tokens to be minted</p>
                            </div>
                            <Switch 
                              checked={authoritySettings.mintable}
                              onCheckedChange={() => toggleAuthoritySetting('mintable')}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label className="text-sm">Mutable Metadata</Label>
                              <p className="text-xs text-muted-foreground">Allow token metadata to be updated</p>
                            </div>
                            <Switch 
                              checked={authoritySettings.mutable}
                              onCheckedChange={() => toggleAuthoritySetting('mutable')}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label className="text-sm">Transferable Authority</Label>
                              <p className="text-xs text-muted-foreground">Allow authority to be transferred</p>
                            </div>
                            <Switch 
                              checked={authoritySettings.updateAuthority}
                              onCheckedChange={() => toggleAuthoritySetting('updateAuthority')}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label className="text-sm">Freeze Authority</Label>
                              <p className="text-xs text-muted-foreground">Allow freezing token accounts</p>
                            </div>
                            <Switch 
                              checked={authoritySettings.freezeAuthority}
                              onCheckedChange={() => toggleAuthoritySetting('freezeAuthority')}
                            />
                          </div>
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
                      <TableHead>Name</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Supply</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Market Cap</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTokens.map((token) => (
                      <TableRow key={token.id}>
                        <TableCell className="font-medium">{token.name}</TableCell>
                        <TableCell>{token.symbol}</TableCell>
                        <TableCell>{token.supply}</TableCell>
                        <TableCell>${token.price}</TableCell>
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
                              <Tag className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => {}}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => disableToken(token.id)}
                            >
                              {token.status === "active" ? (
                                <Lock className="h-4 w-4 text-destructive" />
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
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Token Authority Settings</CardTitle>
              <CardDescription>Configure token authority settings for new tokens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Mint Price (NETX)</Label>
                    <div className="w-80">
                      <Slider 
                        value={[mintPrice]} 
                        onValueChange={([value]) => setMintPrice(value)} 
                        max={1000}
                        step={10}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Current price: {mintPrice} NETX</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Mintable</Label>
                      <p className="text-sm text-muted-foreground">Allow new tokens to be minted</p>
                    </div>
                    <Switch 
                      checked={authoritySettings.mintable}
                      onCheckedChange={() => toggleAuthoritySetting('mintable')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Mutable</Label>
                      <p className="text-sm text-muted-foreground">Allow token metadata to be updated</p>
                    </div>
                    <Switch 
                      checked={authoritySettings.mutable}
                      onCheckedChange={() => toggleAuthoritySetting('mutable')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Update Authority</Label>
                      <p className="text-sm text-muted-foreground">Allow authority transfer</p>
                    </div>
                    <Switch 
                      checked={authoritySettings.updateAuthority}
                      onCheckedChange={() => toggleAuthoritySetting('updateAuthority')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Freeze Authority</Label>
                      <p className="text-sm text-muted-foreground">Allow freezing token accounts</p>
                    </div>
                    <Switch 
                      checked={authoritySettings.freezeAuthority}
                      onCheckedChange={() => toggleAuthoritySetting('freezeAuthority')}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
