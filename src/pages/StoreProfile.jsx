import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
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
    Building2,
    Edit2
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
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet";

export default function StoreProfile() {
    const { t } = useLanguage();
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

    // Policy Sheet State
    const [isPolicySheetOpen, setIsPolicySheetOpen] = useState(false);
    const [currentPolicy, setCurrentPolicy] = useState(null);
    const [tempPolicyContent, setTempPolicyContent] = useState('');

    const policies = [
        {
            id: 'shipping',
            label: t('storeProfile.shipping'),
            icon: Truck,
            color: 'blue',
            value: shippingPolicy,
            setValue: setShippingPolicy,
            placeholder: t('storeProfile.shippingPlaceholder')
        },
        {
            id: 'return',
            label: t('storeProfile.return'),
            icon: RotateCcw,
            color: 'rose',
            value: returnPolicy,
            setValue: setReturnPolicy,
            placeholder: t('storeProfile.returnPlaceholder')
        },
        {
            id: 'warranty',
            label: t('storeProfile.warranty'),
            icon: ShieldCheck,
            color: 'emerald',
            value: warrantyPolicy,
            setValue: setWarrantyPolicy,
            placeholder: t('storeProfile.warrantyPlaceholder')
        },
        {
            id: 'replacement',
            label: t('storeProfile.replacement'),
            icon: Package,
            color: 'amber',
            value: replacementPolicy,
            setValue: setReplacementPolicy,
            placeholder: t('storeProfile.replacementPlaceholder')
        },
        {
            id: 'packaging',
            label: t('storeProfile.packaging'),
            icon: Package,
            color: 'purple',
            value: packagingPolicy,
            setValue: setPackagingPolicy,
            placeholder: t('storeProfile.packagingPlaceholder')
        }
    ];

    const handleOpenPolicy = (policy) => {
        setCurrentPolicy(policy);
        setTempPolicyContent(policy.value);
        setIsPolicySheetOpen(true);
    };

    const handleSavePolicy = () => {
        if (currentPolicy) {
            currentPolicy.setValue(tempPolicyContent);
            setIsPolicySheetOpen(false);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">{t('storeProfile.title')}</h2>
                    <p className="text-sm text-slate-500 mt-1">{t('storeProfile.subtitle')}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50">
                        {t('storeProfile.previewPage')}
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-200">
                        {t('common.saveChanges')}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">

                {/* Main Content */}
                <div className="flex flex-col gap-6">

                    {/* Banner & Logo Section */}
                    <Card className="border-slate-100 shadow-sm bg-white overflow-hidden">
                        <CardHeader className="pb-4 border-b border-slate-50">
                            <CardTitle className="text-lg font-bold text-slate-800">{t('storeProfile.logoCover')}</CardTitle>
                            <CardDescription className="text-slate-500">{t('storeProfile.logoCoverDesc')}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex gap-8 items-start">
                                {/* Banner Upload - Main area */}
                                <div className="flex-1 order-2">
                                    <Label className="text-slate-700 font-medium mb-3 block">{t('storeProfile.coverImage')}</Label>
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
                                            {t('storeProfile.changeCover')}
                                        </Button>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-2 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                        {t('storeProfile.recommendedSize')} 1400 × 400 {t('storeProfile.pixels')}
                                    </p>
                                </div>

                                {/* Logo Upload - Smaller on right */}
                                <div className="flex flex-col items-center gap-3 order-1">
                                    <Label className="text-slate-700 font-medium">{t('storeProfile.logo')}</Label>
                                    <div className="w-28 h-28 rounded-2xl border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-slate-50 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 hover:border-blue-400 transition-all group shadow-sm">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                            <Camera className="w-6 h-6 text-blue-500" />
                                        </div>
                                        <span className="text-xs font-medium text-blue-600">{t('storeProfile.uploadLogo')}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 text-center">200 × 200 {t('storeProfile.pixels')}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Basic Identity & Data */}
                    <Card className="border-slate-100 shadow-sm bg-white">
                        <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-bold text-slate-800">{t('storeProfile.identityBasicData')}</CardTitle>
                                <CardDescription className="text-slate-500">{t('storeProfile.identityDesc')}</CardDescription>
                            </div>
                            <div className="flex gap-2">
                                {isVerified && (
                                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 gap-1.5 hover:bg-blue-100 px-3 py-1">
                                        <BadgeCheck className="w-4 h-4" />
                                        {t('storeProfile.verifiedStore')}
                                    </Badge>
                                )}
                                {isOfficialStore && (
                                    <Badge variant="secondary" className="bg-amber-50 text-amber-700 gap-1.5 hover:bg-amber-100 px-3 py-1">
                                        <Store className="w-4 h-4" />
                                        {t('storeProfile.officialStore')}
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                {/* Store Names */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-slate-700">{t('storeProfile.inArabic')}</Label>
                                        <Input
                                            value={storeName}
                                            onChange={(e) => setStoreName(e.target.value)}
                                            className="bg-white h-11 border-slate-200 focus-visible:ring-blue-500 rounded-lg"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-slate-700">{t('storeProfile.inEnglish')}</Label>
                                        <Input
                                            value={storeNameEn}
                                            onChange={(e) => setStoreNameEn(e.target.value)}
                                            className="bg-white h-11 text-left border-slate-200 focus-visible:ring-blue-500 rounded-lg"
                                            dir="ltr"
                                        />
                                    </div>
                                </div>

                                {/* Store Link */}
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-slate-700">{t('storeProfile.storeLink')}</Label>
                                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                                        <div className="relative flex-1 w-full">
                                            <Globe className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
                                            <Input
                                                value={website}
                                                onChange={(e) => setWebsite(e.target.value)}
                                                className="bg-white h-11 pr-10 text-left border-slate-200 focus-visible:ring-blue-500 rounded-lg font-mono text-slate-600"
                                                dir="ltr"
                                            />
                                        </div>
                                        <div className="bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-600 font-mono" dir="ltr">
                                            {storeNameEn.toLowerCase().replace(/\s+/g, '')}.{website}
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-slate-700">{t('storeProfile.storeDescription')}</Label>
                                    <Textarea
                                        value={storeDescription}
                                        onChange={(e) => setStoreDescription(e.target.value)}
                                        className="bg-white min-h-[120px] border-slate-200 focus-visible:ring-blue-500 rounded-lg resize-y p-3 leading-relaxed"
                                        placeholder={t('storeProfile.descriptionPlaceholder')}
                                    />
                                    <p className="text-xs text-slate-400 text-right">{t('storeProfile.descriptionNote')}</p>
                                </div>
                            </div>

                            <Separator className="my-8" />

                            {/* Categories & Brand */}
                            {/* Categories & Brand */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                                <div className="space-y-2 md:col-span-3">
                                    <Label className="text-slate-600">{t('storeProfile.mainCategory')}</Label>
                                    <Select value={mainCategory} onValueChange={setMainCategory}>
                                        <SelectTrigger className="bg-white h-10 border-slate-200">
                                            <SelectValue placeholder={t('storeProfile.selectCategory')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="fashion">{t('storeProfile.fashionCategory')}</SelectItem>
                                            <SelectItem value="electronics">{t('storeProfile.electronicsCategory')}</SelectItem>
                                            <SelectItem value="home">{t('storeProfile.homeCategory')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2 md:col-span-3">
                                    <Label className="text-slate-600">{t('storeProfile.brandName')}</Label>
                                    <Input
                                        value={brandName}
                                        onChange={(e) => setBrandName(e.target.value)}
                                        placeholder={t('storeProfile.brandPlaceholder')}
                                        className="bg-white h-10 border-slate-200"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-6">
                                    <Label className="text-slate-600">{t('storeProfile.subCategories')}</Label>
                                    <Input
                                        value={subCategories}
                                        onChange={(e) => setSubCategories(e.target.value)}
                                        className="bg-white h-10 border-slate-200"
                                    />
                                    <p className="text-xs text-slate-400">{t('storeProfile.separateByComma')}</p>
                                </div>
                            </div>

                            {/* Read-only Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                <div className="flex items-center gap-3 px-3 border border-slate-200 rounded-md h-10 bg-white">
                                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                    <div className="flex items-center gap-2">
                                        <p className="text-xs text-slate-500">{t('storeProfile.avgRating')}:</p>
                                        <p className="text-sm font-bold text-slate-700">4.8 / 5.0</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 px-3 border border-slate-200 rounded-md h-10 bg-white">
                                    <CalendarIcon className="w-4 h-4 text-blue-500" />
                                    <div className="flex items-center gap-2">
                                        <p className="text-xs text-slate-500">{t('sellerProfile.registrationDate')}:</p>
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
                                    <CardTitle className="text-lg font-bold text-slate-800">{t('storeProfile.policies')}</CardTitle>
                                    <CardDescription className="text-slate-500">{t('storeProfile.policiesDesc')}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {policies.map((policy) => {
                                    const Icon = policy.icon;
                                    const hasContent = policy.value && policy.value.length > 0;

                                    // Dynamic color classes based on the policy color
                                    const bgClass = {
                                        blue: 'from-blue-50 to-slate-50 border-blue-100/50 hover:border-blue-200',
                                        rose: 'from-rose-50 to-slate-50 border-rose-100/50 hover:border-rose-200',
                                        emerald: 'from-emerald-50 to-slate-50 border-emerald-100/50 hover:border-emerald-200',
                                        amber: 'from-amber-50 to-slate-50 border-amber-100/50 hover:border-amber-200',
                                        purple: 'from-purple-50 to-slate-50 border-purple-100/50 hover:border-purple-200',
                                    }[policy.color] || 'from-slate-50 to-white';

                                    const textClass = {
                                        blue: 'text-blue-600',
                                        rose: 'text-rose-600',
                                        emerald: 'text-emerald-600',
                                        amber: 'text-amber-600',
                                        purple: 'text-purple-600',
                                    }[policy.color] || 'text-slate-600';

                                    return (
                                        <div
                                            key={policy.id}
                                            onClick={() => handleOpenPolicy(policy)}
                                            className={`bg-gradient-to-br ${bgClass} rounded-xl p-5 border transition-all cursor-pointer group hover:shadow-md relative overflow-hidden`}
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/60 backdrop-blur-sm shadow-sm`}>
                                                        <Icon className={`w-4 h-4 ${textClass}`} />
                                                    </div>
                                                    <Label className="text-base font-bold text-slate-800 cursor-pointer">{policy.label}</Label>
                                                </div>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white text-slate-400 hover:${textClass} shadow-sm`}>
                                                    <Edit2 size={14} />
                                                </div>
                                            </div>

                                            <div className="min-h-[80px]">
                                                {hasContent ? (
                                                    <p className="line-clamp-3 text-sm text-slate-600 leading-relaxed">
                                                        {policy.value}
                                                    </p>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center h-20 border-2 border-dashed border-slate-200 rounded-lg bg-white/40">
                                                        <p className="text-xs text-slate-400 font-medium">{t('common.clickToEdit') || 'اضغط لإضافة سياسة'}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Operation Settings */}
                    <Card className="border-slate-100 shadow-sm bg-white">
                        <CardHeader className="pb-4 border-b border-slate-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center border border-cyan-100">
                                    <Clock className="w-5 h-5 text-cyan-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg font-bold text-slate-800">{t('storeProfile.operationSettings')}</CardTitle>
                                    <CardDescription className="text-slate-500">{t('storeProfile.operationDesc')}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Working Hours */}
                                <div className="space-y-3">
                                    <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-cyan-500" />
                                        {t('storeProfile.workingHours')}
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            value={workingHours}
                                            onChange={(e) => setWorkingHours(e.target.value)}
                                            className="bg-white h-11 pl-10 border-slate-200 focus-visible:ring-cyan-500"
                                            placeholder="ex: 09:00 AM - 05:00 PM"
                                        />
                                        <Clock className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                                    </div>
                                    <p className="text-[10px] text-slate-400">ساعات العمل الرسمية التي يظهر فيها المتجر "مفتوح"</p>
                                </div>

                                {/* Pickup Times */}
                                <div className="space-y-3">
                                    <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                        <Truck className="w-4 h-4 text-orange-500" />
                                        {t('storeProfile.pickupTimes')}
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            value={pickupTimes}
                                            onChange={(e) => setPickupTimes(e.target.value)}
                                            className="bg-white h-11 pl-10 border-slate-200 focus-visible:ring-orange-500"
                                        />
                                        <Clock className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                                    </div>
                                    <p className="text-[10px] text-slate-400">الأوقات المتاحة لاستلام الشحنات من قبل شركات الشحن</p>
                                </div>

                                {/* Support Hours */}
                                <div className="space-y-3">
                                    <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                        <Headphones className="w-4 h-4 text-green-500" />
                                        {t('storeProfile.customerSupport')}
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            value={supportHours}
                                            onChange={(e) => setSupportHours(e.target.value)}
                                            className="bg-white h-11 pl-10 border-slate-200 focus-visible:ring-green-500"
                                        />
                                        <Clock className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                                    </div>
                                    <p className="text-[10px] text-slate-400">أوقات توفر فريق دعم العملاء للرد على الاستفسارات</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information & Location */}
                    <Card className="border-slate-100 shadow-sm bg-white">
                        <CardHeader className="pb-4 border-b border-slate-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center border border-rose-100">
                                    <MapPin className="w-5 h-5 text-rose-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg font-bold text-slate-800">{t('storeProfile.contactLocation')}</CardTitle>
                                    <CardDescription className="text-slate-500">{t('storeProfile.contactLocationDesc')}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-8">
                            {/* Contact Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Phone 1 */}
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold text-slate-700">{t('storeProfile.phoneNumber')}</Label>
                                    <div className="relative">
                                        <Input
                                            value={phone1}
                                            onChange={(e) => setPhone1(e.target.value)}
                                            className="bg-white h-11 pl-10 text-left border-slate-200 focus-visible:ring-blue-500 font-mono"
                                            dir="ltr"
                                        />
                                        <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                                    </div>
                                </div>

                                {/* Phone 2 */}
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold text-slate-700">هاتف بديل</Label>
                                    <div className="relative">
                                        <Input
                                            value={phone2}
                                            onChange={(e) => setPhone2(e.target.value)}
                                            className="bg-white h-11 pl-10 text-left border-slate-200 focus-visible:ring-blue-500 font-mono"
                                            dir="ltr"
                                        />
                                        <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold text-slate-700">البريد الإلكتروني</Label>
                                    <div className="relative">
                                        <Input
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="bg-white h-11 pl-10 text-left border-slate-200 focus-visible:ring-blue-500 font-mono"
                                            dir="ltr"
                                        />
                                        <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                                    </div>
                                </div>
                            </div>

                            <Separator className="bg-slate-100" />

                            {/* Warehouse Address & Map */}
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2">
                                        <Building2 className="w-5 h-5 text-slate-600" />
                                        <h4 className="text-base font-bold text-slate-800">عنوان المستودع الرئيسي</h4>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-slate-700">المدينة</Label>
                                            <Select value={city} onValueChange={setCity}>
                                                <SelectTrigger className="h-11 bg-white border-slate-200">
                                                    <SelectValue placeholder="اختر المدينة" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Riyadh">الرياض</SelectItem>
                                                    <SelectItem value="Jeddah">جدة</SelectItem>
                                                    <SelectItem value="Dammam">الدمام</SelectItem>
                                                    <SelectItem value="Aswan">أسوان</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-slate-700">العنوان التفصيلي</Label>
                                            <Textarea
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                className="bg-white min-h-[100px] border-slate-200 resize-none leading-relaxed p-3"
                                                placeholder="اسم الشارع، رقم المبنى، الرمز البريدي..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Map Preview */}
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-slate-700 block text-right">الموقع على الخريطة</Label>
                                    <div className="h-64 bg-slate-100 rounded-2xl relative overflow-hidden group border-2 border-slate-200 hover:border-blue-400 transition-colors cursor-pointer">
                                        <div
                                            className="absolute inset-0 opacity-80 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                            style={{ backgroundImage: 'url(https://maps.googleapis.com/maps/api/staticmap?center=24.7136,46.6753&zoom=14&size=800x600&maptype=roadmap&key=demo)' }}
                                        />
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-10 opacity-0 group-hover:opacity-20 transition-opacity" />

                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center shadow-xl shadow-rose-500/30 z-10 animate-pulse">
                                            <MapPin className="text-white w-6 h-6" />
                                        </div>

                                        <div className="absolute bottom-4 left-4 right-4 animate-in slide-in-from-bottom-2 duration-300">
                                            <Button className="w-full bg-white/95 text-slate-800 hover:bg-white backdrop-blur shadow-sm">
                                                <MapPin className="mr-2 w-4 h-4 text-blue-600" />
                                                تحديد الموقع بدقة
                                            </Button>
                                        </div>
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

            {/* Policy Edit Sheet */}
            <Sheet open={isPolicySheetOpen} onOpenChange={setIsPolicySheetOpen}>
                <SheetContent side="left" className="sm:max-w-xl p-0 gap-0 flex flex-col h-full">
                    <SheetHeader className="px-6 pb-6 pt-14 border-b border-slate-100 flex-none relative">
                        <SheetTitle className="flex items-center gap-2.5 text-xl font-bold text-slate-900">
                            {currentPolicy && React.createElement(currentPolicy.icon, {
                                className: `w-5 h-5 ${currentPolicy.color === 'blue' ? 'text-blue-600' :
                                    currentPolicy.color === 'rose' ? 'text-rose-600' :
                                        currentPolicy.color === 'emerald' ? 'text-emerald-600' :
                                            currentPolicy.color === 'amber' ? 'text-amber-600' :
                                                'text-purple-600'
                                    }`
                            })}
                            {currentPolicy?.label}
                        </SheetTitle>
                        <SheetDescription className="text-slate-500">
                            {t('storeProfile.policyEditDesc')}
                        </SheetDescription>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="flex flex-col h-full gap-4">
                            <div className="space-y-3 flex-1 flex flex-col">
                                <Label htmlFor="policy-content" className="text-sm font-medium text-slate-700">
                                    {t('common.details', 'التفاصيل')}
                                </Label>
                                <Textarea
                                    id="policy-content"
                                    value={tempPolicyContent}
                                    onChange={(e) => setTempPolicyContent(e.target.value)}
                                    placeholder={currentPolicy?.placeholder}
                                    className="flex-1 min-h-[450px] resize-none text-base leading-relaxed p-5 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl shadow-sm"
                                />
                                <p className="text-xs text-slate-400 px-1">
                                    {t('storeProfile.markdownSupported', 'يمكنك استخدام تنسيق Markdown البسيط')}
                                </p>
                            </div>
                        </div>
                    </div>

                    <SheetFooter className="p-6 border-t border-slate-100 bg-slate-50/50 flex-none">
                        <div className="flex items-center gap-3 w-full">
                            <Button
                                variant="outline"
                                className="flex-1 border-slate-200 hover:bg-white hover:text-slate-700 h-11"
                                onClick={() => setIsPolicySheetOpen(false)}
                            >
                                {t('common.cancel')}
                            </Button>
                            <Button
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 h-11"
                                onClick={handleSavePolicy}
                            >
                                {t('common.save')}
                            </Button>
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div >
    );
}
