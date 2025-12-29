import { useState } from 'react';
import { Search, Mail, MessageSquare, AlertCircle, UserPlus, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminSupport() {
    const [selectedTicket, setSelectedTicket] = useState(null);

    // Mock Data
    const tickets = [
        { id: 1, user: 'محمد علي', role: 'تاجر', subject: 'مشكلة في رفع المنتجات', date: 'منذ ساعتين', priority: 'high', status: 'open', assignedTo: null },
        { id: 2, user: 'سارة أحمد', role: 'مشتري', subject: 'تأخر في التوصيل', date: 'أمس', priority: 'medium', status: 'open', assignedTo: 'Ahmed Supp' },
        { id: 3, user: 'شركة النور', role: 'تاجر', subject: 'استفسار عن العمولات', date: 'منذ يومين', priority: 'low', status: 'closed', assignedTo: 'Sarah Fin' },
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
                <div className="w-1/3 bg-white rounded-xl border border-slate-200 flex flex-col shadow-sm">
                    <div className="p-4 border-b border-slate-200">
                        <div className="relative mb-3">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <Input placeholder="بحث في التذاكر..." className="pr-9 bg-slate-50 border-slate-200" />
                        </div>
                        <Tabs defaultValue="all" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 h-8">
                                <TabsTrigger value="all" className="text-xs">الكل</TabsTrigger>
                                <TabsTrigger value="open" className="text-xs">مفتوحة</TabsTrigger>
                                <TabsTrigger value="closed" className="text-xs">مغلقة</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                    <ScrollArea className="flex-1">
                        <div className="p-2 space-y-1">
                            {tickets.map((ticket) => (
                                <div
                                    key={ticket.id}
                                    onClick={() => setSelectedTicket(ticket)}
                                    className={`p-4 rounded-lg cursor-pointer transition-all border ${selectedTicket?.id === ticket.id ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-100'}`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback className={`text-xs ${ticket.role === 'تاجر' ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-600'}`}>
                                                    {ticket.user.split(' ')[0][0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className="text-sm font-semibold text-slate-900">{ticket.user}</h4>
                                                <span className="text-xs text-slate-500">{ticket.role}</span>
                                            </div>
                                        </div>
                                        <span className="text-xs text-slate-400">{ticket.date}</span>
                                    </div>
                                    <h5 className="text-sm font-medium text-slate-800 mb-2 line-clamp-1">{ticket.subject}</h5>
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2">
                                            {ticket.priority === 'high' && <Badge variant="outline" className="bg-red-50 text-red-600 border-red-100 text-[10px] px-1.5 py-0 h-5">عالية</Badge>}
                                            {ticket.priority === 'medium' && <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-100 text-[10px] px-1.5 py-0 h-5">متوسطة</Badge>}
                                            {ticket.priority === 'low' && <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-100 text-[10px] px-1.5 py-0 h-5">عادية</Badge>}
                                        </div>
                                        {ticket.status === 'open' ? (
                                            <div className="flex items-center gap-1 text-[10px] text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full">
                                                <Clock size={10} /> مفتوحة
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-full">
                                                <CheckCircle size={10} /> مغلقة
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                {/* Ticket Detail */}
                <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    {selectedTicket ? (
                        <>
                            <div className="p-6 border-b border-slate-100 flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-xl font-bold text-slate-900">{selectedTicket.subject}</h2>
                                        <Badge variant="outline">{selectedTicket.id}#</Badge>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        <span>بواسطة: <span className="font-medium text-slate-900">{selectedTicket.user}</span></span>
                                        <span>•</span>
                                        <span>التاريخ: {selectedTicket.date}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" className="gap-2">
                                        <UserPlus size={16} />
                                        {selectedTicket.assignedTo ? 'تغيير المسؤول' : 'تعيين موظف'}
                                    </Button>
                                    <Button variant="default" className="bg-blue-600 hover:bg-blue-700">إغلاق التذكرة</Button>
                                </div>
                            </div>

                            <ScrollArea className="flex-1 p-6 bg-slate-50/50">
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <Avatar>
                                            <AvatarFallback>MA</AvatarFallback>
                                        </Avatar>
                                        <div className="bg-white p-4 rounded-2xl rounded-tr-none shadow-sm border border-slate-200 max-w-[80%]">
                                            <p className="text-sm text-slate-700 leading-relaxed">
                                                مرحباً، أواجه مشكلة عند محاولة رفع صور المنتجات الجديدة. يظهر لي خطأ "Server Error 500" في كل مرة أحاول فيها الرفع. هل يمكنكم المساعدة؟
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 flex-row-reverse">
                                        <Avatar>
                                            <AvatarFallback className="bg-blue-600 text-white">SUP</AvatarFallback>
                                        </Avatar>
                                        <div className="bg-blue-600 p-4 rounded-2xl rounded-tl-none shadow-sm text-white max-w-[80%]">
                                            <p className="text-sm leading-relaxed">
                                                أهلاً بك يا محمد. نعتذر عن هذه المشكلة. هل يمكنك تزويدنا بحجم الصور وصيغتها؟ سنقوم بفحص السجلات فوراً.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollArea>

                            <div className="p-4 border-t border-slate-200 bg-white">
                                <div className="flex gap-2">
                                    <Input placeholder="كتب رد..." className="flex-1" />
                                    <Button size="icon" className="bg-blue-600"><MessageSquare size={18} /></Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center p-8">
                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                                <MessageSquare size={32} className="text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">عرض التفاصيل</h3>
                            <p className="text-slate-500 max-w-xs mx-auto">قم باختيار تذكرة من القائمة لعرض المحادثة والبدء في المعالجة.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
