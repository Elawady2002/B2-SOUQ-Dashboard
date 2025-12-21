import { Star, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';

const stats = [
    { label: 'متوسط التقييم', value: '4.8', icon: Star, iconBg: '#fef3c7', iconColor: '#f59e0b' },
    { label: 'تقييمات إيجابية', value: '2,245', icon: ThumbsUp, iconBg: '#d1fae5', iconColor: '#10b981' },
    { label: 'تقييمات سلبية', value: '45', icon: ThumbsDown, iconBg: '#fee2e2', iconColor: '#ef4444' },
];

const reviews = [
    {
        id: 1,
        customer: { name: 'أحمد محمد', avatar: 'https://i.pravatar.cc/150?img=11' },
        product: 'هاتف سامسونج Galaxy S24',
        rating: 5,
        text: 'منتج ممتاز وجودة عالية جداً. الشحن كان سريع والتغليف محترم. أنصح بالشراء من هذا المتجر.',
        date: '2024-12-18',
    },
    {
        id: 2,
        customer: { name: 'سارة أحمد', avatar: 'https://i.pravatar.cc/150?img=5' },
        product: 'سماعات AirPods Pro',
        rating: 5,
        text: 'السماعات ممتازة والصوت نقي جداً. تجربة شراء رائعة!',
        date: '2024-12-17',
    },
    {
        id: 3,
        customer: { name: 'محمود علي', avatar: 'https://i.pravatar.cc/150?img=12' },
        product: 'شاحن لاسلكي',
        rating: 4,
        text: 'الشاحن جيد وسرعة الشحن مقبولة. الجودة ممتازة بالنسبة للسعر.',
        date: '2024-12-16',
    },
    {
        id: 4,
        customer: { name: 'نورهان طه', avatar: 'https://i.pravatar.cc/150?img=9' },
        product: 'ساعة Apple Watch',
        rating: 5,
        text: 'ساعة رائعة! التوصيل كان سريع جداً وخدمة العملاء ممتازة.',
        date: '2024-12-15',
    },
    {
        id: 5,
        customer: { name: 'يوسف أحمد', avatar: 'https://i.pravatar.cc/150?img=15' },
        product: 'لابتوب MacBook',
        rating: 5,
        text: 'أفضل متجر اشتريت منه! التغليف احترافي والمنتج أصلي 100%.',
        date: '2024-12-14',
    },
    {
        id: 6,
        customer: { name: 'مريم حسن', avatar: 'https://i.pravatar.cc/150?img=32' },
        product: 'كاميرا Canon',
        rating: 4,
        text: 'كاميرا ممتازة وجودة تصوير عالية. سعيدة بالشراء.',
        date: '2024-12-13',
    },
];

const renderStars = (rating) => {
    return (
        <div style={{ display: 'flex', gap: '2px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={16}
                    fill={star <= rating ? '#f59e0b' : 'transparent'}
                    color={star <= rating ? '#f59e0b' : '#e2e8f0'}
                />
            ))}
        </div>
    );
};

export default function Reviews() {
    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
                <h2 className="page-title">التقييمات</h2>
                <p className="page-subtitle">إدارة تقييمات العملاء والرد عليها</p>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
                {stats.map((stat, idx) => {
                    const IconComponent = stat.icon;
                    return (
                        <div key={idx} style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: stat.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                                <IconComponent size={22} color={stat.iconColor} />
                            </div>
                            <p style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>{stat.value}</p>
                            <p style={{ fontSize: '13px', color: '#64748b' }}>{stat.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Reviews Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        style={{
                            background: 'white',
                            borderRadius: '16px',
                            padding: '24px',
                            border: '1px solid #e2e8f0',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            transition: 'box-shadow 0.2s, transform 0.2s',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        {/* Quote Icon */}
                        <div style={{ position: 'absolute', top: '20px', left: '20px', opacity: 0.15 }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="#2563eb">
                                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                            </svg>
                        </div>

                        {/* Stars */}
                        <div style={{ marginBottom: '16px' }}>
                            {renderStars(review.rating)}
                        </div>

                        {/* Review Text */}
                        <p style={{
                            fontSize: '14px',
                            color: '#1e293b',
                            lineHeight: 1.7,
                            flex: 1,
                            marginBottom: '20px'
                        }}>
                            {review.text}
                        </p>

                        {/* Customer Info */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                            <img
                                src={review.customer.avatar}
                                alt=""
                                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                            />
                            <div>
                                <p style={{ fontWeight: 600, fontSize: '14px', color: '#1e293b' }}>{review.customer.name}</p>
                                <p style={{ fontSize: '12px', color: '#2563eb' }}>{review.product}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
