'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';
import { handleLogin } from '@/app/actions';
import { LoaderCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await handleLogin({ email, password });
    setIsLoading(false);

    if (result.success) {
      const { isAdmin, user } = result;

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(user));
      
      if (isAdmin) {
        localStorage.setItem('isAdmin', 'true');
        toast({
          title: 'تم تسجيل دخول المسؤول بنجاح',
          description: 'مرحباً بعودتك أيها المسؤول!',
        });
        router.push('/admin');
      } else {
        toast({
          title: 'تم تسجيل الدخول بنجاح',
          description: 'مرحبا بعودتك!',
        });
        router.push('/');
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'خطأ في تسجيل الدخول',
        description: result.error || 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] bg-background">
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">تسجيل الدخول</CardTitle>
          <CardDescription className="text-center">
            أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <LoaderCircle className="animate-spin" /> : 'تسجيل الدخول'}
            </Button>
          </form>
           <div className="mt-4 text-center text-sm">
              ليس لديك حساب؟{' '}
              <Link href="/signup" className="underline">
                إنشاء حساب
              </Link>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
