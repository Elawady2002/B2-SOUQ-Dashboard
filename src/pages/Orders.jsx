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
        shippingType: 'platform_full',
        status: 'new',
        date: '2024-12-18 10:30',
        paymentMethod: 'الدفع عند الاستلام'
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
        shippingType: 'platform_ship',
        status: 'processing',
        date: '2024-12-18 09:15',
        paymentMethod: 'بطاقة ائتمان'
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
        shippingType: 'self_ship',
        status: 'shipping',
        date: '2024-12-17 16:45',
        paymentMethod: 'الدفع عند الاستلام'
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
        shippingType: 'platform_full',
        status: 'completed',
        date: '2024-12-16 14:20',
        paymentMethod: 'محفظة إلكترونية'
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
        shippingType: 'self_ship',
        status: 'cancelled',
        date: '2024-12-15 11:00',
        paymentMethod: 'الدفع عند الاستلام'
    },
];

const statusConfig = {
    new: { label: 'جديد', color: 'bg-blue-50 text-blue-700', icon: Package },
    processing: { label: 'تحت التجهيز', color: 'bg-amber-50 text-amber-700', icon: Clock },
    shipping: { label: 'في النقل', color: 'bg-sky-50 text-sky-700', icon: Truck },
    completed: { label: 'مكتمل', color: 'bg-emerald-50 text-emerald-700', icon: CheckCircle },
    cancelled: { label: 'ملغي', color: 'bg-red-50 text-red-700', icon: XCircle },
};

const shippingTypes = {
    platform_full: { label: 'بيع وشحن عبر المنصة', color: 'bg-emerald-50 text-emerald-700', icon: PackageCheck },
    platform_ship: { label: 'بيع مباشر + شحن المنصة', color: 'bg-blue-50 text-blue-700', icon: Store },
    self_ship: { label: 'بيع وشحن ذاتي', color: 'bg-amber-50 text-amber-700', icon: Home },
};

const statusFilters = [
    { id: 'all', label: 'الكل' },
    { id: 'new', label: 'جديد' },
    { id: 'processing', label: 'تحت التجهيز' },
    { id: 'shipping', label: 'في النقل' },
    { id: 'completed', label: 'مكتمل' },
    { id: 'cancelled', label: 'ملغي' },
];

export default function Orders() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);

    // دالة إخفاء رقم الهاتف للخصوصية
    const maskPhoneNumber = (phone) => {
        // مثال: "+20 123 456 7890" -> "+20 ••• ••• 7890"
        const parts = phone.split(' ');
        if (parts.length >= 4) {
            return `${parts[0]} ••• ••• ${parts[parts.length - 1]}`;
        }
        return phone;
    };

    const filteredOrders = activeFilter === 'all'
        ? orders
        : orders.filter(o => o.status === activeFilter);

    return (
        <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div>
                <h2 className="text-2xl font-bold text-slate-900">الطلبات والشحن</h2>
                <p className="text-sm text-slate-500 mt-1">إدارة ومتابعة طلبات العملاء</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <Package size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">طلبات جديدة</p>
                            <p className="text-lg font-bold text-slate-900">24</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">تحت التجهيز</p>
                            <p className="text-lg font-bold text-slate-900">18</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-600">
                            <Truck size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">في النقل</p>
                            <p className="text-lg font-bold text-slate-900">42</p>
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
                            <p className="text-lg font-bold text-slate-900">156</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                            <XCircle size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">ملغي</p>
                            <p className="text-lg font-bold text-slate-900">8</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Shipping Types Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.values(shippingTypes).map((type, idx) => (
                    <Card key={idx} className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${type.color}`}>
                                    <type.icon size={20} />
                                </div>
                                <h4 className="font-semibold text-slate-900">{type.label}</h4>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                {idx === 0 && 'التاجر يسلم البضاعة لمخازن المنصة، والمنصة تتولى التجهيز والشحن والمرتجعات.'}
                                {idx === 1 && 'التاجر يستلم الطلب ويجهز، ثم المنصة تتولى النقل والتسليم للعميل.'}
                                {idx === 2 && 'التاجر يشحن بنفسه ويتحمل كامل المسئولية. المرتجعات تعود إليه مباشرة.'}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Filters & Content */}
            <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader className="pb-4 border-b border-slate-50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Status Filters */}
                        <div className="flex flex-wrap gap-2">
                            {statusFilters.map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeFilter === filter.id
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative w-full md:w-64">
                            <Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="بحث برقم الطلب..."
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
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">العميل</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">المنتجات</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">الإجمالي</TableHead>
                                <TableHead className="text-center h-10 text-xs font-semibold text-slate-600">نوع الشحن</TableHead>
                                <TableHead className="text-center h-10 text-xs font-semibold text-slate-600">الحالة</TableHead>
                                <TableHead className="text-center h-10 text-xs font-semibold text-slate-600">التاريخ</TableHead>
                                <TableHead className="text-center h-10 w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders.map((order) => {
                                const status = statusConfig[order.status];
                                const StatusIcon = status.icon;
                                const shipping = shippingTypes[order.shippingType];
                                return (
                                    <TableRow key={order.id} className="border-slate-50 hover:bg-slate-50/50">
                                        <TableCell className="font-mono font-medium text-xs text-slate-500">{order.id}</TableCell>
                                        <TableCell>
                                            <div>
                                                <p className="font-medium text-slate-900 text-sm">{order.customer}</p>
                                                <p className="text-xs text-slate-400 font-mono text-right" dir="ltr">{maskPhoneNumber(order.phone)}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                {order.products.map((p, i) => (
                                                    <span key={i} className="text-xs text-slate-600">{p.name} × {p.qty}</span>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-bold text-slate-900">{order.total.toLocaleString('en-US')} ج.م</TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="secondary" className={`${shipping.color} font-normal whitespace-nowrap`}>
                                                {shipping.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="secondary" className={`${status.color} gap-1 font-normal`}>
                                                <StatusIcon size={12} />
                                                {status.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center text-xs text-slate-500">{order.date}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                                                onClick={() => setSelectedOrder(order)}
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

            {/* Order Details Modal */}
            <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
                <DialogContent className="sm:max-w-[700px] bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                            تفاصيل الطلب: {selectedOrder?.id}
                        </DialogTitle>
                    </DialogHeader>

                    {selectedOrder && (
                        <div className="py-4 space-y-6">
                            {/* Status & Shipping Type */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <p className="text-xs text-slate-500 mb-2">حالة الطلب</p>
                                    <div className="flex items-center gap-2">
                                        {React.createElement(statusConfig[selectedOrder.status].icon, { size: 18, className: statusConfig[selectedOrder.status].color.split(' ')[1] })}
                                        <span className="font-semibold text-slate-900">{statusConfig[selectedOrder.status].label}</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <p className="text-xs text-slate-500 mb-2">نوع الشحن</p>
                                    <Badge variant="secondary" className={`${shippingTypes[selectedOrder.shippingType].color} font-medium`}>
                                        {shippingTypes[selectedOrder.shippingType].label}
                                    </Badge>
                                </div>
                            </div>

                            {/* Customer Info */}
                            <div>
                                <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                    <User size={16} className="text-blue-600" />
                                    بيانات العميل
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border border-slate-200 rounded-lg p-4">
                                    <div className="flex gap-3">
                                        <User size={16} className="text-slate-400 mt-1" />
                                        <div>
                                            <p className="text-xs text-slate-500">الاسم</p>
                                            <p className="font-medium text-slate-900">{selectedOrder.customer}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Phone size={16} className="text-slate-400 mt-1" />
                                        <div>
                                            <p className="text-xs text-slate-500">الهاتف</p>
                                            <p className="font-medium text-slate-900" dir="ltr">{selectedOrder.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 md:col-span-2 border-t border-slate-100 pt-3 mt-1">
                                        <MapPin size={16} className="text-slate-400 mt-1" />
                                        <div>
                                            <p className="text-xs text-slate-500">العنوان</p>
                                            <p className="font-medium text-slate-900">{selectedOrder.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Products */}
                            <div>
                                <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                    <ShoppingCart size={16} className="text-blue-600" />
                                    المنتجات
                                </h4>
                                <div className="space-y-3">
                                    {selectedOrder.products.map((product, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200 shadow-sm">
                                                    <Package size={20} className="text-slate-400" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900 text-sm">{product.name}</p>
                                                    <p className="text-xs text-slate-500">الكمية: {product.qty}</p>
                                                </div>
                                            </div>
                                            <p className="font-bold text-slate-900">{product.price.toLocaleString('en-US')} ج.م</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Payment Summary */}
                            <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-slate-600 font-medium">الإجمالي الكلي</span>
                                    <span className="text-2xl font-bold text-blue-700">{selectedOrder.total.toLocaleString('en-US')} ج.م</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <span>طريقة الدفع:</span>
                                    <span className="font-medium text-slate-700">{selectedOrder.paymentMethod}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter className="gap-2 border-t border-slate-100 pt-4">
                        <Button variant="outline" onClick={() => setSelectedOrder(null)}>إغلاق</Button>

                        {selectedOrder && selectedOrder.shippingType === 'platform_ship' && selectedOrder.status === 'processing' && (
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                <Truck size={16} className="ml-2" />
                                جاهز للشحن
                            </Button>
                        )}

                        {selectedOrder && selectedOrder.shippingType === 'self_ship' && selectedOrder.status === 'processing' && (
                            <Button className="bg-emerald-600 hover:bg-emerald-700">
                                <CheckCircle size={16} className="ml-2" />
                                تم الشحن
                            </Button>
                        )}

                        {selectedOrder && selectedOrder.status === 'new' && selectedOrder.shippingType !== 'platform_full' && (
                            <Button className="bg-amber-600 hover:bg-amber-700">
                                <Clock size={16} className="ml-2" />
                                بدء التجهيز
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
