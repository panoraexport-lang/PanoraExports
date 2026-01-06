import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { ScreenshotProtection } from "@/components/ScreenshotProtection";
import NotFound from "@/pages/not-found";
import LuxuryLanding from "@/pages/LuxuryLanding";
import ProductsPage from "@/app/products/page";
import ProductDetailPage from "@/app/products/[id]/page";
import ProductsComingSoon from "@/app/products/coming-soon/page";
import CategoriesPage from "@/app/categories/page";
import VerificationPage from "@/app/verification/page";
import AboutPage from "@/app/about/page";
import LoginPage from "@/app/auth/login/page";
import RegisterPage from "@/app/auth/register/page";
import AdminDashboard from "@/app/admin/page";
import FAQPage from "@/app/faq/page";
import ContactPage from "@/app/contact/page";
import LicensesPage from "@/app/licenses/page";

import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LuxuryLanding} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/products/coming-soon" component={ProductsComingSoon} />
      <Route path="/products/:id" component={ProductDetailPage} />
      <Route path="/categories" component={CategoriesPage} />
      <Route path="/verification" component={VerificationPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/auth/login" component={LoginPage} />
      <Route path="/auth/register" component={RegisterPage} />

      <Route path="/admin" component={AdminDashboard} />
      <Route path="/faq" component={FAQPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/licenses" component={LicensesPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
