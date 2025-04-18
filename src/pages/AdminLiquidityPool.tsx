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
import { 
  Activity,
  BarChart4,
  Coins,
  DollarSign,
  Edit,
  History,
  Lock,
  Plus,
  RefreshCcw,
  Search as SearchIcon,
  Settings,
  Trash,
  TrendingUp
} from "lucide-react";
import { useState } from "react";
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

// Initial mock data for liquidity pools
const initialPools = [
  {
    id: "1",
    pair: "NETX/USDC",
    totalLiquidity: "1,250,000",
    apr: "5.2%",
    yourLiquidity: "50,000",
    created: "Jan 05, 2025"
  },
  {
    id: "2",
    pair: "NETX/ETH",
    totalLiquidity: "750,000",
    apr: "7.8%",
    yourLiquidity: "25,000",
    created: "Feb 12, 2025"
  },
  {
    id: "3",
    pair: "NETX/BTC",
    totalLiquidity: "2,100,000",
    apr: "4.5%",
    yourLiquidity: "0",
    created: "Mar 01, 2025"
  }
];

export default function AdminLiquidityPool() {
  const [pools, setPools] = useState(initialPools);
  const [searchValue, setSearchValue] = useState("");
  const { toast } = useToast();
  
  // New pool form state
  const [newPoolData, setNewPoolData] = useState({
    tokenA: "NETX",
    tokenB: "",
    initialLiquidity: ""
  });
  
  // Add new liquidity pool
  const addNewPool = () => {
    const newPool = {
      id: (pools.length + 1).toString(),
      pair: `${newPoolData.tokenA}/${newPoolData.tokenB}`,
      totalLiquidity: newPoolData.initialLiquidity,
      apr: "0.0%",
      yourLiquidity: "0",
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    };
    
    setPools([...pools, newPool]);
    setNewPoolData({
      tokenA: "NETX",
      tokenB: "",
      initialLiquidity: ""
    });
    
    toast({
      title: "Liquidity Pool Created",
      description: `New ${newPoolData.tokenA}/${newPoolData.tokenB} pool has been created.`,
    });
  };
  
  // Add liquidity to pool
  const addLiquidity = (poolId: string, amount: string) => {
    setPools(pools.map(pool => 
      pool.id === poolId ? { 
        ...pool, 
        totalLiquidity: (parseFloat(pool.totalLiquidity.replace(/,/g, '')) + parseFloat(amount.replace(/,/g, ''))).toLocaleString(),
        yourLiquidity: (parseFloat(pool.yourLiquidity.replace(/,/g, '')) + parseFloat(amount.replace(/,/g, ''))).toLocaleString()
      } : pool
    ));
    
    toast({
      title: "Liquidity Added",
      description: `Added ${amount} to the liquidity pool.`,
    });
  };
  
  // Remove liquidity from pool
  const removeLiquidity = (poolId: string, amount: string) => {
    setPools(pools.map(pool => {
      const yourLiq = parseFloat(pool.yourLiquidity.replace(/,/g, ''));
      const totalLiq = parseFloat(pool.totalLiquidity.replace(/,/g, ''));
      const removeAmount = parseFloat(amount.replace(/,/g, ''));
      
      if (pool.id === poolId && yourLiq >= removeAmount) {
        return { 
          ...pool, 
          totalLiquidity: (totalLiq - removeAmount).toLocaleString(),
          yourLiquidity: (yourLiq - removeAmount).toLocaleString()
        };
      }
      return pool;
    }));
    
    toast({
      title: "Liquidity Removed",
      description: `Removed ${amount} from the liquidity pool.`,
    });
  };
  
  // Delete liquidity pool
  const deletePool = (poolId: string) => {
    setPools(pools.filter(pool => pool.id !== poolId));
    
    toast({
      title: "Pool Deleted",
      description: "The liquidity pool has been deleted.",
    });
  };
  
  const filteredPools = pools.filter(pool => 
    pool.pair.toLowerCase().includes(searchValue.toLowerCase())
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
              <BreadcrumbPage>Liquidity Pools</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold mt-2">Liquidity Pool Management</h1>
        <p className="text-muted-foreground">Create and manage liquidity pools for token pairs</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Coins className="h-4 w-4 mr-2 text-primary" />
              Total Pools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pools.length}</div>
            <p className="text-muted-foreground text-sm">Active liquidity pools</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-primary" />
              Total Liquidity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${pools.reduce((sum, pool) => sum + parseFloat(pool.totalLiquidity.replace(/,/g, '')), 0).toLocaleString()}
            </div>
            <p className="text-muted-foreground text-sm">Combined value across all pools</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BarChart4 className="h-4 w-4 mr-2 text-primary" />
              Average APR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {(pools.reduce((sum, pool) => sum + parseFloat(pool.apr), 0) / (pools.length || 1)).toFixed(1)}%
            </div>
            <p className="text-muted-foreground text-sm">Average annual percentage rate</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Liquidity Pools</CardTitle>
          <CardDescription>
            Create and manage liquidity pools for token pairs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-72">
              <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search pools..."
                className="pl-8"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Pool
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Liquidity Pool</DialogTitle>
                  <DialogDescription>
                    Create a new liquidity pool for a token pair.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tokenA" className="text-right">
                      Token A
                    </Label>
                    <Input 
                      id="tokenA" 
                      value={newPoolData.tokenA} 
                      disabled
                      className="col-span-3" 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tokenB" className="text-right">
                      Token B
                    </Label>
                    <Input 
                      id="tokenB" 
                      value={newPoolData.tokenB} 
                      onChange={(e) => setNewPoolData({...newPoolData, tokenB: e.target.value})} 
                      placeholder="e.g. USDC" 
                      className="col-span-3" 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="initialLiquidity" className="text-right">
                      Initial Liquidity
                    </Label>
                    <Input 
                      id="initialLiquidity" 
                      value={newPoolData.initialLiquidity} 
                      onChange={(e) => setNewPoolData({...newPoolData, initialLiquidity: e.target.value})} 
                      placeholder="e.g. 100,000" 
                      className="col-span-3" 
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={addNewPool}>Create Pool</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pair</TableHead>
                  <TableHead>Total Liquidity</TableHead>
                  <TableHead>APR</TableHead>
                  <TableHead>Your Liquidity</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPools.map((pool) => (
                  <TableRow key={pool.id}>
                    <TableCell className="font-medium">{pool.pair}</TableCell>
                    <TableCell>${pool.totalLiquidity}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">{pool.apr}</Badge>
                    </TableCell>
                    <TableCell>${pool.yourLiquidity}</TableCell>
                    <TableCell>{pool.created}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <ArrowRightLeft className="h-4 w-4 mr-1" />
                              Add
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Liquidity</DialogTitle>
                              <DialogDescription>
                                Add liquidity to the {pool.pair} pool.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="amount" className="text-right">
                                  Amount
                                </Label>
                                <Input 
                                  id="amount" 
                                  placeholder="e.g. 10,000" 
                                  className="col-span-3" 
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={() => addLiquidity(pool.id, "10000")}>Add Liquidity</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className={parseFloat(pool.yourLiquidity.replace(/,/g, '')) <= 0 ? "opacity-50 cursor-not-allowed" : ""}>
                              <ArrowLeftRight className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Remove Liquidity</DialogTitle>
                              <DialogDescription>
                                Remove liquidity from the {pool.pair} pool.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="removeAmount" className="text-right">
                                  Amount
                                </Label>
                                <Input 
                                  id="removeAmount" 
                                  placeholder={`Max: ${pool.yourLiquidity}`} 
                                  className="col-span-3" 
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={() => removeLiquidity(pool.id, "5000")}>Remove Liquidity</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => deletePool(pool.id)}
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
