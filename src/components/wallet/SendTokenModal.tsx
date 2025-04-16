
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface SendTokenModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableBalance: string;
  tokenSymbol: string;
  onSend: (address: string, amount: string) => void;
}

export function SendTokenModal({
  open,
  onOpenChange,
  availableBalance,
  tokenSymbol,
  onSend,
}: SendTokenModalProps) {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSend = () => {
    if (!recipientAddress) {
      setError("Recipient address is required");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (parseFloat(amount) > parseFloat(availableBalance)) {
      setError("Insufficient balance");
      return;
    }

    onSend(recipientAddress, amount);
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setRecipientAddress("");
    setAmount("");
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send {tokenSymbol}</DialogTitle>
          <DialogDescription>
            Transfer {tokenSymbol} tokens to another wallet address.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input
              id="recipient"
              placeholder="Enter wallet address"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex justify-between">
              <Label htmlFor="amount">Amount</Label>
              <span className="text-xs text-muted-foreground">
                Available: {availableBalance} {tokenSymbol}
              </span>
            </div>
            <div className="flex gap-2">
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setAmount(availableBalance)}
                className="whitespace-nowrap"
              >
                Max
              </Button>
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSend}>Send Tokens</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
