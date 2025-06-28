'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, MessageSquare } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Skeleton } from '@/components/ui/skeleton';

const chartData = [
  { month: "January", chats: 186 },
  { month: "February", chats: 305 },
  { month: "March", chats: 237 },
  { month: "April", chats: 273 },
  { month: "May", chats: 209 },
  { month: "June", chats: 214 },
];

const chartConfig = {
  chats: {
    label: "Chats",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

const users = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    plan: "Pro",
    joined: "2024-07-15",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    plan: "Free",
    joined: "2024-07-14",
  },
    {
    name: "Sam Wilson",
    email: "sam.wilson@example.com",
    plan: "Pro",
    joined: "2024-07-13",
  },
  {
    name: "Alice Johnson",
    email: "alice.j@example.com",
    plan: "Enterprise",
    joined: "2024-07-12",
  },
];


export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return (
        <div className="container mx-auto py-12">
            <div className="max-w-7xl mx-auto space-y-8">
                <Skeleton className="h-10 w-1/4" />
                <Skeleton className="h-6 w-1/2" />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Skeleton className="h-32" />
                    <Skeleton className="h-32" />
                    <Skeleton className="h-32" />
                </div>
                <div className="grid gap-8 lg:grid-cols-2">
                    <Skeleton className="h-80" />
                    <Skeleton className="h-80" />
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">لوحة تحكم المسؤول</h1>
          <p className="text-muted-foreground">
            مرحبا بعودتك ايها المسؤول. إليك ما يحدث.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المستخدمين</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,257</div>
              <p className="text-xs text-muted-foreground">+20.1% من الشهر الماضي</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الاشتراكات</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+235</div>
              <p className="text-xs text-muted-foreground">+180.1% من الشهر الماضي</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المحادثات النشطة</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">+19% من الشهر الماضي</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
           <Card>
            <CardHeader>
              <CardTitle>حجم الدردشة</CardTitle>
              <CardDescription>رسائل الدردشة الشهرية</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                   <YAxis />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Bar dataKey="chats" fill="var(--color-chats)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>الاشتراكات الأخيرة</CardTitle>
              <CardDescription>
                أحدث المستخدمين للانضمام إلى ChatFlow.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المستخدم</TableHead>
                    <TableHead>الخطة</TableHead>
                    <TableHead>تاريخ الانضمام</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.email}>
                      <TableCell>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.plan === 'Pro' ? 'default' : user.plan === 'Enterprise' ? 'secondary' : 'outline'}>
                          {user.plan}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.joined}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
