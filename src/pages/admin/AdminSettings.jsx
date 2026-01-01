import { useState } from 'react';
import { Settings, CreditCard, Truck, Mail, Globe, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AdminSettings() {
    return (
        <div className="space-y-6" dir="rtl">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">إعدادات النظام</h1>
                <p className="text-slate-500 mt-1">تهيئة العملات، بوابات الدفع، الشحن، والبريد الإلكتروني.</p>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full max-w-2xl grid-cols-4 mb-4 ml-auto">
                    <TabsTrigger value="general">عامة</TabsTrigger>
                    <TabsTrigger value="payment">الدفع</TabsTrigger>
                    <TabsTrigger value="shipping">الشحن</TabsTrigger>
                    <TabsTrigger value="email">البريد (SMTP)</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-right">الإعدادات العامة</CardTitle>
                            <CardDescription className="text-right">العملات، اللغات، والضرائب.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 max-w-lg">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-right block">العملة الافتراضية</Label>
                                    <Select defaultValue="EGP">
                                        <SelectTrigger dir="rtl">
                                            <SelectValue placeholder="اختر العملة" />
                                        </SelectTrigger>
                                        <SelectContent dir="rtl">
                                            <SelectItem value="EGP">الجنيه المصري (EGP)</SelectItem>
                                            <SelectItem value="USD">الدولار الأمريكي (USD)</SelectItem>
                                            <SelectItem value="SAR">الريال السعودي (SAR)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-right block">اللغة الافتراضية</Label>
                                    <Select defaultValue="ar">
                                        <SelectTrigger dir="rtl">
                                            <SelectValue placeholder="اختر اللغة" />
                                        </SelectTrigger>
                                        <SelectContent dir="rtl">
                                            <SelectItem value="ar">العربية</SelectItem>
                                            <SelectItem value="en">English</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-right block">نسبة الضريبة (%)</Label>
                                <Input type="number" defaultValue="14" className="text-right" />
                            </div>
                            <Button className="w-full sm:w-auto">حفظ التغييرات</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="payment">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-right">بوابات الدفع</CardTitle>
                            <CardDescription className="text-right">تفعيل وتعطيل طرق الدفع المتاحة.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <CreditCard className="text-blue-600" />
                                    <div className="text-right">
                                        <p className="font-medium">Stripe / Visa / Mastercard</p>
                                        <p className="text-sm text-slate-500">الدفع بالبطاقات البنكية</p>
                                    </div>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Settings className="text-red-600" />
                                    <div className="text-right">
                                        <p className="font-medium">Vodafone Cash (Integration)</p>
                                        <p className="text-sm text-slate-500">الدفع عبر المحافظ الإلكترونية</p>
                                    </div>
                                </div>
                                <Switch checked />
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">

                                    <CreditCard className="text-green-600" />
                                    <div className="text-right">
                                        <p className="font-medium">الدفع عند الاستلام (COD)</p>
                                        <p className="text-sm text-slate-500">تحصيل المبلغ عند التوصيل</p>
                                    </div>
                                </div>
                                <Switch checked />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="shipping">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-right">شركات الشحن</CardTitle>
                            <CardDescription className="text-right">إدارة التكامل مع شركات الشحن.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Truck className="text-orange-600" />
                                    <div className="text-right">
                                        <p className="font-medium">Bosta</p>
                                        <p className="text-sm text-slate-500">الشحن المحلي السريع</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">إعداد API</Button>
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Truck className="text-yellow-600" />
                                    <div className="text-right">
                                        <p className="font-medium">Aramex</p>
                                        <p className="text-sm text-slate-500">الشحن الدولي</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">إعداد API</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="email">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-right">إعدادات البريد (SMTP)</CardTitle>
                            <CardDescription className="text-right">تكوين خادم البريد لإرسال الإشعارات.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 max-w-lg">
                            <div className="space-y-2">
                                <Label className="text-right block">SMTP Host</Label>
                                <Input placeholder="smtp.example.com" className="text-right" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-right block">Port</Label>
                                    <Input placeholder="587" className="text-right" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-right block">Encryption</Label>
                                    <Select defaultValue="tls">
                                        <SelectTrigger dir="rtl">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent dir="rtl">
                                            <SelectItem value="tls">TLS</SelectItem>
                                            <SelectItem value="ssl">SSL</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-right block">Username</Label>
                                <Input placeholder="email@domain.com" className="text-right" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-right block">Password</Label>
                                <Input type="password" placeholder="********" className="text-right" />
                            </div>
                            <Button className="w-full sm:w-auto">جرب الإتصال</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
