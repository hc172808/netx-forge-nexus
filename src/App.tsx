
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import Marketplace from "./pages/Marketplace";
import TokenCreation from "./pages/TokenCreation";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/token-creation" element={<TokenCreation />} />
            <Route path="/history" element={<Dashboard />} />
            <Route path="/exchange" element={<Dashboard />} />
            <Route path="/explorer" element={<Dashboard />} />
            <Route path="/analytics" element={<Dashboard />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/users" element={<Dashboard />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
