import {
    DollarSign,
    Plus,
    TrendingUp,
    Eye,
    ShoppingCart,
    Target,
    Calendar,
    CreditCard,
    X,
    Play,
    Pause
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
        endDate: '2024-12-25'
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
        endDate: '2024-12-07'
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
        endDate: '2024-12-25'
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

            {/* Stats Cards */}
            <div className="grid grid-cols-4 mb-xl" style={{ gap: 'var(--spacing-md)' }}>
                <div style={{ padding: '20px', background: '#eff6ff', borderRadius: 'var(--radius-lg)', border: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginBottom: '8px' }}>إجمالي المشاهدات</div>
                            <div style={{ fontSize: '32px', fontWeight: 700, color: '#3b82f6', lineHeight: 1 }}>20,400</div>
                        </div>
                        <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-lg)', background: '#3b82f615', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                            <Eye size={22} />
                        </div>
                    </div>
                </div>
                <div style={{ padding: '20px', background: '#faf5ff', borderRadius: 'var(--radius-lg)', border: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginBottom: '8px' }}>النقرات</div>
                            <div style={{ fontSize: '32px', fontWeight: 700, color: '#8b5cf6', lineHeight: 1 }}>1,490</div>
                        </div>
                        <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-lg)', background: '#8b5cf615', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6' }}>
                            <Target size={22} />
                        </div>
                    </div>
                </div>
                <div style={{ padding: '20px', background: '#f0fdf4', borderRadius: 'var(--radius-lg)', border: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginBottom: '8px' }}>الطلبات</div>
                            <div style={{ fontSize: '32px', fontWeight: 700, color: '#10b981', lineHeight: 1 }}>85</div>
                        </div>
                        <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-lg)', background: '#10b98115', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                            <ShoppingCart size={22} />
                        </div>
                    </div>
                </div>
                <div style={{ padding: '20px', background: '#fffbeb', borderRadius: 'var(--radius-lg)', border: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginBottom: '8px' }}>العائد</div>
                            <div style={{ fontSize: '28px', fontWeight: 700, color: '#f59e0b', lineHeight: 1 }}>96,700<span style={{ fontSize: '14px', color: '#64748b', marginRight: '4px' }}>ج.م</span></div>
                        </div>
                        <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-lg)', background: '#f59e0b15', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
                            <TrendingUp size={22} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Active Ads */}
            <div className="card mb-lg">
                <div className="card-header">
                    <h3 className="card-title">الحملات الإعلانية</h3>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>المنتج</th>
                                <th>صفحة العرض</th>
                                <th>الميزانية</th>
                                <th>المصروف</th>
                                <th>المشاهدات</th>
                                <th>النقرات</th>
                                <th>الطلبات</th>
                                <th>العائد</th>
                                <th>الحالة</th>
                                <th>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ads.map((ad) => (
                                <tr key={ad.id}>
                                    <td style={{ fontWeight: '500' }}>{ad.product}</td>
                                    <td>
                                        <span className="badge badge-info">{ad.page}</span>
                                    </td>
                                    <td>{ad.budget.toLocaleString('ar-EG')} ج.م</td>
                                    <td>
                                        <div>
                                            <span>{ad.spent.toLocaleString('ar-EG')} ج.م</span>
                                            <div style={{
                                                height: '4px',
                                                background: 'var(--bg-input)',
                                                borderRadius: '2px',
                                                marginTop: '4px',
                                                overflow: 'hidden'
                                            }}>
                                                <div style={{
                                                    width: `${(ad.spent / ad.budget) * 100}%`,
                                                    height: '100%',
                                                    background: 'var(--accent-primary)'
                                                }}></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{ad.views.toLocaleString('ar-EG')}</td>
                                    <td>{ad.clicks.toLocaleString('ar-EG')}</td>
                                    <td>{ad.orders}</td>
                                    <td style={{ color: 'var(--success)', fontWeight: '600' }}>{ad.revenue.toLocaleString('ar-EG')} ج.م</td>
                                    <td>
                                        <span className={`badge badge-${ad.status === 'active' ? 'success' : ad.status === 'paused' ? 'warning' : 'danger'}`}>
                                            {ad.status === 'active' ? 'نشط' : ad.status === 'paused' ? 'متوقف' : 'منتهي'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-sm">
                                            {ad.status === 'active' && (
                                                <button className="btn btn-warning btn-sm" title="إيقاف">
                                                    <Pause size={14} />
                                                </button>
                                            )}
                                            {ad.status === 'paused' && (
                                                <button className="btn btn-success btn-sm" title="تشغيل">
                                                    <Play size={14} />
                                                </button>
                                            )}
                                            <button className="action-btn action-btn-view" title="التفاصيل">
                                                <Eye size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Payment History */}
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">سجل المدفوعات</h3>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>التاريخ</th>
                                <th>النوع</th>
                                <th>المنتج</th>
                                <th>المبلغ</th>
                                <th>الحالة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentHistory.map((payment) => (
                                <tr key={payment.id}>
                                    <td>{payment.date}</td>
                                    <td>{payment.type}</td>
                                    <td>{payment.product}</td>
                                    <td style={{ fontWeight: '600' }}>{payment.amount.toLocaleString('ar-EG')} ج.م</td>
                                    <td>
                                        <span className="badge badge-success">تم الدفع</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Ad Modal */}
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
                            <div style={{
                                padding: 'var(--spacing-lg)',
                                background: 'var(--info-bg)',
                                borderRadius: 'var(--radius-md)',
                                marginTop: 'var(--spacing-md)'
                            }}>
                                <h4 style={{ color: 'var(--info)', marginBottom: '8px' }}>ملخص الإعلان</h4>
                                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                                    سيتم خصم المبلغ من محفظة التاجر عند بدء الإعلان
                                </p>
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
