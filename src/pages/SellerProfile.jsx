import {
    User,
    Mail,
    Phone,
    Lock,
    Globe,
    Languages,
    CreditCard,
    Building2,
    FileText,
    Shield,
    MapPin,
    Smartphone,
    AlertTriangle,
    CheckCircle,
    Clock,
    Wallet,
    Download,
    Edit
} from 'lucide-react';

const profileSections = [
    {
        id: 'account',
        title: 'بيانات الحساب الأساسية',
        icon: User,
        fields: [
            { label: 'البريد الإلكتروني', value: 'ahmed@example.com', icon: Mail },
            { label: 'رقم الهاتف', value: '+20 123 456 7890', icon: Phone },
            { label: 'كلمة المرور', value: '••••••••••', icon: Lock, masked: true },
            { label: 'الدولة', value: 'مصر', icon: Globe },
            { label: 'اللغة', value: 'العربية', icon: Languages },
            { label: 'معرف الحساب', value: 'ACC-2024-78432', icon: User },
            { label: 'حالة الحساب', value: 'نشط', status: 'success' },
        ]
    },
    {
        id: 'seller-type',
        title: 'نوع التاجر',
        icon: Building2,
        fields: [
            { label: 'نوع الحساب', value: 'شركة' },
            { label: 'نوع التاجر', value: 'محلي' },
            { label: 'طبيعة النشاط', value: 'إلكترونيات واكسسوارات' },
        ]
    },
    {
        id: 'kyc',
        title: 'بيانات الهوية والتحقق (KYC)',
        icon: Shield,
        fields: [
            { label: 'اسم الشركة القانوني', value: 'شركة التقنية المتقدمة للتجارة' },
            { label: 'السجل التجاري', value: '123456789' },
            { label: 'الرقم الضريبي', value: '987-654-321' },
            { label: 'نوع الكيان', value: 'شركة ذات مسئولية محدودة (LLC)' },
            { label: 'الدولة والمدينة', value: 'مصر - القاهرة' },
            { label: 'عنوان المقر الرئيسي', value: 'شارع التحرير، الدقي، الجيزة' },
            { label: 'ممثل الشركة', value: 'أحمد محمد علي' },
            { label: 'حالة التحقق', value: 'تم التحقق', status: 'success' },
        ]
    },
    {
        id: 'payment',
        title: 'بيانات الدفع',
        icon: CreditCard,
        fields: [
            { label: 'وسيلة الدفع', value: 'حساب بنكي' },
            { label: 'اسم صاحب الحساب', value: 'شركة التقنية المتقدمة' },
            { label: 'اسم البنك', value: 'البنك الأهلي المصري' },
            { label: 'آخر 4 أرقام', value: '•••• 4521' },
            { label: 'IBAN', value: 'EG38 0019 0005 0001 2345 6789' },
            { label: 'العملة الأساسية', value: 'جنيه مصري (EGP)' },
        ]
    },
];

const walletData = {
    available: '45,230',
    withdrawable: '38,500',
    pending: '6,730',
};

const recentTransactions = [
    { type: 'إيداع', amount: '+12,500', date: '2024-12-18', status: 'success' },
    { type: 'سحب', amount: '-5,000', date: '2024-12-15', status: 'success' },
    { type: 'عمولة', amount: '-450', date: '2024-12-14', status: 'warning' },
    { type: 'إيداع', amount: '+8,200', date: '2024-12-12', status: 'success' },
];

export default function SellerProfile() {
    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h2 className="page-title">ملف التاجر الحساس</h2>
                <p className="page-subtitle">
                    <AlertTriangle size={16} style={{ color: 'var(--warning)', marginLeft: '8px', display: 'inline' }} />
                    هذه البيانات سرية ولا تظهر لأحد إلا لك أنت فقط
                </p>
            </div>

            {/* Wallet Section */}
            <div className="card mb-xl">
                <div className="card-header">
                    <div className="flex items-center gap-md">
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'var(--accent-gradient)',
                            borderRadius: 'var(--radius-md)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Wallet size={24} />
                        </div>
                        <div>
                            <h3 className="card-title">المحفظة</h3>
                            <p className="card-subtitle">إدارة أرصدتك وطلبات السحب</p>
                        </div>
                    </div>
                    <button className="btn btn-primary">
                        <Download size={18} />
                        طلب سحب
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-lg mb-lg">
                    <div style={{
                        padding: 'var(--spacing-lg)',
                        background: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)'
                    }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>الرصيد المتاح</p>
                        <p style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)' }}>
                            {walletData.available} <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>ج.م</span>
                        </p>
                    </div>
                    <div style={{
                        padding: 'var(--spacing-lg)',
                        background: 'var(--success-bg)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--success)'
                    }}>
                        <p style={{ color: 'var(--success)', fontSize: '14px', marginBottom: '8px' }}>قابل للسحب</p>
                        <p style={{ fontSize: '28px', fontWeight: '700', color: 'var(--success)' }}>
                            {walletData.withdrawable} <span style={{ fontSize: '14px' }}>ج.م</span>
                        </p>
                    </div>
                    <div style={{
                        padding: 'var(--spacing-lg)',
                        background: 'var(--warning-bg)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--warning)'
                    }}>
                        <p style={{ color: 'var(--warning)', fontSize: '14px', marginBottom: '8px' }}>معلق</p>
                        <p style={{ fontSize: '28px', fontWeight: '700', color: 'var(--warning)' }}>
                            {walletData.pending} <span style={{ fontSize: '14px' }}>ج.م</span>
                        </p>
                    </div>
                </div>

                <h4 style={{ marginBottom: 'var(--spacing-md)', fontSize: '16px' }}>آخر الحركات</h4>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>النوع</th>
                                <th>المبلغ</th>
                                <th>التاريخ</th>
                                <th>الحالة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentTransactions.map((tx, idx) => (
                                <tr key={idx}>
                                    <td>{tx.type}</td>
                                    <td style={{ color: tx.amount.startsWith('+') ? 'var(--success)' : 'var(--danger)' }}>
                                        {tx.amount} ج.م
                                    </td>
                                    <td>{tx.date}</td>
                                    <td>
                                        <span className={`badge badge-${tx.status}`}>
                                            {tx.status === 'success' ? 'مكتمل' : 'قيد المعالجة'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Profile Sections */}
            <div className="grid grid-cols-2">
                {profileSections.map((section) => (
                    <div key={section.id} className="card">
                        <div className="card-header">
                            <div className="flex items-center gap-md">
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: 'rgba(99, 102, 241, 0.15)',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--accent-primary)'
                                }}>
                                    <section.icon size={20} />
                                </div>
                                <h3 className="card-title">{section.title}</h3>
                            </div>
                            <button className="btn btn-secondary btn-sm">
                                <Edit size={14} />
                                تعديل
                            </button>
                        </div>
                        <div className="flex flex-col gap-md">
                            {section.fields.map((field, idx) => (
                                <div key={idx} className="flex items-center justify-between" style={{
                                    padding: 'var(--spacing-sm) 0',
                                    borderBottom: idx < section.fields.length - 1 ? '1px solid var(--border-color)' : 'none'
                                }}>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{field.label}</span>
                                    {field.status ? (
                                        <span className={`badge badge-${field.status}`}>
                                            <CheckCircle size={12} />
                                            {field.value}
                                        </span>
                                    ) : (
                                        <span style={{ fontWeight: '500', fontSize: '14px' }}>{field.value}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Additional Sections */}
            <div className="grid grid-cols-2 mt-lg">
                {/* Tax Settings */}
                <div className="card">
                    <div className="card-header">
                        <div className="flex items-center gap-md">
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'var(--warning-bg)',
                                borderRadius: 'var(--radius-md)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--warning)'
                            }}>
                                <FileText size={20} />
                            </div>
                            <h3 className="card-title">إعدادات الضرائب</h3>
                        </div>
                    </div>
                    <div className="flex flex-col gap-md">
                        <div className="flex items-center justify-between" style={{ padding: 'var(--spacing-sm) 0', borderBottom: '1px solid var(--border-color)' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>الرقم الضريبي</span>
                            <span style={{ fontWeight: '500', fontSize: '14px' }}>987-654-321</span>
                        </div>
                        <div className="flex items-center justify-between" style={{ padding: 'var(--spacing-sm) 0', borderBottom: '1px solid var(--border-color)' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>الدولة الضريبية</span>
                            <span style={{ fontWeight: '500', fontSize: '14px' }}>مصر</span>
                        </div>
                        <div className="flex items-center justify-between" style={{ padding: 'var(--spacing-sm) 0' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>ضريبة القيمة المضافة</span>
                            <span className="badge badge-success">مُسجل - 14%</span>
                        </div>
                    </div>
                </div>

                {/* Addresses */}
                <div className="card">
                    <div className="card-header">
                        <div className="flex items-center gap-md">
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'var(--info-bg)',
                                borderRadius: 'var(--radius-md)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--info)'
                            }}>
                                <MapPin size={20} />
                            </div>
                            <h3 className="card-title">عناوين الاستلام والمرتجعات</h3>
                        </div>
                    </div>
                    <div className="flex flex-col gap-md">
                        <div style={{ padding: 'var(--spacing-sm) 0', borderBottom: '1px solid var(--border-color)' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '12px', display: 'block', marginBottom: '4px' }}>عنوان الاستلام الرئيسي</span>
                            <span style={{ fontWeight: '500', fontSize: '14px' }}>شارع التحرير، الدقي، الجيزة</span>
                        </div>
                        <div style={{ padding: 'var(--spacing-sm) 0', borderBottom: '1px solid var(--border-color)' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '12px', display: 'block', marginBottom: '4px' }}>عنوان الإرجاع</span>
                            <span style={{ fontWeight: '500', fontSize: '14px' }}>المستودع الرئيسي، 6 أكتوبر</span>
                        </div>
                        <div style={{ padding: 'var(--spacing-sm) 0' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '12px', display: 'block', marginBottom: '4px' }}>عنوان المستودع</span>
                            <span style={{ fontWeight: '500', fontSize: '14px' }}>المنطقة الصناعية، 6 أكتوبر</span>
                        </div>
                    </div>
                </div>

                {/* Security */}
                <div className="card">
                    <div className="card-header">
                        <div className="flex items-center gap-md">
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'var(--success-bg)',
                                borderRadius: 'var(--radius-md)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--success)'
                            }}>
                                <Shield size={20} />
                            </div>
                            <h3 className="card-title">سجل الدخول والحماية</h3>
                        </div>
                    </div>
                    <div className="flex flex-col gap-md">
                        <div className="flex items-center justify-between" style={{ padding: 'var(--spacing-sm) 0', borderBottom: '1px solid var(--border-color)' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>آخر تسجيل دخول</span>
                            <span style={{ fontWeight: '500', fontSize: '14px' }}>اليوم 10:30 ص</span>
                        </div>
                        <div className="flex items-center justify-between" style={{ padding: 'var(--spacing-sm) 0', borderBottom: '1px solid var(--border-color)' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>الأجهزة المستخدمة</span>
                            <span style={{ fontWeight: '500', fontSize: '14px' }}>3 أجهزة</span>
                        </div>
                        <div className="flex items-center justify-between" style={{ padding: 'var(--spacing-sm) 0' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>المصادقة الثنائية 2FA</span>
                            <span className="badge badge-success">مُفعّل</span>
                        </div>
                    </div>
                </div>

                {/* Risk & Compliance */}
                <div className="card">
                    <div className="card-header">
                        <div className="flex items-center gap-md">
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'var(--danger-bg)',
                                borderRadius: 'var(--radius-md)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--danger)'
                            }}>
                                <AlertTriangle size={20} />
                            </div>
                            <h3 className="card-title">مستوى المخاطر والامتثال</h3>
                        </div>
                    </div>
                    <div className="flex flex-col gap-md">
                        <div className="flex items-center justify-between" style={{ padding: 'var(--spacing-sm) 0', borderBottom: '1px solid var(--border-color)' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>درجة المخاطر</span>
                            <span className="badge badge-success">منخفض (15/100)</span>
                        </div>
                        <div className="flex items-center justify-between" style={{ padding: 'var(--spacing-sm) 0', borderBottom: '1px solid var(--border-color)' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>حالات التعليق السابقة</span>
                            <span style={{ fontWeight: '500', fontSize: '14px' }}>لا يوجد</span>
                        </div>
                        <div className="flex items-center justify-between" style={{ padding: 'var(--spacing-sm) 0' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>إنذارات الامتثال</span>
                            <span style={{ fontWeight: '500', fontSize: '14px' }}>0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
