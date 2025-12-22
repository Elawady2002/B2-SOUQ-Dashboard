import { useState } from 'react';
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
    RotateCcw,
    Package,
    Clock,
    CheckCircle,
    XCircle,
    Eye,
    MessageSquare,
    AlertTriangle,
    X,
    MapPin,
    Truck,
    Home,
    Filter,
    Search
} from 'lucide-react';

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
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import {
    ScrollArea
} from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const returns = [
    {
        id: 'RET-2024-001',
        orderId: 'ORD-2024-78432',
        product: 'هاتف سامسونج Galaxy S24',
        sku: 'SAM-S24U-256',
        category: 'هواتف',
        quantity: 1,
        unitPrice: 45000,
        total: 45000,
        reason: 'عيب صناعة',
        status: 'pending',
        shippingMethod: 'platform_ship',
        address: 'المستودع الرئيسي - 6 أكتوبر، الجيزة',
        originalStatus: 'completed',
        date: '2024-12-18'
    },
    {
        id: 'RET-2024-002',
        orderId: 'ORD-2024-78430',
        product: 'سماعات AirPods Pro',
        sku: 'APL-APP2-WHT',
        category: 'سماعات',
        quantity: 1,
        unitPrice: 8500,
        total: 8500,
        reason: 'لا يعمل',
        status: 'approved',
        shippingMethod: 'self_ship',
        address: 'فرع الدقي - شارع التحرير، الدقي، الجيزة',
        originalStatus: 'completed',
        date: '2024-12-17'
    },
    {
        id: 'RET-2024-003',
        orderId: 'ORD-2024-78425',
        product: 'شاحن لاسلكي',
        sku: 'CHR-WLS-15W',
        category: 'اكسسوارات',
        quantity: 2,
        unitPrice: 450,
        total: 900,
        reason: 'غيرت رأيي',
        status: 'rejected',
        shippingMethod: 'platform_ship',
        address: 'المستودع الرئيسي - 6 أكتوبر، الجيزة',
        originalStatus: 'completed',
        date: '2024-12-15'
    },
    {
        id: 'RET-2024-004',
        orderId: 'ORD-2024-78420',
        product: 'ساعة Huawei GT4',
        sku: 'HUA-WGT4-BLK',
        category: 'ساعات ذكية',
        quantity: 1,
        unitPrice: 6500,
        total: 6500,
        reason: 'منتج مختلف عن الوصف',
        status: 'completed',
        shippingMethod: 'platform_full',
        address: 'المستودع الرئيسي - 6 أكتوبر، الجيزة',
        originalStatus: 'completed',
        date: '2024-12-10'
    },
];

const statusConfig = {
    pending: { label: 'قيد المراجعة', color: 'bg-amber-50 text-amber-700', icon: Clock },
    approved: { label: 'تمت الموافقة', color: 'bg-blue-50 text-blue-700', icon: CheckCircle },
    rejected: { label: 'مرفوض', color: 'bg-red-50 text-red-700', icon: XCircle },
    completed: { label: 'مكتمل', color: 'bg-emerald-50 text-emerald-700', icon: CheckCircle },
};

const shippingMethods = {
    platform_full: { label: 'شحن المنصة', icon: Package, color: 'text-emerald-600 bg-emerald-50' },
    platform_ship: { label: 'شحن المنصة', icon: Truck, color: 'text-blue-600 bg-blue-50' },
    self_ship: { label: 'شحن ذاتي', icon: Home, color: 'text-amber-600 bg-amber-50' },
};

const originalStatusConfig = {
    completed: { label: 'مكتمل', color: 'bg-emerald-50 text-emerald-700' },
    cancelled: { label: 'ملغي', color: 'bg-red-50 text-red-700' },
};

export default function Returns() {
    const { t } = useLanguage();
    const [selectedReturn, setSelectedReturn] = useState(null);

    return (
        <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div>
                <h2 className="text-2xl font-bold text-slate-900">{t('returns.title')}</h2>
                <p className="text-sm text-slate-500 mt-1">{t('returns.subtitle')}</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">{t('returns.pending')}</p>
                            <p className="text-lg font-bold text-slate-900">5</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <RotateCcw size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">{t('returns.inTransit')}</p>
                            <p className="text-lg font-bold text-slate-900">3</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <CheckCircle size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">{t('returns.completed')}</p>
                            <p className="text-lg font-bold text-slate-900">28</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                            <AlertTriangle size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">{t('returns.openDisputes') || 'Open Disputes'}</p>
                            <p className="text-lg font-bold text-slate-900">2</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Returns Table */}
            <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader className="pb-4 border-b border-slate-50">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-bold text-slate-800">جدول طلبات الإرجاع</CardTitle>
                        <div className="relative w-full md:w-64">
                            <Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="بحث برقم الإرجاع..."
                                className="pr-9 bg-slate-50 border-slate-200"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-slate-100 bg-slate-50 border-b border-slate-200">
                                <TableHead className="text-start h-12 font-medium text-slate-500 w-[140px]">رقم الطلب</TableHead>
                                <TableHead className="text-start h-12 font-medium text-slate-500">المنتج</TableHead>
                                <TableHead className="text-start h-12 font-medium text-slate-500">SKU</TableHead>
                                <TableHead className="text-start h-12 font-medium text-slate-500">الفئة</TableHead>
                                <TableHead className="text-center h-12 font-medium text-slate-500">الكمية</TableHead>
                                <TableHead className="text-start h-12 font-medium text-slate-500">السعر</TableHead>
                                <TableHead className="text-start h-12 font-medium text-slate-500">الإجمالي</TableHead>
                                <TableHead className="text-center h-12 font-medium text-slate-500">السبب</TableHead>
                                <TableHead className="text-center h-12 font-medium text-slate-500">الحالة</TableHead>
                                <TableHead className="text-start h-12 font-medium text-slate-500 w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {returns.map((item) => {
                                const status = statusConfig[item.status];
                                const StatusIcon = status.icon;
                                const shipping = shippingMethods[item.shippingMethod];
                                const originalStatus = originalStatusConfig[item.originalStatus];
                                return (
                                    <TableRow key={item.id} className="hover:bg-slate-50/50 group transition-colors">
                                        <TableCell className="font-medium align-top py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-mono text-xs font-bold text-slate-700">{item.id}</span>
                                                <span className="font-mono text-[10px] text-slate-400">{item.orderId}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="align-top py-4">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                                                    <Package size={14} className="text-slate-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-slate-900 line-clamp-2 max-w-[180px]" title={item.product}>{item.product}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="align-top py-4 font-mono text-xs text-slate-500">{item.sku}</TableCell>
                                        <TableCell className="align-top py-4">
                                            <Badge variant="outline" className="font-normal text-slate-600 bg-white hover:bg-slate-50">
                                                {item.category}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="align-top py-4 text-center font-semibold text-slate-900">{item.quantity}</TableCell>
                                        <TableCell className="align-top py-4 text-sm text-slate-600">{item.unitPrice.toLocaleString('en-US')} ج.م</TableCell>
                                        <TableCell className="align-top py-4 text-sm font-bold text-slate-900">{item.total.toLocaleString('en-US')} ج.م</TableCell>
                                        <TableCell className="align-top py-4 text-center">
                                            <span className="inline-flex items-center px-2 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-medium border border-amber-100 whitespace-nowrap">
                                                {item.reason}
                                            </span>
                                        </TableCell>
                                        <TableCell className="align-top py-4 text-center">
                                            <Badge variant="secondary" className={`${status.color} gap-1.5 font-medium whitespace-nowrap px-2.5 py-0.5`}>
                                                <StatusIcon size={12} />
                                                {status.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="align-top py-4 text-end">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => setSelectedReturn(item)}
                                                title="عرض التفاصيل"
                                            >
                                                <Eye size={16} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Return Details Side Menu (Sheet) */}
            <Sheet open={!!selectedReturn} onOpenChange={(open) => !open && setSelectedReturn(null)}>
                <SheetContent side="left" className="w-[400px] sm:w-[600px] p-0 flex flex-col gap-0 border-r border-slate-200">
                    <SheetHeader className="px-3 pt-12 pb-6 border-b border-slate-100 bg-slate-50/30">
                        <SheetTitle className="text-xl font-bold text-slate-900 text-start">
                            تفاصيل طلب الإرجاع: {selectedReturn?.id}
                        </SheetTitle>
                        {selectedReturn && (
                            <SheetDescription className="text-start flex items-center gap-2 mt-2">
                                <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-500">
                                    {selectedReturn.orderId}
                                </span>
                                <span className="text-xs text-slate-400">|</span>
                                <span className="text-xs text-slate-500">{selectedReturn.date}</span>
                            </SheetDescription>
                        )}
                    </SheetHeader>

                    {selectedReturn && (
                        <>
                            <ScrollArea className="flex-1">
                                <div className="p-6 space-y-8" dir="rtl">

                                    {/* Status Cards */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-center text-center items-center gap-2">
                                            <span className="text-xs text-slate-500">حالة الإرجاع</span>
                                            <Badge variant="secondary" className={`${statusConfig[selectedReturn.status].color} gap-1.5 font-medium px-3 py-1`}>
                                                {React.createElement(statusConfig[selectedReturn.status].icon, { size: 14 })}
                                                {statusConfig[selectedReturn.status].label}
                                            </Badge>
                                        </div>
                                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-center text-center items-center gap-2">
                                            <span className="text-xs text-slate-500">طريقة الشحن</span>
                                            <Badge variant="secondary" className={`${shippingMethods[selectedReturn.shippingMethod].color} gap-1.5 font-medium px-3 py-1`}>
                                                {React.createElement(shippingMethods[selectedReturn.shippingMethod].icon, { size: 14 })}
                                                {shippingMethods[selectedReturn.shippingMethod].label}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                                            <Package size={18} className="text-blue-600" />
                                            معلومات المنتج
                                        </h4>

                                        <div className="border border-slate-200 rounded-xl overflow-hidden">
                                            {/* Product Header */}
                                            <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex gap-4">
                                                <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center shadow-sm shrink-0">
                                                    <Package className="text-slate-300" size={24} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 text-sm leading-tight mb-1">{selectedReturn.product}</p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] text-slate-500">SKU:</span>
                                                        <code className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] text-slate-600 font-mono">{selectedReturn.sku}</code>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Product Details Grid */}
                                            <div className="grid grid-cols-3 divide-x divide-x-reverse divide-slate-100 bg-white">
                                                <div className="p-3 text-center">
                                                    <span className="text-[10px] text-slate-400 block mb-1">الفئة</span>
                                                    <span className="text-xs font-semibold text-slate-700">{selectedReturn.category}</span>
                                                </div>
                                                <div className="p-3 text-center">
                                                    <span className="text-[10px] text-slate-400 block mb-1">الكمية</span>
                                                    <span className="text-xs font-bold text-slate-900">{selectedReturn.quantity}</span>
                                                </div>
                                                <div className="p-3 text-center">
                                                    <span className="text-[10px] text-slate-400 block mb-1">المبلغ المسترد</span>
                                                    <span className="text-xs font-bold text-rose-600">{selectedReturn.total.toLocaleString()} ج.م</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Additional Info Grid */}
                                    <div className="grid grid-cols-1 gap-4">
                                        {/* Reason */}
                                        <div className="p-4 rounded-xl border border-amber-100 bg-amber-50">
                                            <div className="flex items-start justify-between mb-1">
                                                <span className="text-xs font-medium text-amber-800">سبب الإرجاع المحدد</span>
                                                <AlertTriangle size={14} className="text-amber-600" />
                                            </div>
                                            <p className="text-sm font-bold text-amber-900">{selectedReturn.reason}</p>
                                        </div>

                                        {/* Dropoff Address */}
                                        <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex gap-3">
                                            <MapPin size={18} className="text-slate-400 shrink-0 mt-0.5" />
                                            <div>
                                                <span className="text-xs text-slate-500 block mb-1">عنوان الاستلام / المستوع</span>
                                                <p className="text-sm font-semibold text-slate-900 leading-snug">{selectedReturn.address}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </ScrollArea>

                            {/* Footer Actions */}
                            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex gap-3 rtl:flex-row-reverse" dir="rtl">
                                {selectedReturn.status === 'pending' ? (
                                    <>
                                        <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 font-medium">
                                            <CheckCircle size={18} className="ml-2" />
                                            قبول الإرجاع
                                        </Button>
                                        <Button variant="outline" className="flex-1 border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700">
                                            <XCircle size={18} className="ml-2" />
                                            رفض الطلب
                                        </Button>
                                    </>
                                ) : (
                                    <Button variant="outline" className="w-full" onClick={() => setSelectedReturn(null)}>
                                        إغلاق التفاصيل
                                    </Button>
                                )}
                            </div>
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
}
