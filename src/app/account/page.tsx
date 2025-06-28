import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function AccountPage() {
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
                <p className="text-muted-foreground">Your plan renews on July 30, 2024.</p>
                <Button variant="outline" asChild>
                  <Link href="https://www.paypal.com/myaccount/autopay/" target="_blank" rel="noopener noreferrer">Manage on PayPal</Link>
                </Button>
             </div>
          </CardContent>
          <Separator />
          <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>
                Cancelling your subscription will downgrade you to the Free plan at the end of your billing period.
              </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="flex justify-between items-center p-4 border border-destructive/50 rounded-lg bg-destructive/5">
                <div>
                    <h3 className="font-semibold text-destructive">Cancel Subscription</h3>
                    <p className="text-muted-foreground text-sm">Your access to Pro features will remain until the end of your current billing period.</p>
                </div>
                 <Button variant="destructive">Cancel Subscription</Button>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
