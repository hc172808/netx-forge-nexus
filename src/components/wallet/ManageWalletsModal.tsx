
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash, Check, X, Copy, Eye, EyeOff, Download, Lock } from "lucide-react";
import { useState } from "react";
import { Wallet, updateWallet, deleteWallet, encryptData, getWallets } from "@/services/walletService";
import { useToast } from "@/hooks/use-toast";

interface ManageWalletsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWalletSelect?: (walletId: string) => void;
  wallets: Wallet[];
  activeWalletId?: string;
}

export function ManageWalletsModal({ 
  open, 
  onOpenChange, 
  onWalletSelect,
  wallets,
  activeWalletId
}: ManageWalletsModalProps) {
  const [editingWallet, setEditingWallet] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [showAddresses, setShowAddresses] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  
  const handleEdit = (walletId: string, currentName: string) => {
    setEditingWallet(walletId);
    setEditName(currentName);
  };
  
  const handleCancelEdit = () => {
    setEditingWallet(null);
    setEditName("");
  };
  
  const handleSaveEdit = (walletId: string) => {
    if (editName.trim() === "") {
      toast({
        title: "Error",
        description: "Wallet name cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    // Update wallet name
    const updatedWallet = updateWallet(walletId, { name: editName });
    
    if (updatedWallet) {
      toast({
        title: "Wallet Updated",
        description: "Wallet name has been updated successfully."
      });
      
      setEditingWallet(null);
      setEditName("");
      
      // Refresh wallet list
      onWalletSelect?.(activeWalletId || "");
    } else {
      toast({
        title: "Update Failed",
        description: "Failed to update wallet name.",
        variant: "destructive"
      });
    }
  };
  
  const handleDeleteWallet = (walletId: string) => {
    // Confirm deletion
    if (!confirm("Are you sure you want to delete this wallet? This action cannot be undone.")) {
      return;
    }
    
    // Delete wallet
    const result = deleteWallet(walletId);
    
    if (result) {
      toast({
        title: "Wallet Deleted",
        description: "Wallet has been deleted successfully."
      });
      
      // Refresh wallet list and select a new wallet if needed
      const updatedWallets = getWallets();
      if (updatedWallets.length > 0 && walletId === activeWalletId) {
        onWalletSelect?.(updatedWallets[0].id);
      } else {
        onWalletSelect?.("");
      }
    } else {
      toast({
        title: "Deletion Failed",
        description: "Failed to delete wallet.",
        variant: "destructive"
      });
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Address copied to clipboard."
    });
  };
  
  const toggleAddressVisibility = (walletId: string) => {
    setShowAddresses(prev => ({
      ...prev,
      [walletId]: !prev[walletId]
    }));
  };
  
  const selectWallet = (walletId: string) => {
    onWalletSelect?.(walletId);
    onOpenChange(false);
  };
  
  const formatAddress = (address: string, walletId: string) => {
    if (!showAddresses[walletId]) {
      return address.substring(0, 6) + "..." + address.substring(address.length - 4);
    }
    return address;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Manage Wallets</DialogTitle>
          <DialogDescription>
            View and manage your NETX wallets
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          {wallets.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No wallets found. Create a new wallet to get started.</p>
            </div>
          ) : (
            <div className="rounded-md border overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wallets.map((wallet) => (
                    <TableRow key={wallet.id} className={wallet.id === activeWalletId ? "bg-muted/20" : ""}>
                      <TableCell>
                        {editingWallet === wallet.id ? (
                          <div className="flex items-center gap-2">
                            <Input 
                              value={editName} 
                              onChange={(e) => setEditName(e.target.value)} 
                              className="h-8"
                            />
                            <div className="flex gap-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-7 w-7" 
                                onClick={() => handleSaveEdit(wallet.id)}
                              >
                                <Check className="h-4 w-4 text-green-500" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-7 w-7" 
                                onClick={handleCancelEdit}
                              >
                                <X className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button
                            variant="link"
                            className="p-0 h-auto font-medium"
                            onClick={() => selectWallet(wallet.id)}
                          >
                            {wallet.name}
                            {wallet.id === activeWalletId && (
                              <span className="ml-2 text-xs text-muted-foreground">(Active)</span>
                            )}
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="capitalize">{wallet.walletType.replace('-', ' ')}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <code className="text-xs">
                            {formatAddress(wallet.address, wallet.id)}
                          </code>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7" 
                            onClick={() => toggleAddressVisibility(wallet.id)}
                          >
                            {showAddresses[wallet.id] ? (
                              <EyeOff className="h-3 w-3" />
                            ) : (
                              <Eye className="h-3 w-3" />
                            )}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7" 
                            onClick={() => copyToClipboard(wallet.address)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(wallet.dateCreated).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {wallet.isAdmin ? (
                          <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
                            <Lock className="mr-1 h-3 w-3" />
                            Admin
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">User</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleEdit(wallet.id, wallet.name)}
                            disabled={editingWallet !== null}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleDeleteWallet(wallet.id)}
                            disabled={editingWallet !== null}
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
