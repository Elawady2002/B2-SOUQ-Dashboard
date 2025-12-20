import { useState } from 'react';
import {
    Warehouse,
    Package,
    AlertTriangle,
    Plus,
    ArrowUp,
    ArrowDown,
    RotateCcw,
    Edit,
    Clock,
    Eye,
    MoreHorizontal,
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

const inventoryItems = [
    {
        id: 1,
        name: 'هاتف سامسونج Galaxy S24 Ultra',
        sku: 'SAM-S24U-256',
        category: 'هواتف',
        price: 45000,
        dimensions: '16.2 × 7.9 × 0.8 سم',
        quantity: 25,
        threshold: 10,
        shipping: 'شحن المنصة',
        address: 'المستودع الرئيسي - 6 أكتوبر',
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=100&h=100&fit=crop',
        movements: [
            { type: 'add', qty: 50, date: '2024-12-15', note: 'شحنة جديدة' },
            { type: 'subtract', qty: 20, date: '2024-12-16', note: 'مبيعات' },
            { type: 'subtract', qty: 5, date: '2024-12-17', note: 'مبيعات' },
        ]
    },
    {
        id: 2,
        name: 'سماعات Apple AirPods Pro 2',
        sku: 'APL-APP2-WHT',
        category: 'سماعات',
        price: 8500,
        dimensions: '5.4 × 5.4 × 2.4 سم',
        quantity: 5,
        threshold: 15,
        shipping: 'شحن ذاتي',
        address: 'فرع الدقي',
        image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=100&h=100&fit=crop',
        movements: [
            { type: 'add', qty: 30, date: '2024-12-10', note: 'شحنة جديدة' },
            { type: 'subtract', qty: 25, date: '2024-12-18', note: 'مبيعات' },
        ]
    },
    {
        id: 3,
        name: 'ساعة Huawei Watch GT4',
        sku: 'HUA-WGT4-BLK',
        category: 'ساعات ذكية',
        price: 6500,
        dimensions: '4.6 × 4.6 × 1.1 سم',
        quantity: 0,
        threshold: 10,
        shipping: 'شحن المنصة',
        address: 'المستودع الرئيسي - 6 أكتوبر',
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=100&h=100&fit=crop',
        movements: [
            { type: 'add', qty: 20, date: '2024-12-05', note: 'شحنة جديدة' },
            { type: 'subtract', qty: 20, date: '2024-12-15', note: 'مبيعات' },
        ]
    },
    {
        id: 4,
        name: 'شاحن لاسلكي سريع 15W',
        sku: 'CHR-WLS-15W',
        category: 'اكسسوارات',
        price: 450,
        dimensions: '10 × 10 × 1 سم',
        quantity: 150,
        threshold: 20,
        shipping: 'شحن المنصة',
        address: 'المستودع الرئيسي - 6 أكتوبر',
        image: 'https://images.unsplash.com/photo-1591290619762-c588f0e8e046?w=100&h=100&fit=crop',
        movements: [
            { type: 'add', qty: 200, date: '2024-12-01', note: 'شحنة جديدة' },
            { type: 'subtract', qty: 50, date: '2024-12-17', note: 'مبيعات' },
        ]
    },
];

export default function Inventory() {
    const [showMovements, setShowMovements] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    const getQuantityColor = (qty, threshold) => {
        if (qty === 0) return 'text-red-600';
        if (qty <= threshold) return 'text-orange-600';
        return 'text-slate-900';
    };

    const handleViewMovements = (item) => {
        setSelectedItem(item);
        setShowMovements(true);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">المخزون</h2>
                    <p className="text-sm text-slate-500 mt-1">إدارة ومتابعة مخزون منتجاتك</p>
                </div>
                <Button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700 gap-2">
                    <Plus size={18} />
                    إضافة كمية
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500 font-medium mb-1">إجمالي المنتجات</p>
                            <p className="text-2xl font-bold text-slate-900">10</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <Package size={20} />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500 font-medium mb-1">منخفضة المخزون</p>
                            <p className="text-2xl font-bold text-amber-500">2</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
                            <AlertTriangle size={20} />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500 font-medium mb-1">الكمية في المخزون</p>
                            <div className="flex items-baseline gap-1">
                                <p className="text-2xl font-bold text-slate-900">2,450</p>
                                <span className="text-xs text-slate-500">قطعة</span>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                            <Warehouse size={20} />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500 font-medium mb-1">مضافة حديثاً</p>
                            <p className="text-2xl font-bold text-slate-900">3</p>
                            <p className="text-[10px] text-slate-400 mt-1">آخر 7 أيام</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                            <Clock size={20} />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Inventory Table */}
            <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader className="pb-4 border-b border-slate-50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <CardTitle className="text-lg font-bold text-slate-800">جدول المخزون</CardTitle>
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
                                <TableHead className="text-center h-10 text-xs font-semibold text-slate-600">الكمية الحالية</TableHead>
                                <TableHead className="text-center h-10 text-xs font-semibold text-slate-600">حد النفاذ</TableHead>
                                <TableHead className="text-center h-10 text-xs font-semibold text-slate-600">الشحن</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">العنوان</TableHead>
                                <TableHead className="text-center h-10 text-xs font-semibold text-slate-600 w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {inventoryItems.map((item) => (
                                <TableRow key={item.id} className="border-slate-50 hover:bg-slate-50/50">
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <span className="text-slate-700 text-sm">{item.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-500 font-mono text-xs">{item.sku}</TableCell>
                                    <TableCell className="text-slate-600 text-sm">{item.category}</TableCell>
                                    <TableCell className="font-bold text-slate-900">{item.price.toLocaleString('en-US')} ج.م</TableCell>
                                    <TableCell className="text-center">
                                        <span className={`font-bold text-lg ${getQuantityColor(item.quantity, item.threshold)}`}>
                                            {item.quantity}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-center text-slate-500 font-medium">{item.threshold}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-normal">
                                            {item.shipping}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-slate-500 text-xs max-w-[180px]">{item.address}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                                            onClick={() => handleViewMovements(item)}
                                            title="عرض الحركات"
                                        >
                                            <Eye size={16} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Movements Modal */}
            <Dialog open={showMovements} onOpenChange={setShowMovements}>
                <DialogContent className="sm:max-w-[600px] bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                            سجل حركات: {selectedItem?.name}
                        </DialogTitle>
                    </DialogHeader>
                    {selectedItem && (
                        <div className="py-4">
                            <div className="flex items-center justify-between mb-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
                                <span className="text-slate-500 font-medium">الكمية الحالية</span>
                                <span className={`text-2xl font-bold ${getQuantityColor(selectedItem.quantity, selectedItem.threshold)}`}>
                                    {selectedItem.quantity} قطعة
                                </span>
                            </div>

                            <h4 className="text-sm font-bold text-slate-900 mb-4">سجل الحركات</h4>
                            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                                {selectedItem.movements.map((movement, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-3 bg-white border border-slate-100 rounded-lg shadow-sm hover:border-slate-200 transition-colors">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${movement.type === 'add' ? 'bg-emerald-50 text-emerald-600' :
                                            movement.type === 'return' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
                                            }`}>
                                            {movement.type === 'add' ? <ArrowUp size={18} /> :
                                                movement.type === 'return' ? <RotateCcw size={18} /> :
                                                    <ArrowDown size={18} />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="font-semibold text-slate-900 text-sm">
                                                    {movement.type === 'add' ? 'إضافة مخزون' : movement.type === 'return' ? 'مرتجع من عميل' : 'عملية بيع'}
                                                </p>
                                                <span className={`font-bold text-sm ${movement.type === 'add' ? 'text-emerald-600' : 'text-red-600'
                                                    }`}>
                                                    {movement.type === 'add' ? '+' : '-'}{movement.qty}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-slate-500">
                                                <span>{movement.note}</span>
                                                <span>{movement.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <DialogFooter className="gap-2 border-t border-slate-100 pt-4">
                        <Button variant="outline" className="flex-1" onClick={() => setShowMovements(false)}>إغلاق</Button>
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                            <Plus size={16} className="ml-2" />
                            إضافة حركة يدوية
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Add Quantity Modal */}
            <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
                <DialogContent className="sm:max-w-[500px] bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-100">إضافة كمية للمخزون</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label>المنتج</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="اختر المنتج" />
                                </SelectTrigger>
                                <SelectContent>
                                    {inventoryItems.map(item => (
                                        <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>الكمية</Label>
                            <Input type="number" placeholder="أدخل الكمية" />
                        </div>
                        <div className="space-y-2">
                            <Label>ملاحظات</Label>
                            <Textarea placeholder="ملاحظات إضافية (اختياري)" />
                        </div>
                    </div>
                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => setShowAddModal(false)}>إلغاء</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">إضافة</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
