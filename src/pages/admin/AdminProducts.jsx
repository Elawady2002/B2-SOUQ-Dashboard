import { useState } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function AdminProducts() {
    // Mock Data
    const products = [
        { id: 1, name: 'ساعة ذكية Apple Watch', merchant: 'تك ستور', category: 'إلكترونيات', price: 'EGP 15,000', status: 'pending', image: 'ap' },
        { id: 2, name: 'فستان صيفي مشجر', merchant: 'أزياء الموضة', category: 'ملابس', price: 'EGP 850', status: 'active', image: 'dr' },
        { id: 3, name: 'طقم أدوات مطبخ', merchant: 'سامي للأدوات', category: 'منزل', price: 'EGP 3,200', status: 'rejected', image: 'ki' },
        { id: 4, name: 'سماعات AirPods Pro', merchant: 'تك ستور', category: 'إلكترونيات', price: 'EGP 9,500', status: 'pending', image: 'ai' },
        { id: 5, name: 'حذاء رياضي Nike', merchant: 'بيت الرياضة', category: 'رياضة', price: 'EGP 4,500', status: 'active', image: 'ni' },
    ];

    return (
        <div className="space-y-6" dir="rtl">
            <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">المنتجات</h1>
                    <p className="text-slate-500 mt-1">مراجعة وإدارة المنتجات المضافة من التجار.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2 border-slate-200 text-slate-700">
                        <Filter size={16} />
                        تصفية
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200">
                    <div className="relative max-w-sm">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <Input
                            placeholder="بحث عن منتج أو تاجر..."
                            className="pr-9 border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                        />
                    </div>
                </div>

                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="text-right">المنتج</TableHead>
                            <TableHead className="text-right">التاجر</TableHead>
                            <TableHead className="text-right">القسم</TableHead>
                            <TableHead className="text-right">السعر</TableHead>
                            <TableHead className="text-right">الحالة</TableHead>
                            <TableHead className="text-right w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id} className="hover:bg-slate-50/50">
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold">
                                            {product.image.toUpperCase()}
                                        </div>
                                        <span className="font-medium text-slate-900">{product.name}</span>
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
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>إجراءات</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="gap-2 cursor-pointer">
                                                <Eye size={14} /> عرض التفاصيل
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="gap-2 text-green-600 focus:text-green-700 cursor-pointer">
                                                <CheckCircle size={14} /> قبول المنتج
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="gap-2 text-red-600 focus:text-red-700 cursor-pointer">
                                                <XCircle size={14} /> رفض المنتج
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
