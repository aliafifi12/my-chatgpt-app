'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';

export default function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy signup logic
    const fullName = `${firstName} ${lastName}`.trim();
    console.log('Signing up with:', email, password);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify({ email, name: fullName || email.split('@')[0] }));
    localStorage.setItem('messageCount', '0');
    toast({
      title: 'تم إنشاء الحساب',
      description: "لقد أنشأنا حسابك من أجلك.",
    });
    router.push('/');
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] bg-background">
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">إنشاء حساب</CardTitle>
          <CardDescription className="text-center">
            أدخل معلوماتك لإنشاء حساب
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">الاسم الأول</Label>
                <Input id="first-name" placeholder="علي" required value={firstName} onChange={e => setFirstName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">اسم العائلة</Label>
                <Input id="last-name" placeholder="محمد" required value={lastName} onChange={e => setLastName(e.target.value)} />
              </div>
            </div>
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
              إنشاء حساب
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            هل لديك حساب بالفعل؟{' '}
            <Link href="/login" className="underline">
              تسجيل الدخول
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
