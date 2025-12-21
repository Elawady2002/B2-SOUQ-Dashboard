import { Star, ThumbsUp, ThumbsDown, MessageSquare, Quote } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

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
        <div className="flex gap-0.5">
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
    const { t } = useLanguage();

    const stats = [
        { label: t('reviews.avgRating'), value: '4.8', icon: Star, iconBg: 'bg-amber-50', iconColor: 'text-amber-600' },
        { label: t('reviews.positiveReviews'), value: '2,245', icon: ThumbsUp, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
        { label: t('reviews.negativeReviews'), value: '45', icon: ThumbsDown, iconBg: 'bg-red-50', iconColor: 'text-red-600' },
    ];

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <h2 className="page-title">{t('reviews.title')}</h2>
                <p className="page-subtitle">{t('reviews.subtitle')}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {stats.map((stat, idx) => {
                    const IconComponent = stat.icon;
                    return (
                        <Card key={idx} className="border-slate-100 shadow-sm">
                            <CardContent className="p-5 flex flex-col items-center text-center">
                                <div className={`w-11 h-11 rounded-full ${stat.iconBg} flex items-center justify-center mb-3`}>
                                    <IconComponent size={22} className={stat.iconColor} />
                                </div>
                                <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
                                <p className="text-xs text-slate-600">{stat.label}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-3 gap-5">
                {reviews.map((review) => (
                    <Card
                        key={review.id}
                        className="border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer relative"
                    >
                        <CardContent className="p-6 flex flex-col">
                            {/* Quote Icon */}
                            <div className="absolute top-5 left-5 opacity-10">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="#2563eb">
                                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                                </svg>
                            </div>

                            {/* Stars */}
                            <div className="mb-4">
                                {renderStars(review.rating)}
                            </div>

                            {/* Review Text */}
                            <p className="text-sm text-slate-700 leading-relaxed flex-1 mb-5">
                                {review.text}
                            </p>

                            {/* Customer Info */}
                            <div className="pt-4 border-t border-slate-50">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={review.customer.avatar} alt={review.customer.name} />
                                        <AvatarFallback>{review.customer.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-sm text-slate-900">{review.customer.name}</p>
                                        <p className="text-xs text-blue-600">{review.product}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
