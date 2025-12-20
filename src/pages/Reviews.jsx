import {
    Star,
    MessageCircle,
    ThumbsUp,
    ThumbsDown,
    Reply,
    HelpCircle,
    X,
    Send
} from 'lucide-react';
import { useState } from 'react';

const reviews = [
    {
        id: 1,
        customer: 'أحمد محمد',
        avatar: 'https://i.pravatar.cc/150?img=12',
        product: 'هاتف سامسونج Galaxy S24',
        rating: 5,
        comment: 'منتج ممتاز وجودة عالية جداً. الشحن كان سريع والتغليف محترم. أنصح بالشراء من هذا المتجر.',
        date: '2024-12-18',
        replied: true,
        reply: 'شكراً لك على تقييمك الرائع! سعداء بخدمتك دائماً.'
    },
    {
        id: 2,
        customer: 'سارة أحمد',
        avatar: 'https://i.pravatar.cc/150?img=5',
        product: 'سماعات AirPods Pro',
        rating: 4,
        comment: 'السماعات ممتازة لكن التوصيل تأخر يومين عن الموعد المحدد.',
        date: '2024-12-17',
        replied: false
    },
    {
        id: 3,
        customer: 'محمود علي',
        avatar: 'https://i.pravatar.cc/150?img=33',
        product: 'شاحن لاسلكي',
        rating: 3,
        comment: 'المنتج جيد لكن الجودة أقل قليلاً مما توقعت.',
        date: '2024-12-16',
        replied: false
    },
    {
        id: 4,
        customer: 'فاطمة حسن',
        avatar: 'https://i.pravatar.cc/150?img=9',
        product: 'ساعة Huawei GT4',
        rating: 5,
        comment: 'أفضل ساعة ذكية اشتريتها! شكراً للمتجر على الخدمة الممتازة.',
        date: '2024-12-15',
        replied: true,
        reply: 'شكراً لثقتك بنا! نتمنى لك استخداماً ممتعاً.'
    },
];

const questions = [
    {
        id: 1,
        customer: 'علي محمود',
        product: 'هاتف سامسونج Galaxy S24',
        question: 'هل الهاتف يدعم شبكات 5G في مصر؟',
        date: '2024-12-18',
        answered: true,
        answer: 'نعم، الهاتف يدعم جميع شبكات 5G المتاحة في مصر.'
    },
    {
        id: 2,
        customer: 'نور محمد',
        product: 'سماعات AirPods Pro',
        question: 'ما مدة الضمان على هذا المنتج؟',
        date: '2024-12-17',
        answered: false
    },
    {
        id: 3,
        customer: 'ياسر أحمد',
        product: 'شاحن لاسلكي',
        question: 'هل يعمل مع هواتف Samsung أم Apple فقط؟',
        date: '2024-12-16',
        answered: false
    },
];

export default function Reviews() {
    const [activeTab, setActiveTab] = useState('reviews');
    const [replyModal, setReplyModal] = useState(null);

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <Star
                key={i}
                size={16}
                fill={i < rating ? '#f59e0b' : 'transparent'}
                color={i < rating ? '#f59e0b' : '#cbd5e1'}
            />
        ));
    };

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h2 className="page-title">التقييمات والأسئلة</h2>
                <p className="page-subtitle">إدارة تقييمات العملاء والرد على أسئلتهم</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 mb-lg" style={{ gap: 'var(--spacing-md)' }}>
                <div className="stats-card">
                    <div className="stats-card-icon" style={{ background: '#fef3c7', color: '#f59e0b' }}>
                        <Star size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">متوسط التقييم</div>
                        <div className="stats-card-value">4.8</div>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon" style={{ background: '#d1fae5', color: '#10b981' }}>
                        <ThumbsUp size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">تقييمات إيجابية</div>
                        <div className="stats-card-value">2,245</div>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon" style={{ background: '#fee2e2', color: '#ef4444' }}>
                        <ThumbsDown size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">تقييمات سلبية</div>
                        <div className="stats-card-value">45</div>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon" style={{ background: '#eff6ff', color: '#3b82f6' }}>
                        <HelpCircle size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">أسئلة بانتظار الرد</div>
                        <div className="stats-card-value">12</div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="card mb-lg">
                <div className="flex gap-sm">
                    <button
                        className={`chart-filter-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                        onClick={() => setActiveTab('reviews')}
                    >
                        <Star size={16} />
                        التقييمات ({reviews.length})
                    </button>
                    <button
                        className={`chart-filter-btn ${activeTab === 'questions' ? 'active' : ''}`}
                        onClick={() => setActiveTab('questions')}
                    >
                        <HelpCircle size={16} />
                        الأسئلة ({questions.length})
                    </button>
                </div>
            </div>

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
                <div className="flex flex-col gap-md">
                    {reviews.map((review) => (
                        <div key={review.id} className="card">
                            <div className="flex items-start gap-md">
                                <img
                                    src={review.avatar}
                                    alt={review.customer}
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: 'var(--radius-md)',
                                        objectFit: 'cover',
                                        flexShrink: 0
                                    }}
                                />
                                <div style={{ flex: 1 }}>
                                    <div className="flex items-center justify-between mb-sm">
                                        <div>
                                            <h4 style={{ fontWeight: '600', fontSize: 15 }}>{review.customer}</h4>
                                            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{review.product}</p>
                                        </div>
                                        <div className="flex items-center gap-sm">
                                            <div className="flex">{renderStars(review.rating)}</div>
                                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{review.date}</span>
                                        </div>
                                    </div>
                                    <p style={{ lineHeight: '1.7', marginBottom: 'var(--spacing-md)', fontSize: 14 }}>{review.comment}</p>

                                    {review.replied && (
                                        <div style={{
                                            padding: 'var(--spacing-md)',
                                            background: '#eff6ff',
                                            borderRadius: 'var(--radius-md)',
                                            borderRight: '3px solid #3b82f6',
                                            marginBottom: 'var(--spacing-sm)'
                                        }}>
                                            <p style={{ fontSize: '12px', color: '#3b82f6', marginBottom: '4px', fontWeight: 600 }}>ردك:</p>
                                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{review.reply}</p>
                                        </div>
                                    )}

                                    {!review.replied && (
                                        <button className="btn btn-primary btn-sm" onClick={() => setReplyModal(review)}>
                                            <Reply size={14} />
                                            الرد على التقييم
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Questions Tab */}
            {activeTab === 'questions' && (
                <div className="flex flex-col gap-md">
                    {questions.map((question) => (
                        <div key={question.id} className="card">
                            <div className="flex items-start gap-md">
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#eff6ff',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#3b82f6',
                                    flexShrink: 0
                                }}>
                                    <HelpCircle size={24} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div className="flex items-center justify-between mb-sm">
                                        <div>
                                            <h4 style={{ fontWeight: '600', fontSize: 15 }}>{question.customer}</h4>
                                            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{question.product}</p>
                                        </div>
                                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{question.date}</span>
                                    </div>
                                    <p style={{ lineHeight: '1.7', marginBottom: 'var(--spacing-md)', fontWeight: '500', fontSize: 14 }}>
                                        {question.question}
                                    </p>

                                    {question.answered && (
                                        <div style={{
                                            padding: 'var(--spacing-md)',
                                            background: '#d1fae5',
                                            borderRadius: 'var(--radius-md)',
                                            borderRight: '3px solid #10b981',
                                            marginBottom: 'var(--spacing-sm)'
                                        }}>
                                            <p style={{ fontSize: '12px', color: '#10b981', marginBottom: '4px', fontWeight: 600 }}>إجابتك:</p>
                                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{question.answer}</p>
                                        </div>
                                    )}

                                    {!question.answered && (
                                        <button className="btn btn-primary btn-sm">
                                            <MessageCircle size={14} />
                                            الرد على السؤال
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Reply Modal */}
            {replyModal && (
                <div className="modal-overlay" onClick={() => setReplyModal(null)}>
                    <div className="modal" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">الرد على تقييم {replyModal.customer}</h3>
                            <button className="modal-close" onClick={() => setReplyModal(null)}>
                                <X size={18} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div style={{
                                padding: 'var(--spacing-md)',
                                background: 'var(--bg-input)',
                                borderRadius: 'var(--radius-md)',
                                marginBottom: 'var(--spacing-lg)'
                            }}>
                                <div className="flex mb-sm">{renderStars(replyModal.rating)}</div>
                                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>"{replyModal.comment}"</p>
                            </div>
                            <div className="form-group">
                                <label className="form-label">ردك</label>
                                <textarea className="form-textarea" placeholder="اكتب ردك هنا..." rows={4}></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary">
                                <Send size={18} />
                                إرسال الرد
                            </button>
                            <button className="btn btn-secondary" onClick={() => setReplyModal(null)}>
                                إلغاء
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
