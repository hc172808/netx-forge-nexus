
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Activity, Shield, Server, Network, Clock, Database } from "lucide-react";

export function NetworkStatusMonitor() {
  const [networkStatus, setNetworkStatus] = useState({
    connected: true,
    peers: 24,
    blockHeight: 72894,
    lastBlockTime: new Date().getTime() - 30000, // 30 seconds ago
    transactionsInQueue: 7,
    nodesOnline: 35,
    syncProgress: 100,
    networkHashrate: "12.5 TH/s",
    consensusType: "Proof of Work",
    encryptionStatus: "Active (TLS 1.3)",
    firewallStatus: "Active",
  });

  // Simulate network activity
  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkStatus(prev => ({
        ...prev,
        blockHeight: prev.blockHeight + (Math.random() > 0.7 ? 1 : 0),
        lastBlockTime: Math.random() > 0.7 ? new Date().getTime() : prev.lastBlockTime,
        transactionsInQueue: Math.max(0, prev.transactionsInQueue + Math.floor(Math.random() * 3) - 1),
        peers: Math.max(5, prev.peers + (Math.random() > 0.8 ? Math.floor(Math.random() * 3) - 1 : 0)),
        nodesOnline: Math.max(20, prev.nodesOnline + (Math.random() > 0.8 ? Math.floor(Math.random() * 3) - 1 : 0)),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Calculate time since last block
  const getTimeSinceLastBlock = () => {
    const seconds = Math.floor((new Date().getTime() - networkStatus.lastBlockTime) / 1000);
    return seconds + (seconds === 1 ? " second" : " seconds") + " ago";
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center">
            <Network className="mr-2 h-5 w-5" />
            Blockchain Network Status
          </CardTitle>
          <Badge variant={networkStatus.connected ? "success" : "destructive"}>
            {networkStatus.connected ? "Connected" : "Disconnected"}
          </Badge>
        </div>
        <CardDescription>
          Real-time monitoring of network performance and security
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center">
                  <Activity className="mr-1 h-4 w-4" />
                  Current Block Height
                </span>
                <span className="font-medium">{networkStatus.blockHeight.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  Last Block Time
                </span>
                <span className="font-medium">{getTimeSinceLastBlock()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center">
                  <Database className="mr-1 h-4 w-4" />
                  Pending Transactions
                </span>
                <span className="font-medium">{networkStatus.transactionsInQueue}</span>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Consensus Algorithm</span>
                <Badge variant="outline">{networkStatus.consensusType}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Network Hashrate</span>
                <span className="font-medium">{networkStatus.networkHashrate}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center">
                  <Server className="mr-1 h-4 w-4" />
                  Active Peers
                </span>
                <span className="font-medium">{networkStatus.peers}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Nodes Online</span>
                <span className="font-medium">{networkStatus.nodesOnline}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center">
                  <Shield className="mr-1 h-4 w-4" />
                  Encryption Status
                </span>
                <Badge variant="outline" className="bg-green-500/10">
                  {networkStatus.encryptionStatus}
                </Badge>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Firewall Status</span>
                <Badge variant="outline" className="bg-green-500/10">
                  {networkStatus.firewallStatus}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Blockchain Sync</span>
                  <span className="font-medium">{networkStatus.syncProgress}%</span>
                </div>
                <Progress value={networkStatus.syncProgress} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
