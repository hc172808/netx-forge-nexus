
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, BarChart, LineChart, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Area, Bar, Line, Pie, Legend, CartesianGrid, Cell } from "recharts";
import { ArrowRight, ArrowUpDown, BarChart4, ChevronRight, Download, FileText, LineChart as LineChartIcon, PieChart as PieChartIcon } from "lucide-react";

export default function Analytics() {
  // Mock price history data
  const priceHistoryData = [
    { date: 'Apr 10', NETX: 420, CONTX: 180, DEVX: 240 },
    { date: 'Apr 11', NETX: 440, CONTX: 190, DEVX: 255 },
    { date: 'Apr 12', NETX: 435, CONTX: 210, DEVX: 245 },
    { date: 'Apr 13', NETX: 450, CONTX: 215, DEVX: 260 },
    { date: 'Apr 14', NETX: 470, CONTX: 225, DEVX: 280 },
    { date: 'Apr 15', NETX: 490, CONTX: 235, DEVX: 290 },
    { date: 'Apr 16', NETX: 510, CONTX: 240, DEVX: 310 },
  ];
  
  // Trading volume data
  const volumeData = [
    { date: 'Apr 10', NETX: 120000, CONTX: 45000, DEVX: 30000 },
    { date: 'Apr 11', NETX: 135000, CONTX: 48000, DEVX: 32000 },
    { date: 'Apr 12', NETX: 148000, CONTX: 52000, DEVX: 35000 },
    { date: 'Apr 13', NETX: 142000, CONTX: 50000, DEVX: 34000 },
    { date: 'Apr 14', NETX: 160000, CONTX: 55000, DEVX: 38000 },
    { date: 'Apr 15', NETX: 175000, CONTX: 60000, DEVX: 42000 },
    { date: 'Apr 16', NETX: 190000, CONTX: 65000, DEVX: 45000 },
  ];
  
  // Token distribution data
  const tokenDistributionData = [
    { name: 'Circulating Supply', value: 75 },
    { name: 'Reserved', value: 15 },
    { name: 'Team & Advisors', value: 5 },
    { name: 'Community', value: 5 },
  ];
  
  // Transaction types data
  const transactionTypesData = [
    { name: 'Transfers', count: 450 },
    { name: 'Swaps', count: 320 },
    { name: 'Token Creation', count: 85 },
    { name: 'Staking', count: 150 },
    { name: 'Other', count: 95 },
  ];
  
  // Market data
  const marketSummaryData = [
    { name: 'NETX', price: '$510.00', change: '+4.1%', volume: '$190M', marketCap: '$5.1B' },
    { name: 'CONTX', price: '$240.00', change: '+2.1%', volume: '$65M', marketCap: '$2.4B' },
    { name: 'DEVX', price: '$310.00', change: '+6.9%', volume: '$45M', marketCap: '$1.6B' },
    { name: 'TEST', price: '$12.50', change: '-1.2%', volume: '$2.3M', marketCap: '$125M' },
    { name: 'TRAIN', price: '$45.75', change: '+3.5%', volume: '$12M', marketCap: '$458M' },
  ];
  
  // COLORS for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Blockchain and token performance analytics</p>
      </div>
      
      <div className="flex items-center justify-between">
        <Tabs defaultValue="charts" className="w-full">
          <TabsList>
            <TabsTrigger value="charts">
              <BarChart4 className="h-4 w-4 mr-2" />
              Charts
            </TabsTrigger>
            <TabsTrigger value="market">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Market
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-4">
            <TabsContent value="charts" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <LineChartIcon className="h-4 w-4 mr-2 text-primary" />
                      Token Price History
                    </CardTitle>
                    <CardDescription>Past 7 days price movement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={priceHistoryData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="NETX" stroke="#0088FE" activeDot={{ r: 8 }} />
                          <Line type="monotone" dataKey="CONTX" stroke="#00C49F" />
                          <Line type="monotone" dataKey="DEVX" stroke="#FFBB28" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-2 text-right">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <BarChart4 className="h-4 w-4 mr-2 text-primary" />
                      Trading Volume
                    </CardTitle>
                    <CardDescription>Daily trading activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={volumeData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="NETX" fill="#0088FE" />
                          <Bar dataKey="CONTX" fill="#00C49F" />
                          <Bar dataKey="DEVX" fill="#FFBB28" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-2 text-right">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <PieChartIcon className="h-4 w-4 mr-2 text-primary" />
                      NETX Token Distribution
                    </CardTitle>
                    <CardDescription>Allocation percentages</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={tokenDistributionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {tokenDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <BarChart4 className="h-4 w-4 mr-2 text-primary" />
                      Transaction Types
                    </CardTitle>
                    <CardDescription>Past 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={transactionTypesData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#8884d8">
                            {transactionTypesData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="market">
              <Card>
                <CardHeader>
                  <CardTitle>Market Summary</CardTitle>
                  <CardDescription>
                    Current prices and market activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Token</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">24h Change</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">24h Volume</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Market Cap</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {marketSummaryData.map((token, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-4 align-middle font-medium">{token.name}</td>
                            <td className="p-4 align-middle">{token.price}</td>
                            <td className={`p-4 align-middle ${token.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                              {token.change}
                            </td>
                            <td className="p-4 align-middle">{token.volume}</td>
                            <td className="p-4 align-middle">{token.marketCap}</td>
                            <td className="p-4 align-middle">
                              <Button variant="ghost" size="sm">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4 flex justify-between">
                    <Select defaultValue="7d">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Time Period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24h">Last 24 Hours</SelectItem>
                        <SelectItem value="7d">Last 7 Days</SelectItem>
                        <SelectItem value="30d">Last 30 Days</SelectItem>
                        <SelectItem value="90d">Last 90 Days</SelectItem>
                        <SelectItem value="1y">Last Year</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Full Market Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
