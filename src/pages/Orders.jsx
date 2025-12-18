import { useState } from 'react';
import {
    ShoppingCart,
    Package,
    Truck,
    CheckCircle,
    Clock,
    XCircle,
    Eye,
    MapPin,
    Phone,
    User,
    Calendar,
    X,
    Filter
} from 'lucide-react';

const orders = [
    {
        id: 'ORD-2024-78432',
        customer: 'أحمد محمد علي',
        phone: '+20 123 456 7890',
        address: 'شارع التحرير، الدقي، الجيزة',
        products: [
            { name: 'هاتف سامسونج Galaxy S24', qty: 1, price: 45000 },
        ],
        total: 45000,
        shippingType: 'platform_full',
        status: 'new',
        date: '2024-12-18 10:30',
        paymentMethod: 'الدفع عند الاستلام'
    },
    {
        id: 'ORD-2024-78431',
        customer: 'سارة محمود',
        phone: '+20 111 222 3333',
        address: 'مدينة نصر، القاهرة',
        products: [
            { name: 'سماعات AirPods Pro', qty: 2, price: 8500 },
            { name: 'شاحن لاسلكي', qty: 1, price: 450 },
        ],
        total: 17450,
        shippingType: 'platform_ship',
        status: 'processing',
        date: '2024-12-18 09:15',
        paymentMethod: 'بطاقة ائتمان'
    },
    {
        id: 'ORD-2024-78430',
        customer: 'محمد أحمد',
        phone: '+20 100 200 3000',
        address: 'المعادي، القاهرة',
        products: [
            { name: 'ساعة Huawei GT4', qty: 1, price: 6500 },
        ],
        total: 6500,
        shippingType: 'self_ship',
        status: 'shipping',
        date: '2024-12-17 16:45',
        paymentMethod: 'الدفع عند الاستلام'
    },
    {
        id: 'ORD-2024-78429',
        customer: 'فاطمة حسن',
        phone: '+20 155 666 7777',
        address: '6 أكتوبر، الجيزة',
        products: [
            { name: 'حافظة هاتف جلد', qty: 3, price: 350 },
        ],
        total: 1050,
        shippingType: 'platform_full',
        status: 'completed',
        date: '2024-12-16 14:20',
        paymentMethod: 'محفظة إلكترونية'
    },
    {
        id: 'ORD-2024-78428',
        customer: 'علي محمود',
        phone: '+20 122 333 4444',
        address: 'الإسكندرية',
        products: [
            { name: 'شاحن لاسلكي', qty: 2, price: 450 },
        ],
        total: 900,
        shippingType: 'self_ship',
        status: 'cancelled',
        date: '2024-12-15 11:00',
        paymentMethod: 'الدفع عند الاستلام'
    },
];

const statusConfig = {
    new: { label: 'جديد', color: 'info', icon: Package },
    processing: { label: 'تحت التجهيز', color: 'warning', icon: Clock },
    shipping: { label: 'في النقل', color: 'primary', icon: Truck },
    completed: { label: 'مكتمل', color: 'success', icon: CheckCircle },
    cancelled: { label: 'ملغي', color: 'danger', icon: XCircle },
};

const shippingTypes = {
    platform_full: { label: 'بيع وشحن عبر المنصة', color: 'success' },
    platform_ship: { label: 'بيع مباشر + شحن المنصة', color: 'info' },
    self_ship: { label: 'بيع وشحن ذاتي', color: 'warning' },
};

const statusFilters = [
    { id: 'all', label: 'الكل' },
    { id: 'new', label: 'جديد' },
    { id: 'processing', label: 'تحت التجهيز' },
    { id: 'shipping', label: 'في النقل' },
    { id: 'completed', label: 'مكتمل' },
    { id: 'cancelled', label: 'ملغي' },
];

export default function Orders() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const filteredOrders = activeFilter === 'all'
        ? orders
        : orders.filter(o => o.status === activeFilter);

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h2 className="page-title">الطلبات والشحن</h2>
                <p className="page-subtitle">إدارة ومتابعة طلبات العملاء</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-5 mb-xl">
                <div className="stats-card">
                    <div className="stats-card-icon info">
                        <Package size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">طلبات جديدة</div>
                        <div className="stats-card-value">24</div>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon warning">
                        <Clock size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">تحت التجهيز</div>
                        <div className="stats-card-value">18</div>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon primary">
                        <Truck size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">في النقل</div>
                        <div className="stats-card-value">42</div>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon success">
                        <CheckCircle size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">مكتمل</div>
                        <div className="stats-card-value">156</div>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon danger">
                        <XCircle size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">ملغي</div>
                        <div className="stats-card-value">8</div>
                    </div>
                </div>
            </div>

            {/* Shipping Types Info */}
            <div className="card mb-lg">
                <div className="card-header">
                    <h3 className="card-title">أنماط الشحن</h3>
                </div>
                <div className="grid grid-cols-3">
                    <div style={{ padding: 'var(--spacing-md)', background: 'var(--success-bg)', borderRadius: 'var(--radius-md)' }}>
                        <h4 style={{ color: 'var(--success)', marginBottom: 'var(--spacing-sm)' }}>بيع وشحن عبر المنصة</h4>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                            التاجر يسلم البضاعة لمخازن المنصة، والمنصة تتولى كل شيء (التجهيز والشحن)
                        </p>
                    </div>
                    <div style={{ padding: 'var(--spacing-md)', background: 'var(--info-bg)', borderRadius: 'var(--radius-md)' }}>
                        <h4 style={{ color: 'var(--info)', marginBottom: 'var(--spacing-sm)' }}>بيع مباشر + شحن المنصة</h4>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                            التاجر يستلم الطلب ويجهز، ثم المنصة تتولى النقل والتسليم
                        </p>
                    </div>
                    <div style={{ padding: 'var(--spacing-md)', background: 'var(--warning-bg)', borderRadius: 'var(--radius-md)' }}>
                        <h4 style={{ color: 'var(--warning)', marginBottom: 'var(--spacing-sm)' }}>بيع وشحن ذاتي</h4>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                            التاجر يشحن بنفسه ويتحمل كامل المسئولية
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="card mb-lg">
                <div className="flex items-center gap-md">
                    <Filter size={18} style={{ color: 'var(--text-muted)' }} />
                    <div className="flex gap-sm">
                        {statusFilters.map((filter) => (
                            <button
                                key={filter.id}
                                className={`chart-filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                                onClick={() => setActiveFilter(filter.id)}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="card">
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>رقم الطلب</th>
                                <th>العميل</th>
                                <th>المنتجات</th>
                                <th>الإجمالي</th>
                                <th>نوع الشحن</th>
                                <th>الحالة</th>
                                <th>التاريخ</th>
                                <th>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => {
                                const status = statusConfig[order.status];
                                const shipping = shippingTypes[order.shippingType];
                                return (
                                    <tr key={order.id}>
                                        <td style={{ fontFamily: 'monospace', fontWeight: '600' }}>{order.id}</td>
                                        <td>
                                            <div>
                                                <p style={{ fontWeight: '500' }}>{order.customer}</p>
                                                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{order.phone}</p>
                                            </div>
                                        </td>
                                        <td>
                                            {order.products.map((p, i) => (
                                                <p key={i} style={{ fontSize: '13px' }}>{p.name} × {p.qty}</p>
                                            ))}
                                        </td>
                                        <td style={{ fontWeight: '600', color: 'var(--success)' }}>
                                            {order.total.toLocaleString('ar-EG')} ج.م
                                        </td>
                                        <td>
                                            <span className={`badge badge-${shipping.color}`}>{shipping.label}</span>
                                        </td>
                                        <td>
                                            <span className={`badge badge-${status.color}`}>
                                                <status.icon size={12} />
                                                {status.label}
                                            </span>
                                        </td>
                                        <td style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{order.date}</td>
                                        <td>
                                            <button
                                                className="btn btn-secondary btn-sm"
                                                onClick={() => setSelectedOrder(order)}
                                            >
                                                <Eye size={14} />
                                                عرض
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
                    <div className="modal" style={{ maxWidth: '700px' }} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">تفاصيل الطلب: {selectedOrder.id}</h3>
                            <button className="modal-close" onClick={() => setSelectedOrder(null)}>
                                <X size={18} />
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* Status */}
                            <div className="flex items-center justify-between mb-lg" style={{ padding: 'var(--spacing-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                                <span style={{ color: 'var(--text-muted)' }}>حالة الطلب</span>
                                <span className={`badge badge-${statusConfig[selectedOrder.status].color}`} style={{ fontSize: '14px', padding: '8px 16px' }}>
                                    {React.createElement(statusConfig[selectedOrder.status].icon, { size: 16 })}
                                    {statusConfig[selectedOrder.status].label}
                                </span>
                            </div>

                            {/* Customer Info */}
                            <div className="mb-lg">
                                <h4 style={{ marginBottom: 'var(--spacing-md)' }}>بيانات العميل</h4>
                                <div className="grid grid-cols-2" style={{ gap: 'var(--spacing-md)' }}>
                                    <div className="flex items-center gap-md" style={{ padding: 'var(--spacing-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                                        <User size={18} style={{ color: 'var(--text-muted)' }} />
                                        <div>
                                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>الاسم</p>
                                            <p style={{ fontWeight: '500' }}>{selectedOrder.customer}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-md" style={{ padding: 'var(--spacing-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                                        <Phone size={18} style={{ color: 'var(--text-muted)' }} />
                                        <div>
                                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>الهاتف</p>
                                            <p style={{ fontWeight: '500', direction: 'ltr' }}>{selectedOrder.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-md" style={{ padding: 'var(--spacing-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', gridColumn: 'span 2' }}>
                                        <MapPin size={18} style={{ color: 'var(--text-muted)' }} />
                                        <div>
                                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>العنوان</p>
                                            <p style={{ fontWeight: '500' }}>{selectedOrder.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Products */}
                            <div className="mb-lg">
                                <h4 style={{ marginBottom: 'var(--spacing-md)' }}>المنتجات</h4>
                                {selectedOrder.products.map((product, idx) => (
                                    <div key={idx} className="flex items-center justify-between" style={{ padding: 'var(--spacing-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-sm)' }}>
                                        <div className="flex items-center gap-md">
                                            <div style={{ width: '40px', height: '40px', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Package size={18} style={{ color: 'var(--text-muted)' }} />
                                            </div>
                                            <div>
                                                <p style={{ fontWeight: '500' }}>{product.name}</p>
                                                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>الكمية: {product.qty}</p>
                                            </div>
                                        </div>
                                        <p style={{ fontWeight: '600' }}>{product.price.toLocaleString('ar-EG')} ج.م</p>
                                    </div>
                                ))}
                            </div>

                            {/* Summary */}
                            <div style={{ padding: 'var(--spacing-lg)', background: 'var(--accent-gradient)', borderRadius: 'var(--radius-md)' }}>
                                <div className="flex items-center justify-between">
                                    <span>الإجمالي</span>
                                    <span style={{ fontSize: '24px', fontWeight: '700' }}>{selectedOrder.total.toLocaleString('ar-EG')} ج.م</span>
                                </div>
                                <p style={{ fontSize: '12px', marginTop: '8px', opacity: 0.8 }}>
                                    طريقة الدفع: {selectedOrder.paymentMethod}
                                </p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {selectedOrder.status === 'new' && (
                                <button className="btn btn-warning">
                                    <Clock size={18} />
                                    بدء التجهيز
                                </button>
                            )}
                            {selectedOrder.status === 'processing' && (
                                <button className="btn btn-primary">
                                    <Truck size={18} />
                                    تسليم للشحن
                                </button>
                            )}
                            <button className="btn btn-secondary" onClick={() => setSelectedOrder(null)}>
                                إغلاق
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
