import { useState } from 'react';
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
    CheckSquare
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminMerchants() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('active');

    // Mock Data
    const merchants = [
        { id: 1, name: 'أحمد محمد', store: 'متجر الإلكترونيات', email: 'ahmed@example.com', sales: 'EGP 124,000', wallet: 'EGP 12,500', status: 'active', kyc: 'verified', violations: 0 },
        { id: 2, name: 'سارة علي', store: 'أزياء الموضة', email: 'sara@example.com', sales: 'EGP 98,500', wallet: 'EGP 8,200', status: 'active', kyc: 'verified', violations: 0 },
        { id: 3, name: 'خالد عمر', store: 'مستلزمات رياضية', email: 'khaled@example.com', sales: 'EGP 45,000', wallet: 'EGP 1,500', status: 'warning', kyc: 'pending', violations: 2 },
        { id: 4, name: 'منى حسن', store: 'ديكور منزلي', email: 'mona@example.com', sales: 'EGP 12,000', wallet: 'EGP 0', status: 'banned', kyc: 'rejected', violations: 5 },
        { id: 5, name: 'يوسف كمال', store: 'ألعاب أطفال', email: 'yousef@example.com', sales: 'EGP 0', wallet: 'EGP 0', status: 'pending', kyc: 'submitted', violations: 0 },
    ];

    const filteredMerchants = merchants.filter(m =>
        (activeTab === 'active' && ['active', 'warning'].includes(m.status)) ||
        (activeTab === 'pending' && m.status === 'pending') ||
        (activeTab === 'banned' && m.status === 'banned')
    );

    return (
        <div className="space-y-6" dir="rtl">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">إدارة التجار</h1>
                    <p className="text-slate-500 mt-1">مراجعة طلبات الانضمام، مراقبة المحافظ، وسجلات المخالفات.</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <Mail className="ml-2 h-4 w-4" />
                    مراسلة الجميع
                </Button>
            </div>

            <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-3 mb-4">
                    <TabsTrigger value="active">التجار النشطين</TabsTrigger>
                    <TabsTrigger value="pending">طلبات الانضمام (KYC)</TabsTrigger>
                    <TabsTrigger value="banned">المحظورين</TabsTrigger>
                </TabsList>

                <Card className="border-slate-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
                        <div className="flex items-center gap-2">
                            <div className="relative w-64">
                                <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="بحث عن تاجر..."
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
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-right">التاجر / المتجر</TableHead>
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
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarFallback className="bg-slate-100 text-slate-600">
                                                        {merchant.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium text-slate-900">{merchant.store}</div>
                                                    <div className="text-xs text-slate-500">{merchant.name}</div>
                                                </div>
                                            </div>
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
                                                    <DropdownMenuItem className="gap-2">
                                                        <Eye size={14} /> الملف الشخصي
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-2">
                                                        <FileText size={14} /> مستندات KYC
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-2">
                                                        <Wallet size={14} /> سجل المحفظة
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="gap-2 text-red-600">
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
        </div>
    );
}
