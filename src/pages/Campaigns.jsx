import {
    Megaphone,
    Plus,
    TrendingUp,
    Eye,
    ShoppingCart,
    Percent,
    Calendar,
    CheckCircle,
    Clock,
    X
} from 'lucide-react';
import { useState } from 'react';

const platformCampaigns = [
    {
        id: 1,
        name: 'تخفيضات نهاية العام',
        discount: '30%',
        startDate: '2024-12-20',
        endDate: '2024-12-31',
        minPrice: true,
        status: 'upcoming',
        joined: false
    },
    {
        id: 2,
        name: 'عروض الشتاء',
        discount: '25%',
        startDate: '2024-12-15',
        endDate: '2024-12-25',
        minPrice: true,
        status: 'active',
        joined: true
    },
];

const storeCampaigns = [
    {
        id: 1,
        name: 'خصم 15% على السماعات',
        type: 'تخفيض سعر',
        discount: '15%',
        products: 8,
        sales: 45,
        revenue: '38,250 ج.م',
        status: 'active'
    },
    {
        id: 2,
        name: 'اشتر 2 واحصل على خصم',
        type: 'عرض كمية',
        discount: '20%',
        products: 5,
        sales: 23,
        revenue: '12,650 ج.م',
        status: 'active'
    },
    {
        id: 3,
        name: 'عرض الافتتاح',
        type: 'تخفيض سعر',
        discount: '10%',
        products: 20,
        sales: 156,
        revenue: '78,000 ج.م',
        status: 'ended'
    },
];

export default function Campaigns() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            {/* Page Header */}
            <div className="page-header flex items-center justify-between">
                <div>
                    <h2 className="page-title">الحملات والعروض</h2>
                    <p className="page-subtitle">إدارة حملات المنصة وعروض متجرك</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={18} />
                    إنشاء عرض جديد
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 mb-xl">
                <div className="stats-card">
                    <div className="stats-card-icon primary">
                        <Megaphone size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">حملات نشطة</div>
                        <div className="stats-card-value">3</div>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon success">
                        <ShoppingCart size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">المبيعات من العروض</div>
                        <div className="stats-card-value">224</div>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon info">
                        <TrendingUp size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">إجمالي العائد</div>
                        <div className="stats-card-value">128,900 ج.م</div>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon warning">
                        <Eye size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">الزيارات من العروض</div>
                        <div className="stats-card-value">4,520</div>
                    </div>
                </div>
            </div>

            {/* Platform Campaigns */}
            <div className="card mb-lg">
                <div className="card-header">
                    <h3 className="card-title">حملات المنصة</h3>
                    <span className="badge badge-info">المنصة تتحكم في الحد الأدنى للسعر</span>
                </div>
                <div className="grid grid-cols-2" style={{ gap: 'var(--spacing-lg)' }}>
                    {platformCampaigns.map((campaign) => (
                        <div key={campaign.id} style={{
                            padding: 'var(--spacing-lg)',
                            background: campaign.status === 'active' ? 'var(--success-bg)' : 'var(--bg-secondary)',
                            borderRadius: 'var(--radius-md)',
                            border: `1px solid ${campaign.status === 'active' ? 'var(--success)' : 'var(--border-color)'}`
                        }}>
                            <div className="flex items-center justify-between mb-md">
                                <h4 style={{ fontSize: '18px', fontWeight: '600' }}>{campaign.name}</h4>
                                <span className={`badge badge-${campaign.status === 'active' ? 'success' : 'warning'}`}>
                                    {campaign.status === 'active' ? 'نشط' : 'قادم'}
                                </span>
                            </div>
                            <div className="flex items-center gap-lg mb-md">
                                <div className="flex items-center gap-sm">
                                    <Percent size={16} style={{ color: 'var(--accent-primary)' }} />
                                    <span>خصم {campaign.discount}</span>
                                </div>
                                <div className="flex items-center gap-sm">
                                    <Calendar size={16} style={{ color: 'var(--text-muted)' }} />
                                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                                        {campaign.startDate} - {campaign.endDate}
                                    </span>
                                </div>
                            </div>
                            <button className={`btn ${campaign.joined ? 'btn-success' : 'btn-primary'}`} style={{ width: '100%' }}>
                                {campaign.joined ? (
                                    <>
                                        <CheckCircle size={18} />
                                        منضم للحملة
                                    </>
                                ) : (
                                    <>
                                        <Plus size={18} />
                                        الانضمام للحملة
                                    </>
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Store Campaigns */}
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">عروض متجرك</h3>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>اسم العرض</th>
                                <th>النوع</th>
                                <th>الخصم</th>
                                <th>المنتجات</th>
                                <th>المبيعات</th>
                                <th>العائد</th>
                                <th>الحالة</th>
                                <th>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {storeCampaigns.map((campaign) => (
                                <tr key={campaign.id}>
                                    <td style={{ fontWeight: '500' }}>{campaign.name}</td>
                                    <td>
                                        <span className="badge badge-info">{campaign.type}</span>
                                    </td>
                                    <td style={{ color: 'var(--success)', fontWeight: '600' }}>{campaign.discount}</td>
                                    <td>{campaign.products} منتج</td>
                                    <td>{campaign.sales}</td>
                                    <td style={{ fontWeight: '600' }}>{campaign.revenue}</td>
                                    <td>
                                        <span className={`badge badge-${campaign.status === 'active' ? 'success' : 'danger'}`}>
                                            {campaign.status === 'active' ? 'نشط' : 'منتهي'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-sm">
                                            <button className="btn btn-secondary btn-sm">
                                                <TrendingUp size={14} />
                                            </button>
                                            <button className="btn btn-secondary btn-sm">
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

            {/* Create Campaign Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">إنشاء عرض جديد</h3>
                            <button className="modal-close" onClick={() => setShowModal(false)}>
                                <X size={18} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label className="form-label">اسم العرض</label>
                                <input type="text" className="form-input" placeholder="مثال: خصم 20% على الهواتف" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">نوع العرض</label>
                                <select className="form-select">
                                    <option>تخفيض السعر</option>
                                    <option>خصم على مجموعة منتجات</option>
                                    <option>اشتر أكثر من قطعة</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2" style={{ gap: 'var(--spacing-md)' }}>
                                <div className="form-group">
                                    <label className="form-label">نسبة الخصم</label>
                                    <input type="number" className="form-input" placeholder="15%" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">المنتجات</label>
                                    <select className="form-select">
                                        <option>اختر المنتجات</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">تاريخ البداية</label>
                                    <input type="date" className="form-input" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">تاريخ النهاية</label>
                                    <input type="date" className="form-input" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary">
                                <Plus size={18} />
                                إنشاء العرض
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
