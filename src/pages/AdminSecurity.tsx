
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  AlertTriangle, 
  ChevronRight, 
  CreditCard, 
  Fingerprint, 
  HelpCircle, 
  KeyRound, 
  LayoutDashboard, 
  Lock, 
  RefreshCw, 
  Save, 
  Settings, 
  ShieldAlert, 
  ShieldCheck
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdminSecurity() {
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
  
  const [securityLevel, setSecurityLevel] = useState(70);
  const [keyRotationDays, setKeyRotationDays] = useState(30);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("dilithium3");
  
  const { toast } = useToast();

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
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your security settings have been updated successfully."
    });
  };
  
  const handleResetToDefaults = () => {
    setPaymentMethods({
      creditCard: true,
      crypto: true,
      bankTransfer: false
    });
    
    setQuantumSettings({
      quantumResistant: true,
      hybridEncryption: true,
      autoKeyRotation: false
    });
    
    setSecurityLevel(70);
    setKeyRotationDays(30);
    setSelectedAlgorithm("dilithium3");
    
    toast({
      title: "Settings Reset",
      description: "Security settings have been reset to defaults."
    });
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
              <BreadcrumbPage>Security Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold mt-2">Security Settings</h1>
        <p className="text-muted-foreground">Configure platform security and payment settings</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
              Security Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-3xl font-bold">{securityLevel}</div>
              <div className={`text-sm ${securityLevel >= 80 ? "text-green-500" : securityLevel >= 60 ? "text-yellow-500" : "text-red-500"}`}>
                {securityLevel >= 80 ? "High" : securityLevel >= 60 ? "Medium" : "Low"}
              </div>
            </div>
            <p className="text-muted-foreground text-sm">Current security protection level</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <KeyRound className="h-4 w-4 mr-2 text-primary" />
              Encryption
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-medium">Quantum-Safe</div>
            <p className="text-muted-foreground text-sm">Post-quantum cryptography enabled</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Fingerprint className="h-4 w-4 mr-2 text-primary" />
              Authentication
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-medium">Multi-factor</div>
            <p className="text-muted-foreground text-sm">Web3 wallet & email verification</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="quantum">
        <TabsList>
          <TabsTrigger value="quantum">
            <ShieldCheck className="h-4 w-4 mr-2" />
            Quantum Security
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="h-4 w-4 mr-2" />
            Payment Methods
          </TabsTrigger>
          <TabsTrigger value="access">
            <Lock className="h-4 w-4 mr-2" />
            Access Control
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="quantum">
          <Card>
            <CardHeader>
              <CardTitle>Quantum Security Settings</CardTitle>
              <CardDescription>
                Configure post-quantum cryptography features for the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-medium">Security Level</Label>
                      <div className="text-sm font-medium">
                        {securityLevel}%
                      </div>
                    </div>
                    <Slider 
                      value={[securityLevel]} 
                      onValueChange={([value]) => setSecurityLevel(value)} 
                      max={100} 
                      step={5}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Basic</span>
                      <span>Standard</span>
                      <span>Maximum</span>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Label htmlFor="algorithm">Post-Quantum Algorithm</Label>
                    <Select
                      value={selectedAlgorithm}
                      onValueChange={setSelectedAlgorithm}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dilithium2">Dilithium2 (Balanced)</SelectItem>
                        <SelectItem value="dilithium3">Dilithium3 (Recommended)</SelectItem>
                        <SelectItem value="dilithium5">Dilithium5 (Maximum Security)</SelectItem>
                        <SelectItem value="falcon512">Falcon-512</SelectItem>
                        <SelectItem value="falcon1024">Falcon-1024</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      Determines the quantum-resistant signature algorithm used
                    </p>
                  </div>
                  
                  <div className="pt-2">
                    <Label htmlFor="rotation">Key Rotation Period (Days)</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Input
                        id="rotation"
                        type="number"
                        value={keyRotationDays}
                        onChange={(e) => setKeyRotationDays(parseInt(e.target.value))}
                        min={1}
                        max={365}
                      />
                      <Button variant="outline" size="icon">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      How often encryption keys are automatically rotated
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="flex items-center">
                        <ShieldCheck className="w-4 h-4 mr-2" />
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
                  
                  <div className="bg-muted rounded-md p-4 mt-6">
                    <div className="flex">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-sm">Important Security Information</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Enabling quantum-resistant encryption provides protection against future quantum computing attacks, but may slightly increase transaction processing time and signature size.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleResetToDefaults}>
                  Reset to Defaults
                </Button>
                <Button onClick={handleSaveSettings}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
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
                      <KeyRound className="w-4 h-4 mr-2" />
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
                      <LayoutDashboard className="w-4 h-4 mr-2" />
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
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Processing Settings</h3>
                
                <div className="space-y-2">
                  <Label>Transaction Fee (%)</Label>
                  <div className="w-full md:w-1/2">
                    <Slider 
                      defaultValue={[2.5]} 
                      max={10} 
                      step={0.1}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Default: 2.5%</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="min-transaction">Minimum Transaction (USD)</Label>
                    <Input 
                      id="min-transaction" 
                      defaultValue="10.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="max-transaction">Maximum Transaction (USD)</Label>
                    <Input 
                      id="max-transaction" 
                      defaultValue="50000.00"
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleResetToDefaults}>
                  Reset to Defaults
                </Button>
                <Button onClick={handleSaveSettings}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="access">
          <Card>
            <CardHeader>
              <CardTitle>Access Control</CardTitle>
              <CardDescription>Configure user access and authentication settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for admin actions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Web3 Wallet Authentication</Label>
                    <p className="text-sm text-muted-foreground">Allow login with web3 wallets</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Authentication</Label>
                    <p className="text-sm text-muted-foreground">Allow login with email and password</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>OAuth Providers</Label>
                    <p className="text-sm text-muted-foreground">Allow social media logins</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>IP Restriction</Label>
                    <p className="text-sm text-muted-foreground">Limit admin access to specific IPs</p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Session Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input 
                      id="session-timeout" 
                      defaultValue="30"
                      type="number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="max-attempts">Max Login Attempts</Label>
                    <Input 
                      id="max-attempts" 
                      defaultValue="5"
                      type="number"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border">
                    <HelpCircle className="h-3 w-3" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    After exceeding max login attempts, accounts will be temporarily locked for 15 minutes
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleResetToDefaults}>
                  Reset to Defaults
                </Button>
                <Button onClick={handleSaveSettings}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
