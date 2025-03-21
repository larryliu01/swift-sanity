
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, LogOut, UserIcon } from 'lucide-react';
import Navbar from '../components/Navbar';
import ClerkKeyForm from '../components/ClerkKeyForm';
import { SignInButton, SignOutButton, UserButton, useAuth, useUser } from '@clerk/clerk-react';

// Check for key in environment variables first
let PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// If not found, check localStorage (client-side only)
if (typeof window !== 'undefined') {
  if (!PUBLISHABLE_KEY) {
    PUBLISHABLE_KEY = localStorage.getItem('VITE_CLERK_PUBLISHABLE_KEY');
  }
}

const ProfilePage = () => {
  // Default values for when Clerk is not available
  let isLoaded = true;
  let userId = null;
  let sessionId = null;
  let user = null;
  
  // Check if Clerk is available
  const isClerkAvailable = PUBLISHABLE_KEY && PUBLISHABLE_KEY.length > 0;
  
  // Only use Clerk hooks if it's available
  if (isClerkAvailable) {
    try {
      const authData = useAuth();
      isLoaded = authData.isLoaded;
      userId = authData.userId;
      sessionId = authData.sessionId;
      
      const userData = useUser();
      user = userData.user;
    } catch (e) {
      console.error("Failed to use Clerk hooks:", e);
    }
  }
  
  if (!isLoaded && isClerkAvailable) {
    return (
      <div className="min-h-screen pt-12 pb-24 px-6 flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 animate-pulse mb-4"></div>
        <div className="w-48 h-4 bg-gray-100 rounded animate-pulse"></div>
      </div>
    );
  }
  
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
        
        {!isClerkAvailable ? (
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
        ) : !userId ? (
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
              <SignInButton mode="modal">
                <Button className="w-full">
                  Sign in with OAuth Providers
                </Button>
              </SignInButton>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <UserButton />
              <div>
                <h2 className="font-medium text-lg">
                  {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : "User"}
                </h2>
                <p className="text-gray-500 text-sm">
                  {user?.emailAddresses?.[0]?.emailAddress || "user@example.com"}
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
                <SignOutButton>
                  <Button variant="destructive" className="w-full justify-start">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </SignOutButton>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <Navbar />
    </div>
  );
};

export default ProfilePage;
