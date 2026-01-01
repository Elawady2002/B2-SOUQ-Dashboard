import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FileText, Image, Globe, Layout, Edit, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';

export default function AdminContent() {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') || 'pages';
    const activeSheet = searchParams.get('sheet');

    // We can still keep selectedPage in state as it's complex object data, 
    // unless we want to fetch by ID from URL. For now, let's just sync the sheet visibility.
    // If user refreshes on edit_page, selectedPage will be null. 
    // Ideally we should pass ID in URL and fetch, but relying on state for 'selected' object 
    // is common in simple dash unless we have a data provider. 
    // To support "refresh" properly, we'd need a data store or refetch logic.
    // Given the constraints and current mock data, relying on just 'sheet' param 
    // might leave 'selectedPage' empty on refresh.
    // Let's stick to syncing the View state first. If data is missing on refresh, we might need a fallback or just close it.

    const [selectedPage, setSelectedPage] = useState(null);

    const setTab = (tab) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('tab', tab);
        setSearchParams(newParams);
    };

    const openSheet = (sheet, page = null) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sheet', sheet);
        if (page) {
            // In a real app we would set 'id' in URL and fetch data.
            // For this UI demo, we'll keep local state for the data, 
            // ensuring the Modal opens.
            setSelectedPage(page);
        }
        setSearchParams(newParams);
    };

    const closeSheet = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete('sheet');
        setSearchParams(newParams);
        setTimeout(() => setSelectedPage(null), 300);
    };

    const renderSheetContent = () => {
        if (activeSheet === 'add_page') {
            return (
                <SheetContent side="left" className="w-[400px] sm:w-[540px] overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle className="text-right">إضافة صفحة جديدة</SheetTitle>
                        <SheetDescription className="text-right">
                            أدخل تفاصيل الصفحة الجديدة ومحتواها.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-6 py-6 px-6" dir="rtl">
                        <div className="space-y-2">
                            <Label className="text-right block">عنوان الصفحة</Label>
                            <Input placeholder="مثال: الشروط والأحكام" className="text-right" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-right block">الرابط (Slug)</Label>
                            <Input placeholder="/terms-and-conditions" className="text-right font-mono text-sm" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-right block">المحتوى</Label>
                            <div className="h-64 border rounded-md p-4 bg-slate-50 text-slate-400 text-center flex items-center justify-center">
                                مساحة محرر النصوص (Rich Text Editor)
                            </div>
                        </div>
                    </div>
                    <SheetFooter className="flex-col sm:flex-col gap-2">
                        <Button onClick={closeSheet} className="w-full">حفظ ونشر</Button>
                        <Button variant="outline" onClick={closeSheet} className="w-full">إلغاء</Button>
                    </SheetFooter>
                </SheetContent>
            );
        }

        if (activeSheet === 'edit_page') {
            return (
                <SheetContent side="left" className="w-[400px] sm:w-[540px] overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle className="text-right">تعديل الصفحة</SheetTitle>
                        <SheetDescription className="text-right">
                            تعديل محتوى الصفحة الحالية.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-6 py-6 px-6" dir="rtl">
                        <div className="space-y-2">
                            <Label className="text-right block">عنوان الصفحة</Label>
                            <Input defaultValue={selectedPage?.title} className="text-right" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-right block">الرابط (Slug)</Label>
                            <Input defaultValue={selectedPage?.slug} className="text-right font-mono text-sm" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-right block">المحتوى</Label>
                            <div className="h-64 border rounded-md p-4 bg-slate-50 text-slate-400 text-center flex items-center justify-center">
                                محتوى الصفحة الحالي...
                            </div>
                        </div>
                    </div>
                    <SheetFooter className="flex-col sm:flex-col gap-2">
                        <Button onClick={closeSheet} className="w-full">حفظ التغييرات</Button>
                        <Button variant="outline" onClick={closeSheet} className="w-full">إلغاء</Button>
                    </SheetFooter>
                </SheetContent>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6" dir="rtl">
            <Sheet open={!!activeSheet} onOpenChange={(open) => !open && closeSheet()}>
                {renderSheetContent()}
            </Sheet>

            <div>
                <h1 className="text-3xl font-bold text-slate-900">إدارة المحتوى (CMS)</h1>
                <p className="text-slate-500 mt-1">التحكم في الصفحات الثابتة، البنرات، والمدونة.</p>
            </div>

            <Tabs value={activeTab} onValueChange={setTab} className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-3 mb-4 ml-auto">
                    <TabsTrigger value="pages">الصفحات الثابتة</TabsTrigger>
                    <TabsTrigger value="banners">البنرات الإعلانية</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                </TabsList>

                <TabsContent value="pages">
                    <Card>
                        <CardHeader className="flex flex-row justify-between items-center">
                            <div className="text-right">
                                <CardTitle>صفحات الموقع</CardTitle>
                                <CardDescription>مثل: "من نحن"، "سياسة الخصوصية"، "شروط الاستخدام".</CardDescription>
                            </div>
                            <Button onClick={() => openSheet('add_page')} className="gap-2"><Plus size={16} /> صفحة جديدة</Button>
                        </CardHeader>
                        <CardContent>
                            <Table dir="rtl">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-right">عنوان الصفحة</TableHead>
                                        <TableHead className="text-right">الرابط (Slug)</TableHead>
                                        <TableHead className="text-right">تاريخ التحديث</TableHead>
                                        <TableHead className="text-right">الحالة</TableHead>
                                        <TableHead className="text-right w-[50px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">من نحن</TableCell>
                                        <TableCell className="font-mono text-xs text-slate-500">/about-us</TableCell>
                                        <TableCell>2025-10-01</TableCell>
                                        <TableCell><Badge className="bg-green-100 text-green-700">منشور</Badge></TableCell>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openSheet('edit_page', { title: 'من نحن', slug: '/about-us' })}
                                            >
                                                <Edit size={16} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">سياسة الخصوصية</TableCell>
                                        <TableCell className="font-mono text-xs text-slate-500">/privacy-policy</TableCell>
                                        <TableCell>2025-09-15</TableCell>
                                        <TableCell><Badge className="bg-green-100 text-green-700">منشور</Badge></TableCell>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openSheet('edit_page', { title: 'سياسة الخصوصية', slug: '/privacy-policy' })}
                                            >
                                                <Edit size={16} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="banners">
                    <Card>
                        <CardHeader className="flex flex-row justify-between items-center">
                            <div>
                                <CardTitle>بنرات الصفحة الرئيسية</CardTitle>
                                <CardDescription>إدارة الصور الظاهرة في أعلى الموقع.</CardDescription>
                            </div>
                            <Button className="gap-2"><Plus size={16} /> رفع بنر</Button>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="group relative aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                    <Image size={32} />
                                </div>
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Button variant="secondary" size="sm">تعديل</Button>
                                    <Button variant="destructive" size="sm">حذف</Button>
                                </div>
                            </div>
                            <div className="group relative aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                    <Image size={32} />
                                </div>
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Button variant="secondary" size="sm">تعديل</Button>
                                    <Button variant="destructive" size="sm">حذف</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="seo">
                    <Card>
                        <CardHeader>
                            <CardTitle>تحسين محركات البحث (SEO)</CardTitle>
                            <CardDescription>الإعدادات العامة للكلمات المفتاحية والوصف.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 max-w-lg">
                            <div className="space-y-2">
                                <Label>عنوان الموقع (Meta Title)</Label>
                                <Input defaultValue="B2 Souq - منصة التجارة الإلكترونية المتكاملة" className="text-right" />
                            </div>
                            <div className="space-y-2">
                                <Label>وصف الموقع (Meta Description)</Label>
                                <Input className="h-20 text-right" defaultValue="أكبر منصة للبيع والشراء..." />
                            </div>
                            <div className="space-y-2">
                                <Label>الكلمات المفتاحية</Label>
                                <Input defaultValue="e-commerce, egypt, shopping, souq" className="text-right" />
                            </div>
                            <Button className="w-full sm:w-auto">حفظ الإعدادات</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
