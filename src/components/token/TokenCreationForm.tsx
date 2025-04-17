
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

interface TokenCreationFormProps {
  onSubmit: (tokenData: TokenFormData) => void;
  editToken?: TokenFormData; // Optional prop for editing existing token
}

export interface TokenFormData {
  name: string;
  symbol: string;
  initialSupply: string;
  description: string;
  logo: File | null;
  isMintable: boolean;
  isMutable: boolean;
  hasUpdateAuthority: boolean;
  hasFreezeAuthority: boolean;
  distributionType: "percentage" | "burn";
  liquidityPercentage: string;
  linkedCoin?: string; // New field for linking to a coin with liquidity
}

// Sample liquidity coins data
const availableLiquidityCoins = [
  { id: "netx", name: "NETX", liquidity: "High" },
  { id: "eth", name: "Ethereum", liquidity: "High" },
  { id: "btc", name: "Bitcoin", liquidity: "High" },
  { id: "usdt", name: "Tether", liquidity: "Medium" },
  { id: "bnb", name: "Binance Coin", liquidity: "Medium" }
];

// Paid feature prices (would normally come from a backend)
const featurePrices = {
  mintable: 50,
  mutable: 30,
  updateAuthority: 25,
  freezeAuthority: 40,
  tokenCreation: 100,
  sending: 5,
  trading: 10
};

export function TokenCreationForm({ onSubmit, editToken }: TokenCreationFormProps) {
  const [formData, setFormData] = useState<TokenFormData>({
    name: "",
    symbol: "",
    initialSupply: "",
    description: "",
    logo: null,
    isMintable: false,
    isMutable: false,
    hasUpdateAuthority: false,
    hasFreezeAuthority: false,
    distributionType: "percentage",
    liquidityPercentage: "5",
    linkedCoin: "netx", // Default to NETX
  });
  
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(!!editToken);
  const [totalCost, setTotalCost] = useState<number>(0);
  
  // If editToken is provided, populate the form
  useEffect(() => {
    if (editToken) {
      setFormData(editToken);
      setIsEditing(true);
      
      // If we have a logo file and it's a file object, create preview
      if (editToken.logo && editToken.logo instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoPreview(reader.result as string);
        };
        reader.readAsDataURL(editToken.logo);
      }
    }
  }, [editToken]);
  
  // Calculate total cost based on selected paid features
  useEffect(() => {
    let cost = isEditing ? 0 : featurePrices.tokenCreation;
    if (formData.isMintable) cost += featurePrices.mintable;
    if (formData.isMutable) cost += featurePrices.mutable;
    if (formData.hasUpdateAuthority) cost += featurePrices.updateAuthority;
    if (formData.hasFreezeAuthority) cost += featurePrices.freezeAuthority;
    setTotalCost(cost);
  }, [formData, isEditing]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: keyof TokenFormData) => (checked: boolean) => {
    // Show a prompt if enabling a paid feature
    if (checked && 
        (name === 'isMintable' || name === 'isMutable' || 
         name === 'hasUpdateAuthority' || name === 'hasFreezeAuthority')) {
      const featurePrice = 
        name === 'isMintable' ? featurePrices.mintable :
        name === 'isMutable' ? featurePrices.mutable :
        name === 'hasUpdateAuthority' ? featurePrices.updateAuthority :
        featurePrices.freezeAuthority;
      
      toast(`Enabling ${name} will cost ${featurePrice} NETX`, {
        description: "This will be charged when you submit the form"
      });
    }
    
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };
  
  const handleDistributionTypeChange = (value: string) => {
    setFormData((prev) => ({ 
      ...prev, 
      distributionType: value as "percentage" | "burn" 
    }));
  };
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData((prev) => ({ ...prev, logo: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleLinkedCoinChange = (value: string) => {
    setFormData((prev) => ({ ...prev, linkedCoin: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.linkedCoin) {
      toast.error("You must link your token to a coin with liquidity");
      return;
    }
    
    // Cost confirmation
    if (totalCost > 0) {
      if (!window.confirm(`This will cost ${totalCost} NETX. Do you want to proceed?`)) {
        return;
      }
    }
    
    onSubmit(formData);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Token" : "Create New Token"}</CardTitle>
        <CardDescription>
          Configure your token settings. All tokens must link to a coin with liquidity.
          {!isEditing && (
            <div className="flex items-center space-x-2 mt-2 text-amber-600 dark:text-amber-400">
              <AlertCircle className="h-4 w-4" />
              <span>Token creation base fee: {featurePrices.tokenCreation} NETX</span>
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Token Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="e.g. My Token" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="symbol">Token Symbol</Label>
                <Input 
                  id="symbol" 
                  name="symbol" 
                  placeholder="e.g. MTK" 
                  value={formData.symbol} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="initialSupply">Initial Supply</Label>
                <Input 
                  id="initialSupply" 
                  name="initialSupply" 
                  type="number" 
                  placeholder="e.g. 1000000" 
                  value={formData.initialSupply} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  placeholder="Describe your token's purpose" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>

              <div>
                <Label htmlFor="linkedCoin">Link to Liquidity Coin (Required)</Label>
                <Select 
                  value={formData.linkedCoin}
                  onValueChange={handleLinkedCoinChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a coin to link" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableLiquidityCoins.map((coin) => (
                      <SelectItem key={coin.id} value={coin.id}>
                        {coin.name} - {coin.liquidity} Liquidity
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Your token must link to a coin with sufficient liquidity for trading.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="logo">Token Logo (Required)</Label>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 border-2 border-dashed border-border rounded-full flex items-center justify-center overflow-hidden">
                    {logoPreview ? (
                      <img 
                        src={logoPreview} 
                        alt="Token logo preview" 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <span className="text-muted-foreground text-xs text-center">Upload Logo</span>
                    )}
                  </div>
                  <Input 
                    id="logo" 
                    name="logo" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleLogoChange}
                    required={!isEditing || !formData.logo}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Token Properties (Paid Features)</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="isMintable" className="cursor-pointer">Mintable</Label>
                      <span className="text-xs text-amber-600 dark:text-amber-400">(+{featurePrices.mintable} NETX)</span>
                    </div>
                    <Switch 
                      id="isMintable" 
                      checked={formData.isMintable} 
                      onCheckedChange={handleSwitchChange("isMintable")} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="isMutable" className="cursor-pointer">Mutable</Label>
                      <span className="text-xs text-amber-600 dark:text-amber-400">(+{featurePrices.mutable} NETX)</span>
                    </div>
                    <Switch 
                      id="isMutable" 
                      checked={formData.isMutable} 
                      onCheckedChange={handleSwitchChange("isMutable")} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="hasUpdateAuthority" className="cursor-pointer">Update Authority</Label>
                      <span className="text-xs text-amber-600 dark:text-amber-400">(+{featurePrices.updateAuthority} NETX)</span>
                    </div>
                    <Switch 
                      id="hasUpdateAuthority" 
                      checked={formData.hasUpdateAuthority} 
                      onCheckedChange={handleSwitchChange("hasUpdateAuthority")} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="hasFreezeAuthority" className="cursor-pointer">Freeze Authority</Label>
                      <span className="text-xs text-amber-600 dark:text-amber-400">(+{featurePrices.freezeAuthority} NETX)</span>
                    </div>
                    <Switch 
                      id="hasFreezeAuthority" 
                      checked={formData.hasFreezeAuthority} 
                      onCheckedChange={handleSwitchChange("hasFreezeAuthority")} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <Label className="mb-2 block">Liquidity Requirement</Label>
            <RadioGroup 
              value={formData.distributionType} 
              onValueChange={handleDistributionTypeChange}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="percentage" id="percentage" />
                <Label htmlFor="percentage">
                  Reserve 5% of tokens for creator (minimum requirement)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="burn" id="burn" />
                <Label htmlFor="burn">
                  Burn 99% of tokens (alternative requirement)
                </Label>
              </div>
            </RadioGroup>
            
            {formData.distributionType === "percentage" && (
              <div className="mt-4">
                <Label htmlFor="liquidityPercentage">Creator Percentage (minimum 5%)</Label>
                <Input 
                  id="liquidityPercentage" 
                  name="liquidityPercentage" 
                  type="number" 
                  placeholder="5" 
                  min="5"
                  value={formData.liquidityPercentage} 
                  onChange={handleInputChange} 
                />
              </div>
            )}
            
            <p className="text-xs text-muted-foreground mt-2">
              Note: Tokens must meet 100,000 market cap and the creator must have 5% of tokens or 
              burn 99% before it can be tradable.
            </p>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex justify-between py-2 border-t">
              <span className="font-semibold">Total Cost:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">{totalCost} NETX</span>
            </div>
            <Button type="submit" className="w-full">
              {isEditing ? "Save Changes" : "Create Token"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
