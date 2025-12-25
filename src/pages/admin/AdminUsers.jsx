import { useState } from 'react';
import {
    Search,
    Filter,
    MoreHorizontal,
    ShieldAlert,
    Eye,
    Mail,
    ShoppingBag
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function AdminUsers() {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Data for Buyers
    const users = [
        { id: 101, name: 'محمد علي', email: 'mohamed@gmail.com', orders: 15, spent: 'EGP 12,450', lastActive: '2025-12-24', status: 'active' },
        { id: 102, name: 'هدى حسن', email: 'huda@yahoo.com', orders: 8, spent: 'EGP 5,200', lastActive: '2025-12-23', status: 'active' },
        { id: 103, name: 'كريم محمود', email: 'kareem@hotmail.com', orders: 3, spent: 'EGP 1,200', lastActive: '2025-11-15', status: 'inactive' },
        { id: 104, name: 'ليلى أحمد', email: 'laila@gmail.com', orders: 22, spent: 'EGP 35,000', lastActive: '2025-12-25', status: 'active' },
        { id: 105, name: 'عماد سعيد', email: 'emad@outlook.com', orders: 0, spent: 'EGP 0', lastActive: '2025-10-01', status: 'banned' },
    ];

    return (
        <div className="space-y-6" dir="rtl">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">المستخدمين</h1>
                    <p className="text-slate-500 mt-1">إدارة حسابات المشترين والعملاء.</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <Mail className="ml-2 h-4 w-4" />
                    تنبيه عام
                </Button>
            </div>

            <Card className="border-slate-100 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
                    <div className="flex items-center gap-2">
                        <div className="relative w-64">
                            <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="ابحث بالاسم أو البريد..."
                                className="pr-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" className="gap-2">
                            <Filter size={16} />
                            تصفية
                        </Button>
                    </div>
                    <div className="text-sm text-slate-500">
                        عرض <span className="font-bold text-slate-900">{users.length}</span> مستخدم
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-right">المستخدم</TableHead>
                                <TableHead className="text-right">عدد الطلبات</TableHead>
                                <TableHead className="text-right">إجمالي الإنفاق</TableHead>
                                <TableHead className="text-right">آخر ظهور</TableHead>
                                <TableHead className="text-right">الحالة</TableHead>
                                <TableHead className="text-right w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarFallback className="bg-blue-50 text-blue-600">
                                                    {user.name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium text-slate-900">{user.name}</div>
                                                <div className="text-xs text-slate-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 font-medium">
                                            <ShoppingBag size={14} className="text-slate-400" />
                                            {user.orders}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-semibold text-slate-700">{user.spent}</TableCell>
                                    <TableCell className="text-slate-500">{user.lastActive}</TableCell>
                                    <TableCell>
                                        {user.status === 'active' && <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">نشط</Badge>}
                                        {user.status === 'inactive' && <Badge variant="secondary" className="bg-slate-100 text-slate-600">خامل</Badge>}
                                        {user.status === 'banned' && <Badge className="bg-red-100 text-red-700 hover:bg-red-200">محظور</Badge>}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-[160px]">
                                                <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="gap-2">
                                                    <Eye size={14} /> سجل الطلبات
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="gap-2 text-red-600">
                                                    <ShieldAlert size={14} /> حظر المستخدم
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
