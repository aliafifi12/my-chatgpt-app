'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, CircleDollarSign, Rocket, Zap } from "lucide-react";
import { useEffect, useState } from 'react';
import { PaypalButton } from '@/components/paypal-button';

const tiers = [
  {
    name: 'مجاني',
    price: '$0',
    period: '/ شهرياً',
    description: 'ابدأ مع ميزاتنا الأساسية.',
    features: [
      '3 رسائل إجمالاً',
      'وصول للنموذج القياسي',
      'دعم المجتمع',
    ],
    buttonText: 'ابدأ مجاناً',
    href: '/signup',
    Icon: Zap,
  },
  {
    name: 'Pro',
    price: '$10',
    period: '/ شهرياً',
    description: 'افتح الميزات المتقدمة والحدود الأعلى.',
    features: [
      'رسائل غير محدودة',
      'أولوية الوصول للنماذج الجديدة',
      'أوقات استجابة أسرع',
      'دعم عبر البريد الإلكتروني',
    ],
    buttonText: 'اشترك مع باي بال',
    href: '#', // Placeholder, will be replaced by PayPal button
    highlighted: true,
    Icon: Rocket,
  },
  {
    name: 'Enterprise',
    price: 'مخصص',
    period: '',
    description: 'للشركات التي تحتاج إلى تحكم ودعم متقدم.',
    features: [
      'جميع ميزات Pro',
      'بنية تحتية مخصصة',
      'خصومات على الحجم',
      'دعم بأولوية 24/7',
    ],
    buttonText: 'تواصل مع المبيعات',
    href: '#',
    Icon: CircleDollarSign,
  },
];

export default function PricingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            أسعار مرنة لاحتياجاتك
          </h1>
          <p className="mt-3 text-xl text-muted-foreground sm:mt-5">
            اختر الخطة المناسبة لك.
          </p>
        </div>
        <div className="grid max-w-md grid-cols-1 gap-8 mx-auto lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.name} className={tier.highlighted ? 'border-primary ring-2 ring-primary flex flex-col' : 'flex flex-col'}>
              <CardHeader className="text-center">
                 <tier.Icon className="h-10 w-10 mx-auto mb-4 text-primary" />
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <div className="flex items-baseline justify-center gap-x-1">
                  <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                  {tier.period && <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">{tier.period}</span>}
                </div>
                <CardDescription className="mt-2">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-accent ml-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                 {tier.name === 'Pro' ? (
                  isLoggedIn ? (
                    <div className="w-full">
                      <PaypalButton />
                    </div>
                  ) : (
                    <Button asChild className="w-full" variant="default">
                      <Link href="/login?redirect=/pricing">تسجيل الدخول للاشتراك</Link>
                    </Button>
                  )
                 ) : (
                   <Button asChild className="w-full" variant={tier.highlighted ? 'default' : 'outline'}>
                      <Link href={tier.href}>{tier.buttonText}</Link>
                   </Button>
                 )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
