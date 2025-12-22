import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
    Warehouse,
    Package,
    AlertTriangle,
    Plus,
    ArrowUp,
    ArrowDown,
    RotateCcw,
    Eye,
    Search,
    ArrowLeftRight,
    Boxes,
    PackageX,
    PackageCheck,
    X,
    Check,
    ArrowLeft,
    MoreVertical,
    Edit,
    Trash2,
    ExternalLink,
    Minus
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
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const inventoryItems = [
    {
        id: 1,
        name: 'هاتف سامسونج Galaxy S24 Ultra',
        sku: 'SAM-S24U-256',
        sellingMethod: 'platform',
        stockType: 'platform',
        available: 25,
        reserved: 5,
        received: 50,
        damaged: 0,
        total: 30,
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=100&h=100&fit=crop',
    },
    {
        id: 2,
        name: 'سماعات Apple AirPods Pro 2',
        sku: 'APL-APP2-WHT',
        sellingMethod: 'merchant',
        stockType: 'merchant',
        available: 12,
        reserved: 3,
        received: 30,
        damaged: 2,
        total: 17,
        image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=100&h=100&fit=crop',
    },
    {
        id: 3,
        name: 'ساعة Huawei Watch GT4',
        sku: 'HUA-WGT4-BLK',
        sellingMethod: 'platform',
        stockType: 'platform',
        available: 0,
        reserved: 0,
        received: 20,
        damaged: 1,
        total: 0,
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=100&h=100&fit=crop',
    },
    {
        id: 4,
        name: 'شاحن لاسلكي سريع 15W',
        sku: 'CHR-WLS-15W',
        sellingMethod: 'platform',
        stockType: 'platform',
        available: 150,
        reserved: 20,
        received: 200,
        damaged: 5,
        total: 175,
        image: 'https://images.unsplash.com/photo-1591290619762-c588f0e8e046?w=100&h=100&fit=crop',
    },
    {
        id: 5,
        name: 'حافظة هاتف جلد طبيعي',
        sku: 'CSE-LTH-BRN',
        sellingMethod: 'merchant',
        stockType: 'merchant',
        available: 80,
        reserved: 10,
        received: 100,
        damaged: 0,
        total: 90,
        image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=100&h=100&fit=crop',
    },
];


export default function Inventory() {
    const { t } = useLanguage();
    const [showMovements, setShowMovements] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [transferQty, setTransferQty] = useState('');

    // Add Stock Sheet states
    const [showAddStockSheet, setShowAddStockSheet] = useState(false);
    const [addStockQty, setAddStockQty] = useState('');
    const [addStockTarget, setAddStockTarget] = useState('merchant'); // 'merchant' or 'platform'
    const [addStockNote, setAddStockNote] = useState('');

    // New modal states
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleViewMovements = (item) => {
        setSelectedItem(item);
        setShowMovements(true);
    };

    const handleTransfer = (item) => {
        setSelectedItem(item);
        setTransferQty('');
        setShowTransferModal(true);
    };

    const handleAddStock = (item) => {
        setSelectedItem(item);
        setAddStockQty('');
        setAddStockTarget('merchant');
        setAddStockNote('');
        setShowAddStockSheet(true);
    };

    const handleOpenTransferSheet = () => {
        // Open transfer sheet without specific item (general transfer)
        setSelectedItem(null);
        setTransferQty('');
        setShowTransferModal(true);
    };

    // New handlers
    const handleViewDetails = (item) => {
        setSelectedItem(item);
        setShowDetailsModal(true);
    };

    const handleEditProduct = (item) => {
        setSelectedItem(item);
        setShowEditModal(true);
    };

    const handleDeleteProduct = (item) => {
        setSelectedItem(item);
        setShowDeleteModal(true);
    };

    const currentMerchantStock = selectedItem?.available || 0;
    const newMerchantStock = Math.max(0, currentMerchantStock - (parseInt(transferQty) || 0));

    // Dynamic KPI stats with translations
    const kpiStats = [
        { label: t('inventory.totalProducts'), value: '312', icon: Package, color: 'bg-slate-100 text-slate-600' },
        { label: t('inventory.merchantStock'), value: '182', icon: Boxes, color: 'bg-orange-50 text-orange-600', accent: 'orange' },
        { label: t('inventory.platformStock'), value: '130', icon: Warehouse, color: 'bg-blue-50 text-blue-600', accent: 'blue' },
        { label: t('inventory.reserved'), value: '38', icon: PackageCheck, color: 'bg-purple-50 text-purple-600' },
        { label: t('inventory.damaged'), value: '8', icon: PackageX, color: 'bg-red-50 text-red-600' },
        { label: t('inventory.outOfStock'), value: '3', icon: AlertTriangle, color: 'bg-amber-50 text-amber-600' },
    ];

    // Dynamic selling method config
    const sellingMethodConfig = {
        platform: { label: t('inventory.platformShipping'), color: 'bg-blue-100 text-blue-700' },
        merchant: { label: t('inventory.selfShipping'), color: 'bg-orange-100 text-orange-700' },
    };

    // Dynamic stock type config
    const stockTypeConfig = {
        platform: { label: t('inventory.platformStock'), color: 'bg-blue-50 text-blue-600 border-blue-200' },
        merchant: { label: t('inventory.merchantStock'), color: 'bg-orange-50 text-orange-600 border-orange-200' },
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">{t('inventory.title')}</h2>
                    <p className="text-sm text-slate-500 mt-1">{t('inventory.subtitle')}</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2 border-slate-200" onClick={handleOpenTransferSheet}>
                        <ArrowLeftRight size={18} />
                        {t('inventory.transferStock')}
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 gap-2" onClick={() => setShowAddStockSheet(true)}>
                        <Plus size={18} />
                        {t('inventory.addQuantity')}
                    </Button>
                </div>
            </div>

            {/* KPI Stats Cards - 6 Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {kpiStats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={idx} className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center shrink-0`}>
                                        <Icon size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                                        <p className={`text-xl font-bold ${stat.accent === 'orange' ? 'text-orange-600' : stat.accent === 'blue' ? 'text-blue-600' : 'text-slate-900'}`}>
                                            {stat.value}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Inventory Table */}
            <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader className="pb-4 border-b border-slate-100">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <CardTitle className="text-lg font-bold text-slate-800">{t('inventory.inventoryTable')}</CardTitle>
                        <div className="relative w-full md:w-72">
                            <Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder={t('inventory.searchProduct')}
                                className="pr-9 bg-slate-50 border-slate-200 h-10"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                {/* Grouped Header Row */}
                                <TableRow className="hover:bg-slate-50">
                                    <TableHead colSpan={2} className="text-right font-bold text-slate-700 border-l border-slate-200">{t('inventory.productInfo')}</TableHead>
                                    <TableHead colSpan={2} className="text-center font-bold text-slate-700 border-l border-slate-200">{t('inventory.stockType')}</TableHead>
                                    <TableHead colSpan={5} className="text-center font-bold text-slate-700 border-l border-slate-200 bg-blue-50/50">{t('inventory.quantities')}</TableHead>
                                    <TableHead className="text-center w-[80px]"></TableHead>
                                </TableRow>
                                {/* Sub-header Row */}
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="text-right font-semibold text-slate-600 w-[280px]">{t('inventory.product')}</TableHead>
                                    <TableHead className="text-right font-semibold text-slate-600 border-l border-slate-100">SKU</TableHead>
                                    <TableHead className="text-center font-semibold text-slate-600">{t('inventory.sellingMethod')}</TableHead>
                                    <TableHead className="text-center font-semibold text-slate-600 border-l border-slate-100">{t('inventory.stockType')}</TableHead>
                                    <TableHead className="text-center font-semibold text-emerald-700 bg-emerald-50/50">{t('inventory.available')}</TableHead>
                                    <TableHead className="text-center font-semibold text-purple-700 bg-purple-50/50">{t('inventory.reserved')}</TableHead>
                                    <TableHead className="text-center font-semibold text-blue-700 bg-blue-50/50">{t('inventory.received')}</TableHead>
                                    <TableHead className="text-center font-semibold text-red-700 bg-red-50/50">{t('inventory.damaged')}</TableHead>
                                    <TableHead className="text-center font-semibold text-slate-700 bg-slate-100/50 border-l border-slate-100">{t('inventory.total')}</TableHead>
                                    <TableHead className="text-center"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {inventoryItems.map((item) => {
                                    const sellingMethod = sellingMethodConfig[item.sellingMethod];
                                    const stockType = stockTypeConfig[item.stockType];
                                    const isOutOfStock = item.available === 0;

                                    return (
                                        <TableRow key={item.id} className={`hover:bg-slate-50/50 ${isOutOfStock ? 'bg-red-50/30' : ''}`}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <span className="text-slate-800 text-sm font-medium line-clamp-1">{item.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-slate-500 font-mono text-xs border-l border-slate-50">{item.sku}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant="secondary" className={`${sellingMethod.color} font-medium text-xs`}>
                                                    {sellingMethod.label}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center border-l border-slate-50">
                                                <Badge variant="outline" className={`${stockType.color} font-medium text-xs border`}>
                                                    {stockType.label}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center bg-emerald-50/30">
                                                <span className={`font-bold text-lg ${isOutOfStock ? 'text-red-600' : 'text-emerald-600'}`}>
                                                    {item.available}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-center bg-purple-50/30">
                                                <span className="font-semibold text-purple-600">{item.reserved}</span>
                                            </TableCell>
                                            <TableCell className="text-center bg-blue-50/30">
                                                <span className="font-semibold text-blue-600">{item.received}</span>
                                            </TableCell>
                                            <TableCell className="text-center bg-red-50/30">
                                                <span className={`font-semibold ${item.damaged > 0 ? 'text-red-600' : 'text-slate-400'}`}>
                                                    {item.damaged}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-center bg-slate-50/50 border-l border-slate-50">
                                                <span className="font-bold text-slate-900">{item.total}</span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1 justify-center">
                                                    {/* Quick Actions */}
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                                        onClick={() => handleViewMovements(item)}
                                                        title={t('inventory.viewMovements')}
                                                    >
                                                        <Eye size={16} />
                                                    </Button>

                                                    {/* Transfer Button - Always rendered but invisible when not merchant */}
                                                    {item.stockType === 'merchant' ? (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg"
                                                            onClick={() => handleTransfer(item)}
                                                            title={t('inventory.transferToPlatform')}
                                                        >
                                                            <ArrowLeftRight size={16} />
                                                        </Button>
                                                    ) : (
                                                        <div className="h-8 w-8" />
                                                    )}

                                                    {/* Dropdown Menu */}
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
                                                            >
                                                                <MoreVertical size={16} />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-48 bg-white">
                                                            <DropdownMenuItem className="gap-3 cursor-pointer" onClick={() => handleViewDetails(item)}>
                                                                <Eye className="w-4 h-4 text-slate-500" />
                                                                <span>{t('common.viewDetails')}</span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="gap-3 cursor-pointer" onClick={() => handleEditProduct(item)}>
                                                                <Edit className="w-4 h-4 text-blue-500" />
                                                                <span>{t('common.editProduct')}</span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem className="gap-3 cursor-pointer text-red-600 focus:text-red-600" onClick={() => handleDeleteProduct(item)}>
                                                                <Trash2 className="w-4 h-4" />
                                                                <span>{t('common.deleteProduct')}</span>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Transfer Stock Sheet */}
            <Sheet open={showTransferModal} onOpenChange={setShowTransferModal}>
                <SheetContent side="left" className="w-[400px] sm:w-[540px] p-0 flex flex-col gap-0 overflow-hidden">
                    <SheetHeader className="px-6 pt-12 pb-6 border-b border-slate-100 flex-none">
                        <SheetTitle className="text-xl font-bold text-slate-900 text-start">
                            تحويل مخزون للمنصة
                        </SheetTitle>
                        {selectedItem && (
                            <SheetDescription className="text-start text-slate-500">
                                {selectedItem.name}
                            </SheetDescription>
                        )}
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto px-6 py-6">
                        {/* Transfer Flow Visual */}
                        <div className="flex items-center justify-center gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                                    <Boxes size={28} />
                                </div>
                                <span className="text-xs font-medium text-slate-600">مخزون التاجر</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <ArrowLeft size={24} className="text-blue-500" />
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                                    <Warehouse size={28} />
                                </div>
                                <span className="text-xs font-medium text-slate-600">مخزون المنصة</span>
                            </div>
                        </div>

                        {/* Current Stock Info */}
                        <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                            <p className="text-xs text-slate-600 mb-1">المخزون المتاح حالياً (التاجر)</p>
                            <p className="text-2xl font-bold text-blue-600">{currentMerchantStock} قطعة</p>
                        </div>

                        {/* Quantity Input */}
                        <div className="space-y-3 mb-6">
                            <Label className="text-slate-700 font-medium">الكمية المراد تحويلها</Label>
                            <Input
                                type="number"
                                value={transferQty}
                                onChange={(e) => setTransferQty(e.target.value)}
                                placeholder="أدخل الكمية"
                                className={`h-12 text-lg text-center font-bold ${transferQty && parseInt(transferQty) > currentMerchantStock
                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                    : ''
                                    }`}
                                max={currentMerchantStock}
                            />
                            {transferQty && parseInt(transferQty) > currentMerchantStock && (
                                <p className="text-xs text-red-600">الكمية المدخلة أكبر من المخزون المتاح</p>
                            )}
                        </div>

                        {/* Summary */}
                        <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">سيتم إرسال</span>
                                <span className="font-bold text-blue-600">{transferQty || 0} قطعة</span>
                            </div>
                            <div className="border-t border-slate-200"></div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">المخزون بعد التحويل (التاجر)</span>
                                <span className={`font-bold ${newMerchantStock === 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                                    {newMerchantStock} قطعة
                                </span>
                            </div>
                            <div className="border-t border-slate-200"></div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">الحالة</span>
                                <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                                    بانتظار الاستلام
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3 flex-none">
                        <Button
                            variant="outline"
                            className="flex-1 border-slate-200"
                            onClick={() => setShowTransferModal(false)}
                        >
                            إلغاء
                        </Button>
                        <Button
                            className="flex-1 bg-blue-600 hover:bg-blue-700 gap-2"
                            disabled={!transferQty || parseInt(transferQty) <= 0 || parseInt(transferQty) > currentMerchantStock}
                        >
                            <Check size={18} />
                            تأكيد التحويل
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Add Stock Sheet */}
            <Sheet open={showAddStockSheet} onOpenChange={setShowAddStockSheet}>
                <SheetContent side="left" className="w-[400px] sm:w-[540px] p-0 flex flex-col gap-0 overflow-hidden">
                    <SheetHeader className="px-6 pt-12 pb-6 border-b border-slate-100 flex-none">
                        <SheetTitle className="text-xl font-bold text-slate-900 text-start">
                            {t('inventory.addQuantity')}
                        </SheetTitle>
                        {selectedItem && (
                            <SheetDescription className="text-start text-slate-500">
                                {selectedItem.name}
                            </SheetDescription>
                        )}
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto px-6 py-6">
                        {/* Target Selector */}
                        <div className="bg-slate-50 p-1 rounded-xl flex mb-6">
                            <button
                                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${addStockTarget === 'merchant'
                                    ? 'bg-white text-orange-600 shadow-sm ring-1 ring-slate-200'
                                    : 'text-slate-500 hover:text-slate-700'
                                    }`}
                                onClick={() => setAddStockTarget('merchant')}
                            >
                                مخزون التاجر
                            </button>
                            <button
                                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${addStockTarget === 'platform'
                                    ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200'
                                    : 'text-slate-500 hover:text-slate-700'
                                    }`}
                                onClick={() => setAddStockTarget('platform')}
                            >
                                مخزون المنصة
                            </button>
                        </div>

                        {/* Quantity Input with Steppers */}
                        <div className="space-y-3 mb-6">
                            <Label className="text-slate-700 font-medium">الكمية</Label>
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    className="h-12 w-12 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                                    onClick={() => setAddStockQty(prev => Math.max(0, (parseInt(prev) || 0) + 1).toString())}
                                >
                                    <Plus size={20} />
                                </Button>
                                <Input
                                    type="number"
                                    value={addStockQty}
                                    onChange={(e) => setAddStockQty(e.target.value)}
                                    placeholder="0"
                                    className="h-12 text-xl text-center font-bold"
                                    min="1"
                                />
                                <Button
                                    variant="outline"
                                    className="h-12 w-12 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-red-600"
                                    onClick={() => setAddStockQty(prev => Math.max(0, (parseInt(prev) || 0) - 1).toString())}
                                >
                                    <Minus size={20} />
                                </Button>
                            </div>
                        </div>

                        {/* Note Input */}
                        <div className="space-y-3 mb-6">
                            <Label className="text-slate-700 font-medium">سبب الإضافة (اختياري)</Label>
                            <Textarea
                                value={addStockNote}
                                onChange={(e) => setAddStockNote(e.target.value)}
                                placeholder="اكتب ملاحظة..."
                                className="min-h-[80px] resize-none"
                            />
                        </div>

                        {/* Summary Preview */}
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-slate-500">الكمية الحالية</span>
                                <span className="font-semibold text-slate-700">
                                    {selectedItem ? (addStockTarget === 'merchant' ? selectedItem.available : selectedItem.received) : 0}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-900 font-medium">الإجمالي الجديد</span>
                                <span className="font-bold text-blue-600 text-lg">
                                    {selectedItem ?
                                        ((parseInt(addStockQty) || 0) + (addStockTarget === 'merchant' ? selectedItem.available : selectedItem.received))
                                        : 0
                                    }
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3 flex-none">
                        <Button
                            variant="outline"
                            className="flex-1 border-slate-200"
                            onClick={() => setShowAddStockSheet(false)}
                        >
                            إلغاء
                        </Button>
                        <Button
                            className="flex-1 bg-blue-600 hover:bg-blue-700 gap-2"
                            disabled={!addStockQty || parseInt(addStockQty) <= 0}
                        >
                            <Plus size={18} />
                            إضافة الكمية
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Movements Sheet */}
            <Sheet open={showMovements} onOpenChange={setShowMovements}>
                <SheetContent side="left" className="w-[400px] sm:w-[540px] p-0 flex flex-col gap-0 overflow-hidden">
                    <SheetHeader className="px-6 pt-12 pb-6 border-b border-slate-100 flex-none">
                        <SheetTitle className="text-xl font-bold text-slate-900 text-start">
                            سجل حركات المخزون
                        </SheetTitle>
                        {selectedItem && (
                            <SheetDescription className="text-start text-slate-500">
                                {selectedItem.name}
                            </SheetDescription>
                        )}
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto px-6 py-6">
                        {selectedItem && (
                            <>
                                <div className="grid grid-cols-4 gap-3 mb-6">
                                    <div className="p-3 bg-emerald-50 rounded-lg text-center border border-emerald-100">
                                        <p className="text-xs text-emerald-600 mb-1">متاح</p>
                                        <p className="text-xl font-bold text-emerald-700">{selectedItem.available}</p>
                                    </div>
                                    <div className="p-3 bg-purple-50 rounded-lg text-center border border-purple-100">
                                        <p className="text-xs text-purple-600 mb-1">محجوز</p>
                                        <p className="text-xl font-bold text-purple-700">{selectedItem.reserved}</p>
                                    </div>
                                    <div className="p-3 bg-blue-50 rounded-lg text-center border border-blue-100">
                                        <p className="text-xs text-blue-600 mb-1">مستلم</p>
                                        <p className="text-xl font-bold text-blue-700">{selectedItem.received}</p>
                                    </div>
                                    <div className="p-3 bg-red-50 rounded-lg text-center border border-red-100">
                                        <p className="text-xs text-red-600 mb-1">تالف</p>
                                        <p className="text-xl font-bold text-red-700">{selectedItem.damaged}</p>
                                    </div>
                                </div>

                                <h4 className="text-sm font-bold text-slate-900 mb-4">آخر الحركات</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-4 p-3 bg-white border border-slate-100 rounded-lg">
                                        <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                            <ArrowUp size={18} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="font-semibold text-slate-900 text-sm">إضافة مخزون</p>
                                                <span className="font-bold text-sm text-emerald-600">+50</span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-slate-500">
                                                <span>شحنة جديدة</span>
                                                <span>2024-12-15</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-3 bg-white border border-slate-100 rounded-lg">
                                        <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                                            <ArrowDown size={18} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="font-semibold text-slate-900 text-sm">عملية بيع</p>
                                                <span className="font-bold text-sm text-red-600">-20</span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-slate-500">
                                                <span>مبيعات</span>
                                                <span>2024-12-16</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3 flex-none">
                        <Button variant="outline" className="flex-1 border-slate-200" onClick={() => setShowMovements(false)}>إغلاق</Button>
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700 gap-2">
                            <Plus size={16} />
                            إضافة حركة
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>

            {/* View Details Sheet */}
            <Sheet open={showDetailsModal} onOpenChange={setShowDetailsModal}>
                <SheetContent side="left" className="w-[400px] sm:w-[540px] p-0 flex flex-col gap-0 overflow-hidden">
                    <SheetHeader className="px-6 pt-12 pb-6 border-b border-slate-100 flex-none">
                        <SheetTitle className="text-xl font-bold text-slate-900 text-start">تفاصيل المنتج</SheetTitle>
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto px-6 py-6">
                        {selectedItem && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                                    <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-200">
                                        <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{selectedItem.name}</h3>
                                        <p className="text-sm text-slate-500 font-mono">{selectedItem.sku}</p>
                                        <Badge variant="outline" className={`mt-2 ${stockTypeConfig[selectedItem.stockType].color}`}>
                                            {stockTypeConfig[selectedItem.stockType].label}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                                        <p className="text-xs text-slate-500 mb-1">متاح للبيع</p>
                                        <p className="text-2xl font-bold text-emerald-600">{selectedItem.available}</p>
                                    </div>
                                    <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                                        <p className="text-xs text-slate-500 mb-1">محجوز</p>
                                        <p className="text-2xl font-bold text-purple-600">{selectedItem.reserved}</p>
                                    </div>
                                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                        <p className="text-xs text-slate-500 mb-1">مستلم</p>
                                        <p className="text-2xl font-bold text-blue-600">{selectedItem.received}</p>
                                    </div>
                                    <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                                        <p className="text-xs text-slate-500 mb-1">تالف</p>
                                        <p className="text-2xl font-bold text-red-600">{selectedItem.damaged}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                    <span className="text-slate-600">طريقة البيع</span>
                                    <Badge className={sellingMethodConfig[selectedItem.sellingMethod].color}>
                                        {sellingMethodConfig[selectedItem.sellingMethod].label}
                                    </Badge>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                        <Button variant="outline" className="w-full" onClick={() => setShowDetailsModal(false)}>إغلاق</Button>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Edit Product Sheet */}
            <Sheet open={showEditModal} onOpenChange={setShowEditModal}>
                <SheetContent side="left" className="w-[400px] sm:w-[540px] p-0 flex flex-col gap-0 overflow-hidden">
                    <SheetHeader className="px-6 pt-12 pb-6 border-b border-slate-100 flex-none">
                        <SheetTitle className="text-xl font-bold text-slate-900 text-start">تعديل المنتج</SheetTitle>
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto px-6 py-6">
                        {selectedItem && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl mb-4">
                                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200">
                                        <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">{selectedItem.name}</p>
                                        <p className="text-xs text-slate-500 font-mono">{selectedItem.sku}</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>اسم المنتج</Label>
                                    <Input defaultValue={selectedItem.name} className="bg-white" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>الكمية المتاحة</Label>
                                        <Input type="number" defaultValue={selectedItem.available} className="bg-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>الكمية المحجوزة</Label>
                                        <Input type="number" defaultValue={selectedItem.reserved} className="bg-white" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>نوع المخزون</Label>
                                    <Select defaultValue={selectedItem.stockType}>
                                        <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="platform">مخزون المنصة</SelectItem>
                                            <SelectItem value="merchant">مخزون التاجر</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
                        <Button variant="outline" className="flex-1" onClick={() => setShowEditModal(false)}>إلغاء</Button>
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700 gap-2" onClick={() => setShowEditModal(false)}>
                            <Check size={16} />
                            حفظ التغييرات
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Delete Confirmation Sheet */}
            <Sheet open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                <SheetContent side="left" className="w-[400px] sm:w-[540px] p-0 flex flex-col gap-0 overflow-hidden">
                    <SheetHeader className="px-6 pt-12 pb-6 border-b border-slate-100 flex-none">
                        <SheetTitle className="text-xl font-bold text-red-600 text-start">حذف المنتج</SheetTitle>
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto px-6 py-6">
                        {selectedItem && (
                            <>
                                <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                        <Trash2 size={24} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">هل أنت متأكد؟</p>
                                        <p className="text-sm text-slate-500">سيتم حذف المنتج بشكل نهائي</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl">
                                    <p className="font-medium text-slate-900">{selectedItem.name}</p>
                                    <p className="text-sm text-slate-500 font-mono">{selectedItem.sku}</p>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
                        <Button variant="outline" className="flex-1" onClick={() => setShowDeleteModal(false)}>إلغاء</Button>
                        <Button variant="destructive" className="flex-1 bg-red-600 hover:bg-red-700 gap-2" onClick={() => setShowDeleteModal(false)}>
                            <Trash2 size={16} />
                            تأكيد الحذف
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
