
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/Profile";
import { ClerkProvider } from "@clerk/clerk-react";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  const [publishableKey, setPublishableKey] = useState<string | null>(null);

  useEffect(() => {
    // Check for key in environment variables first
    let key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
    
    // If not found, check localStorage
    if (!key) {
      key = localStorage.getItem('VITE_CLERK_PUBLISHABLE_KEY');
    }
    
    setPublishableKey(key);
  }, []);

  // Create the app content that will be used with or without Clerk
  const AppContent = () => (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );

  // If we have a Clerk key, use the ClerkProvider
  if (publishableKey) {
    return (
      <ClerkProvider
        publishableKey={publishableKey}
        clerkJSVersion="5.56.0-snapshot.v20250312225817"
        signInUrl="/sign-in"
        signUpUrl="/sign-up"
        signInFallbackRedirectUrl="/"
        signUpFallbackRedirectUrl="/"
        afterSignOutUrl="/"
      >
        <AppContent />
      </ClerkProvider>
    );
  }

  // If no Clerk key is available, render the app without Clerk authentication
  return <AppContent />;
};

export default App;
