
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { BarChart4, Edit, Key, Lock, Plus, Search, Shield, Trash, Unlock, User, UserCheck, UserCog, UserRound, UsersRound } from "lucide-react";
import { useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

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
    avatarUrl: "https://placehold.co/150x150/33a3ee/ffffff.png?text=AU"
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
    avatarUrl: "https://placehold.co/150x150/4c54e8/ffffff.png?text=JD"
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
    avatarUrl: "https://placehold.co/150x150/42c9af/ffffff.png?text=SC"
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
    avatarUrl: "https://placehold.co/150x150/e57373/ffffff.png?text=MT"
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
    avatarUrl: "https://placehold.co/150x150/ba68c8/ffffff.png?text=LA"
  },
];

export default function AdminUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [searchValue, setSearchValue] = useState("");

  const toggleUserStatus = (id: string) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: user.status === "active" ? "suspended" : "active" } : user
    ));
  };

  const removeUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
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
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New User
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Wallets</TableHead>
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
                    <TableCell>{user.walletCount}</TableCell>
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
    </div>
  );
}
