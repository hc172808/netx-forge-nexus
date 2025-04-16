
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown, Eye, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";

export interface Token {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
}

interface TokenListProps {
  tokens: Token[];
  onTokenSelect: (token: Token) => void;
}

export function TokenList({ tokens, onTokenSelect }: TokenListProps) {
  const [sortField, setSortField] = useState<keyof Token>("marketCap");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  const handleSort = (field: keyof Token) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };
  
  const sortedTokens = [...tokens].sort((a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];
    
    if (typeof fieldA === "number" && typeof fieldB === "number") {
      return sortDirection === "asc" ? fieldA - fieldB : fieldB - fieldA;
    }
    
    if (typeof fieldA === "string" && typeof fieldB === "string") {
      return sortDirection === "asc" 
        ? fieldA.localeCompare(fieldB) 
        : fieldB.localeCompare(fieldA);
    }
    
    return 0;
  });
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: price < 1 ? 4 : 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    }).format(price);
  };
  
  const formatNumber = (number: number) => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(number);
  };
  
  const formatPercentage = (percentage: number) => {
    return `${percentage >= 0 ? "+" : ""}${percentage.toFixed(2)}%`;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Token Marketplace</CardTitle>
        <CardDescription>
          Browse, buy and sell tokens on the NETX platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort("name")}
                    className="flex items-center gap-1 px-0 font-medium"
                  >
                    Token
                    <ArrowUpDown size={14} />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort("price")}
                    className="flex items-center gap-1 px-0 font-medium"
                  >
                    Price
                    <ArrowUpDown size={14} />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort("change24h")}
                    className="flex items-center gap-1 px-0 font-medium"
                  >
                    24h Change
                    <ArrowUpDown size={14} />
                  </Button>
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort("marketCap")}
                    className="flex items-center gap-1 px-0 font-medium"
                  >
                    Market Cap
                    <ArrowUpDown size={14} />
                  </Button>
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort("volume24h")}
                    className="flex items-center gap-1 px-0 font-medium"
                  >
                    Volume (24h)
                    <ArrowUpDown size={14} />
                  </Button>
                </TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTokens.map((token, index) => (
                <TableRow key={token.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <img src={token.logo} alt={token.name} />
                      </Avatar>
                      <div>
                        <div className="font-medium">{token.name}</div>
                        <div className="text-xs text-muted-foreground">{token.symbol}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{formatPrice(token.price)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Badge 
                        variant={token.change24h >= 0 ? "outline" : "destructive"} 
                        className={token.change24h >= 0 ? "text-green-500 border-green-200 bg-green-50" : ""}
                      >
                        <span className="flex items-center gap-1">
                          {token.change24h >= 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {formatPercentage(token.change24h)}
                        </span>
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatNumber(token.marketCap)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatNumber(token.volume24h)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onTokenSelect(token)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
