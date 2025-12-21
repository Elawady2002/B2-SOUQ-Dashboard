import { useState } from 'react';
import { Send, Clock, Search, MoreHorizontal, Image, Paperclip, Smile, ChevronDown, X, Headphones, Pin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

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
    const { t } = useLanguage();
    const [selectedConv, setSelectedConv] = useState(conversations[0]);
    const [messageInput, setMessageInput] = useState('');

    const messages = selectedConv?.isSupport ? supportMessages : customerMessages;

    return (
        <div className="flex h-[calc(100vh-120px)] bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">

            {/* Right Sidebar */}
            <div className="w-[340px] border-l border-slate-100 flex flex-col bg-white">

                {/* Title */}
                <div className="p-5 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900">{t('messages.title')}</h3>
                </div>

                {/* Search & Filter */}
                <div className="p-4 border-b border-slate-100 space-y-3">
                    <div className="relative">
                        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input
                            type="text"
                            placeholder={t('messages.searchConversation') || 'Search conversation...'}
                            className="pr-10 bg-slate-50 border-slate-200 text-sm h-10"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700 flex-1">
                            <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/20 text-xs px-2">5</Badge>
                            {t('messages.open') || 'Open'}
                            <ChevronDown size={14} />
                        </Button>
                        <Button variant="outline" size="sm" className="text-slate-600">
                            {t('messages.newest') || 'Newest'}
                        </Button>
                    </div>
                </div>

                {/* Conversations List */}
                <ScrollArea className="flex-1">
                    {conversations.map((conv) => (
                        <div
                            key={conv.id}
                            onClick={() => setSelectedConv(conv)}
                            className={`flex items-start gap-3 p-4 cursor-pointer border-b border-slate-50 transition-colors ${selectedConv?.id === conv.id
                                ? 'bg-slate-50'
                                : conv.isPinned
                                    ? 'bg-blue-50/50 hover:bg-blue-50'
                                    : 'hover:bg-slate-50'
                                }`}
                        >
                            {conv.isSupport ? (
                                <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                                    <Headphones size={22} className="text-white" />
                                </div>
                            ) : (
                                <div className="relative flex-shrink-0">
                                    <Avatar className="h-11 w-11">
                                        <AvatarImage src={conv.avatar} alt={conv.name} />
                                        <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    {conv.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />}
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <div className="flex items-center gap-1.5">
                                        {conv.isPinned && <Pin size={12} className="text-blue-600" />}
                                        <span className={`text-sm ${conv.unread || conv.isPinned ? 'font-semibold' : 'font-medium'} text-slate-900`}>
                                            {conv.name}
                                        </span>
                                    </div>
                                    <span className={`text-xs ${conv.isSupport ? 'text-emerald-500' : 'text-slate-400'}`}>
                                        {conv.time}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-600 overflow-hidden text-ellipsis whitespace-nowrap mb-1.5">
                                    {conv.lastMessage}
                                </p>
                                {conv.product && (
                                    <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-50">
                                        {conv.product}
                                    </Badge>
                                )}
                                {conv.isSupport && (
                                    <Badge className="text-xs bg-blue-600 hover:bg-blue-700">
                                        {t('messages.technicalSupport')}
                                    </Badge>
                                )}
                            </div>
                            {conv.unread && <span className="w-2.5 h-2.5 bg-red-500 rounded-full flex-shrink-0 mt-1.5" />}
                        </div>
                    ))}
                </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-slate-50">

                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-white border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        {selectedConv?.isSupport ? (
                            <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center">
                                <Headphones size={22} className="text-white" />
                            </div>
                        ) : (
                            <Avatar className="h-11 w-11">
                                <AvatarImage src={selectedConv?.avatar} alt={selectedConv?.name} />
                                <AvatarFallback>{selectedConv?.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                        )}
                        <div>
                            <p className="font-semibold text-sm text-slate-900">{selectedConv?.name}</p>
                            {selectedConv?.product && (
                                <p className="text-xs text-slate-600">
                                    استفسار عن: <span className="text-blue-600">{selectedConv.product}</span>
                                </p>
                            )}
                            {selectedConv?.isSupport && <p className="text-xs text-emerald-500">● متصل الآن</p>}
                        </div>
                    </div>
                    {!selectedConv?.isSupport && (
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="gap-2">
                                <Clock size={16} />
                                تأجيل
                            </Button>
                            <Button size="sm" className="gap-2 bg-emerald-500 hover:bg-emerald-600">
                                ✓ تم الحل
                            </Button>
                            <Button size="sm" variant="destructive" className="gap-2">
                                <X size={16} />
                                إغلاق
                            </Button>
                        </div>
                    )}
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-6">
                    <div className="flex flex-col gap-4">
                        {messages.map((msg) => {
                            const isAgent = msg.sender === 'agent' || msg.sender === 'support';
                            return (
                                <div key={msg.id} className={`flex ${isAgent ? 'justify-start' : 'justify-end'}`}>
                                    <div className="max-w-[60%]">
                                        {msg.type === 'product' ? (
                                            <Card className="border-slate-200">
                                                <CardContent className="p-4">
                                                    <img
                                                        src={msg.image}
                                                        alt=""
                                                        className="w-[140px] h-[140px] rounded-xl object-cover mb-3"
                                                    />
                                                    <p className="text-sm font-semibold text-blue-600 mb-1">{msg.text}</p>
                                                    <p className="text-sm text-emerald-600 font-semibold">{msg.price}</p>
                                                </CardContent>
                                            </Card>
                                        ) : (
                                            <div className={`
                                                px-4 py-3.5 rounded-2xl
                                                ${isAgent
                                                    ? 'bg-blue-600 text-white rounded-br-sm'
                                                    : 'bg-white text-slate-900 border border-slate-200 rounded-bl-sm'
                                                }
                                            `}>
                                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                                {msg.time && (
                                                    <p className={`text-xs mt-2 text-left ${isAgent ? 'text-white/70' : 'text-slate-400'
                                                        }`}>
                                                        {msg.time}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </ScrollArea>

                {/* Input */}
                <div className="p-5 bg-white border-t border-slate-100">
                    <div className="flex items-center gap-3">
                        <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                            إرسال
                            <Send size={18} />
                        </Button>
                        <Input
                            type="text"
                            placeholder="اكتب رسالتك هنا..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            className="flex-1 bg-slate-50 border-slate-200 text-right"
                        />
                        <div className="flex gap-1">
                            <Button variant="outline" size="icon" className="h-11 w-11">
                                <Smile size={20} className="text-slate-600" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-11 w-11">
                                <Paperclip size={20} className="text-slate-600" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-11 w-11">
                                <Image size={20} className="text-slate-600" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
