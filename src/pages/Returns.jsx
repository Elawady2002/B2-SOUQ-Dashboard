import {
    RotateCcw,
    Package,
    Clock,
    CheckCircle,
    XCircle,
    Eye,
    MessageSquare,
    AlertTriangle,
    X,
    MapPin,
    Truck,
    Home
} from 'lucide-react';
import { useState } from 'react';

const returns = [
    {
        id: 'RET-2024-001',
        orderId: 'ORD-2024-78432',
        product: 'هاتف سامسونج Galaxy S24',
        sku: 'SAM-S24U-256',
        category: 'هواتف',
        quantity: 1,
        unitPrice: 45000,
        total: 45000,
        reason: 'عيب صناعة',
        status: 'pending',
        shippingMethod: 'platform_ship',
        address: 'المستودع الرئيسي - 6 أكتوبر، الجيزة',
        originalStatus: 'completed',
        date: '2024-12-18'
    },
    {
        id: 'RET-2024-002',
        orderId: 'ORD-2024-78430',
        product: 'سماعات AirPods Pro',
        sku: 'APL-APP2-WHT',
        category: 'سماعات',
        quantity: 1,
        unitPrice: 8500,
        total: 8500,
        reason: 'لا يعمل',
        status: 'approved',
        shippingMethod: 'self_ship',
        address: 'فرع الدقي - شارع التحرير، الدقي، الجيزة',
        originalStatus: 'completed',
        date: '2024-12-17'
    },
    {
        id: 'RET-2024-003',
        orderId: 'ORD-2024-78425',
        product: 'شاحن لاسلكي',
        sku: 'CHR-WLS-15W',
        category: 'اكسسوارات',
        quantity: 2,
        unitPrice: 450,
        total: 900,
        reason: 'غيرت رأيي',
        status: 'rejected',
        shippingMethod: 'platform_ship',
        address: 'المستودع الرئيسي - 6 أكتوبر، الجيزة',
        originalStatus: 'completed',
        date: '2024-12-15'
    },
    {
        id: 'RET-2024-004',
        orderId: 'ORD-2024-78420',
        product: 'ساعة Huawei GT4',
        sku: 'HUA-WGT4-BLK',
        category: 'ساعات ذكية',
        quantity: 1,
        unitPrice: 6500,
        total: 6500,
        reason: 'منتج مختلف عن الوصف',
        status: 'completed',
        shippingMethod: 'platform_full',
        address: 'المستودع الرئيسي - 6 أكتوبر، الجيزة',
        originalStatus: 'completed',
        date: '2024-12-10'
    },
];

const statusConfig = {
    pending: { label: 'قيد المراجعة', color: '#f59e0b', bgColor: '#fffbeb', icon: Clock },
    approved: { label: 'تمت الموافقة', color: '#3b82f6', bgColor: '#eff6ff', icon: CheckCircle },
    rejected: { label: 'مرفوض', color: '#ef4444', bgColor: '#fef2f2', icon: XCircle },
    completed: { label: 'مكتمل', color: '#10b981', bgColor: '#f0fdf4', icon: CheckCircle },
};

const shippingMethods = {
    platform_full: { label: 'شحن المنصة', icon: Package, color: '#10b981' },
    platform_ship: { label: 'شحن المنصة', icon: Truck, color: '#3b82f6' },
    self_ship: { label: 'شحن ذاتي', icon: Home, color: '#f59e0b' },
};

const originalStatusConfig = {
    completed: { label: 'مكتمل', color: '#10b981' },
    cancelled: { label: 'ملغي', color: '#ef4444' },
};

export default function Returns() {
    const [selectedReturn, setSelectedReturn] = useState(null);

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h2 className="page-title">المرتجعات والنزاعات</h2>
                <p className="page-subtitle">إدارة طلبات الإرجاع والنزاعات مع العملاء</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 mb-xl" style={{ gap: 'var(--spacing-md)' }}>
                <div style={{
                    padding: '20px',
                    background: '#fffbeb',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid #f1f5f9'
                }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginBottom: '8px' }}>قيد المراجعة</div>
                            <div style={{ fontSize: '32px', fontWeight: 700, color: '#f59e0b', lineHeight: 1 }}>5</div>
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
                            <Clock size={22} />
                        </div>
                    </div>
                </div>
                <div style={{
                    padding: '20px',
                    background: '#eff6ff',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid #f1f5f9'
                }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginBottom: '8px' }}>في الطريق</div>
                            <div style={{ fontSize: '32px', fontWeight: 700, color: '#3b82f6', lineHeight: 1 }}>3</div>
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
                            <RotateCcw size={22} />
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
                            <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginBottom: '8px' }}>مكتمل</div>
                            <div style={{ fontSize: '32px', fontWeight: 700, color: '#10b981', lineHeight: 1 }}>28</div>
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
                            <CheckCircle size={22} />
                        </div>
                    </div>
                </div>
                <div style={{
                    padding: '20px',
                    background: '#fef2f2',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid #f1f5f9'
                }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginBottom: '8px' }}>نزاعات مفتوحة</div>
                            <div style={{ fontSize: '32px', fontWeight: 700, color: '#ef4444', lineHeight: 1 }}>2</div>
                        </div>
                        <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: 'var(--radius-lg)',
                            background: '#ef444415',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ef4444'
                        }}>
                            <AlertTriangle size={22} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Returns Table */}
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">جدول طلبات الإرجاع</h3>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>رقم الطلب</th>
                                <th>المنتج</th>
                                <th>SKU</th>
                                <th>الفئة</th>
                                <th>الكمية</th>
                                <th>السعر/وحدة</th>
                                <th>الإجمالي</th>
                                <th>سبب الإرجاع</th>
                                <th>حالة الإرجاع</th>
                                <th>طريقة الشحن</th>
                                <th>العنوان</th>
                                <th>حالة الطلب</th>
                                <th>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {returns.map((item) => {
                                const status = statusConfig[item.status];
                                const shipping = shippingMethods[item.shippingMethod];
                                const originalStatus = originalStatusConfig[item.originalStatus];
                                return (
                                    <tr key={item.id}>
                                        <td>
                                            <div>
                                                <p style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '13px', color: '#475569' }}>{item.id}</p>
                                                <p style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }}>{item.orderId}</p>
                                            </div>
                                        </td>
                                        <td style={{ fontWeight: '600', fontSize: '14px', color: '#1e293b' }}>{item.product}</td>
                                        <td style={{ fontFamily: 'monospace', fontSize: '13px', color: '#64748b' }}>{item.sku}</td>
                                        <td style={{ fontSize: '13px', color: '#475569' }}>{item.category}</td>
                                        <td style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{item.quantity}</td>
                                        <td style={{ fontSize: '13px', color: '#475569' }}>{item.unitPrice.toLocaleString('en-US')} ج.م</td>
                                        <td style={{ fontWeight: '700', fontSize: '15px', color: '#ef4444' }}>{item.total.toLocaleString('en-US')} ج.م</td>
                                        <td>
                                            <span style={{
                                                padding: '6px 12px',
                                                borderRadius: 'var(--radius-md)',
                                                background: '#fffbeb',
                                                color: '#f59e0b',
                                                fontSize: '12px',
                                                fontWeight: 600
                                            }}>{item.reason}</span>
                                        </td>
                                        <td>
                                            <span style={{
                                                padding: '6px 12px',
                                                borderRadius: 'var(--radius-md)',
                                                background: status.bgColor,
                                                color: status.color,
                                                fontSize: '12px',
                                                fontWeight: 600,
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}>
                                                <status.icon size={14} />
                                                {status.label}
                                            </span>
                                        </td>
                                        <td>
                                            <span style={{
                                                padding: '6px 12px',
                                                borderRadius: 'var(--radius-md)',
                                                background: `${shipping.color}15`,
                                                color: shipping.color,
                                                fontSize: '12px',
                                                fontWeight: 600,
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}>
                                                <shipping.icon size={14} />
                                                {shipping.label}
                                            </span>
                                        </td>
                                        <td style={{ fontSize: '13px', color: '#64748b', maxWidth: '200px' }}>{item.address}</td>
                                        <td>
                                            <span style={{
                                                padding: '6px 12px',
                                                borderRadius: 'var(--radius-md)',
                                                background: `${originalStatus.color}15`,
                                                color: originalStatus.color,
                                                fontSize: '12px',
                                                fontWeight: 600
                                            }}>{originalStatus.label}</span>
                                        </td>
                                        <td>
                                            <button
                                                className="action-btn action-btn-view"
                                                onClick={() => setSelectedReturn(item)}
                                                style={{ padding: '8px', minWidth: '40px' }}
                                                title="عرض التفاصيل"
                                            >
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Return Details Modal */}
            {selectedReturn && (
                <div className="modal-overlay" onClick={() => setSelectedReturn(null)}>
                    <div className="modal" style={{ maxWidth: '700px' }} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">تفاصيل طلب الإرجاع: {selectedReturn.id}</h3>
                            <button className="modal-close" onClick={() => setSelectedReturn(null)}>
                                <X size={18} />
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* Status & Shipping */}
                            <div className="grid grid-cols-2 mb-lg" style={{ gap: 'var(--spacing-md)' }}>
                                <div style={{ padding: 'var(--spacing-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>حالة الإرجاع</span>
                                    <div style={{ marginTop: '8px' }}>
                                        <span style={{
                                            padding: '8px 16px',
                                            borderRadius: 'var(--radius-md)',
                                            background: statusConfig[selectedReturn.status].bgColor,
                                            color: statusConfig[selectedReturn.status].color,
                                            fontSize: '13px',
                                            fontWeight: 600,
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '6px'
                                        }}>
                                            {React.createElement(statusConfig[selectedReturn.status].icon, { size: 16 })}
                                            {statusConfig[selectedReturn.status].label}
                                        </span>
                                    </div>
                                </div>
                                <div style={{ padding: 'var(--spacing-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>طريقة الشحن</span>
                                    <div style={{ marginTop: '8px' }}>
                                        <span style={{
                                            padding: '8px 16px',
                                            borderRadius: 'var(--radius-md)',
                                            background: `${shippingMethods[selectedReturn.shippingMethod].color}15`,
                                            color: shippingMethods[selectedReturn.shippingMethod].color,
                                            fontSize: '13px',
                                            fontWeight: 600,
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '6px'
                                        }}>
                                            {React.createElement(shippingMethods[selectedReturn.shippingMethod].icon, { size: 16 })}
                                            {shippingMethods[selectedReturn.shippingMethod].label}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Order Info */}
                            <div className="mb-lg">
                                <h4 style={{ marginBottom: 'var(--spacing-md)', fontSize: '15px', fontWeight: 600 }}>معلومات الطلب</h4>
                                <div className="grid grid-cols-2" style={{ gap: 'var(--spacing-md)' }}>
                                    <div style={{ padding: 'var(--spacing-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                                        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>رقم الإرجاع</p>
                                        <p style={{ fontWeight: '600', fontFamily: 'monospace' }}>{selectedReturn.id}</p>
                                    </div>
                                    <div style={{ padding: 'var(--spacing-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                                        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>رقم الطلب الأصلي</p>
                                        <p style={{ fontWeight: '600', fontFamily: 'monospace' }}>{selectedReturn.orderId}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="mb-lg">
                                <h4 style={{ marginBottom: 'var(--spacing-md)', fontSize: '15px', fontWeight: 600 }}>معلومات المنتج</h4>
                                <div style={{ padding: 'var(--spacing-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                                    <div className="flex items-center gap-md mb-md">
                                        <div style={{ width: '50px', height: '50px', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Package size={24} style={{ color: 'var(--text-muted)' }} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontWeight: '600', fontSize: '15px' }}>{selectedReturn.product}</p>
                                            <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>SKU: {selectedReturn.sku}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3" style={{ gap: 'var(--spacing-sm)' }}>
                                        <div>
                                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>الفئة</p>
                                            <p style={{ fontWeight: '500' }}>{selectedReturn.category}</p>
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>الكمية</p>
                                            <p style={{ fontWeight: '600' }}>{selectedReturn.quantity}</p>
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>السعر</p>
                                            <p style={{ fontWeight: '600', color: 'var(--danger)' }}>{selectedReturn.total.toLocaleString('en-US')} ج.م</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Return Reason & Address */}
                            <div className="grid grid-cols-2 mb-lg" style={{ gap: 'var(--spacing-md)' }}>
                                <div style={{ padding: 'var(--spacing-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>سبب الإرجاع</p>
                                    <p style={{ fontWeight: '600', color: 'var(--warning)' }}>{selectedReturn.reason}</p>
                                </div>
                                <div style={{ padding: 'var(--spacing-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>التاريخ</p>
                                    <p style={{ fontWeight: '600' }}>{selectedReturn.date}</p>
                                </div>
                            </div>

                            {/* Address */}
                            <div style={{ padding: 'var(--spacing-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                                <div className="flex items-center gap-md">
                                    <MapPin size={18} style={{ color: 'var(--text-muted)' }} />
                                    <div>
                                        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>عنوان الاستلام</p>
                                        <p style={{ fontWeight: '600' }}>{selectedReturn.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {selectedReturn.status === 'pending' && (
                                <>
                                    <button className="btn btn-success">
                                        <CheckCircle size={18} />
                                        قبول الإرجاع
                                    </button>
                                    <button className="btn btn-danger">
                                        <XCircle size={18} />
                                        رفض
                                    </button>
                                </>
                            )}
                            <button className="btn btn-secondary" onClick={() => setSelectedReturn(null)}>
                                إغلاق
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
