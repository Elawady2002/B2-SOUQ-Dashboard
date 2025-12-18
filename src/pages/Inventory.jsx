import { useState } from 'react';
import {
    Warehouse,
    Package,
    AlertTriangle,
    Plus,
    ArrowUp,
    ArrowDown,
    RotateCcw,
    Edit,
    Clock,
    Eye,
    X
} from 'lucide-react';

const inventoryItems = [
    {
        id: 1,
        name: 'هاتف سامسونج Galaxy S24 Ultra',
        sku: 'SAM-S24U-256',
        category: 'هواتف',
        price: 45000,
        dimensions: '16.2 × 7.9 × 0.8 سم',
        quantity: 25,
        threshold: 10,
        shipping: 'شحن المنصة',
        address: 'المستودع الرئيسي - 6 أكتوبر',
        movements: [
            { type: 'add', qty: 50, date: '2024-12-15', note: 'شحنة جديدة' },
            { type: 'subtract', qty: 20, date: '2024-12-16', note: 'مبيعات' },
            { type: 'subtract', qty: 5, date: '2024-12-17', note: 'مبيعات' },
        ]
    },
    {
        id: 2,
        name: 'سماعات Apple AirPods Pro 2',
        sku: 'APL-APP2-WHT',
        category: 'سماعات',
        price: 8500,
        dimensions: '5.4 × 5.4 × 2.4 سم',
        quantity: 5,
        threshold: 15,
        shipping: 'شحن ذاتي',
        address: 'فرع الدقي',
        movements: [
            { type: 'add', qty: 30, date: '2024-12-10', note: 'شحنة جديدة' },
            { type: 'subtract', qty: 25, date: '2024-12-18', note: 'مبيعات' },
        ]
    },
    {
        id: 3,
        name: 'ساعة Huawei Watch GT4',
        sku: 'HUA-WGT4-BLK',
        category: 'ساعات ذكية',
        price: 6500,
        dimensions: '4.6 × 4.6 × 1.1 سم',
        quantity: 0,
        threshold: 10,
        shipping: 'شحن المنصة',
        address: 'المستودع الرئيسي - 6 أكتوبر',
        movements: [
            { type: 'add', qty: 20, date: '2024-12-05', note: 'شحنة جديدة' },
            { type: 'subtract', qty: 20, date: '2024-12-15', note: 'مبيعات' },
        ]
    },
    {
        id: 4,
        name: 'شاحن لاسلكي سريع 15W',
        sku: 'CHR-WLS-15W',
        category: 'اكسسوارات',
        price: 450,
        dimensions: '10 × 10 × 1 سم',
        quantity: 150,
        threshold: 20,
        shipping: 'شحن المنصة',
        address: 'المستودع الرئيسي - 6 أكتوبر',
        movements: [
            { type: 'add', qty: 200, date: '2024-12-01', note: 'شحنة جديدة' },
            { type: 'subtract', qty: 50, date: '2024-12-17', note: 'مبيعات' },
        ]
    },
];

const summaryCards = [
    { label: 'إجمالي المنتجات', value: '156', color: 'success', icon: Package },
    { label: 'منخفضة المخزون', value: '12', color: 'warning', icon: AlertTriangle },
    { label: 'الكمية في المخزون', value: '2,450', unit: 'قطعة', color: 'info', icon: Warehouse },
    { label: 'مضافة حديثاً', value: '8', subtitle: 'آخر 7 أيام', color: 'primary', icon: Clock },
];

export default function Inventory() {
    const [showMovements, setShowMovements] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const getQuantityColor = (qty, threshold) => {
        if (qty === 0) return 'var(--danger)';
        if (qty <= threshold) return 'var(--warning)';
        return 'var(--success)';
    };

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h2 className="page-title">المخزون</h2>
                <p className="page-subtitle">إدارة ومتابعة مخزون منتجاتك</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-4 mb-xl">
                {summaryCards.map((card, idx) => (
                    <div key={idx} className="stats-card" style={{ background: idx === 0 ? 'var(--success-bg)' : idx === 1 ? 'var(--warning-bg)' : 'var(--bg-card)' }}>
                        <div className={`stats-card-icon ${card.color}`}>
                            <card.icon size={24} />
                        </div>
                        <div className="stats-card-content">
                            <div className="stats-card-label">{card.label}</div>
                            <div className="stats-card-value">
                                {card.value} {card.unit && <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{card.unit}</span>}
                            </div>
                            {card.subtitle && <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{card.subtitle}</p>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Inventory Table */}
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">جدول المخزون</h3>
                    <button className="btn btn-primary btn-sm">
                        <Plus size={16} />
                        إضافة كمية
                    </button>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>المنتج</th>
                                <th>SKU</th>
                                <th>الفئة</th>
                                <th>السعر</th>
                                <th>الأبعاد</th>
                                <th>الكمية الحالية</th>
                                <th>حد النفاذ</th>
                                <th>طريقة الشحن</th>
                                <th>العنوان</th>
                                <th>الحركات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventoryItems.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <div className="flex items-center gap-md">
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                background: 'var(--bg-secondary)',
                                                borderRadius: 'var(--radius-md)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <Package size={18} style={{ color: 'var(--text-muted)' }} />
                                            </div>
                                            <span style={{ fontWeight: '500', fontSize: '13px' }}>{item.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ fontFamily: 'monospace', fontSize: '12px' }}>{item.sku}</td>
                                    <td>{item.category}</td>
                                    <td>{item.price.toLocaleString('ar-EG')} ج.م</td>
                                    <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.dimensions}</td>
                                    <td>
                                        <span style={{
                                            color: getQuantityColor(item.quantity, item.threshold),
                                            fontWeight: '700',
                                            fontSize: '16px'
                                        }}>
                                            {item.quantity}
                                        </span>
                                    </td>
                                    <td style={{ color: 'var(--text-muted)' }}>{item.threshold}</td>
                                    <td>
                                        <span className="badge badge-info">{item.shipping}</span>
                                    </td>
                                    <td style={{ fontSize: '12px', maxWidth: '150px' }}>{item.address}</td>
                                    <td>
                                        <button
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => {
                                                setSelectedItem(item);
                                                setShowMovements(true);
                                            }}
                                        >
                                            <Eye size={14} />
                                            عرض
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Movements Modal */}
            {showMovements && selectedItem && (
                <div className="modal-overlay" onClick={() => setShowMovements(false)}>
                    <div className="modal" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">سجل حركات: {selectedItem.name}</h3>
                            <button className="modal-close" onClick={() => setShowMovements(false)}>
                                <X size={18} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="flex items-center justify-between mb-lg" style={{ padding: 'var(--spacing-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                                <span style={{ color: 'var(--text-muted)' }}>الكمية الحالية</span>
                                <span style={{
                                    fontSize: '24px',
                                    fontWeight: '700',
                                    color: getQuantityColor(selectedItem.quantity, selectedItem.threshold)
                                }}>
                                    {selectedItem.quantity} قطعة
                                </span>
                            </div>

                            <h4 style={{ marginBottom: 'var(--spacing-md)' }}>سجل الحركات</h4>
                            <div className="flex flex-col gap-md">
                                {selectedItem.movements.map((movement, idx) => (
                                    <div key={idx} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--spacing-md)',
                                        padding: 'var(--spacing-md)',
                                        background: 'var(--bg-secondary)',
                                        borderRadius: 'var(--radius-md)',
                                        borderRight: `4px solid ${movement.type === 'add' ? 'var(--success)' : movement.type === 'return' ? 'var(--info)' : 'var(--danger)'}`
                                    }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: 'var(--radius-md)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: movement.type === 'add' ? 'var(--success-bg)' : movement.type === 'return' ? 'var(--info-bg)' : 'var(--danger-bg)',
                                            color: movement.type === 'add' ? 'var(--success)' : movement.type === 'return' ? 'var(--info)' : 'var(--danger)'
                                        }}>
                                            {movement.type === 'add' ? <ArrowUp size={20} /> :
                                                movement.type === 'return' ? <RotateCcw size={20} /> : <ArrowDown size={20} />}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontWeight: '600' }}>
                                                {movement.type === 'add' ? 'إضافة' : movement.type === 'return' ? 'مرتجع' : 'خصم'}
                                                {' '}
                                                <span style={{ color: movement.type === 'add' ? 'var(--success)' : 'var(--danger)' }}>
                                                    {movement.type === 'add' ? '+' : '-'}{movement.qty}
                                                </span>
                                            </p>
                                            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{movement.note}</p>
                                        </div>
                                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{movement.date}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-md mt-lg">
                                <button className="btn btn-success" style={{ flex: 1 }}>
                                    <Plus size={18} />
                                    إضافة كمية
                                </button>
                                <button className="btn btn-secondary" style={{ flex: 1 }}>
                                    <Edit size={18} />
                                    تعديل
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
