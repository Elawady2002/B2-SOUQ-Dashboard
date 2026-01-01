import { useState } from 'react';
import { Search, RotateCcw, Check, X, AlertOctagon, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function AdminReturns() {
    const [selectedReturn, setSelectedReturn] = useState(null);
    const [activeSheet, setActiveSheet] = useState(null); // 'decision'

    // Mock Data
    const returns = [
        { id: '#RET-901', order: '#ORD-5510', customer: 'محمود حسن', merchant: 'تك ستور', reason: 'المنتج معيب', status: 'pending', decision: null },
        { id: '#RET-902', order: '#ORD-5490', customer: 'نادية كمال', merchant: 'أزياء الموضة', reason: 'المقاس غير مناسب', status: 'approved', decision: 'refund' },
        { id: '#RET-903', order: '#ORD-5400', customer: 'كريم سامي', merchant: 'بيت الرياضة', reason: 'تغيير رأي', status: 'rejected', decision: null },
        { id: '#RET-904', order: '#ORD-5350', customer: 'علي يوسف', merchant: 'عالم التقنية', reason: 'منتج خاطئ', status: 'pending', decision: null },
    ];

    const handleDecisionClick = (item) => {
        setSelectedReturn(item);
        setActiveSheet('decision');
    };

    const renderSheetContent = () => {
        if (activeSheet === 'decision' && selectedReturn) {
            return (
                <SheetContent side="left" className="sm:max-w-md">
                    <SheetHeader>
                        <SheetTitle className="text-right">اتخاذ قرار في المرتجع {selectedReturn.id}</SheetTitle>
                        <SheetDescription className="text-right">
                            الرجاء مراجعة سبب الارجاع واتخاذ القرار المناسب (قبول مع استرجاع/استبدال أو رفض).
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-6 py-6 px-6 md:px-6" dir="rtl">
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                            <p className="text-sm font-medium mb-1 text-slate-900">سبب العميل:</p>
                            <p className="text-sm text-slate-600">{selectedReturn.reason}</p>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="notes" className="text-right">ملاحظات الإدارة</Label>
                            <Textarea id="notes" placeholder="اكتب سبب القرار هنا..." rows={4} className="text-right" />
                        </div>
                    </div>
                    <SheetFooter className="flex-col gap-3 sm:flex-col sm:space-x-0">
                        <div className="flex gap-2 w-full">
                            <Button className="bg-blue-600 hover:bg-blue-700 flex-1" onClick={() => { alert("تم قبول الاستبدال"); setActiveSheet(null); }}>استبدال</Button>
                            <Button className="bg-green-600 hover:bg-green-700 flex-1" onClick={() => { alert("تم قبول الاسترجاع"); setActiveSheet(null); }}>استرجاع مبلغ</Button>
                        </div>
                        <Button variant="destructive" className="w-full" onClick={() => { alert("تم رفض الطلب"); setActiveSheet(null); }}>رفض الطلب</Button>
                    </SheetFooter>
                </SheetContent>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6" dir="rtl">
            <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">المرتجعات والنزاعات</h1>
                    <p className="text-slate-500 mt-1">إدارة وفض نزاعات المرتجعات واتخاذ قرارات (استبدال / استرجاع).</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <Input
                            placeholder="بحث في المرتجعات..."
                            className="pl-9 border-slate-200 focus:border-blue-500 focus:ring-blue-100 text-right"
                        />
                    </div>
                </div>

                <Table dir="rtl">
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="text-right">رقم المرتجع</TableHead>
                            <TableHead className="text-right">الطلب</TableHead>
                            <TableHead className="text-right">العميل & التاجر</TableHead>
                            <TableHead className="text-right">السبب</TableHead>
                            <TableHead className="text-right">الحالة</TableHead>
                            <TableHead className="text-right">القرار</TableHead>
                            <TableHead className="text-right">الإجراء</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {returns.map((item) => (
                            <TableRow key={item.id} className="hover:bg-slate-50/50">
                                <TableCell className="font-medium text-slate-900">{item.id}</TableCell>
                                <TableCell className="text-blue-600 font-mono text-sm">{item.order}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">{item.customer}</span>
                                        <span className="text-xs text-slate-500">{item.merchant}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-slate-500">{item.reason}</TableCell>
                                <TableCell>
                                    {item.status === 'pending' && <Badge className="bg-yellow-100 text-yellow-700 border-0">قيد المراجعة</Badge>}
                                    {item.status === 'approved' && <Badge className="bg-green-100 text-green-700 border-0">تم القبول</Badge>}
                                    {item.status === 'rejected' && <Badge className="bg-red-100 text-red-700 border-0">مرفوض</Badge>}
                                </TableCell>
                                <TableCell>
                                    {item.decision === 'refund' && <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">استرجاع أموال</Badge>}
                                    {item.decision === 'replace' && <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">استبدال منتج</Badge>}
                                    {!item.decision && <span className="text-slate-400 text-sm">-</span>}
                                </TableCell>
                                <TableCell>
                                    {item.status === 'pending' ? (
                                        <Button size="sm" variant="outline" className="gap-2" onClick={() => handleDecisionClick(item)}>
                                            <AlertOctagon size={14} />
                                            اتخاذ قرار
                                        </Button>
                                    ) : (
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                                            <FileText size={16} />
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Decision Sheet */}
            <Sheet open={!!activeSheet} onOpenChange={(open) => !open && setActiveSheet(null)}>
                {renderSheetContent()}
            </Sheet>
        </div>
    );
}
