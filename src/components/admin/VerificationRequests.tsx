
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { FileCheck, FileText, Shield, UserCheck, UserCog, X } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface VerificationRequest {
  userId: string;
  name: string;
  email: string;
  idCardUploaded: boolean;
  proofOfAddressUploaded: boolean;
  isVerified: boolean;
  submittedAt: string;
  avatarUrl: string;
}

export function VerificationRequests() {
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  
  useEffect(() => {
    // In a real app, this would be an API call
    // For this demo, we'll gather data from localStorage
    const pendingRequests: VerificationRequest[] = [];
    
    // Get all keys from localStorage that start with "user-profile-"
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('user-profile-')) {
        const userData = JSON.parse(localStorage.getItem(key) || '{}');
        
        // Only add users who have uploaded documents but aren't verified yet
        if (userData.idCardUploaded && userData.proofOfAddressUploaded && !userData.isVerified) {
          pendingRequests.push({
            userId: userData.id,
            name: `${userData.firstName} ${userData.lastName}`,
            email: userData.email,
            idCardUploaded: userData.idCardUploaded,
            proofOfAddressUploaded: userData.proofOfAddressUploaded,
            isVerified: userData.isVerified,
            submittedAt: new Date().toISOString(),
            avatarUrl: `https://placehold.co/150x150/4c54e8/ffffff.png?text=${userData.firstName[0]}${userData.lastName[0]}`
          });
        }
      }
    });
    
    setRequests(pendingRequests);
  }, []);
  
  const approveRequest = (userId: string) => {
    const userProfileKey = 'user-profile-' + userId;
    const userProfileData = localStorage.getItem(userProfileKey);
    
    if (userProfileData) {
      const userData = JSON.parse(userProfileData);
      userData.isVerified = true;
      
      localStorage.setItem(userProfileKey, JSON.stringify(userData));
      
      // Update local state
      setRequests(prevRequests => 
        prevRequests.filter(request => request.userId !== userId)
      );
      
      toast.success("User has been verified successfully");
    }
  };
  
  const rejectRequest = (userId: string) => {
    const userProfileKey = 'user-profile-' + userId;
    const userProfileData = localStorage.getItem(userProfileKey);
    
    if (userProfileData) {
      const userData = JSON.parse(userProfileData);
      userData.idCardUploaded = false;
      userData.proofOfAddressUploaded = false;
      
      localStorage.setItem(userProfileKey, JSON.stringify(userData));
      
      // Update local state
      setRequests(prevRequests => 
        prevRequests.filter(request => request.userId !== userId)
      );
      
      toast.info("Verification request has been rejected");
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Verification Requests
        </CardTitle>
        <CardDescription>
          Review and approve user identity verification documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        {requests.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No pending verification requests
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.userId}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <img src={request.avatarUrl} alt={request.name} />
                        </Avatar>
                        <div>
                          <div className="font-medium">{request.name}</div>
                          <div className="text-sm text-muted-foreground">{request.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-sm">
                          <FileText className="h-4 w-4 text-blue-500" />
                          ID Card
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <FileText className="h-4 w-4 text-green-500" />
                          Proof of Address
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(request.submittedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-green-500 border-green-500 hover:bg-green-50"
                          onClick={() => approveRequest(request.userId)}
                        >
                          <UserCheck className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-destructive border-destructive hover:bg-red-50"
                          onClick={() => rejectRequest(request.userId)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
