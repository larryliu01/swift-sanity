
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, LogOut, UserIcon } from 'lucide-react';
import Navbar from '../components/Navbar';

// Conditionally import Clerk components to avoid errors when Clerk is not available
let SignInButton: any = () => null;
let SignOutButton: any = () => null;
let UserButton: any = () => null;
let useAuth: any = () => ({ isLoaded: true, userId: null, sessionId: null });
let useUser: any = () => ({ user: null });

// Only import Clerk if it's available in the environment
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (PUBLISHABLE_KEY && PUBLISHABLE_KEY.length > 0) {
  try {
    const clerk = require('@clerk/clerk-react');
    SignInButton = clerk.SignInButton;
    SignOutButton = clerk.SignOutButton;
    UserButton = clerk.UserButton;
    useAuth = clerk.useAuth;
    useUser = clerk.useUser;
  } catch (e) {
    console.error("Failed to import Clerk components:", e);
  }
}

const ProfilePage = () => {
  const { isLoaded, userId, sessionId } = useAuth();
  const { user } = useUser();
  
  if (!isLoaded) {
    return (
      <div className="min-h-screen pt-12 pb-24 px-6 flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 animate-pulse mb-4"></div>
        <div className="w-48 h-4 bg-gray-100 rounded animate-pulse"></div>
      </div>
    );
  }

  // Check if Clerk is available
  const isClerkAvailable = PUBLISHABLE_KEY && PUBLISHABLE_KEY.length > 0;
  
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
            className="flex flex-col items-center justify-center py-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Alert className="mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Clerk Authentication Not Configured</AlertTitle>
              <AlertDescription>
                To enable authentication features, you need to set up the Clerk publishable key.
                Please add VITE_CLERK_PUBLISHABLE_KEY to your environment variables.
              </AlertDescription>
            </Alert>
            
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
              {UserButton ? (
                <UserButton />
              ) : (
                <Avatar>
                  <AvatarFallback><UserIcon className="h-4 w-4" /></AvatarFallback>
                </Avatar>
              )}
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
                {SignOutButton ? (
                  <SignOutButton>
                    <Button variant="destructive" className="w-full justify-start">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </SignOutButton>
                ) : (
                  <Button variant="destructive" className="w-full justify-start">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                )}
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
