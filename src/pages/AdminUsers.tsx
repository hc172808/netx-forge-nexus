import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Activity, Ban, Check, DollarSign, Key, Lock, Shield, Unlock, Wallet, CreditCard, Coins, Settings, KeyRound } from "lucide-react";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const initialUsers = [
  { 
    id: "1", 
    name: "Admin User", 
    email: "admin@netxforge.com", 
    role: "admin", 
    status: "active", 
    walletCount: 2,
    lastLogin: "2 hours ago",
    created: "Jan 1, 2025",
    avatarUrl: "https://placehold.co/150x150/33a3ee/ffffff.png?text=AU",
    features: {
      trading: true,
      cashOut: true,
      tokenCreation: true
    }
  },
  { 
    id: "2", 
    name: "John Developer", 
    email: "john@example.com", 
    role: "developer", 
    status: "active", 
    walletCount: 1,
    lastLogin: "1 day ago",
    created: "Feb 15, 2025",
    avatarUrl: "https://placehold.co/150x150/4c54e8/ffffff.png?text=JD",
    features: {
      trading: true,
      cashOut: false,
      tokenCreation: true
    }
  },
  { 
    id: "3", 
    name: "Sarah Contractor", 
    email: "sarah@example.com", 
    role: "contractor", 
    status: "active", 
    walletCount: 3,
    lastLogin: "5 hours ago",
    created: "Mar 10, 2025",
    avatarUrl: "https://placehold.co/150x150/42c9af/ffffff.png?text=SC",
    features: {
      trading: true,
      cashOut: false,
      tokenCreation: false
    }
  },
  { 
    id: "4", 
    name: "Michael Trader", 
    email: "michael@example.com", 
    role: "user", 
    status: "suspended", 
    walletCount: 1,
    lastLogin: "20 days ago",
    created: "Jan 25, 2025",
    avatarUrl: "https://placehold.co/150x150/e57373/ffffff.png?text=MT",
    features: {
      trading: false,
      cashOut: false,
      tokenCreation: false
    }
  },
  { 
    id: "5", 
    name: "Lisa Analyst", 
    email: "lisa@example.com", 
    role: "user", 
    status: "active", 
    walletCount: 2,
    lastLogin: "3 days ago",
    created: "Apr 5, 2025",
    avatarUrl: "https://placehold.co/150x150/ba68c8/ffffff.png?text=LA",
    features: {
      trading: true,
      cashOut: false,
      tokenCreation: false
    }
  },
];

export default function AdminUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [searchValue, setSearchValue] = useState("");
  const [mintPrice, setMintPrice] = useState(100);
  const [authoritySettings, setAuthoritySettings] = useState({
    mintable: true,
    mutable: true,
    updateAuthority: true,
    freezeAuthority: false
  });
  const [paymentMethods, setPaymentMethods] = useState({
    creditCard: true,
    crypto: true,
    bankTransfer: false
  });
  const [quantumSettings, setQuantumSettings] = useState({
    quantumResistant: true,
    hybridEncryption: true,
    autoKeyRotation: false
  });
  const { toast } = useToast();

  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    role: "user",
    avatarUrl: "https://placehold.co/150x150/5e57e8/ffffff.png?text=NU"
  });

  useEffect(() => {
    const localUsers: any[] = [];
    
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('user-profile-')) {
        const userData = JSON.parse(localStorage.getItem(key) || '{}');
        
        if (userData.id) {
          localUsers.push({
            id: userData.id,
            name: `${userData.firstName} ${userData.lastName}`,
            email: userData.email,
            role: userData.isAdmin ? "admin" : "user",
            status: "active",
            walletCount: 1,
            lastLogin: "Recently",
            created: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            avatarUrl: `https://placehold.co/150x150/4c54e8/ffffff.png?text=${userData.firstName?.[0]}${userData.lastName?.[0]}`,
            features: {
              trading: true,
              cashOut: userData.isVerified || false,
              tokenCreation: userData.isAdmin || false
            }
          });
        }
      }
    });
    
    if (localUsers.length > 0) {
      setUsers(prevUsers => {
        const userIds = new Set(localUsers.map(u => u.id));
        const filteredInitials = prevUsers.filter(u => !userIds.has(u.id));
        return [...filteredInitials, ...localUsers];
      });
    }
  }, []);

  const toggleUserStatus = (id: string) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: user.status === "active" ? "suspended" : "active" } : user
    ));
    
    toast({
      title: "User Status Updated",
      description: "The user status has been changed successfully.",
    });
  };

  const removeUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
    
    toast({
      title: "User Removed",
      description: "The user has been removed from the system.",
    });
  };
  
  const addNewUser = () => {
    const newUser = {
      id: (users.length + 1).toString(),
      name: newUserData.name,
      email: newUserData.email,
      role: newUserData.role,
      status: "active",
      walletCount: 0,
      lastLogin: "Never",
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      avatarUrl: newUserData.avatarUrl,
      features: {
        trading: true,
        cashOut: false,
        tokenCreation: newUserData.role === 'admin'
      }
    };
    
    setUsers([...users, newUser]);
    setNewUserData({
      name: "",
      email: "",
      role: "user",
      avatarUrl: "https://placehold.co/150x150/5e57e8/ffffff.png?text=NU"
    });
    
    toast({
      title: "User Created",
      description: `New user ${newUserData.name} has been added to the system.`,
    });
  };
  
  const toggleFeature = (userId: string, feature: 'trading' | 'cashOut' | 'tokenCreation') => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const updatedFeatures = {
          ...user.features,
          [feature]: !user.features[feature]
        };
        
        const userProfileKey = 'user-profile-' + userId;
        const userProfileData = localStorage.getItem(userProfileKey);
        
        if (userProfileKey && feature === 'cashOut') {
          const userData = userProfileData ? JSON.parse(userProfileData) : null;
          if (userData) {
            userData.isVerified = updatedFeatures.cashOut;
            localStorage.setItem(userProfileKey, JSON.stringify(userData));
          }
        }
        
        return {
          ...user,
          features: updatedFeatures
        };
      }
      return user;
    }));
    
    const featureNames = {
      trading: "Trading",
      cashOut: "Cash Out",
      tokenCreation: "Token Creation"
    };
    
    toast({
      title: `${featureNames[feature]} Feature Updated`,
      description: `The feature has been ${users.find(u => u.id === userId)?.features[feature] ? 'disabled' : 'enabled'} for this user.`,
    });
  };

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

  const togglePaymentMethod = (method: keyof typeof paymentMethods) => {
    setPaymentMethods(prev => ({
      ...prev,
      [method]: !prev[method]
    }));
    toast({
      title: "Payment Method Updated",
      description: `${method} has been ${!paymentMethods[method] ? 'enabled' : 'disabled'}`
    });
  };

  const toggleQuantumSetting = (setting: keyof typeof quantumSettings) => {
    setQuantumSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    toast({
      title: "Quantum Security Setting Updated",
      description: `${setting} has been ${!quantumSettings[setting] ? 'enabled' : 'disabled'}`
    });
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchValue.toLowerCase()) || 
    user.email.toLowerCase().includes(searchValue.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-red-500">Admin</Badge>;
      case "developer":
        return <Badge className="bg-blue-500">Developer</Badge>;
      case "contractor":
        return <Badge className="bg-orange-500">Contractor</Badge>;
      default:
        return <Badge variant="outline">User</Badge>;
    }
  };

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
              <BreadcrumbPage>Users</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold mt-2">User Management</h1>
        <p className="text-muted-foreground">Manage users, permissions, and security settings</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <UsersRound className="h-4 w-4 mr-2 text-primary" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{users.length}</div>
            <p className="text-muted-foreground text-sm">Registered accounts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Shield className="h-4 w-4 mr-2 text-primary" />
              Security Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-medium text-green-500">Protected</div>
            <p className="text-muted-foreground text-sm">No active threats detected</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BarChart4 className="h-4 w-4 mr-2 text-primary" />
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{users.filter(u => u.status === "active").length}</div>
            <p className="text-muted-foreground text-sm">Currently active accounts</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="verification">Verification Requests</TabsTrigger>
          <TabsTrigger value="settings">Token Settings</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                Manage user accounts, permissions, and access control
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-72">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-8"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add New User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                      <DialogDescription>
                        Create a new user account in the NETX Forge system.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input 
                          id="name" 
                          value={newUserData.name} 
                          onChange={(e) => setNewUserData({...newUserData, name: e.target.value})}
                          placeholder="John Doe" 
                          className="col-span-3" 
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input 
                          id="email" 
                          value={newUserData.email}
                          onChange={(e) => setNewUserData({...newUserData, email: e.target.value})}
                          placeholder="john@example.com" 
                          className="col-span-3" 
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">
                          Role
                        </Label>
                        <Select
                          value={newUserData.role}
                          onValueChange={(value) => setNewUserData({...newUserData, role: value})}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="developer">Developer</SelectItem>
                            <SelectItem value="contractor">Contractor</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={addNewUser}>Create User</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Features</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <img src={user.avatarUrl} alt={user.name} />
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1 text-sm">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 w-28 justify-start pl-1"
                              onClick={() => toggleFeature(user.id, 'trading')}
                            >
                              {user.features.trading ? (
                                <Check className="h-4 w-4 text-green-500 mr-1" />
                              ) : (
                                <Ban className="h-4 w-4 text-muted-foreground mr-1" />
                              )}
                              Trading
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 w-28 justify-start pl-1"
                              onClick={() => toggleFeature(user.id, 'cashOut')}
                            >
                              {user.features.cashOut ? (
                                <Check className="h-4 w-4 text-green-500 mr-1" />
                              ) : (
                                <Ban className="h-4 w-4 text-muted-foreground mr-1" />
                              )}
                              Cash Out
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 w-28 justify-start pl-1"
                              onClick={() => toggleFeature(user.id, 'tokenCreation')}
                            >
                              {user.features.tokenCreation ? (
                                <Check className="h-4 w-4 text-green-500 mr-1" />
                              ) : (
                                <Ban className="h-4 w-4 text-muted-foreground mr-1" />
                              )}
                              Token Creation
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>{user.created}</TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className={`h-2 w-2 rounded-full mr-2 ${
                              user.status === "active" ? "bg-green-500" : "bg-orange-500"
                            }`} />
                            {user.status === "active" ? "Active" : "Suspended"}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <UserCog className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Key className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => toggleUserStatus(user.id)}
                            >
                              {user.status === "active" ? (
                                <Lock className="h-4 w-4 text-destructive" />
                              ) : (
                                <Unlock className="h-4 w-4 text-green-500" />
                              )}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => removeUser(user.id)}
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
        
        <TabsContent value="verification">
          <VerificationRequests />
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Token Authority Settings</CardTitle>
              <CardDescription>Configure token minting and authority settings</CardDescription>
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
        
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Configure available payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Credit Card
                    </Label>
                    <p className="text-sm text-muted-foreground">Accept credit card payments</p>
                  </div>
                  <Switch 
                    checked={paymentMethods.creditCard}
                    onCheckedChange={() => togglePaymentMethod('creditCard')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center">
                      <Coins className="w-4 h-4 mr-2" />
                      Cryptocurrency
                    </Label>
                    <p className="text-sm text-muted-foreground">Accept cryptocurrency payments</p>
                  </div>
                  <Switch 
                    checked={paymentMethods.crypto}
                    onCheckedChange={() => togglePaymentMethod('crypto')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Bank Transfer
                    </Label>
                    <p className="text-sm text-muted-foreground">Accept bank transfer payments</p>
                  </div>
                  <Switch 
                    checked={paymentMethods.bankTransfer}
                    onCheckedChange={() => togglePaymentMethod('bankTransfer')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Quantum Security Settings</CardTitle>
              <CardDescription>Configure quantum-safe security features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      Quantum-Resistant Encryption
                    </Label>
                    <p className="text-sm text-muted-foreground">Enable post-quantum cryptography</p>
                  </div>
                  <Switch 
                    checked={quantumSettings.quantumResistant}
                    onCheckedChange={() => toggleQuantumSetting('quantumResistant')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center">
                      <KeyRound className="w-4 h-4 mr-2" />
                      Hybrid Encryption
                    </Label>
                    <p className="text-sm text-muted-foreground">Use both classical and quantum-safe encryption</p>
                  </div>
                  <Switch 
                    checked={quantumSettings.hybridEncryption}
                    onCheckedChange={() => toggleQuantumSetting('hybridEncryption')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Automatic Key Rotation
                    </Label>
                    <p className="text-sm text-muted-foreground">Periodically rotate encryption keys</p>
                  </div>
                  <Switch 
                    checked={quantumSettings.autoKeyRotation}
                    onCheckedChange={() => toggleQuantumSetting('autoKeyRotation')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
