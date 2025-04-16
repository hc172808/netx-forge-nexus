
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Activity, ArrowRight, Check, CheckCheck, KeyRound, LogIn, Mail, ShieldCheck, User, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-4">
        <div className="flex flex-col items-center mb-6 text-center">
          <Activity className="h-10 w-10 text-primary mb-2" />
          <h1 className="text-2xl font-bold">NETX Forge Nexus</h1>
          <p className="text-muted-foreground">Create your account to get started</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Register a new account</CardTitle>
            <CardDescription>
              Fill out the form below to create your NETX Forge account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="johndoe" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Create a strong password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm your password" />
              </div>
              
              <div className="bg-secondary/10 rounded-lg p-3 space-y-3">
                <div className="text-sm font-medium">Password Requirements:</div>
                <div className="space-y-2 text-xs">
                  {[
                    { check: true, text: "At least 8 characters" },
                    { check: true, text: "At least one uppercase letter" },
                    { check: false, text: "At least one number" },
                    { check: false, text: "At least one special character" }
                  ].map((req, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {req.check ? (
                        <Check className="h-3.5 w-3.5 text-green-500" />
                      ) : (
                        <Check className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                      <span className={req.check ? "text-green-500" : "text-muted-foreground"}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-start space-x-2 pt-2">
                <Checkbox id="terms" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the Terms of Service and Privacy Policy
                  </label>
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
          <Separator />
          <CardFooter className="flex flex-col p-6 gap-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">
                <Wallet className="mr-2 h-4 w-4" />
                Wallet
              </Button>
              <Button variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground text-center mt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
        
        <div className="mt-8 text-center space-y-4">
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <ShieldCheck className="h-4 w-4 mr-1.5 text-green-500" />
              Secure
            </div>
            <div className="flex items-center">
              <CheckCheck className="h-4 w-4 mr-1.5 text-green-500" />
              Trusted
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1.5 text-green-500" />
              5k+ Users
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
