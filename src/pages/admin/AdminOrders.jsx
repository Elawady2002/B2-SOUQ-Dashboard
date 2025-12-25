import { Search, Filter, Box, Truck, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function AdminOrders() {
    // Mock Data
    const orders = [
        { id: '#ORD-5521', customer: 'أحمد محمد', merchant: 'تك ستور', total: 'EGP 15,200', date: '25 ديسمبر 2025', status: 'processing' },
        { id: '#ORD-5520', customer: 'سارة علي', merchant: 'أزياء الموضة', total: 'EGP 850', date: '24 ديسمبر 2025', status: 'shipped' },
        { id: '#ORD-5519', customer: 'خالد عمر', merchant: 'بيت الرياضة', total: 'EGP 4,500', date: '24 ديسمبر 2025', status: 'delivered' },
        { id: '#ORD-5518', customer: 'منى يوسف', merchant: 'سامي للأدوات', total: 'EGP 3,200', date: '23 ديسمبر 2025', status: 'cancelled' },
    ];

    return (
        <div className="space-y-6" dir="rtl">
            <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">الطلبات</h1>
                    <p className="text-slate-500 mt-1">متابعة جميع الطلبات عبر المنصة.</p>
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

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200">
                    <div className="relative max-w-sm">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <Input
                            placeholder="رقم الطلب، العميل، أو التاجر..."
                            className="pr-9 border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                        />
                    </div>
                </div>

                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="text-right">رقم الطلب</TableHead>
                            <TableHead className="text-right">العميل</TableHead>
                            <TableHead className="text-right">التاجر</TableHead>
                            <TableHead className="text-right">التاريخ</TableHead>
                            <TableHead className="text-right">الإجمالي</TableHead>
                            <TableHead className="text-right">الحالة</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id} className="hover:bg-slate-50/50">
                                <TableCell className="font-medium text-blue-600">{order.id}</TableCell>
                                <TableCell className="text-slate-700">{order.customer}</TableCell>
                                <TableCell className="text-slate-600">{order.merchant}</TableCell>
                                <TableCell className="text-slate-500">{order.date}</TableCell>
                                <TableCell className="font-bold text-slate-900">{order.total}</TableCell>
                                <TableCell>
                                    {order.status === 'processing' && <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0 gap-1"><Box size={12} /> قيد التجهيز</Badge>}
                                    {order.status === 'shipped' && <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-0 gap-1"><Truck size={12} /> تم الشحن</Badge>}
                                    {order.status === 'delivered' && <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0 gap-1"><CheckCircle size={12} /> تم التوصيل</Badge>}
                                    {order.status === 'cancelled' && <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-0">ملغي</Badge>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
