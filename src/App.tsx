
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import Marketplace from "./pages/Marketplace";
import TokenCreation from "./pages/TokenCreation";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Exchange from "./pages/Exchange";
import Explorer from "./pages/Explorer";
import Analytics from "./pages/Analytics";
import History from "./pages/History";
import Admin from "./pages/Admin";
import AdminUsers from "./pages/AdminUsers";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import NodeSetup from "./pages/NodeSetup";
import Trading from "./pages/Trading";
import { StrictMode } from "react";

// Initialize QueryClient outside of the component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Navigate to="/login" replace />} />
              
              <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/token-creation" element={<TokenCreation />} />
                <Route path="/history" element={<History />} />
                <Route path="/exchange" element={<Exchange />} />
                <Route path="/explorer" element={<Explorer />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/node-setup" element={<NodeSetup />} />
                <Route path="/trading" element={<Trading />} />
                {/* Redirects for common typos */}
                <Route path="/users" element={<Navigate to="/admin/users" replace />} />
                <Route path="/tokens" element={<Navigate to="/marketplace" replace />} />
                <Route path="/create-token" element={<Navigate to="/token-creation" replace />} />
                <Route path="/profile" element={<Navigate to="/wallet" replace />} />
                <Route path="/chart" element={<Navigate to="/analytics" replace />} />
                <Route path="/transactions" element={<Navigate to="/history" replace />} />
                <Route path="/nodes" element={<Navigate to="/node-setup" replace />} />
                <Route path="/trade" element={<Navigate to="/trading" replace />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};

export default App;
