
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Activity, KeyRound, LogIn, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
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
                <form className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="Enter your username" />
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
                    <Input id="password" type="password" placeholder="Enter your password" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm">Remember me for 30 days</Label>
                  </div>
                  <Button type="submit" className="w-full">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="wallet" className="p-1">
                <div className="space-y-4 mt-4">
                  <p className="text-sm text-muted-foreground">
                    Connect with one of our supported wallet providers:
                  </p>
                  
                  <div className="grid gap-2">
                    <Button variant="outline" className="justify-start">
                      <img 
                        src="https://placehold.co/30x30/4c54e8/ffffff.png?text=TW"
                        alt="Trust Wallet" 
                        className="h-5 w-5 mr-2"
                      />
                      Trust Wallet
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <img 
                        src="https://placehold.co/30x30/9945ff/ffffff.png?text=PH"
                        alt="Phantom" 
                        className="h-5 w-5 mr-2"
                      />
                      Phantom Wallet
                    </Button>
                    <Button variant="outline" className="justify-start">
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
                    <Input id="recoveryPhrase" placeholder="Enter recovery phrase" />
                    <p className="text-xs text-muted-foreground">
                      Enter your 12, 18, or 24-word recovery phrase
                    </p>
                  </div>
                  
                  <Button className="w-full">
                    Connect Wallet
                  </Button>
                </div>
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
