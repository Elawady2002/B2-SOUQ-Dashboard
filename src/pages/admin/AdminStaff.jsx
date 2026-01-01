import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
    const [searchParams, setSearchParams] = useSearchParams();
    const activeSheet = searchParams.get('sheet');

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStaff, setSelectedStaff] = useState(null);

    const openSheet = (sheet, staff = null) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sheet', sheet);
        if (staff) {
            setSelectedStaff(staff);
        }
        setSearchParams(newParams);
    };

    const closeSheet = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete('sheet');
        setSearchParams(newParams);
        setTimeout(() => setSelectedStaff(null), 300);
    };

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

    const renderSheetContent = () => {
        if (activeSheet === 'add_staff') {
            return (
                <SheetContent side="left" className="w-[400px] sm:w-[540px]">
                    <SheetHeader>
                        <SheetTitle className="text-right">إضافة موظف إداري جديد</SheetTitle>
                        <SheetDescription className="text-right">
                            قم بإدخال بيانات الموظف الجديد وتحديد الصلاحيات الممنوحة له.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-8 px-6 md:px-6" dir="rtl">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right col-span-1">
                                الاسم
                            </Label>
                            <Input id="name" placeholder="الاسم الكامل" className="col-span-3 text-right" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right col-span-1">
                                البريد
                            </Label>
                            <Input id="email" type="email" placeholder="example@b2souq.com" className="col-span-3 text-right" />
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
                        <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 w-full" onClick={() => { alert("تم إضافة الموظف"); closeSheet(); }}>إرسال دعوة الانضمام</Button>
                    </SheetFooter>
                </SheetContent>
            );
        }

        if (!selectedStaff) return null;

        if (activeSheet === 'edit_permissions') {
            return (
                <SheetContent side="left" className="w-[400px] sm:w-[540px]">
                    <SheetHeader>
                        <SheetTitle className="text-right">تعديل الصلاحيات</SheetTitle>
                        <SheetDescription className="text-right">
                            تعديل الدور الوظيفي والصلاحيات للموظف <span className="font-bold">{selectedStaff.name}</span>.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-6 py-8 px-6 md:px-6" dir="rtl">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right col-span-1">الدور الحالي</Label>
                            <Select defaultValue="support">
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder={selectedStaff.role} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Super Admin</SelectItem>
                                    <SelectItem value="support">Customer Support</SelectItem>
                                    <SelectItem value="finance">Finance Manager</SelectItem>
                                    <SelectItem value="operations">Operations Specialist</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-4">
                            <Label className="text-right block">صلاحيات إضافية</Label>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="p1" className="rounded border-gray-300" defaultChecked />
                                <Label htmlFor="p1" className="text-sm font-normal">إدارة المستخدمين</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="p2" className="rounded border-gray-300" />
                                <Label htmlFor="p2" className="text-sm font-normal">الوصول للتقارير المالية</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="p3" className="rounded border-gray-300" defaultChecked />
                                <Label htmlFor="p3" className="text-sm font-normal">تعديل المحتوى</Label>
                            </div>
                        </div>
                    </div>
                    <SheetFooter>
                        <Button onClick={() => { alert("تم حفظ التعديلات"); closeSheet(); }} className="bg-blue-600 text-white hover:bg-blue-700 w-full">حفظ التغييرات</Button>
                    </SheetFooter>
                </SheetContent>
            );
        }

        if (activeSheet === 'activity_log') {
            return (
                <SheetContent side="left" className="w-[400px] sm:w-[540px]">
                    <SheetHeader>
                        <SheetTitle className="text-right">سجل النشاط</SheetTitle>
                        <SheetDescription className="text-right">
                            آخر نشاطات الموظف <span className="font-bold">{selectedStaff.name}</span> على النظام.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="py-8 px-6 md:px-6 space-y-4" dir="rtl">
                        {[1, 2, 3, 4].map((_, i) => (
                            <div key={i} className="flex gap-3 pb-4 border-b last:border-0 border-slate-100">
                                <Activity size={18} className="text-blue-500 mt-1" />
                                <div>
                                    <p className="text-sm font-medium text-slate-900">قام بتحديث حالة الطلب #123{i}5</p>
                                    <p className="text-xs text-slate-500">منذ {i + 2} ساعات</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <SheetFooter>
                        <Button variant="outline" onClick={closeSheet} className="w-full">إغلاق</Button>
                    </SheetFooter>
                </SheetContent>
            );
        }

        if (activeSheet === 'disable_account') {
            return (
                <SheetContent side="left" className="w-[400px] sm:w-[540px]">
                    <SheetHeader>
                        <SheetTitle className="text-right text-red-600 flex items-center gap-2 justify-end">
                            <XCircle size={24} />
                            تعطيل الحساب
                        </SheetTitle>
                        <SheetDescription className="text-right">
                            هل أنت متأكد من رغبتك في تعطيل حساب الموظف <span className="font-bold">{selectedStaff.name}</span>؟
                        </SheetDescription>
                    </SheetHeader>
                    <div className="py-8 px-6 md:px-6" dir="rtl">
                        <div className="bg-red-50 p-4 rounded-lg border border-red-100 text-red-800 text-sm">
                            <p className="font-bold mb-1">تحذير:</p>
                            ستفقد الموظف إمكانية الوصول للنظام فوراً. يمكن إعادة تفعيل الحساب لاحقاً من قبل الأدمن فقط.
                        </div>
                    </div>
                    <SheetFooter className="flex-col gap-2">
                        <Button variant="destructive" onClick={() => { alert("تم تعطيل الحساب"); closeSheet(); }} className="w-full bg-red-600 hover:bg-red-700">تأكيد التعطيل</Button>
                        <Button variant="ghost" onClick={closeSheet} className="w-full">إلغاء</Button>
                    </SheetFooter>
                </SheetContent>
            );
        }

        return null;
    }

    return (
        <div className="space-y-6" dir="rtl">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">إدارة الموظفين والصلاحيات</h1>
                    <p className="text-slate-500 mt-1">فريق عمل المنصة وإدارة الأدوار.</p>
                </div>
                <Button onClick={() => openSheet('add_staff')} className="bg-blue-600 hover:bg-blue-700 gap-2">
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
                                className="pr-9 text-right"
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
                    <Table dir="rtl">
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
                                                <DropdownMenuItem onClick={() => openSheet('edit_permissions', staff)} className="gap-2 cursor-pointer">
                                                    <Lock size={14} /> تعديل الصلاحيات
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => openSheet('activity_log', staff)} className="gap-2 cursor-pointer">
                                                    <Activity size={14} /> سجل النشاط
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => openSheet('disable_account', staff)} className="gap-2 text-red-600 cursor-pointer">
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

            <Sheet open={!!activeSheet} onOpenChange={(open) => !open && closeSheet()}>
                {renderSheetContent()}
            </Sheet>
        </div>
    );
}
