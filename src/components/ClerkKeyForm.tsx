
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { AlertCircle, Save, Check } from 'lucide-react';
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

    if (!key.startsWith('pk_')) {
      toast({
        title: "Warning",
        description: "This doesn't appear to be a valid Clerk publishable key. Keys should start with 'pk_'",
        variant: "destructive"
      });
      // Continue anyway as the user might know what they're doing
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
          {saved ? <Check className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
          {saved ? "Saved" : "Save"}
        </Button>
      </div>
      
      {saved && (
        <div className="bg-green-50 p-3 rounded border border-green-200">
          <p className="text-sm text-green-600 flex items-center">
            <Check className="h-4 w-4 mr-2" />
            Key saved! Please refresh the page to apply changes.
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClerkKeyForm;
