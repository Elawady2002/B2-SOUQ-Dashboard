import { useState } from 'react';
import {
    Store,
    Camera,
    Globe,
    Phone,
    Mail,
    MapPin,
    Users,
    History,
    CreditCard,
    ChevronLeft,
    MessageCircle,
    BadgeCheck,
    Star,
    Calendar as CalendarIcon,
    ShieldCheck,
    Truck,
    Clock,
    FileText,
    Package
} from 'lucide-react';

// Import social media icons
import FacebookIconSvg from '../assets/icons/Socials.svg';
import XIconSvg from '../assets/icons/Socials-1.svg';
import InstagramIconSvg from '../assets/icons/Socials-2.svg';
import TikTokIconSvg from '../assets/icons/Socials-3.svg';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function StoreProfile() {
    const [isStoreOpen, setIsStoreOpen] = useState(true);

    // Basic Identity
    const [storeName, setStoreName] = useState('متجر الأناقة');
    const [storeNameEn, setStoreNameEn] = useState('Elegance store');
    const [storeDescription, setStoreDescription] = useState('وجهتكم الأولى للأزياء العصرية والمنتجات الراقية نقدم أفضل الماركات العالمية بأسعار منافسة');
    const [website, setWebsite] = useState('merchant-saas.com');

    // Basic Data
    const [mainCategory, setMainCategory] = useState('fashion');
    const [subCategories, setSubCategories] = useState('ملابس رجالي، ملابس نسائي، إكسسوارات');
    const [brandName, setBrandName] = useState('');
    const [isOfficialStore, setIsOfficialStore] = useState(true);
    const [isVerified, setIsVerified] = useState(true);

    // Policies
    const [shippingPolicy, setShippingPolicy] = useState('');
    const [returnPolicy, setReturnPolicy] = useState('');
    const [warrantyPolicy, setWarrantyPolicy] = useState('');
    const [replacementPolicy, setReplacementPolicy] = useState('');
    const [packagingPolicy, setPackagingPolicy] = useState('');

    // Operations
    const [workingHours, setWorkingHours] = useState('09:00 ص - 10:00 م');
    const [pickupTimes, setPickupTimes] = useState('10:00 ص - 04:00 م');
    const [supportHours, setSupportHours] = useState('24/7');

    // Contact
    const [facebook, setFacebook] = useState('facebook.com/');
    const [twitter, setTwitter] = useState('X.com/');
    const [instagram, setInstagram] = useState('instagram.com/');
    const [tiktok, setTiktok] = useState('tiktok.com/');
    const [phone1, setPhone1] = useState('01037728582');
    const [phone2, setPhone2] = useState('01037728582');
    const [email, setEmail] = useState('example@gmail.com');
    const [city, setCity] = useState('أسوان');
    const [address, setAddress] = useState('56 شارع عبد السلام عارف بأسوان');

    return (
        <div className="flex flex-col gap-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">إعدادات ملف المتجر</h2>
                    <p className="text-sm text-slate-500 mt-1">إدارة بيانات المتجر، السياسات، وإعدادات التشغيل</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50">
                        معاينة الصفحة
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-200">
                        حفظ التغييرات
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">

                {/* Main Content */}
                <div className="flex flex-col gap-6">

                    {/* Banner & Logo Section */}
                    <Card className="border-slate-100 shadow-sm bg-white overflow-hidden">
                        <CardHeader className="pb-4 border-b border-slate-50">
                            <CardTitle className="text-lg font-bold text-slate-800">شعار وغلاف الموقع</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex gap-6 items-start">
                                {/* Logo Upload */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-blue-200 bg-blue-50 flex items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors group">
                                        <Camera className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <span className="text-sm font-medium text-blue-600">رفع الشعار</span>
                                </div>

                                {/* Banner Upload */}
                                <div className="flex-1">
                                    <div className="h-40 rounded-xl bg-slate-100 relative overflow-hidden group">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800)' }}
                                        />
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="absolute bottom-3 left-3 bg-white/90 hover:bg-white text-slate-700 shadow-sm backdrop-blur-sm"
                                        >
                                            تغيير الغلاف
                                        </Button>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-2">الأبعاد الموصى بها: 1400 × 400 بكسل</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Basic Identity & Data */}
                    <Card className="border-slate-100 shadow-sm bg-white">
                        <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-center justify-between">
                            <CardTitle className="text-lg font-bold text-slate-800">الهوية والبيانات الأساسية</CardTitle>
                            <div className="flex gap-2">
                                {isVerified && (
                                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 gap-1 hover:bg-blue-100">
                                        <BadgeCheck className="w-3.5 h-3.5" />
                                        متجر موثق
                                    </Badge>
                                )}
                                {isOfficialStore && (
                                    <Badge variant="secondary" className="bg-amber-50 text-amber-700 gap-1 hover:bg-amber-100">
                                        <Store className="w-3.5 h-3.5" />
                                        متجر رسمي
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 flex flex-col gap-6">

                            {/* Names */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="storeName" className="text-slate-700 font-medium">اسم المتجر (اللغة العربية)</Label>
                                    <Input
                                        id="storeName"
                                        value={storeName}
                                        onChange={(e) => setStoreName(e.target.value)}
                                        className="bg-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="storeNameEn" className="text-slate-700 font-medium">اسم المتجر (اللغة الانجليزية)</Label>
                                    <Input
                                        id="storeNameEn"
                                        value={storeNameEn}
                                        onChange={(e) => setStoreNameEn(e.target.value)}
                                        className="bg-white text-left"
                                        dir="ltr"
                                    />
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="space-y-2">
                                <Label htmlFor="storeDescription" className="text-slate-600">وصف المتجر</Label>
                                <Textarea
                                    id="storeDescription"
                                    value={storeDescription}
                                    onChange={(e) => setStoreDescription(e.target.value)}
                                    rows={3}
                                    className="bg-white resize-none"
                                />
                            </div>

                            {/* Domain - Merged */}
                            <div className="space-y-2">
                                <Label className="text-slate-600">نطاق المتجر</Label>
                                <div className="flex gap-4 items-center">
                                    <div className="relative flex-1">
                                        <Globe className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                                        <Input
                                            value={website}
                                            onChange={(e) => setWebsite(e.target.value)}
                                            className="pr-10 bg-white text-left"
                                            dir="ltr"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 text-sm dir-ltr text-slate-600 font-medium whitespace-nowrap">
                                        <span className="text-slate-400">Preview:</span>
                                        {storeNameEn}.{website}
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Categories & Brand */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-slate-600">الفئة الرئيسية</Label>
                                    <Select value={mainCategory} onValueChange={setMainCategory}>
                                        <SelectTrigger className="bg-white">
                                            <SelectValue placeholder="اختر الفئة" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="fashion">أزياء وموضة</SelectItem>
                                            <SelectItem value="electronics">إلكترونيات</SelectItem>
                                            <SelectItem value="home">منزل وديكور</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-600">العلامة التجارية (للمتاجر الرسمية)</Label>
                                    <Input
                                        value={brandName}
                                        onChange={(e) => setBrandName(e.target.value)}
                                        placeholder="مثال: شاومي، سامسونج"
                                        className="bg-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-600">الفئات الفرعية</Label>
                                <Input
                                    value={subCategories}
                                    onChange={(e) => setSubCategories(e.target.value)}
                                    className="bg-white"
                                />
                                <p className="text-xs text-slate-400">افصل بين الفئات بفاصلة</p>
                            </div>

                            {/* Read-only Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                                        <Star className="w-4 h-4 fill-amber-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">متوسط التقييمات</p>
                                        <p className="text-sm font-bold text-slate-700">4.8 / 5.0</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <CalendarIcon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">تاريخ التسجيل</p>
                                        <p className="text-sm font-bold text-slate-700">12 يناير 2023</p>
                                    </div>
                                </div>
                            </div>

                        </CardContent>
                    </Card>

                    {/* Store Policies */}
                    <Card className="border-slate-100 shadow-sm bg-white">
                        <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-slate-500" />
                            <CardTitle className="text-lg font-bold text-slate-800">سياسات المتجر</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 grid grid-cols-1 gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-slate-600">سياسة الشحن</Label>
                                    <Textarea
                                        value={shippingPolicy}
                                        onChange={(e) => setShippingPolicy(e.target.value)}
                                        placeholder="تفاصيل التوصيل والمدد الزمنية..."
                                        className="bg-white h-24 resize-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-600">سياسة الإرجاع</Label>
                                    <Textarea
                                        value={returnPolicy}
                                        onChange={(e) => setReturnPolicy(e.target.value)}
                                        placeholder="شروط ومدة الإرجاع..."
                                        className="bg-white h-24 resize-none"
                                    />
                                </div>
                            </div>
                            <Separator />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-slate-600">سياسة الضمان</Label>
                                    <Textarea
                                        value={warrantyPolicy}
                                        onChange={(e) => setWarrantyPolicy(e.target.value)}
                                        className="bg-white resize-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-600">سياسة الاستبدال</Label>
                                    <Textarea
                                        value={replacementPolicy}
                                        onChange={(e) => setReplacementPolicy(e.target.value)}
                                        className="bg-white resize-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-600">سياسة التعبئة</Label>
                                    <Textarea
                                        value={packagingPolicy}
                                        onChange={(e) => setPackagingPolicy(e.target.value)}
                                        className="bg-white resize-none"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Operation Settings */}
                    <Card className="border-slate-100 shadow-sm bg-white">
                        <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-center gap-2">
                            <Clock className="w-5 h-5 text-slate-500" />
                            <CardTitle className="text-lg font-bold text-slate-800">إعدادات التشغيل</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-slate-600">أوقات العمل</Label>
                                    <Input
                                        value={workingHours}
                                        onChange={(e) => setWorkingHours(e.target.value)}
                                        className="bg-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-600">مواعيد استلام الشحنات</Label>
                                    <Input
                                        value={pickupTimes}
                                        onChange={(e) => setPickupTimes(e.target.value)}
                                        className="bg-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-600">ساعات دعم العملاء</Label>
                                    <Input
                                        value={supportHours}
                                        onChange={(e) => setSupportHours(e.target.value)}
                                        className="bg-white"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information (Existing) */}
                    <Card className="border-slate-100 shadow-sm bg-white">
                        <CardHeader className="pb-4 border-b border-slate-50">
                            <CardTitle className="text-lg font-bold text-slate-800">معلومات التواصل والموقع</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="phone1" className="text-slate-600">رقم الهاتف</Label>
                                    <div className="relative">
                                        <Phone className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                                        <Input
                                            id="phone1"
                                            value={phone1}
                                            onChange={(e) => setPhone1(e.target.value)}
                                            className="pr-10 bg-white text-left"
                                            dir="ltr"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone2" className="text-slate-600">رقم الهاتف (بديل للأعمال)</Label>
                                    <div className="relative">
                                        <Phone className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                                        <Input
                                            id="phone2"
                                            value={phone2}
                                            onChange={(e) => setPhone2(e.target.value)}
                                            className="pr-10 bg-white text-left"
                                            dir="ltr"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-600">البريد الإلكتروني</Label>
                                <div className="relative">
                                    <Mail className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                                    <Input
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pr-10 bg-white text-left"
                                        dir="ltr"
                                    />
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h4 className="text-sm font-semibold text-slate-700">عنوان المستودع الرئيسي</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="city" className="text-slate-600">المدينة</Label>
                                        <Input
                                            id="city"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            className="bg-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address" className="text-slate-700 font-medium">العنوان التفصيلي</Label>
                                        <Input
                                            id="address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="bg-white"
                                        />
                                    </div>
                                </div>

                                <div className="h-48 bg-slate-100 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-200">
                                    <div
                                        className="absolute inset-0 opacity-50 bg-cover bg-center"
                                        style={{ backgroundImage: 'url(https://maps.googleapis.com/maps/api/staticmap?center=24.7136,46.6753&zoom=14&size=600x300&maptype=roadmap&key=demo)' }}
                                    />
                                    <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center shadow-lg shadow-rose-500/30 z-10 animate-bounce">
                                        <MapPin className="text-white w-5 h-5" />
                                    </div>
                                    <div className="absolute bottom-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-slate-600 shadow-sm border border-white/50">
                                        الرياض، المملكة العربية السعودية
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar - Quick Actions & Status */}
                <div className="flex flex-col gap-8">

                    {/* Store Status Card */}
                    <Card className="border-slate-100 shadow-sm bg-white">
                        <CardHeader className="pb-4 border-b border-slate-50">
                            <CardTitle className="text-base font-bold text-slate-800">حالة المتجر</CardTitle>
                        </CardHeader>
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between mb-4">
                                <div className="space-y-0.5">
                                    <div className="text-sm font-medium text-slate-800">تفعيل المتجر</div>
                                    <div className="text-xs text-slate-500">إتاحة المتجر للعملاء واستقبال الطلبات</div>
                                </div>
                                <div dir="ltr">
                                    <Switch
                                        checked={isStoreOpen}
                                        onCheckedChange={setIsStoreOpen}
                                        className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-slate-200"
                                    />
                                </div>
                            </div>

                            <div className={`flex items-center gap-2 p-3 rounded-lg border transition-colors ${isStoreOpen ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'}`}>
                                <div className={`w-2 h-2 rounded-full ${isStoreOpen ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                <span className="text-sm font-medium">
                                    {isStoreOpen ? 'المتجر نشط' : 'المتجر معطل'}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Social Links Card */}
                    <Card className="border-slate-100 shadow-sm bg-white">
                        <CardHeader className="pb-4 border-b border-slate-50">
                            <CardTitle className="text-base font-bold text-slate-800">الروابط الاجتماعية</CardTitle>
                        </CardHeader>
                        <CardContent className="p-5 flex flex-col gap-3">
                            <div className="relative group">
                                <img src={FacebookIconSvg} alt="Facebook" className="absolute right-3 top-2.5 w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                                <Input
                                    value={facebook}
                                    onChange={(e) => setFacebook(e.target.value)}
                                    className="pr-10 bg-slate-50/50 border-slate-200 text-left"
                                    dir="ltr"
                                />
                            </div>
                            <div className="relative group">
                                <img src={XIconSvg} alt="X" className="absolute right-3 top-2.5 w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                                <Input
                                    value={twitter}
                                    onChange={(e) => setTwitter(e.target.value)}
                                    className="pr-10 bg-slate-50/50 border-slate-200 text-left"
                                    dir="ltr"
                                />
                            </div>
                            <div className="relative group">
                                <img src={InstagramIconSvg} alt="Instagram" className="absolute right-3 top-2.5 w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                                <Input
                                    value={instagram}
                                    onChange={(e) => setInstagram(e.target.value)}
                                    className="pr-10 bg-slate-50/50 border-slate-200 text-left"
                                    dir="ltr"
                                />
                            </div>
                            <div className="relative group">
                                <img src={TikTokIconSvg} alt="TikTok" className="absolute right-3 top-2.5 w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                                <Input
                                    value={tiktok}
                                    onChange={(e) => setTiktok(e.target.value)}
                                    className="pr-10 bg-slate-50/50 border-slate-200 text-left"
                                    dir="ltr"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="border-slate-100 shadow-sm bg-white">
                        <CardHeader className="pb-4 border-b border-slate-50">
                            <CardTitle className="text-base font-bold text-slate-800">العمليات السريعة</CardTitle>
                        </CardHeader>
                        <CardContent className="p-5 flex flex-col gap-2">
                            <Button variant="ghost" className="justify-between h-auto p-3 hover:bg-slate-50 rounded-xl group">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Users size={18} />
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-semibold text-slate-700">إدارة فريق العمل</div>
                                        <div className="text-[10px] text-slate-400">وإضافة أو حذف موظفين</div>
                                    </div>
                                </div>
                                <ChevronLeft size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                            </Button>

                            <Button variant="ghost" className="justify-between h-auto p-3 hover:bg-slate-50 rounded-xl group">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <History size={18} />
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-semibold text-slate-700">سجل النشاطات</div>
                                        <div className="text-[10px] text-slate-400">سجل الدخول والتعديلات</div>
                                    </div>
                                </div>
                                <ChevronLeft size={16} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                            </Button>

                            <Button variant="ghost" className="justify-between h-auto p-3 hover:bg-slate-50 rounded-xl group">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <CreditCard size={18} />
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-semibold text-slate-700">إعدادات الدفع</div>
                                        <div className="text-[10px] text-slate-400">طرق الدفع والإعدادات</div>
                                    </div>
                                </div>
                                <ChevronLeft size={16} className="text-slate-300 group-hover:text-amber-500 transition-colors" />
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Support Card */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white shadow-lg shadow-blue-200">
                        <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/10" />
                        <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-white/10" />

                        <h3 className="relative text-lg font-bold mb-2 text-white">تحتاج إلى مساعدة ؟</h3>
                        <p className="relative text-sm text-blue-50/90 leading-relaxed mb-4">
                            فريق الدعم المباشر جاهز لمساعدتك في إعداد متجرك خطوة بخطوة
                        </p>

                        <Button className="relative w-full bg-white text-blue-600 hover:bg-blue-50 border-0 font-semibold gap-2">
                            <MessageCircle size={16} />
                            تواصل معنا
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}
