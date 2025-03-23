
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const NotificationSettings = () => {
  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success",
      description: "Notification settings saved successfully"
    });
  };

  return (
    <Card>
      <form onSubmit={handleSaveNotifications}>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Manage how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-muted-foreground">Receive updates via email</p>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="email-notifications" className="sr-only">
                  Email Notifications
                </Label>
                <Input
                  id="email-notifications"
                  type="checkbox"
                  className="h-4 w-4"
                  defaultChecked
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">New Restaurant Alerts</h4>
                <p className="text-sm text-muted-foreground">Get notified about new restaurants</p>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="restaurant-alerts" className="sr-only">
                  Restaurant Alerts
                </Label>
                <Input
                  id="restaurant-alerts"
                  type="checkbox"
                  className="h-4 w-4"
                  defaultChecked
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Special Offers</h4>
                <p className="text-sm text-muted-foreground">Receive special offers and discounts</p>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="offers" className="sr-only">
                  Special Offers
                </Label>
                <Input
                  id="offers"
                  type="checkbox"
                  className="h-4 w-4"
                  defaultChecked
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Save Preferences
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default NotificationSettings;
