
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { AlertCircle, Save } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const ClerkKeyForm = () => {
  const [key, setKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Check if key is already in localStorage
    const savedKey = localStorage.getItem('VITE_CLERK_PUBLISHABLE_KEY');
    if (savedKey) {
      setKey(savedKey);
      setSaved(true);
    }
  }, []);

  const handleSave = () => {
    if (!key.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid publishable key",
        variant: "destructive"
      });
      return;
    }

    // Save key to localStorage
    localStorage.setItem('VITE_CLERK_PUBLISHABLE_KEY', key.trim());
    setSaved(true);
    
    toast({
      title: "Success",
      description: "Clerk publishable key saved. Please refresh the page to apply changes.",
    });
  };

  return (
    <div className="space-y-4 mt-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Clerk Authentication Setup</AlertTitle>
        <AlertDescription>
          Enter your Clerk publishable key to enable authentication. You can find this in your Clerk dashboard.
        </AlertDescription>
      </Alert>
      
      <div className="flex space-x-2">
        <Input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="pk_live_xxxxxxxxxx"
          className="flex-1"
        />
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
      </div>
      
      {saved && (
        <p className="text-sm text-green-600">
          Key saved! Please refresh the page to apply changes.
        </p>
      )}
    </div>
  );
};

export default ClerkKeyForm;
