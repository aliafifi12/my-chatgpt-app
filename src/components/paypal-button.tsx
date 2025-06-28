'use client';

import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const PAYPAL_PLAN_ID = process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID;

declare global {
  interface Window {
    paypal: any;
  }
}

export function PaypalButton() {
  const [sdkReady, setSdkReady] = useState(false);
  const paypalRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!PAYPAL_CLIENT_ID) {
      console.error('PayPal Client ID is not set in environment variables.');
      return;
    }

    if (window.paypal) {
      setSdkReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&vault=true&intent=subscription`;
    script.setAttribute('data-sdk-integration-source', 'button-factory');
    script.onload = () => setSdkReady(true);
    script.onerror = () => console.error('PayPal SDK could not be loaded.');
    document.body.appendChild(script);

    return () => {
      const scriptElement = document.querySelector(`script[src*="${PAYPAL_CLIENT_ID}"]`);
      if (scriptElement) {
        document.body.removeChild(scriptElement);
      }
    };
  }, []);

  useEffect(() => {
    if (sdkReady && paypalRef.current && paypalRef.current.innerHTML === '') {
      if (!PAYPAL_PLAN_ID) {
        console.error('PayPal Plan ID is not set in environment variables.');
        return;
      }
      try {
        window.paypal.Buttons({
          style: {
            shape: 'rect',
            color: 'gold',
            layout: 'vertical',
            label: 'subscribe',
          },
          createSubscription: function (data: any, actions: any) {
            return actions.subscription.create({
              plan_id: PAYPAL_PLAN_ID,
            });
          },
          onApprove: function (data: any, actions: any) {
            toast({
              title: 'Subscription Successful!',
              description: 'Welcome to ChatGPT Pro. You now have unlimited access.',
            });

            try {
              localStorage.setItem('isProUser', 'true');
            } catch (e) {
              console.error('Failed to update user status in localStorage', e);
            }
            
            // Use full page reload to ensure all components re-check localStorage
            window.location.href = '/account';
          },
          onError: function (err: any) {
            console.error('PayPal button error:', err);
            toast({
              variant: 'destructive',
              title: 'An error occurred',
              description: 'Something went wrong with the PayPal transaction. Please try again.',
            });
          },
        }).render(paypalRef.current);
      } catch (error) {
        console.error('Failed to render PayPal buttons', error);
      }
    }
  }, [sdkReady, router, toast]);

  if (!PAYPAL_CLIENT_ID || !PAYPAL_PLAN_ID) {
    return <div className="text-center p-4 text-destructive font-semibold">PayPal integration is not configured.</div>;
  }

  if (!sdkReady) {
    return <div className="text-center p-4">Loading PayPal Button...</div>;
  }

  return <div id={`paypal-button-container-${PAYPAL_PLAN_ID}`} ref={paypalRef} className="w-full"></div>;
}
