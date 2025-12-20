import {
    Plus,
    TrendingUp,
    TrendingDown,
    Eye,
    ShoppingCart,
    Target,
    CreditCard,
    X,
    Play,
    Pause,
    MoreVertical,
    Calendar,
    DollarSign
} from 'lucide-react';
import { useState } from 'react';

const ads = [
    {
        id: 1,
        product: 'هاتف سامسونج Galaxy S24',
        page: 'الصفحة الرئيسية',
        budget: 5000,
        spent: 3200,
        duration: '15 يوم',
        views: 12500,
        clicks: 890,
        orders: 45,
        revenue: 67500,
        status: 'active',
        startDate: '2024-12-10',
        endDate: '2024-12-25',
        ctr: 7.1,
        roi: 210
    },
    {
        id: 2,
        product: 'سماعات AirPods Pro',
        page: 'صفحة الإلكترونيات',
        budget: 2000,
        spent: 2000,
        duration: '7 أيام',
        views: 5600,
        clicks: 420,
        orders: 28,
        revenue: 23800,
        status: 'completed',
        startDate: '2024-12-01',
        endDate: '2024-12-07',
        ctr: 7.5,
        roi: 190
    },
    {
        id: 3,
        product: 'شاحن لاسلكي',
        page: 'صفحة البحث',
        budget: 1000,
        spent: 450,
        duration: '10 أيام',
        views: 2300,
        clicks: 180,
        orders: 12,
        revenue: 5400,
        status: 'paused',
        startDate: '2024-12-15',
        endDate: '2024-12-25',
        ctr: 7.8,
        roi: 200
    },
];

const statsCards = [
    {
        id: 1,
        label: 'إجمالي المشاهدات',
        value: '20,400',
        change: '+12.5%',
        positive: true,
        color: '#3b82f6',
        bgColor: '#eff6ff',
        sparkline: [8, 12, 10, 15, 18, 14, 20, 22, 18, 25]
    },
    {
        id: 2,
        label: 'النقرات',
        value: '1,490',
        change: '+8.2%',
        positive: true,
        color: '#8b5cf6',
        bgColor: '#faf5ff',
        sparkline: [5, 8, 12, 10, 14, 16, 12, 18, 15, 20]
    },
    {
        id: 3,
        label: 'الطلبات',
        value: '85',
        change: '+15.3%',
        positive: true,
        color: '#10b981',
        bgColor: '#f0fdf4',
        sparkline: [3, 5, 4, 8, 10, 7, 12, 14, 11, 16]
    },
    {
        id: 4,
        label: 'العائد',
        value: '96,700',
        unit: 'ج.م',
        change: '+18.7%',
        positive: true,
        color: '#f59e0b',
        bgColor: '#fffbeb',
        sparkline: [10, 15, 12, 18, 22, 20, 25, 28, 24, 30]
    },
];

const paymentHistory = [
    { id: 1, amount: 5000, date: '2024-12-10', type: 'دفع إعلان', product: 'Galaxy S24', status: 'success' },
    { id: 2, amount: 2000, date: '2024-12-01', type: 'دفع إعلان', product: 'AirPods Pro', status: 'success' },
    { id: 3, amount: 1000, date: '2024-12-15', type: 'دفع إعلان', product: 'شاحن لاسلكي', status: 'success' },
];

export default function Ads() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            {/* Page Header */}
            <div className="page-header flex items-center justify-between">
                <div>
                    <h2 className="page-title">الإعلانات المدفوعة</h2>
                    <p className="page-subtitle">إدارة حملاتك الإعلانية وتتبع الأداء</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={18} />
                    إنشاء إعلان جديد
                </button>
            </div>

            {/* Enhanced Stats Cards with Sparklines */}
            <div className="grid grid-cols-4 mb-lg" style={{ gap: 'var(--spacing-md)' }}>
                {statsCards.map((card) => {
                    const maxVal = Math.max(...card.sparkline);
                    const points = card.sparkline.map((val, i) =>
                        `${(i / (card.sparkline.length - 1)) * 100},${50 - (val / maxVal) * 40}`
                    ).join(' ');
                    const areaPoints = `0,50 ${points} 100,50`;

                    return (
                        <div key={card.id} className="stats-card">
                            {/* Row 1: Icon (left) + Label (right) */}
                            <div className="stats-card-row">
                                <div className="stats-card-icon" style={{ background: `${card.color}15`, color: card.color }}>
                                    {card.id === 1 && <Eye size={20} strokeWidth={1.5} />}
                                    {card.id === 2 && <Target size={20} strokeWidth={1.5} />}
                                    {card.id === 3 && <ShoppingCart size={20} strokeWidth={1.5} />}
                                    {card.id === 4 && <DollarSign size={20} strokeWidth={1.5} />}
                                </div>
                                <div className="stats-card-label">{card.label}</div>
                            </div>

                            {/* Row 2: Value + Unit (left) + Change (right) */}
                            <div className="stats-card-row stats-card-main">
                                <div className="stats-card-value-group">
                                    <span className="stats-card-value">{card.value}</span>
                                    {card.unit && <span className="stats-card-unit">{card.unit}</span>}
                                </div>
                                <div className={`stats-card-change ${card.positive ? 'positive' : 'negative'}`}>
                                    <span>{card.change}</span>
                                    {card.positive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                </div>
                            </div>

                            {/* Row 3: Area Chart */}
                            <div className="stats-card-chart">
                                <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id={`gradient-${card.id}`} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={card.color} stopOpacity="0.25" />
                                            <stop offset="100%" stopColor={card.color} stopOpacity="0.02" />
                                        </linearGradient>
                                    </defs>
                                    <polygon
                                        points={areaPoints}
                                        fill={`url(#gradient-${card.id})`}
                                    />
                                    <polyline
                                        points={points}
                                        fill="none"
                                        stroke={card.color}
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Campaign Cards - Modern Card Layout */}
            <div className="card mb-lg">
                <div className="card-header">
                    <h3 className="card-title" style={{ fontSize: 18, fontWeight: 700 }}>الحملات الإعلانية</h3>
                    <div className="flex items-center gap-sm">
                        <button className="btn btn-secondary" style={{ fontSize: 13, padding: '8px 16px' }}>
                            <Calendar size={16} />
                            فلترة
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1" style={{ gap: 'var(--spacing-md)' }}>
                    {ads.map((ad) => (
                        <div key={ad.id} style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-lg)',
                            padding: 'var(--spacing-lg)',
                            transition: 'all var(--transition-fast)'
                        }}>
                            {/* Header Row */}
                            <div className="flex items-start justify-between mb-md">
                                <div className="flex items-center gap-md">
                                    <div style={{
                                        width: 48,
                                        height: 48,
                                        background: 'var(--bg-input)',
                                        borderRadius: 'var(--radius-md)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 20
                                    }}>
                                        📱
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
                                            {ad.product}
                                        </h4>
                                        <span className="badge badge-info" style={{ fontSize: 11 }}>{ad.page}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-sm">
                                    <span className={`badge badge-${ad.status === 'active' ? 'success' : ad.status === 'paused' ? 'warning' : 'secondary'}`}>
                                        {ad.status === 'active' ? 'نشط' : ad.status === 'paused' ? 'متوقف' : 'منتهي'}
                                    </span>
                                    {ad.status === 'active' && (
                                        <button className="btn btn-warning btn-sm">
                                            <Pause size={14} />
                                        </button>
                                    )}
                                    {ad.status === 'paused' && (
                                        <button className="btn btn-success btn-sm">
                                            <Play size={14} />
                                        </button>
                                    )}
                                    <button className="btn btn-secondary btn-sm">
                                        <MoreVertical size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-6" style={{ gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-md)' }}>
                                <div>
                                    <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>المشاهدات</p>
                                    <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
                                        {ad.views.toLocaleString('en-US')}
                                    </p>
                                </div>
                                <div>
                                    <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>النقرات</p>
                                    <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
                                        {ad.clicks.toLocaleString('en-US')}
                                    </p>
                                </div>
                                <div>
                                    <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>معدل النقر</p>
                                    <p style={{ fontSize: 18, fontWeight: 700, color: '#8b5cf6' }}>
                                        {ad.ctr}%
                                    </p>
                                </div>
                                <div>
                                    <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>الطلبات</p>
                                    <p style={{ fontSize: 18, fontWeight: 700, color: '#10b981' }}>
                                        {ad.orders}
                                    </p>
                                </div>
                                <div>
                                    <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>العائد</p>
                                    <p style={{ fontSize: 18, fontWeight: 700, color: '#10b981' }}>
                                        {ad.revenue.toLocaleString('en-US')} ج.م
                                    </p>
                                </div>
                                <div>
                                    <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>ROI</p>
                                    <p style={{ fontSize: 18, fontWeight: 700, color: '#f59e0b' }}>
                                        {ad.roi}%
                                    </p>
                                </div>
                            </div>

                            {/* Budget Progress */}
                            <div>
                                <div className="flex items-center justify-between mb-xs">
                                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                                        الميزانية: {ad.spent.toLocaleString('en-US')} / {ad.budget.toLocaleString('en-US')} ج.م
                                    </span>
                                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-primary)' }}>
                                        {Math.round((ad.spent / ad.budget) * 100)}%
                                    </span>
                                </div>
                                <div style={{
                                    height: '6px',
                                    background: 'var(--bg-input)',
                                    borderRadius: 'var(--radius-full)',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        width: `${(ad.spent / ad.budget) * 100}%`,
                                        height: '100%',
                                        background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
                                        borderRadius: 'var(--radius-full)',
                                        transition: 'width var(--transition-base)'
                                    }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment History */}
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title" style={{ fontSize: 18, fontWeight: 700 }}>سجل المدفوعات</h3>
                </div>
                <div className="grid grid-cols-1" style={{ gap: 'var(--spacing-sm)' }}>
                    {paymentHistory.map((payment) => (
                        <div key={payment.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 'var(--spacing-md)',
                            background: 'var(--bg-input)',
                            borderRadius: 'var(--radius-md)',
                            transition: 'all var(--transition-fast)'
                        }}>
                            <div className="flex items-center gap-md">
                                <div style={{
                                    width: 40,
                                    height: 40,
                                    background: '#10b98115',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#10b981'
                                }}>
                                    <CreditCard size={20} />
                                </div>
                                <div>
                                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
                                        {payment.product}
                                    </p>
                                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                                        {payment.type} • {payment.date}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-md">
                                <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
                                    {payment.amount.toLocaleString('en-US')} ج.م
                                </p>
                                <span className="badge badge-success">تم الدفع</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Enhanced Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">إنشاء إعلان جديد</h3>
                            <button className="modal-close" onClick={() => setShowModal(false)}>
                                <X size={18} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label className="form-label">اختر المنتج</label>
                                <select className="form-select">
                                    <option>هاتف سامسونج Galaxy S24</option>
                                    <option>سماعات AirPods Pro</option>
                                    <option>ساعة Huawei GT4</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">صفحة العرض</label>
                                <select className="form-select">
                                    <option>الصفحة الرئيسية</option>
                                    <option>صفحة الفئة</option>
                                    <option>صفحة البحث</option>
                                    <option>صفحة المنتجات المميزة</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2" style={{ gap: 'var(--spacing-md)' }}>
                                <div className="form-group">
                                    <label className="form-label">الميزانية (ج.م)</label>
                                    <input type="number" className="form-input" placeholder="1000" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">المدة (أيام)</label>
                                    <input type="number" className="form-input" placeholder="7" />
                                </div>
                            </div>

                            {/* Estimated Performance */}
                            <div style={{
                                padding: 'var(--spacing-lg)',
                                background: 'linear-gradient(135deg, #eff6ff 0%, #faf5ff 100%)',
                                borderRadius: 'var(--radius-lg)',
                                marginTop: 'var(--spacing-md)',
                                border: '1px solid #e0e7ff'
                            }}>
                                <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--spacing-sm)' }}>
                                    الأداء المتوقع
                                </h4>
                                <div className="grid grid-cols-3" style={{ gap: 'var(--spacing-md)' }}>
                                    <div>
                                        <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>مشاهدات متوقعة</p>
                                        <p style={{ fontSize: 16, fontWeight: 700, color: '#3b82f6' }}>~8,500</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>نقرات متوقعة</p>
                                        <p style={{ fontSize: 16, fontWeight: 700, color: '#8b5cf6' }}>~600</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>ROI متوقع</p>
                                        <p style={{ fontSize: 16, fontWeight: 700, color: '#10b981' }}>~180%</p>
                                    </div>
                                </div>
                            </div>

                            <div style={{
                                padding: 'var(--spacing-md)',
                                background: 'var(--info-bg)',
                                borderRadius: 'var(--radius-md)',
                                marginTop: 'var(--spacing-md)',
                                fontSize: 13,
                                color: 'var(--text-secondary)'
                            }}>
                                💡 سيتم خصم المبلغ من محفظة التاجر عند بدء الإعلان
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary">
                                <CreditCard size={18} />
                                الدفع وبدء الإعلان
                            </button>
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                إلغاء
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
