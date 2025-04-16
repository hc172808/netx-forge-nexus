
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Box, ExternalLink } from "lucide-react";

interface BlocksViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BlocksViewModal({ open, onOpenChange }: BlocksViewModalProps) {
  // Mock blockchain data
  const latestBlocks = [
    { id: "1258741", time: "2 mins ago", transactions: 24, miner: "0x1a2b...7z8y", size: "45.2 KB" },
    { id: "1258740", time: "5 mins ago", transactions: 18, miner: "0x3c4d...9z8y", size: "38.7 KB" },
    { id: "1258739", time: "7 mins ago", transactions: 32, miner: "0x5e6f...1a2b", size: "51.4 KB" },
    { id: "1258738", time: "10 mins ago", transactions: 12, miner: "0x7g8h...3c4d", size: "29.5 KB" },
    { id: "1258737", time: "15 mins ago", transactions: 27, miner: "0x9i0j...5e6f", size: "43.8 KB" },
    { id: "1258736", time: "18 mins ago", transactions: 15, miner: "0x1a2b...7z8y", size: "32.1 KB" },
    { id: "1258735", time: "22 mins ago", transactions: 20, miner: "0x3c4d...9z8y", size: "39.6 KB" },
    { id: "1258734", time: "25 mins ago", transactions: 8, miner: "0x5e6f...1a2b", size: "21.3 KB" },
    { id: "1258733", time: "30 mins ago", transactions: 16, miner: "0x7g8h...3c4d", size: "33.9 KB" },
    { id: "1258732", time: "35 mins ago", transactions: 23, miner: "0x9i0j...5e6f", size: "42.7 KB" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Latest Blocks</DialogTitle>
          <DialogDescription>
            Recently mined blocks on the NETX blockchain
          </DialogDescription>
        </DialogHeader>
        
        <div className="rounded-md border mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Block</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Txns</TableHead>
                <TableHead>Miner</TableHead>
                <TableHead>Size</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {latestBlocks.map((block, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Box className="h-4 w-4 text-primary" />
                      {block.id}
                    </div>
                  </TableCell>
                  <TableCell>{block.time}</TableCell>
                  <TableCell>{block.transactions}</TableCell>
                  <TableCell>{block.miner}</TableCell>
                  <TableCell>{block.size}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
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
          <Button onClick={() => window.location.href = "/explorer"}>
            Go to Explorer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
