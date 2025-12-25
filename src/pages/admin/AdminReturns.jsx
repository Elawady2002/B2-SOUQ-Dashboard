import { Search, RotateCcw, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function AdminReturns() {
    // Mock Data
    const returns = [
        { id: '#RET-901', order: '#ORD-5510', customer: 'محمود حسن', merchant: 'تك ستور', reason: 'المنتج معيب', status: 'pending' },
        { id: '#RET-902', order: '#ORD-5490', customer: 'نادية كمال', merchant: 'أزياء الموضة', reason: 'المقاس غير مناسب', status: 'approved' },
        { id: '#RET-903', order: '#ORD-5400', customer: 'كريم سامي', merchant: 'بيت الرياضة', reason: 'تغيير رأي', status: 'rejected' },
    ];

    return (
        <div className="space-y-6" dir="rtl">
            <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">المرتجعات</h1>
                    <p className="text-slate-500 mt-1">إدارة وفض نزاعات المرتجعات بين البائع والمشتري.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200">
                    <div className="relative max-w-sm">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <Input
                            placeholder="بحث في المرتجعات..."
                            className="pr-9 border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                        />
                    </div>
                </div>

                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="text-right">رقم المرتجع</TableHead>
                            <TableHead className="text-right">رقم الطلب</TableHead>
                            <TableHead className="text-right">العميل</TableHead>
                            <TableHead className="text-right">التاجر</TableHead>
                            <TableHead className="text-right">سبب الإرجاع</TableHead>
                            <TableHead className="text-right">الحالة</TableHead>
                            <TableHead className="text-right">الإجراء</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {returns.map((item) => (
                            <TableRow key={item.id} className="hover:bg-slate-50/50">
                                <TableCell className="font-medium text-slate-900">{item.id}</TableCell>
                                <TableCell className="text-blue-600">{item.order}</TableCell>
                                <TableCell className="text-slate-700">{item.customer}</TableCell>
                                <TableCell className="text-slate-600">{item.merchant}</TableCell>
                                <TableCell className="text-slate-500">{item.reason}</TableCell>
                                <TableCell>
                                    {item.status === 'pending' && <Badge className="bg-yellow-100 text-yellow-700 border-0">قيد المراجعة</Badge>}
                                    {item.status === 'approved' && <Badge className="bg-green-100 text-green-700 border-0">تم القبول</Badge>}
                                    {item.status === 'rejected' && <Badge className="bg-red-100 text-red-700 border-0">مرفوض</Badge>}
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50">
                                            <Check size={16} />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                                            <X size={16} />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
