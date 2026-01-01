import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Box, Truck, CheckCircle, XCircle, MoreHorizontal, FileText, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

export default function AdminOrders() {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') || 'all';
    const activeSheet = searchParams.get('sheet');

    // Keeping data state local for now
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const setTab = (tab) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('tab', tab);
        setSearchParams(newParams);
    };

    const openSheet = (sheet, order = null) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sheet', sheet);
        if (order) {
            setSelectedOrder(order);
        }
        setSearchParams(newParams);
    };

    const closeSheet = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete('sheet');
        setSearchParams(newParams);
        setTimeout(() => setSelectedOrder(null), 300);
    };

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

    // handleActionClick replaced by openSheet

    const renderSheetContent = () => {
        if (activeSheet === 'export_data') {
            return (
                <SheetContent side="left" className="sm:max-w-md">
                    <SheetHeader>
                        <SheetTitle className="text-right">تصدير بيانات الطلبات</SheetTitle>
                        <SheetDescription className="text-right">
                            قم بتحديد تنسيق وفترة التصدير المطلوبة.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-6 py-6 px-6 md:px-6" dir="rtl">
                        <div className="grid gap-2">
                            <Label className="text-right">تنسيق الملف</Label>
                            <Select defaultValue="excel">
                                <SelectTrigger>
                                    <SelectValue placeholder="اختر التنسيق" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                                    <SelectItem value="csv">CSV (.csv)</SelectItem>
                                    <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-right">الفترة الزمنية</Label>
                            <Select defaultValue="last_month">
                                <SelectTrigger>
                                    <SelectValue placeholder="اختر الفترة" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">الكل</SelectItem>
                                    <SelectItem value="last_month">آخر شهر</SelectItem>
                                    <SelectItem value="custom">مخصص</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <SheetFooter>
                        <Button onClick={() => { alert("جاري التصدير..."); closeSheet(); }} className="w-full bg-blue-600 hover:bg-blue-700">تصدير الآن</Button>
                    </SheetFooter>
                </SheetContent>
            );
        }

        if (activeSheet === 'view_invoice' && selectedOrder) {
            return (
                <SheetContent side="left" className="w-[400px] sm:w-[540px]">
                    <SheetHeader>
                        <div className="flex items-center gap-2 mb-2 text-blue-600">
                            <FileText size={24} />
                            <SheetTitle className="text-right">فاتورة الطلب {selectedOrder.id}</SheetTitle>
                        </div>
                        <SheetDescription className="text-right">
                            تفاصيل الفاتورة الإلكترونية للطلب.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="py-8 px-6 md:px-6 space-y-6" dir="rtl">
                        <div className="flex justify-between border-b border-slate-100 pb-4">
                            <span className="text-slate-500">العميل</span>
                            <span className="font-medium text-slate-900">{selectedOrder.customer}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-4">
                            <span className="text-slate-500">التاجر</span>
                            <span className="font-medium text-slate-900">{selectedOrder.merchant}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-4">
                            <span className="text-slate-500">التاريخ</span>
                            <span className="font-medium text-slate-900">{selectedOrder.date}</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg">
                            <span className="text-slate-700 font-bold">الإجمالي</span>
                            <span className="text-xl font-bold text-blue-600">{selectedOrder.total}</span>
                        </div>
                    </div>
                    <SheetFooter className="gap-2 flex-col">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">تحميل الفاتورة PDF</Button>
                        <Button variant="outline" className="w-full" onClick={closeSheet}>إغلاق</Button>
                    </SheetFooter>
                </SheetContent>
            );
        }

        if (activeSheet === 'track_shipment' && selectedOrder) {
            return (
                <SheetContent side="left" className="w-[400px] sm:w-[540px]">
                    <SheetHeader>
                        <div className="flex items-center gap-2 mb-2 text-blue-600">
                            <MapPin size={24} />
                            <SheetTitle className="text-right">تتبع الشحنة</SheetTitle>
                        </div>
                        <SheetDescription className="text-right">
                            حالة الشحن الحالية للطلب {selectedOrder.id}.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="py-8 px-6 md:px-6 space-y-6" dir="rtl">
                        {selectedOrder.tracking ? (
                            <div className="bg-blue-50 text-blue-800 p-4 rounded-lg flex items-center justify-between">
                                <span className="text-sm font-medium">رقم التتبع:</span>
                                <span className="font-bold font-mono tracking-wider">{selectedOrder.tracking}</span>
                            </div>
                        ) : (
                            <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg">
                                هذا الطلب لا يحتوي على رقم تتبع بعد.
                            </div>
                        )}

                        <div className="space-y-6 relative border-r-2 border-slate-100 pr-4 mr-2">
                            <div className="relative">
                                <span className="absolute -right-[21px] top-1 h-3 w-3 rounded-full bg-blue-600 ring-4 ring-white"></span>
                                <h4 className="font-medium text-slate-900 text-sm">تم استلام الطلب</h4>
                                <p className="text-xs text-slate-500 mt-1">{selectedOrder.date} - 10:30 AM</p>
                            </div>
                            <div className="relative">
                                <span className={`absolute -right-[21px] top-1 h-3 w-3 rounded-full ring-4 ring-white ${['processing', 'shipped', 'delivered'].includes(selectedOrder.status) ? 'bg-blue-600' : 'bg-slate-300'}`}></span>
                                <h4 className={`font-medium text-sm ${['processing', 'shipped', 'delivered'].includes(selectedOrder.status) ? 'text-slate-900' : 'text-slate-400'}`}>تجهيز الطلب</h4>
                                <p className="text-xs text-slate-500 mt-1">قيد المعالجة في المستودع</p>
                            </div>
                            <div className="relative">
                                <span className={`absolute -right-[21px] top-1 h-3 w-3 rounded-full ring-4 ring-white ${['shipped', 'delivered'].includes(selectedOrder.status) ? 'bg-blue-600' : 'bg-slate-300'}`}></span>
                                <h4 className={`font-medium text-sm ${['shipped', 'delivered'].includes(selectedOrder.status) ? 'text-slate-900' : 'text-slate-400'}`}>تم الشحن</h4>
                                <p className="text-xs text-slate-500 mt-1">خرج من المستودع للتوصيل</p>
                            </div>
                            <div className="relative">
                                <span className={`absolute -right-[21px] top-1 h-3 w-3 rounded-full ring-4 ring-white ${selectedOrder.status === 'delivered' ? 'bg-green-600' : 'bg-slate-300'}`}></span>
                                <h4 className={`font-medium text-sm ${selectedOrder.status === 'delivered' ? 'text-slate-900' : 'text-slate-400'}`}>تم التوصيل</h4>
                            </div>
                        </div>
                    </div>
                    <SheetFooter>
                        <Button variant="outline" className="w-full" onClick={closeSheet}>إغلاق</Button>
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
                    <h1 className="text-3xl font-bold text-slate-900">إدارة الطلبات</h1>
                    <p className="text-slate-500 mt-1">تتبع دورة حياة الطلبات (جديد، شحن، توصيل) والفواتير.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2 border-slate-200 text-slate-700">
                        <Filter size={16} />
                        تصفية
                    </Button>
                    <Button onClick={() => openSheet('export_data')} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                        <Box size={16} />
                        تصدير البيانات
                    </Button>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setTab}>
                <TabsList className="grid w-full max-w-md grid-cols-2 mb-4 ml-auto">
                    <TabsTrigger value="all">كل الطلبات</TabsTrigger>
                    <TabsTrigger value="new">طلبات جديدة</TabsTrigger>
                </TabsList>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-200">
                        <div className="relative max-w-sm">
                            <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <Input
                                placeholder="رقم الطلب، العميل، أو التاجر..."
                                className="pr-9 text-right border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <Table dir="rtl">
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
                                                <DropdownMenuItem onClick={() => openSheet('view_invoice', order)} className="gap-2 cursor-pointer">
                                                    <FileText size={14} /> عرض الفاتورة
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => openSheet('track_shipment', order)} className="gap-2 cursor-pointer">
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

            {/* Action Sheets */}
            <Sheet open={!!activeSheet} onOpenChange={(open) => !open && closeSheet()}>
                {renderSheetContent()}
            </Sheet>
        </div>
    );
}
