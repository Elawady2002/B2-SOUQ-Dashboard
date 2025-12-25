import { Search, Filter, CheckCircle, XCircle, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function AdminAds() {
    // Mock Data
    const campaigns = [
        { id: 1, title: 'تخفيضات الصيف', merchant: 'أزياء الموضة', budget: 'EGP 5,000', startDate: '01/06/2026', endDate: '30/06/2026', status: 'active', image: 'bg-orange-100' },
        { id: 2, title: 'إطلاق iPhone 16', merchant: 'تك ستور', budget: 'EGP 20,000', startDate: '15/09/2026', endDate: '15/10/2026', status: 'pending', image: 'bg-blue-100' },
        { id: 3, title: 'عرض العودة للمدارس', merchant: 'سامي للأدوات', budget: 'EGP 2,000', startDate: '20/08/2026', endDate: '10/09/2026', status: 'rejected', reason: 'مخالف للشروط', image: 'bg-yellow-100' },
    ];

    return (
        <div className="space-y-6" dir="rtl">
            <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">إدارة الإعلانات</h1>
                    <p className="text-slate-500 mt-1">مراجعة الحملات الإعلانية المقدمة من التجار.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2 border-slate-200 text-slate-700">
                        <Filter size={16} />
                        تصفية
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((ad) => (
                    <Card key={ad.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className={`h-32 w-full ${ad.image} rounded-t-xl flex items-center justify-center`}>
                            <span className="text-slate-500 font-medium">Banner Placeholder</span>
                        </div>
                        <CardContent className="p-5">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <Badge variant="outline" className="mb-2 bg-slate-50 text-slate-600 border-slate-200">{ad.merchant}</Badge>
                                    <h3 className="font-bold text-lg text-slate-900 leading-tight">{ad.title}</h3>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                                            <MoreHorizontal size={16} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>عرض التفاصيل</DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600">إيقاف الحملة</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="space-y-2 text-sm text-slate-500 mb-4">
                                <div className="flex justify-between">
                                    <span>الميزانية:</span>
                                    <span className="font-semibold text-slate-900">{ad.budget}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>المدة:</span>
                                    <span>{ad.startDate} - {ad.endDate}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                {ad.status === 'active' && <Badge className="bg-green-100 text-green-700 border-0">نشط حالياً</Badge>}
                                {ad.status === 'pending' && <Badge className="bg-yellow-100 text-yellow-700 border-0">بانتظار الموافقة</Badge>}
                                {ad.status === 'rejected' && <Badge className="bg-red-100 text-red-700 border-0">مرفوض</Badge>}

                                {ad.status === 'pending' && (
                                    <div className="flex gap-2">
                                        <Button size="sm" className="bg-green-600 hover:bg-green-700 h-8 px-3">قبول</Button>
                                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 h-8 px-3">رفض</Button>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
