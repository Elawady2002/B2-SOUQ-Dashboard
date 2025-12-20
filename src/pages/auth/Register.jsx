import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Mail, Lock, Phone, User, Building, FileText,
    CreditCard, CheckCircle, ArrowRight, ArrowLeft,
    Upload, Eye, EyeOff, CalendarIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Field, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import LogoFull from '../../assets/image/logo3.svg';

const TESTIMONIALS = [
    {
        text: "منصة رائعة ساعدتني في إدارة متجري بشكل احترافي. الواجهة سهلة والأدوات قوية جداً!",
        author: "محمد أحمد",
        role: "تاجر إلكتروني",
        avatar: "https://i.pravatar.cc/150?img=11"
    },
    {
        text: "أفضل منصة تجارة إلكترونية استخدمتها. التقارير التفصيلية ساعدتني في تحسين مبيعاتي بنسبة 150%",
        author: "سارة خالد",
        role: "صاحبة متجر أزياء",
        avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
        text: "الدعم الفني ممتاز والمنصة سهلة الاستخدام حتى للمبتدئين. أنصح بها بشدة!",
        author: "أحمد عبدالله",
        role: "تاجر إلكترونيات",
        avatar: "https://i.pravatar.cc/150?img=12"
    },
    {
        text: "إدارة المخزون والطلبات أصبحت أسهل بكثير. وفرت علي الكثير من الوقت والجهد",
        author: "فاطمة محمود",
        role: "صاحبة متجر مستلزمات منزلية",
        avatar: "https://i.pravatar.cc/150?img=9"
    }
];

const STEPS = [
    { id: 1, title: 'إنشاء الحساب', icon: User },
    { id: 2, title: 'نوع التاجر', icon: Building },
    { id: 3, title: 'التحقق من الهوية', icon: FileText },
    { id: 4, title: 'بيانات المتجر', icon: Building },
    { id: 5, title: 'إعداد الدفع', icon: CreditCard },
    { id: 6, title: 'المراجعة النهائية', icon: CheckCircle },
];

export default function Register() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [phoneCountryCode, setPhoneCountryCode] = useState('+962');
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const [formData, setFormData] = useState({
        // Step 1
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        language: 'ar',
        country: 'JO',
        // Step 2
        sellerType: 'individual',
        // Step 3 - Individual
        fullName: '',
        nationalId: '',
        birthDate: '',
        address: '',
        // Step 3 - Company
        companyName: '',
        taxNumber: '',
        entityType: '',
        companyAddress: '',
        // Step 4
        storeName: '',
        storeDescription: '',
        category: '',
        // Step 5
        paymentMethod: 'bank',
        bankName: '',
        accountHolder: '',
        iban: '',
    });

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        if (currentStep < 6) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleSubmit = () => {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('sellerData', JSON.stringify(formData));
        navigate('/');
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        {/* Email */}
                        <Field>
                            <FieldLabel htmlFor="email">البريد الإلكتروني</FieldLabel>
                            <div className="relative">
                                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => updateFormData('email', e.target.value)}
                                    placeholder="example@email.com"
                                    className="pr-10 h-12"
                                    required
                                />
                            </div>
                        </Field>

                        {/* Phone */}
                        <Field>
                            <FieldLabel htmlFor="phone">رقم الهاتف</FieldLabel>
                            <div className="flex gap-2">
                                <Select value={phoneCountryCode} onValueChange={setPhoneCountryCode}>
                                    <SelectTrigger className="h-12 w-[100px] font-medium">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="font-medium">
                                        <SelectItem value="+962"><span className="flex items-center gap-2"><span className="text-lg">🇯🇴</span> +962</span></SelectItem>
                                        <SelectItem value="+966"><span className="flex items-center gap-2"><span className="text-lg">🇸🇦</span> +966</span></SelectItem>
                                        <SelectItem value="+971"><span className="flex items-center gap-2"><span className="text-lg">🇦🇪</span> +971</span></SelectItem>
                                        <SelectItem value="+20"><span className="flex items-center gap-2"><span className="text-lg">🇪🇬</span> +20</span></SelectItem>
                                        <SelectItem value="+965"><span className="flex items-center gap-2"><span className="text-lg">🇰🇼</span> +965</span></SelectItem>
                                        <SelectItem value="+968"><span className="flex items-center gap-2"><span className="text-lg">🇴🇲</span> +968</span></SelectItem>
                                        <SelectItem value="+974"><span className="flex items-center gap-2"><span className="text-lg">🇶🇦</span> +974</span></SelectItem>
                                        <SelectItem value="+973"><span className="flex items-center gap-2"><span className="text-lg">🇧🇭</span> +973</span></SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="relative flex-1">
                                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => updateFormData('phone', e.target.value)}
                                        placeholder="79 123 4567"
                                        className="pr-12 h-12 font-medium text-right"
                                        required
                                    />
                                </div>
                            </div>
                        </Field>

                        {/* Password */}
                        <Field>
                            <FieldLabel htmlFor="password">كلمة المرور</FieldLabel>
                            <div className="relative">
                                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => updateFormData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className="pr-10 pl-10 h-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </Field>

                        {/* Confirm Password */}
                        <Field>
                            <FieldLabel htmlFor="confirmPassword">تأكيد كلمة المرور</FieldLabel>
                            <div className="relative">
                                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                                    placeholder="••••••••"
                                    className="pr-10 pl-10 h-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                                    tabIndex={-1}
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </Field>

                        {/* Language & Country */}
                        <div className="grid grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel htmlFor="language">اللغة</FieldLabel>
                                <Select value={formData.language} onValueChange={(value) => updateFormData('language', value)}>
                                    <SelectTrigger id="language" className="h-12">
                                        <SelectValue placeholder="اختر اللغة" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ar">العربية</SelectItem>
                                        <SelectItem value="en">English</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="country">الدولة</FieldLabel>
                                <Select value={formData.country} onValueChange={(value) => updateFormData('country', value)}>
                                    <SelectTrigger id="country" className="h-12">
                                        <SelectValue placeholder="اختر الدولة" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="JO">الأردن</SelectItem>
                                        <SelectItem value="SA">السعودية</SelectItem>
                                        <SelectItem value="AE">الإمارات</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="grid grid-cols-2 gap-4">
                        {/* Individual */}
                        <div
                            onClick={() => updateFormData('sellerType', 'individual')}
                            className={`p-6 rounded-xl cursor-pointer text-center transition-all ${formData.sellerType === 'individual'
                                ? 'border-2 border-primary bg-primary-50'
                                : 'border-2 border-slate-200 bg-white hover:border-slate-300'
                                }`}
                        >
                            <User
                                size={40}
                                className={`mx-auto mb-3 ${formData.sellerType === 'individual' ? 'text-primary' : 'text-slate-500'
                                    }`}
                            />
                            <h4 className="text-base font-semibold mb-2 text-slate-700">تاجر فردي</h4>
                            <p className="text-xs text-slate-500">للأفراد والتجار المستقلين</p>
                        </div>

                        {/* Company */}
                        <div
                            onClick={() => updateFormData('sellerType', 'company')}
                            className={`p-6 rounded-xl cursor-pointer text-center transition-all ${formData.sellerType === 'company'
                                ? 'border-2 border-primary bg-primary-50'
                                : 'border-2 border-slate-200 bg-white hover:border-slate-300'
                                }`}
                        >
                            <Building
                                size={40}
                                className={`mx-auto mb-3 ${formData.sellerType === 'company' ? 'text-primary' : 'text-slate-500'
                                    }`}
                            />
                            <h4 className="text-base font-semibold mb-2 text-slate-700">شركة / مؤسسة</h4>
                            <p className="text-xs text-slate-500">للشركات والمؤسسات المسجلة</p>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        {formData.sellerType === 'individual' ? (
                            <>
                                <Field>
                                    <FieldLabel htmlFor="fullName">الاسم الكامل</FieldLabel>
                                    <div className="relative">
                                        <User className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <Input
                                            id="fullName"
                                            type="text"
                                            value={formData.fullName}
                                            onChange={(e) => updateFormData('fullName', e.target.value)}
                                            placeholder="الاسم الكامل"
                                            className="pr-10 h-12"
                                            required
                                        />
                                    </div>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="nationalId">الرقم القومي / جواز السفر</FieldLabel>
                                    <div className="relative">
                                        <FileText className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <Input
                                            id="nationalId"
                                            type="text"
                                            value={formData.nationalId}
                                            onChange={(e) => updateFormData('nationalId', e.target.value)}
                                            placeholder="123456789"
                                            className="pr-10 h-12"
                                            required
                                        />
                                    </div>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="birthDate">تاريخ الميلاد</FieldLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full h-12 justify-between text-right font-normal"
                                            >
                                                {formData.birthDate ? (
                                                    format(new Date(formData.birthDate), 'PPP', { locale: ar })
                                                ) : (
                                                    <span className="text-muted-foreground">اختر تاريخ الميلاد</span>
                                                )}
                                                <CalendarIcon className="h-4 w-4 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={formData.birthDate ? new Date(formData.birthDate) : undefined}
                                                onSelect={(date) => updateFormData('birthDate', date ? date.toISOString().split('T')[0] : '')}
                                                initialFocus
                                                locale={ar}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="address">عنوان السكن</FieldLabel>
                                    <Textarea
                                        id="address"
                                        rows={3}
                                        value={formData.address}
                                        onChange={(e) => updateFormData('address', e.target.value)}
                                        placeholder="العنوان الكامل"
                                        required
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="idUpload">إثبات الهوية</FieldLabel>
                                    <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center cursor-pointer hover:border-slate-300 transition-colors">
                                        <Upload size={32} className="mx-auto mb-2 text-slate-400" />
                                        <p className="text-sm text-slate-500">اضغط لرفع صورة الهوية</p>
                                    </div>
                                </Field>
                            </>
                        ) : (
                            <>
                                <Field>
                                    <FieldLabel htmlFor="companyName">اسم الشركة</FieldLabel>
                                    <div className="relative">
                                        <Building className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <Input
                                            id="companyName"
                                            type="text"
                                            value={formData.companyName}
                                            onChange={(e) => updateFormData('companyName', e.target.value)}
                                            placeholder="اسم الشركة"
                                            className="pr-10 h-12"
                                            required
                                        />
                                    </div>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="taxNumber">الرقم الضريبي / السجل التجاري</FieldLabel>
                                    <div className="relative">
                                        <FileText className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <Input
                                            id="taxNumber"
                                            type="text"
                                            value={formData.taxNumber}
                                            onChange={(e) => updateFormData('taxNumber', e.target.value)}
                                            placeholder="123456789"
                                            className="pr-10 h-12"
                                            required
                                        />
                                    </div>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="entityType">نوع الكيان</FieldLabel>
                                    <Select value={formData.entityType} onValueChange={(value) => updateFormData('entityType', value)}>
                                        <SelectTrigger id="entityType" className="h-12">
                                            <SelectValue placeholder="اختر نوع الكيان" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="llc">شركة ذات مسؤولية محدودة</SelectItem>
                                            <SelectItem value="corporation">شركة مساهمة</SelectItem>
                                            <SelectItem value="partnership">شراكة</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="companyAddress">عنوان المقر</FieldLabel>
                                    <Textarea
                                        id="companyAddress"
                                        rows={3}
                                        value={formData.companyAddress}
                                        onChange={(e) => updateFormData('companyAddress', e.target.value)}
                                        placeholder="العنوان الكامل للمقر"
                                        required
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="docsUpload">المستندات الرسمية</FieldLabel>
                                    <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center cursor-pointer hover:border-slate-300 transition-colors">
                                        <Upload size={32} className="mx-auto mb-2 text-slate-400" />
                                        <p className="text-sm text-slate-500">اضغط لرفع المستندات</p>
                                    </div>
                                </Field>
                            </>
                        )}
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-6">
                        <Field>
                            <FieldLabel htmlFor="storeName">اسم المتجر</FieldLabel>
                            <div className="relative">
                                <Building className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <Input
                                    id="storeName"
                                    type="text"
                                    value={formData.storeName}
                                    onChange={(e) => updateFormData('storeName', e.target.value)}
                                    placeholder="اسم متجرك"
                                    className="pr-10 h-12"
                                    required
                                />
                            </div>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="storeDescription">وصف قصير</FieldLabel>
                            <Textarea
                                id="storeDescription"
                                rows={3}
                                value={formData.storeDescription}
                                onChange={(e) => updateFormData('storeDescription', e.target.value)}
                                placeholder="وصف مختصر عن متجرك"
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="category">الفئة الرئيسية</FieldLabel>
                            <Select value={formData.category} onValueChange={(value) => updateFormData('category', value)}>
                                <SelectTrigger id="category" className="h-12">
                                    <SelectValue placeholder="اختر الفئة" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="electronics">إلكترونيات</SelectItem>
                                    <SelectItem value="fashion">أزياء</SelectItem>
                                    <SelectItem value="home">منزل ومطبخ</SelectItem>
                                    <SelectItem value="sports">رياضة</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="logoUpload">شعار المتجر</FieldLabel>
                            <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center cursor-pointer hover:border-slate-300 transition-colors">
                                <Upload size={32} className="mx-auto mb-2 text-slate-400" />
                                <p className="text-sm text-slate-500">اضغط لرفع الشعار</p>
                            </div>
                        </Field>
                    </div>
                );

            case 5:
                return (
                    <div className="space-y-6">
                        <Field>
                            <FieldLabel htmlFor="paymentMethod">وسيلة الدفع</FieldLabel>
                            <Select value={formData.paymentMethod} onValueChange={(value) => updateFormData('paymentMethod', value)}>
                                <SelectTrigger id="paymentMethod" className="h-12">
                                    <SelectValue placeholder="اختر وسيلة الدفع" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="bank">حساب بنكي</SelectItem>
                                    <SelectItem value="wallet">محفظة رقمية</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        {formData.paymentMethod === 'bank' && (
                            <>
                                <Field>
                                    <FieldLabel htmlFor="bankName">اسم البنك</FieldLabel>
                                    <div className="relative">
                                        <Building className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <Input
                                            id="bankName"
                                            type="text"
                                            value={formData.bankName}
                                            onChange={(e) => updateFormData('bankName', e.target.value)}
                                            placeholder="اسم البنك"
                                            className="pr-10 h-12"
                                            required
                                        />
                                    </div>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="accountHolder">اسم صاحب الحساب</FieldLabel>
                                    <div className="relative">
                                        <User className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <Input
                                            id="accountHolder"
                                            type="text"
                                            value={formData.accountHolder}
                                            onChange={(e) => updateFormData('accountHolder', e.target.value)}
                                            placeholder="الاسم كما يظهر في البنك"
                                            className="pr-10 h-12"
                                            required
                                        />
                                    </div>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="iban">رقم الـ IBAN</FieldLabel>
                                    <div className="relative">
                                        <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <Input
                                            id="iban"
                                            type="text"
                                            value={formData.iban}
                                            onChange={(e) => updateFormData('iban', e.target.value)}
                                            placeholder="JO00XXXX0000000000000000000000"
                                            className="pr-10 h-12"
                                            required
                                        />
                                    </div>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="bankUpload">إثبات الحساب</FieldLabel>
                                    <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center cursor-pointer hover:border-slate-300 transition-colors">
                                        <Upload size={32} className="mx-auto mb-2 text-slate-400" />
                                        <p className="text-sm text-slate-500">اضغط لرفع كشف حساب</p>
                                    </div>
                                </Field>
                            </>
                        )}
                    </div>
                );

            case 6:
                return (
                    <div className="space-y-6">
                        <Card className="bg-slate-50 rounded-xl p-6 border-slate-200">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-sm text-slate-500 mb-2">معلومات الحساب</h4>
                                    <p className="text-base font-semibold text-slate-700">{formData.email}</p>
                                    <p className="text-base font-semibold text-slate-700">{formData.phone}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm text-slate-500 mb-2">نوع التاجر</h4>
                                    <p className="text-base font-semibold text-slate-700">
                                        {formData.sellerType === 'individual' ? 'تاجر فردي' : 'شركة / مؤسسة'}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-sm text-slate-500 mb-2">اسم المتجر</h4>
                                    <p className="text-base font-semibold text-slate-700">{formData.storeName || 'غير محدد'}</p>
                                </div>
                            </div>
                        </Card>
                        <div className="bg-primary-50 border border-primary rounded-lg p-6 text-center">
                            <CheckCircle size={48} className="mx-auto mb-3 text-primary" />
                            <h4 className="text-base font-semibold mb-2 text-slate-800">
                                جاهز للمراجعة
                            </h4>
                            <p className="text-sm text-slate-600">
                                سيتم مراجعة طلبك خلال 24-48 ساعة وسنرسل لك إشعاراً عند الموافقة
                            </p>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex" dir="rtl">
            {/* Right Side - Blue Panel */}
            <div className="flex-[0_0_35%] bg-gradient-to-br from-primary to-primary-700 px-10 py-16 flex flex-col justify-center text-white relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute w-[350px] h-[350px] rounded-full bg-white/5 -top-20 -right-20" />
                <div className="absolute w-[250px] h-[250px] rounded-full bg-white/5 -bottom-16 -left-16" />

                <div className="relative z-10">
                    {/* Logo */}
                    <img
                        src={LogoFull}
                        alt="B2 SOUQ"
                        className="h-12 mb-10"
                    />

                    {/* Title */}
                    <h1 className="text-4xl font-bold mb-4 leading-tight text-white">
                        انضم إلى منصة<br />
                        B2-SOUQ
                    </h1>

                    <p className="text-base leading-relaxed mb-12 text-white/95">
                        ابدأ رحلتك في التجارة الإلكترونية اليوم.<br />
                        سجل الآن واحصل على لوحة تحكم احترافية.
                    </p>

                    {/* Testimonials Carousel */}
                    <Card className="bg-white/95 rounded-xl p-6 border-none min-h-[180px] shadow-lg">
                        <div className="transition-opacity duration-500">
                            <p className="text-base leading-relaxed mb-4 text-slate-600 min-h-[60px]">
                                "{TESTIMONIALS[currentTestimonial].text}"
                            </p>
                            <div className="flex items-center gap-3">
                                <img
                                    src={TESTIMONIALS[currentTestimonial].avatar}
                                    alt={TESTIMONIALS[currentTestimonial].author}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <div className="font-semibold text-sm text-slate-700">
                                        {TESTIMONIALS[currentTestimonial].author}
                                    </div>
                                    <div className="text-xs text-slate-500">
                                        {TESTIMONIALS[currentTestimonial].role}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 flex gap-1">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <span key={i} className="text-amber-400 text-base">★</span>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Progress Indicators */}
                    <div className="flex gap-2 mt-5 justify-center">
                        {TESTIMONIALS.map((_, index) => (
                            <div
                                key={index}
                                className={`h-1 flex-1 max-w-[60px] rounded-sm transition-all duration-300 cursor-pointer ${currentTestimonial === index ? 'bg-white' : 'bg-white/30'
                                    }`}
                                onClick={() => setCurrentTestimonial(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Left Side - Form */}
            <div className="flex-1 bg-slate-50 flex items-center justify-center p-10 overflow-y-auto">
                <div className="w-full max-w-[600px]">
                    {/* Horizontal Steps Progress */}
                    <div className="flex justify-between mb-10 gap-2 relative">
                        {/* Background line */}
                        <div className="absolute top-4 left-[8.33%] right-[8.33%] h-0.5 bg-slate-200 z-0" />

                        {/* Active progress line */}
                        <div
                            className="absolute top-4 right-[8.33%] h-0.5 bg-primary z-0 transition-all duration-300"
                            style={{ width: `calc((100% - 16.66%) * ${(currentStep - 1) / (STEPS.length - 1)})` }}
                        />

                        {STEPS.map((step) => (
                            <div key={step.id} className="flex-1 flex flex-col items-center relative">
                                {/* Step Circle */}
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-2 relative z-10 transition-all ${currentStep >= step.id
                                    ? 'bg-primary text-white'
                                    : 'bg-slate-200 text-slate-400'
                                    }`}>
                                    {currentStep > step.id ? '✓' : step.id}
                                </div>

                                {/* Step Title */}
                                <span className={`text-xs text-center transition-all ${currentStep >= step.id
                                    ? 'text-slate-800 font-semibold'
                                    : 'text-slate-500 font-medium'
                                    }`}>
                                    {step.title}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Form Card */}
                    <Card className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm mb-6">
                        {renderStepContent()}
                    </Card>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4 justify-between">
                        {currentStep > 1 && (
                            <Button
                                onClick={prevStep}
                                variant="outline"
                                size="lg"
                                className="gap-2"
                            >
                                <ArrowRight size={20} />
                                السابق
                            </Button>
                        )}
                        <div className="flex-1" />
                        {currentStep < 6 ? (
                            <Button
                                onClick={nextStep}
                                size="lg"
                                className="gap-2"
                            >
                                التالي
                                <ArrowLeft size={20} />
                            </Button>
                        ) : (
                            <Button
                                onClick={handleSubmit}
                                size="lg"
                                className="gap-2"
                            >
                                إتمام التسجيل
                                <CheckCircle size={20} />
                            </Button>
                        )}
                    </div>

                    {/* Back to Login */}
                    <div className="text-center mt-6">
                        <p className="text-sm text-slate-600">
                            لديك حساب بالفعل؟{' '}
                            <button
                                onClick={() => navigate('/login')}
                                className="text-primary font-semibold hover:underline transition-all"
                            >
                                تسجيل الدخول
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
