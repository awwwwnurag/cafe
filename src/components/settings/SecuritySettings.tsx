
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SecuritySettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>Manage your password and security preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Password</h3>
          <p className="text-sm text-muted-foreground">
            Your password was last changed never.
          </p>
          <Button variant="outline">Change Password</Button>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
          <p className="text-sm text-muted-foreground">
            Add an extra layer of security to your account.
          </p>
          <Button variant="outline">Enable 2FA</Button>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Sessions</h3>
          <p className="text-sm text-muted-foreground">
            You're currently logged in on this device.
          </p>
          <Button variant="outline" className="text-red-500 hover:text-red-600">
            Log Out All Devices
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;
