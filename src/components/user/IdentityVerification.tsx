
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, FileUp, FileWarning, Shield, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import { getActiveWallet } from "@/services/walletService";
import { toast } from "sonner";

interface VerificationStatus {
  idCardUploaded: boolean;
  proofOfAddressUploaded: boolean;
  isVerified: boolean;
}

export function IdentityVerification() {
  const [status, setStatus] = useState<VerificationStatus>({
    idCardUploaded: false,
    proofOfAddressUploaded: false,
    isVerified: false
  });
  
  useEffect(() => {
    const activeWallet = getActiveWallet();
    if (activeWallet) {
      const userProfileKey = 'user-profile-' + activeWallet.id;
      const userProfileData = localStorage.getItem(userProfileKey);
      
      if (userProfileData) {
        const userData = JSON.parse(userProfileData);
        setStatus({
          idCardUploaded: userData.idCardUploaded || false,
          proofOfAddressUploaded: userData.proofOfAddressUploaded || false,
          isVerified: userData.isVerified || false
        });
      }
    }
  }, []);
  
  const handleUpload = (documentType: 'idCard' | 'proofOfAddress') => {
    // In a real app, this would open a file picker and upload to a server
    // For this demo, we'll simulate a successful upload
    
    toast.success(`${documentType === 'idCard' ? 'ID Card' : 'Proof of Address'} uploaded successfully!`);
    
    const activeWallet = getActiveWallet();
    if (activeWallet) {
      const userProfileKey = 'user-profile-' + activeWallet.id;
      const userProfileData = localStorage.getItem(userProfileKey);
      
      if (userProfileData) {
        const userData = JSON.parse(userProfileData);
        
        if (documentType === 'idCard') {
          userData.idCardUploaded = true;
        } else {
          userData.proofOfAddressUploaded = true;
        }
        
        // If both documents are uploaded, mark as pending verification
        if (userData.idCardUploaded && userData.proofOfAddressUploaded) {
          toast.info("Your documents have been submitted for verification. An admin will review them shortly.");
        }
        
        localStorage.setItem(userProfileKey, JSON.stringify(userData));
        
        setStatus({
          idCardUploaded: userData.idCardUploaded,
          proofOfAddressUploaded: userData.proofOfAddressUploaded,
          isVerified: userData.isVerified
        });
      }
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Identity Verification
        </CardTitle>
        <CardDescription>
          Verify your identity to enable cash out functionality
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 border rounded-lg">
            <div className={`p-2 rounded-full ${status.idCardUploaded ? 'bg-green-100' : 'bg-muted'}`}>
              {status.idCardUploaded ? (
                <FileCheck className="h-6 w-6 text-green-600" />
              ) : (
                <FileWarning className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-medium">ID Card or Passport</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Upload a clear image of your government-issued ID card or passport
              </p>
              <Button 
                variant={status.idCardUploaded ? "outline" : "default"} 
                size="sm"
                disabled={status.isVerified}
                onClick={() => handleUpload('idCard')}
              >
                <Upload className="h-4 w-4 mr-2" />
                {status.idCardUploaded ? "Replace Document" : "Upload Document"}
              </Button>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 border rounded-lg">
            <div className={`p-2 rounded-full ${status.proofOfAddressUploaded ? 'bg-green-100' : 'bg-muted'}`}>
              {status.proofOfAddressUploaded ? (
                <FileCheck className="h-6 w-6 text-green-600" />
              ) : (
                <FileWarning className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Proof of Address</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Upload a utility bill or bank statement from the last 3 months
              </p>
              <Button 
                variant={status.proofOfAddressUploaded ? "outline" : "default"} 
                size="sm"
                disabled={status.isVerified}
                onClick={() => handleUpload('proofOfAddress')}
              >
                <Upload className="h-4 w-4 mr-2" />
                {status.proofOfAddressUploaded ? "Replace Document" : "Upload Document"}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Verification Status</h3>
          </div>
          
          {status.isVerified ? (
            <div className="bg-green-100 text-green-800 p-2 rounded flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              Your identity has been verified. You can now use the cash out feature.
            </div>
          ) : status.idCardUploaded && status.proofOfAddressUploaded ? (
            <div className="bg-yellow-100 text-yellow-800 p-2 rounded flex items-center gap-2">
              <FileUp className="h-5 w-5" />
              Documents uploaded. Pending verification by an admin.
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Please upload both documents to complete your identity verification.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
