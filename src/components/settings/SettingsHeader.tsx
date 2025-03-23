
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types/auth';
import { ArrowLeft } from 'lucide-react';

interface SettingsHeaderProps {
  user: User;
}

const SettingsHeader = ({ user }: SettingsHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <>
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="mb-8 flex items-center">
        <Avatar className="h-14 w-14 mr-4">
          <AvatarImage src={user.avatar} alt={user.name || user.email} />
          <AvatarFallback>{user.name?.[0] || user.email[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences</p>
        </div>
      </div>
    </>
  );
};

export default SettingsHeader;
