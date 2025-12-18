import {
    MessageSquare,
    Send,
    Bell,
    AlertTriangle,
    Package,
    Lightbulb,
    Clock,
    CheckCircle,
    AlertCircle,
    Search,
    Plus
} from 'lucide-react';
import { useState } from 'react';

const conversations = [
    {
        id: 1,
        subject: 'استفسار عن طلب مرتجع',
        type: 'dispute',
        status: 'open',
        lastMessage: 'العميل يطلب استرداد المبلغ',
        date: '2024-12-18 10:30',
        unread: 2
    },
    {
        id: 2,
        subject: 'مشكلة في الشحن',
        type: 'support',
        status: 'open',
        lastMessage: 'تم التواصل مع شركة الشحن',
        date: '2024-12-17 16:45',
        unread: 0
    },
    {
        id: 3,
        subject: 'بلاغ على منتج مخالف',
        type: 'report',
        status: 'resolved',
        lastMessage: 'تم حل المشكلة',
        date: '2024-12-15 09:20',
        unread: 0
    },
];

const notifications = [
    { id: 1, type: 'order', title: 'طلب جديد', message: 'لديك طلب جديد بقيمة 45,000 ج.م', time: 'منذ 5 دقائق', read: false },
    { id: 2, type: 'shipping', title: 'تم التسليم', message: 'تم تسليم الطلب ORD-2024-78430 بنجاح', time: 'منذ ساعة', read: false },
    { id: 3, type: 'alert', title: 'منتج منخفض المخزون', message: 'سماعات AirPods Pro - الكمية 5 فقط', time: 'منذ 3 ساعات', read: true },
    { id: 4, type: 'tip', title: 'نصيحة تحسين', message: 'أضف صور أكثر لمنتجاتك لزيادة المبيعات 20%', time: 'منذ يوم', read: true },
];

const tips = [
    { id: 1, title: 'أضف صور عالية الجودة', description: 'المنتجات بصور أكثر تحقق مبيعات أعلى بـ 30%' },
    { id: 2, title: 'رد سريع على التقييمات', description: 'الرد خلال 24 ساعة يحسن ثقة العملاء' },
    { id: 3, title: 'فعّل العروض الموسمية', description: 'العروض تزيد المبيعات بـ 50% في المواسم' },
];

const typeConfig = {
    dispute: { label: 'نزاع', color: 'danger', icon: AlertTriangle },
    support: { label: 'دعم فني', color: 'info', icon: MessageSquare },
    report: { label: 'بلاغ', color: 'warning', icon: AlertCircle },
};

export default function Messages() {
    const [selectedConversation, setSelectedConversation] = useState(null);

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h2 className="page-title">الرسائل والدعم</h2>
                <p className="page-subtitle">التواصل مع فريق المنصة ومتابعة النزاعات</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 mb-xl">
                <div className="stats-card">
                    <div className="stats-card-icon primary">
                        <MessageSquare size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">رسائل جديدة</div>
                        <div className="stats-card-value">3</div>
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
                <div className="stats-card">
                    <div className="stats-card-icon warning">
                        <AlertCircle size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">بلاغات</div>
                        <div className="stats-card-value">1</div>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon success">
                        <CheckCircle size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">تم الحل</div>
                        <div className="stats-card-value">45</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3">
                {/* Conversations List */}
                <div className="card" style={{ gridColumn: 'span 2' }}>
                    <div className="card-header">
                        <h3 className="card-title">المحادثات</h3>
                        <button className="btn btn-primary btn-sm">
                            <Plus size={16} />
                            رسالة جديدة
                        </button>
                    </div>
                    <div className="flex flex-col gap-md">
                        {conversations.map((conv) => {
                            const type = typeConfig[conv.type];
                            return (
                                <div
                                    key={conv.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--spacing-md)',
                                        padding: 'var(--spacing-md)',
                                        background: conv.unread > 0 ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-secondary)',
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                        border: conv.unread > 0 ? '1px solid var(--accent-primary)' : '1px solid transparent'
                                    }}
                                    onClick={() => setSelectedConversation(conv)}
                                >
                                    <div style={{
                                        width: '45px',
                                        height: '45px',
                                        borderRadius: 'var(--radius-md)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: `var(--${type.color}-bg)`,
                                        color: `var(--${type.color})`
                                    }}>
                                        <type.icon size={22} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div className="flex items-center gap-sm">
                                            <h4 style={{ fontWeight: '600', fontSize: '14px' }}>{conv.subject}</h4>
                                            <span className={`badge badge-${type.color}`} style={{ fontSize: '10px' }}>{type.label}</span>
                                        </div>
                                        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{conv.lastMessage}</p>
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{conv.date}</p>
                                        {conv.unread > 0 && (
                                            <span style={{
                                                background: 'var(--danger)',
                                                color: 'white',
                                                padding: '2px 8px',
                                                borderRadius: '10px',
                                                fontSize: '11px',
                                                fontWeight: '600'
                                            }}>
                                                {conv.unread} جديد
                                            </span>
                                        )}
                                        {conv.status === 'resolved' && (
                                            <span className="badge badge-success" style={{ fontSize: '10px' }}>تم الحل</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Notifications & Tips */}
                <div className="flex flex-col gap-lg">
                    {/* Notifications */}
                    <div className="card">
                        <div className="card-header">
                            <div className="flex items-center gap-sm">
                                <Bell size={18} style={{ color: 'var(--warning)' }} />
                                <h3 className="card-title">الإشعارات</h3>
                            </div>
                        </div>
                        <div className="flex flex-col gap-sm">
                            {notifications.map((notif) => (
                                <div key={notif.id} style={{
                                    padding: 'var(--spacing-sm) var(--spacing-md)',
                                    background: notif.read ? 'transparent' : 'rgba(99, 102, 241, 0.1)',
                                    borderRadius: 'var(--radius-sm)',
                                    borderRight: notif.read ? 'none' : '3px solid var(--accent-primary)'
                                }}>
                                    <p style={{ fontWeight: notif.read ? '400' : '600', fontSize: '13px' }}>{notif.title}</p>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{notif.message}</p>
                                    <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>{notif.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="card">
                        <div className="card-header">
                            <div className="flex items-center gap-sm">
                                <Lightbulb size={18} style={{ color: 'var(--success)' }} />
                                <h3 className="card-title">نصائح التحسين</h3>
                            </div>
                        </div>
                        <div className="flex flex-col gap-md">
                            {tips.map((tip) => (
                                <div key={tip.id} style={{
                                    padding: 'var(--spacing-md)',
                                    background: 'var(--success-bg)',
                                    borderRadius: 'var(--radius-md)'
                                }}>
                                    <p style={{ fontWeight: '600', fontSize: '13px', color: 'var(--success)', marginBottom: '4px' }}>
                                        💡 {tip.title}
                                    </p>
                                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{tip.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
