
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { LogOut, User, Mail } from 'lucide-react';

const ProfilePage = () => {
  const { session, signOut, loading } = useAuth();
  const [userDetails, setUserDetails] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // If not loading and no session, redirect to login
    if (!loading && !session) {
      navigate('/auth');
      return;
    }

    // Get user details from session if available
    if (session?.user) {
      setUserDetails(session.user);
    }
  }, [session, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center">
            <p>Loading profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Profile</h1>
        
        {userDetails && (
          <div className="max-w-md mx-auto">
            <Card className="shadow-lg">
              <CardHeader className="flex flex-col items-center pb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="bg-bookstore-primary text-white text-2xl">
                    {userDetails.email ? userDetails.email.charAt(0).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-semibold text-center">
                  {userDetails.user_metadata?.full_name || 'Book Lover'}
                </h2>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-muted rounded-md">
                  <Mail className="text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{userDetails.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-muted rounded-md">
                  <User className="text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Account ID</p>
                    <p className="font-medium">{userDetails.id.substring(0, 8)}...</p>
                  </div>
                </div>
                
                <div className="p-3 rounded-md border border-muted">
                  <p className="text-sm font-medium mb-2">Account Details</p>
                  <p className="text-sm text-muted-foreground">Last sign in: {new Date(userDetails.last_sign_in_at).toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Created: {new Date(userDetails.created_at).toLocaleDateString()}</p>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button variant="destructive" className="w-full" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
