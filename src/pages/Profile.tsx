
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth, useUser, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, LogOut } from 'lucide-react';
import Navbar from '../components/Navbar';

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
        
        {!userId ? (
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
                  {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : user?.emailAddresses[0]?.emailAddress}
                </h2>
                <p className="text-gray-500 text-sm">
                  {user?.emailAddresses[0]?.emailAddress}
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
