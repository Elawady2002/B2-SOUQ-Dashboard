import { useState } from 'react';
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
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
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

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

export default function Orders() {
    const { t } = useLanguage();
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Dynamic status config with translations
    const statusConfig = {
        new: { label: t('orders.new'), color: 'bg-blue-50 text-blue-700', icon: Package },
        processing: { label: t('orders.processing'), color: 'bg-amber-50 text-amber-700', icon: Clock },
        shipping: { label: t('orders.shipping'), color: 'bg-sky-50 text-sky-700', icon: Truck },
        completed: { label: t('orders.completed'), color: 'bg-emerald-50 text-emerald-700', icon: CheckCircle },
        cancelled: { label: t('orders.cancelled'), color: 'bg-red-50 text-red-700', icon: XCircle },
    };

    const paymentStatusConfig = {
        paid: { label: t('orders.paid'), color: 'bg-emerald-50 text-emerald-700' },
        unpaid: { label: t('orders.unpaid'), color: 'bg-amber-50 text-amber-700' },
        refunded: { label: t('orders.refunded'), color: 'bg-slate-100 text-slate-600' },
    };

    const orderTypeConfig = {
        platform: { label: t('orders.platformOrder'), color: 'bg-blue-50 text-blue-700', icon: PackageCheck },
        merchant: { label: t('orders.merchantOrder'), color: 'bg-purple-50 text-purple-700', icon: Store },
    };

    const statusFilters = [
        { id: 'all', label: t('orders.all') },
        { id: 'new', label: t('orders.new') },
        { id: 'processing', label: t('orders.processing') },
        { id: 'shipping', label: t('orders.shipping') },
        { id: 'completed', label: t('orders.completed') },
        { id: 'cancelled', label: t('orders.cancelled') },
    ];

    const filteredOrders = activeFilter === 'all'
        ? orders
        : orders.filter(o => o.status === activeFilter);

    // Stats calculations
    const totalOrders = orders.length;
    const inProgress = orders.filter(o => ['new', 'processing', 'shipping'].includes(o.status)).length;
    const merchantOrders = orders.filter(o => o.orderType === 'merchant').length;
    const deliveredOrders = orders.filter(o => o.status === 'completed').length;

    return (
        <div className="flex flex-col gap-3">
            {/* Page Header */}
            <div>
                <h2 className="text-2xl font-bold text-slate-900">{t('orders.title')}</h2>
                <p className="text-sm text-slate-500 mt-1">{t('orders.subtitle')}</p>
            </div>

            {/* Stats Cards - 4 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent>
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                <ShoppingCart size={22} />
                            </div>
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12%</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 mb-1">{totalOrders}</p>
                        <p className="text-sm text-slate-500">{t('orders.totalOrders')}</p>
                    </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent>
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                                <Clock size={22} />
                            </div>
                            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">{inProgress}</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 mb-1">{inProgress}</p>
                        <p className="text-sm text-slate-500">{t('orders.inProgress')}</p>
                    </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent>
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                                <Store size={22} />
                            </div>
                            <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">{merchantOrders}</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 mb-1">{merchantOrders}</p>
                        <p className="text-sm text-slate-500">{t('orders.merchantOrders')}</p>
                    </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent>
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                <CheckCircle size={22} />
                            </div>
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+8%</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 mb-1">{deliveredOrders}</p>
                        <p className="text-sm text-slate-500">{t('orders.delivered')}</p>
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
                                <Button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    variant={activeFilter === filter.id ? "default" : "secondary"}
                                    size="sm"
                                    className={activeFilter === filter.id ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}
                                >
                                    {filter.label}
                                </Button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative w-full md:w-72">
                            <Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder={t('orders.searchPlaceholder')}
                                className="pr-10 bg-slate-50 border-slate-200"
                            />
                        </div>
                    </div>
                </div>

                <div className="rounded-md border overflow-hidden">
                    <Table>
                        <TableHeader className="bg-muted/50 sticky top-0 z-10 backdrop-blur-xs">
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="w-[100px] text-right font-medium text-muted-foreground">{t('orders.orderNumber')}</TableHead>
                                <TableHead className="text-right font-medium text-muted-foreground">{t('returns.date')}</TableHead>
                                <TableHead className="text-right font-medium text-muted-foreground">{t('orders.customer')}</TableHead>
                                <TableHead className="text-right font-medium text-muted-foreground">{t('orders.products')}</TableHead>
                                <TableHead className="text-right font-medium text-muted-foreground">{t('orders.orderType')}</TableHead>
                                <TableHead className="text-right font-medium text-muted-foreground">{t('products.status')}</TableHead>
                                <TableHead className="text-right font-medium text-muted-foreground">{t('orders.payment')}</TableHead>
                                <TableHead className="text-right font-medium text-muted-foreground">{t('orders.total')}</TableHead>
                                <TableHead className="text-right font-medium text-muted-foreground">{t('orders.actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders.map((order) => {
                                const status = statusConfig[order.status];
                                const StatusIcon = status.icon;
                                const orderType = orderTypeConfig[order.orderType];
                                const paymentStatus = paymentStatusConfig[order.paymentStatus];
                                return (
                                    <TableRow key={order.id} className="hover:bg-muted/50 transition-colors">
                                        <TableCell className="font-mono font-medium text-primary text-sm">{order.id}</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">{order.date}</TableCell>
                                        <TableCell>
                                            <p className="font-medium text-foreground text-sm">{order.customer}</p>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-0.5">
                                                {order.products.slice(0, 2).map((p, i) => (
                                                    <span key={i} className="text-sm text-muted-foreground">{p.name} × {p.qty}</span>
                                                ))}
                                                {order.products.length > 2 && (
                                                    <span className="text-xs text-primary">+{order.products.length - 2} {t('orders.moreProducts')}</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="secondary" className={`${orderType.color} border-none font-medium text-xs`}>
                                                {orderType.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="secondary" className={`${status.color} border-none gap-1 font-medium`}>
                                                <StatusIcon size={12} />
                                                {status.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="outline" className={`${paymentStatus.color} border-0 px-2 font-medium`}>
                                                {paymentStatus.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-bold text-foreground">{order.total.toLocaleString('en-US')} {t('home.currency')}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => setSelectedOrder(order)}
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground hover:text-primary"
                                            >
                                                <Eye size={16} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </Card >

            {/* Order Details Sheet */}
            <Sheet open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
                <SheetContent side="left" className="w-[400px] sm:w-[540px] p-0 flex flex-col gap-0 border-r border-slate-200 overflow-hidden">
                    <SheetHeader className="px-3 pt-12 pb-6 border-b border-slate-100 bg-slate-50/30">
                        <SheetTitle className="text-xl font-bold text-slate-900 text-start">
                            {t('orders.orderDetails')}
                        </SheetTitle>
                        {selectedOrder && (
                            <SheetDescription className="text-start flex items-center gap-2 mt-2">
                                <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-500">
                                    {selectedOrder.id}
                                </span>
                            </SheetDescription>
                        )}
                    </SheetHeader>

                    {selectedOrder && (
                        <>
                            <div className="flex-1 overflow-y-auto">
                                <div className="p-6 space-y-6" dir="rtl">
                                    {/* Status Cards */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                                            <p className="text-xs text-slate-500 mb-2">{t('orders.orderStatus')}</p>
                                            <Badge variant="secondary" className={`${statusConfig[selectedOrder.status].color} gap-1 font-semibold justify-center`}>
                                                {React.createElement(statusConfig[selectedOrder.status].icon, { size: 14 })}
                                                {statusConfig[selectedOrder.status].label}
                                            </Badge>
                                        </div>
                                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                                            <p className="text-xs text-slate-500 mb-2">{t('orders.paymentStatus')}</p>
                                            <Badge variant="secondary" className={`${paymentStatusConfig[selectedOrder.paymentStatus].color} font-semibold justify-center`}>
                                                {paymentStatusConfig[selectedOrder.paymentStatus].label}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Customer Info */}
                                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                                        <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                            <User size={16} className="text-blue-600" />
                                            {t('orders.customerData')}
                                        </h4>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                                                    <User size={16} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500">{t('orders.name')}</p>
                                                    <p className="font-medium text-slate-900">{selectedOrder.customer}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                                                    <Phone size={16} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500">{t('orders.phone')}</p>
                                                    <p className="font-medium text-slate-900" dir="ltr">{selectedOrder.phone}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                                                    <MapPin size={16} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500">{t('orders.address')}</p>
                                                    <p className="font-medium text-slate-900">{selectedOrder.address}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Shipping Info */}
                                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                                        <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                            <Truck size={16} className="text-blue-600" />
                                            {t('orders.shippingData')}
                                        </h4>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
                                                    <Truck size={16} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500">{t('orders.shippingCompany')}</p>
                                                    <p className="font-medium text-slate-900">{selectedOrder.carrier}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
                                                    <FileText size={16} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500">{t('orders.trackingNumber')}</p>
                                                    <p className="font-mono font-medium text-slate-900">{selectedOrder.trackingNumber}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Products */}
                                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                                        <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                            <Package size={16} className="text-blue-600" />
                                            {t('orders.products')}
                                        </h4>
                                        <div className="space-y-3">
                                            {selectedOrder.products.map((product, idx) => (
                                                <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                                                    <div>
                                                        <p className="font-medium text-slate-900 text-sm">{product.name}</p>
                                                        <p className="text-xs text-slate-500">{t('orders.quantity')}: {product.qty}</p>
                                                    </div>
                                                    <p className="font-semibold text-slate-900">{product.price.toLocaleString()} {t('home.currency')}</p>
                                                </div>
                                            ))}
                                            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                                                <p className="font-semibold text-slate-900">{t('orders.total')}</p>
                                                <p className="font-bold text-lg text-blue-600">{selectedOrder.total.toLocaleString()} {t('home.currency')}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Info */}
                                    <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3 border border-slate-200">
                                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-slate-600 shadow-sm border border-slate-100">
                                            <CreditCard size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">{t('orders.paymentMethod')}</p>
                                            <p className="font-medium text-slate-900">{selectedOrder.paymentMethod}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-3">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 h-11 gap-2">
                                    <Download size={18} />
                                    {t('orders.downloadInvoice')}
                                </Button>
                                <Button variant="outline" className="w-full h-11 gap-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-700">
                                    <Headphones size={18} />
                                    {t('orders.contactSupport')}
                                </Button>
                            </div>
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </div >
    );
}
