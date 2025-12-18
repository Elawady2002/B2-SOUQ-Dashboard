import {
    RotateCcw,
    Package,
    Clock,
    CheckCircle,
    XCircle,
    Eye,
    MessageSquare,
    AlertTriangle,
    X
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
        shippingMethod: 'شحن المنصة',
        address: 'المستودع الرئيسي - 6 أكتوبر',
        originalStatus: 'مكتمل',
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
        shippingMethod: 'شحن ذاتي',
        address: 'فرع الدقي',
        originalStatus: 'مكتمل',
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
        shippingMethod: 'شحن المنصة',
        address: 'المستودع الرئيسي',
        originalStatus: 'مكتمل',
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
        shippingMethod: 'شحن المنصة',
        address: 'المستودع الرئيسي',
        originalStatus: 'مكتمل',
        date: '2024-12-10'
    },
];

const statusConfig = {
    pending: { label: 'قيد المراجعة', color: 'warning', icon: Clock },
    approved: { label: 'تمت الموافقة', color: 'info', icon: CheckCircle },
    rejected: { label: 'مرفوض', color: 'danger', icon: XCircle },
    completed: { label: 'مكتمل', color: 'success', icon: CheckCircle },
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
            <div className="grid grid-cols-4 mb-xl">
                <div className="stats-card">
                    <div className="stats-card-icon warning">
                        <Clock size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">قيد المراجعة</div>
                        <div className="stats-card-value">5</div>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon info">
                        <RotateCcw size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">في الطريق</div>
                        <div className="stats-card-value">3</div>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon success">
                        <CheckCircle size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">مكتمل</div>
                        <div className="stats-card-value">28</div>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon danger">
                        <AlertTriangle size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">نزاعات مفتوحة</div>
                        <div className="stats-card-value">2</div>
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
                                <th>الحالة</th>
                                <th>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {returns.map((item) => {
                                const status = statusConfig[item.status];
                                return (
                                    <tr key={item.id}>
                                        <td>
                                            <div>
                                                <p style={{ fontFamily: 'monospace', fontWeight: '600' }}>{item.id}</p>
                                                <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.orderId}</p>
                                            </div>
                                        </td>
                                        <td style={{ fontWeight: '500' }}>{item.product}</td>
                                        <td style={{ fontFamily: 'monospace', fontSize: '12px' }}>{item.sku}</td>
                                        <td>{item.category}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.unitPrice.toLocaleString('ar-EG')} ج.م</td>
                                        <td style={{ fontWeight: '600', color: 'var(--danger)' }}>{item.total.toLocaleString('ar-EG')} ج.م</td>
                                        <td>
                                            <span className="badge badge-warning">{item.reason}</span>
                                        </td>
                                        <td>
                                            <span className={`badge badge-${status.color}`}>
                                                <status.icon size={12} />
                                                {status.label}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-sm">
                                                <button className="btn btn-secondary btn-sm" onClick={() => setSelectedReturn(item)}>
                                                    <Eye size={14} />
                                                </button>
                                                <button className="btn btn-secondary btn-sm">
                                                    <MessageSquare size={14} />
                                                </button>
                                            </div>
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
                    <div className="modal" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">تفاصيل طلب الإرجاع</h3>
                            <button className="modal-close" onClick={() => setSelectedReturn(null)}>
                                <X size={18} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="grid grid-cols-2" style={{ gap: 'var(--spacing-md)' }}>
                                <div style={{ padding: 'var(--spacing-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>رقم الإرجاع</p>
                                    <p style={{ fontWeight: '600' }}>{selectedReturn.id}</p>
                                </div>
                                <div style={{ padding: 'var(--spacing-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>رقم الطلب الأصلي</p>
                                    <p style={{ fontWeight: '600' }}>{selectedReturn.orderId}</p>
                                </div>
                                <div style={{ padding: 'var(--spacing-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', gridColumn: 'span 2' }}>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>المنتج</p>
                                    <p style={{ fontWeight: '600' }}>{selectedReturn.product}</p>
                                </div>
                                <div style={{ padding: 'var(--spacing-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>سبب الإرجاع</p>
                                    <p style={{ fontWeight: '600', color: 'var(--warning)' }}>{selectedReturn.reason}</p>
                                </div>
                                <div style={{ padding: 'var(--spacing-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>المبلغ</p>
                                    <p style={{ fontWeight: '600', color: 'var(--danger)' }}>{selectedReturn.total.toLocaleString('ar-EG')} ج.م</p>
                                </div>
                                <div style={{ padding: 'var(--spacing-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', gridColumn: 'span 2' }}>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>عنوان الاستلام</p>
                                    <p style={{ fontWeight: '600' }}>{selectedReturn.address}</p>
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
