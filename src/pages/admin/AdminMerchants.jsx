import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    Search,
    Filter,
    MoreHorizontal,
    ShieldAlert,
    CheckCircle,
    XCircle,
    Eye,
    Mail,
    FileText,
    Wallet,
    AlertTriangle,
    CheckCircle2,
    Send
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function AdminMerchants() {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') || 'active';
    const activeSheet = searchParams.get('sheet');

    // Keeping data state local for now
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMerchant, setSelectedMerchant] = useState(null);

    const setTab = (tab) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('tab', tab);
        setSearchParams(newParams);
    };

    const openSheet = (sheet, merchant = null) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sheet', sheet);
        if (merchant) {
            setSelectedMerchant(merchant);
        }
        setSearchParams(newParams);
    };

    const closeSheet = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete('sheet');
        setSearchParams(newParams);
        setTimeout(() => setSelectedMerchant(null), 300);
    };

    // Mock Data
    const merchants = [
        { id: 1, name: 'أحمد محمد', store: 'متجر الإلكترونيات', email: 'ahmed@example.com', phone: '+20 123 456 7890', sales: 'EGP 124,000', wallet: 'EGP 12,500', status: 'active', kyc: 'verified', violations: 0, joinDate: '2023-01-15' },
        { id: 2, name: 'سارة علي', store: 'أزياء الموضة', email: 'sara@example.com', phone: '+20 100 987 6543', sales: 'EGP 98,500', wallet: 'EGP 8,200', status: 'active', kyc: 'verified', violations: 0, joinDate: '2023-03-22' },
        { id: 3, name: 'خالد عمر', store: 'مستلزمات رياضية', email: 'khaled@example.com', phone: '+20 111 222 3333', sales: 'EGP 45,000', wallet: 'EGP 1,500', status: 'warning', kyc: 'pending', violations: 2, joinDate: '2023-05-10' },
        { id: 4, name: 'منى حسن', store: 'ديكور منزلي', email: 'mona@example.com', phone: '+20 155 555 5555', sales: 'EGP 12,000', wallet: 'EGP 0', status: 'banned', kyc: 'rejected', violations: 5, joinDate: '2023-06-01' },
        { id: 5, name: 'يوسف كمال', store: 'ألعاب أطفال', email: 'yousef@example.com', phone: '+20 122 333 4444', sales: 'EGP 0', wallet: 'EGP 0', status: 'pending', kyc: 'submitted', violations: 0, joinDate: '2023-08-20' },
    ];

    const filteredMerchants = merchants.filter(m =>
        (activeTab === 'active' && ['active', 'warning'].includes(m.status)) ||
        (activeTab === 'pending' && m.status === 'pending') ||
        (activeTab === 'banned' && m.status === 'banned')
    );

    const renderSheetContent = () => {
        if (activeSheet === 'message_all') {
            return (
                <SheetContent side="left" className="sm:max-w-md">
                    <SheetHeader className="mb-6">
                        <div className="flex items-center gap-2 text-blue-600 mb-2">
                            <Mail size={24} />
                            <SheetTitle className="text-xl">إرسال رسالة لجميع التجار</SheetTitle>
                        </div>
                        <SheetDescription>
                            سيتم إرسال هذه الرسالة إلى جميع التجار النشطين في المنصة عبر البريد الإلكتروني والإشعارات.
                        </SheetDescription>
                    </SheetHeader>
                    {/* Added px-6 for padding */}
                    <div className="grid gap-6 py-4 px-6 md:px-6">
                        <div className="grid gap-2">
                            <Label htmlFor="subject" className="text-sm font-medium text-slate-700 text-right">عنوان الرسالة</Label>
                            <Input id="subject" placeholder="مثال: تحديثات هامة بخصوص السياسات الجديدة" className="h-10 text-right" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="message" className="text-sm font-medium text-slate-700 text-right">نص الرسالة</Label>
                            <Textarea id="message" placeholder="اكتب نص الرسالة هنا..." rows={12} className="resize-none text-right" />
                        </div>
                    </div>
                    <SheetFooter className="mt-4">
                        <Button type="submit" onClick={() => { alert("تم إرسال الرسالة بنجاح!"); closeSheet(); }} className="w-full bg-blue-600 hover:bg-blue-700 h-11 text-lg">
                            <Send className="ml-2 h-4 w-4" /> إرسال الرسالة
                        </Button>
                    </SheetFooter>
                </SheetContent>
            );
        }


        if (!selectedMerchant) return null;

        if (activeSheet === 'profile') {
            return (
                <SheetContent side="left" className="sm:max-w-md">
                    <SheetHeader className="mb-6">
                        <div className="flex items-center gap-2 text-slate-900 mb-2">
                            <Eye size={24} />
                            <SheetTitle className="text-xl">الملف الشخصي</SheetTitle>
                        </div>
                        <SheetDescription>بيانات التاجر المسجلة في النظام.</SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-col items-center mb-6">
                        <Avatar className="h-20 w-20 mb-3">
                            <AvatarFallback className="bg-slate-100 text-slate-600 text-2xl">
                                {selectedMerchant.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>
                        <h3 className="text-lg font-bold">{selectedMerchant.name}</h3>
                        <span className="text-slate-500">{selectedMerchant.store}</span>
                    </div>
                    <div className="space-y-4">
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <Label className="text-xs text-slate-500">البريد الإلكتروني</Label>
                            <p className="font-medium text-slate-900 mt-1" dir="ltr">{selectedMerchant.email}</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <Label className="text-xs text-slate-500">رقم الهاتف</Label>
                            <p className="font-medium text-slate-900 mt-1" dir="ltr">{selectedMerchant.phone}</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <Label className="text-xs text-slate-500">تاريخ الانضمام</Label>
                            <p className="font-medium text-slate-900 mt-1">{selectedMerchant.joinDate}</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <Label className="text-xs text-slate-500">الحالة</Label>
                            <div className="mt-1">
                                {selectedMerchant.status === 'active' && <Badge className="bg-green-100 text-green-700">نشط</Badge>}
                                {selectedMerchant.status === 'warning' && <Badge className="bg-orange-100 text-orange-700">تحذير</Badge>}
                                {selectedMerchant.status === 'banned' && <Badge className="bg-red-100 text-red-700">محظور</Badge>}
                                {selectedMerchant.status === 'pending' && <Badge className="bg-blue-100 text-blue-700">قيد الانتظار</Badge>}
                            </div>
                        </div>
                    </div>
                </SheetContent>
            );
        }

        if (activeSheet === 'kyc') {
            return (
                <SheetContent side="left" className="sm:max-w-md">
                    <SheetHeader className="mb-6">
                        <div className="flex items-center gap-2 text-slate-900 mb-2">
                            <FileText size={24} />
                            <SheetTitle className="text-xl">مستندات التوثيق (KYC)</SheetTitle>
                        </div>
                        <SheetDescription>مراجعة وحالة المستندات القانونية.</SheetDescription>
                    </SheetHeader>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">السجل التجاري</p>
                                    <p className="text-xs text-slate-500">PDF • 2.4 MB</p>
                                </div>
                            </div>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">معتمد</Badge>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">البطاقة الضريبية</p>
                                    <p className="text-xs text-slate-500">IMG • 1.1 MB</p>
                                </div>
                            </div>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">معتمد</Badge>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">بطاقة الهوية</p>
                                    <p className="text-xs text-slate-500">IMG • 3.5 MB</p>
                                </div>
                            </div>
                            {selectedMerchant.kyc === 'verified' ?
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">معتمد</Badge> :
                                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">قيد المراجعة</Badge>
                            }
                        </div>
                    </div>
                </SheetContent>
            );
        }

        if (activeSheet === 'wallet') {
            return (
                <SheetContent side="left" className="sm:max-w-md">
                    <SheetHeader className="mb-6">
                        <div className="flex items-center gap-2 text-slate-900 mb-2">
                            <Wallet size={24} />
                            <SheetTitle className="text-xl">سجل المحفظة</SheetTitle>
                        </div>
                        <SheetDescription>ملخص العمليات المالية والمبيعات.</SheetDescription>
                    </SheetHeader>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100 text-center">
                            <span className="text-xs text-emerald-600 block mb-1">الرصيد الحالي</span>
                            <span className="text-xl font-bold text-emerald-700">{selectedMerchant.wallet}</span>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-center">
                            <span className="text-xs text-blue-600 block mb-1">إجمالي المبيعات</span>
                            <span className="text-md font-bold text-blue-700">{selectedMerchant.sales}</span>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label className="text-sm font-medium mb-2 block">آخر العمليات</Label>
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg transition-colors border-b last:border-0 border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                        <CheckCircle2 size={16} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">سحب رصيد</p>
                                        <p className="text-xs text-slate-500">#{1000 + i} • منذ يومين</p>
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-slate-900">- EGP 1,200</span>
                            </div>
                        ))}
                    </div>
                </SheetContent>
            );
        }

        if (activeSheet === 'violation') {
            return (
                <SheetContent side="left" className="sm:max-w-md">
                    <SheetHeader className="mb-6">
                        <div className="flex items-center gap-2 text-red-600 mb-2">
                            <AlertTriangle size={24} />
                            <SheetTitle className="text-xl">تسجيل مخالفة</SheetTitle>
                        </div>
                        <SheetDescription>
                            إضافة مخالفة جديدة على التاجر <span className="font-bold">{selectedMerchant.name}</span>.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-6 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="v_title" className="text-sm font-medium text-slate-700 text-right">نوع المخالفة</Label>
                            <Input id="v_title" placeholder="مثال: بيع منتجات مقلدة" className="h-10 text-right" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="v_desc" className="text-sm font-medium text-slate-700 text-right">تفاصيل المخالفة</Label>
                            <Textarea id="v_desc" placeholder="اشرح تفاصيل المخالفة والأدلة..." rows={6} className="resize-none text-right" />
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-sm font-medium text-slate-700">الإجراء المتخذ</Label>
                            <div className="flex gap-2 mt-1">
                                <Button variant="outline" className="flex-1 border-slate-200 hover:bg-slate-50 hover:text-slate-900">توجيه إنذار</Button>
                                <Button variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 bg-red-50/50">حظر مؤقت</Button>
                            </div>
                        </div>
                    </div>
                    <SheetFooter className="mt-4">
                        <Button type="submit" onClick={() => { alert("تم تسجيل المخالفة!"); closeSheet(); }} className="w-full bg-red-600 hover:bg-red-700 h-11 text-lg">
                            تسجيل المخالفة
                        </Button>
                    </SheetFooter>
                </SheetContent>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6" dir="rtl">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">إدارة التجار</h1>
                    <p className="text-slate-500 mt-1">مراجعة طلبات الانضمام، مراقبة المحافظ وسجلات المخالفات.</p>
                </div>
                {/* Button actions handled by state now, no wrapper needed */}
                <Button onClick={() => openSheet('message_all')} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                    <Mail size={16} /> مراسلة الجميع
                </Button>
            </div>

            <Tabs defaultValue="active" value={activeTab} onValueChange={setTab} className="w-full">
                <TabsList className="grid max-w-md grid-cols-3 mb-4 ml-auto">
                    <TabsTrigger value="banned">المحظورين</TabsTrigger>
                    <TabsTrigger value="pending">طلبات الانضمام (KYC)</TabsTrigger>
                    <TabsTrigger value="active">التجار النشطين</TabsTrigger>
                </TabsList>

                <Card className="border-slate-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
                        <div className="flex items-center gap-2">
                            <div className="relative w-64">
                                <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="بحث عن تاجر..."
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
                    </CardHeader>
                    <CardContent>
                        <Table dir="rtl">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-right">التاجر</TableHead>
                                    <TableHead className="text-right">المتجر</TableHead>
                                    <TableHead className="text-right">توثيق KYC</TableHead>
                                    <TableHead className="text-right">رصيد المحفظة</TableHead>
                                    <TableHead className="text-right">المبيعات</TableHead>
                                    <TableHead className="text-right">المخالفات</TableHead>
                                    <TableHead className="text-right">الحالة</TableHead>
                                    <TableHead className="text-right w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredMerchants.map((merchant) => (
                                    <TableRow key={merchant.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback className="bg-slate-100 text-slate-600 text-xs">
                                                        {merchant.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm font-medium text-slate-700">{merchant.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-medium text-slate-900">{merchant.store}</span>
                                        </TableCell>
                                        <TableCell>
                                            {merchant.kyc === 'verified' && <Badge variant="outline" className="text-emerald-700 bg-emerald-50 border-emerald-200">موثق</Badge>}
                                            {merchant.kyc === 'pending' && <Badge variant="outline" className="text-orange-700 bg-orange-50 border-orange-200">مراجعة</Badge>}
                                            {merchant.kyc === 'submitted' && <Badge variant="outline" className="text-blue-700 bg-blue-50 border-blue-200">جديد</Badge>}
                                            {merchant.kyc === 'rejected' && <Badge variant="outline" className="text-red-700 bg-red-50 border-red-200">مرفوض</Badge>}
                                        </TableCell>
                                        <TableCell className="font-medium text-slate-700">
                                            <div className="flex items-center gap-1">
                                                <Wallet size={14} className="text-slate-400" />
                                                {merchant.wallet}
                                            </div>
                                        </TableCell>
                                        <TableCell>{merchant.sales}</TableCell>
                                        <TableCell>
                                            {merchant.violations > 0 ? (
                                                <Badge variant="destructive" className="bg-red-50 text-red-600 hover:bg-red-100 border-red-100">
                                                    {merchant.violations} مخالفات
                                                </Badge>
                                            ) : (
                                                <span className="text-xs text-slate-400">لا يوجد</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {merchant.status === 'active' && <Badge className="bg-green-100 text-green-700 hover:bg-green-200">نشط</Badge>}
                                            {merchant.status === 'warning' && <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">تحذير</Badge>}
                                            {merchant.status === 'banned' && <Badge className="bg-red-100 text-red-700 hover:bg-red-200">محظور</Badge>}
                                            {merchant.status === 'pending' && <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">قيد الانتظار</Badge>}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>إجراءات</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => openSheet('profile', merchant)} className="gap-2 cursor-pointer">
                                                        <Eye size={14} /> الملف الشخصي
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => openSheet('kyc', merchant)} className="gap-2 cursor-pointer">
                                                        <FileText size={14} /> مستندات KYC
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => openSheet('wallet', merchant)} className="gap-2 cursor-pointer">
                                                        <Wallet size={14} /> سجل المحفظة
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => openSheet('violation', merchant)} className="gap-2 text-red-600 cursor-pointer">
                                                        <AlertTriangle size={14} /> تسجيل مخالفة
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
            </Tabs>

            {/* Controlled Sheet for all actions */}
            <Sheet open={!!activeSheet} onOpenChange={(open) => !open && closeSheet()}>
                {renderSheetContent()}
            </Sheet>


        </div>
    );
}
