import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import {
    Package,
    Plus,
    Search,
    CheckCircle,
    Clock,
    XCircle,
    AlertTriangle,
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
    Truck,
    Warehouse,
    Store,
    BarChart2,
    Power
} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
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
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

// Mock Data
const products = [
    {
        id: 1,
        name: 'هاتف سامسونج Galaxy S24 Ultra',
        sku: 'SAM-S24U-256',
        category: 'هواتف > سامسونج',
        condition: 'new',
        price: 45000,
        quantity: 25,
        inventoryType: 'platform',
        salesMethod: 'platform_full',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=100&h=100&fit=crop'
    },
    {
        id: 2,
        name: 'سماعات Apple AirPods Pro 2',
        sku: 'APL-APP2-WHT',
        category: 'سماعات > آبل',
        condition: 'new',
        price: 8500,
        quantity: 5,
        inventoryType: 'merchant',
        salesMethod: 'platform_ship',
        status: 'awaiting_transfer',
        receivedQty: 0,
        sentQty: 5,
        image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=100&h=100&fit=crop'
    },
    {
        id: 3,
        name: 'ساعة Huawei Watch GT4',
        sku: 'HUA-WGT4-BLK',
        category: 'ساعات ذكية > هواوي',
        condition: 'open_box',
        price: 6500,
        quantity: 0,
        inventoryType: 'platform',
        salesMethod: 'platform_full',
        status: 'out_of_stock',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop'
    },
    {
        id: 4,
        name: 'شاحن لاسلكي سريع 15W',
        sku: 'CHR-WLS-15W',
        category: 'اكسسوارات > شواحن',
        condition: 'new',
        price: 450,
        quantity: 150,
        inventoryType: 'platform',
        salesMethod: 'platform_full',
        status: 'pending_review',
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100&h=100&fit=crop'
    },
    {
        id: 5,
        name: 'حافظة هاتف جلد طبيعي',
        sku: 'CSE-LTH-BRN',
        category: 'اكسسوارات > حافظات',
        condition: 'new',
        price: 350,
        quantity: 80,
        inventoryType: 'merchant',
        salesMethod: 'self_ship',
        status: 'rejected',
        rejectionReason: 'صور غير واضحة',
        image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=100&h=100&fit=crop'
    },
    {
        id: 6,
        name: 'لابتوب MacBook Pro M3',
        sku: 'APL-MBP-M3',
        category: 'لابتوب > آبل',
        condition: 'used',
        price: 75000,
        quantity: 2,
        inventoryType: 'merchant',
        salesMethod: 'self_ship',
        status: 'inactive',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=100&h=100&fit=crop'
    }
];

const analysisData = [
    { label: 'إجمالي المبيعات', value: '12,450 ج.م', change: '+12%', isPositive: true },
    { label: 'عدد الطلبات', value: '45 طلب', change: '+5%', isPositive: true },
    { label: 'معدل التحويل', value: '2.4%', change: '-1.2%', isPositive: false },
    { label: 'متوسط التقييم', value: '4.8', change: '0%', isPositive: true },
];

const chartData = [
    { month: "يناير", sales: 186 },
    { month: "فبراير", sales: 305 },
    { month: "مارس", sales: 237 },
    { month: "أبريل", sales: 73 },
    { month: "مايو", sales: 209 },
    { month: "يونيو", sales: 214 },
]

const chartConfig = {
    sales: {
        label: "المبيعات",
        color: "#2563eb",
    },
}

const statusConfig = {
    active: { label: 'نشط', color: 'bg-emerald-50 text-emerald-700', icon: CheckCircle },
    pending_review: { label: 'تحت المراجعة', color: 'bg-amber-50 text-amber-700', icon: Clock },
    awaiting_transfer: { label: 'بانتظار النقل', color: 'bg-blue-50 text-blue-700', icon: Truck },
    rejected: { label: 'مرفوض', color: 'bg-rose-50 text-rose-700', icon: XCircle },
    out_of_stock: { label: 'نفذ المخزون', color: 'bg-slate-100 text-slate-600', icon: XCircle },
    inactive: { label: 'غير نشط', color: 'bg-slate-100 text-slate-500', icon: Power },
};

const salesMethodConfig = {
    platform_full: { label: 'مخزون المنصة', icon: Warehouse, color: 'text-blue-600 bg-blue-50' },
    platform_ship: { label: 'شحن المنصة', icon: Truck, color: 'text-sky-600 bg-sky-50' },
    self_ship: { label: 'شحن التاجر', icon: Store, color: 'text-purple-600 bg-purple-50' },
};

const conditionConfig = {
    new: { label: 'جديد', color: 'bg-emerald-50 text-emerald-700' },
    open_box: { label: 'مفتوح الصندوق', color: 'bg-blue-50 text-blue-700' },
    used: { label: 'مستعمل', color: 'bg-amber-50 text-amber-700' },
};

const filters = [
    { id: 'all', label: 'كل المنتجات', count: 6 },
    { id: 'pending_review', label: 'تحت المراجعة', count: 1 },
    { id: 'awaiting_transfer', label: 'بانتظار النقل', count: 1 },
    { id: 'rejected', label: 'مرفوض', count: 1 },
    { id: 'active', label: 'نشط', count: 1 },
    { id: 'inactive', label: 'غير نشط', count: 1 },
    { id: 'out_of_stock', label: 'نفذ المخزون', count: 1 },
];


export default function Products() {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [activeFilter, setActiveFilter] = useState('all');

    // Sheet State
    const [sheetOpen, setSheetOpen] = useState(false);
    const [activeProduct, setActiveProduct] = useState(null);
    const [activeAction, setActiveAction] = useState('details'); // details, edit, analyze

    const handleAction = (product, action) => {
        setActiveProduct(product);
        setActiveAction(action);
        setSheetOpen(true);
    };

    const filteredProducts = activeFilter === 'all'
        ? products
        : products.filter(p => p.status === activeFilter);

    // Render Side Menu Content
    const renderSheetContent = () => {
        if (!activeProduct) return null;

        if (activeAction === 'analyze') {
            return (
                <div className="space-y-6 py-6 px-6" dir="rtl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                            <BarChart2 size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">تحليل أداء المنتج</h3>
                            <p className="text-xs text-slate-500">{activeProduct.name}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {analysisData.map((stat, idx) => (
                            <div key={idx} className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                                <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
                                <p className="text-xl font-bold text-slate-900 mb-1">{stat.value}</p>
                                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${stat.isPositive
                                    ? 'bg-emerald-50 text-emerald-600'
                                    : 'bg-rose-50 text-rose-600'
                                    }`}>
                                    {stat.change} عن الشهر الماضي
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
                        <h4 className="text-sm font-bold text-slate-900 mb-4">مخطط المبيعات</h4>
                        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                            <BarChart accessibilityLayer data={chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </div>
                </div>
            );
        }

        if (activeAction === 'edit') {
            return (
                <div className="space-y-6 py-6 px-6">
                    <div className="space-y-2">
                        <Label>اسم المنتج</Label>
                        <Input defaultValue={activeProduct.name} />
                    </div>
                    <div className="space-y-2">
                        <Label>السعر</Label>
                        <Input defaultValue={activeProduct.price} type="number" />
                    </div>
                    <div className="space-y-2">
                        <Label>الكمية</Label>
                        <Input defaultValue={activeProduct.quantity} type="number" />
                    </div>
                    <div className="space-y-2">
                        <Label>الحالة</Label>
                        <Select defaultValue={activeProduct.status}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">نشط</SelectItem>
                                <SelectItem value="inactive">غير نشط</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">حفظ التغييرات</Button>
                </div>
            );
        }

        // Default: Details
        return (
            <div className="space-y-6 py-2 px-6">
                {/* Status Cards */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
                        <span className="text-xs text-slate-500 mb-1">طريقة البيع</span>
                        <div className="flex items-center gap-2 font-semibold text-slate-900">
                            {/* Icon usage would go here if available in object */}
                            {activeProduct.salesMethod === 'platform_full' ? 'مخزون المنصة' : 'شحن التاجر'}
                        </div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
                        <span className="text-xs text-slate-500 mb-1">حالة المخزون</span>
                        <Badge variant="outline" className="mt-1 bg-white">
                            {activeProduct.status === 'active' ? 'نشط' : activeProduct.status}
                        </Badge>
                    </div>
                </div>

                {/* Product Info Card */}
                <div className="border border-slate-100 rounded-xl p-4 bg-white shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-lg bg-slate-50 border border-slate-100 shrink-0 overflow-hidden">
                            <img src={activeProduct.image} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="flex-1 space-y-1">
                            <h4 className="font-bold text-slate-900 text-sm">{activeProduct.name}</h4>
                            <p className="text-xs text-slate-500">SKU: {activeProduct.sku}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-50">
                        <div>
                            <span className="text-xs text-slate-400 block mb-1">السعر</span>
                            <span className="font-bold text-slate-900">{activeProduct.price.toLocaleString()} ج.م</span>
                        </div>
                        <div>
                            <span className="text-xs text-slate-400 block mb-1">الكمية</span>
                            <span className="font-bold text-slate-900">{activeProduct.quantity}</span>
                        </div>
                    </div>
                </div>

                {/* Info Cards Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-xs text-slate-500 block mb-1">الفئة</span>
                        <span className="font-semibold text-slate-900 text-sm">{activeProduct.category}</span>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                        <span className="text-xs text-amber-600 block mb-1">الحالة</span>
                        <span className="font-semibold text-amber-900 text-sm">
                            {activeProduct.condition === 'new' ? 'جديد' : 'مستعمل'}
                        </span>
                    </div>
                </div>

                {/* Warehouse Address */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                    <Warehouse className="text-slate-400 mt-1" size={18} />
                    <div>
                        <span className="text-xs text-slate-500 block">عنوان التخزين</span>
                        <span className="text-sm font-semibold text-slate-900 block mt-1">المستودع الرئيسي - 6 أكتوبر، الجيزة</span>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center gap-3 pt-4">
                    <Button variant="outline" className="flex-1 border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700">
                        <Trash2 size={16} className="ml-2" />
                        حذف المنتج
                    </Button>
                    <Button onClick={() => setActiveAction('edit')} className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <Edit size={16} className="ml-2" />
                        تعديل البيانات
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Sheet Component */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent side="left" className="w-[400px] sm:w-[540px] overflow-y-auto px-0">
                    <SheetHeader className="px-3 pt-12">
                        <SheetTitle className="text-start flex items-center gap-2">
                            {activeAction === 'analyze' && <BarChart2 className="text-blue-600" size={20} />}
                            {activeAction === 'edit' && <Edit className="text-blue-600" size={20} />}
                            {activeAction === 'details' && <Eye className="text-blue-600" size={20} />}

                            {activeAction === 'analyze' ? 'تحليل أداء المنتج' :
                                activeAction === 'edit' ? 'تعديل المنتج' : 'تفاصل المنتج'}
                        </SheetTitle>
                        <SheetDescription className="text-start">
                            {activeProduct?.name}
                        </SheetDescription>
                    </SheetHeader>

                    {renderSheetContent()}
                </SheetContent>
            </Sheet>

            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">{t('products.title')}</h2>
                    <p className="text-sm text-slate-500 mt-1">{t('products.subtitle')}</p>
                </div>
                <Button onClick={() => navigate('/products/add')} className="bg-blue-600 hover:bg-blue-700 gap-2 h-11 shadow-sm shadow-blue-200">
                    <Plus size={18} />
                    {t('products.addProduct')}
                </Button>
            </div>

            {/* Filters & Table */}
            <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
                {/* Horizontal Tabs */}
                <div className="border-b border-slate-100 overflow-x-auto">
                    <div className="flex min-w-max px-4">
                        {filters.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`px-4 py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeFilter === filter.id
                                    ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                {filter.label}
                                <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeFilter === filter.id
                                    ? 'bg-blue-100 text-blue-600'
                                    : 'bg-slate-100 text-slate-500'
                                    }`}>
                                    {filter.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search Bar */}
                <div className="p-4 border-b border-slate-50 flex items-center justify-between gap-4">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder={t('products.searchPlaceholder')}
                            className="pr-10 bg-slate-50 border-slate-200 focus-visible:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-md border overflow-hidden">
                    <Table>
                        <TableHeader className="bg-muted/50 sticky top-0 z-10 backdrop-blur-xs">
                            <TableRow className="hover:bg-transparent border-slate-100">
                                <TableHead className="text-right font-medium text-muted-foreground w-[80px]">صورة</TableHead>
                                <TableHead className="text-right font-medium text-muted-foreground min-w-[200px]">{t('products.productName')}</TableHead>
                                <TableHead className="text-center font-medium text-muted-foreground">SKU</TableHead>
                                <TableHead className="text-center font-medium text-muted-foreground">الحالة</TableHead>
                                <TableHead className="text-center font-medium text-muted-foreground">طريقة البيع</TableHead>
                                <TableHead className="text-center font-medium text-muted-foreground">المخزون</TableHead>
                                <TableHead className="text-center font-medium text-muted-foreground">{t('products.price')}</TableHead>
                                <TableHead className="text-center font-medium text-muted-foreground">{t('products.status')}</TableHead>
                                <TableHead className="text-center w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.map((product) => {
                                const status = statusConfig[product.status];
                                const StatusIcon = status.icon;
                                const salesMethod = salesMethodConfig[product.salesMethod];
                                const condition = conditionConfig[product.condition];

                                return (
                                    <TableRow key={product.id} className="hover:bg-muted/50 group transition-colors">
                                        <TableCell>
                                            <div className="w-12 h-12 rounded-lg bg-slate-50 overflow-hidden border border-slate-200">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <p
                                                    onClick={() => handleAction(product, 'details')}
                                                    className="font-medium text-foreground text-sm line-clamp-1 group-hover:text-primary transition-colors cursor-pointer hover:underline"
                                                >
                                                    {product.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">{product.category}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <code className="text-xs bg-muted px-2 py-1 rounded border border-border text-muted-foreground font-mono">
                                                {product.sku}
                                            </code>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="secondary" className={`${condition.color} font-normal border-0`}>
                                                {condition.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="secondary" className={`${salesMethod.color} gap-1 font-medium border-0`}>
                                                <salesMethod.icon size={12} />
                                                {salesMethod.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex flex-col items-center">
                                                <span className={`font-bold ${product.quantity <= 5 ? 'text-rose-600' : 'text-foreground'}`}>
                                                    {product.quantity}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center font-bold text-foreground">
                                            {product.price.toLocaleString()} ج.م
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <Badge variant="secondary" className={`${status.color} gap-1 font-medium border-0`}>
                                                    <StatusIcon size={12} />
                                                    {status.label}
                                                </Badge>
                                                {product.status === 'rejected' && (
                                                    <span className="text-[10px] text-rose-500 max-w-[100px] truncate">
                                                        {product.rejectionReason}
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted">
                                                        <MoreHorizontal size={16} />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-[180px] bg-white">
                                                    <DropdownMenuItem
                                                        className="gap-2 flex-row-reverse cursor-pointer"
                                                        onClick={() => handleAction(product, 'analyze')}
                                                    >
                                                        <BarChart2 size={14} className="text-blue-500" />
                                                        تحليل الأداء
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="gap-2 flex-row-reverse cursor-pointer"
                                                        onClick={() => handleAction(product, 'details')}
                                                    >
                                                        <Eye size={14} className="text-muted-foreground" />
                                                        {t('common.viewDetails')}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="gap-2 flex-row-reverse cursor-pointer"
                                                        onClick={() => handleAction(product, 'edit')}
                                                    >
                                                        <Edit size={14} className="text-muted-foreground" />
                                                        {t('common.editProduct')}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="gap-2 flex-row-reverse cursor-pointer">
                                                        <Power size={14} className={product.status === 'inactive' ? "text-emerald-500" : "text-muted-foreground"} />
                                                        {product.status === 'inactive' ? 'تنشيط المنتج' : 'إلغاء التنشيط'}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-2 flex-row-reverse text-red-600 focus:text-red-600 cursor-pointer">
                                                        <Trash2 size={14} />
                                                        {t('common.deleteProduct')}
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">عرض {filteredProducts.length} من {products.length} منتج</span>
                    <div className="flex gap-1">
                        <Button variant="outline" size="sm" className="h-8 px-3 text-xs" disabled>السابق</Button>
                        <Button variant="default" size="sm" className="h-8 px-3 text-xs">1</Button>
                        <Button variant="outline" size="sm" className="h-8 px-3 text-xs" disabled>التالي</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
