import {
    Star,
    MessageCircle,
    ThumbsUp,
    ThumbsDown,
    Reply,
    Eye,
    Filter,
    HelpCircle,
    X
} from 'lucide-react';
import { useState } from 'react';

const reviews = [
    {
        id: 1,
        customer: 'أحمد محمد',
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
        product: 'سماعات AirPods Pro',
        rating: 4,
        comment: 'السماعات ممتازة لكن التوصيل تأخر يومين عن الموعد المحدد.',
        date: '2024-12-17',
        replied: false
    },
    {
        id: 3,
        customer: 'محمود علي',
        product: 'شاحن لاسلكي',
        rating: 3,
        comment: 'المنتج جيد لكن الجودة أقل قليلاً مما توقعت.',
        date: '2024-12-16',
        replied: false
    },
    {
        id: 4,
        customer: 'فاطمة حسن',
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
                color={i < rating ? '#f59e0b' : '#64748b'}
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
            <div className="grid grid-cols-4 mb-xl">
                <div className="stats-card">
                    <div className="stats-card-icon warning">
                        <Star size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">متوسط التقييم</div>
                        <div className="stats-card-value">4.8</div>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon success">
                        <ThumbsUp size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">تقييمات إيجابية</div>
                        <div className="stats-card-value">2,245</div>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon danger">
                        <ThumbsDown size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">تقييمات سلبية</div>
                        <div className="stats-card-value">45</div>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon info">
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
                <div className="flex gap-md">
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
                <div className="flex flex-col gap-lg">
                    {reviews.map((review) => (
                        <div key={review.id} className="card">
                            <div className="flex items-start gap-lg">
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    background: 'var(--accent-gradient)',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: '600',
                                    fontSize: '18px',
                                    flexShrink: 0
                                }}>
                                    {review.customer.charAt(0)}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div className="flex items-center justify-between mb-sm">
                                        <div>
                                            <h4 style={{ fontWeight: '600' }}>{review.customer}</h4>
                                            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{review.product}</p>
                                        </div>
                                        <div className="flex items-center gap-sm">
                                            <div className="flex">{renderStars(review.rating)}</div>
                                            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{review.date}</span>
                                        </div>
                                    </div>
                                    <p style={{ lineHeight: '1.7', marginBottom: 'var(--spacing-md)' }}>{review.comment}</p>

                                    {review.replied && (
                                        <div style={{
                                            padding: 'var(--spacing-md)',
                                            background: 'var(--bg-secondary)',
                                            borderRadius: 'var(--radius-md)',
                                            borderRight: '3px solid var(--accent-primary)',
                                            marginBottom: 'var(--spacing-md)'
                                        }}>
                                            <p style={{ fontSize: '12px', color: 'var(--accent-primary)', marginBottom: '4px' }}>ردك:</p>
                                            <p style={{ fontSize: '14px' }}>{review.reply}</p>
                                        </div>
                                    )}

                                    {!review.replied && (
                                        <button className="btn btn-secondary btn-sm" onClick={() => setReplyModal(review)}>
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
                <div className="flex flex-col gap-lg">
                    {questions.map((question) => (
                        <div key={question.id} className="card">
                            <div className="flex items-start gap-lg">
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    background: 'var(--info-bg)',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--info)',
                                    flexShrink: 0
                                }}>
                                    <HelpCircle size={24} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div className="flex items-center justify-between mb-sm">
                                        <div>
                                            <h4 style={{ fontWeight: '600' }}>{question.customer}</h4>
                                            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{question.product}</p>
                                        </div>
                                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{question.date}</span>
                                    </div>
                                    <p style={{ lineHeight: '1.7', marginBottom: 'var(--spacing-md)', fontWeight: '500' }}>
                                        ❓ {question.question}
                                    </p>

                                    {question.answered && (
                                        <div style={{
                                            padding: 'var(--spacing-md)',
                                            background: 'var(--success-bg)',
                                            borderRadius: 'var(--radius-md)',
                                            borderRight: '3px solid var(--success)',
                                            marginBottom: 'var(--spacing-md)'
                                        }}>
                                            <p style={{ fontSize: '12px', color: 'var(--success)', marginBottom: '4px' }}>إجابتك:</p>
                                            <p style={{ fontSize: '14px' }}>{question.answer}</p>
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
                                background: 'var(--bg-secondary)',
                                borderRadius: 'var(--radius-md)',
                                marginBottom: 'var(--spacing-lg)'
                            }}>
                                <div className="flex mb-sm">{renderStars(replyModal.rating)}</div>
                                <p style={{ fontSize: '14px' }}>"{replyModal.comment}"</p>
                            </div>
                            <div className="form-group">
                                <label className="form-label">ردك</label>
                                <textarea className="form-textarea" placeholder="اكتب ردك هنا..." rows={4}></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary">
                                <Reply size={18} />
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
