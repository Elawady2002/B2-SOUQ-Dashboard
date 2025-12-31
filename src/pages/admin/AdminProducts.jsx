import { useState } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, MoreHorizontal, AlertTriangle, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function AdminProducts() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeSheet, setActiveSheet] = useState(null); // 'review', 'stock', 'approve', 'reject', null

    // Mock Data
    const products = [
        { id: 1, name: 'ساعة ذكية Apple Watch', sku: 'SKU-1001', merchant: 'تك ستور', category: 'إلكترونيات', price: 'EGP 15,000', stock: 12, status: 'pending', image: 'ap' },
        { id: 2, name: 'فستان صيفي مشجر', sku: 'SKU-2042', merchant: 'أزياء الموضة', category: 'ملابس', price: 'EGP 850', stock: 50, status: 'active', image: 'dr' },
        { id: 3, name: 'طقم أدوات مطبخ', sku: 'SKU-3091', merchant: 'سامي للأدوات', category: 'منزل', price: 'EGP 3,200', stock: 5, status: 'rejected', image: 'ki' },
        { id: 4, name: 'سماعات AirPods Pro', sku: 'SKU-1002', merchant: 'تك ستور', category: 'إلكترونيات', price: 'EGP 9,500', stock: 8, status: 'pending', image: 'ai' },
        { id: 5, name: 'حذاء رياضي Nike', sku: 'SKU-4021', merchant: 'بيت الرياضة', category: 'رياضة', price: 'EGP 4,500', stock: 0, status: 'active', image: 'ni' },
    ];

    const filteredProducts = products.filter(p => {
        if (activeTab === 'all') return true;
        if (activeTab === 'pending') return p.status === 'pending';
        if (activeTab === 'rejected') return p.status === 'rejected';
        return true;
    });

    const openSheet = (product, sheetType) => {
        setSelectedProduct(product);
        setActiveSheet(sheetType);
    };

    const closeSheet = () => {
        setActiveSheet(null);
        setTimeout(() => setSelectedProduct(null), 300);
    };

    const renderSheetContent = () => {
        if (!selectedProduct) return null;

        switch (activeSheet) {
            case 'review':
                return (
                    <div className="space-y-6">
                        <div className="flex flex-col items-center gap-4 text-center">
                            <div className="h-24 w-24 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-2xl font-bold">
                                {selectedProduct.image.toUpperCase()}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">{selectedProduct.name}</h3>
                                <p className="text-slate-500">{selectedProduct.sku}</p>
                            </div>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-slate-200 last:border-0">
                                <span className="text-slate-500 text-sm">التصنيف</span>
                                <span className="font-medium">{selectedProduct.category}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-200 last:border-0">
                                <span className="text-slate-500 text-sm">السعر</span>
                                <span className="font-medium text-slate-900">{selectedProduct.price}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-200 last:border-0">
                                <span className="text-slate-500 text-sm">المخزون</span>
                                <span className="font-medium">{selectedProduct.stock}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-200 last:border-0">
                                <span className="text-slate-500 text-sm">التاجر</span>
                                <span className="font-medium">{selectedProduct.merchant}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-200 last:border-0">
                                <span className="text-slate-500 text-sm">الحالة</span>
                                <div>
                                    {selectedProduct.status === 'active' && <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0">نشط</Badge>}
                                    {selectedProduct.status === 'pending' && <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-0">بانتظار المراجعة</Badge>}
                                    {selectedProduct.status === 'rejected' && <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-0">مرفوض</Badge>}
                                </div>
                            </div>
                        </div>

                        <Button className="w-full" onClick={closeSheet}>إغلاق</Button>
                    </div>
                );

            case 'stock':
                return (
                    <div className="space-y-6">
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-6">
                            <div className="flex items-center gap-3 mb-2">
                                <Package className="text-blue-600" size={24} />
                                <h3 className="font-bold text-lg text-slate-900">سجل المخزون</h3>
                            </div>
                            <p className="text-sm text-slate-500">حركات المخزون الحالية والسابقة للمنتج.</p>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                            <div className="text-sm text-slate-500">المخزون الحالي</div>
                            <div className="text-2xl font-bold text-slate-900">{selectedProduct.stock}</div>
                        </div>

                        <div>
                            <h4 className="font-medium mb-3 text-sm text-slate-500">آخر التحركات</h4>
                            <div className="space-y-3">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center border border-slate-200">
                                                <Package size={14} className="text-slate-500" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-sm">عملية بيع</div>
                                                <div className="text-xs text-slate-400">#ORD-552{item} • منذ {item} ساعات</div>
                                            </div>
                                        </div>
                                        <span className="text-red-600 font-medium text-sm">-1</span>
                                    </div>
                                ))}
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center border border-slate-200">
                                            <Package size={14} className="text-slate-500" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-sm">إضافة مخزون</div>
                                            <div className="text-xs text-slate-400">بواسطة التاجر • منذ يومين</div>
                                        </div>
                                    </div>
                                    <span className="text-green-600 font-medium text-sm">+10</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'approve':
                return (
                    <div className="space-y-6">
                        <div className="bg-green-50 rounded-xl p-4 border border-green-100 mb-6 flex flex-col items-center text-center">
                            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                                <CheckCircle className="text-green-600" size={24} />
                            </div>
                            <h3 className="font-bold text-lg text-green-900">موافقة على المنتج</h3>
                            <p className="text-sm text-green-700 mt-1">سيتم نشر المنتج ويصبح متاحاً للعملاء.</p>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 text-sm">المنتج</span>
                                <span className="font-medium">{selectedProduct.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 text-sm">التاجر</span>
                                <span className="font-medium">{selectedProduct.merchant}</span>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button className="w-full bg-green-600 hover:bg-green-700 h-11 text-lg mb-3">تأكيد الموافقة</Button>
                            <Button variant="outline" className="w-full" onClick={closeSheet}>إلغاء</Button>
                        </div>
                    </div>
                );

            case 'reject':
                return (
                    <div className="space-y-6">
                        <div className="bg-red-50 rounded-xl p-4 border border-red-100 mb-6 flex flex-col items-center text-center">
                            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
                                <XCircle className="text-red-600" size={24} />
                            </div>
                            <h3 className="font-bold text-lg text-red-900">رفض المنتج</h3>
                            <p className="text-sm text-red-700 mt-1">لن يتم نشر المنتج وسيتم إبلاغ التاجر بالسبب.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="reason">سبب الرفض</Label>
                                <Textarea
                                    id="reason"
                                    placeholder="اكتب سبب الرفض هنا ليتم إرساله للتاجر..."
                                    className="min-h-[120px]"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button variant="destructive" className="w-full h-11 text-lg mb-3">تأكيد الرفض</Button>
                            <Button variant="outline" className="w-full" onClick={closeSheet}>إلغاء</Button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    const getSheetTitle = () => {
        switch (activeSheet) {
            case 'review': return 'مراجعة المنتج';
            case 'stock': return 'سجل المخزون';
            case 'approve': return 'الموافقة على المنتج';
            case 'reject': return 'رفض المنتج';
            default: return '';
        }
    };

    return (
        <div className="space-y-6" dir="rtl">
            <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">المنتجات</h1>
                    <p className="text-slate-500 mt-1">مراجعة المنتجات الجديدة، والتحكم في المخزون والأسعار.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2 border-slate-200 text-slate-700">
                        <Filter size={16} />
                        تصفية
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full max-w-md grid-cols-3 mb-4 ml-auto">
                    <TabsTrigger value="all">كل المنتجات</TabsTrigger>
                    <TabsTrigger value="pending">بانتظار الموافقة</TabsTrigger>
                    <TabsTrigger value="rejected">المرفوضة</TabsTrigger>
                </TabsList>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-200">
                        <div className="relative max-w-sm">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <Input
                                placeholder="بحث عن منتج، SKU، أو تاجر..."
                                className="pr-9 border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <Table dir="rtl">
                        <TableHeader className="bg-slate-50">
                            <TableRow>
                                <TableHead className="text-right">المنتج / SKU</TableHead>
                                <TableHead className="text-right">التاجر</TableHead>
                                <TableHead className="text-right">القسم</TableHead>
                                <TableHead className="text-right">السعر</TableHead>
                                <TableHead className="text-right">المخزون</TableHead>
                                <TableHead className="text-right">الحالة</TableHead>
                                <TableHead className="text-right w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.map((product) => (
                                <TableRow key={product.id} className="hover:bg-slate-50/50">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold">
                                                {product.image.toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-medium text-slate-900">{product.name}</div>
                                                <div className="text-xs text-slate-500">{product.sku}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-600">{product.merchant}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="bg-slate-50 text-slate-600 font-normal">
                                            {product.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-semibold text-slate-900">{product.price}</TableCell>
                                    <TableCell>
                                        {product.stock === 0 ? (
                                            <Badge variant="destructive" className="bg-red-50 text-red-600 border-red-100">نفذت الكمية</Badge>
                                        ) : product.stock < 10 ? (
                                            <div className="flex items-center gap-1 text-orange-600 font-medium text-sm">
                                                <AlertTriangle size={14} /> {product.stock}
                                            </div>
                                        ) : (
                                            <span className="text-slate-600">{product.stock}</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {product.status === 'active' && <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0">نشط</Badge>}
                                        {product.status === 'pending' && <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-0">بانتظار المراجعة</Badge>}
                                        {product.status === 'rejected' && <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-0">مرفوض</Badge>}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 text-slate-500">
                                                    <MoreHorizontal size={16} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start">
                                                <DropdownMenuLabel>إجراءات</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="gap-2 cursor-pointer"
                                                    onClick={() => openSheet(product, 'review')}
                                                >
                                                    <Eye size={14} /> مراجعة المنتج
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="gap-2 cursor-pointer"
                                                    onClick={() => openSheet(product, 'stock')}
                                                >
                                                    <Package size={14} /> سجل المخزون
                                                </DropdownMenuItem>
                                                {product.status === 'pending' && (
                                                    <>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            className="gap-2 text-green-600 focus:text-green-700 cursor-pointer"
                                                            onClick={() => openSheet(product, 'approve')}
                                                        >
                                                            <CheckCircle size={14} /> الموافقة
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="gap-2 text-red-600 focus:text-red-700 cursor-pointer"
                                                            onClick={() => openSheet(product, 'reject')}
                                                        >
                                                            <XCircle size={14} /> الرفض
                                                        </DropdownMenuItem>
                                                    </>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Tabs>

            <Sheet open={!!activeSheet} onOpenChange={(open) => !open && closeSheet()}>
                <SheetContent side="left" className="w-[400px] sm:w-[540px] overflow-y-auto">
                    <SheetHeader className="text-right mb-6">
                        <SheetTitle>{getSheetTitle()}</SheetTitle>
                        <SheetDescription>
                            {activeSheet === 'review' && 'عرض تفاصيل وبيانات المنتج كاملة.'}
                            {activeSheet === 'stock' && 'تتبع حركات المخزون والمبيعات لهذا المنتج.'}
                            {activeSheet === 'approve' && 'تأكيد الموافقة على نشر المنتج في المتجر.'}
                            {activeSheet === 'reject' && 'تحديد سبب رفض المنتج وإبلاغ التاجر.'}
                        </SheetDescription>
                    </SheetHeader>
                    {renderSheetContent()}
                </SheetContent>
            </Sheet>
        </div>
    );
}
