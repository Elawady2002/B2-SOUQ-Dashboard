import { useState } from 'react';
import React from 'react';
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
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
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
    const [selectedReturn, setSelectedReturn] = useState(null);

    return (
        <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div>
                <h2 className="text-2xl font-bold text-slate-900">المرتجعات والنزاعات</h2>
                <p className="text-sm text-slate-500 mt-1">إدارة طلبات الإرجاع والنزاعات مع العملاء</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">قيد المراجعة</p>
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
                            <p className="text-xs text-slate-500 font-medium">في الطريق</p>
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
                            <p className="text-xs text-slate-500 font-medium">مكتمل</p>
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
                            <p className="text-xs text-slate-500 font-medium">نزاعات مفتوحة</p>
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
                        <TableHeader className="bg-slate-50/50">
                            <TableRow className="hover:bg-transparent border-slate-100">
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">رقم الطلب</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">المنتج</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">SKU</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">الفئة</TableHead>
                                <TableHead className="text-center h-10 text-xs font-semibold text-slate-600">الكمية</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">السعر/وحدة</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">الإجمالي</TableHead>
                                <TableHead className="text-center h-10 text-xs font-semibold text-slate-600">سبب الإرجاع</TableHead>
                                <TableHead className="text-center h-10 text-xs font-semibold text-slate-600">حالة الإرجاع</TableHead>
                                <TableHead className="text-center h-10 text-xs font-semibold text-slate-600">طريقة الشحن</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">العنوان</TableHead>
                                <TableHead className="text-center h-10 text-xs font-semibold text-slate-600">حالة الطلب</TableHead>
                                <TableHead className="text-center h-10 w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {returns.map((item) => {
                                const status = statusConfig[item.status];
                                const StatusIcon = status.icon;
                                const shipping = shippingMethods[item.shippingMethod];
                                const originalStatus = originalStatusConfig[item.originalStatus];
                                return (
                                    <TableRow key={item.id} className="border-slate-50 hover:bg-slate-50/50">
                                        <TableCell>
                                            <div>
                                                <p className="font-mono font-semibold text-xs text-slate-600">{item.id}</p>
                                                <p className="font-mono text-[10px] text-slate-400 bg-slate-50 px-1 rounded w-fit mt-1">{item.orderId}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium text-slate-900 text-sm max-w-[150px] truncate" title={item.product}>{item.product}</TableCell>
                                        <TableCell className="font-mono text-xs text-slate-500">{item.sku}</TableCell>
                                        <TableCell className="text-slate-600 text-sm">{item.category}</TableCell>
                                        <TableCell className="text-center font-bold text-slate-900">{item.quantity}</TableCell>
                                        <TableCell className="text-slate-600 text-sm">{item.unitPrice.toLocaleString('en-US')} ج.م</TableCell>
                                        <TableCell className="font-bold text-red-600 text-sm">{item.total.toLocaleString('en-US')} ج.م</TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-100 font-normal whitespace-nowrap">
                                                {item.reason}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="secondary" className={`${status.color} gap-1 font-normal whitespace-nowrap`}>
                                                <StatusIcon size={12} />
                                                {status.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="secondary" className={`${shipping.color} gap-1 font-normal whitespace-nowrap`}>
                                                {React.createElement(shipping.icon, { size: 12 })}
                                                {shipping.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-xs text-slate-500 max-w-[150px] truncate" title={item.address}>{item.address}</TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="secondary" className={`${originalStatus.color} font-normal whitespace-nowrap`}>
                                                {originalStatus.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
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

            {/* Return Details Modal */}
            <Dialog open={!!selectedReturn} onOpenChange={(open) => !open && setSelectedReturn(null)}>
                <DialogContent className="sm:max-w-[700px] bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                            تفاصيل طلب الإرجاع: {selectedReturn?.id}
                        </DialogTitle>
                    </DialogHeader>

                    {selectedReturn && (
                        <div className="py-4 space-y-6">
                            {/* Status & Shipping */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <p className="text-xs text-slate-500 mb-2">حالة الإرجاع</p>
                                    <div className="flex items-center gap-2">
                                        {React.createElement(statusConfig[selectedReturn.status].icon, { size: 18, className: statusConfig[selectedReturn.status].color.split(' ')[1] })}
                                        <span className="font-semibold text-slate-900">{statusConfig[selectedReturn.status].label}</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <p className="text-xs text-slate-500 mb-2">طريقة الشحن</p>
                                    <div className="flex items-center gap-2">
                                        {React.createElement(shippingMethods[selectedReturn.shippingMethod].icon, { size: 18, className: shippingMethods[selectedReturn.shippingMethod].color.split(' ')[0] })}
                                        <span className="font-semibold text-slate-900">{shippingMethods[selectedReturn.shippingMethod].label}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Order Info */}
                            <div>
                                <h4 className="font-semibold text-slate-900 mb-3">معلومات الطلب</h4>
                                <div className="grid grid-cols-2 gap-4 bg-white border border-slate-200 rounded-lg p-4">
                                    <div>
                                        <p className="text-xs text-slate-500">رقم الإرجاع</p>
                                        <p className="font-mono font-medium text-slate-900">{selectedReturn.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">رقم الطلب الأصلي</p>
                                        <p className="font-mono font-medium text-slate-900">{selectedReturn.orderId}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div>
                                <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                    <Package size={16} className="text-blue-600" />
                                    معلومات المنتج
                                </h4>
                                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-slate-200 shadow-sm">
                                            <Package size={24} className="text-slate-400" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-slate-900 text-sm">{selectedReturn.product}</p>
                                            <p className="text-xs text-slate-500 font-mono mt-1">SKU: {selectedReturn.sku}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 border-t border-slate-200 pt-4">
                                        <div>
                                            <p className="text-xs text-slate-500">الفئة</p>
                                            <p className="font-medium text-slate-900">{selectedReturn.category}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">الكمية</p>
                                            <p className="font-bold text-slate-900">{selectedReturn.quantity}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">المبلغ المسترد</p>
                                            <p className="font-bold text-red-600">{selectedReturn.total.toLocaleString('en-US')} ج.م</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Reason & Address */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                                    <p className="text-xs text-amber-600/70 mb-1">سبب الإرجاع</p>
                                    <p className="font-bold text-amber-700">{selectedReturn.reason}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <p className="text-xs text-slate-500 mb-1">تاريخ الطلب</p>
                                    <p className="font-bold text-slate-900">{selectedReturn.date}</p>
                                </div>
                                <div className="col-span-2 p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-3">
                                    <MapPin size={18} className="text-slate-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1">عنوان الاستلام</p>
                                        <p className="font-medium text-slate-900">{selectedReturn.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter className="gap-2 border-t border-slate-100 pt-4">
                        <Button variant="outline" onClick={() => setSelectedReturn(null)}>إغلاق</Button>
                        {selectedReturn && selectedReturn.status === 'pending' && (
                            <>
                                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                                    <CheckCircle size={16} className="ml-2" />
                                    قبول الإرجاع
                                </Button>
                                <Button className="bg-red-600 hover:bg-red-700 text-white">
                                    <XCircle size={16} className="ml-2" />
                                    رفض الطلب
                                </Button>
                            </>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
