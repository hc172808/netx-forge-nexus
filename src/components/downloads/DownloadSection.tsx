
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Smartphone, Server, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function DownloadSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5 text-primary" />
          Downloads
        </CardTitle>
        <CardDescription>
          Get the latest NETX apps for mobile, mining, and node operation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DownloadCard 
            title="NETX Wallet" 
            description="Secure wallet app for mobile devices" 
            icon={<Smartphone className="h-10 w-10 text-primary" />}
            androidUrl="#"
            iosUrl="#"
            version="1.0.2"
          />
          
          <DownloadCard 
            title="NETX Miner" 
            description="Start mining NETX tokens" 
            icon={<Cpu className="h-10 w-10 text-primary" />}
            windowsUrl="#"
            macUrl="#"
            linuxUrl="#"
            version="2.1.5"
          />
          
          <DownloadCard 
            title="NETX Node" 
            description="Run a full network node" 
            icon={<Server className="h-10 w-10 text-primary" />}
            windowsUrl="#"
            macUrl="#"
            linuxUrl="#"
            version="1.3.7"
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface DownloadCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  version: string;
  androidUrl?: string;
  iosUrl?: string;
  windowsUrl?: string;
  macUrl?: string;
  linuxUrl?: string;
}

function DownloadCard({ 
  title, 
  description, 
  icon, 
  version,
  androidUrl,
  iosUrl,
  windowsUrl,
  macUrl,
  linuxUrl
}: DownloadCardProps) {
  // Determine if this is a mobile app or desktop app
  const isMobileApp = androidUrl || iosUrl;
  
  return (
    <div className="rounded-lg border p-4 flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div>
          {icon}
        </div>
        <Badge variant="outline">{version}</Badge>
      </div>
      
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      
      <div className="mt-auto grid gap-2">
        {isMobileApp ? (
          <>
            {androidUrl && (
              <Button size="sm" variant="outline" className="w-full" asChild>
                <a href={androidUrl} target="_blank" rel="noopener noreferrer">
                  Android
                </a>
              </Button>
            )}
            {iosUrl && (
              <Button size="sm" variant="outline" className="w-full" asChild>
                <a href={iosUrl} target="_blank" rel="noopener noreferrer">
                  iOS
                </a>
              </Button>
            )}
          </>
        ) : (
          <>
            {windowsUrl && (
              <Button size="sm" variant="outline" className="w-full" asChild>
                <a href={windowsUrl} target="_blank" rel="noopener noreferrer">
                  Windows
                </a>
              </Button>
            )}
            {macUrl && (
              <Button size="sm" variant="outline" className="w-full" asChild>
                <a href={macUrl} target="_blank" rel="noopener noreferrer">
                  macOS
                </a>
              </Button>
            )}
            {linuxUrl && (
              <Button size="sm" variant="outline" className="w-full" asChild>
                <a href={linuxUrl} target="_blank" rel="noopener noreferrer">
                  Linux
                </a>
              </Button>
            )}
          </>
        )}
        
        <Button size="sm" className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>
    </div>
  );
}
