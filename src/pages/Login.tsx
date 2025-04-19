
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Activity, KeyRound, LogIn, Wallet } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [recoveryPhrase, setRecoveryPhrase] = useState("");
  const [walletPassword, setWalletPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithWallet } = useAuth();

  // Get the redirect path from location state, or default to dashboard
  const from = location.state?.from?.pathname || "/";

  const handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.username || !credentials.password) {
      toast.error("Login failed", {
        description: "Please enter both email/username and password"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(credentials.username, credentials.password);
      
      if (success) {
        // If login was successful, redirect to the page they tried to access
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login error", {
        description: "An unexpected error occurred. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recoveryPhrase || !walletPassword) {
      toast.error("Wallet login failed", {
        description: "Please enter both recovery phrase and password"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await loginWithWallet(recoveryPhrase, walletPassword);
      
      if (success) {
        // If login was successful, redirect to the page they tried to access
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Wallet login error:", error);
      toast.error("Login error", { 
        description: "An unexpected error occurred. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletProviderLogin = (provider: string) => {
    toast.info(`${provider} Login`, {
      description: `Connecting to ${provider}... This feature will be available soon.`
    });
    
    // In a real app, we would connect to the wallet provider here
    // For now, we'll just simulate a successful login after a short delay
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      // Create a demo wallet for this provider
      const demoSeedPhrase = "test test test test test test test test test test test test";
      loginWithWallet(demoSeedPhrase, "demo-password").then(success => {
        if (success) {
          navigate(from, { replace: true });
        }
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-4">
        <div className="flex flex-col items-center mb-6 text-center">
          <Activity className="h-10 w-10 text-primary mb-2" />
          <h1 className="text-2xl font-bold">NETX Forge Nexus</h1>
          <p className="text-muted-foreground">The next generation blockchain platform</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Choose your preferred login method
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="credentials" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="credentials">
                  <KeyRound className="h-4 w-4 mr-2" />
                  Credentials
                </TabsTrigger>
                <TabsTrigger value="wallet">
                  <Wallet className="h-4 w-4 mr-2" />
                  Wallet
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="credentials" className="p-1">
                <form className="space-y-4 mt-4" onSubmit={handleCredentialsSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="username">Email or Username</Label>
                    <Input 
                      id="username" 
                      placeholder="Enter your email or username" 
                      value={credentials.username}
                      onChange={handleCredentialsChange}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link 
                        to="/forgot-password" 
                        className="text-xs text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Enter your password" 
                      value={credentials.password}
                      onChange={handleCredentialsChange}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember" 
                      checked={rememberMe}
                      onCheckedChange={(checked) => 
                        setRememberMe(checked as boolean)
                      }
                      disabled={isLoading}
                    />
                    <Label htmlFor="remember" className="text-sm">Remember me for 30 days</Label>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                        Logging in...
                      </>
                    ) : (
                      <>
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="wallet" className="p-1">
                <form className="space-y-4 mt-4" onSubmit={handleWalletSubmit}>
                  <p className="text-sm text-muted-foreground">
                    Connect with one of our supported wallet providers:
                  </p>
                  
                  <div className="grid gap-2">
                    <Button 
                      variant="outline" 
                      className="justify-start" 
                      type="button"
                      onClick={() => handleWalletProviderLogin("Trust Wallet")}
                      disabled={isLoading}
                    >
                      <img 
                        src="https://placehold.co/30x30/4c54e8/ffffff.png?text=TW"
                        alt="Trust Wallet" 
                        className="h-5 w-5 mr-2"
                      />
                      Trust Wallet
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start" 
                      type="button"
                      onClick={() => handleWalletProviderLogin("Phantom")}
                      disabled={isLoading}
                    >
                      <img 
                        src="https://placehold.co/30x30/9945ff/ffffff.png?text=PH"
                        alt="Phantom" 
                        className="h-5 w-5 mr-2"
                      />
                      Phantom Wallet
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start" 
                      type="button"
                      onClick={() => handleWalletProviderLogin("MetaMask")}
                      disabled={isLoading}
                    >
                      <img 
                        src="https://placehold.co/30x30/f97316/ffffff.png?text=MM"
                        alt="MetaMask" 
                        className="h-5 w-5 mr-2"
                      />
                      MetaMask
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="recoveryPhrase">Or enter wallet recovery phrase</Label>
                    <Input 
                      id="recoveryPhrase" 
                      placeholder="Enter recovery phrase" 
                      value={recoveryPhrase}
                      onChange={(e) => setRecoveryPhrase(e.target.value)}
                      disabled={isLoading}
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter your 12, 18, or 24-word recovery phrase
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="walletPassword">Wallet Password</Label>
                    <Input 
                      id="walletPassword" 
                      type="password"
                      placeholder="Enter wallet password" 
                      value={walletPassword}
                      onChange={(e) => setWalletPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                        Connecting...
                      </>
                    ) : (
                      "Connect Wallet"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <Separator />
          <CardFooter className="flex flex-col p-6 gap-4">
            <p className="text-sm text-muted-foreground text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Create account
              </Link>
            </p>
            
            <p className="text-xs text-muted-foreground text-center">
              By logging in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
