import { useState } from 'react';
import { Search, Filter, Box, Truck, CheckCircle, XCircle, MoreHorizontal, FileText, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminOrders() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    // Mock Data
    const orders = [
        { id: '#ORD-5521', customer: 'أحمد محمد', merchant: 'تك ستور', total: 'EGP 15,200', date: '25 ديسمبر 2025', status: 'new' },
        { id: '#ORD-5520', customer: 'سارة علي', merchant: 'أزياء الموضة', total: 'EGP 850', date: '24 ديسمبر 2025', status: 'shipped', tracking: 'TRK-9921' },
        { id: '#ORD-5519', customer: 'خالد عمر', merchant: 'بيت الرياضة', total: 'EGP 4,500', date: '24 ديسمبر 2025', status: 'delivered', tracking: 'TRK-8812' },
        { id: '#ORD-5518', customer: 'منى يوسف', merchant: 'سامي للأدوات', total: 'EGP 3,200', date: '23 ديسمبر 2025', status: 'cancelled' },
        { id: '#ORD-5517', customer: 'ياسر كمال', merchant: 'عالم التقنية', total: 'EGP 1,200', date: '23 ديسمبر 2025', status: 'processing' },
    ];

    const filteredOrders = orders.filter(o => {
        if (activeTab === 'all') return true;
        if (activeTab === 'new') return o.status === 'new';
        return true;
    });

    return (
        <div className="space-y-6" dir="rtl">
            <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">إدارة الطلبات</h1>
                    <p className="text-slate-500 mt-1">تتبع دورة حياة الطلبات (جديد، شحن، توصيل) والفواتير.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2 border-slate-200 text-slate-700">
                        <Filter size={16} />
                        تصفية
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                        <Box size={16} />
                        تصدير البيانات
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full max-w-md grid-cols-2 mb-4">
                    <TabsTrigger value="all">كل الطلبات</TabsTrigger>
                    <TabsTrigger value="new">طلبات جديدة</TabsTrigger>
                </TabsList>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-200">
                        <div className="relative max-w-sm">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <Input
                                placeholder="رقم الطلب، العميل، أو التاجر..."
                                className="pr-9 border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <Table>
                        <TableHeader className="bg-slate-50">
                            <TableRow>
                                <TableHead className="text-right">رقم الطلب</TableHead>
                                <TableHead className="text-right">بيانات العميل & التاجر</TableHead>
                                <TableHead className="text-right">التاريخ</TableHead>
                                <TableHead className="text-right">الإجمالي</TableHead>
                                <TableHead className="text-right">الحالة</TableHead>
                                <TableHead className="text-right w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders.map((order) => (
                                <TableRow key={order.id} className="hover:bg-slate-50/50">
                                    <TableCell className="font-medium text-blue-600">{order.id}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-slate-900 font-medium text-sm">{order.customer}</span>
                                            <span className="text-slate-500 text-xs mt-0.5">التاجر: {order.merchant}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-500 text-sm">{order.date}</TableCell>
                                    <TableCell className="font-bold text-slate-900">{order.total}</TableCell>
                                    <TableCell>
                                        {order.status === 'new' && <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-0 gap-1"><Clock size={12} /> جديد</Badge>}
                                        {order.status === 'processing' && <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0 gap-1"><Box size={12} /> قيد التجهيز</Badge>}
                                        {order.status === 'shipped' && <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-0 gap-1"><Truck size={12} /> تم الشحن</Badge>}
                                        {order.status === 'delivered' && <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0 gap-1"><CheckCircle size={12} /> تم التوصيل</Badge>}
                                        {order.status === 'cancelled' && <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-0"><XCircle size={12} className="mr-1" /> ملغي</Badge>}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 text-slate-500">
                                                    <MoreHorizontal size={16} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>إجراءات الطلب</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="gap-2 cursor-pointer">
                                                    <FileText size={14} /> عرض الفاتورة
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="gap-2 cursor-pointer">
                                                    <MapPin size={14} /> تتبع الشحنة
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Tabs>
        </div>
    );
}
