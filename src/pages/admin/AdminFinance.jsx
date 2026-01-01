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
import { Textarea } from '@/components/ui/textarea';

export default function AdminFinance() {
    const [activeTab, setActiveTab] = useState('withdrawals');
    const [activeSheet, setActiveSheet] = useState(null); // 'transfer_commissions', 'approve_request', 'reject_request'
    const [selectedRequest, setSelectedRequest] = useState(null);

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

    const handleActionClick = (request, sheetType) => {
        setSelectedRequest(request);
        setActiveSheet(sheetType);
    };

    const renderSheetContent = () => {
        if (activeSheet === 'transfer_commissions') {
            return (
                <SheetContent side="left" className="sm:max-w-md">
                    <SheetHeader>
                        <SheetTitle className="text-right">تحويل عمولات</SheetTitle>
                        <SheetDescription className="text-right">
                            إجراء تحويل مالي جديد لتاجر أو شريك.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-6 py-6 px-6 md:px-6" dir="rtl">
                        <div className="grid gap-2">
                            <Label className="text-right">التاجر المستفيد</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="اختر التاجر" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">متجر الإلكترونيات</SelectItem>
                                    <SelectItem value="2">أزياء الموضة</SelectItem>
                                    <SelectItem value="3">بيت الرياضة</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-right">المبلغ (EGP)</Label>
                            <Input type="number" placeholder="0.00" className="text-right" />
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-right">ملاحظات التحويل</Label>
                            <Textarea placeholder="أضف ملاحظات..." className="text-right" />
                        </div>
                    </div>
                    <SheetFooter>
                        <Button onClick={() => { alert("تم بدء التحويل"); setActiveSheet(null); }} className="w-full bg-emerald-600 hover:bg-emerald-700">تأكيد التحويل</Button>
                    </SheetFooter>
                </SheetContent>
            );
        }

        if (activeSheet === 'approve_request' && selectedRequest) {
            return (
                <SheetContent side="left" className="w-[400px] sm:w-[540px]">
                    <SheetHeader>
                        <div className="flex items-center gap-2 mb-2 text-green-600">
                            <CheckCircle size={24} />
                            <SheetTitle className="text-right">موافقة على طلب سحب</SheetTitle>
                        </div>
                        <SheetDescription className="text-right">
                            مراجعة وتأكيد طلب السحب رقم {selectedRequest.id}.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="py-8 px-6 md:px-6 space-y-6" dir="rtl">
                        <div className="bg-slate-50 p-4 rounded-lg space-y-3">
                            <div className="flex justify-between">
                                <span className="text-slate-500">التاجر</span>
                                <span className="font-medium">{selectedRequest.merchant}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">طريقة الدفع</span>
                                <span className="font-medium">{selectedRequest.method}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">تفاصيل الحساب</span>
                                <span className="font-mono">{selectedRequest.account}</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center border p-4 rounded-lg bg-green-50 border-green-100">
                            <span className="text-green-800 font-bold">مبلغ التحويل</span>
                            <span className="text-xl font-bold text-green-700">{selectedRequest.amount}</span>
                        </div>
                    </div>
                    <SheetFooter className="gap-2 flex-col">
                        <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => { alert("تمت الموافقة والتحويل"); setActiveSheet(null); }}>تأكيد وإتمام التحويل</Button>
                        <Button variant="outline" className="w-full" onClick={() => setActiveSheet(null)}>إلغاء</Button>
                    </SheetFooter>
                </SheetContent>
            );
        }

        if (activeSheet === 'reject_request' && selectedRequest) {
            return (
                <SheetContent side="left" className="w-[400px] sm:w-[540px]">
                    <SheetHeader>
                        <div className="flex items-center gap-2 mb-2 text-red-600">
                            <XCircle size={24} />
                            <SheetTitle className="text-right">رفض طلب سحب</SheetTitle>
                        </div>
                        <SheetDescription className="text-right">
                            يرجى تحديد سبب رفض طلب السحب {selectedRequest.id}.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="py-8 px-6 md:px-6 space-y-6" dir="rtl">
                        <div className="grid gap-2">
                            <Label className="text-right">سبب الرفض</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="اختر سبباً" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="insufficient_funds">رصيد غير كافي</SelectItem>
                                    <SelectItem value="incorrect_details">بيانات الدفع غير صحيحة</SelectItem>
                                    <SelectItem value="suspicious_activity">نشاط مشبوه</SelectItem>
                                    <SelectItem value="other">أخرى</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-right">ملاحظات إضافية للتاجر</Label>
                            <Textarea placeholder="اكتب توضيحاً للتاجر..." rows={4} className="text-right" />
                        </div>
                    </div>
                    <SheetFooter className="gap-2 flex-col">
                        <Button variant="destructive" className="w-full" onClick={() => { alert("تم رفض الطلب"); setActiveSheet(null); }}>تأكيد الرفض</Button>
                        <Button variant="outline" className="w-full" onClick={() => setActiveSheet(null)}>إلغاء</Button>
                    </SheetFooter>
                </SheetContent>
            );
        }

        return null;
    }

    return (
        <div className="space-y-6" dir="rtl">
            <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">المالية والمدفوعات</h1>
                    <p className="text-slate-500 mt-1">إدارة المحافظ، طلبات السحب، وعمولات المنصة.</p>
                </div>
                <Button onClick={() => setActiveSheet('transfer_commissions')} className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                    <DollarSign size={18} />
                    تحويل عمولات
                </Button>
            </div>

            <Tabs defaultValue="withdrawals" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full max-w-md grid-cols-3 mb-4 ml-auto">
                    <TabsTrigger value="earnings">أرباح المنصة</TabsTrigger>
                    <TabsTrigger value="wallets">محافظ التجار</TabsTrigger>
                    <TabsTrigger value="withdrawals">طلبات السحب</TabsTrigger>
                </TabsList>

                <TabsContent value="withdrawals">
                    <Card className="border-slate-100 shadow-sm">
                        <CardHeader>
                            <CardTitle>طلبات السحب المعلقة والسابقة</CardTitle>
                            <CardDescription>مراجعة والموافقة على طلبات تحويل الأرباح للتجار</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table dir="rtl">
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
                                                        <DropdownMenuItem onClick={() => handleActionClick(w, 'approve_request')} className="gap-2 text-green-600 cursor-pointer">
                                                            <CheckCircle size={14} /> موافقة وتحويل
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleActionClick(w, 'reject_request')} className="gap-2 text-red-600 cursor-pointer">
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
                            <Table dir="rtl">
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

            {/* Action Sheets */}
            <Sheet open={!!activeSheet} onOpenChange={(open) => !open && setActiveSheet(null)}>
                {renderSheetContent()}
            </Sheet>
        </div>
    );
}
