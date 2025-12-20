import { useState } from 'react';
import {
    Package,
    Plus,
    Search,
    Filter,
    CheckCircle,
    Clock,
    XCircle,
    AlertTriangle,
    Pause,
    TrendingUp,
    ShoppingCart,
    RotateCcw,
    Star,
    X,
    Upload,
    Image
} from 'lucide-react';

// Custom action icons
import DeleteIcon from '../assets/icons/delete.svg';
import EditIcon from '../assets/icons/edit.svg';
import EyesIcon from '../assets/icons/eyes.svg';

const products = [
    {
        id: 1,
        name: 'هاتف سامسونج Galaxy S24 Ultra',
        sku: 'SAM-S24U-256',
        category: 'هواتف',
        price: 45000,
        quantity: 25,
        shipping: 'شحن المنصة',
        sales: 145,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=100&h=100&fit=crop'
    },
    {
        id: 2,
        name: 'سماعات Apple AirPods Pro 2',
        sku: 'APL-APP2-WHT',
        category: 'سماعات',
        price: 8500,
        quantity: 5,
        shipping: 'شحن ذاتي',
        sales: 98,
        status: 'low_stock',
        image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=100&h=100&fit=crop'
    },
    {
        id: 3,
        name: 'ساعة Huawei Watch GT4',
        sku: 'HUA-WGT4-BLK',
        category: 'ساعات ذكية',
        price: 6500,
        quantity: 0,
        shipping: 'شحن المنصة',
        sales: 76,
        status: 'out_of_stock',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop'
    },
    {
        id: 4,
        name: 'شاحن لاسلكي سريع 15W',
        sku: 'CHR-WLS-15W',
        category: 'اكسسوارات',
        price: 450,
        quantity: 150,
        shipping: 'شحن المنصة',
        sales: 234,
        status: 'pending_review',
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100&h=100&fit=crop'
    },
    {
        id: 5,
        name: 'حافظة هاتف جلد طبيعي',
        sku: 'CSE-LTH-BRN',
        category: 'اكسسوارات',
        price: 350,
        quantity: 80,
        shipping: 'شحن ذاتي',
        sales: 312,
        status: 'rejected',
        image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=100&h=100&fit=crop'
    },
];


const statusConfig = {
    active: { label: 'نشط', color: 'success', icon: CheckCircle },
    pending_review: { label: 'تحت المراجعة', color: 'warning', icon: Clock },
    rejected: { label: 'مرفوض', color: 'danger', icon: XCircle },
    low_stock: { label: 'منخفض المخزون', color: 'warning', icon: AlertTriangle },
    out_of_stock: { label: 'نفذ المخزون', color: 'danger', icon: AlertTriangle },
    suspended: { label: 'موقوف', color: 'danger', icon: Pause },
};

const filters = [
    { id: 'all', label: 'الكل', count: 5 },
    { id: 'active', label: 'نشط', count: 1 },
    { id: 'pending_review', label: 'تحت المراجعة', count: 1 },
    { id: 'rejected', label: 'مرفوض', count: 1 },
    { id: 'low_stock', label: 'منخفض المخزون', count: 1 },
    { id: 'out_of_stock', label: 'نفذ المخزون', count: 1 },
];

export default function Products() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [showAnalytics, setShowAnalytics] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const filteredProducts = activeFilter === 'all'
        ? products
        : products.filter(p => p.status === activeFilter);

    return (
        <div>
            {/* Page Header */}
            <div className="page-header flex items-center justify-between">
                <div>
                    <h2 className="page-title">المنتجات</h2>
                    <p className="page-subtitle">إدارة منتجات متجرك</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={18} />
                    إضافة منتج
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-5 mb-xl">
                <div className="stats-card">
                    <div className="stats-card-icon primary">
                        <Package size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">إجمالي المنتجات</div>
                        <div className="stats-card-value">156</div>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon success">
                        <CheckCircle size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">منتجات نشطة</div>
                        <div className="stats-card-value">142</div>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon warning">
                        <Clock size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">تحت المراجعة</div>
                        <div className="stats-card-value">8</div>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon danger">
                        <AlertTriangle size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">منخفض المخزون</div>
                        <div className="stats-card-value">12</div>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon danger">
                        <XCircle size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">مرفوض</div>
                        <div className="stats-card-value">3</div>
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="card mb-lg">
                <div className="flex items-center justify-between gap-lg" style={{ flexWrap: 'wrap' }}>
                    {/* Status Filters */}
                    <div className="flex gap-sm" style={{ flexWrap: 'wrap' }}>
                        {filters.map((filter) => (
                            <button
                                key={filter.id}
                                className={`chart-filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                                onClick={() => setActiveFilter(filter.id)}
                            >
                                {filter.label} ({filter.count})
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="header-search">
                        <Search className="header-search-icon" size={18} />
                        <input type="text" placeholder="بحث عن منتج..." />
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="card">
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>المنتج</th>
                                <th>SKU</th>
                                <th>الفئة</th>
                                <th>السعر</th>
                                <th>الكمية</th>
                                <th>طريقة الشحن</th>
                                <th>المبيعات</th>
                                <th>الحالة</th>
                                <th>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => {
                                const status = statusConfig[product.status];
                                return (
                                    <tr key={product.id}>
                                        <td>
                                            <div className="flex items-center gap-md">
                                                {product.image ? (
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        style={{
                                                            width: '50px',
                                                            height: '50px',
                                                            borderRadius: 'var(--radius-md)',
                                                            objectFit: 'cover'
                                                        }}
                                                    />
                                                ) : (
                                                    <div style={{
                                                        width: '50px',
                                                        height: '50px',
                                                        background: 'var(--bg-secondary)',
                                                        borderRadius: 'var(--radius-md)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <Package size={20} style={{ color: 'var(--text-muted)' }} />
                                                    </div>
                                                )}
                                                <span style={{ fontWeight: '500' }}>{product.name}</span>
                                            </div>
                                        </td>
                                        <td style={{ fontFamily: 'monospace', fontSize: '13px' }}>{product.sku}</td>
                                        <td>{product.category}</td>
                                        <td style={{ fontWeight: '600' }}>{product.price.toLocaleString('en-US')} ج.م</td>
                                        <td>
                                            <span style={{
                                                color: product.quantity <= 5 ? 'var(--danger)' :
                                                    product.quantity <= 20 ? 'var(--warning)' : 'var(--success)',
                                                fontWeight: '600'
                                            }}>
                                                {product.quantity}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="badge badge-info">{product.shipping}</span>
                                        </td>
                                        <td>{product.sales}</td>
                                        <td>
                                            <span className={`badge badge-${status.color}`}>
                                                <status.icon size={12} />
                                                {status.label}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-md">
                                                <button
                                                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4 }}
                                                    title="عرض"
                                                    onClick={() => {
                                                        setSelectedProduct(product);
                                                        setShowAnalytics(true);
                                                    }}
                                                >
                                                    <img src={EyesIcon} alt="عرض" style={{ width: 20, height: 20 }} />
                                                </button>
                                                <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4 }} title="تعديل">
                                                    <img src={EditIcon} alt="تعديل" style={{ width: 20, height: 20 }} />
                                                </button>
                                                <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4 }} title="حذف">
                                                    <img src={DeleteIcon} alt="حذف" style={{ width: 20, height: 20 }} />
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

            {/* Add Product Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" style={{ maxWidth: '800px' }} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">إضافة منتج جديد</h3>
                            <button className="modal-close" onClick={() => setShowModal(false)}>
                                <X size={18} />
                            </button>
                        </div>
                        <div className="modal-body" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            <style>{`
                                .modal-body::-webkit-scrollbar {
                                    display: none;
                                }
                            `}</style>
                            <h4 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--accent-primary)' }}>أ. بيانات أساسية</h4>
                            <div className="grid grid-cols-2" style={{ gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)' }}>
                                <div className="form-group">
                                    <label className="form-label">اسم المنتج</label>
                                    <input type="text" className="form-input" placeholder="أدخل اسم المنتج" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">كود SKU</label>
                                    <input type="text" className="form-input" placeholder="XXX-XXX-XXX" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">الفئة الرئيسية</label>
                                    <select className="form-select">
                                        <option value="">اختر الفئة</option>
                                        <option>هواتف</option>
                                        <option>سماعات</option>
                                        <option>ساعات ذكية</option>
                                        <option>اكسسوارات</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">الفئة الفرعية</label>
                                    <select className="form-select">
                                        <option value="">اختر الفئة الفرعية</option>
                                    </select>
                                </div>
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="form-label">الكلمات المفتاحية</label>
                                    <input type="text" className="form-input" placeholder="هاتف, سامسونج, جالاكسي" />
                                </div>
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="form-label">وصف المنتج</label>
                                    <textarea className="form-textarea" placeholder="اكتب وصف تفصيلي للمنتج..."></textarea>
                                </div>
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="form-label">صور المنتج</label>
                                    <div style={{
                                        border: '2px dashed var(--border-color)',
                                        borderRadius: 'var(--radius-md)',
                                        padding: 'var(--spacing-xl)',
                                        textAlign: 'center',
                                        cursor: 'pointer'
                                    }}>
                                        <Upload size={32} style={{ color: 'var(--text-muted)', marginBottom: '8px' }} />
                                        <p style={{ color: 'var(--text-muted)' }}>اسحب الصور هنا أو انقر للرفع</p>
                                    </div>
                                </div>
                            </div>

                            <h4 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--accent-primary)' }}>ب. بيانات السعر والشحن</h4>
                            <div className="grid grid-cols-3" style={{ gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)' }}>
                                <div className="form-group">
                                    <label className="form-label">السعر (ج.م)</label>
                                    <input type="number" className="form-input" placeholder="0.00" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">الوزن (كجم)</label>
                                    <input type="number" className="form-input" placeholder="0.0" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">الأبعاد (سم)</label>
                                    <input type="text" className="form-input" placeholder="طول × عرض × ارتفاع" />
                                </div>
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="form-label">طريقة الشحن</label>
                                    <select className="form-select">
                                        <option>بيع وشحن عبر المنصة</option>
                                        <option>بيع مباشر + شحن المنصة</option>
                                        <option>بيع وشحن ذاتي</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">عنوان الاستلام</label>
                                    <select className="form-select">
                                        <option>المستودع الرئيسي</option>
                                        <option>فرع 6 أكتوبر</option>
                                    </select>
                                </div>
                            </div>

                            <h4 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--accent-primary)' }}>ج. بيانات المخزون</h4>
                            <div className="grid grid-cols-2" style={{ gap: 'var(--spacing-md)' }}>
                                <div className="form-group">
                                    <label className="form-label">الكمية الأولية</label>
                                    <input type="number" className="form-input" placeholder="0" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">حد النفاد (تنبيه)</label>
                                    <input type="number" className="form-input" placeholder="10" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary">
                                <Plus size={18} />
                                إضافة المنتج
                            </button>
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                إلغاء
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Product Analytics Modal */}
            {showAnalytics && selectedProduct && (
                <div className="modal-overlay" onClick={() => setShowAnalytics(false)}>
                    <div className="modal" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">تحليل أداء: {selectedProduct.name}</h3>
                            <button className="modal-close" onClick={() => setShowAnalytics(false)}>
                                <X size={18} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="grid grid-cols-2" style={{ gap: 'var(--spacing-md)' }}>
                                <div style={{ padding: 'var(--spacing-lg)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                                    <div className="flex items-center gap-sm mb-sm">
                                        <Eye size={18} style={{ color: 'var(--info)' }} />
                                        <span style={{ color: 'var(--text-muted)' }}>الزيارات</span>
                                    </div>
                                    <p style={{ fontSize: '24px', fontWeight: '700' }}>1,245</p>
                                </div>
                                <div style={{ padding: 'var(--spacing-lg)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                                    <div className="flex items-center gap-sm mb-sm">
                                        <ShoppingCart size={18} style={{ color: 'var(--warning)' }} />
                                        <span style={{ color: 'var(--text-muted)' }}>الإضافة للعربة</span>
                                    </div>
                                    <p style={{ fontSize: '24px', fontWeight: '700' }}>342</p>
                                </div>
                                <div style={{ padding: 'var(--spacing-lg)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                                    <div className="flex items-center gap-sm mb-sm">
                                        <CheckCircle size={18} style={{ color: 'var(--success)' }} />
                                        <span style={{ color: 'var(--text-muted)' }}>طلبات ناجحة</span>
                                    </div>
                                    <p style={{ fontSize: '24px', fontWeight: '700' }}>{selectedProduct.sales}</p>
                                </div>
                                <div style={{ padding: 'var(--spacing-lg)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                                    <div className="flex items-center gap-sm mb-sm">
                                        <RotateCcw size={18} style={{ color: 'var(--danger)' }} />
                                        <span style={{ color: 'var(--text-muted)' }}>المرتجعات</span>
                                    </div>
                                    <p style={{ fontSize: '24px', fontWeight: '700' }}>8</p>
                                </div>
                                <div style={{ padding: 'var(--spacing-lg)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', gridColumn: 'span 2' }}>
                                    <div className="flex items-center gap-sm mb-sm">
                                        <Star size={18} style={{ color: 'var(--warning)' }} />
                                        <span style={{ color: 'var(--text-muted)' }}>التقييمات</span>
                                    </div>
                                    <p style={{ fontSize: '24px', fontWeight: '700' }}>4.7 <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>(89 تقييم)</span></p>
                                </div>
                            </div>

                            <div style={{ marginTop: 'var(--spacing-xl)', padding: 'var(--spacing-lg)', background: 'var(--info-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--info)' }}>
                                <h4 style={{ color: 'var(--info)', marginBottom: 'var(--spacing-sm)' }}>💡 توصيات تحسين الأداء</h4>
                                <ul style={{ paddingRight: 'var(--spacing-lg)', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                                    <li>أضف المزيد من الصور عالية الجودة</li>
                                    <li>حسّن العنوان بإضافة كلمات مفتاحية</li>
                                    <li>فعّل عرض ترويجي لزيادة المبيعات</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
