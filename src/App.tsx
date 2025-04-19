
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

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
import Settings from "@/pages/Settings";
import ForgotPassword from "@/pages/ForgotPassword";
import Logout from "@/pages/Logout";

// Layout
import { Layout } from "@/components/layout/Layout";

import "./App.css";

function App() {
  useEffect(() => {
    document.title = "NETX Forge";
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-react-theme">
      <Toaster />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/logout" element={<Logout />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/token-creation" element={<TokenCreation />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/history" element={<History />} />
          <Route path="/exchange" element={<Exchange />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/node-setup" element={<NodeSetup />} />
          
          {/* Admin routes - require admin role */}
          <Route path="/admin" element={<ProtectedRoute requireAdmin><Admin /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute requireAdmin><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/liquidity" element={<ProtectedRoute requireAdmin><AdminLiquidityPool /></ProtectedRoute>} />
          <Route path="/admin/tokens" element={<ProtectedRoute requireAdmin><AdminTokens /></ProtectedRoute>} />
          <Route path="/admin/security" element={<ProtectedRoute requireAdmin><AdminSecurity /></ProtectedRoute>} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
