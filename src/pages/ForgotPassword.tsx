
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Activity, ArrowLeft, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call for password reset
    try {
      // This would be an actual API call in production
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      toast({
        title: "Reset link sent",
        description: "If an account exists with this email, you'll receive a reset link.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
            <CardTitle>{isSubmitted ? "Check Your Email" : "Reset Password"}</CardTitle>
            <CardDescription>
              {isSubmitted 
                ? "We've sent you a password reset link" 
                : "Enter your email to receive a password reset link"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="text-center py-4 space-y-4">
                <Mail className="h-12 w-12 mx-auto text-primary mb-2" />
                <p className="text-muted-foreground">
                  If an account exists with the email <span className="font-medium text-foreground">{email}</span>, you'll receive a password reset link.
                </p>
                <p className="text-sm text-muted-foreground">
                  Please check your spam folder if you don't see the email in your inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                      Sending...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </form>
            )}
          </CardContent>
          <Separator />
          <CardFooter className="flex flex-col p-6 gap-4">
            <Link 
              to="/login" 
              className="text-primary hover:underline flex items-center justify-center w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Link>
            
            <p className="text-xs text-muted-foreground text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
