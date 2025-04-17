
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart4, Ban, Check, DollarSign, Edit, Key, Lock, Plus, Search, Shield, Trash, Unlock, Upload, User, UserCheck, UserCog, UserRound, UsersRound } from "lucide-react";
import { useState, useEffect } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VerificationRequests } from "@/components/admin/VerificationRequests";

// Mock data for users
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
  const { toast } = useToast();
  
  // New state for user form
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    role: "user",
    avatarUrl: "https://placehold.co/150x150/5e57e8/ffffff.png?text=NU"
  });
  
  // Load users from localStorage
  useEffect(() => {
    const localUsers: any[] = [];
    
    // Get all keys from localStorage that start with "user-profile-"
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
    
    // Merge with initial users if there are no local users
    if (localUsers.length > 0) {
      setUsers(prevUsers => {
        // Don't duplicate users with the same id
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
    // In a real app, this would create a new user in the system
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
        
        // Also update in local storage if this is a real user
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
      </Tabs>
    </div>
  );
}
