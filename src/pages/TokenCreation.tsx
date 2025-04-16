
import { TokenCreationForm, TokenFormData } from "@/components/token/TokenCreationForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function TokenCreation() {
  const [creationStatus, setCreationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [createdToken, setCreatedToken] = useState<TokenFormData | null>(null);
  
  const handleTokenCreation = (tokenData: TokenFormData) => {
    console.log("Creating token:", tokenData);
    // In a real app, this would call a blockchain contract
    
    // Simulate success
    setTimeout(() => {
      setCreationStatus('success');
      setCreatedToken(tokenData);
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Token Creation</h1>
      </div>
      
      <Tabs defaultValue="create" className="space-y-6">
        <TabsList>
          <TabsTrigger value="create">Create Token</TabsTrigger>
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
          
          <TokenCreationForm onSubmit={handleTokenCreation} />
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
                <h3 className="text-lg font-medium mb-2">3. Set Token Properties</h3>
                <p className="text-muted-foreground">
                  Configure whether your token is mintable, mutable, and if it has update or freeze authority.
                </p>
                <ul className="list-disc ml-6 mt-2 text-muted-foreground">
                  <li>Mintable: Allows creation of additional tokens after initial supply</li>
                  <li>Mutable: Allows metadata changes after creation</li>
                  <li>Update Authority: Allows updating token details</li>
                  <li>Freeze Authority: Allows freezing token accounts</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">4. Liquidity Requirements</h3>
                <p className="text-muted-foreground">
                  Choose to either reserve 5% (or more) of tokens for the creator or burn 99% of the supply.
                  This is required to ensure token quality and prevent spam.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">5. Create Your Token</h3>
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
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
