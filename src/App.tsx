import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Settings } from "lucide-react";

// Pages
import Dashboard from "@/pages/Dashboard";
import Admin from "@/pages/Admin";
import AdminUsers from "@/pages/AdminUsers";
import AdminLiquidityPool from "@/pages/AdminLiquidityPool";
import AdminTokens from "@/pages/AdminTokens"; 
import AdminSecurity from "@/pages/AdminSecurity";
import Wallet from "@/pages/Wallet";
import TokenCreation from "@/pages/TokenCreation";
import Marketplace from "@/pages/Marketplace";
import History from "@/pages/History";
import Exchange from "@/pages/Exchange";
import Explorer from "@/pages/Explorer";
import Analytics from "@/pages/Analytics";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";
import NodeSetup from "@/pages/NodeSetup";

// Layout
import Layout from "@/components/layout/Layout";

import "./App.css";

function App() {
  useEffect(() => {
    document.title = "NETX Forge";
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-react-theme">
      <Toaster />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/token-creation" element={<TokenCreation />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/history" element={<History />} />
          <Route path="/exchange" element={<Exchange />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/liquidity" element={<AdminLiquidityPool />} />
          <Route path="/admin/tokens" element={<AdminTokens />} />
          <Route path="/admin/security" element={<AdminSecurity />} />
          <Route path="/node-setup" element={<NodeSetup />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
