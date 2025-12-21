import { useState } from 'react';
import React from 'react';
import {
    ShoppingCart,
    Package,
    Truck,
    CheckCircle,
    Clock,
    XCircle,
    Eye,
    MapPin,
    Phone,
    User,
    Store,
    PackageCheck,
    Home,
    Search,
    X,
    Download,
    Headphones,
    CreditCard,
    FileText
} from 'lucide-react';

import {
    Card,
    CardContent,
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

const orders = [
    {
        id: 'ORD-2024-78432',
        customer: 'أحمد محمد علي',
        phone: '+20 123 456 7890',
        address: 'شارع التحرير، الدقي، الجيزة',
        products: [
            { name: 'هاتف سامسونج Galaxy S24', qty: 1, price: 45000 },
        ],
        total: 45000,
        orderType: 'platform',
        status: 'new',
        paymentStatus: 'unpaid',
        date: '2024-12-18',
        paymentMethod: 'الدفع عند الاستلام',
        carrier: 'أرامكس',
        trackingNumber: 'ARX-78432156'
    },
    {
        id: 'ORD-2024-78431',
        customer: 'سارة محمود',
        phone: '+20 111 222 3333',
        address: 'مدينة نصر، القاهرة',
        products: [
            { name: 'سماعات AirPods Pro', qty: 2, price: 8500 },
            { name: 'شاحن لاسلكي', qty: 1, price: 450 },
        ],
        total: 17450,
        orderType: 'platform',
        status: 'processing',
        paymentStatus: 'paid',
        date: '2024-12-18',
        paymentMethod: 'بطاقة ائتمان',
        carrier: 'أرامكس',
        trackingNumber: 'ARX-78431982'
    },
    {
        id: 'ORD-2024-78430',
        customer: 'محمد أحمد',
        phone: '+20 100 200 3000',
        address: 'المعادي، القاهرة',
        products: [
            { name: 'ساعة Huawei GT4', qty: 1, price: 6500 },
        ],
        total: 6500,
        orderType: 'merchant',
        status: 'shipping',
        paymentStatus: 'paid',
        date: '2024-12-17',
        paymentMethod: 'الدفع عند الاستلام',
        carrier: 'شحن ذاتي',
        trackingNumber: 'SELF-78430'
    },
    {
        id: 'ORD-2024-78429',
        customer: 'فاطمة حسن',
        phone: '+20 155 666 7777',
        address: '6 أكتوبر، الجيزة',
        products: [
            { name: 'حافظة هاتف جلد', qty: 3, price: 350 },
        ],
        total: 1050,
        orderType: 'platform',
        status: 'completed',
        paymentStatus: 'paid',
        date: '2024-12-16',
        paymentMethod: 'محفظة إلكترونية',
        carrier: 'أرامكس',
        trackingNumber: 'ARX-78429654'
    },
    {
        id: 'ORD-2024-78428',
        customer: 'علي محمود',
        phone: '+20 122 333 4444',
        address: 'الإسكندرية',
        products: [
            { name: 'شاحن لاسلكي', qty: 2, price: 450 },
        ],
        total: 900,
        orderType: 'merchant',
        status: 'cancelled',
        paymentStatus: 'refunded',
        date: '2024-12-15',
        paymentMethod: 'الدفع عند الاستلام',
        carrier: '-',
        trackingNumber: '-'
    },
];

const statusConfig = {
    new: { label: 'جديد', color: 'bg-blue-50 text-blue-700', icon: Package },
    processing: { label: 'تحت التجهيز', color: 'bg-amber-50 text-amber-700', icon: Clock },
    shipping: { label: 'في الشحن', color: 'bg-sky-50 text-sky-700', icon: Truck },
    completed: { label: 'مُسلّم', color: 'bg-emerald-50 text-emerald-700', icon: CheckCircle },
    cancelled: { label: 'ملغي', color: 'bg-red-50 text-red-700', icon: XCircle },
};

const paymentStatusConfig = {
    paid: { label: 'مدفوع', color: 'bg-emerald-50 text-emerald-700' },
    unpaid: { label: 'غير مدفوع', color: 'bg-amber-50 text-amber-700' },
    refunded: { label: 'مسترد', color: 'bg-slate-100 text-slate-600' },
};

const orderTypeConfig = {
    platform: { label: 'طلب منصة', color: 'bg-blue-50 text-blue-700', icon: PackageCheck },
    merchant: { label: 'طلب تاجر', color: 'bg-purple-50 text-purple-700', icon: Store },
};

const statusFilters = [
    { id: 'all', label: 'الكل' },
    { id: 'new', label: 'جديد' },
    { id: 'processing', label: 'تحت التجهيز' },
    { id: 'shipping', label: 'في الشحن' },
    { id: 'completed', label: 'مُسلّم' },
    { id: 'cancelled', label: 'ملغي' },
];

export default function Orders() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const filteredOrders = activeFilter === 'all'
        ? orders
        : orders.filter(o => o.status === activeFilter);

    // Stats calculations
    const totalOrders = orders.length;
    const inProgress = orders.filter(o => ['new', 'processing', 'shipping'].includes(o.status)).length;
    const merchantOrders = orders.filter(o => o.orderType === 'merchant').length;
    const deliveredOrders = orders.filter(o => o.status === 'completed').length;

    return (
        <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div>
                <h2 className="text-2xl font-bold text-slate-900">إدارة الطلبات</h2>
                <p className="text-sm text-slate-500 mt-1">متابعة وإدارة طلبات العملاء والشحنات</p>
            </div>

            {/* Stats Cards - 4 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                <ShoppingCart size={22} />
                            </div>
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12%</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 mb-1">{totalOrders}</p>
                        <p className="text-sm text-slate-500">إجمالي الطلبات</p>
                    </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                                <Clock size={22} />
                            </div>
                            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">{inProgress}</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 mb-1">{inProgress}</p>
                        <p className="text-sm text-slate-500">قيد التنفيذ</p>
                    </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                                <Store size={22} />
                            </div>
                            <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">{merchantOrders}</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 mb-1">{merchantOrders}</p>
                        <p className="text-sm text-slate-500">طلبات التاجر</p>
                    </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                <CheckCircle size={22} />
                            </div>
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+8%</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 mb-1">{deliveredOrders}</p>
                        <p className="text-sm text-slate-500">تم التسليم</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters & Table */}
            <Card className="bg-white border-slate-200 shadow-sm">
                <div className="p-4 border-b border-slate-100">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Status Filters */}
                        <div className="flex flex-wrap gap-2">
                            {statusFilters.map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === filter.id
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative w-full md:w-72">
                            <Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="بحث برقم الطلب أو اسم العميل..."
                                className="pr-10 bg-slate-50 border-slate-200"
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-slate-50/80">
                            <TableRow className="hover:bg-transparent border-slate-100">
                                <TableHead className="text-right h-12 text-xs font-semibold text-slate-600">رقم الطلب</TableHead>
                                <TableHead className="text-right h-12 text-xs font-semibold text-slate-600">التاريخ</TableHead>
                                <TableHead className="text-right h-12 text-xs font-semibold text-slate-600">العميل</TableHead>
                                <TableHead className="text-right h-12 text-xs font-semibold text-slate-600">المنتجات</TableHead>
                                <TableHead className="text-center h-12 text-xs font-semibold text-slate-600">نوع الطلب</TableHead>
                                <TableHead className="text-center h-12 text-xs font-semibold text-slate-600">الحالة</TableHead>
                                <TableHead className="text-center h-12 text-xs font-semibold text-slate-600">الدفع</TableHead>
                                <TableHead className="text-right h-12 text-xs font-semibold text-slate-600">الإجمالي</TableHead>
                                <TableHead className="text-center h-12 w-[60px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders.map((order) => {
                                const status = statusConfig[order.status];
                                const StatusIcon = status.icon;
                                const orderType = orderTypeConfig[order.orderType];
                                const paymentStatus = paymentStatusConfig[order.paymentStatus];
                                return (
                                    <TableRow key={order.id} className="border-slate-50 hover:bg-slate-50/50">
                                        <TableCell className="font-mono font-semibold text-sm text-blue-600">{order.id}</TableCell>
                                        <TableCell className="text-sm text-slate-500">{order.date}</TableCell>
                                        <TableCell>
                                            <p className="font-medium text-slate-900 text-sm">{order.customer}</p>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-0.5">
                                                {order.products.slice(0, 2).map((p, i) => (
                                                    <span key={i} className="text-sm text-slate-600">{p.name} × {p.qty}</span>
                                                ))}
                                                {order.products.length > 2 && (
                                                    <span className="text-xs text-blue-600">+{order.products.length - 2} منتجات أخرى</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="secondary" className={`${orderType.color} font-medium`}>
                                                {orderType.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="secondary" className={`${status.color} gap-1 font-medium`}>
                                                <StatusIcon size={12} />
                                                {status.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="secondary" className={`${paymentStatus.color} font-medium`}>
                                                {paymentStatus.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-bold text-slate-900">{order.total.toLocaleString('en-US')} ج.م</TableCell>
                                        <TableCell>
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                style={{ width: '36px', height: '36px', borderRadius: '8px', border: 'none', background: '#dbeafe', color: '#2563eb', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            >
                                                <Eye size={16} />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </Card>

            {/* Side Drawer */}
            {selectedOrder && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/30 z-40"
                        onClick={() => setSelectedOrder(null)}
                    />

                    {/* Drawer */}
                    <div className="fixed top-0 left-0 h-full w-[480px] bg-white shadow-2xl z-50 overflow-y-auto animate-in slide-in-from-left duration-300">
                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b border-slate-100 p-5 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">تفاصيل الطلب</h3>
                                <p className="text-sm text-blue-600 font-mono">{selectedOrder.id}</p>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-6">
                            {/* Status Cards */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-4 bg-slate-50 rounded-xl">
                                    <p className="text-xs text-slate-500 mb-2">حالة الطلب</p>
                                    <Badge variant="secondary" className={`${statusConfig[selectedOrder.status].color} gap-1 font-semibold`}>
                                        {React.createElement(statusConfig[selectedOrder.status].icon, { size: 14 })}
                                        {statusConfig[selectedOrder.status].label}
                                    </Badge>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl">
                                    <p className="text-xs text-slate-500 mb-2">حالة الدفع</p>
                                    <Badge variant="secondary" className={`${paymentStatusConfig[selectedOrder.paymentStatus].color} font-semibold`}>
                                        {paymentStatusConfig[selectedOrder.paymentStatus].label}
                                    </Badge>
                                </div>
                            </div>

                            {/* Customer Info */}
                            <div className="bg-white border border-slate-200 rounded-xl p-4">
                                <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                    <User size={16} className="text-blue-600" />
                                    بيانات العميل
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                                            <User size={16} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">الاسم</p>
                                            <p className="font-medium text-slate-900">{selectedOrder.customer}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                                            <Phone size={16} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">الهاتف</p>
                                            <p className="font-medium text-slate-900" dir="ltr">{selectedOrder.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                                            <MapPin size={16} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">العنوان</p>
                                            <p className="font-medium text-slate-900">{selectedOrder.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Info */}
                            <div className="bg-white border border-slate-200 rounded-xl p-4">
                                <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                    <Truck size={16} className="text-blue-600" />
                                    بيانات الشحن
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
                                            <Truck size={16} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">شركة الشحن</p>
                                            <p className="font-medium text-slate-900">{selectedOrder.carrier}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
                                            <FileText size={16} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">رقم التتبع</p>
                                            <p className="font-mono font-medium text-slate-900">{selectedOrder.trackingNumber}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Products */}
                            <div className="bg-white border border-slate-200 rounded-xl p-4">
                                <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                    <Package size={16} className="text-blue-600" />
                                    المنتجات
                                </h4>
                                <div className="space-y-3">
                                    {selectedOrder.products.map((product, idx) => (
                                        <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                                            <div>
                                                <p className="font-medium text-slate-900 text-sm">{product.name}</p>
                                                <p className="text-xs text-slate-500">الكمية: {product.qty}</p>
                                            </div>
                                            <p className="font-semibold text-slate-900">{product.price.toLocaleString()} ج.م</p>
                                        </div>
                                    ))}
                                    <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                                        <p className="font-semibold text-slate-900">الإجمالي</p>
                                        <p className="font-bold text-lg text-blue-600">{selectedOrder.total.toLocaleString()} ج.م</p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-slate-600 shadow-sm">
                                    <CreditCard size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">طريقة الدفع</p>
                                    <p className="font-medium text-slate-900">{selectedOrder.paymentMethod}</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="sticky bottom-0 bg-white border-t border-slate-100 p-5 space-y-3">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 h-11 gap-2">
                                <Download size={18} />
                                تحميل الفاتورة
                            </Button>
                            <Button variant="outline" className="w-full h-11 gap-2 border-slate-200">
                                <Headphones size={18} />
                                التواصل مع الدعم
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
