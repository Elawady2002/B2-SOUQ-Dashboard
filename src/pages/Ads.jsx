import {
    Plus,
    TrendingUp,
    TrendingDown,
    Eye,
    ShoppingCart,
    Target,
    CreditCard,
    X,
    Play,
    Pause,
    MoreVertical,
    Calendar,
    DollarSign
} from 'lucide-react';
import { useState } from 'react';
import React from 'react';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const ads = [
    {
        id: 1,
        product: 'هاتف سامسونج Galaxy S24',
        page: 'الصفحة الرئيسية',
        budget: 5000,
        spent: 3200,
        duration: '15 يوم',
        views: 12500,
        clicks: 890,
        orders: 45,
        revenue: 67500,
        status: 'active',
        startDate: '2024-12-10',
        endDate: '2024-12-25',
        ctr: 7.1,
        roi: 210
    },
    {
        id: 2,
        product: 'سماعات AirPods Pro',
        page: 'صفحة الإلكترونيات',
        budget: 2000,
        spent: 2000,
        duration: '7 أيام',
        views: 5600,
        clicks: 420,
        orders: 28,
        revenue: 23800,
        status: 'completed',
        startDate: '2024-12-01',
        endDate: '2024-12-07',
        ctr: 7.5,
        roi: 190
    },
    {
        id: 3,
        product: 'شاحن لاسلكي',
        page: 'صفحة البحث',
        budget: 1000,
        spent: 450,
        duration: '10 أيام',
        views: 2300,
        clicks: 180,
        orders: 12,
        revenue: 5400,
        status: 'paused',
        startDate: '2024-12-15',
        endDate: '2024-12-25',
        ctr: 7.8,
        roi: 200
    },
];

const statsCards = [
    {
        id: 1,
        label: 'إجمالي المشاهدات',
        value: '20,400',
        change: '+12.5%',
        positive: true,
        color: '#3b82f6',
        bgColor: '#eff6ff',
        sparkline: [8, 12, 10, 15, 18, 14, 20, 22, 18, 25]
    },
    {
        id: 2,
        label: 'النقرات',
        value: '1,490',
        change: '+8.2%',
        positive: true,
        color: '#8b5cf6',
        bgColor: '#faf5ff',
        sparkline: [5, 8, 12, 10, 14, 16, 12, 18, 15, 20]
    },
    {
        id: 3,
        label: 'الطلبات',
        value: '85',
        change: '+15.3%',
        positive: true,
        color: '#10b981',
        bgColor: '#f0fdf4',
        sparkline: [3, 5, 4, 8, 10, 7, 12, 14, 11, 16]
    },
    {
        id: 4,
        label: 'العائد',
        value: '96,700',
        unit: 'ج.م',
        change: '+18.7%',
        positive: true,
        color: '#f59e0b',
        bgColor: '#fffbeb',
        sparkline: [10, 15, 12, 18, 22, 20, 25, 28, 24, 30]
    },
];

const paymentHistory = [
    { id: 1, amount: 5000, date: '2024-12-10', type: 'دفع إعلان', product: 'Galaxy S24', status: 'success' },
    { id: 2, amount: 2000, date: '2024-12-01', type: 'دفع إعلان', product: 'AirPods Pro', status: 'success' },
    { id: 3, amount: 1000, date: '2024-12-15', type: 'دفع إعلان', product: 'شاحن لاسلكي', status: 'success' },
];

export default function Ads() {
    const [showModal, setShowModal] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [showBudgetDepletedState, setShowBudgetDepletedState] = useState(false);
    const [showNoAdsState, setShowNoAdsState] = useState(false);

    return (
        <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">الإعلانات المدفوعة</h2>
                    <p className="text-sm text-slate-500 mt-1">إدارة حملاتك الإعلانية وتتبع الأداء</p>
                </div>
                <Button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 gap-2">
                    <Plus size={18} />
                    إنشاء إعلان جديد
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <Eye size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">إجمالي المشاهدات</p>
                            <p className="text-lg font-bold text-slate-900">20,400</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                            <Target size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">النقرات</p>
                            <p className="text-lg font-bold text-slate-900">1,490</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <ShoppingCart size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">الطلبات</p>
                            <p className="text-lg font-bold text-slate-900">85</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                            <DollarSign size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">العائد</p>
                            <p className="text-lg font-bold text-slate-900">96,700 ج.م</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Budget Depleted State */}
            {showBudgetDepletedState && (
                <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                                <CreditCard className="text-amber-600" size={24} />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-bold text-amber-900 mb-1">نفذت الميزانية المخصصة</h4>
                                <p className="text-sm text-amber-700">تم استنفاد ميزانية الإعلان. قم بإعادة تعبئة الرصيد لمواصلة الحملة</p>
                            </div>
                            <Button className="bg-amber-600 hover:bg-amber-700 text-white gap-2">
                                <CreditCard size={18} />
                                إعادة تعبئة الرصيد
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* No Ads Empty State */}
            {showNoAdsState && (
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-12 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="w-20 h-20 rounded-full bg-blue-50 mx-auto mb-6 flex items-center justify-center">
                                <Target className="text-blue-600" size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">لا توجد حملات إعلانية</h3>
                            <p className="text-slate-500 mb-6">ابدأ أول حملة إعلانية لك وزد من مبيعاتك ووصولك للعملاء</p>
                            <Button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 gap-2">
                                <Plus size={18} />
                                إنشاء إعلان جديد
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Ads Table */}
            <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader className="pb-4 border-b border-slate-50">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-bold text-slate-800">الحملات الإعلانية</CardTitle>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Calendar size={16} />
                            فلترة
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50/50">
                            <TableRow className="hover:bg-transparent border-slate-100">
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">المنتج</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">الصفحة</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">الميزانية</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">المشاهدات</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">النقرات</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">الطلبات</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">العائد</TableHead>
                                <TableHead className="text-center h-10 text-xs font-semibold text-slate-600">الحالة</TableHead>
                                <TableHead className="text-center h-10 text-xs font-semibold text-slate-600">الإجراءات</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ads.map((ad) => (
                                <TableRow key={ad.id} className="border-slate-50 hover:bg-slate-50/50">
                                    <TableCell className="py-3">
                                        <div>
                                            <p className="font-semibold text-slate-800 text-sm">{ad.product}</p>
                                            <p className="text-xs text-slate-500">{ad.duration}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-normal">
                                            {ad.page}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <div>
                                            <p className="text-sm font-medium text-slate-700">{ad.spent.toLocaleString('en-US')} / {ad.budget.toLocaleString('en-US')} ج.م</p>
                                            <div className="h-1 w-20 bg-slate-100 rounded-full overflow-hidden mt-1">
                                                <div
                                                    className="h-full bg-blue-600 rounded-full"
                                                    style={{ width: `${(ad.spent / ad.budget) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm font-medium text-slate-700 py-3">{ad.views.toLocaleString('en-US')}</TableCell>
                                    <TableCell className="text-sm font-medium text-slate-700 py-3">{ad.clicks.toLocaleString('en-US')}</TableCell>
                                    <TableCell className="text-sm font-bold text-slate-900 py-3">{ad.orders}</TableCell>
                                    <TableCell className="font-bold text-slate-900 py-3">{ad.revenue.toLocaleString('en-US')} ج.م</TableCell>
                                    <TableCell className="text-center py-3">
                                        <Badge variant="secondary" className={`font-normal ${ad.status === 'active' ? 'bg-emerald-50 text-emerald-700' :
                                            ad.status === 'paused' ? 'bg-amber-50 text-amber-700' :
                                                'bg-slate-100 text-slate-600'
                                            }`}>
                                            {ad.status === 'active' ? 'نشط' : ad.status === 'paused' ? 'متوقف' : 'منتهي'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <div className="flex items-center justify-center gap-1">
                                            {ad.status === 'active' && (
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-full">
                                                    <Pause size={16} />
                                                </Button>
                                            )}
                                            {ad.status === 'paused' && (
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-full">
                                                    <Play size={16} />
                                                </Button>
                                            )}
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-slate-600 rounded-full">
                                                <MoreVertical size={16} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Payment History */}
            <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader className="pb-4 border-b border-slate-50">
                    <CardTitle className="text-lg font-bold text-slate-800">سجل المدفوعات</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                    {paymentHistory.map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                                    <CreditCard size={20} />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900 text-sm">
                                        {payment.product}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        {payment.type} • {payment.date}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="font-bold text-slate-900">
                                    {payment.amount.toLocaleString('en-US')} ج.م
                                </p>
                                <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">تم الدفع</Badge>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Enhanced Multi-Step Modal */}
            <Dialog open={showModal} onOpenChange={(open) => { setShowModal(open); if (!open) setCurrentStep(1); }}>
                <DialogContent className="sm:max-w-[700px] bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-slate-900 pb-4">
                            إنشاء إعلان جديد
                        </DialogTitle>
                        {/* Progress Steps */}
                        <div className="flex items-center gap-2 pt-4">
                            {[1, 2, 3, 4].map((step) => (
                                <div key={step} className="flex items-center flex-1">
                                    <div className={`flex items-center gap-2 flex-1 ${step <= currentStep ? 'opacity-100' : 'opacity-40'
                                        }`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step < currentStep ? 'bg-blue-600 text-white' :
                                            step === currentStep ? 'bg-blue-600 text-white' :
                                                'bg-slate-200 text-slate-500'
                                            }`}>
                                            {step < currentStep ? '✓' : step}
                                        </div>
                                        <div className="text-xs font-medium text-slate-700">
                                            {step === 1 && 'المنتج'}
                                            {step === 2 && 'الجمهور'}
                                            {step === 3 && 'الميزانية'}
                                            {step === 4 && 'المعاينة'}
                                        </div>
                                    </div>
                                    {step < 4 && (
                                        <div className={`h-0.5 w-full mx-2 ${step < currentStep ? 'bg-blue-600' : 'bg-slate-200'
                                            }`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </DialogHeader>

                    <div className="py-4 space-y-4 min-h-[300px]">
                        {/* Step 1: Product Selection */}
                        {currentStep === 1 && (
                            <>
                                <div className="space-y-2">
                                    <Label>اختر المنتج</Label>
                                    <Select>
                                        <SelectTrigger className="bg-white border-slate-200">
                                            <SelectValue placeholder="اختر المنتج" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="s24">هاتف سامسونج Galaxy S24</SelectItem>
                                            <SelectItem value="airpods">سماعات AirPods Pro</SelectItem>
                                            <SelectItem value="gt4">ساعة Huawei GT4</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>صفحة العرض</Label>
                                    <Select>
                                        <SelectTrigger className="bg-white border-slate-200">
                                            <SelectValue placeholder="اختر مكان العرض" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="home">الصفحة الرئيسية</SelectItem>
                                            <SelectItem value="category">صفحة الفئة</SelectItem>
                                            <SelectItem value="search">صفحة البحث</SelectItem>
                                            <SelectItem value="featured">صفحة المنتجات المميزة</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </>
                        )}

                        {/* Step 2: Audience Targeting */}
                        {currentStep === 2 && (
                            <>
                                <div className="space-y-2">
                                    <Label>استهداف الجمهور</Label>
                                    <Select>
                                        <SelectTrigger className="bg-white border-slate-200">
                                            <SelectValue placeholder="اختر الفئة المستهدفة" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">جميع العملاء</SelectItem>
                                            <SelectItem value="male">الرجال (18-45)</SelectItem>
                                            <SelectItem value="female">النساء (18-45)</SelectItem>
                                            <SelectItem value="tech">مهتمين بالتكنولوجيا</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>المنطقة الجغرافية</Label>
                                    <Select>
                                        <SelectTrigger className="bg-white border-slate-200">
                                            <SelectValue placeholder="اختر المنطقة" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">جميع المناطق</SelectItem>
                                            <SelectItem value="cairo">القاهرة</SelectItem>
                                            <SelectItem value="alex">الإسكندرية</SelectItem>
                                            <SelectItem value="giza">الجيزة</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </>
                        )}

                        {/* Step 3: Budget & Duration */}
                        {currentStep === 3 && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>الميزانية (ج.م)</Label>
                                        <Input type="number" placeholder="1000" className="bg-white border-slate-200" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>المدة (أيام)</Label>
                                        <Input type="number" placeholder="7" className="bg-white border-slate-200" />
                                    </div>
                                </div>
                                <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                                    <h4 className="font-bold text-sm text-blue-900 mb-3">
                                        الأداء المتوقع
                                    </h4>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <p className="text-[10px] text-blue-600/70 mb-1">مشاهدات متوقعة</p>
                                            <p className="font-bold text-blue-700">~8,500</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-blue-600/70 mb-1">نقرات متوقعة</p>
                                            <p className="font-bold text-purple-700">~600</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-blue-600/70 mb-1">ROI متوقع</p>
                                            <p className="font-bold text-emerald-600">~180%</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-amber-50 rounded-lg p-3 text-xs text-amber-700 border border-amber-100 flex items-center gap-2">
                                    <span>💡</span>
                                    سيتم خصم المبلغ من محفظة التاجر عند بدء الإعلان
                                </div>
                            </>
                        )}

                        {/* Step 4: Preview & Confirm */}
                        {currentStep === 4 && (
                            <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                                <h4 className="font-bold text-lg text-slate-900 mb-4">ملخص الحملة</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white p-4 rounded-lg">
                                        <p className="text-xs text-slate-500 mb-1">المنتج</p>
                                        <p className="font-semibold text-slate-900">هاتف سامسونج Galaxy S24</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg">
                                        <p className="text-xs text-slate-500 mb-1">صفحة العرض</p>
                                        <p className="font-semibold text-slate-900">الصفحة الرئيسية</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg">
                                        <p className="text-xs text-slate-500 mb-1">الجمهور المستهدف</p>
                                        <p className="font-semibold text-slate-900">جميع العملاء</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg">
                                        <p className="text-xs text-slate-500 mb-1">المنطقة</p>
                                        <p className="font-semibold text-slate-900">جميع المناطق</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg">
                                        <p className="text-xs text-slate-500 mb-1">الميزانية</p>
                                        <p className="font-semibold text-emerald-600">1,000 ج.م</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg">
                                        <p className="text-xs text-slate-500 mb-1">المدة</p>
                                        <p className="font-semibold text-blue-600">7 أيام</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <DialogFooter className="gap-2 border-t border-slate-100 pt-4">
                        <Button variant="outline" onClick={() => { setShowModal(false); setCurrentStep(1); }}>إلغاء</Button>
                        <div className="flex gap-2">
                            {currentStep > 1 && (
                                <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                                    السابق
                                </Button>
                            )}
                            {currentStep < 4 ? (
                                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setCurrentStep(currentStep + 1)}>
                                    التالي
                                </Button>
                            ) : (
                                <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                                    <CreditCard size={18} />
                                    الدفع وبدء الإعلان
                                </Button>
                            )}
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
