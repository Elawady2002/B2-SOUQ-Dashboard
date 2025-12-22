import { Star, ThumbsUp, ThumbsDown, MessageSquare, Quote, Reply } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

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
    const [selectedReview, setSelectedReview] = useState(null);
    const [replyText, setReplyText] = useState('');

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
                        className="border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 relative"
                    >
                        <CardContent className="p-4 flex flex-col h-full">
                            {/* Quote Icon */}
                            <div className="absolute top-4 left-4 opacity-5">
                                <Quote size={24} className="text-blue-600" />
                            </div>

                            {/* Stars */}
                            <div className="mb-3">
                                {renderStars(review.rating)}
                            </div>

                            {/* Review Text */}
                            <p className="text-sm text-slate-700 leading-relaxed mb-4 line-clamp-3">
                                {review.text}
                            </p>

                            {/* Customer Info & Actions */}
                            <div className="pt-3 border-t border-slate-50 flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={review.customer.avatar} alt={review.customer.name} />
                                        <AvatarFallback>{review.customer.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-xs text-slate-900">{review.customer.name}</p>
                                        <p className="text-[10px] text-slate-500 truncate max-w-[100px]">{review.product}</p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 gap-1.5 text-xs text-slate-500 hover:text-blue-600 hover:bg-blue-50 px-2"
                                    onClick={() => setSelectedReview(review)}
                                >
                                    <Reply size={14} />
                                    {t('reviews.reply') || 'رد'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Reply Sheet */}
            <Sheet open={!!selectedReview} onOpenChange={(open) => !open && setSelectedReview(null)}>
                <SheetContent side="left" className="w-[400px] sm:w-[540px] p-0 flex flex-col gap-0 border-r border-slate-200">
                    <SheetHeader className="px-6 pt-12 pb-6 border-b border-slate-100 bg-slate-50/30 shrink-0">
                        <SheetTitle className="text-right">الرد على التقييم</SheetTitle>
                        <SheetDescription className="text-right">
                            قم بكتابة ردك على تقييم العميل وسيظهر في صفحة المنتج
                        </SheetDescription>
                    </SheetHeader>

                    {selectedReview && (
                        <div className="flex-1 overflow-y-auto p-6 space-y-6" dir="rtl">
                            {/* Review Context Card */}
                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                                <div className="flex items-center gap-3 mb-3">
                                    <Avatar className="h-10 w-10 border border-white shadow-sm">
                                        <AvatarImage src={selectedReview.customer.avatar} />
                                        <AvatarFallback>{selectedReview.customer.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 text-sm">{selectedReview.customer.name}</h4>
                                        <div className="flex gap-1 mt-0.5">
                                            {renderStars(selectedReview.rating)}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed bg-white p-3 rounded border border-slate-100">
                                    "{selectedReview.text}"
                                </p>
                                <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                                    <span>{selectedReview.product}</span>
                                    <span>{selectedReview.date}</span>
                                </div>
                            </div>

                            {/* Reply Input */}
                            <div className="space-y-3">
                                <Label htmlFor="reply-text" className="text-slate-900 font-medium">نص الرد</Label>
                                <Textarea
                                    id="reply-text"
                                    placeholder="اكتب ردك هنا..."
                                    className="min-h-[150px] resize-none focus-visible:ring-blue-600"
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                />
                                <p className="text-xs text-slate-500">سيتم إرسال إشعار للعميل بالرد الخاص بك.</p>
                            </div>
                        </div>
                    )}

                    <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center gap-2 justify-end shrink-0">
                        <Button variant="outline" onClick={() => setSelectedReview(null)}>إلغاء</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">إرسال الرد</Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
