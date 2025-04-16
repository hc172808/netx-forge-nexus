
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface TokenCreationFormProps {
  onSubmit: (tokenData: TokenFormData) => void;
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
}

export function TokenCreationForm({ onSubmit }: TokenCreationFormProps) {
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
  });
  
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: keyof TokenFormData) => (checked: boolean) => {
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Token</CardTitle>
        <CardDescription>
          Configure your token settings. All tokens must link to a coin with liquidity.
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
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Token Properties</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isMintable" className="cursor-pointer">Mintable</Label>
                    <Switch 
                      id="isMintable" 
                      checked={formData.isMintable} 
                      onCheckedChange={handleSwitchChange("isMintable")} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isMutable" className="cursor-pointer">Mutable</Label>
                    <Switch 
                      id="isMutable" 
                      checked={formData.isMutable} 
                      onCheckedChange={handleSwitchChange("isMutable")} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="hasUpdateAuthority" className="cursor-pointer">Update Authority</Label>
                    <Switch 
                      id="hasUpdateAuthority" 
                      checked={formData.hasUpdateAuthority} 
                      onCheckedChange={handleSwitchChange("hasUpdateAuthority")} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="hasFreezeAuthority" className="cursor-pointer">Freeze Authority</Label>
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
          
          <Button type="submit" className="w-full">Create Token</Button>
        </form>
      </CardContent>
    </Card>
  );
}
