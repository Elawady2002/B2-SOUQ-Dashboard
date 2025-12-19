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
    X,
    Edit,
    BarChart3,
    Users,
    DollarSign,
    Gift,
    Tag
} from 'lucide-react';
import { useState } from 'react';

const platformCampaigns = [
    {
        id: 1,
        name: 'تخفيضات نهاية العام',
        description: 'خصومات على جميع الفئات',
        discount: '30%',
        startDate: '2024-12-20',
        endDate: '2024-12-31',
        minPrice: 'الحد الأدنى: 100 ج.م',
        products: 150,
        status: 'upcoming',
        joined: false
    },
    {
        id: 2,
        name: 'عروض الشتاء',
        description: 'تخفيضات على الملابس والإكسسوارات',
        discount: '25%',
        startDate: '2024-12-15',
        endDate: '2024-12-25',
        minPrice: 'الحد الأدنى: 80 ج.م',
        products: 200,
        status: 'active',
        joined: true
    },
    {
        id: 3,
        name: 'الجمعة البيضاء',
        description: 'أكبر تخفيضات السنة',
        discount: '50%',
        startDate: '2024-11-25',
        endDate: '2024-11-30',
        minPrice: 'الحد الأدنى: 50 ج.م',
        products: 300,
        status: 'ended',
        joined: true
    },
];

const storeCampaigns = [
    {
        id: 1,
        name: 'خصم 15% على السماعات',
        type: 'price_discount',
        typeLabel: 'تخفيض سعر',
        discount: '15%',
        products: 8,
        sales: 45,
        visits: 320,
        revenue: 38250,
        profit: 5400,
        status: 'active',
        startDate: '2024-12-01',
        endDate: '2024-12-31'
    },
    {
        id: 2,
        name: 'اشتر 2 واحصل على خصم 20%',
        type: 'multi_piece',
        typeLabel: 'عرض كمية',
        discount: '20%',
        products: 5,
        sales: 23,
        visits: 180,
        revenue: 12650,
        profit: 1800,
        status: 'active',
        startDate: '2024-12-10',
        endDate: '2024-12-25'
    },
    {
        id: 3,
        name: 'خصم على مجموعة الهواتف',
        type: 'group_discount',
        typeLabel: 'خصم مجموعة',
        discount: '10%',
        products: 12,
        sales: 67,
        visits: 450,
        revenue: 45000,
        profit: 6200,
        status: 'active',
        startDate: '2024-12-05',
        endDate: '2024-12-20'
    },
    {
        id: 4,
        name: 'عرض الافتتاح',
        type: 'price_discount',
        typeLabel: 'تخفيض سعر',
        discount: '10%',
        products: 20,
        sales: 156,
        visits: 890,
        revenue: 78000,
        profit: 9800,
        status: 'ended',
        startDate: '2024-11-01',
        endDate: '2024-11-30'
    },
];

export default function Campaigns() {
    const [showModal, setShowModal] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [showReportModal, setShowReportModal] = useState(false);

    // Calculate totals
    const activeCampaigns = storeCampaigns.filter(c => c.status === 'active').length;
    const totalSales = storeCampaigns.reduce((sum, c) => sum + c.sales, 0);
    const totalRevenue = storeCampaigns.reduce((sum, c) => sum + c.revenue, 0);
    const totalVisits = storeCampaigns.reduce((sum, c) => sum + c.visits, 0);

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
            <div className="grid grid-cols-4 mb-xl" style={{ gap: 'var(--spacing-md)' }}>
                <div style={{
                    padding: '20px',
                    background: '#eff6ff',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid #f1f5f9'
                }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginBottom: '8px' }}>حملات نشطة</div>
                            <div style={{ fontSize: '32px', fontWeight: 700, color: '#3b82f6', lineHeight: 1 }}>{activeCampaigns}</div>
                        </div>
                        <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: 'var(--radius-lg)',
                            background: '#3b82f615',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#3b82f6'
                        }}>
                            <Megaphone size={22} />
                        </div>
                    </div>
                </div>
                <div style={{
                    padding: '20px',
                    background: '#f0fdf4',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid #f1f5f9'
                }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginBottom: '8px' }}>المبيعات من العروض</div>
                            <div style={{ fontSize: '32px', fontWeight: 700, color: '#10b981', lineHeight: 1 }}>{totalSales}</div>
                        </div>
                        <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: 'var(--radius-lg)',
                            background: '#10b98115',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#10b981'
                        }}>
                            <ShoppingCart size={22} />
                        </div>
                    </div>
                </div>
                <div style={{
                    padding: '20px',
                    background: '#faf5ff',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid #f1f5f9'
                }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginBottom: '8px' }}>إجمالي العائد</div>
                            <div style={{ fontSize: '28px', fontWeight: 700, color: '#8b5cf6', lineHeight: 1 }}>
                                {totalRevenue.toLocaleString('ar-EG')}
                                <span style={{ fontSize: '14px', color: '#64748b', marginRight: '4px' }}>ج.م</span>
                            </div>
                        </div>
                        <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: 'var(--radius-lg)',
                            background: '#8b5cf615',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#8b5cf6'
                        }}>
                            <TrendingUp size={22} />
                        </div>
                    </div>
                </div>
                <div style={{
                    padding: '20px',
                    background: '#fffbeb',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid #f1f5f9'
                }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginBottom: '8px' }}>الزيارات من العروض</div>
                            <div style={{ fontSize: '32px', fontWeight: 700, color: '#f59e0b', lineHeight: 1 }}>{totalVisits.toLocaleString('ar-EG')}</div>
                        </div>
                        <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: 'var(--radius-lg)',
                            background: '#f59e0b15',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#f59e0b'
                        }}>
                            <Eye size={22} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Platform Campaigns */}
            <div className="card mb-lg">
                <div className="card-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 className="card-title">حملات المنصة</h3>
                    <span style={{
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-md)',
                        background: '#eff6ff',
                        color: '#3b82f6',
                        fontSize: '12px',
                        fontWeight: 600
                    }}>المنصة تتحكم في الحد الأدنى للسعر</span>
                </div>
                <div className="grid grid-cols-3" style={{ gap: 'var(--spacing-md)', padding: 'var(--spacing-lg)' }}>
                    {platformCampaigns.map((campaign) => (
                        <div key={campaign.id} style={{
                            padding: '20px',
                            background: campaign.status === 'active' ? '#f0fdf4' : campaign.status === 'upcoming' ? '#eff6ff' : '#f8fafc',
                            borderRadius: 'var(--radius-lg)',
                            border: `2px solid ${campaign.status === 'active' ? '#10b981' : campaign.status === 'upcoming' ? '#3b82f6' : '#e2e8f0'}`
                        }}>
                            <div className="flex items-center justify-between mb-md">
                                <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>{campaign.name}</h4>
                                <span style={{
                                    padding: '4px 10px',
                                    borderRadius: 'var(--radius-md)',
                                    background: campaign.status === 'active' ? '#10b981' : campaign.status === 'upcoming' ? '#3b82f6' : '#94a3b8',
                                    color: '#fff',
                                    fontSize: '11px',
                                    fontWeight: 600
                                }}>
                                    {campaign.status === 'active' ? 'نشط' : campaign.status === 'upcoming' ? 'قادم' : 'منتهي'}
                                </span>
                            </div>
                            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>{campaign.description}</p>
                            <div style={{ marginBottom: '16px' }}>
                                <div className="flex items-center gap-sm mb-sm">
                                    <Percent size={16} style={{ color: '#10b981' }} />
                                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#10b981' }}>خصم {campaign.discount}</span>
                                </div>
                                <div className="flex items-center gap-sm mb-sm">
                                    <Calendar size={16} style={{ color: '#64748b' }} />
                                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                                        {campaign.startDate} - {campaign.endDate}
                                    </span>
                                </div>
                                <div className="flex items-center gap-sm mb-sm">
                                    <Tag size={16} style={{ color: '#64748b' }} />
                                    <span style={{ fontSize: '12px', color: '#64748b' }}>{campaign.minPrice}</span>
                                </div>
                                <div className="flex items-center gap-sm">
                                    <Gift size={16} style={{ color: '#64748b' }} />
                                    <span style={{ fontSize: '12px', color: '#64748b' }}>{campaign.products} منتج</span>
                                </div>
                            </div>
                            {campaign.status !== 'ended' && (
                                <button
                                    className={`btn ${campaign.joined ? 'btn-success' : 'btn-primary'}`}
                                    style={{ width: '100%', fontSize: '13px', padding: '10px' }}
                                    disabled={campaign.joined}
                                >
                                    {campaign.joined ? (
                                        <>
                                            <CheckCircle size={16} />
                                            منضم للحملة
                                        </>
                                    ) : (
                                        <>
                                            <Plus size={16} />
                                            الانضمام للحملة
                                        </>
                                    )}
                                </button>
                            )}
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
                                <th>الزيارات</th>
                                <th>العائد</th>
                                <th>تأثير الربح</th>
                                <th>الحالة</th>
                                <th>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {storeCampaigns.map((campaign) => (
                                <tr key={campaign.id}>
                                    <td style={{ fontWeight: '600', fontSize: '14px', color: '#1e293b' }}>{campaign.name}</td>
                                    <td>
                                        <span style={{
                                            padding: '6px 12px',
                                            borderRadius: 'var(--radius-md)',
                                            background: '#eff6ff',
                                            color: '#3b82f6',
                                            fontSize: '12px',
                                            fontWeight: 600
                                        }}>{campaign.typeLabel}</span>
                                    </td>
                                    <td style={{ color: '#10b981', fontWeight: '700', fontSize: '14px' }}>{campaign.discount}</td>
                                    <td style={{ fontSize: '13px', color: '#475569' }}>{campaign.products} منتج</td>
                                    <td style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{campaign.sales}</td>
                                    <td style={{ fontSize: '13px', color: '#475569' }}>{campaign.visits.toLocaleString('ar-EG')}</td>
                                    <td style={{ fontWeight: '700', fontSize: '14px', color: '#8b5cf6' }}>{campaign.revenue.toLocaleString('ar-EG')} ج.م</td>
                                    <td style={{ fontWeight: '700', fontSize: '14px', color: '#10b981' }}>+{campaign.profit.toLocaleString('ar-EG')} ج.م</td>
                                    <td>
                                        <span style={{
                                            padding: '6px 12px',
                                            borderRadius: 'var(--radius-md)',
                                            background: campaign.status === 'active' ? '#f0fdf4' : '#fef2f2',
                                            color: campaign.status === 'active' ? '#10b981' : '#ef4444',
                                            fontSize: '12px',
                                            fontWeight: 600
                                        }}>
                                            {campaign.status === 'active' ? 'نشط' : 'منتهي'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-sm">
                                            <button
                                                className="action-btn action-btn-view"
                                                title="تقرير الحملة"
                                                onClick={() => {
                                                    setSelectedCampaign(campaign);
                                                    setShowReportModal(true);
                                                }}
                                            >
                                                <BarChart3 size={16} />
                                            </button>
                                            <button
                                                className="action-btn action-btn-edit"
                                                title="تعديل"
                                            >
                                                <Edit size={16} />
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
                                    <option value="price_discount">تخفيض السعر</option>
                                    <option value="group_discount">خصم على مجموعة منتجات</option>
                                    <option value="multi_piece">عرض على أكثر من قطعة</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2" style={{ gap: 'var(--spacing-md)' }}>
                                <div className="form-group">
                                    <label className="form-label">نسبة الخصم (%)</label>
                                    <input type="number" className="form-input" placeholder="15" min="1" max="100" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">المنتجات</label>
                                    <select className="form-select">
                                        <option>اختر المنتجات</option>
                                        <option>هاتف سامسونج Galaxy S24</option>
                                        <option>سماعات AirPods Pro</option>
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

            {/* Campaign Report Modal */}
            {showReportModal && selectedCampaign && (
                <div className="modal-overlay" onClick={() => setShowReportModal(false)}>
                    <div className="modal" style={{ maxWidth: '700px' }} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">تقرير الحملة: {selectedCampaign.name}</h3>
                            <button className="modal-close" onClick={() => setShowReportModal(false)}>
                                <X size={18} />
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* Campaign Stats */}
                            <div className="grid grid-cols-2 mb-lg" style={{ gap: 'var(--spacing-md)' }}>
                                <div style={{ padding: 'var(--spacing-md)', background: '#f0fdf4', borderRadius: 'var(--radius-md)' }}>
                                    <div className="flex items-center gap-md">
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: 'var(--radius-md)',
                                            background: '#10b98115',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#10b981'
                                        }}>
                                            <ShoppingCart size={20} />
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '12px', color: '#64748b' }}>المبيعات الناتجة</p>
                                            <p style={{ fontSize: '20px', fontWeight: 700, color: '#10b981' }}>{selectedCampaign.sales}</p>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ padding: 'var(--spacing-md)', background: '#fffbeb', borderRadius: 'var(--radius-md)' }}>
                                    <div className="flex items-center gap-md">
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: 'var(--radius-md)',
                                            background: '#f59e0b15',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#f59e0b'
                                        }}>
                                            <Users size={20} />
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '12px', color: '#64748b' }}>الزيارات</p>
                                            <p style={{ fontSize: '20px', fontWeight: 700, color: '#f59e0b' }}>{selectedCampaign.visits.toLocaleString('ar-EG')}</p>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ padding: 'var(--spacing-md)', background: '#faf5ff', borderRadius: 'var(--radius-md)' }}>
                                    <div className="flex items-center gap-md">
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: 'var(--radius-md)',
                                            background: '#8b5cf615',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#8b5cf6'
                                        }}>
                                            <TrendingUp size={20} />
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '12px', color: '#64748b' }}>العائد</p>
                                            <p style={{ fontSize: '20px', fontWeight: 700, color: '#8b5cf6' }}>{selectedCampaign.revenue.toLocaleString('ar-EG')} ج.م</p>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ padding: 'var(--spacing-md)', background: '#eff6ff', borderRadius: 'var(--radius-md)' }}>
                                    <div className="flex items-center gap-md">
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: 'var(--radius-md)',
                                            background: '#3b82f615',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#3b82f6'
                                        }}>
                                            <DollarSign size={20} />
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '12px', color: '#64748b' }}>تأثير على الربح</p>
                                            <p style={{ fontSize: '20px', fontWeight: 700, color: '#3b82f6' }}>+{selectedCampaign.profit.toLocaleString('ar-EG')} ج.م</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Campaign Details */}
                            <div style={{ padding: 'var(--spacing-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: 'var(--spacing-md)' }}>تفاصيل الحملة</h4>
                                <div className="grid grid-cols-2" style={{ gap: 'var(--spacing-sm)' }}>
                                    <div>
                                        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>نوع العرض</p>
                                        <p style={{ fontWeight: 600 }}>{selectedCampaign.typeLabel}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>نسبة الخصم</p>
                                        <p style={{ fontWeight: 600, color: '#10b981' }}>{selectedCampaign.discount}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>عدد المنتجات</p>
                                        <p style={{ fontWeight: 600 }}>{selectedCampaign.products} منتج</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>الفترة</p>
                                        <p style={{ fontWeight: 600, fontSize: '12px' }}>{selectedCampaign.startDate} - {selectedCampaign.endDate}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowReportModal(false)}>
                                إغلاق
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
