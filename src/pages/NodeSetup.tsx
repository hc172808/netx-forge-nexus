
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Terminal, Server, ShieldCheck, Download, Check, Copy, CpuIcon, Layers, Network, HardDrive, Cpu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function NodeSetup() {
  const [selectedOS, setSelectedOS] = useState("ubuntu");
  const [nodeType, setNodeType] = useState("validator");
  const [nodeConfig, setNodeConfig] = useState({
    port: "8545",
    rpcEnabled: true,
    wsEnabled: true,
    metricsEnabled: false,
    syncMode: "fast",
    networkId: "1",
    dataDir: "/var/lib/netx",
    logLevel: "info",
  });
  const { toast } = useToast();

  const handleCopyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    toast({
      title: "Command Copied",
      description: "The setup command has been copied to clipboard.",
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Node Setup</h1>
        <p className="text-muted-foreground mt-2">
          Configure and deploy NETX blockchain nodes on different platforms
        </p>
      </div>

      <Tabs defaultValue="setup" className="space-y-4">
        <TabsList>
          <TabsTrigger value="setup" className="flex items-center">
            <Server className="w-4 h-4 mr-2" />
            Setup
          </TabsTrigger>
          <TabsTrigger value="requirements" className="flex items-center">
            <CpuIcon className="w-4 h-4 mr-2" />
            Requirements
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <ShieldCheck className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="deployment" className="flex items-center">
            <Terminal className="w-4 h-4 mr-2" />
            Deployment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Node Configuration</CardTitle>
              <CardDescription>
                Configure your NETX blockchain node for deployment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="os">Operating System</Label>
                    <Select value={selectedOS} onValueChange={setSelectedOS}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select OS" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ubuntu">Ubuntu 20.04 LTS</SelectItem>
                        <SelectItem value="debian">Debian 11</SelectItem>
                        <SelectItem value="centos">CentOS 8</SelectItem>
                        <SelectItem value="fedora">Fedora 35</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="node-type">Node Type</Label>
                    <Select value={nodeType} onValueChange={setNodeType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select node type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="validator">Validator Node</SelectItem>
                        <SelectItem value="full">Full Node</SelectItem>
                        <SelectItem value="light">Light Node</SelectItem>
                        <SelectItem value="archive">Archive Node</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="port">RPC Port</Label>
                    <Input
                      id="port"
                      value={nodeConfig.port}
                      onChange={(e) => setNodeConfig({...nodeConfig, port: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="dataDir">Data Directory</Label>
                    <Input
                      id="dataDir"
                      value={nodeConfig.dataDir}
                      onChange={(e) => setNodeConfig({...nodeConfig, dataDir: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="networkId">Network ID</Label>
                    <Input
                      id="networkId"
                      value={nodeConfig.networkId}
                      onChange={(e) => setNodeConfig({...nodeConfig, networkId: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="syncMode">Sync Mode</Label>
                    <Select
                      value={nodeConfig.syncMode}
                      onValueChange={(value) => setNodeConfig({...nodeConfig, syncMode: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sync mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fast">Fast</SelectItem>
                        <SelectItem value="full">Full</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="logLevel">Log Level</Label>
                    <Select
                      value={nodeConfig.logLevel}
                      onValueChange={(value) => setNodeConfig({...nodeConfig, logLevel: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select log level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debug">Debug</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warn">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="rpc">Enable RPC</Label>
                      <p className="text-xs text-muted-foreground">Allow remote procedure calls</p>
                    </div>
                    <Switch
                      id="rpc"
                      checked={nodeConfig.rpcEnabled}
                      onCheckedChange={(checked) => setNodeConfig({...nodeConfig, rpcEnabled: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="ws">Enable WebSockets</Label>
                      <p className="text-xs text-muted-foreground">Allow WebSocket connections</p>
                    </div>
                    <Switch
                      id="ws"
                      checked={nodeConfig.wsEnabled}
                      onCheckedChange={(checked) => setNodeConfig({...nodeConfig, wsEnabled: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="metrics">Enable Metrics</Label>
                      <p className="text-xs text-muted-foreground">Collect performance metrics</p>
                    </div>
                    <Switch
                      id="metrics"
                      checked={nodeConfig.metricsEnabled}
                      onCheckedChange={(checked) => setNodeConfig({...nodeConfig, metricsEnabled: checked})}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Installation Script</h3>
                <div className="bg-muted rounded-md p-4 relative">
                  <pre className="text-sm text-muted-foreground overflow-x-auto">
                    {`#!/bin/bash

# NETX Blockchain Node Setup Script for ${selectedOS === 'ubuntu' ? 'Ubuntu' : selectedOS === 'debian' ? 'Debian' : selectedOS === 'centos' ? 'CentOS' : 'Fedora'}
# Node Type: ${nodeType === 'validator' ? 'Validator Node' : nodeType === 'full' ? 'Full Node' : nodeType === 'light' ? 'Light Node' : 'Archive Node'}

# Update system
${selectedOS === 'ubuntu' || selectedOS === 'debian' ? 'apt update && apt upgrade -y' : 'dnf update -y'}

# Install dependencies
${selectedOS === 'ubuntu' || selectedOS === 'debian' ? 'apt install -y build-essential git curl wget' : 'dnf install -y git curl wget gcc-c++ make'}

# Create data directory
mkdir -p ${nodeConfig.dataDir}

# Download NETX node binary
wget -O /usr/local/bin/netx-node https://download.netxforge.com/node/latest
chmod +x /usr/local/bin/netx-node

# Create systemd service
cat > /etc/systemd/system/netx-node.service << EOF
[Unit]
Description=NETX Blockchain ${nodeType.charAt(0).toUpperCase() + nodeType.slice(1)} Node
After=network.target

[Service]
Type=simple
User=netx
ExecStart=/usr/local/bin/netx-node \\
  --${nodeType} \\
  --syncmode ${nodeConfig.syncMode} \\
  --datadir ${nodeConfig.dataDir} \\
  --port ${nodeConfig.port} \\
  --networkid ${nodeConfig.networkId} \\
  --loglevel ${nodeConfig.logLevel} \\
  ${nodeConfig.rpcEnabled ? '--rpc --rpcport ' + nodeConfig.port + ' --rpcaddr 127.0.0.1' : ''} \\
  ${nodeConfig.wsEnabled ? '--ws --wsport ' + (parseInt(nodeConfig.port) + 1) + ' --wsaddr 127.0.0.1' : ''} \\
  ${nodeConfig.metricsEnabled ? '--metrics --metrics.port ' + (parseInt(nodeConfig.port) + 2) : ''}
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Create user
useradd -m -s /bin/bash netx

# Set permissions
chown -R netx:netx ${nodeConfig.dataDir}

# Enable and start service
systemctl daemon-reload
systemctl enable netx-node
systemctl start netx-node

echo "NETX Blockchain Node installation completed!"
`}
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => handleCopyCommand(`#!/bin/bash

# NETX Blockchain Node Setup Script for ${selectedOS === 'ubuntu' ? 'Ubuntu' : selectedOS === 'debian' ? 'Debian' : selectedOS === 'centos' ? 'CentOS' : 'Fedora'}
# Node Type: ${nodeType === 'validator' ? 'Validator Node' : nodeType === 'full' ? 'Full Node' : nodeType === 'light' ? 'Light Node' : 'Archive Node'}

# Update system
${selectedOS === 'ubuntu' || selectedOS === 'debian' ? 'apt update && apt upgrade -y' : 'dnf update -y'}

# Install dependencies
${selectedOS === 'ubuntu' || selectedOS === 'debian' ? 'apt install -y build-essential git curl wget' : 'dnf install -y git curl wget gcc-c++ make'}

# Create data directory
mkdir -p ${nodeConfig.dataDir}

# Download NETX node binary
wget -O /usr/local/bin/netx-node https://download.netxforge.com/node/latest
chmod +x /usr/local/bin/netx-node

# Create systemd service
cat > /etc/systemd/system/netx-node.service << EOF
[Unit]
Description=NETX Blockchain ${nodeType.charAt(0).toUpperCase() + nodeType.slice(1)} Node
After=network.target

[Service]
Type=simple
User=netx
ExecStart=/usr/local/bin/netx-node \\
  --${nodeType} \\
  --syncmode ${nodeConfig.syncMode} \\
  --datadir ${nodeConfig.dataDir} \\
  --port ${nodeConfig.port} \\
  --networkid ${nodeConfig.networkId} \\
  --loglevel ${nodeConfig.logLevel} \\
  ${nodeConfig.rpcEnabled ? '--rpc --rpcport ' + nodeConfig.port + ' --rpcaddr 127.0.0.1' : ''} \\
  ${nodeConfig.wsEnabled ? '--ws --wsport ' + (parseInt(nodeConfig.port) + 1) + ' --wsaddr 127.0.0.1' : ''} \\
  ${nodeConfig.metricsEnabled ? '--metrics --metrics.port ' + (parseInt(nodeConfig.port) + 2) : ''}
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Create user
useradd -m -s /bin/bash netx

# Set permissions
chown -R netx:netx ${nodeConfig.dataDir}

# Enable and start service
systemctl daemon-reload
systemctl enable netx-node
systemctl start netx-node

echo "NETX Blockchain Node installation completed!"
`)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-end">
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Download Script
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requirements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Requirements</CardTitle>
              <CardDescription>
                Minimum and recommended hardware specifications for different node types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Light Node</CardTitle>
                        <Badge>Minimal</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-start">
                        <Cpu className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">CPU</p>
                          <p className="text-sm text-muted-foreground">2 cores, 2.0 GHz or better</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Layers className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">RAM</p>
                          <p className="text-sm text-muted-foreground">4 GB</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <HardDrive className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Storage</p>
                          <p className="text-sm text-muted-foreground">50 GB SSD</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Network className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Network</p>
                          <p className="text-sm text-muted-foreground">10 Mbps</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Full Node</CardTitle>
                        <Badge>Standard</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-start">
                        <Cpu className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">CPU</p>
                          <p className="text-sm text-muted-foreground">4 cores, 3.0 GHz or better</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Layers className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">RAM</p>
                          <p className="text-sm text-muted-foreground">8 GB</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <HardDrive className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Storage</p>
                          <p className="text-sm text-muted-foreground">500 GB SSD</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Network className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Network</p>
                          <p className="text-sm text-muted-foreground">25 Mbps</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Validator</CardTitle>
                        <Badge className="bg-primary">High Performance</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-start">
                        <Cpu className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">CPU</p>
                          <p className="text-sm text-muted-foreground">8 cores, 3.5 GHz or better</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Layers className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">RAM</p>
                          <p className="text-sm text-muted-foreground">16 GB</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <HardDrive className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Storage</p>
                          <p className="text-sm text-muted-foreground">1 TB NVMe SSD</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Network className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Network</p>
                          <p className="text-sm text-muted-foreground">100 Mbps, low latency</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Software Requirements</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                      <div>
                        <p className="font-medium">Linux-based OS</p>
                        <p className="text-sm text-muted-foreground">Ubuntu 20.04+, Debian 11+, CentOS 8+, or Fedora 35+</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                      <div>
                        <p className="font-medium">Systemd</p>
                        <p className="text-sm text-muted-foreground">For service management</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                      <div>
                        <p className="font-medium">Firewall rules</p>
                        <p className="text-sm text-muted-foreground">Allow inbound/outbound on TCP ports 8545-8547</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                      <div>
                        <p className="font-medium">NTP</p>
                        <p className="text-sm text-muted-foreground">Synchronized system clock</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Best Practices</CardTitle>
              <CardDescription>
                Recommendations for securing your NETX blockchain node
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">System Security</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        <p>Keep the system updated with security patches</p>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        <p>Use strong passwords and key-based SSH authentication</p>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        <p>Disable root SSH access</p>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        <p>Configure a firewall (UFW/iptables) to allow only necessary ports</p>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        <p>Use fail2ban to prevent brute force attacks</p>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        <p>Set up intrusion detection with OSSEC/Wazuh</p>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Node Security</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        <p>Run the node under a non-root user</p>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        <p>Enable quantum-resistant encryption for node communications</p>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        <p>Set up TLS for RPC and WebSocket endpoints</p>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        <p>Only bind RPC to localhost (127.0.0.1) by default</p>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        <p>Use JWT or API keys for RPC authentication</p>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        <p>Regularly back up node key material</p>
                      </li>
                    </ul>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Validator Security (Additional Measures)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        <p>Use hardware security modules (HSMs) for key storage</p>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        <p>Implement a validator key rotation schedule</p>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        <p>Set up a dedicated validator server separate from the RPC endpoint</p>
                      </li>
                    </ul>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        <p>Configure monitoring and alerts for validator downtime</p>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        <p>Use VPN for secure remote management</p>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        <p>Implement disaster recovery procedures</p>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-muted rounded-md p-4">
                  <h4 className="font-medium mb-2">Security Configuration Script</h4>
                  <pre className="text-sm text-muted-foreground overflow-x-auto">
                    {`#!/bin/bash
# Basic security setup script for NETX node servers

# Update system
apt update && apt upgrade -y

# Install security packages
apt install -y ufw fail2ban unattended-upgrades

# Configure firewall
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 8545/tcp  # RPC port
ufw allow 8546/tcp  # WS port
ufw allow 30303/tcp # P2P port
ufw allow 30303/udp # P2P port
ufw enable

# Configure automatic updates
cat > /etc/apt/apt.conf.d/20auto-upgrades << EOF
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
APT::Periodic::AutocleanInterval "7";
EOF

# Configure fail2ban
cat > /etc/fail2ban/jail.local << EOF
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 5
bantime = 3600
EOF

# Restart fail2ban
systemctl restart fail2ban

# Secure shared memory
echo "tmpfs /run/shm tmpfs defaults,noexec,nosuid 0 0" >> /etc/fstab

# Set secure permissions for NETX data directory
chmod -R 700 /var/lib/netx

echo "Basic security setup completed. Please reboot the system."
`}
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="mt-2"
                    onClick={() => handleCopyCommand(`#!/bin/bash
# Basic security setup script for NETX node servers

# Update system
apt update && apt upgrade -y

# Install security packages
apt install -y ufw fail2ban unattended-upgrades

# Configure firewall
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 8545/tcp  # RPC port
ufw allow 8546/tcp  # WS port
ufw allow 30303/tcp # P2P port
ufw allow 30303/udp # P2P port
ufw enable

# Configure automatic updates
cat > /etc/apt/apt.conf.d/20auto-upgrades << EOF
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
APT::Periodic::AutocleanInterval "7";
EOF

# Configure fail2ban
cat > /etc/fail2ban/jail.local << EOF
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 5
bantime = 3600
EOF

# Restart fail2ban
systemctl restart fail2ban

# Secure shared memory
echo "tmpfs /run/shm tmpfs defaults,noexec,nosuid 0 0" >> /etc/fstab

# Set secure permissions for NETX data directory
chmod -R 700 /var/lib/netx

echo "Basic security setup completed. Please reboot the system."
`)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Security Script
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deployment Steps</CardTitle>
              <CardDescription>
                Step-by-step guide for deploying a NETX blockchain node
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">1. Prepare the Server</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center mr-2 mt-0.5">1</div>
                          <p>Setup a server with Ubuntu 20.04 LTS or later</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center mr-2 mt-0.5">2</div>
                          <p>Apply system updates and security patches</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center mr-2 mt-0.5">3</div>
                          <p>Configure SSH access with key-based authentication</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center mr-2 mt-0.5">4</div>
                          <p>Setup basic firewall (UFW) rules</p>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">2. Install Dependencies</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center mr-2 mt-0.5">1</div>
                          <p>Install build tools and dependencies</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center mr-2 mt-0.5">2</div>
                          <p>Create a dedicated user for running the node</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center mr-2 mt-0.5">3</div>
                          <p>Download the NETX node binary</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center mr-2 mt-0.5">4</div>
                          <p>Verify the binary integrity</p>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">3. Configure & Run</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center mr-2 mt-0.5">1</div>
                          <p>Create systemd service for the node</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center mr-2 mt-0.5">2</div>
                          <p>Set proper file permissions</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center mr-2 mt-0.5">3</div>
                          <p>Start the node service</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center mr-2 mt-0.5">4</div>
                          <p>Monitor node syncing and logs</p>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Example Deployment Workflow</h3>
                  <div className="space-y-2">
                    <div className="bg-muted rounded-md p-3">
                      <h4 className="font-medium mb-1">1. Create an instance with adequate resources</h4>
                      <p className="text-sm text-muted-foreground">Use a cloud provider (AWS, GCP, Azure, DigitalOcean) or set up a local server.</p>
                    </div>
                    <div className="bg-muted rounded-md p-3">
                      <h4 className="font-medium mb-1">2. SSH into the server and run the setup script</h4>
                      <pre className="text-sm text-muted-foreground">ssh user@your-server-ip</pre>
                      <pre className="text-sm text-muted-foreground">wget -O setup.sh https://netxforge.com/node-setup.sh</pre>
                      <pre className="text-sm text-muted-foreground">chmod +x setup.sh</pre>
                      <pre className="text-sm text-muted-foreground">sudo ./setup.sh</pre>
                    </div>
                    <div className="bg-muted rounded-md p-3">
                      <h4 className="font-medium mb-1">3. Monitor the node status</h4>
                      <pre className="text-sm text-muted-foreground">systemctl status netx-node</pre>
                      <pre className="text-sm text-muted-foreground">journalctl -u netx-node -f</pre>
                    </div>
                    <div className="bg-muted rounded-md p-3">
                      <h4 className="font-medium mb-1">4. Connect to the node using the web dashboard</h4>
                      <pre className="text-sm text-muted-foreground">http://localhost:8080 or https://your-server-ip:8080</pre>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Open Documentation</Button>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Download Complete Guide (PDF)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
