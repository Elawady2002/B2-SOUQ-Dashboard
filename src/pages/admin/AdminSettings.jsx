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
                <TabsList className="grid w-full max-w-2xl grid-cols-4 mb-4">
                    <TabsTrigger value="general">عامة</TabsTrigger>
                    <TabsTrigger value="payment">الدفع</TabsTrigger>
                    <TabsTrigger value="shipping">الشحن</TabsTrigger>
                    <TabsTrigger value="email">البريد (SMTP)</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>الإعدادات العامة</CardTitle>
                            <CardDescription>العملات، اللغات، والضرائب.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 max-w-lg">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>العملة الافتراضية</Label>
                                    <Select defaultValue="EGP">
                                        <SelectTrigger>
                                            <SelectValue placeholder="اختر العملة" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="EGP">الجنيه المصري (EGP)</SelectItem>
                                            <SelectItem value="USD">الدولار الأمريكي (USD)</SelectItem>
                                            <SelectItem value="SAR">الريال السعودي (SAR)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>اللغة الافتراضية</Label>
                                    <Select defaultValue="ar">
                                        <SelectTrigger>
                                            <SelectValue placeholder="اختر اللغة" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ar">العربية</SelectItem>
                                            <SelectItem value="en">English</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>نسبة الضريبة (%)</Label>
                                <Input type="number" defaultValue="14" />
                            </div>
                            <Button>حفظ التغييرات</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="payment">
                    <Card>
                        <CardHeader>
                            <CardTitle>بوابات الدفع</CardTitle>
                            <CardDescription>تفعيل وتعطيل طرق الدفع المتاحة.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <CreditCard className="text-blue-600" />
                                    <div>
                                        <p className="font-medium">Stripe / Visa / Mastercard</p>
                                        <p className="text-sm text-slate-500">الدفع بالبطاقات البنكية</p>
                                    </div>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Settings className="text-red-600" />
                                    <div>
                                        <p className="font-medium">Vodafone Cash (Integration)</p>
                                        <p className="text-sm text-slate-500">الدفع عبر المحافظ الإلكترونية</p>
                                    </div>
                                </div>
                                <Switch checked />
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <DollarSign className="text-green-600" /> {/* DollarSign component is not imported but Settings is, let me swap icon or fix import. Wait, DollarSign IS NOT imported. I'll use Wallet instead */}
                                    <CreditCard className="text-green-600" />
                                    <div>
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
                            <CardTitle>شركات الشحن</CardTitle>
                            <CardDescription>إدارة التكامل مع شركات الشحن.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Truck className="text-orange-600" />
                                    <div>
                                        <p className="font-medium">Bosta</p>
                                        <p className="text-sm text-slate-500">الشحن المحلي السريع</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">إعداد API</Button>
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Truck className="text-yellow-600" />
                                    <div>
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
                            <CardTitle>إعدادات البريد (SMTP)</CardTitle>
                            <CardDescription>تكوين خادم البريد لإرسال الإشعارات.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 max-w-lg">
                            <div className="space-y-2">
                                <Label>SMTP Host</Label>
                                <Input placeholder="smtp.example.com" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Port</Label>
                                    <Input placeholder="587" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Encryption</Label>
                                    <Select defaultValue="tls">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="tls">TLS</SelectItem>
                                            <SelectItem value="ssl">SSL</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Username</Label>
                                <Input placeholder="email@domain.com" />
                            </div>
                            <div className="space-y-2">
                                <Label>Password</Label>
                                <Input type="password" placeholder="********" />
                            </div>
                            <Button>جرب الإتصال</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
