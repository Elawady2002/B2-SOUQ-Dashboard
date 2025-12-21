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
    Package,
    RotateCcw,
    Headphones,
    Building2
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
                            <CardTitle className="text-lg font-bold text-slate-800">شعار وغلاف المتجر</CardTitle>
                            <CardDescription className="text-slate-500">صور تمثل هوية متجرك للعملاء</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex gap-8 items-start">
                                {/* Banner Upload - Main area */}
                                <div className="flex-1 order-2">
                                    <Label className="text-slate-700 font-medium mb-3 block">صورة الغلاف</Label>
                                    <div className="h-44 rounded-xl bg-slate-100 relative overflow-hidden group border-2 border-dashed border-slate-200 hover:border-blue-300 transition-colors">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800)' }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="absolute bottom-3 left-3 bg-white/95 hover:bg-white text-slate-700 shadow-md backdrop-blur-sm gap-2"
                                        >
                                            <Camera size={14} />
                                            تغيير الغلاف
                                        </Button>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-2 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                        الأبعاد الموصى بها: 1400 × 400 بكسل
                                    </p>
                                </div>

                                {/* Logo Upload - Smaller on right */}
                                <div className="flex flex-col items-center gap-3 order-1">
                                    <Label className="text-slate-700 font-medium">الشعار</Label>
                                    <div className="w-28 h-28 rounded-2xl border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-slate-50 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 hover:border-blue-400 transition-all group shadow-sm">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                            <Camera className="w-6 h-6 text-blue-500" />
                                        </div>
                                        <span className="text-xs font-medium text-blue-600">رفع الشعار</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 text-center">200 × 200 بكسل</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Basic Identity & Data */}
                    <Card className="border-slate-100 shadow-sm bg-white">
                        <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-bold text-slate-800">الهوية والبيانات الأساسية</CardTitle>
                                <CardDescription className="text-slate-500">معلومات متجرك التي تظهر للعملاء</CardDescription>
                            </div>
                            <div className="flex gap-2">
                                {isVerified && (
                                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 gap-1.5 hover:bg-blue-100 px-3 py-1">
                                        <BadgeCheck className="w-4 h-4" />
                                        متجر موثق
                                    </Badge>
                                )}
                                {isOfficialStore && (
                                    <Badge variant="secondary" className="bg-amber-50 text-amber-700 gap-1.5 hover:bg-amber-100 px-3 py-1">
                                        <Store className="w-4 h-4" />
                                        متجر رسمي
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                                {/* Store Names Card */}
                                <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-5 border border-blue-100/50">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                                            <Store className="w-4 h-4 text-white" />
                                        </div>
                                        <h4 className="text-sm font-bold text-slate-800">اسم المتجر</h4>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <Label className="text-xs text-slate-500 mb-1.5 block">بالعربية</Label>
                                            <Input
                                                value={storeName}
                                                onChange={(e) => setStoreName(e.target.value)}
                                                className="bg-white h-10 text-sm border-slate-200"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-xs text-slate-500 mb-1.5 block">بالإنجليزية</Label>
                                            <Input
                                                value={storeNameEn}
                                                onChange={(e) => setStoreNameEn(e.target.value)}
                                                className="bg-white h-10 text-sm text-left border-slate-200"
                                                dir="ltr"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Description Card */}
                                <div className="bg-gradient-to-br from-emerald-50 to-slate-50 rounded-xl p-5 border border-emerald-100/50">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                                            <FileText className="w-4 h-4 text-white" />
                                        </div>
                                        <h4 className="text-sm font-bold text-slate-800">وصف المتجر</h4>
                                    </div>
                                    <Textarea
                                        value={storeDescription}
                                        onChange={(e) => setStoreDescription(e.target.value)}
                                        rows={4}
                                        className="bg-white resize-none text-sm border-slate-200"
                                        placeholder="وصف مختصر وجذاب..."
                                    />
                                    <p className="text-[10px] text-slate-400 mt-2">يظهر في البحث وصفحة المتجر</p>
                                </div>

                                {/* Domain Card */}
                                <div className="bg-gradient-to-br from-purple-50 to-slate-50 rounded-xl p-5 border border-purple-100/50">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center">
                                            <Globe className="w-4 h-4 text-white" />
                                        </div>
                                        <h4 className="text-sm font-bold text-slate-800">رابط المتجر</h4>
                                    </div>
                                    <div className="space-y-3">
                                        <Input
                                            value={website}
                                            onChange={(e) => setWebsite(e.target.value)}
                                            className="bg-white h-10 text-sm text-left border-slate-200"
                                            dir="ltr"
                                        />
                                        <div className="bg-white rounded-lg p-3 border border-slate-200">
                                            <p className="text-[10px] text-slate-400 mb-1">رابط متجرك:</p>
                                            <p className="text-sm font-mono text-purple-600 font-medium truncate">
                                                {storeNameEn.toLowerCase().replace(/\s+/g, '')}.{website}
                                            </p>
                                        </div>
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
                        <CardHeader className="pb-4 border-b border-slate-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                                    <ShieldCheck className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg font-bold text-slate-800">سياسات المتجر</CardTitle>
                                    <CardDescription className="text-slate-500">السياسات التي تحكم تعاملات متجرك</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* Shipping Policy */}
                                <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-4 border border-blue-100/50">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Truck className="w-4 h-4 text-blue-600" />
                                        <Label className="text-sm font-semibold text-slate-700">الشحن</Label>
                                    </div>
                                    <Textarea
                                        value={shippingPolicy}
                                        onChange={(e) => setShippingPolicy(e.target.value)}
                                        placeholder="تفاصيل التوصيل..."
                                        className="bg-white h-20 resize-none text-sm border-slate-200"
                                    />
                                </div>

                                {/* Return Policy */}
                                <div className="bg-gradient-to-br from-rose-50 to-slate-50 rounded-xl p-4 border border-rose-100/50">
                                    <div className="flex items-center gap-2 mb-3">
                                        <RotateCcw className="w-4 h-4 text-rose-600" />
                                        <Label className="text-sm font-semibold text-slate-700">الإرجاع</Label>
                                    </div>
                                    <Textarea
                                        value={returnPolicy}
                                        onChange={(e) => setReturnPolicy(e.target.value)}
                                        placeholder="شروط الإرجاع..."
                                        className="bg-white h-20 resize-none text-sm border-slate-200"
                                    />
                                </div>

                                {/* Warranty Policy */}
                                <div className="bg-gradient-to-br from-emerald-50 to-slate-50 rounded-xl p-4 border border-emerald-100/50">
                                    <div className="flex items-center gap-2 mb-3">
                                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                        <Label className="text-sm font-semibold text-slate-700">الضمان</Label>
                                    </div>
                                    <Textarea
                                        value={warrantyPolicy}
                                        onChange={(e) => setWarrantyPolicy(e.target.value)}
                                        placeholder="سياسة الضمان..."
                                        className="bg-white h-20 resize-none text-sm border-slate-200"
                                    />
                                </div>

                                {/* Replacement Policy */}
                                <div className="bg-gradient-to-br from-amber-50 to-slate-50 rounded-xl p-4 border border-amber-100/50">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Package className="w-4 h-4 text-amber-600" />
                                        <Label className="text-sm font-semibold text-slate-700">الاستبدال</Label>
                                    </div>
                                    <Textarea
                                        value={replacementPolicy}
                                        onChange={(e) => setReplacementPolicy(e.target.value)}
                                        placeholder="سياسة الاستبدال..."
                                        className="bg-white h-20 resize-none text-sm border-slate-200"
                                    />
                                </div>

                                {/* Packaging Policy */}
                                <div className="bg-gradient-to-br from-purple-50 to-slate-50 rounded-xl p-4 border border-purple-100/50">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Package className="w-4 h-4 text-purple-600" />
                                        <Label className="text-sm font-semibold text-slate-700">التعبئة</Label>
                                    </div>
                                    <Textarea
                                        value={packagingPolicy}
                                        onChange={(e) => setPackagingPolicy(e.target.value)}
                                        placeholder="سياسة التعبئة..."
                                        className="bg-white h-20 resize-none text-sm border-slate-200"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Operation Settings */}
                    <Card className="border-slate-100 shadow-sm bg-white">
                        <CardHeader className="pb-4 border-b border-slate-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-cyan-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg font-bold text-slate-800">إعدادات التشغيل</CardTitle>
                                    <CardDescription className="text-slate-500">أوقات العمل والدعم</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Working Hours */}
                                <div className="bg-gradient-to-br from-cyan-50 to-slate-50 rounded-xl p-4 border border-cyan-100/50">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Clock className="w-4 h-4 text-cyan-600" />
                                        <Label className="text-sm font-semibold text-slate-700">أوقات العمل</Label>
                                    </div>
                                    <Input
                                        value={workingHours}
                                        onChange={(e) => setWorkingHours(e.target.value)}
                                        className="bg-white h-10 text-sm border-slate-200"
                                    />
                                </div>

                                {/* Pickup Times */}
                                <div className="bg-gradient-to-br from-orange-50 to-slate-50 rounded-xl p-4 border border-orange-100/50">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Truck className="w-4 h-4 text-orange-600" />
                                        <Label className="text-sm font-semibold text-slate-700">استلام الشحنات</Label>
                                    </div>
                                    <Input
                                        value={pickupTimes}
                                        onChange={(e) => setPickupTimes(e.target.value)}
                                        className="bg-white h-10 text-sm border-slate-200"
                                    />
                                </div>

                                {/* Support Hours */}
                                <div className="bg-gradient-to-br from-green-50 to-slate-50 rounded-xl p-4 border border-green-100/50">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Headphones className="w-4 h-4 text-green-600" />
                                        <Label className="text-sm font-semibold text-slate-700">دعم العملاء</Label>
                                    </div>
                                    <Input
                                        value={supportHours}
                                        onChange={(e) => setSupportHours(e.target.value)}
                                        className="bg-white h-10 text-sm border-slate-200"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <Card className="border-slate-100 shadow-sm bg-white">
                        <CardHeader className="pb-4 border-b border-slate-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
                                    <Phone className="w-5 h-5 text-rose-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg font-bold text-slate-800">معلومات التواصل والموقع</CardTitle>
                                    <CardDescription className="text-slate-500">بيانات الاتصال وعنوان المستودع</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            {/* Contact Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                {/* Phone 1 */}
                                <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-4 border border-blue-100/50">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Phone className="w-4 h-4 text-blue-600" />
                                        <Label className="text-sm font-semibold text-slate-700">رقم الهاتف</Label>
                                    </div>
                                    <Input
                                        value={phone1}
                                        onChange={(e) => setPhone1(e.target.value)}
                                        className="bg-white h-10 text-sm text-left border-slate-200"
                                        dir="ltr"
                                    />
                                </div>

                                {/* Phone 2 */}
                                <div className="bg-gradient-to-br from-violet-50 to-slate-50 rounded-xl p-4 border border-violet-100/50">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Phone className="w-4 h-4 text-violet-600" />
                                        <Label className="text-sm font-semibold text-slate-700">هاتف بديل</Label>
                                    </div>
                                    <Input
                                        value={phone2}
                                        onChange={(e) => setPhone2(e.target.value)}
                                        className="bg-white h-10 text-sm text-left border-slate-200"
                                        dir="ltr"
                                    />
                                </div>

                                {/* Email */}
                                <div className="bg-gradient-to-br from-pink-50 to-slate-50 rounded-xl p-4 border border-pink-100/50">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Mail className="w-4 h-4 text-pink-600" />
                                        <Label className="text-sm font-semibold text-slate-700">البريد الإلكتروني</Label>
                                    </div>
                                    <Input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-white h-10 text-sm text-left border-slate-200"
                                        dir="ltr"
                                    />
                                </div>
                            </div>

                            {/* Warehouse Address Section */}
                            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <Building2 className="w-5 h-5 text-slate-600" />
                                    <h4 className="text-sm font-bold text-slate-800">عنوان المستودع الرئيسي</h4>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <Label className="text-xs text-slate-500 mb-1.5 block">المدينة</Label>
                                        <Input
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            className="bg-white h-10 text-sm border-slate-200"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs text-slate-500 mb-1.5 block">العنوان التفصيلي</Label>
                                        <Input
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="bg-white h-10 text-sm border-slate-200"
                                        />
                                    </div>
                                </div>

                                {/* Map Preview */}
                                <div className="h-36 bg-slate-200 rounded-xl relative overflow-hidden flex items-center justify-center">
                                    <div
                                        className="absolute inset-0 opacity-60 bg-cover bg-center"
                                        style={{ backgroundImage: 'url(https://maps.googleapis.com/maps/api/staticmap?center=24.7136,46.6753&zoom=14&size=600x300&maptype=roadmap&key=demo)' }}
                                    />
                                    <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center shadow-lg shadow-rose-500/30 z-10">
                                        <MapPin className="text-white w-5 h-5" />
                                    </div>
                                    <div className="absolute bottom-2 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-slate-600 shadow-sm">
                                        {city || 'حدد الموقع'}
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
