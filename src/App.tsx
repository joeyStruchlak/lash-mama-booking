import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Architecture from "@/pages/Architecture";
import { UserRoleProvider } from "@/contexts/UserRoleContext";
import SplashScreen from "@/components/SplashScreen";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Book from "./pages/Book";
import About from "./pages/About";
import VIP from "./pages/VIP";
import Courses from "./pages/Courses";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem('hasSeenSplash', 'true');
    setShowSplash(false);
  };

  const replaySplash = () => {
    sessionStorage.removeItem('hasSeenSplash');
    setShowSplash(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <UserRoleProvider>
          {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/book" element={<Book />} />
              <Route path="/about" element={<About />} />
              <Route path="/vip" element={<VIP />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/staff" element={<StaffDashboard />} />
              <Route path="/manager" element={<ManagerDashboard />} />
              <Route path="/architecture" element={<Architecture />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          {/* Dev button to replay splash */}
          <button
            onClick={replaySplash}
            className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-gold text-white rounded-xl shadow-lg hover:bg-gold-dark transition-colors text-sm font-medium"
          >
            ✨ Replay Splash
          </button>
        </UserRoleProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
