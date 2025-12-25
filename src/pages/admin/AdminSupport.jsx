import { Search, Mail, MessageSquare, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function AdminSupport() {
    // Mock Data
    const tickets = [
        { id: 1, user: 'محمد علي', role: 'تاجر', subject: 'مشكلة في رفع المنتجات', date: 'منذ ساعتين', priority: 'high', status: 'open' },
        { id: 2, user: 'سارة أحمد', role: 'مشتري', subject: 'تأخر في التوصيل', date: 'أمس', priority: 'medium', status: 'open' },
        { id: 3, user: 'شركة النور', role: 'تاجر', subject: 'استفسار عن العمولات', date: 'منذ يومين', priority: 'low', status: 'closed' },
    ];

    return (
        <div className="h-[calc(100vh-2rem)] flex flex-col gap-4" dir="rtl">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">الدعم الفني</h1>
                    <p className="text-slate-500">متابعة تذاكر الدعم ورسائل المستخدمين.</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                    <Mail size={16} />
                    إنشاء تذكرة
                </Button>
            </div>

            <div className="flex gap-6 flex-1 overflow-hidden">
                {/* Ticket List */}
                <div className="w-1/3 bg-white rounded-xl border border-slate-200 flex flex-col">
                    <div className="p-4 border-b border-slate-200">
                        <div className="relative">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <Input placeholder="بحث في التذاكر..." className="pr-9 bg-slate-50 border-slate-200" />
                        </div>
                    </div>
                    <ScrollArea className="flex-1">
                        <div className="p-2 space-y-1">
                            {tickets.map((ticket) => (
                                <div key={ticket.id} className={`p-4 rounded-lg cursor-pointer hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors ${ticket.id === 1 ? 'bg-blue-50/50 border-blue-100' : ''}`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback className="bg-slate-200 text-slate-600 text-xs">MA</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className="text-sm font-semibold text-slate-900">{ticket.user}</h4>
                                                <span className="text-xs text-slate-500">{ticket.role}</span>
                                            </div>
                                        </div>
                                        <span className="text-xs text-slate-400">{ticket.date}</span>
                                    </div>
                                    <h5 className="text-sm font-medium text-slate-800 mb-1">{ticket.subject}</h5>
                                    <div className="flex gap-2 mt-2">
                                        {ticket.priority === 'high' && <Badge variant="outline" className="bg-red-50 text-red-600 border-red-100 text-[10px]">عالية الأهمية</Badge>}
                                        {ticket.priority === 'medium' && <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-100 text-[10px]">متوسطة</Badge>}
                                        {ticket.status === 'open' ? (
                                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0 text-[10px]">مفتوحة</Badge>
                                        ) : (
                                            <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-0 text-[10px]">مغلقة</Badge>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                {/* Ticket Detail / Chat Area */}
                <div className="flex-1 bg-white rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center p-8">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                        <MessageSquare size={32} className="text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">اختر تذكرة لعرض التفاصيل</h3>
                    <p className="text-slate-500 max-w-xs mx-auto">قم باختيار تذكرة من القائمة الجانبية لعرض المحادثة والرد على المستخدم.</p>
                </div>
            </div>
        </div>
    );
}
