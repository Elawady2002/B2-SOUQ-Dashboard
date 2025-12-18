import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Phone, User, Building2, CreditCard, Store, FileText, CheckCircle, ChevronRight, ChevronLeft, Upload, MapPin } from 'lucide-react';

export default function Register() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Account Basics
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',

        // Step 2: Seller Type
        sellerType: 'individual', // individual | company

        // Step 3: Identity/KYC
        fullName: '',
        nationalId: '',
        companyName: '',
        commercialReg: '',
        taxNumber: '',

        // Step 4: Store Info
        storeName: '',
        storeCategory: '',
        storeDescription: '',

        // Step 5: Bank Info
        bankName: '',
        accountHolder: '',
        iban: '',

        // Step 6: Agreements
        agreedToTerms: false
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const nextStep = () => {
        const currentErrors = validateStep(step);
        if (Object.keys(currentErrors).length > 0) {
            setErrors(currentErrors);
            return;
        }
        setStep(prev => Math.min(prev + 1, 6));
        window.scrollTo(0, 0);
    };

    const prevStep = () => {
        setStep(prev => Math.max(prev - 1, 1));
        window.scrollTo(0, 0);
    };

    const validateStep = (currentStep) => {
        const newErrors = {};
        if (currentStep === 1) {
            if (!formData.email) newErrors.email = 'البريد الإلكتروني مطلوب';
            if (!formData.phone) newErrors.phone = 'رقم الهاتف مطلوب';
            if (!formData.password) newErrors.password = 'كلمة المرور مطلوبة';
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'كلمات المرور غير متطابقة';
            }
        }
        if (currentStep === 2) {
            // No validation needed for radio selection with default
        }
        if (currentStep === 3) {
            if (formData.sellerType === 'individual') {
                if (!formData.fullName) newErrors.fullName = 'الاسم الرباعي مطلوب';
                if (!formData.nationalId) newErrors.nationalId = 'رقم البطاقة الشخصية مطلوب';
            } else {
                if (!formData.companyName) newErrors.companyName = 'اسم الشركة مطلوب';
                if (!formData.commercialReg) newErrors.commercialReg = 'رقم السجل التجاري مطلوب';
            }
        }
        if (currentStep === 4) {
            if (!formData.storeName) newErrors.storeName = 'اسم المتجر مطلوب';
            if (!formData.storeCategory) newErrors.storeCategory = 'تصنيف المتجر مطلوب';
        }
        if (currentStep === 5) {
            if (!formData.bankName) newErrors.bankName = 'اسم البنك مطلوب';
            if (!formData.accountHolder) newErrors.accountHolder = 'اسم صاحب الحساب مطلوب';
            if (!formData.iban) newErrors.iban = 'رقم الـ IBAN مطلوب';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.agreedToTerms) {
            alert("يجب الموافقة على الشروط والأحكام");
            return;
        }
        console.log('Registration submitted:', formData);
        alert("تم إرسال طلب الانضمام بنجاح! سيتم مراجعة طلبك خلال 24 ساعة.");
        navigate('/');
    };

    // Render Progress Stepper
    const renderStepper = () => {
        const steps = [
            { id: 1, label: 'الحساب', icon: Mail },
            { id: 2, label: 'النوع', icon: User },
            { id: 3, label: 'الهوية', icon: FileText },
            { id: 4, label: 'المتجر', icon: Store },
            { id: 5, label: 'البنك', icon: CreditCard },
            { id: 6, label: 'المراجعة', icon: CheckCircle },
        ];

        return (
            <div className="mb-10 overflow-x-auto pb-4">
                <div className="flex items-center justify-between min-w-[500px] px-2">
                    {steps.map((s, idx) => (
                        <div key={s.id} className="flex items-center flex-1 last:flex-none">
                            <div className="flex flex-col items-center relative">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${step >= s.id
                                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200'
                                            : 'bg-white border-gray-200 text-gray-400'
                                        }`}
                                >
                                    <s.icon size={18} />
                                </div>
                                <span
                                    className={`text-[10px] sm:text-xs mt-2 font-medium whitespace-nowrap ${step >= s.id ? 'text-indigo-600' : 'text-gray-400'
                                        }`}
                                >
                                    {s.label}
                                </span>
                            </div>
                            {idx < steps.length - 1 && (
                                <div className="flex-1 mx-2 h-[2px] mb-6">
                                    <div
                                        className="h-full transition-all duration-500 rounded-full"
                                        style={{
                                            background: step > s.id ? 'var(--primary)' : 'var(--border-color)',
                                            width: step > s.id ? '100%' : '0%'
                                        }}
                                    ></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Step 1: Account Setup
    const renderStep1 = () => (
        <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
            <div>
                <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>إنشاء حساب تاجر</h3>
                <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>أدخل بيانات الدخول الأساسية</p>
            </div>

            <div className="form-group">
                <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
                <div className="relative">
                    <Mail className="absolute right-3 top-2.5 text-gray-400" size={18} />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pr-10 pl-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                        style={{ background: 'var(--bg-main)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                        placeholder="example@mail.com"
                    />
                </div>
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div className="form-group">
                <label className="block text-sm font-medium mb-1">رقم الهاتف</label>
                <div className="relative">
                    <Phone className="absolute right-3 top-2.5 text-gray-400" size={18} />
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full pr-10 pl-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${errors.phone ? 'border-red-500' : 'border-gray-200'}`}
                        style={{ background: 'var(--bg-main)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                        placeholder="01xxxxxxxxx"
                        dir="ltr"
                    />
                </div>
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                    <label className="block text-sm font-medium mb-1">كلمة المرور</label>
                    <div className="relative">
                        <Lock className="absolute right-3 top-2.5 text-gray-400" size={18} />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full pr-10 pl-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${errors.password ? 'border-red-500' : 'border-gray-200'}`}
                            style={{ background: 'var(--bg-main)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                        />
                    </div>
                    {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                </div>
                <div className="form-group">
                    <label className="block text-sm font-medium mb-1">تأكيد كلمة المرور</label>
                    <div className="relative">
                        <Lock className="absolute right-3 top-2.5 text-gray-400" size={18} />
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`w-full pr-10 pl-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'}`}
                            style={{ background: 'var(--bg-main)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                        />
                    </div>
                </div>
            </div>

            <button
                onClick={nextStep}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 transition-colors mt-6"
            >
                المتابعة <ChevronLeft size={18} />
            </button>
            <div className="text-center mt-4">
                <Link to="/login" className="text-sm text-indigo-600 hover:underline">لديك حساب بالفعل؟ تسجيل الدخول</Link>
            </div>
        </div>
    );

    // Step 2: Seller Type Selection
    const renderStep2 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
            <div>
                <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>نوع التاجر</h3>
                <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>اختر الطريقة التي تود البيع بها</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <label
                    className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.sellerType === 'individual' ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-100' : 'border-gray-200 hover:border-indigo-200'
                        }`}
                    style={{ background: 'var(--bg-card)', borderColor: formData.sellerType === 'individual' ? 'var(--primary)' : 'var(--border-color)' }}
                >
                    <input
                        type="radio"
                        name="sellerType"
                        value="individual"
                        checked={formData.sellerType === 'individual'}
                        onChange={handleChange}
                        className="sr-only"
                    />
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${formData.sellerType === 'individual' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                        <User size={24} />
                    </div>
                    <div className="mr-4">
                        <h4 className="font-bold text-gray-900" style={{ color: 'var(--text-primary)' }}>تاجر فردي</h4>
                        <p className="text-xs text-gray-500" style={{ color: 'var(--text-secondary)' }}>للأفراد الذين لا يملكون سجل تجاري حالياً</p>
                    </div>
                    {formData.sellerType === 'individual' && <CheckCircle className="mr-auto text-indigo-600" size={20} />}
                </label>

                <label
                    className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.sellerType === 'company' ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-100' : 'border-gray-200 hover:border-indigo-200'
                        }`}
                    style={{ background: 'var(--bg-card)', borderColor: formData.sellerType === 'company' ? 'var(--primary)' : 'var(--border-color)' }}
                >
                    <input
                        type="radio"
                        name="sellerType"
                        value="company"
                        checked={formData.sellerType === 'company'}
                        onChange={handleChange}
                        className="sr-only"
                    />
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${formData.sellerType === 'company' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                        <Building2 size={24} />
                    </div>
                    <div className="mr-4">
                        <h4 className="font-bold text-gray-900" style={{ color: 'var(--text-primary)' }}>شركة / مؤسسة</h4>
                        <p className="text-xs text-gray-500" style={{ color: 'var(--text-secondary)' }}>للشركات والمؤسسات ذات السجل التجاري</p>
                    </div>
                    {formData.sellerType === 'company' && <CheckCircle className="mr-auto text-indigo-600" size={20} />}
                </label>
            </div>

            <div className="flex gap-4 pt-4">
                <button
                    onClick={prevStep}
                    className="flex-1 py-3 px-4 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    style={{ background: 'var(--bg-main)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                >
                    <ChevronRight size={18} /> السابق
                </button>
                <button
                    onClick={nextStep}
                    className="flex-[2] py-3 px-4 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                    المتابعة <ChevronLeft size={18} />
                </button>
            </div>
        </div>
    );

    // Step 3: Identity / KYC
    const renderStep3 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
            <div>
                <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>بيانات الهوية</h3>
                <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>تأكيد هويتك ضروري لضمان أمان المنصة</p>
            </div>

            {formData.sellerType === 'individual' ? (
                <>
                    <div className="form-group">
                        <label className="block text-sm font-medium mb-1">الاسم الرباعي (كما في الهوية)</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${errors.fullName ? 'border-red-500' : 'border-gray-200'}`}
                            style={{ background: 'var(--bg-main)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                        />
                        {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium mb-1">رقم البطاقة الشخصية</label>
                        <input
                            type="text"
                            name="nationalId"
                            value={formData.nationalId}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${errors.nationalId ? 'border-red-500' : 'border-gray-200'}`}
                            style={{ background: 'var(--bg-main)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                        />
                        {errors.nationalId && <p className="text-xs text-red-500 mt-1">{errors.nationalId}</p>}
                    </div>
                </>
            ) : (
                <>
                    <div className="form-group">
                        <label className="block text-sm font-medium mb-1">اسم المنشأة / الشركة</label>
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${errors.companyName ? 'border-red-500' : 'border-gray-200'}`}
                            style={{ background: 'var(--bg-main)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                        />
                        {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group">
                            <label className="block text-sm font-medium mb-1">رقم السجل التجاري</label>
                            <input
                                type="text"
                                name="commercialReg"
                                value={formData.commercialReg}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${errors.commercialReg ? 'border-red-500' : 'border-gray-200'}`}
                                style={{ background: 'var(--bg-main)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                            />
                            {errors.commercialReg && <p className="text-xs text-red-500 mt-1">{errors.commercialReg}</p>}
                        </div>
                        <div className="form-group">
                            <label className="block text-sm font-medium mb-1">الرقم الضريبي (اختياري)</label>
                            <input
                                type="text"
                                name="taxNumber"
                                value={formData.taxNumber}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary"
                                style={{ background: 'var(--bg-main)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                            />
                        </div>
                    </div>
                </>
            )}

            <div className="form-group">
                <label className="block text-sm font-medium mb-2">المستندات المطلوبة (ID / سجل تجاري)</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer" style={{ borderColor: 'var(--border-color)' }}>
                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-sm font-medium text-gray-700" style={{ color: 'var(--text-primary)' }}>اسحب الملفات هنا أو انقر للتحميل</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, PNG, JPG (Max. 5MB)</p>
                </div>
            </div>

            <div className="flex gap-4 pt-4">
                <button
                    onClick={prevStep}
                    className="flex-1 py-3 px-4 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    style={{ background: 'var(--bg-main)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                >
                    <ChevronRight size={18} /> السابق
                </button>
                <button
                    onClick={nextStep}
                    className="flex-[2] py-3 px-4 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                    المتابعة <ChevronLeft size={18} />
                </button>
            </div>
        </div>
    );

    // Step 4: Store Profile
    const renderStep4 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
            <div>
                <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>هوية المتجر</h3>
                <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>أخبرنا المزيد عن متجرك المستقبلي</p>
            </div>

            <div className="form-group">
                <label className="block text-sm font-medium mb-1">اسم المتجر (بالعربية)</label>
                <input
                    type="text"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${errors.storeName ? 'border-red-500' : 'border-gray-200'}`}
                    style={{ background: 'var(--bg-main)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                    placeholder="مثال: متجر الأدوات الحديثة"
                />
                {errors.storeName && <p className="text-xs text-red-500 mt-1">{errors.storeName}</p>}
            </div>

            <div className="form-group">
                <label className="block text-sm font-medium mb-1">تصنيف المنتجات الرئيسي</label>
                <select
                    name="storeCategory"
                    value={formData.storeCategory}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary appearance-none ${errors.storeCategory ? 'border-red-500' : 'border-gray-200'}`}
                    style={{ background: 'var(--bg-main)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                >
                    <option value="">اختر التصنيف...</option>
                    <option value="electronics">إلكترونيات</option>
                    <option value="fashion">أزياء وملابس</option>
                    <option value="home">منزل ومطبخ</option>
                    <option value="beauty">جمال وعطور</option>
                    <option value="toys">ألعاب أطفال</option>
                </select>
                {errors.storeCategory && <p className="text-xs text-red-500 mt-1">{errors.storeCategory}</p>}
            </div>

            <div className="form-group">
                <label className="block text-sm font-medium mb-1">وصف المتجر (اختياري)</label>
                <textarea
                    name="storeDescription"
                    value={formData.storeDescription}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary"
                    style={{ background: 'var(--bg-main)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                    placeholder="تحدث قليلاً عن نوعية المنتجات التي ستبيعها..."
                ></textarea>
            </div>

            <div className="flex gap-4 pt-4">
                <button
                    onClick={prevStep}
                    className="flex-1 py-3 px-4 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    style={{ background: 'var(--bg-main)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                >
                    <ChevronRight size={18} /> السابق
                </button>
                <button
                    onClick={nextStep}
                    className="flex-[2] py-3 px-4 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                    المتابعة <ChevronLeft size={18} />
                </button>
            </div>
        </div>
    );

    // Step 5: Financials
    const renderStep5 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
            <div>
                <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>البيانات المالية</h3>
                <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>لتلقي مستحقات المبيعات الخاصة بك</p>
            </div>

            <div className="form-group">
                <label className="block text-sm font-medium mb-1">اسم البنك</label>
                <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${errors.bankName ? 'border-red-500' : 'border-gray-200'}`}
                    style={{ background: 'var(--bg-main)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                />
                {errors.bankName && <p className="text-xs text-red-500 mt-1">{errors.bankName}</p>}
            </div>

            <div className="form-group">
                <label className="block text-sm font-medium mb-1">اسم صاحب الحساب (بالكامل)</label>
                <input
                    type="text"
                    name="accountHolder"
                    value={formData.accountHolder}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${errors.accountHolder ? 'border-red-500' : 'border-gray-200'}`}
                    style={{ background: 'var(--bg-main)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                />
                {errors.accountHolder && <p className="text-xs text-red-500 mt-1">{errors.accountHolder}</p>}
            </div>

            <div className="form-group">
                <label className="block text-sm font-medium mb-1">رقم الـ IBAN</label>
                <div className="relative">
                    <input
                        type="text"
                        name="iban"
                        value={formData.iban}
                        onChange={handleChange}
                        placeholder="JO00 0000 0000 0000 0000 0000 00"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${errors.iban ? 'border-red-500' : 'border-gray-200'}`}
                        style={{ background: 'var(--bg-main)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                        dir="ltr"
                    />
                </div>
                {errors.iban && <p className="text-xs text-red-500 mt-1">{errors.iban}</p>}
            </div>

            <div className="flex gap-4 pt-4">
                <button
                    onClick={prevStep}
                    className="flex-1 py-3 px-4 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    style={{ background: 'var(--bg-main)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                >
                    <ChevronRight size={18} /> السابق
                </button>
                <button
                    onClick={nextStep}
                    className="flex-[2] py-3 px-4 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                    المتابعة <ChevronLeft size={18} />
                </button>
            </div>
        </div>
    );

    // Step 6: Review & Submit
    const renderStep6 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
            <div>
                <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>مراجعة البيانات</h3>
                <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>تأكد من صحة جميع البيانات قبل الإرسال</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-4" style={{ background: 'var(--bg-main)', borderColor: 'var(--border-color)' }}>
                <div className="flex justify-between border-b border-gray-100 pb-2" style={{ borderColor: 'var(--border-color)' }}>
                    <span className="text-sm text-gray-500" style={{ color: 'var(--text-secondary)' }}>النوع:</span>
                    <span className="text-sm font-bold">{formData.sellerType === 'individual' ? 'فردي' : 'شركة'}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2" style={{ borderColor: 'var(--border-color)' }}>
                    <span className="text-sm text-gray-500" style={{ color: 'var(--text-secondary)' }}>اسم المتجر:</span>
                    <span className="text-sm font-bold">{formData.storeName}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2" style={{ borderColor: 'var(--border-color)' }}>
                    <span className="text-sm text-gray-500" style={{ color: 'var(--text-secondary)' }}>البنك:</span>
                    <span className="text-sm font-bold">{formData.bankName}</span>
                </div>
                <div className="flex justify-between pb-2">
                    <span className="text-sm text-gray-500" style={{ color: 'var(--text-secondary)' }}>البريد الإلكتروني:</span>
                    <span className="text-sm font-bold">{formData.email}</span>
                </div>
            </div>

            <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-100 rounded-lg" style={{ background: 'rgba(234, 179, 8, 0.05)', borderColor: 'rgba(234, 179, 8, 0.2)' }}>
                <CheckCircle size={18} className="text-yellow-600 mt-1 shrink-0" />
                <p className="text-xs text-yellow-800" style={{ color: 'var(--warning)' }}>بمجرد الإرسال، سيتم مراجعة طلبك من قبل إدارة المنصة. قد نطلب مستندات إضافية عبر البريد الإلكتروني.</p>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
                <input
                    type="checkbox"
                    name="agreedToTerms"
                    checked={formData.agreedToTerms}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-600" style={{ color: 'var(--text-secondary)' }}>
                    أوافق على <span className="text-indigo-600 font-medium">اتفاقية البائع</span> و <span className="text-indigo-600 font-medium">سياسة الخصوصية</span> لمنصة Souq.
                </span>
            </label>

            <div className="flex gap-4 pt-4">
                <button
                    onClick={prevStep}
                    className="flex-1 py-3 px-4 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    style={{ background: 'var(--bg-main)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                >
                    <ChevronRight size={18} /> السابق
                </button>
                <button
                    onClick={handleSubmit}
                    className="flex-[2] py-3 px-4 rounded-lg text-white font-medium bg-green-600 hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-100"
                >
                    إرسال الطلب <CheckCircle size={18} />
                </button>
            </div>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto py-4">
            {renderStepper()}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
                {step === 4 && renderStep4()}
                {step === 5 && renderStep5()}
                {step === 6 && renderStep6()}
            </div>
        </div>
    );
}
