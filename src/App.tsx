import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/useIsMobile";

// Desktop pages
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import GDPR from "./pages/GDPR";

// Mobile pages
import MobileIndex from "./pages/mobile/MobileIndex";
import MobileAbout from "./pages/mobile/MobileAbout";
import MobileContact from "./pages/mobile/MobileContact";
import MobilePricing from "./pages/mobile/MobilePricing";
import MobileBlog from "./pages/mobile/MobileBlog";
import { MobileNavbar } from "./pages/mobile/MobileNavbar";
import { Analytics } from "@vercel/analytics/react";

import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Light pages get white bg, everything else stays black
const LIGHT_ROUTES = ["/about", "/privacy", "/terms", "/gdpr"];

function BackgroundManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    const isLight = LIGHT_ROUTES.includes(pathname);
    const color = isLight ? "#ffffff" : "#000000";
    document.body.style.backgroundColor = color;
    document.documentElement.style.backgroundColor = color;
  }, [pathname]);
  return null;
}

const queryClient = new QueryClient();

/* ─── Responsive App Shell ───────────────────────────────────── */
function AppRoutes() {
  const isMobile = useIsMobile();
  const { pathname } = useLocation();
  const navVariant = LIGHT_ROUTES.includes(pathname) ? "light" : "dark";

  return (
    <>
      <ScrollToTop />
      <BackgroundManager />

      {/* Navbar: mobile or desktop */}
      {isMobile ? <MobileNavbar /> : <Navbar variant={navVariant} />}

      <Routes>
        {/* Main pages — conditionally rendered */}
        <Route path="/" element={isMobile ? <MobileIndex /> : <Index />} />
        <Route path="/about" element={isMobile ? <MobileAbout /> : <About />} />
        <Route path="/contact" element={isMobile ? <MobileContact /> : <Contact />} />
        <Route path="/pricing" element={isMobile ? <MobilePricing /> : <Pricing />} />
        <Route path="/blog" element={isMobile ? <MobileBlog /> : <Blog />} />

        {/* Legal pages — same on all devices */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/gdpr" element={<GDPR />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <Analytics />
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;