import { useState } from 'react';
import { Package, ShoppingCart, Edit, Trash2, Plus, User, MapPin, ExternalLink, Filter, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const activities = [
    {
        id: 1,
        employee: { name: 'أحمد محمد', role: 'مدير المنتجات', avatar: 'https://i.pravatar.cc/150?img=11' },
        action: 'أضاف منتج جديد',
        target: 'هاتف سامسونج Galaxy S24',
        location: 'القاهرة، مصر',
        time: 'منذ 5 دقائق',
        date: '21 ديسمبر 2024',
        icon: Plus,
        iconBg: '#d1fae5',
        iconColor: '#10b981'
    },
    {
        id: 2,
        employee: { name: 'سارة أحمد', role: 'مسؤولة المخزون', avatar: 'https://i.pravatar.cc/150?img=5' },
        action: 'عدّل سعر منتج',
        target: 'سماعات AirPods Pro',
        details: 'من 4,500 إلى 4,200 ج.م',
        location: 'الإسكندرية، مصر',
        time: 'منذ 15 دقيقة',
        date: '21 ديسمبر 2024',
        icon: Edit,
        iconBg: '#dbeafe',
        iconColor: '#2563eb'
    },
    {
        id: 3,
        employee: { name: 'محمد علي', role: 'مسؤول الطلبات', avatar: 'https://i.pravatar.cc/150?img=12' },
        action: 'حدّث حالة طلب',
        target: 'ORD-2024-78432',
        details: 'من "جديد" إلى "تحت التجهيز"',
        location: 'الجيزة، مصر',
        time: 'منذ 30 دقيقة',
        date: '21 ديسمبر 2024',
        icon: ShoppingCart,
        iconBg: '#fef3c7',
        iconColor: '#f59e0b'
    },
    {
        id: 4,
        employee: { name: 'نورهان طه', role: 'مسؤولة المنتجات', avatar: 'https://i.pravatar.cc/150?img=9' },
        action: 'حذف منتج',
        target: 'كابل شحن قديم',
        location: 'القاهرة، مصر',
        time: 'منذ ساعة',
        date: '21 ديسمبر 2024',
        icon: Trash2,
        iconBg: '#fee2e2',
        iconColor: '#ef4444'
    },
    {
        id: 5,
        employee: { name: 'أحمد محمد', role: 'مدير المنتجات', avatar: 'https://i.pravatar.cc/150?img=11' },
        action: 'أضاف 5 منتجات',
        target: 'تشكيلة إكسسوارات',
        location: 'القاهرة، مصر',
        time: 'منذ 2 ساعة',
        date: '21 ديسمبر 2024',
        icon: Package,
        iconBg: '#e0e7ff',
        iconColor: '#6366f1'
    },
];

export default function ActivityLog() {
    const navigate = useNavigate();

    return (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h2 className="page-title">سجل النشاط</h2>
                    <p className="page-subtitle">تتبع جميع الإجراءات التي قام بها فريق العمل</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{ padding: '10px 16px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#64748b' }}>
                        <Filter size={16} /> تصفية
                    </button>
                    <button style={{ padding: '10px 16px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#64748b' }}>
                        <Calendar size={16} /> اليوم
                    </button>
                </div>
            </div>

            {/* Activity List */}
            <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                {activities.map((activity, idx) => {
                    const IconComponent = activity.icon;
                    return (
                        <div
                            key={activity.id}
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '16px',
                                padding: '20px 24px',
                                borderBottom: idx < activities.length - 1 ? '1px solid #f1f5f9' : 'none'
                            }}
                        >
                            {/* Employee Avatar */}
                            <img
                                src={activity.employee.avatar}
                                alt=""
                                style={{ width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0 }}
                            />

                            {/* Activity Content */}
                            <div style={{ flex: 1 }}>
                                {/* Employee Name & Role */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                    <span style={{ fontWeight: 600, fontSize: '15px', color: '#1e293b' }}>{activity.employee.name}</span>
                                    <span style={{ fontSize: '12px', color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>{activity.employee.role}</span>
                                </div>

                                {/* Action */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: activity.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <IconComponent size={14} color={activity.iconColor} />
                                    </div>
                                    <span style={{ fontSize: '14px', color: '#1e293b' }}>
                                        {activity.action}: <span style={{ color: '#2563eb', fontWeight: 500 }}>{activity.target}</span>
                                    </span>
                                </div>

                                {activity.details && (
                                    <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px', marginRight: '36px' }}>{activity.details}</p>
                                )}

                                {/* Location & Time */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: '#94a3b8' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <MapPin size={14} /> {activity.location}
                                    </span>
                                    <span>{activity.time}</span>
                                </div>
                            </div>

                            {/* Link to Employee Profile */}
                            <button
                                onClick={() => navigate('/employees')}
                                style={{
                                    padding: '8px 14px',
                                    background: '#eff6ff',
                                    border: '1px solid #2563eb',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    color: '#2563eb',
                                    fontWeight: 500
                                }}
                            >
                                <User size={14} />
                                الملف الشخصي
                                <ExternalLink size={12} />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
