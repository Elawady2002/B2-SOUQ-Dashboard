import { useState } from 'react';
import {
    Wallet,
    ArrowUpRight,
    ArrowDownLeft,
    DollarSign,
    Filter,
    CheckCircle,
    XCircle,
    MoreHorizontal,
    FileText,
    CreditCard,
    Building
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function AdminFinance() {
    const [activeTab, setActiveTab] = useState('withdrawals');

    // Mock Data
    const withdrawals = [
        { id: 'W-9921', merchant: 'متجر الإلكترونيات', amount: 'EGP 5,000', method: 'Bank Transfer', account: '**** 1234', date: '27/12/2025', status: 'pending' },
        { id: 'W-9920', merchant: 'أزياء الموضة', amount: 'EGP 2,500', method: 'Vodafone Cash', account: '01012345678', date: '26/12/2025', status: 'approved' },
        { id: 'W-9919', merchant: 'بيت الرياضة', amount: 'EGP 15,000', method: 'Bank Transfer', account: '**** 9876', date: '25/12/2025', status: 'rejected' },
    ];

    const wallets = [
        { id: 1, merchant: 'متجر الإلكترونيات', available: 'EGP 12,500', pending: 'EGP 4,200', total_withdrawn: 'EGP 55,000' },
        { id: 2, merchant: 'أزياء الموضة', available: 'EGP 8,200', pending: 'EGP 1,900', total_withdrawn: 'EGP 22,000' },
        { id: 3, merchant: 'سامي للأدوات', available: 'EGP 1,500', pending: 'EGP 300', total_withdrawn: 'EGP 5,000' },
    ];

    return (
        <div className="space-y-6" dir="rtl">
            <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">المالية والمدفوعات</h1>
                    <p className="text-slate-500 mt-1">إدارة المحافظ، طلبات السحب، وعمولات المنصة.</p>
                </div>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                    <DollarSign size={18} />
                    تحويل عمولات
                </Button>
            </div>

            <Tabs defaultValue="withdrawals" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full max-w-md grid-cols-3 mb-4">
                    <TabsTrigger value="withdrawals">طلبات السحب</TabsTrigger>
                    <TabsTrigger value="wallets">محافظ التجار</TabsTrigger>
                    <TabsTrigger value="earnings">أرباح المنصة</TabsTrigger>
                </TabsList>

                <TabsContent value="withdrawals">
                    <Card className="border-slate-100 shadow-sm">
                        <CardHeader>
                            <CardTitle>طلبات السحب المعلقة والسابقة</CardTitle>
                            <CardDescription>مراجعة والموافقة على طلبات تحويل الأرباح للتجار</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-right">رقم الطلب</TableHead>
                                        <TableHead className="text-right">التاجر</TableHead>
                                        <TableHead className="text-right">المبلغ</TableHead>
                                        <TableHead className="text-right">طريقة الدفع</TableHead>
                                        <TableHead className="text-right">التاريخ</TableHead>
                                        <TableHead className="text-right">الحالة</TableHead>
                                        <TableHead className="text-right w-[50px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {withdrawals.map((w) => (
                                        <TableRow key={w.id}>
                                            <TableCell className="font-mono text-slate-500">{w.id}</TableCell>
                                            <TableCell className="font-medium">{w.merchant}</TableCell>
                                            <TableCell className="font-bold text-slate-900">{w.amount}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-slate-900">{w.method}</span>
                                                    <span className="text-xs text-slate-500 font-mono">{w.account}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-slate-500">{w.date}</TableCell>
                                            <TableCell>
                                                {w.status === 'pending' && <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-0">قيد المراجعة</Badge>}
                                                {w.status === 'approved' && <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0">تم الموافقة</Badge>}
                                                {w.status === 'rejected' && <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-0">مرفوض</Badge>}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0 text-slate-500">
                                                            <MoreHorizontal size={16} />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>إجراءات</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="gap-2 text-green-600 cursor-pointer">
                                                            <CheckCircle size={14} /> موافقة وتحويل
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="gap-2 text-red-600 cursor-pointer">
                                                            <XCircle size={14} /> رفض الطلب
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
                </TabsContent>

                <TabsContent value="wallets">
                    <Card className="border-slate-100 shadow-sm">
                        <CardHeader>
                            <CardTitle>أرصدة محافظ التجار</CardTitle>
                            <CardDescription>نظرة عامة على الأرصدة القابلة للسحب والمعلقة لكل تاجر.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-right">التاجر</TableHead>
                                        <TableHead className="text-right">رصيد قابل للسحب</TableHead>
                                        <TableHead className="text-right">رصيد معلق</TableHead>
                                        <TableHead className="text-right">إجمالي المسحوبات</TableHead>
                                        <TableHead className="text-right w-[50px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {wallets.map((wallet) => (
                                        <TableRow key={wallet.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar>
                                                        <AvatarFallback className="bg-slate-100 text-slate-600">
                                                            {wallet.merchant.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="font-medium text-slate-900">{wallet.merchant}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-bold text-emerald-600">{wallet.available}</TableCell>
                                            <TableCell className="text-slate-600">{wallet.pending}</TableCell>
                                            <TableCell className="text-slate-500">{wallet.total_withdrawn}</TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="sm">
                                                    <FileText size={16} />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="earnings">
                    <Card className="border-slate-100 shadow-sm">
                        <CardHeader>
                            <CardTitle>سجل العمولات والأرباح</CardTitle>
                            <CardDescription>تتبع عوائد المنصة من العمليات والإعلانات.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center py-12 text-slate-400">
                            <div className="text-center">
                                <DollarSign size={48} className="mx-auto mb-4 opacity-50" />
                                <p>لا توجد بيانات للأرباح في الفترة الحالية</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
