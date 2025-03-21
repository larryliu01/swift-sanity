
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, LogOut } from 'lucide-react';
import Navbar from '../components/Navbar';
import ClerkKeyForm from '../components/ClerkKeyForm';

// Check for key in environment variables or localStorage
let PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (typeof window !== 'undefined' && !PUBLISHABLE_KEY) {
  PUBLISHABLE_KEY = localStorage.getItem('VITE_CLERK_PUBLISHABLE_KEY');
}

// Simple loader component
const LoadingState = () => (
  <div className="min-h-screen pt-12 pb-24 px-6 flex flex-col items-center justify-center">
    <div className="w-16 h-16 rounded-full bg-gray-100 animate-pulse mb-4"></div>
    <div className="w-48 h-4 bg-gray-100 rounded animate-pulse"></div>
  </div>
);

const ProfilePage = () => {
  // Check if we're in a Clerk context
  const isClerkAvailable = typeof window !== 'undefined' && 
    (window as any).__clerk_frontend_api && 
    (window as any).__clerk_frontend_api.loaded;
  
  const [isLoading, setIsLoading] = React.useState(true);
  const [userData, setUserData] = React.useState<any>(null);
  
  React.useEffect(() => {
    // Only attempt to access Clerk within useEffect to ensure
    // it's only run client-side and when ClerkProvider is available
    if (isClerkAvailable) {
      const loadClerkData = async () => {
        try {
          // Dynamically import Clerk to avoid SSR issues
          const { useAuth, useUser } = await import('@clerk/clerk-react');
          // Now we can safely use these hooks
          const auth = useAuth();
          const user = useUser();
          
          setUserData({
            isLoaded: auth.isLoaded && user.isLoaded,
            userId: auth.userId,
            user: user.user
          });
        } catch (e) {
          console.error("Failed to load Clerk data:", e);
        } finally {
          setIsLoading(false);
        }
      };
      
      loadClerkData();
    } else {
      setIsLoading(false);
    }
  }, [isClerkAvailable]);
  
  if (isLoading) {
    return <LoadingState />;
  }
  
  // If Clerk is available and we have user data
  if (isClerkAvailable && userData?.userId) {
    return (
      <div className="min-h-screen pt-12 pb-24 px-6 relative">
        <div className="max-w-md mx-auto">
          <motion.div 
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl font-bold">Profile</h1>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center space-x-4 mb-6">
              {/* We need to dynamically import UserButton */}
              {React.createElement(
                React.lazy(() => 
                  import('@clerk/clerk-react').then(mod => ({ 
                    default: mod.UserButton 
                  }))
                )
              )}
              <div>
                <h2 className="font-medium text-lg">
                  {userData.user?.firstName ? 
                    `${userData.user.firstName} ${userData.user.lastName || ''}` : 
                    "User"}
                </h2>
                <p className="text-gray-500 text-sm">
                  {userData.user?.emailAddresses?.[0]?.emailAddress || "user@example.com"}
                </p>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-4 mt-4">
              <h3 className="font-medium mb-3">App Settings</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Notification Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Dark Mode
                </Button>
                {/* Dynamic import for SignOutButton */}
                {React.createElement(
                  React.lazy(() => 
                    import('@clerk/clerk-react').then(mod => ({ 
                      default: props => (
                        <mod.SignOutButton>
                          <Button variant="destructive" className="w-full justify-start">
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                          </Button>
                        </mod.SignOutButton>
                      )
                    }))
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
        <Navbar />
      </div>
    );
  }
  
  // If Clerk is not available or user is not signed in
  return (
    <div className="min-h-screen pt-12 pb-24 px-6 relative">
      <div className="max-w-md mx-auto">
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold">Profile</h1>
        </motion.div>
        
        {!PUBLISHABLE_KEY ? (
          <motion.div 
            className="flex flex-col items-center justify-center py-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Alert className="mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Clerk Authentication Not Configured</AlertTitle>
              <AlertDescription>
                To enable authentication features, you need to set up the Clerk publishable key.
              </AlertDescription>
            </Alert>
            
            <ClerkKeyForm />
            
            <div className="mt-6">
              <h3 className="font-medium mb-2">Demo Mode Active</h3>
              <p className="text-sm text-gray-500 mb-4">
                You're currently viewing the application in demo mode without authentication.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="flex flex-col items-center justify-center py-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Alert className="mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Authentication Required</AlertTitle>
              <AlertDescription>
                Please sign in to access your profile and habits across devices.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-4 w-full max-w-xs">
              <Button 
                className="w-full"
                onClick={() => {
                  if (isClerkAvailable) {
                    // Open Clerk sign-in modal when available
                    const clerk = (window as any).Clerk;
                    if (clerk) {
                      clerk.openSignIn();
                    }
                  }
                }}
              >
                Sign in with OAuth Providers
              </Button>
            </div>
          </motion.div>
        )}
      </div>
      <Navbar />
    </div>
  );
};

export default ProfilePage;
