
import { TokenCreationForm, TokenFormData } from "@/components/token/TokenCreationForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle2, Edit, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { isUserAdmin } from "@/services/walletService";

// Sample list of user tokens
const sampleUserTokens: TokenFormData[] = [
  { 
    name: "NETX Governance", 
    symbol: "NXTG", 
    initialSupply: "10000000", 
    description: "Governance token for the NETX ecosystem",
    logo: null, 
    isMintable: true, 
    isMutable: true, 
    hasUpdateAuthority: true, 
    hasFreezeAuthority: false, 
    distributionType: "percentage", 
    liquidityPercentage: "10",
    linkedCoin: "netx" 
  },
  { 
    name: "NETX Exchange", 
    symbol: "NXTX", 
    initialSupply: "5000000", 
    description: "Utility token for the NETX exchange",
    logo: null, 
    isMintable: true, 
    isMutable: false, 
    hasUpdateAuthority: true, 
    hasFreezeAuthority: true, 
    distributionType: "percentage", 
    liquidityPercentage: "15",
    linkedCoin: "eth" 
  }
];

export default function TokenCreation() {
  const [creationStatus, setCreationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [createdToken, setCreatedToken] = useState<TokenFormData | null>(null);
  const [userTokens, setUserTokens] = useState<TokenFormData[]>(sampleUserTokens);
  const [currentTab, setCurrentTab] = useState("create");
  const [editingToken, setEditingToken] = useState<TokenFormData | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Check if the user is admin
  useEffect(() => {
    setIsAdmin(isUserAdmin());
  }, []);
  
  const handleTokenCreation = (tokenData: TokenFormData) => {
    console.log("Token data:", tokenData);
    
    // If linkedCoin is not provided, show an error
    if (!tokenData.linkedCoin) {
      toast.error("You must link your token to a coin with liquidity");
      setCreationStatus('error');
      return;
    }
    
    // Check if we're editing an existing token
    if (editingToken) {
      // Update the token in the list
      setUserTokens(userTokens.map(token => 
        token.symbol === editingToken.symbol ? tokenData : token
      ));
      toast.success(`Token ${tokenData.symbol} updated successfully`);
      setEditingToken(null);
    } else {
      // Add the new token to the list
      setUserTokens([...userTokens, tokenData]);
      toast.success(`Token ${tokenData.symbol} created successfully`);
    }
    
    // Show success message
    setCreationStatus('success');
    setCreatedToken(tokenData);
    
    // Reset form after a delay
    setTimeout(() => {
      setCreationStatus('idle');
      setCreatedToken(null);
      setCurrentTab("my-tokens");
    }, 2000);
  };
  
  const handleEditToken = (token: TokenFormData) => {
    setEditingToken(token);
    setCurrentTab("create");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Token Creation</h1>
        {isAdmin && (
          <div className="text-sm font-medium text-green-600 flex items-center bg-green-50 px-3 py-1 rounded-full">
            <CheckCircle2 className="w-4 h-4 mr-1" /> Admin: You can set token creation fees
          </div>
        )}
      </div>
      
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="create">
            {editingToken ? "Edit Token" : "Create Token"}
          </TabsTrigger>
          <TabsTrigger value="my-tokens">My Tokens</TabsTrigger>
          <TabsTrigger value="guide">Creation Guide</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create" className="space-y-6">
          {creationStatus === 'success' && (
            <Alert variant="default" className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <AlertTitle className="text-green-800">Token Created Successfully</AlertTitle>
              <AlertDescription className="text-green-700">
                Your {createdToken?.name} ({createdToken?.symbol}) token has been created and will be available for trading once it meets the market cap requirements.
              </AlertDescription>
            </Alert>
          )}
          
          {creationStatus === 'error' && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Creation Failed</AlertTitle>
              <AlertDescription>
                There was an error creating your token. Please try again or contact support.
              </AlertDescription>
            </Alert>
          )}
          
          <TokenCreationForm 
            onSubmit={handleTokenCreation} 
            editToken={editingToken}
          />
        </TabsContent>
        
        <TabsContent value="my-tokens" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">My Tokens</h2>
            <Button onClick={() => { 
              setEditingToken(null);
              setCurrentTab("create");
            }} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Create New Token
            </Button>
          </div>
          
          {userTokens.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">You haven't created any tokens yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userTokens.map((token, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{token.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{token.symbol}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditToken(token)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </div>
                    
                    <div className="space-y-2 mt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Supply</span>
                        <span>{token.initialSupply}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Linked to</span>
                        <span className="font-medium">{token.linkedCoin?.toUpperCase() || "None"}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Creator Reserve</span>
                        <span>{token.distributionType === "percentage" ? `${token.liquidityPercentage}%` : "Burn 99%"}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Features</span>
                        <span className="text-right">
                          {token.isMintable ? "Mintable" : ""}
                          {token.isMutable ? (token.isMintable ? ", Mutable" : "Mutable") : ""}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="guide" className="space-y-6">
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Token Creation Guide</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">1. Configure Your Token</h3>
                <p className="text-muted-foreground">
                  Choose a unique name and symbol for your token. Provide a detailed description explaining its purpose and utility.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">2. Upload a Logo</h3>
                <p className="text-muted-foreground">
                  All tokens must have a logo. Upload a high-quality square image (recommended size: 512x512px).
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">3. Link to a Liquidity Coin</h3>
                <p className="text-muted-foreground">
                  Select a coin with sufficient liquidity to link your token with. This is required for trading on the marketplace.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">4. Set Token Properties</h3>
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    Configure whether your token is mintable, mutable, and if it has update or freeze authority.
                  </p>
                  <ul className="list-disc ml-6 mt-2 text-muted-foreground">
                    <li>Mintable: Allows creation of additional tokens after initial supply (Fee: 10 NETX)</li>
                    <li>Mutable: Allows metadata changes after creation (Fee: 8 NETX)</li>
                    <li>Update Authority: Allows updating token details (Fee: 5 NETX)</li>
                    <li>Freeze Authority: Allows freezing token accounts (Fee: 12 NETX)</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">5. Liquidity Requirements</h3>
                <p className="text-muted-foreground">
                  Choose to either reserve 5% (or more) of tokens for the creator or burn 99% of the supply.
                  This is required to ensure token quality and prevent spam.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">6. Create Your Token</h3>
                <p className="text-muted-foreground">
                  Review your settings and create the token. Once created, tokens cannot be fully deleted from the blockchain.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="requirements" className="space-y-6">
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Token Requirements</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Market Cap Requirements</h3>
                <p className="text-muted-foreground">
                  To be tradable on the marketplace, tokens must meet a minimum market cap of 100,000 NETX.
                  This ensures quality and prevents spam tokens.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Creator Ownership</h3>
                <p className="text-muted-foreground">
                  The creator must either:
                </p>
                <ul className="list-disc ml-6 mt-2 text-muted-foreground">
                  <li>Hold a minimum of 5% of the total token supply, or</li>
                  <li>Burn 99% of the token supply before it can be tradable</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Logo Requirement</h3>
                <p className="text-muted-foreground">
                  All tokens must have a unique logo image. Using copied or inappropriate images is prohibited.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Liquidity Connection</h3>
                <p className="text-muted-foreground">
                  All tokens must link to a coin with sufficient liquidity. This ensures tokens can be traded efficiently.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">NETX Coin Special Status</h3>
                <p className="text-muted-foreground">
                  NETX is the native platform coin and cannot be mined. It can only be obtained through buying or trading.
                  The admin sets prices for mintable, mutable, update authority, freeze authority, minting, and burning operations.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Fee Structure</h3>
                <div className="mt-4 bg-muted/20 p-4 rounded-md">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left pb-2">Feature</th>
                        <th className="text-right pb-2">Fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Token Creation</td>
                        <td className="text-right">25 NETX</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Mintable Feature</td>
                        <td className="text-right">10 NETX</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Mutable Feature</td>
                        <td className="text-right">8 NETX</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Update Authority</td>
                        <td className="text-right">5 NETX</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Freeze Authority</td>
                        <td className="text-right">12 NETX</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Sending Tokens/Coins</td>
                        <td className="text-right">0.5 NETX</td>
                      </tr>
                      <tr>
                        <td className="py-2">Trading Fee</td>
                        <td className="text-right">0.2% of transaction</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
