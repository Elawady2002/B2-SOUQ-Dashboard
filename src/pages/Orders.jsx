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
    Filter,
    Store,
    PackageCheck,
    Home
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
            <div className="grid grid-cols-5 mb-xl" style={{ gap: 'var(--spacing-md)' }}>
                <div style={{
                    padding: '20px',
                    background: '#eff6ff',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid #f1f5f9'
                }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginBottom: '8px' }}>طلبات جديدة</div>
                            <div style={{ fontSize: '32px', fontWeight: 700, color: '#3b82f6', lineHeight: 1 }}>24</div>
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
                            <Package size={22} />
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
                            <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginBottom: '8px' }}>تحت التجهيز</div>
                            <div style={{ fontSize: '32px', fontWeight: 700, color: '#f59e0b', lineHeight: 1 }}>18</div>
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
                    background: '#f0f9ff',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid #f1f5f9'
                }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginBottom: '8px' }}>في النقل</div>
                            <div style={{ fontSize: '32px', fontWeight: 700, color: '#0ea5e9', lineHeight: 1 }}>42</div>
                        </div>
                        <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: 'var(--radius-lg)',
                            background: '#0ea5e915',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#0ea5e9'
                        }}>
                            <Truck size={22} />
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
                            <div style={{ fontSize: '32px', fontWeight: 700, color: '#10b981', lineHeight: 1 }}>156</div>
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
                            <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginBottom: '8px' }}>ملغي</div>
                            <div style={{ fontSize: '32px', fontWeight: 700, color: '#ef4444', lineHeight: 1 }}>8</div>
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
                            <XCircle size={22} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Shipping Types Info */}
            <div className="grid grid-cols-3 mb-lg" style={{ gap: 'var(--spacing-md)' }}>
                <div style={{
                    padding: '24px',
                    background: '#f0fdf4',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid #f1f5f9'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: 'var(--radius-lg)',
                            background: '#10b98115',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#10b981'
                        }}>
                            <PackageCheck size={24} />
                        </div>
                        <h4 style={{ color: '#10b981', fontSize: '16px', fontWeight: 600, margin: 0 }}>بيع وشحن عبر المنصة</h4>
                    </div>
                    <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.7', margin: 0 }}>
                        التاجر يسلم البضاعة لمخازن المنصة، والمنصة تتولى التجهيز والشحن والمرتجعات. تسوية الأرباح بعد خصم العمولة.
                    </p>
                </div>
                <div style={{
                    padding: '24px',
                    background: '#eff6ff',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid #f1f5f9'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: 'var(--radius-lg)',
                            background: '#3b82f615',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#3b82f6'
                        }}>
                            <Store size={24} />
                        </div>
                        <h4 style={{ color: '#3b82f6', fontSize: '16px', fontWeight: 600, margin: 0 }}>بيع مباشر + شحن المنصة</h4>
                    </div>
                    <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.7', margin: 0 }}>
                        التاجر يستلم الطلب ويجهز، ثم المنصة تتولى النقل والتسليم. التاجر مسئول عن التأخير والمنصة عن الفشل.
                    </p>
                </div>
                <div style={{
                    padding: '24px',
                    background: '#fffbeb',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid #f1f5f9'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: 'var(--radius-lg)',
                            background: '#f59e0b15',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#f59e0b'
                        }}>
                            <Home size={24} />
                        </div>
                        <h4 style={{ color: '#f59e0b', fontSize: '16px', fontWeight: 600, margin: 0 }}>بيع وشحن ذاتي</h4>
                    </div>
                    <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.7', margin: 0 }}>
                        التاجر يشحن بنفسه ويتحمل كامل المسئولية. المرتجعات تعود إليه مباشرة ولا رسوم شحن من المنصة.
                    </p>
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
                                        <td style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '13px', color: '#475569' }}>{order.id}</td>
                                        <td>
                                            <div>
                                                <p style={{ fontWeight: '600', fontSize: '14px', color: '#1e293b' }}>{order.customer}</p>
                                                <p style={{ fontSize: '12px', color: '#94a3b8' }}>{order.phone}</p>
                                            </div>
                                        </td>
                                        <td>
                                            {order.products.map((p, i) => (
                                                <p key={i} style={{ fontSize: '13px', color: '#475569' }}>{p.name} × {p.qty}</p>
                                            ))}
                                        </td>
                                        <td style={{ fontWeight: '700', fontSize: '15px', color: '#10b981' }}>
                                            {order.total.toLocaleString('en-US')} ج.م
                                        </td>
                                        <td>
                                            <span style={{
                                                padding: '6px 12px',
                                                borderRadius: 'var(--radius-md)',
                                                background: shipping.color === 'success' ? '#f0fdf4' : shipping.color === 'info' ? '#eff6ff' : '#fffbeb',
                                                color: shipping.color === 'success' ? '#10b981' : shipping.color === 'info' ? '#3b82f6' : '#f59e0b',
                                                fontSize: '12px',
                                                fontWeight: 600
                                            }}>{shipping.label}</span>
                                        </td>
                                        <td>
                                            <span className={`badge badge-${status.color}`} style={{ fontSize: '13px' }}>
                                                <status.icon size={14} />
                                                {status.label}
                                            </span>
                                        </td>
                                        <td style={{ fontSize: '13px', color: '#64748b' }}>{order.date}</td>
                                        <td>
                                            <button
                                                className="action-btn action-btn-view"
                                                onClick={() => setSelectedOrder(order)}
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
                            {/* Status & Shipping Type */}
                            <div className="grid grid-cols-2 mb-lg" style={{ gap: 'var(--spacing-md)' }}>
                                <div style={{ padding: 'var(--spacing-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>حالة الطلب</span>
                                    <div style={{ marginTop: '8px' }}>
                                        <span className={`badge badge-${statusConfig[selectedOrder.status].color}`} style={{ fontSize: '14px', padding: '8px 16px' }}>
                                            {React.createElement(statusConfig[selectedOrder.status].icon, { size: 16 })}
                                            {statusConfig[selectedOrder.status].label}
                                        </span>
                                    </div>
                                </div>
                                <div style={{ padding: 'var(--spacing-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>نوع الشحن</span>
                                    <div style={{ marginTop: '8px' }}>
                                        <span style={{
                                            display: 'inline-flex',
                                            padding: '8px 16px',
                                            borderRadius: 'var(--radius-md)',
                                            background: shippingTypes[selectedOrder.shippingType].color === 'success' ? '#f0fdf4' : shippingTypes[selectedOrder.shippingType].color === 'info' ? '#eff6ff' : '#fffbeb',
                                            color: shippingTypes[selectedOrder.shippingType].color === 'success' ? '#10b981' : shippingTypes[selectedOrder.shippingType].color === 'info' ? '#3b82f6' : '#f59e0b',
                                            fontSize: '13px',
                                            fontWeight: 600
                                        }}>
                                            {shippingTypes[selectedOrder.shippingType].label}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Info */}
                            <div className="mb-lg">
                                <h4 style={{ marginBottom: 'var(--spacing-md)', fontSize: '15px', fontWeight: 600 }}>بيانات العميل</h4>
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
                                <h4 style={{ marginBottom: 'var(--spacing-md)', fontSize: '15px', fontWeight: 600 }}>المنتجات</h4>
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
                                        <p style={{ fontWeight: '600' }}>{product.price.toLocaleString('en-US')} ج.م</p>
                                    </div>
                                ))}
                            </div>

                            {/* Summary */}
                            <div style={{ padding: 'var(--spacing-lg)', background: 'var(--accent-gradient)', borderRadius: 'var(--radius-md)' }}>
                                <div className="flex items-center justify-between">
                                    <span>الإجمالي</span>
                                    <span style={{ fontSize: '24px', fontWeight: '700' }}>{selectedOrder.total.toLocaleString('en-US')} ج.م</span>
                                </div>
                                <p style={{ fontSize: '12px', marginTop: '8px', opacity: 0.8 }}>
                                    طريقة الدفع: {selectedOrder.paymentMethod}
                                </p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {/* Platform Full - No actions for merchant */}
                            {selectedOrder.shippingType === 'platform_full' && (
                                <div style={{ padding: '12px', background: '#f0fdf4', borderRadius: 'var(--radius-md)', width: '100%', textAlign: 'center' }}>
                                    <p style={{ fontSize: '13px', color: '#10b981', margin: 0 }}>
                                        <PackageCheck size={16} style={{ display: 'inline', marginLeft: '6px' }} />
                                        المنصة تتولى كل شيء - لا إجراءات مطلوبة
                                    </p>
                                </div>
                            )}

                            {/* Platform Ship - Ready for shipping button */}
                            {selectedOrder.shippingType === 'platform_ship' && selectedOrder.status === 'processing' && (
                                <button className="btn btn-primary">
                                    <Truck size={18} />
                                    جاهز للشحن
                                </button>
                            )}

                            {/* Self Ship - Mark as shipped */}
                            {selectedOrder.shippingType === 'self_ship' && selectedOrder.status === 'processing' && (
                                <button className="btn btn-success">
                                    <CheckCircle size={18} />
                                    تم الشحن
                                </button>
                            )}

                            {/* Common actions */}
                            {selectedOrder.status === 'new' && selectedOrder.shippingType !== 'platform_full' && (
                                <button className="btn btn-warning">
                                    <Clock size={18} />
                                    بدء التجهيز
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
