import {
    History,
    User,
    Package,
    ShoppingCart,
    Settings,
    Edit,
    Trash2,
    Plus,
    Bot,
    Filter,
    Calendar
} from 'lucide-react';
import { useState } from 'react';

const activities = [
    {
        id: 1,
        action: 'تعديل منتج',
        target: 'هاتف سامسونج Galaxy S24',
        user: 'أحمد محمد',
        userType: 'employee',
        details: 'تم تعديل السعر من 44,000 إلى 45,000 ج.م',
        date: '2024-12-18 10:30',
        icon: Package
    },
    {
        id: 2,
        action: 'تحديث حالة طلب',
        target: 'ORD-2024-78432',
        user: 'النظام الآلي',
        userType: 'system',
        details: 'تم تغيير الحالة من "جديد" إلى "تحت التجهيز"',
        date: '2024-12-18 09:45',
        icon: ShoppingCart
    },
    {
        id: 3,
        action: 'إضافة موظف',
        target: 'محمد علي',
        user: 'أحمد محمد',
        userType: 'owner',
        details: 'تم إضافة موظف جديد بصلاحية مسؤول المنتجات',
        date: '2024-12-17 16:20',
        icon: User
    },
    {
        id: 4,
        action: 'حذف منتج',
        target: 'سماعة قديمة',
        user: 'سارة أحمد',
        userType: 'employee',
        details: 'تم حذف المنتج من المتجر',
        date: '2024-12-17 14:15',
        icon: Trash2
    },
    {
        id: 5,
        action: 'تعديل إعدادات',
        target: 'سياسة الشحن',
        user: 'أحمد محمد',
        userType: 'owner',
        details: 'تم تعديل سياسة الشحن المجاني',
        date: '2024-12-17 11:00',
        icon: Settings
    },
    {
        id: 6,
        action: 'إضافة منتج',
        target: 'ساعة Apple Watch',
        user: 'محمد علي',
        userType: 'employee',
        details: 'تم إضافة منتج جديد بسعر 12,500 ج.م',
        date: '2024-12-16 15:30',
        icon: Plus
    },
    {
        id: 7,
        action: 'خصم مخزون',
        target: 'شاحن لاسلكي',
        user: 'النظام الآلي',
        userType: 'system',
        details: 'تم خصم 5 قطع بسبب طلب ORD-2024-78435',
        date: '2024-12-16 12:45',
        icon: Package
    },
];

const userTypeConfig = {
    owner: { label: 'المالك', color: '#3b82f6', bg: '#eff6ff' },
    employee: { label: 'موظف', color: '#10b981', bg: '#d1fae5' },
    system: { label: 'النظام', color: '#f59e0b', bg: '#fef3c7' },
};

const actionFilters = [
    { id: 'all', label: 'الكل' },
    { id: 'product', label: 'المنتجات' },
    { id: 'order', label: 'الطلبات' },
    { id: 'employee', label: 'الموظفين' },
    { id: 'settings', label: 'الإعدادات' },
];

export default function ActivityLog() {
    const [activeFilter, setActiveFilter] = useState('all');

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h2 className="page-title">سجل النشاط</h2>
                <p className="page-subtitle">تتبع جميع التعديلات والإجراءات في المتجر</p>
            </div>

            {/* Filters */}
            <div className="card mb-lg">
                <div className="flex items-center justify-between" style={{ flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
                    <div className="flex items-center gap-md">
                        <Filter size={18} style={{ color: 'var(--text-muted)' }} />
                        <div className="flex gap-sm">
                            {actionFilters.map((filter) => (
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
                    <div className="flex items-center gap-sm" style={{ color: 'var(--text-muted)', fontSize: 14 }}>
                        <Calendar size={16} />
                        <input type="date" className="form-input" style={{ width: 'auto', padding: '6px 12px', fontSize: 13 }} />
                        <span>إلى</span>
                        <input type="date" className="form-input" style={{ width: 'auto', padding: '6px 12px', fontSize: 13 }} />
                    </div>
                </div>
            </div>

            {/* Activity Timeline */}
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">سجل الأحداث</h3>
                    <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                        آخر 7 أيام
                    </span>
                </div>
                <div className="flex flex-col">
                    {activities.map((activity, idx) => {
                        const userType = userTypeConfig[activity.userType];
                        return (
                            <div
                                key={activity.id}
                                style={{
                                    display: 'flex',
                                    gap: 'var(--spacing-md)',
                                    padding: 'var(--spacing-lg) 0',
                                    borderBottom: idx < activities.length - 1 ? '1px solid var(--border-color)' : 'none'
                                }}
                            >
                                {/* Timeline Icon */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: 'var(--radius-md)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: userType.bg,
                                        color: userType.color,
                                        flexShrink: 0
                                    }}>
                                        {activity.userType === 'system' ? <Bot size={20} /> : <activity.icon size={20} />}
                                    </div>
                                    {idx < activities.length - 1 && (
                                        <div style={{
                                            width: '2px',
                                            flex: 1,
                                            background: 'var(--border-color)',
                                            marginTop: 'var(--spacing-sm)'
                                        }}></div>
                                    )}
                                </div>

                                {/* Content */}
                                <div style={{ flex: 1 }}>
                                    <div className="flex items-center gap-sm mb-sm">
                                        <h4 style={{ fontWeight: '600', fontSize: 15 }}>{activity.action}</h4>
                                        <span style={{
                                            padding: '2px 8px',
                                            borderRadius: 'var(--radius-sm)',
                                            fontSize: 11,
                                            fontWeight: 600,
                                            background: userType.bg,
                                            color: userType.color
                                        }}>
                                            {userType.label}
                                        </span>
                                    </div>
                                    <p style={{ marginBottom: 'var(--spacing-sm)', fontSize: 14 }}>
                                        <span style={{ color: '#3b82f6', fontWeight: '500' }}>{activity.target}</span>
                                    </p>
                                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: 'var(--spacing-sm)' }}>
                                        {activity.details}
                                    </p>
                                    <div className="flex items-center gap-md" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                        <span className="flex items-center gap-sm">
                                            <User size={14} />
                                            {activity.user}
                                        </span>
                                        <span>•</span>
                                        <span>{activity.date}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
