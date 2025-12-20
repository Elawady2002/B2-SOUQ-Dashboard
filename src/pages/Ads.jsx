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

            {/* Enhanced Stats Cards with Sparklines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsCards.map((card) => {
                    const maxVal = Math.max(...card.sparkline);
                    const points = card.sparkline.map((val, i) =>
                        `${(i / (card.sparkline.length - 1)) * 100},${50 - (val / maxVal) * 40}`
                    ).join(' ');
                    const areaPoints = `0,50 ${points} 100,50`;

                    return (
                        <Card key={card.id} className="bg-white border-slate-200 shadow-sm overflow-hidden">
                            <CardContent className="p-5">
                                {/* Row 1: Icon (left) + Label (right) */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-sm text-slate-500 font-medium font-cairo">{card.label}</div>
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-opacity-10" style={{ backgroundColor: `${card.color}15`, color: card.color }}>
                                        {card.id === 1 && <Eye size={20} strokeWidth={1.5} />}
                                        {card.id === 2 && <Target size={20} strokeWidth={1.5} />}
                                        {card.id === 3 && <ShoppingCart size={20} strokeWidth={1.5} />}
                                        {card.id === 4 && <DollarSign size={20} strokeWidth={1.5} />}
                                    </div>
                                </div>

                                {/* Row 2: Value + Unit (left) + Change (right) */}
                                <div className="flex items-end justify-between mb-4">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-bold text-slate-900">{card.value}</span>
                                        {card.unit && <span className="text-sm text-slate-500">{card.unit}</span>}
                                    </div>
                                    <div className={`flex items-center text-xs font-semibold ${card.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                                        <span dir="ltr">{card.change}</span>
                                        {card.positive ? <TrendingUp size={16} className="ml-1" /> : <TrendingDown size={16} className="ml-1" />}
                                    </div>
                                </div>

                                {/* Row 3: Area Chart */}
                                <div className="h-12 w-full">
                                    <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
                                        <defs>
                                            <linearGradient id={`gradient-${card.id}`} x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor={card.color} stopOpacity="0.25" />
                                                <stop offset="100%" stopColor={card.color} stopOpacity="0.02" />
                                            </linearGradient>
                                        </defs>
                                        <polygon
                                            points={areaPoints}
                                            fill={`url(#gradient-${card.id})`}
                                        />
                                        <polyline
                                            points={points}
                                            fill="none"
                                            stroke={card.color}
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Campaign Cards - Modern Card Layout */}
            <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-50">
                    <CardTitle className="text-lg font-bold text-slate-800">الحملات الإعلانية</CardTitle>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Calendar size={16} />
                        فلترة
                    </Button>
                </CardHeader>

                <CardContent className="p-4 space-y-4">
                    {ads.map((ad) => (
                        <div key={ad.id} className="bg-slate-50/50 border border-slate-200 rounded-xl p-6 hover:border-blue-200 transition-all duration-200">
                            {/* Header Row */}
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl border border-slate-100 shadow-sm">
                                        📱
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-slate-900 mb-1">
                                            {ad.product}
                                        </h4>
                                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-normal">
                                            {ad.page}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className={`font-medium ${ad.status === 'active' ? 'bg-emerald-50 text-emerald-700' :
                                            ad.status === 'paused' ? 'bg-amber-50 text-amber-700' :
                                                'bg-slate-100 text-slate-600'
                                        }`}>
                                        {ad.status === 'active' ? 'نشط' : ad.status === 'paused' ? 'متوقف' : 'منتهي'}
                                    </Badge>
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
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mb-6">
                                <div>
                                    <p className="text-xs text-slate-500 mb-1">المشاهدات</p>
                                    <p className="text-lg font-bold text-slate-900">
                                        {ad.views.toLocaleString('en-US')}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-1">النقرات</p>
                                    <p className="text-lg font-bold text-slate-900">
                                        {ad.clicks.toLocaleString('en-US')}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-1">معدل النقر</p>
                                    <p className="text-lg font-bold text-purple-600">
                                        {ad.ctr}%
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-1">الطلبات</p>
                                    <p className="text-lg font-bold text-emerald-600">
                                        {ad.orders}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-1">العائد</p>
                                    <p className="text-lg font-bold text-emerald-600">
                                        {ad.revenue.toLocaleString('en-US')} <span className="text-xs">ج.م</span>
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-1">ROI</p>
                                    <p className="text-lg font-bold text-amber-500">
                                        {ad.roi}%
                                    </p>
                                </div>
                            </div>

                            {/* Budget Progress */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-slate-500">
                                        الميزانية: <span className="font-medium text-slate-700">{ad.spent.toLocaleString('en-US')}</span> / {ad.budget.toLocaleString('en-US')} ج.م
                                    </span>
                                    <span className="text-xs font-bold text-blue-600">
                                        {Math.round((ad.spent / ad.budget) * 100)}%
                                    </span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-600 rounded-full transition-all duration-500"
                                        style={{ width: `${(ad.spent / ad.budget) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
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

            {/* Enhanced Modal */}
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent className="sm:max-w-[600px] bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                            إنشاء إعلان جديد
                        </DialogTitle>
                    </DialogHeader>

                    <div className="py-4 space-y-4">
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

                        {/* Estimated Performance */}
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
                    </div>

                    <DialogFooter className="gap-2 border-t border-slate-100 pt-4">
                        <Button variant="outline" onClick={() => setShowModal(false)}>إلغاء</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                            <CreditCard size={18} />
                            الدفع وبدء الإعلان
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
