
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getActiveWallet } from "@/services/walletService";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface CashOutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  balance: string;
  tokenSymbol: string;
}

export function CashOutModal({ open, onOpenChange, balance, tokenSymbol }: CashOutModalProps) {
  const [amount, setAmount] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    const activeWallet = getActiveWallet();
    if (activeWallet) {
      const userProfileKey = 'user-profile-' + activeWallet.id;
      const userProfileData = localStorage.getItem(userProfileKey);
      
      if (userProfileData) {
        const userData = JSON.parse(userProfileData);
        setIsVerified(userData.isVerified || false);
      }
    }
  }, [open]);
  
  const handleCashOut = () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (parseFloat(amount) > parseFloat(balance.replace(/,/g, ''))) {
      toast.error("Insufficient balance");
      return;
    }
    
    if (!bankAccount) {
      toast.error("Please enter bank account details");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      toast.success(`Successfully initiated cash out of ${amount} ${tokenSymbol}`);
      setIsProcessing(false);
      setAmount("");
      setBankAccount("");
      onOpenChange(false);
    }, 1500);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cash Out</DialogTitle>
          <DialogDescription>
            Convert your {tokenSymbol} to real money in your bank account.
          </DialogDescription>
        </DialogHeader>
        
        {!isVerified ? (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
            <h4 className="font-medium mb-1">Identity Verification Required</h4>
            <p className="text-sm">
              You need to complete identity verification before you can cash out. 
              Please go to Settings and upload your ID card and proof of address.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount ({tokenSymbol})</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Available balance: {balance} {tokenSymbol}
              </p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="bank-account">Bank Account Details</Label>
              <Input
                id="bank-account"
                placeholder="Enter bank account details"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
              />
            </div>
            
            <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-lg text-sm">
              Cash out transactions typically take 1-3 business days to process.
              A processing fee of 1% will be applied.
            </div>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleCashOut} 
            disabled={!isVerified || isProcessing}
          >
            {isProcessing ? "Processing..." : "Cash Out"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
