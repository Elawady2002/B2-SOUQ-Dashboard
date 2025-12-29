import { useState } from 'react';
import { FileText, Image, Globe, Layout, Edit, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function AdminContent() {
    return (
        <div className="space-y-6" dir="rtl">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">إدارة المحتوى (CMS)</h1>
                <p className="text-slate-500 mt-1">التحكم في الصفحات الثابتة، البنرات، والمدونة.</p>
            </div>

            <Tabs defaultValue="pages" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-3 mb-4">
                    <TabsTrigger value="pages">الصفحات الثابتة</TabsTrigger>
                    <TabsTrigger value="banners">البنرات الإعلانية</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                </TabsList>

                <TabsContent value="pages">
                    <Card>
                        <CardHeader className="flex flex-row justify-between items-center">
                            <div>
                                <CardTitle>صفحات الموقع</CardTitle>
                                <CardDescription>مثل: "من نحن"، "سياسة الخصوصية"، "شروط الاستخدام".</CardDescription>
                            </div>
                            <Button className="gap-2"><Plus size={16} /> صفحة جديدة</Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
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
                                        <TableCell><Button variant="ghost" size="icon"><Edit size={16} /></Button></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">سياسة الخصوصية</TableCell>
                                        <TableCell className="font-mono text-xs text-slate-500">/privacy-policy</TableCell>
                                        <TableCell>2025-09-15</TableCell>
                                        <TableCell><Badge className="bg-green-100 text-green-700">منشور</Badge></TableCell>
                                        <TableCell><Button variant="ghost" size="icon"><Edit size={16} /></Button></TableCell>
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
                                <Input defaultValue="B2 Souq - منصة التجارة الإلكترونية المتكاملة" />
                            </div>
                            <div className="space-y-2">
                                <Label>وصف الموقع (Meta Description)</Label>
                                <Input className="h-20" defaultValue="أكبر منصة للبيع والشراء..." />
                            </div>
                            <div className="space-y-2">
                                <Label>الكلمات المفتاحية</Label>
                                <Input defaultValue="e-commerce, egypt, shopping, souq" />
                            </div>
                            <Button>حفظ الإعدادات</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
