import { useState } from 'react';
import { Send, Clock, Search, MoreHorizontal, Image, Paperclip, Smile, ChevronDown, X, Headphones, Pin } from 'lucide-react';

const conversations = [
    { id: 0, name: 'الدعم الفني', avatar: '', lastMessage: 'أهلاً بك! نحن سعداء بخدمتك...', time: 'متصل', unread: false, online: true, isPinned: true, isSupport: true },
    { id: 1, name: 'أحمد محمود', avatar: 'https://i.pravatar.cc/150?img=11', lastMessage: 'اشتريت المنتج ده من عندكم وعاوز استفسر...', time: '3 د', unread: true, online: false, product: 'شاحن لاسلكي' },
    { id: 2, name: 'سارة علي', avatar: 'https://i.pravatar.cc/150?img=5', lastMessage: 'مرحبا، عندي سؤال عن المنتج...', time: '5 د', unread: true, online: true, product: 'سماعة AirPods' },
    { id: 3, name: 'محمد حسن', avatar: 'https://i.pravatar.cc/150?img=12', lastMessage: 'صباح الخير، المنتج وصل متأخر...', time: '12 د', unread: false, online: false, product: 'ساعة Apple Watch' },
    { id: 4, name: 'نورهان طه', avatar: 'https://i.pravatar.cc/150?img=9', lastMessage: 'عندي مشكلة في الطلب...', time: '25 د', unread: false, online: false, product: 'هاتف iPhone 15' },
    { id: 5, name: 'يوسف أحمد', avatar: 'https://i.pravatar.cc/150?img=15', lastMessage: 'هل يوجد ضمان على المنتج؟', time: '1 س', unread: false, online: true, product: 'لابتوب MacBook' },
];

const supportMessages = [
    { id: 1, sender: 'support', text: 'أهلاً بك في دعم B2 SOUQ! كيف يمكننا مساعدتك اليوم؟', time: '' },
];

const customerMessages = [
    { id: 1, sender: 'customer', text: 'اشتريت المنتج ده من عندكم، بس فاتتني مدة الارجاع بيوم واحد. ممكن تعملوا استثناء؟', time: '8 د' },
    { id: 2, sender: 'customer', text: 'شمعة Baies المعطرة', time: '8 د', type: 'product', image: 'https://images.unsplash.com/photo-1602607445090-038e2c30ecff?w=120', price: '450 ج.م' },
    { id: 3, sender: 'agent', text: 'أهلاً أحمد! خليني أشوف الموضوع ده واحل لك المشكلة.', time: '5 د' },
    { id: 4, sender: 'agent', text: 'ممكن توضحلي سبب الارجاع؟', time: '4 د' },
    { id: 5, sender: 'customer', text: 'أنا اشتريت المنتج الغلط بالخطأ 😅', time: '4 د' },
    { id: 6, sender: 'agent', text: 'تحب تستبدل المنتج بالمنتج الصح بدل الارجاع؟', time: '3 د' },
];

export default function Messages() {
    const [selectedConv, setSelectedConv] = useState(conversations[0]);
    const [messageInput, setMessageInput] = useState('');

    const messages = selectedConv?.isSupport ? supportMessages : customerMessages;

    return (
        <div style={{ display: 'flex', height: 'calc(100vh - 120px)', background: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>

            {/* Right Sidebar */}
            <div style={{ width: '340px', borderLeft: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', background: 'white' }}>

                {/* Title */}
                <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b' }}>الرسائل</h3>
                </div>

                {/* Search & Filter */}
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
                    <div style={{ position: 'relative', marginBottom: '12px' }}>
                        <Search size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input type="text" placeholder="ابحث عن محادثة..." style={{ width: '100%', padding: '10px 40px 10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', background: '#f8fafc' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: '#2563eb', border: 'none', borderRadius: '8px', color: 'white', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
                            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>5</span>
                            مفتوحة
                            <ChevronDown size={14} />
                        </button>
                        <button style={{ padding: '8px 14px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#64748b', fontSize: '13px', cursor: 'pointer' }}>الأحدث</button>
                    </div>
                </div>

                {/* Conversations List */}
                <div style={{ flex: 1, overflow: 'auto' }}>
                    {conversations.map((conv) => (
                        <div
                            key={conv.id}
                            onClick={() => setSelectedConv(conv)}
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '12px',
                                padding: '16px 20px',
                                cursor: 'pointer',
                                background: selectedConv?.id === conv.id ? '#f8fafc' : conv.isPinned ? '#eff6ff' : 'white',
                                borderBottom: '1px solid #f1f5f9'
                            }}
                        >
                            {conv.isSupport ? (
                                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Headphones size={22} color="white" />
                                </div>
                            ) : (
                                <div style={{ position: 'relative', flexShrink: 0 }}>
                                    <img src={conv.avatar} alt="" style={{ width: '44px', height: '44px', borderRadius: '50%' }} />
                                    {conv.online && <span style={{ position: 'absolute', bottom: '2px', right: '2px', width: '12px', height: '12px', background: '#10b981', borderRadius: '50%', border: '2px solid white' }}></span>}
                                </div>
                            )}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        {conv.isPinned && <Pin size={12} color="#2563eb" />}
                                        <span style={{ fontWeight: conv.unread || conv.isPinned ? 600 : 500, fontSize: '14px', color: '#1e293b' }}>{conv.name}</span>
                                    </div>
                                    <span style={{ fontSize: '11px', color: conv.isSupport ? '#10b981' : '#94a3b8' }}>{conv.time}</span>
                                </div>
                                <p style={{ fontSize: '12px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '6px' }}>{conv.lastMessage}</p>
                                {conv.product && <span style={{ fontSize: '11px', color: '#2563eb', background: '#eff6ff', padding: '3px 10px', borderRadius: '6px' }}>{conv.product}</span>}
                                {conv.isSupport && <span style={{ fontSize: '11px', color: 'white', background: '#2563eb', padding: '3px 10px', borderRadius: '6px' }}>دعم فني</span>}
                            </div>
                            {conv.unread && <span style={{ width: '10px', height: '10px', background: '#ef4444', borderRadius: '50%', flexShrink: 0, marginTop: '6px' }}></span>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', background: 'white', borderBottom: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {selectedConv?.isSupport ? (
                            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Headphones size={22} color="white" />
                            </div>
                        ) : (
                            <img src={selectedConv?.avatar} alt="" style={{ width: '44px', height: '44px', borderRadius: '50%' }} />
                        )}
                        <div>
                            <p style={{ fontWeight: 600, fontSize: '15px', color: '#1e293b' }}>{selectedConv?.name}</p>
                            {selectedConv?.product && <p style={{ fontSize: '12px', color: '#64748b' }}>استفسار عن: <span style={{ color: '#2563eb' }}>{selectedConv.product}</span></p>}
                            {selectedConv?.isSupport && <p style={{ fontSize: '12px', color: '#10b981' }}>● متصل الآن</p>}
                        </div>
                    </div>
                    {!selectedConv?.isSupport && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', color: '#64748b' }}>
                                <Clock size={16} /> تأجيل
                            </button>
                            <button style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#10b981', color: 'white', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>
                                ✓ تم الحل
                            </button>
                            <button style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#ef4444', color: 'white', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>
                                <X size={16} /> إغلاق
                            </button>
                        </div>
                    )}
                </div>

                {/* Messages */}
                <div style={{ flex: 1, overflow: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {messages.map((msg) => {
                        const isAgent = msg.sender === 'agent' || msg.sender === 'support';
                        return (
                            <div key={msg.id} style={{ display: 'flex', justifyContent: isAgent ? 'flex-start' : 'flex-end' }}>
                                <div style={{ maxWidth: '60%' }}>
                                    {msg.type === 'product' ? (
                                        <div style={{ background: 'white', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                                            <img src={msg.image} alt="" style={{ width: '140px', height: '140px', borderRadius: '12px', objectFit: 'cover', marginBottom: '12px' }} />
                                            <p style={{ fontSize: '14px', fontWeight: 600, color: '#2563eb', marginBottom: '4px' }}>{msg.text}</p>
                                            <p style={{ fontSize: '14px', color: '#10b981', fontWeight: 600 }}>{msg.price}</p>
                                        </div>
                                    ) : (
                                        <div style={{
                                            background: isAgent ? '#2563eb' : 'white',
                                            color: isAgent ? 'white' : '#1e293b',
                                            padding: '14px 18px',
                                            borderRadius: isAgent ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                            border: !isAgent ? '1px solid #e2e8f0' : 'none'
                                        }}>
                                            <p style={{ fontSize: '14px', lineHeight: 1.7, color: isAgent ? 'white' : '#1e293b' }}>{msg.text}</p>
                                            {msg.time && <p style={{ fontSize: '11px', marginTop: '8px', textAlign: 'left', color: isAgent ? 'rgba(255,255,255,0.7)' : '#94a3b8' }}>{msg.time}</p>}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Input */}
                <div style={{ padding: '20px 24px', background: 'white', borderTop: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button style={{ padding: '12px 24px', borderRadius: '10px', border: 'none', background: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}>
                            إرسال <Send size={18} />
                        </button>
                        <input
                            type="text"
                            placeholder="اكتب رسالتك هنا..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            style={{ flex: 1, padding: '14px 18px', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', background: '#f8fafc', textAlign: 'right' }}
                        />
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <button style={{ width: '44px', height: '44px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Smile size={20} color="#64748b" /></button>
                            <button style={{ width: '44px', height: '44px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Paperclip size={20} color="#64748b" /></button>
                            <button style={{ width: '44px', height: '44px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Image size={20} color="#64748b" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
