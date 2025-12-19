import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Mail, Lock, Phone, User, Building, FileText,
    CreditCard, CheckCircle, ArrowRight, ArrowLeft,
    Upload
} from 'lucide-react';
import LogoFull from '../../assets/image/logo2.svg';

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
        // Save to localStorage and redirect
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('sellerData', JSON.stringify(formData));
        navigate('/');
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div>
                        <div style={{ marginBottom: '16px' }}>
                            <label className="form-label">البريد الإلكتروني *</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="email"
                                    className="form-input"
                                    style={{ paddingRight: '40px' }}
                                    value={formData.email}
                                    onChange={(e) => updateFormData('email', e.target.value)}
                                    placeholder="example@email.com"
                                    required
                                />
                            </div>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label className="form-label">رقم الهاتف *</label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="tel"
                                    className="form-input"
                                    style={{ paddingRight: '40px' }}
                                    value={formData.phone}
                                    onChange={(e) => updateFormData('phone', e.target.value)}
                                    placeholder="+962 79 123 4567"
                                    required
                                />
                            </div>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label className="form-label">كلمة المرور *</label>
                            <input
                                type="password"
                                className="form-input"
                                value={formData.password}
                                onChange={(e) => updateFormData('password', e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label className="form-label">تأكيد كلمة المرور *</label>
                            <input
                                type="password"
                                className="form-input"
                                value={formData.confirmPassword}
                                onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                            <div>
                                <label className="form-label">اللغة</label>
                                <select className="form-select" value={formData.language} onChange={(e) => updateFormData('language', e.target.value)}>
                                    <option value="ar">العربية</option>
                                    <option value="en">English</option>
                                </select>
                            </div>
                            <div>
                                <label className="form-label">الدولة</label>
                                <select className="form-select" value={formData.country} onChange={(e) => updateFormData('country', e.target.value)}>
                                    <option value="JO">الأردن</option>
                                    <option value="SA">السعودية</option>
                                    <option value="AE">الإمارات</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div
                                onClick={() => updateFormData('sellerType', 'individual')}
                                style={{
                                    padding: '24px',
                                    border: `2px solid ${formData.sellerType === 'individual' ? '#2563eb' : '#e2e8f0'}`,
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    background: formData.sellerType === 'individual' ? '#eff6ff' : '#fff',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <User size={40} style={{ margin: '0 auto 12px', color: formData.sellerType === 'individual' ? '#2563eb' : '#64748b' }} />
                                <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>تاجر فردي</h4>
                                <p style={{ fontSize: '13px', color: '#64748b' }}>للأفراد والتجار المستقلين</p>
                            </div>
                            <div
                                onClick={() => updateFormData('sellerType', 'company')}
                                style={{
                                    padding: '24px',
                                    border: `2px solid ${formData.sellerType === 'company' ? '#2563eb' : '#e2e8f0'}`,
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    background: formData.sellerType === 'company' ? '#eff6ff' : '#fff',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <Building size={40} style={{ margin: '0 auto 12px', color: formData.sellerType === 'company' ? '#2563eb' : '#64748b' }} />
                                <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>شركة / مؤسسة</h4>
                                <p style={{ fontSize: '13px', color: '#64748b' }}>للشركات والمؤسسات المسجلة</p>
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div>
                        {formData.sellerType === 'individual' ? (
                            <>
                                <div style={{ marginBottom: '16px' }}>
                                    <label className="form-label">الاسم الكامل *</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={formData.fullName}
                                        onChange={(e) => updateFormData('fullName', e.target.value)}
                                        placeholder="الاسم الكامل"
                                    />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label className="form-label">الرقم القومي / جواز السفر *</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={formData.nationalId}
                                        onChange={(e) => updateFormData('nationalId', e.target.value)}
                                        placeholder="123456789"
                                    />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label className="form-label">تاريخ الميلاد *</label>
                                    <input
                                        type="date"
                                        className="form-input"
                                        value={formData.birthDate}
                                        onChange={(e) => updateFormData('birthDate', e.target.value)}
                                    />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label className="form-label">عنوان السكن *</label>
                                    <textarea
                                        className="form-input"
                                        rows="3"
                                        value={formData.address}
                                        onChange={(e) => updateFormData('address', e.target.value)}
                                        placeholder="العنوان الكامل"
                                    />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label className="form-label">إثبات الهوية *</label>
                                    <div style={{
                                        border: '2px dashed #e2e8f0',
                                        borderRadius: '8px',
                                        padding: '24px',
                                        textAlign: 'center',
                                        cursor: 'pointer'
                                    }}>
                                        <Upload size={32} style={{ margin: '0 auto 8px', color: '#94a3b8' }} />
                                        <p style={{ fontSize: '14px', color: '#64748b' }}>اضغط لرفع صورة الهوية</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div style={{ marginBottom: '16px' }}>
                                    <label className="form-label">اسم الشركة *</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={formData.companyName}
                                        onChange={(e) => updateFormData('companyName', e.target.value)}
                                        placeholder="اسم الشركة"
                                    />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label className="form-label">الرقم الضريبي / السجل التجاري *</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={formData.taxNumber}
                                        onChange={(e) => updateFormData('taxNumber', e.target.value)}
                                        placeholder="123456789"
                                    />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label className="form-label">نوع الكيان *</label>
                                    <select className="form-select" value={formData.entityType} onChange={(e) => updateFormData('entityType', e.target.value)}>
                                        <option value="">اختر نوع الكيان</option>
                                        <option value="llc">شركة ذات مسؤولية محدودة</option>
                                        <option value="corporation">شركة مساهمة</option>
                                        <option value="partnership">شراكة</option>
                                    </select>
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label className="form-label">عنوان المقر *</label>
                                    <textarea
                                        className="form-input"
                                        rows="3"
                                        value={formData.companyAddress}
                                        onChange={(e) => updateFormData('companyAddress', e.target.value)}
                                        placeholder="العنوان الكامل للمقر"
                                    />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label className="form-label">المستندات الرسمية *</label>
                                    <div style={{
                                        border: '2px dashed #e2e8f0',
                                        borderRadius: '8px',
                                        padding: '24px',
                                        textAlign: 'center',
                                        cursor: 'pointer'
                                    }}>
                                        <Upload size={32} style={{ margin: '0 auto 8px', color: '#94a3b8' }} />
                                        <p style={{ fontSize: '14px', color: '#64748b' }}>اضغط لرفع المستندات</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                );

            case 4:
                return (
                    <div>
                        <div style={{ marginBottom: '16px' }}>
                            <label className="form-label">اسم المتجر *</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formData.storeName}
                                onChange={(e) => updateFormData('storeName', e.target.value)}
                                placeholder="اسم متجرك"
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label className="form-label">وصف قصير *</label>
                            <textarea
                                className="form-input"
                                rows="3"
                                value={formData.storeDescription}
                                onChange={(e) => updateFormData('storeDescription', e.target.value)}
                                placeholder="وصف مختصر عن متجرك"
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label className="form-label">الفئة الرئيسية *</label>
                            <select className="form-select" value={formData.category} onChange={(e) => updateFormData('category', e.target.value)}>
                                <option value="">اختر الفئة</option>
                                <option value="electronics">إلكترونيات</option>
                                <option value="fashion">أزياء</option>
                                <option value="home">منزل ومطبخ</option>
                                <option value="sports">رياضة</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label className="form-label">شعار المتجر</label>
                            <div style={{
                                border: '2px dashed #e2e8f0',
                                borderRadius: '8px',
                                padding: '24px',
                                textAlign: 'center',
                                cursor: 'pointer'
                            }}>
                                <Upload size={32} style={{ margin: '0 auto 8px', color: '#94a3b8' }} />
                                <p style={{ fontSize: '14px', color: '#64748b' }}>اضغط لرفع الشعار</p>
                            </div>
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div>
                        <div style={{ marginBottom: '16px' }}>
                            <label className="form-label">وسيلة الدفع *</label>
                            <select className="form-select" value={formData.paymentMethod} onChange={(e) => updateFormData('paymentMethod', e.target.value)}>
                                <option value="bank">حساب بنكي</option>
                                <option value="wallet">محفظة رقمية</option>
                            </select>
                        </div>
                        {formData.paymentMethod === 'bank' && (
                            <>
                                <div style={{ marginBottom: '16px' }}>
                                    <label className="form-label">اسم البنك *</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={formData.bankName}
                                        onChange={(e) => updateFormData('bankName', e.target.value)}
                                        placeholder="اسم البنك"
                                    />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label className="form-label">اسم صاحب الحساب *</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={formData.accountHolder}
                                        onChange={(e) => updateFormData('accountHolder', e.target.value)}
                                        placeholder="الاسم كما يظهر في البنك"
                                    />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label className="form-label">رقم الـ IBAN *</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={formData.iban}
                                        onChange={(e) => updateFormData('iban', e.target.value)}
                                        placeholder="JO00XXXX0000000000000000000000"
                                    />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label className="form-label">إثبات الحساب</label>
                                    <div style={{
                                        border: '2px dashed #e2e8f0',
                                        borderRadius: '8px',
                                        padding: '24px',
                                        textAlign: 'center',
                                        cursor: 'pointer'
                                    }}>
                                        <Upload size={32} style={{ margin: '0 auto 8px', color: '#94a3b8' }} />
                                        <p style={{ fontSize: '14px', color: '#64748b' }}>اضغط لرفع كشف حساب</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                );

            case 6:
                return (
                    <div>
                        <div style={{
                            background: '#f8fafc',
                            borderRadius: '12px',
                            padding: '24px',
                            marginBottom: '24px'
                        }}>
                            <div style={{ marginBottom: '16px' }}>
                                <h4 style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>معلومات الحساب</h4>
                                <p style={{ fontSize: '15px', fontWeight: 600 }}>{formData.email}</p>
                                <p style={{ fontSize: '15px', fontWeight: 600 }}>{formData.phone}</p>
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <h4 style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>نوع التاجر</h4>
                                <p style={{ fontSize: '15px', fontWeight: 600 }}>
                                    {formData.sellerType === 'individual' ? 'تاجر فردي' : 'شركة / مؤسسة'}
                                </p>
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <h4 style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>اسم المتجر</h4>
                                <p style={{ fontSize: '15px', fontWeight: 600 }}>{formData.storeName || 'غير محدد'}</p>
                            </div>
                        </div>
                        <div style={{
                            background: '#eff6ff',
                            border: '1px solid #2563eb',
                            borderRadius: '8px',
                            padding: '16px',
                            textAlign: 'center'
                        }}>
                            <CheckCircle size={48} style={{ margin: '0 auto 12px', color: '#2563eb' }} />
                            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: '#1e293b' }}>
                                جاهز للمراجعة
                            </h4>
                            <p style={{ fontSize: '14px', color: '#64748b' }}>
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
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            direction: 'rtl'
        }}>
            {/* Right Side - Blue Panel */}
            <div style={{
                flex: '0 0 35%',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                padding: '60px 40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative circles */}
                <div style={{
                    position: 'absolute',
                    width: '350px',
                    height: '350px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    top: '-80px',
                    right: '-80px'
                }} />
                <div style={{
                    position: 'absolute',
                    width: '250px',
                    height: '250px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    bottom: '-60px',
                    left: '-60px'
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Logo */}
                    <img src={LogoFull} alt="B2 SOUQ" style={{ height: '45px', marginBottom: '40px', filter: 'brightness(0) invert(1)' }} />

                    {/* Title */}
                    <h1 style={{
                        fontSize: '36px',
                        fontWeight: 700,
                        marginBottom: '16px',
                        lineHeight: 1.2,
                        color: '#ffffff'
                    }}>
                        انضم إلى منصة<br />
                        B2-SOUQ
                    </h1>

                    <p style={{
                        fontSize: '16px',
                        opacity: 0.95,
                        lineHeight: 1.6,
                        marginBottom: '50px',
                        color: '#f0f9ff'
                    }}>
                        ابدأ رحلتك في التجارة الإلكترونية اليوم.<br />
                        سجل الآن واحصل على لوحة تحكم احترافية.
                    </p>

                    {/* Testimonials Carousel */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '16px',
                        padding: '24px',
                        border: 'none',
                        position: 'relative',
                        minHeight: '180px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}>
                        {/* Testimonial Content */}
                        <div style={{
                            transition: 'opacity 0.5s',
                            opacity: 1
                        }}>
                            <p style={{
                                fontSize: '15px',
                                lineHeight: 1.7,
                                marginBottom: '16px',
                                color: '#475569',
                                minHeight: '60px'
                            }}>
                                "{TESTIMONIALS[currentTestimonial].text}"
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <img
                                    src={TESTIMONIALS[currentTestimonial].avatar}
                                    alt={TESTIMONIALS[currentTestimonial].author}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        objectFit: 'cover'
                                    }}
                                />
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '14px', color: '#1e293b' }}>{TESTIMONIALS[currentTestimonial].author}</div>
                                    <div style={{ fontSize: '13px', color: '#64748b' }}>{TESTIMONIALS[currentTestimonial].role}</div>
                                </div>
                            </div>
                            <div style={{ marginTop: '12px', display: 'flex', gap: '4px' }}>
                                {[1, 2, 3, 4, 5].map(i => (
                                    <span key={i} style={{ color: '#fbbf24', fontSize: '16px' }}>★</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Progress Indicators - Outside Card */}
                    <div style={{
                        display: 'flex',
                        gap: '8px',
                        marginTop: '20px',
                        justifyContent: 'center'
                    }}>
                        {TESTIMONIALS.map((_, index) => (
                            <div
                                key={index}
                                style={{
                                    height: '4px',
                                    flex: 1,
                                    maxWidth: '60px',
                                    background: currentTestimonial === index ? 'white' : 'rgba(255, 255, 255, 0.3)',
                                    borderRadius: '2px',
                                    transition: 'all 0.3s',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setCurrentTestimonial(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Left Side - Form */}
            <div style={{
                flex: 1,
                background: '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px',
                overflowY: 'auto'
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '600px'
                }}>
                    {/* Horizontal Steps Progress */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '40px',
                        gap: '8px',
                        position: 'relative'
                    }}>
                        {/* Single continuous background line */}
                        <div style={{
                            position: 'absolute',
                            top: '16px',
                            left: 'calc(100% / 12)',
                            right: 'calc(100% / 12)',
                            height: '2px',
                            background: '#e2e8f0',
                            zIndex: 0
                        }} />

                        {/* Active progress line */}
                        <div style={{
                            position: 'absolute',
                            top: '16px',
                            left: 'calc(100% / 12)',
                            width: `calc((100% - 100% / 6) * ${(currentStep - 1) / (STEPS.length - 1)})`,
                            height: '2px',
                            background: '#2563eb',
                            zIndex: 0,
                            transition: 'width 0.3s ease'
                        }} />

                        {STEPS.map((step, index) => (
                            <div key={step.id} style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                position: 'relative'
                            }}>
                                {/* Step Circle */}
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: currentStep >= step.id ? '#2563eb' : '#e2e8f0',
                                    color: currentStep >= step.id ? 'white' : '#94a3b8',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    marginBottom: '8px',
                                    position: 'relative',
                                    zIndex: 1,
                                    transition: 'all 0.3s'
                                }}>
                                    {currentStep > step.id ? '✓' : step.id}
                                </div>

                                {/* Step Title */}
                                <span style={{
                                    fontSize: '12px',
                                    color: currentStep >= step.id ? '#1e293b' : '#64748b',
                                    textAlign: 'center',
                                    fontWeight: currentStep === step.id ? 600 : 500,
                                    transition: 'all 0.3s'
                                }}>
                                    {step.title}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Form Card */}
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '32px',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
                        marginBottom: '24px'
                    }}>
                        {renderStepContent()}
                    </div>

                    {/* Navigation Buttons */}
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'space-between' }}>
                        {currentStep > 1 && (
                            <button
                                onClick={prevStep}
                                style={{
                                    padding: '14px 24px',
                                    background: '#fff',
                                    color: '#2563eb',
                                    border: '2px solid #2563eb',
                                    borderRadius: '10px',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = '#eff6ff';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = '#fff';
                                }}
                            >
                                <ArrowRight size={20} />
                                السابق
                            </button>
                        )}
                        <div style={{ flex: 1 }} />
                        {currentStep < 6 ? (
                            <button
                                onClick={nextStep}
                                style={{
                                    padding: '14px 24px',
                                    background: '#2563eb',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '10px',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = '#1d4ed8';
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 8px 16px rgba(37, 99, 235, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = '#2563eb';
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            >
                                التالي
                                <ArrowLeft size={20} />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                style={{
                                    padding: '14px 24px',
                                    background: '#10b981',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '10px',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = '#059669';
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 8px 16px rgba(16, 185, 129, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = '#10b981';
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            >
                                <CheckCircle size={20} />
                                إرسال الطلب
                            </button>
                        )}
                    </div>

                    {/* Back to Login */}
                    <div style={{ textAlign: 'center', marginTop: '24px' }}>
                        <p style={{ fontSize: '14px', color: '#64748b' }}>
                            لديك حساب بالفعل؟{' '}
                            <button
                                onClick={() => navigate('/login')}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#2563eb',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                            >
                                تسجيل الدخول
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                .form-label {
                    display: block;
                    margin-bottom: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #475569;
                }
                
                .form-input, .form-select {
                    width: 100%;
                    padding: 12px 14px;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    fontSize: 14px;
                    outline: none;
                    transition: all 0.2s;
                    background: #fff;
                }
                
                .form-input:focus, .form-select:focus {
                    border-color: #2563eb;
                    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
                }
                
                .grid-cols-2 {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                }
            `}</style>
        </div>
    );
}
