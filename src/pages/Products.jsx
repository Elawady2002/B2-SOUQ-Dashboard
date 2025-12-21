import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from 'lucide-react';

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

// Mock Data
const products = [
    {
        id: 1,
        name: 'هاتف سامسونج Galaxy S24 Ultra',
        sku: 'SAM-S24U-256',
        category: 'هواتف',
        price: 45000,
        quantity: 25,
        inventoryType: 'platform',
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
        inventoryType: 'merchant',
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
        inventoryType: 'platform',
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
        inventoryType: 'platform',
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
        inventoryType: 'merchant',
        status: 'rejected',
        image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=100&h=100&fit=crop'
    },
];

const statusConfig = {
    active: { label: 'نشط', color: 'bg-emerald-50 text-emerald-700', icon: CheckCircle },
    pending_review: { label: 'تحت المراجعة', color: 'bg-amber-50 text-amber-700', icon: Clock },
    rejected: { label: 'مرفوض', color: 'bg-rose-50 text-rose-700', icon: XCircle },
    low_stock: { label: 'منخفض المخزون', color: 'bg-orange-50 text-orange-700', icon: AlertTriangle },
    out_of_stock: { label: 'نفذ المخزون', color: 'bg-slate-100 text-slate-600', icon: AlertTriangle },
};

const inventoryTypeConfig = {
    platform: { label: 'مخزون المنصة', color: 'bg-blue-50 text-blue-700' },
    merchant: { label: 'مخزون التاجر', color: 'bg-purple-50 text-purple-700' },
};

const filters = [
    { id: 'all', label: 'الكل', count: 5 },
    { id: 'active', label: 'نشط', count: 1 },
    { id: 'pending_review', label: 'تحت المراجعة', count: 1 },
    { id: 'rejected', label: 'مرفوض', count: 1 },
    { id: 'out_of_stock', label: 'نفذ المخزون', count: 2 },
];

export default function Products() {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredProducts = activeFilter === 'all'
        ? products
        : products.filter(p => p.status === activeFilter);

    return (
        <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">المنتجات</h2>
                    <p className="text-sm text-slate-500 mt-1">إدارة منتجات متجرك ومتابعة المخزون</p>
                </div>
                <Button onClick={() => navigate('/products/add')} className="bg-blue-600 hover:bg-blue-700 gap-2 h-11">
                    <Plus size={18} />
                    إضافة منتج
                </Button>
            </div>

            {/* Filters & Table */}
            <Card className="bg-white border-slate-200 shadow-sm">
                {/* Horizontal Tabs */}
                <div className="border-b border-slate-100 px-4">
                    <div className="flex gap-1">
                        {filters.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeFilter === filter.id
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                {filter.label}
                                <span className={`mr-2 text-xs px-1.5 py-0.5 rounded-full ${activeFilter === filter.id
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
                <div className="p-4 border-b border-slate-50">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="بحث عن منتج باسمه أو SKU..."
                            className="pr-10 bg-slate-50 border-slate-200"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-slate-50/80">
                            <TableRow className="hover:bg-transparent border-slate-100">
                                <TableHead className="text-right h-12 text-xs font-semibold text-slate-600 w-[300px]">المنتج</TableHead>
                                <TableHead className="text-right h-12 text-xs font-semibold text-slate-600">الفئة</TableHead>
                                <TableHead className="text-right h-12 text-xs font-semibold text-slate-600">السعر</TableHead>
                                <TableHead className="text-center h-12 text-xs font-semibold text-slate-600">الكمية</TableHead>
                                <TableHead className="text-center h-12 text-xs font-semibold text-slate-600">نوع المخزون</TableHead>
                                <TableHead className="text-center h-12 text-xs font-semibold text-slate-600">الحالة</TableHead>
                                <TableHead className="text-center h-12 w-[60px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.map((product) => {
                                const status = statusConfig[product.status];
                                const StatusIcon = status.icon;
                                const inventoryType = inventoryTypeConfig[product.inventoryType];
                                return (
                                    <TableRow key={product.id} className="border-slate-50 hover:bg-slate-50/50">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
                                                    {product.image ? (
                                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                            <Package size={20} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900 text-sm line-clamp-1">{product.name}</p>
                                                    <p className="text-xs text-slate-500 font-mono">{product.sku}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-slate-600 text-sm">{product.category}</TableCell>
                                        <TableCell className="font-bold text-slate-900">{product.price.toLocaleString()} ج.م</TableCell>
                                        <TableCell className="text-center">
                                            <span className={`font-semibold ${product.quantity <= 5 ? 'text-red-600' : 'text-slate-900'}`}>
                                                {product.quantity}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="secondary" className={`${inventoryType.color} font-medium`}>
                                                {inventoryType.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="secondary" className={`${status.color} gap-1 font-medium`}>
                                                <StatusIcon size={12} />
                                                {status.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button style={{ width: '36px', height: '36px', borderRadius: '8px', border: 'none', background: '#f1f5f9', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <MoreHorizontal size={16} />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-[160px] bg-white">
                                                    <DropdownMenuItem className="gap-2 flex-row-reverse cursor-pointer">
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
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-sm text-slate-500">عرض 1-5 من {products.length} منتج</span>
                    <div className="flex gap-1">
                        <Button variant="outline" size="sm" className="h-9 px-3">السابق</Button>
                        <Button variant="default" size="sm" className="h-9 px-3 bg-blue-600">1</Button>
                        <Button variant="outline" size="sm" className="h-9 px-3">2</Button>
                        <Button variant="outline" size="sm" className="h-9 px-3">التالي</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
