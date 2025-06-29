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
    if (window.confirm("هل أنت متأكد من رغبتك في إلغاء اشتراكك؟ ستفقد ميزات Pro. لا يمكن التراجع عن هذا الإجراء من التطبيق.")) {
      localStorage.removeItem('isProUser');
      toast({
        title: 'تم إلغاء الاشتراك',
        description: 'تم إلغاء خطة Pro الخاصة بك. يرجى أيضًا إلغاء الاشتراك في حساب PayPal الخاص بك.'
      });
      setIsPro(false);
      window.location.href = '/pricing';
    }
  }

  if (!isLoggedIn) {
     return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">يرجى تسجيل الدخول</h1>
        <p className="text-muted-foreground mb-8">يجب أن تكون مسجلاً للدخول لعرض تفاصيل حسابك.</p>
        <Button asChild>
          <Link href="/login">تسجيل الدخول</Link>
        </Button>
      </div>
    );
  }

  if (!isPro) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">الترقية إلى Pro</h1>
        <p className="text-muted-foreground mb-8">أنت حاليًا على الخطة المجانية. قم بالترقية للوصول إلى ميزات Pro.</p>
        <Button asChild>
          <Link href="/pricing">عرض الأسعار</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">إدارة الحساب</h1>
        <p className="text-muted-foreground mb-8">
          عرض وإدارة تفاصيل اشتراكك.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>اشتراكي</CardTitle>
            <CardDescription>
              إدارة خطتك الحالية وتفاصيل الفوترة.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                    <h3 className="font-semibold">الخطة الحالية</h3>
                    <p className="text-muted-foreground text-2xl font-bold text-primary">خطة Pro</p>
                </div>
                <p className="text-muted-foreground">$10 / شهرياً</p>
            </div>
             <div className="flex justify-between items-center">
                <p className="text-muted-foreground">إدارة الفوترة الخاصة بك على PayPal.</p>
                <Button variant="outline" asChild>
                  <Link href="https://www.paypal.com/myaccount/autopay/" target="_blank" rel="noopener noreferrer">الإدارة على PayPal</Link>
                </Button>
             </div>
          </CardContent>
          <Separator />
          <CardHeader>
              <CardTitle>منطقة الخطر</CardTitle>
              <CardDescription>
                سيؤدي إلغاء اشتراكك هنا إلى إزالة وصول Pro من هذا التطبيق على الفور. يجب عليك أيضًا الإلغاء على PayPal لإيقاف المدفوعات.
              </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="flex justify-between items-center p-4 border border-destructive/50 rounded-lg bg-destructive/5">
                <div>
                    <h3 className="font-semibold text-destructive">إلغاء الاشتراك</h3>
                    <p className="text-muted-foreground text-sm">ستتم إزالة وصولك إلى ميزات Pro على الفور.</p>
                </div>
                 <Button variant="destructive" onClick={handleCancel}>إلغاء الاشتراك</Button>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
