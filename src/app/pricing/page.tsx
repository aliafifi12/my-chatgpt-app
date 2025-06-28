import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, CircleDollarSign, Rocket, Zap } from "lucide-react";

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: '/ month',
    description: 'Get started with our basic features.',
    features: [
      '3 messages total',
      'Standard model access',
      'Community support',
    ],
    buttonText: 'Start for Free',
    href: '/signup',
    Icon: Zap,
  },
  {
    name: 'Pro',
    price: '$10',
    period: '/ month',
    description: 'Unlock advanced features and higher limits.',
    features: [
      'Unlimited messages',
      'Priority access to new models',
      'Faster response times',
      'Email support',
    ],
    buttonText: 'Subscribe with PayPal',
    href: 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=REPLACE_WITH_YOUR_PAYPAL_BUTTON_ID',
    highlighted: true,
    Icon: Rocket,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For businesses that need advanced control and support.',
    features: [
      'All Pro features',
      'Dedicated infrastructure',
      'Volume discounts',
      '24/7 priority support',
    ],
    buttonText: 'Contact Sales',
    href: '#',
    Icon: CircleDollarSign,
  },
];

export default function PricingPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Flexible pricing for your needs
          </h1>
          <p className="mt-3 text-xl text-muted-foreground sm:mt-5">
            Choose the plan that's right for you.
          </p>
        </div>
        <div className="grid max-w-md grid-cols-1 gap-8 mx-auto lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.name} className={tier.highlighted ? 'border-primary ring-2 ring-primary' : ''}>
              <CardHeader className="text-center">
                 <tier.Icon className="h-10 w-10 mx-auto mb-4 text-primary" />
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <div className="flex items-baseline justify-center gap-x-1">
                  <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                  {tier.period && <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">{tier.period}</span>}
                </div>
                <CardDescription className="mt-2">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-accent mr-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                 <Button asChild className="w-full" variant={tier.highlighted ? 'default' : 'outline'}>
                    <Link href={tier.href}>{tier.buttonText}</Link>
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
