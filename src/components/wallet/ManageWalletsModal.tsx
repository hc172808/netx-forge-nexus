
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Star, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WalletItem {
  id: string;
  name: string;
  address: string;
  isPrimary: boolean;
}

interface ManageWalletsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ManageWalletsModal({ open, onOpenChange }: ManageWalletsModalProps) {
  const { toast } = useToast();
  
  // Mock data - in a real app this would come from an API or context
  const [wallets, setWallets] = useState<WalletItem[]>([
    {
      id: "1",
      name: "Primary Wallet",
      address: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
      isPrimary: true,
    },
    {
      id: "2",
      name: "Secondary Wallet",
      address: "0x9s8r7q6p5o4n3m2l1k0j9i8h7g6f5e4d3c2b1a0",
      isPrimary: false,
    },
    {
      id: "3",
      name: "Cold Storage",
      address: "0xa0b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9",
      isPrimary: false,
    },
  ]);

  const setPrimaryWallet = (id: string) => {
    setWallets(wallets.map(wallet => ({
      ...wallet,
      isPrimary: wallet.id === id
    })));
    
    toast({
      title: "Primary Wallet Updated",
      description: "Your default wallet has been changed.",
    });
  };

  const deleteWallet = (id: string) => {
    // Don't allow deleting the primary wallet
    if (wallets.find(w => w.id === id)?.isPrimary) {
      toast({
        title: "Cannot Delete Primary Wallet",
        description: "Please select a different wallet as primary first.",
        variant: "destructive",
      });
      return;
    }
    
    setWallets(wallets.filter(wallet => wallet.id !== id));
    
    toast({
      title: "Wallet Removed",
      description: "The wallet has been removed from your account.",
    });
  };

  const formatAddress = (address: string) => {
    return address.substring(0, 6) + "..." + address.substring(address.length - 4);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Manage Wallets</DialogTitle>
          <DialogDescription>
            View and manage all your connected wallets
          </DialogDescription>
        </DialogHeader>
        
        <div className="rounded-md border mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Wallet Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wallets.map((wallet) => (
                <TableRow key={wallet.id}>
                  <TableCell className="font-medium">{wallet.name}</TableCell>
                  <TableCell>{formatAddress(wallet.address)}</TableCell>
                  <TableCell>
                    {wallet.isPrimary ? (
                      <Badge variant="default">Primary</Badge>
                    ) : (
                      <Badge variant="outline">Secondary</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {!wallet.isPrimary && (
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => setPrimaryWallet(wallet.id)}
                          title="Set as Primary"
                        >
                          <Star className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="icon"
                        title="Edit Wallet Name"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {!wallet.isPrimary && (
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => deleteWallet(wallet.id)}
                          title="Remove Wallet"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
