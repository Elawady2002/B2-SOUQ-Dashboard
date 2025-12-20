import { useState } from 'react';
import {
    Package,
    Plus,
    Search,
    Filter,
    CheckCircle,
    Clock,
    XCircle,
    AlertTriangle,
    Pause,
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
    Upload,
    ShoppingCart,
    RotateCcw,
    Star
} from 'lucide-react';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Mock Data
const products = [
    {
        id: 1,
        name: 'هاتف سامسونج Galaxy S24 Ultra',
        sku: 'SAM-S24U-256',
        category: 'هواتف',
        price: 45000,
        quantity: 25,
        shipping: 'شحن المنصة',
        sales: 145,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=100&h=100&fit=crop'
    },
    {
        id: 2,
        name: 'سماعات Apple AirPods Pro 2',
        sku: 'APL-APP2-WHT',
        category: 'سماعات',
        price: 8500,
        quantity: 5,
        shipping: 'شحن ذاتي',
        sales: 98,
        status: 'low_stock',
        image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=100&h=100&fit=crop'
    },
    {
        id: 3,
        name: 'ساعة Huawei Watch GT4',
        sku: 'HUA-WGT4-BLK',
        category: 'ساعات ذكية',
        price: 6500,
        quantity: 0,
        shipping: 'شحن المنصة',
        sales: 76,
        status: 'out_of_stock',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop'
    },
    {
        id: 4,
        name: 'شاحن لاسلكي سريع 15W',
        sku: 'CHR-WLS-15W',
        category: 'اكسسوارات',
        price: 450,
        quantity: 150,
        shipping: 'شحن المنصة',
        sales: 234,
        status: 'pending_review',
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100&h=100&fit=crop'
    },
    {
        id: 5,
        name: 'حافظة هاتف جلد طبيعي',
        sku: 'CSE-LTH-BRN',
        category: 'اكسسوارات',
        price: 350,
        quantity: 80,
        shipping: 'شحن ذاتي',
        sales: 312,
        status: 'rejected',
        image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=100&h=100&fit=crop'
    },
];

const statusConfig = {
    active: { label: 'نشط', color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100', icon: CheckCircle },
    pending_review: { label: 'تحت المراجعة', color: 'bg-amber-50 text-amber-700 hover:bg-amber-100', icon: Clock },
    rejected: { label: 'مرفوض', color: 'bg-rose-50 text-rose-700 hover:bg-rose-100', icon: XCircle },
    low_stock: { label: 'منخفض المخزون', color: 'bg-orange-50 text-orange-700 hover:bg-orange-100', icon: AlertTriangle },
    out_of_stock: { label: 'نفذ المخزون', color: 'bg-slate-100 text-slate-700 hover:bg-slate-200', icon: AlertTriangle },
    suspended: { label: 'موقوف', color: 'bg-red-50 text-red-700 hover:bg-red-100', icon: Pause },
};

const filters = [
    { id: 'all', label: 'الكل', count: 5 },
    { id: 'active', label: 'نشط', count: 1 },
    { id: 'pending_review', label: 'تحت المراجعة', count: 1 },
    { id: 'rejected', label: 'مرفوض', count: 1 },
    { id: 'low_stock', label: 'منخفض المخزون', count: 1 },
    { id: 'out_of_stock', label: 'نفذ المخزون', count: 1 },
];

export default function Products() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const filteredProducts = activeFilter === 'all'
        ? products
        : products.filter(p => p.status === activeFilter);

    const handleAnalytics = (product) => {
        setSelectedProduct(product);
        setShowAnalyticsModal(true);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">المنتجات</h2>
                    <p className="text-sm text-slate-500 mt-1">إدارة منتجات متجرك ومتابعة المخزون</p>
                </div>
                <Button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700 gap-2">
                    <Plus size={18} />
                    إضافة منتج
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <Package size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">إجمالي المنتجات</p>
                            <p className="text-lg font-bold text-slate-900">156</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <CheckCircle size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">منتجات نشطة</p>
                            <p className="text-lg font-bold text-slate-900">142</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">تحت المراجعة</p>
                            <p className="text-lg font-bold text-slate-900">8</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                            <AlertTriangle size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">منخفض المخزون</p>
                            <p className="text-lg font-bold text-slate-900">12</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
                            <XCircle size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">مرفوض</p>
                            <p className="text-lg font-bold text-slate-900">3</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters & Content */}
            <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader className="pb-4 border-b border-slate-50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Status Filters */}
                        <div className="flex flex-wrap gap-2">
                            {filters.map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeFilter === filter.id
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                >
                                    {filter.label}
                                    <span className={`mr-1.5 text-xs ${activeFilter === filter.id ? 'text-slate-300' : 'text-slate-500'}`}>
                                        ({filter.count})
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative w-full md:w-64">
                            <Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="بحث عن منتج..."
                                className="pr-9 bg-slate-50 border-slate-200"
                            />
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50/50">
                            <TableRow className="hover:bg-transparent border-slate-100">
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">المنتج</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">SKU</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">الفئة</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">السعر</TableHead>
                                <TableHead className="text-center h-10 text-xs font-semibold text-slate-600">الكمية</TableHead>
                                <TableHead className="text-center h-10 text-xs font-semibold text-slate-600">الشحن</TableHead>
                                <TableHead className="text-center h-10 text-xs font-semibold text-slate-600">المبيعات</TableHead>
                                <TableHead className="text-center h-10 text-xs font-semibold text-slate-600">الحالة</TableHead>
                                <TableHead className="text-center h-10 w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.map((product) => {
                                const status = statusConfig[product.status];
                                const StatusIcon = status.icon;
                                return (
                                    <TableRow key={product.id} className="border-slate-50 hover:bg-slate-50/50">
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
                                                    {product.image ? (
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                            <Package size={20} />
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="text-slate-700 line-clamp-2 max-w-[200px]">{product.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-slate-500 font-mono text-xs">{product.sku}</TableCell>
                                        <TableCell className="text-slate-600">{product.category}</TableCell>
                                        <TableCell className="font-bold text-slate-900">{product.price.toLocaleString('en-US')} ج.م</TableCell>
                                        <TableCell className="text-center">
                                            <span className={`font-semibold ${product.quantity <= 5 ? 'text-red-600' :
                                                product.quantity <= 20 ? 'text-orange-600' : 'text-emerald-600'
                                                }`}>
                                                {product.quantity}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="outline" className="bg-slate-50 text-slate-600 font-normal">
                                                {product.shipping}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center text-slate-600">{product.sales}</TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="secondary" className={`${status.color} gap-1 font-normal`}>
                                                <StatusIcon size={12} />
                                                {status.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4 text-slate-400" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-[160px] bg-white">
                                                    <DropdownMenuLabel className="text-right">الإجراءات</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="gap-2 flex-row-reverse cursor-pointer"
                                                        onClick={() => handleAnalytics(product)}
                                                    >
                                                        <Eye size={14} />
                                                        عرض التفاصيل
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-2 flex-row-reverse cursor-pointer">
                                                        <Edit size={14} />
                                                        تعديل المنتج
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="gap-2 flex-row-reverse text-red-600 focus:text-red-600 cursor-pointer">
                                                        <Trash2 size={14} />
                                                        حذف المنتج
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Add Product Modal */}
            <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
                <DialogContent className="sm:max-w-[800px] gap-6">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">إضافة منتج جديد</DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
                        {/* Basic Info */}
                        <div className="space-y-4 md:col-span-2">
                            <h4 className="text-sm font-semibold text-blue-600">أ. البيانات الأساسية</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>اسم المنتج</Label>
                                    <Input placeholder="أدخل اسم المنتج" />
                                </div>
                                <div className="space-y-2">
                                    <Label>كود SKU</Label>
                                    <Input placeholder="XXX-XXX-XXX" className="font-mono text-sm" />
                                </div>
                                <div className="space-y-2">
                                    <Label>الفئة الرئيسية</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="اختر الفئة" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="phones">هواتف</SelectItem>
                                            <SelectItem value="audio">سماعات</SelectItem>
                                            <SelectItem value="wearables">ساعات ذكية</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>الفئة الفرعية</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="اختر الفئة الفرعية" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="samsung">سامسونج</SelectItem>
                                            <SelectItem value="apple">آبل</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label>وصف المنتج</Label>
                                    <Textarea placeholder="اكتب وصف تفصيلي للمنتج..." rows={3} className="resize-none" />
                                </div>
                            </div>
                        </div>

                        <Separator className="md:col-span-2" />

                        {/* Pricing & Shipping */}
                        <div className="space-y-4 md:col-span-2">
                            <h4 className="text-sm font-semibold text-blue-600">ب. بيانات السعر والشحن</h4>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label>السعر (ج.م)</Label>
                                    <Input type="number" placeholder="0.00" />
                                </div>
                                <div className="space-y-2">
                                    <Label>الوزن (كجم)</Label>
                                    <Input type="number" placeholder="0.0" />
                                </div>
                                <div className="space-y-2">
                                    <Label>طريقة الشحن</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="اختر الطريقة" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="platform">شحن المنصة</SelectItem>
                                            <SelectItem value="self">شحن ذاتي</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="gap-2 border-t border-slate-100 pt-4">
                        <Button variant="outline" onClick={() => setShowAddModal(false)}>إلغاء</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">حفظ المنتج</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Analytics Modal */}
            <Dialog open={showAnalyticsModal} onOpenChange={setShowAnalyticsModal}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-lg font-bold text-slate-900 pb-4 border-b border-slate-100">
                            تحليل أداء: {selectedProduct?.name}
                        </DialogTitle>
                    </DialogHeader>

                    {selectedProduct && (
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <Card className="bg-slate-50 border-slate-100 shadow-none">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-2 text-blue-600">
                                        <Eye size={18} />
                                        <span className="text-xs font-semibold uppercase">الزيارات</span>
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900">1,245</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-slate-50 border-slate-100 shadow-none">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-2 text-amber-600">
                                        <ShoppingCart size={18} />
                                        <span className="text-xs font-semibold uppercase">الإضافة للعربة</span>
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900">342</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-slate-50 border-slate-100 shadow-none">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-2 text-emerald-600">
                                        <CheckCircle size={18} />
                                        <span className="text-xs font-semibold uppercase">طلبات ناجحة</span>
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900">{selectedProduct.sales}</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-slate-50 border-slate-100 shadow-none">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-2 text-rose-600">
                                        <RotateCcw size={18} />
                                        <span className="text-xs font-semibold uppercase">المرتجعات</span>
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900">8</p>
                                </CardContent>
                            </Card>

                            <div className="col-span-2 bg-blue-50/50 rounded-lg p-4 border border-blue-100">
                                <h4 className="flex items-center gap-2 font-semibold text-blue-700 mb-2">
                                    <Star size={16} />
                                    توصيات تحسين الأداء
                                </h4>
                                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                    <li>أضف المزيد من الصور عالية الجودة لزيادة معدل التحويل</li>
                                    <li>حسّن العنوان بإضافة كلمات مفتاحية (مثل: 5G, 256GB)</li>
                                    <li>المنتج يحقق مبيعات جيدة، فكر في عمل خصم لزيادة الكمية المباعة</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
