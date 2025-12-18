import {
    Store,
    Image,
    FileText,
    Clock,
    Edit,
    Upload,
    Star,
    CheckCircle,
    Shield
} from 'lucide-react';

export default function StoreProfile() {
    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h2 className="page-title">ملف المتجر</h2>
                <p className="page-subtitle">الواجهة العامة التي يراها العملاء</p>
            </div>

            {/* Store Header Card */}
            <div className="card mb-xl" style={{ position: 'relative', overflow: 'hidden' }}>
                {/* Banner */}
                <div style={{
                    height: '200px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
                    margin: 'calc(var(--spacing-lg) * -1)',
                    marginBottom: '0'
                }}>
                    <button className="btn btn-secondary btn-sm" style={{
                        position: 'absolute',
                        top: 'var(--spacing-md)',
                        left: 'var(--spacing-md)'
                    }}>
                        <Upload size={14} />
                        تغيير البانر
                    </button>
                </div>

                {/* Store Info */}
                <div style={{
                    display: 'flex',
                    gap: 'var(--spacing-lg)',
                    alignItems: 'flex-end',
                    marginTop: '-50px',
                    padding: '0 var(--spacing-lg)',
                    paddingBottom: 'var(--spacing-lg)'
                }}>
                    {/* Logo */}
                    <div style={{
                        width: '120px',
                        height: '120px',
                        background: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-lg)',
                        border: '4px solid var(--bg-card)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                    }}>
                        <Store size={48} style={{ color: 'var(--accent-primary)' }} />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1 }}>
                        <div className="flex items-center gap-md mb-sm">
                            <h2 style={{ fontSize: '24px', fontWeight: '700' }}>متجر التقنية المتقدمة</h2>
                            <span className="badge badge-primary">
                                <Shield size={12} />
                                متجر موثق
                            </span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-sm)' }}>
                            متخصصون في بيع أحدث الأجهزة الإلكترونية والاكسسوارات بأفضل الأسعار
                        </p>
                        <div className="flex items-center gap-lg" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                            <span className="flex items-center gap-sm">
                                <Star size={16} style={{ color: 'var(--warning)' }} />
                                4.8 (2,450 تقييم)
                            </span>
                            <span>• إلكترونيات واكسسوارات</span>
                            <span>• تاريخ التسجيل: يناير 2023</span>
                        </div>
                    </div>

                    <button className="btn btn-primary">
                        <Edit size={18} />
                        تعديل الملف
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-2">
                {/* Store Identity */}
                <div className="card">
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
                                <Store size={20} />
                            </div>
                            <h3 className="card-title">الهوية الأساسية</h3>
                        </div>
                    </div>
                    <div className="flex flex-col gap-md">
                        <div className="flex items-center justify-between" style={{ padding: 'var(--spacing-sm) 0', borderBottom: '1px solid var(--border-color)' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>اسم المتجر</span>
                            <span style={{ fontWeight: '500', fontSize: '14px' }}>متجر التقنية المتقدمة</span>
                        </div>
                        <div className="flex items-center justify-between" style={{ padding: 'var(--spacing-sm) 0', borderBottom: '1px solid var(--border-color)' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>الفئة الرئيسية</span>
                            <span style={{ fontWeight: '500', fontSize: '14px' }}>إلكترونيات</span>
                        </div>
                        <div className="flex items-center justify-between" style={{ padding: 'var(--spacing-sm) 0', borderBottom: '1px solid var(--border-color)' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>الفئات الفرعية</span>
                            <span style={{ fontWeight: '500', fontSize: '14px' }}>هواتف، اكسسوارات، سماعات</span>
                        </div>
                        <div className="flex items-center justify-between" style={{ padding: 'var(--spacing-sm) 0', borderBottom: '1px solid var(--border-color)' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>متوسط التقييمات</span>
                            <span className="flex items-center gap-sm" style={{ fontWeight: '500', fontSize: '14px', color: 'var(--warning)' }}>
                                <Star size={16} />
                                4.8
                            </span>
                        </div>
                        <div className="flex items-center justify-between" style={{ padding: 'var(--spacing-sm) 0' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>العلامة التجارية</span>
                            <span style={{ fontWeight: '500', fontSize: '14px' }}>TechAdvanced™</span>
                        </div>
                    </div>
                </div>

                {/* Store Images */}
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
                                <Image size={20} />
                            </div>
                            <h3 className="card-title">صور وبنرات المتجر</h3>
                        </div>
                        <button className="btn btn-secondary btn-sm">
                            <Upload size={14} />
                            رفع صورة
                        </button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-md)' }}>
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} style={{
                                aspectRatio: '16/9',
                                background: 'var(--bg-secondary)',
                                borderRadius: 'var(--radius-md)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px dashed var(--border-color)'
                            }}>
                                <Image size={24} style={{ color: 'var(--text-muted)' }} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Store Policies */}
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
                            <h3 className="card-title">سياسات المتجر</h3>
                        </div>
                    </div>
                    <div className="flex flex-col gap-md">
                        {[
                            { label: 'سياسة الشحن', value: 'شحن مجاني للطلبات فوق 500 ج.م' },
                            { label: 'سياسة الإرجاع', value: 'إرجاع خلال 14 يوم' },
                            { label: 'سياسة الضمان', value: 'ضمان سنة كاملة' },
                            { label: 'سياسة الاستبدال', value: 'استبدال خلال 7 أيام' },
                            { label: 'سياسة التغليف', value: 'تغليف آمن ومضمون' },
                        ].map((policy, idx) => (
                            <div key={idx} style={{
                                padding: 'var(--spacing-md)',
                                background: 'var(--bg-secondary)',
                                borderRadius: 'var(--radius-md)'
                            }}>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>{policy.label}</p>
                                <p style={{ fontWeight: '500', fontSize: '14px' }}>{policy.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Operation Settings */}
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
                                <Clock size={20} />
                            </div>
                            <h3 className="card-title">إعدادات التشغيل</h3>
                        </div>
                    </div>
                    <div className="flex flex-col gap-lg">
                        <div>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>أوقات العمل</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
                                {['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'].map((day) => (
                                    <span key={day} className="badge badge-success">{day}</span>
                                ))}
                                <span className="badge badge-danger">الجمعة (عطلة)</span>
                            </div>
                            <p style={{ fontSize: '14px', marginTop: '8px' }}>من 9:00 ص إلى 10:00 م</p>
                        </div>
                        <div>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>مواعيد استلام الشحنات</p>
                            <p style={{ fontSize: '14px' }}>من 10:00 ص إلى 4:00 م</p>
                        </div>
                        <div>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>ساعات دعم العملاء</p>
                            <p style={{ fontSize: '14px' }}>من 9:00 ص إلى 9:00 م</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Store Description */}
            <div className="card mt-lg">
                <div className="card-header">
                    <h3 className="card-title">وصف المتجر</h3>
                    <button className="btn btn-secondary btn-sm">
                        <Edit size={14} />
                        تعديل
                    </button>
                </div>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                    متجر التقنية المتقدمة هو وجهتك الأولى لشراء أحدث الأجهزة الإلكترونية والاكسسوارات في مصر.
                    نحن نقدم مجموعة واسعة من الهواتف الذكية، السماعات، الساعات الذكية، والشواحن من أفضل العلامات التجارية العالمية.
                    <br /><br />
                    نلتزم بتقديم منتجات أصلية 100% مع ضمان شامل وخدمة عملاء متميزة. شحن سريع لجميع المحافظات وإمكانية الإرجاع والاستبدال.
                </p>
            </div>
        </div>
    );
}
