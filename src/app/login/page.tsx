'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you'd want to use a more secure authentication method.
    if (email === 'admin@example.com' && password === 'password') {
      localStorage.setItem('isAdmin', 'true');
      toast({
        title: 'تم تسجيل دخول المسؤول بنجاح',
        description: 'مرحباً بعودتك أيها المسؤول!',
      });
      router.push('/admin');
    } else {
      // Dummy login logic for regular users
      console.log('Logging in with:', email, password);
      toast({
        title: 'تم تسجيل الدخول بنجاح',
        description: 'مرحبا بعودتك!',
      });
      router.push('/');
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
              />
            </div>
            <Button type="submit" className="w-full">
              تسجيل الدخول
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
