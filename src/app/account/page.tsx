'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const [isPro, setIsPro] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      let user = null;
      try {
        user = JSON.parse(localStorage.getItem('user') || 'null');
      } catch (e) {
        console.error("Could not parse user from local storage", e);
      }
      const proStatus = localStorage.getItem('isProUser') === 'true';
      const adminStatus = user?.email === 'admin@example.com';
      setIsPro(proStatus || adminStatus);
    }
  }, []);

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel your subscription? You will lose Pro features. This action cannot be undone from the app.")) {
      localStorage.removeItem('isProUser');
      toast({
        title: 'Subscription Cancelled',
        description: 'Your Pro plan has been cancelled. Please also cancel the subscription in your PayPal account.'
      });
      setIsPro(false);
      window.location.href = '/pricing';
    }
  }

  if (!isLoggedIn) {
     return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Please Log In</h1>
        <p className="text-muted-foreground mb-8">You need to be logged in to view your account details.</p>
        <Button asChild>
          <Link href="/login">Log In</Link>
        </Button>
      </div>
    );
  }

  if (!isPro) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Upgrade to Pro</h1>
        <p className="text-muted-foreground mb-8">You are currently on the Free plan. Upgrade to access Pro features.</p>
        <Button asChild>
          <Link href="/pricing">View Pricing</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Account Management</h1>
        <p className="text-muted-foreground mb-8">
          View and manage your subscription details.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>My Subscription</CardTitle>
            <CardDescription>
              Manage your current plan and billing details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                    <h3 className="font-semibold">Current Plan</h3>
                    <p className="text-muted-foreground text-2xl font-bold text-primary">Pro Plan</p>
                </div>
                <p className="text-muted-foreground">$10 / month</p>
            </div>
             <div className="flex justify-between items-center">
                <p className="text-muted-foreground">Manage your billing on PayPal.</p>
                <Button variant="outline" asChild>
                  <Link href="https://www.paypal.com/myaccount/autopay/" target="_blank" rel="noopener noreferrer">Manage on PayPal</Link>
                </Button>
             </div>
          </CardContent>
          <Separator />
          <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>
                Cancelling your subscription here will immediately remove Pro access from this app. You must also cancel on PayPal to stop payments.
              </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="flex justify-between items-center p-4 border border-destructive/50 rounded-lg bg-destructive/5">
                <div>
                    <h3 className="font-semibold text-destructive">Cancel Subscription</h3>
                    <p className="text-muted-foreground text-sm">Your access to Pro features will be removed immediately.</p>
                </div>
                 <Button variant="destructive" onClick={handleCancel}>Cancel Subscription</Button>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
