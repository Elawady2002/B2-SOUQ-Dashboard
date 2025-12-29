import { useState } from 'react';
import {
    Users,
    UserPlus,
    Search,
    Filter,
    Shield,
    Mail,
    Phone,
    MoreHorizontal,
    Lock,
    Activity,
    CheckCircle2,
    XCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AdminStaff() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddStaffSheet, setShowAddStaffSheet] = useState(false);

    // Mock Staff Data
    const staffMembers = [
        { id: 1, name: 'أحمد الإداري', role: 'Super Admin', email: 'admin@b2souq.com', phone: '+201000000001', status: 'active', lastActive: 'الآن' },
        { id: 2, name: 'منى الدعم', role: 'Customer Support', email: 'support@b2souq.com', phone: '+201000000002', status: 'active', lastActive: 'منذ 5 دقائق' },
        { id: 3, name: 'خالد المالي', role: 'Finance Manager', email: 'finance@b2souq.com', phone: '+201000000003', status: 'inactive', lastActive: 'منذ يومين' },
        { id: 4, name: 'سارة العمليات', role: 'Operations', email: 'ops@b2souq.com', phone: '+201000000004', status: 'active', lastActive: 'منذ ساعة' },
    ];

    const roleColors = {
        'Super Admin': 'bg-purple-100 text-purple-700',
        'Customer Support': 'bg-blue-100 text-blue-700',
        'Finance Manager': 'bg-green-100 text-green-700',
        'Operations': 'bg-orange-100 text-orange-700',
    };

    return (
        <div className="space-y-6" dir="rtl">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">إدارة الموظفين والصلاحيات</h1>
                    <p className="text-slate-500 mt-1">فريق عمل المنصة وإدارة الأدوار.</p>
                </div>
                <Button onClick={() => setShowAddStaffSheet(true)} className="bg-blue-600 hover:bg-blue-700 gap-2">
                    <UserPlus size={18} />
                    إضافة موظف جديد
                </Button>
            </div>

            <Card className="border-slate-100 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
                    <div className="flex items-center gap-2">
                        <div className="relative w-64">
                            <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="ابحث بالاسم أو الدور..."
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
                        عرض <span className="font-bold text-slate-900">{staffMembers.length}</span> عضو
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-right">الموظف</TableHead>
                                <TableHead className="text-right">الدور الوظيفي</TableHead>
                                <TableHead className="text-right">معلومات الاتصال</TableHead>
                                <TableHead className="text-right">آخر نشاط</TableHead>
                                <TableHead className="text-right">الحالة</TableHead>
                                <TableHead className="text-right w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {staffMembers.map((staff) => (
                                <TableRow key={staff.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarFallback className="bg-slate-100 text-slate-600">
                                                    {staff.name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium text-slate-900">{staff.name}</div>
                                                <div className="text-xs text-slate-500 flex items-center gap-1">
                                                    <Shield size={10} />
                                                    {staff.role}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className={`${roleColors[staff.role] || 'bg-slate-100 text-slate-600'}`}>
                                            {staff.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1 text-xs text-slate-600">
                                                <Mail size={12} /> {staff.email}
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-slate-600" dir="ltr">
                                                <Phone size={12} /> {staff.phone}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-500 text-sm">{staff.lastActive}</TableCell>
                                    <TableCell>
                                        {staff.status === 'active' ? (
                                            <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full w-fit text-xs font-medium">
                                                <CheckCircle2 size={12} />
                                                نشط
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-slate-500 bg-slate-100 px-2 py-1 rounded-full w-fit text-xs font-medium">
                                                <XCircle size={12} />
                                                خامل
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                                                <DropdownMenuItem className="gap-2">
                                                    <Lock size={14} /> تعديل الصلاحيات
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="gap-2">
                                                    <Activity size={14} /> سجل النشاط
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="gap-2 text-red-600">
                                                    تعطيل الحساب
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

            {/* Add Staff Sheet */}
            <Sheet open={showAddStaffSheet} onOpenChange={setShowAddStaffSheet}>
                <SheetContent side="left" className="w-[400px] sm:w-[540px]">
                    <SheetHeader>
                        <SheetTitle className="text-right">إضافة موظف إداري جديد</SheetTitle>
                        <SheetDescription className="text-right">
                            قم بإدخال بيانات الموظف الجديد وتحديد الصلاحيات الممنوحة له.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-8" dir="rtl">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right col-span-1">
                                الاسم
                            </Label>
                            <Input id="name" placeholder="الاسم الكامل" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right col-span-1">
                                البريد
                            </Label>
                            <Input id="email" type="email" placeholder="example@b2souq.com" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="role" className="text-right col-span-1">
                                الدور
                            </Label>
                            <Select>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="اختر الدور الوظيفي" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Super Admin</SelectItem>
                                    <SelectItem value="support">Customer Support</SelectItem>
                                    <SelectItem value="finance">Finance Manager</SelectItem>
                                    <SelectItem value="operations">Operations Specialist</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="2fa" className="text-right col-span-1">
                                الأمان
                            </Label>
                            <div className="col-span-3 flex items-center gap-2">
                                <input type="checkbox" id="2fa" className="rounded border-gray-300" checked readOnly />
                                <span className="text-sm text-slate-600">تفعيل المصادقة الثنائية (2FA) تلقائياً</span>
                            </div>
                        </div>
                    </div>
                    <SheetFooter>
                        <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 w-full">إرسال دعوة الانضمام</Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}
