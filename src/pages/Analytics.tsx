
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, BarChart4, Calendar, ChevronDown, ChevronsUpDown, Coins, Download, LineChart, PieChart, Repeat, Wallet } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { AreaChart, Area, LineChart as RechartLine, Line, BarChart, Bar, ComposedChart, PieChart as RechartPie, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const networkData = [
  { name: 'Jan', transactions: 4000, blocks: 2400, nodes: 55 },
  { name: 'Feb', transactions: 3000, blocks: 1900, nodes: 62 },
  { name: 'Mar', transactions: 2000, blocks: 1700, nodes: 70 },
  { name: 'Apr', transactions: 2780, blocks: 2100, nodes: 75 },
  { name: 'May', transactions: 1890, blocks: 1500, nodes: 80 },
  { name: 'Jun', transactions: 2390, blocks: 1800, nodes: 85 },
  { name: 'Jul', transactions: 3490, blocks: 2200, nodes: 90 },
];

const tokenDistributionData = [
  { name: 'NETX Coin', value: 45 },
  { name: 'Contractor Token', value: 25 },
  { name: 'Developer Token', value: 15 },
  { name: 'Other Tokens', value: 15 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

const tokenPriceData = [
  { name: 'Mar 12', NETX: 8.4, CONTX: 2.0, DEVX: 1.0 },
  { name: 'Mar 19', NETX: 8.2, CONTX: 2.1, DEVX: 1.2 },
  { name: 'Mar 26', NETX: 8.5, CONTX: 2.3, DEVX: 1.1 },
  { name: 'Apr 02', NETX: 8.7, CONTX: 2.2, DEVX: 1.3 },
  { name: 'Apr 09', NETX: 8.8, CONTX: 2.4, DEVX: 1.4 },
  { name: 'Apr 16', NETX: 9.0, CONTX: 2.5, DEVX: 1.6 },
];

const transactionHistoryData = [
  { month: 'Jan', successful: 4000, failed: 240 },
  { month: 'Feb', successful: 3000, failed: 190 },
  { month: 'Mar', successful: 2000, failed: 170 },
  { month: 'Apr', successful: 2780, failed: 210 },
  { month: 'May', successful: 1890, failed: 150 },
  { month: 'Jun', successful: 2390, failed: 180 },
  { month: 'Jul', successful: 3490, failed: 220 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Blockchain performance metrics and statistics</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select defaultValue="7d">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: "Total Transactions", value: "1.2M", change: "+12.5%", icon: Repeat, trend: "up" },
          { title: "Active Wallets", value: "24.5k", change: "+8.3%", icon: Wallet, trend: "up" },
          { title: "Token Count", value: "128", change: "+3.2%", icon: Coins, trend: "up" },
          { title: "Network Load", value: "42%", change: "-5.1%", icon: BarChart4, trend: "down" },
        ].map((item, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm text-muted-foreground">
                  {item.title}
                </CardTitle>
                <div className="bg-secondary/50 p-1.5 rounded-full">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <div className={`flex items-center text-xs ${
                item.trend === "up" ? "text-green-500" : "text-red-500"
              }`}>
                <ChevronsUpDown className="h-3 w-3 mr-1" />
                {item.change} vs previous period
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tokens">Token Metrics</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="network">Network Health</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Network Overview</CardTitle>
              <CardDescription>
                Combined metrics showing transactions, blocks, and active nodes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={networkData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="transactions" fill="#8884d8" name="Transactions" />
                    <Bar yAxisId="left" dataKey="blocks" fill="#82ca9d" name="Blocks Mined" />
                    <Line yAxisId="right" type="monotone" dataKey="nodes" stroke="#ff7300" name="Active Nodes" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Token Distribution</CardTitle>
                <CardDescription>Market share by token category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartPie>
                      <Pie
                        data={tokenDistributionData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {tokenDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartPie>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Tokens by Activity</CardTitle>
                <CardDescription>Transaction volume in the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "NETX Coin", logo: "https://placehold.co/200x200/4c54e8/ffffff.png?text=NETX", value: "$1.2M", change: "+15%" },
                    { name: "Contractor Token", logo: "https://placehold.co/200x200/33a3ee/ffffff.png?text=CONTX", value: "$458K", change: "+8%" },
                    { name: "Developer Token", logo: "https://placehold.co/200x200/42c9af/ffffff.png?text=DEVX", value: "$255K", change: "+12%" },
                    { name: "Security Token", logo: "https://placehold.co/200x200/7e5bef/ffffff.png?text=SECX", value: "$120K", change: "+3%" },
                    { name: "Analytics Token", logo: "https://placehold.co/200x200/a78bfa/ffffff.png?text=ANLX", value: "$95K", change: "-2%" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <img src={item.logo} alt={item.name} />
                        </Avatar>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-muted-foreground">Trade volume</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{item.value}</div>
                        <div className={item.change.startsWith("+") ? "text-green-500 text-xs" : "text-red-500 text-xs"}>
                          {item.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="tokens" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Token Price Comparison</CardTitle>
              <CardDescription>
                Historical prices of major tokens in the NETX ecosystem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={tokenPriceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="NETX" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="CONTX" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="DEVX" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Token Activity</CardTitle>
                <CardDescription>Transaction count by token type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'NETX', created: 120, traded: 480, burned: 25 },
                        { name: 'CONTX', created: 75, traded: 340, burned: 15 },
                        { name: 'DEVX', created: 60, traded: 290, burned: 10 },
                        { name: 'SECX', created: 40, traded: 180, burned: 5 },
                        { name: 'ANLX', created: 30, traded: 150, burned: 8 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="created" stackId="a" fill="#8884d8" name="Created" />
                      <Bar dataKey="traded" stackId="a" fill="#82ca9d" name="Traded" />
                      <Bar dataKey="burned" stackId="a" fill="#ff8042" name="Burned" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Market Cap Distribution</CardTitle>
                <CardDescription>Top tokens by market capitalization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "NETX Coin", value: "$12.5M", percent: 65 },
                    { name: "Contractor Token", value: "$3.2M", percent: 15 },
                    { name: "Developer Token", value: "$1.8M", percent: 10 },
                    { name: "Security Token", value: "$850K", percent: 5 },
                    { name: "Others", value: "$1.1M", percent: 5 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.name}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground text-right">
                        {item.percent}% of total
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                Successful vs failed transactions over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={transactionHistoryData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="successful" fill="#82ca9d" name="Successful" />
                    <Bar dataKey="failed" fill="#ff8042" name="Failed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Types</CardTitle>
                <CardDescription>Breakdown by transaction category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Token Transfers', value: 55 },
                          { name: 'Token Creation', value: 15 },
                          { name: 'Token Burning', value: 5 },
                          { name: 'Smart Contract Calls', value: 25 }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {tokenDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Daily Transaction Volume</CardTitle>
                <CardDescription>Transactions per day over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { day: '1', count: 4000 }, { day: '2', count: 3800 },
                        { day: '3', count: 4200 }, { day: '4', count: 4100 },
                        { day: '5', count: 3900 }, { day: '6', count: 3600 },
                        { day: '7', count: 3800 }, { day: '8', count: 4000 },
                        { day: '9', count: 4300 }, { day: '10', count: 4500 },
                        { day: '11', count: 4400 }, { day: '12', count: 4200 },
                        { day: '13', count: 4100 }, { day: '14', count: 4000 },
                        { day: '15', count: 3800 }, { day: '16', count: 3700 },
                        { day: '17', count: 3900 }, { day: '18', count: 4100 },
                        { day: '19', count: 4200 }, { day: '20', count: 4300 },
                        { day: '21', count: 4400 }, { day: '22', count: 4500 },
                        { day: '23', count: 4700 }, { day: '24', count: 4600 },
                        { day: '25', count: 4400 }, { day: '26', count: 4300 },
                        { day: '27', count: 4100 }, { day: '28', count: 4000 },
                        { day: '29', count: 4200 }, { day: '30', count: 4400 }
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="network" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Network Health Dashboard</CardTitle>
              <CardDescription>
                Key performance indicators for the NETX blockchain network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { title: "Block Time", value: "2.4s", subtext: "Average time between blocks", icon: Calendar },
                  { title: "Node Uptime", value: "99.97%", subtext: "Overall network reliability", icon: LineChart },
                  { title: "TPS", value: "1,420", subtext: "Transactions per second", icon: BarChart4 },
                  { title: "Latency", value: "85ms", subtext: "Average transaction confirmation", icon: PieChart },
                ].map((item, index) => (
                  <Card key={index} className="bg-secondary/10">
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="bg-primary/10 p-2 rounded-full mb-3">
                          <item.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="text-xl font-bold">{item.value}</div>
                        <div className="text-sm text-muted-foreground">{item.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">{item.subtext}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-secondary/20 p-4 flex items-center justify-between">
                  <div className="text-lg font-medium">Node Status Map</div>
                  <Button variant="outline" size="sm">View Full Map</Button>
                </div>
                <div className="p-6 text-center space-y-4">
                  <div className="bg-muted h-[300px] rounded-lg flex items-center justify-center">
                    <div className="text-muted-foreground">
                      Interactive node map visualization
                      <div className="text-sm">(Connect to real data for live visualization)</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2 justify-center">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span>Active Nodes</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <span>Warning Status</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <span>Offline Nodes</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span>Main Nodes</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button>
              View Detailed Network Statistics
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
