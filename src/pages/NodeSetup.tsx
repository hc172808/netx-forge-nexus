
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle2, Copy, Download, Server, Shield, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

interface NodeConfig {
  nodeType: "main" | "slave";
  resourceAllocation: "low" | "medium" | "high" | "custom";
  customMemory?: number;
  customCPU?: number;
  customStorage?: number;
  enableSSL: boolean;
  autoUpdate: boolean;
  port: number;
  networkId: string;
}

export default function NodeSetup() {
  const [nodeConfig, setNodeConfig] = useState<NodeConfig>({
    nodeType: "slave",
    resourceAllocation: "medium",
    enableSSL: true,
    autoUpdate: true,
    port: 8545,
    networkId: generateNodeId(),
  });
  
  const [setupStatus, setSetupStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  function generateNodeId() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
  
  const handleConfigChange = (field: keyof NodeConfig) => (value: any) => {
    setNodeConfig(prev => ({ ...prev, [field]: value }));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setNodeConfig(prev => ({ ...prev, [name]: newValue }));
  };
  
  const handleResourceChange = (value: string) => {
    setNodeConfig(prev => ({ 
      ...prev, 
      resourceAllocation: value as "low" | "medium" | "high" | "custom" 
    }));
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };
  
  const downloadScript = () => {
    const script = generateBashScript();
    const blob = new Blob([script], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'setup-netx-node.sh';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Node setup script downloaded", {
      description: "Run this script on your server to set up your node."
    });
  };
  
  const setupNode = () => {
    // Simulate node setup process
    setSetupStatus('success');
    
    // In a real application, this would call an API to set up the node
    setTimeout(() => {
      setSetupStatus('idle');
    }, 3000);
  };
  
  const generateBashScript = () => {
    const resourceFlags = {
      low: "--memory=1G --cpu=1 --storage=10G",
      medium: "--memory=2G --cpu=2 --storage=20G",
      high: "--memory=4G --cpu=4 --storage=50G",
      custom: `--memory=${nodeConfig.customMemory || 2}G --cpu=${nodeConfig.customCPU || 2} --storage=${nodeConfig.customStorage || 20}G`,
    };
    
    return `#!/bin/bash
# NETX Forge Node Setup Script
# Generated on ${new Date().toLocaleString()}

echo "Setting up NETX Forge Node..."
echo "Node Type: ${nodeConfig.nodeType}"
echo "Network ID: ${nodeConfig.networkId}"

# Install dependencies
apt-get update
apt-get install -y docker.io docker-compose curl

# Pull NETX node image
docker pull netxforge/node:latest

# Create node configuration
mkdir -p /opt/netx-node
cat > /opt/netx-node/config.yaml <<EOF
node_type: ${nodeConfig.nodeType}
network_id: "${nodeConfig.networkId}"
port: ${nodeConfig.port}
ssl_enabled: ${nodeConfig.enableSSL}
auto_update: ${nodeConfig.autoUpdate}
EOF

# Start node with resource allocation: ${nodeConfig.resourceAllocation}
docker run -d \\
  --name netx-node \\
  -p ${nodeConfig.port}:${nodeConfig.port} \\
  -v /opt/netx-node:/config \\
  ${resourceFlags[nodeConfig.resourceAllocation]} \\
  --restart unless-stopped \\
  netxforge/node:latest \\
  --config /config/config.yaml

echo "Node setup complete! Your node is now running."
echo "Node ID: ${nodeConfig.networkId}"
echo "To check node status: docker logs netx-node"
echo "To stop node: docker stop netx-node"
echo "To start node: docker start netx-node"
`;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Node Setup</h1>
      </div>
      
      <p className="text-muted-foreground">
        Set up and manage your own NETX nodes to contribute to the network and help speed up transactions.
        Nodes relay on each other, with main nodes coordinating and slave nodes processing transactions.
      </p>
      
      <Tabs defaultValue="setup" className="space-y-6">
        <TabsList>
          <TabsTrigger value="setup">Quick Setup</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Configuration</TabsTrigger>
          <TabsTrigger value="monitor">Node Monitoring</TabsTrigger>
        </TabsList>
        
        <TabsContent value="setup" className="space-y-6">
          {setupStatus === 'success' && (
            <Alert variant="default" className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <AlertTitle className="text-green-800">Node Setup Successful</AlertTitle>
              <AlertDescription className="text-green-700">
                Your node is now running with ID: {nodeConfig.networkId}. You can monitor its status in the Node Monitoring tab.
              </AlertDescription>
            </Alert>
          )}
          
          {setupStatus === 'error' && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Setup Failed</AlertTitle>
              <AlertDescription>
                There was an error setting up your node. Please check your configuration and try again.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Node Configuration</CardTitle>
                <CardDescription>
                  Configure your node settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="nodeType">Node Type</Label>
                  <Select 
                    value={nodeConfig.nodeType}
                    onValueChange={(value) => handleConfigChange('nodeType')(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select node type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Main Node (Coordinator)</SelectItem>
                      <SelectItem value="slave">Slave Node (Processor)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="resourceAllocation">Resource Allocation</Label>
                  <Select 
                    value={nodeConfig.resourceAllocation}
                    onValueChange={handleResourceChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select resource allocation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (1 CPU, 1GB RAM, 10GB Storage)</SelectItem>
                      <SelectItem value="medium">Medium (2 CPU, 2GB RAM, 20GB Storage)</SelectItem>
                      <SelectItem value="high">High (4 CPU, 4GB RAM, 50GB Storage)</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {nodeConfig.resourceAllocation === "custom" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="customMemory">Memory (GB)</Label>
                      <Input 
                        id="customMemory" 
                        name="customMemory" 
                        type="number" 
                        placeholder="2" 
                        value={nodeConfig.customMemory || 2}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="customCPU">CPU Cores</Label>
                      <Input 
                        id="customCPU" 
                        name="customCPU" 
                        type="number" 
                        placeholder="2" 
                        value={nodeConfig.customCPU || 2}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="customStorage">Storage (GB)</Label>
                      <Input 
                        id="customStorage" 
                        name="customStorage" 
                        type="number" 
                        placeholder="20" 
                        value={nodeConfig.customStorage || 20}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <Label htmlFor="port">Port</Label>
                  <Input 
                    id="port" 
                    name="port" 
                    type="number" 
                    placeholder="8545" 
                    value={nodeConfig.port}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableSSL">Enable SSL</Label>
                  <Switch 
                    id="enableSSL" 
                    name="enableSSL"
                    checked={nodeConfig.enableSSL}
                    onCheckedChange={handleConfigChange('enableSSL')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoUpdate">Auto Update</Label>
                  <Switch 
                    id="autoUpdate" 
                    name="autoUpdate"
                    checked={nodeConfig.autoUpdate}
                    onCheckedChange={handleConfigChange('autoUpdate')}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={setupNode} className="w-full">
                  <Server className="h-4 w-4 mr-2" />
                  Setup Node
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>One-Click Setup Script</CardTitle>
                <CardDescription>
                  Run this script on your server to set up your node with the current configuration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4">
                  <Textarea 
                    className="font-mono text-xs h-64 resize-none"
                    value={generateBashScript()}
                    readOnly
                  />
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(generateBashScript())}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                
                <div>
                  <Label className="mb-2 block">Node Network ID</Label>
                  <div className="flex gap-2">
                    <Input 
                      value={nodeConfig.networkId} 
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => copyToClipboard(nodeConfig.networkId)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    This unique ID identifies your node on the network
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={downloadScript} variant="default" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Setup Script
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Node Configuration</CardTitle>
              <CardDescription>
                Fine-tune your node settings for optimal performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="advanced-config">Custom Configuration</Label>
                  <Textarea 
                    id="advanced-config"
                    className="font-mono h-64"
                    placeholder={`# Add custom node configuration here
max_connections: 100
sync_mode: "fast"
bootstrap_nodes: ["enode://..."]`}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Advanced configuration allows you to fine-tune your node performance.
                  These settings override the basic configuration.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button className="w-full">
                <Terminal className="h-4 w-4 mr-2" />
                Apply Advanced Configuration
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="monitor" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Node Monitoring</CardTitle>
              <CardDescription>
                Monitor your node status and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Alert className="border-blue-200 bg-blue-50">
                  <Shield className="h-4 w-4 text-blue-700" />
                  <AlertTitle className="text-blue-800">Node Status Simulation</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    This is a simulation of node monitoring. In a real environment, this would connect to your actual nodes.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <div>
                      <h3 className="font-medium">Main Node (Coordinator)</h3>
                      <p className="text-sm text-muted-foreground">ID: node_645a2e8fb3c1</p>
                    </div>
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      Online
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">CPU Usage</span>
                      <span>23%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Memory Usage</span>
                      <span>1.2 GB / 4 GB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Storage</span>
                      <span>15.4 GB / 50 GB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Uptime</span>
                      <span>5 days, 3 hours</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Connected Peers</span>
                      <span>32</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <div>
                      <h3 className="font-medium">Slave Node (Processor)</h3>
                      <p className="text-sm text-muted-foreground">ID: node_7b8c1d9a4e5f</p>
                    </div>
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      Online
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">CPU Usage</span>
                      <span>45%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Memory Usage</span>
                      <span>1.8 GB / 2 GB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Storage</span>
                      <span>12.7 GB / 20 GB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Uptime</span>
                      <span>2 days, 8 hours</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Connected Peers</span>
                      <span>18</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <div>
                      <h3 className="font-medium">Slave Node (Processor)</h3>
                      <p className="text-sm text-muted-foreground">ID: node_2c3d4e5f6g7h</p>
                    </div>
                    <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium">
                      Syncing
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">CPU Usage</span>
                      <span>78%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Memory Usage</span>
                      <span>1.7 GB / 2 GB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Storage</span>
                      <span>8.3 GB / 20 GB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Uptime</span>
                      <span>6 hours</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Sync Progress</span>
                      <span>76%</span>
                    </div>
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
