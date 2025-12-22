import React, { useState } from 'react';
import {
    Send,
    Search,
    Plus,
    Headphones,
    Paperclip,
    FileText,
    X
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

// Simplified configurations
const categories = {
    technical: { label: 'مشكلة تقנית', color: 'text-purple-600 bg-purple-50' },
    billing: { label: 'استفسار مالي', color: 'text-blue-600 bg-blue-50' },
    product: { label: 'مشكلة منتج', color: 'text-orange-600 bg-orange-50' },
    account: { label: 'إعدادات الحساب', color: 'text-green-600 bg-green-50' },
    other: { label: 'أخرى', color: 'text-slate-600 bg-slate-50' }
};

const priorities = {
    high: { label: 'عالية', color: 'text-red-600' },
    medium: { label: 'متوسطة', color: 'text-amber-600' },
    low: { label: 'منخفضة', color: 'text-emerald-600' }
};

const statuses = {
    open: { label: 'مفتوحة', color: 'bg-blue-100 text-blue-700' },
    in_progress: { label: 'قيد المعالجة', color: 'bg-amber-100 text-amber-700' },
    resolved: { label: 'محلولة', color: 'bg-emerald-100 text-emerald-700' },
    closed: { label: 'مغلقة', color: 'bg-slate-100 text-slate-600' }
};

const tickets = [
    {
        id: 'T-001',
        subject: 'مشكلة في عملية الدفع',
        category: 'billing',
        priority: 'high',
        status: 'open',
        lastUpdate: '5 د',
        unread: 2,
        assignedTo: 'أحمد',
        messages: [
            { id: 1, sender: 'merchant', text: 'مرحباً، أواجه مشكلة في استلام المدفوعات', time: '10:30' },
            { id: 2, sender: 'support', text: 'أهلاً بك! نحن نعمل على حل هذه المشكلة', time: '10:35' },
        ]
    },
    {
        id: 'T-002',
        subject: 'كيفية تعطيل المنتجات مؤقتاً',
        category: 'technical',
        priority: 'medium',
        status: 'in_progress',
        lastUpdate: '1 س',
        unread: 0,
        assignedTo: 'سارة',
        messages: [
            { id: 1, sender: 'merchant', text: 'هل يمكن تعطيل المنتجات مؤقتاً؟', time: '14:20' },
            { id: 2, sender: 'support', text: 'نعم بالتأكيد! يمكنك ذلك من خلال...', time: '14:25' },
        ]
    },
    {
        id: 'T-003',
        subject: 'تحديث بيانات المتجر',
        category: 'account',
        priority: 'low',
        status: 'resolved',
        lastUpdate: '2 يوم',
        unread: 0,
        assignedTo: 'محمد',
        messages: [
            { id: 1, sender: 'merchant', text: 'أريد تحديث عنوان المتجر', time: '09:00' },
            { id: 2, sender: 'support', text: 'تم التحديث بنجاح!', time: '09:15' },
        ]
    },
];

export default function Messages() {
    const { t } = useLanguage();
    const [selectedTicket, setSelectedTicket] = useState(tickets[0]);
    const [messageInput, setMessageInput] = useState('');
    const [showNewTicketSheet, setShowNewTicketSheet] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');
    const [newTicket, setNewTicket] = useState({
        subject: '',
        category: 'technical',
        priority: 'medium',
        description: ''
    });

    const filteredTickets = filterStatus === 'all'
        ? tickets
        : tickets.filter(t => t.status === filterStatus);

    return (
        <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">الدعم الفني</h2>
                    <p className="text-sm text-slate-500 mt-0.5">تواصل مع فريق الدعم</p>
                </div>
                <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => setShowNewTicketSheet(true)}
                >
                    <Plus size={18} className="ml-2" />
                    تذكرة جديدة
                </Button>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-[320px_1fr] gap-4 h-[calc(100vh-200px)]">

                {/* Tickets Sidebar */}
                <Card className="border-slate-200">
                    <CardContent className="p-0 h-full flex flex-col">
                        {/* Search & Filters */}
                        <div className="p-4 space-y-3 border-b">
                            <div className="relative">
                                <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <Input
                                    type="text"
                                    placeholder="بحث..."
                                    className="pr-9 h-9 text-sm"
                                />
                            </div>

                            <div className="flex gap-2">
                                {['all', 'open', 'in_progress', 'resolved'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status)}
                                        className={`px-2.5 py-1 rounded text-xs font-medium transition ${filterStatus === status
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                    >
                                        {status === 'all' ? 'الكل' : statuses[status].label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tickets List */}
                        <div className="flex-1 overflow-y-auto">
                            {filteredTickets.map((ticket) => (
                                <div
                                    key={ticket.id}
                                    onClick={() => setSelectedTicket(ticket)}
                                    className={`p-3 border-b cursor-pointer transition ${selectedTicket?.id === ticket.id
                                            ? 'bg-blue-50 border-r-2 border-r-blue-600'
                                            : 'hover:bg-slate-50'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-1.5">
                                        <span className="text-xs font-mono text-slate-500">{ticket.id}</span>
                                        <span className="text-xs text-slate-400">{ticket.lastUpdate}</span>
                                    </div>

                                    <p className="text-sm font-semibold text-slate-900 mb-2 line-clamp-1">
                                        {ticket.subject}
                                    </p>

                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className={`text-xs ${categories[ticket.category].color}`}>
                                            {categories[ticket.category].label}
                                        </Badge>
                                        <Badge variant="secondary" className={`text-xs ${statuses[ticket.status].color}`}>
                                            {statuses[ticket.status].label}
                                        </Badge>
                                        {ticket.unread > 0 && (
                                            <span className="text-xs text-red-600 font-medium">{ticket.unread}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Chat Area */}
                <Card className="border-slate-200">
                    <CardContent className="p-0 h-full flex flex-col">
                        {/* Header */}
                        <div className="p-4 border-b flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-slate-900">{selectedTicket?.subject}</h3>
                                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                                    <span>{selectedTicket?.id}</span>
                                    <span>•</span>
                                    <span>{categories[selectedTicket?.category].label}</span>
                                    <span>•</span>
                                    <span className={priorities[selectedTicket?.priority].color}>
                                        الأولوية: {priorities[selectedTicket?.priority].label}
                                    </span>
                                </div>
                            </div>
                            <Badge className={statuses[selectedTicket?.status].color}>
                                {statuses[selectedTicket?.status].label}
                            </Badge>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
                            <div className="flex flex-col gap-3">
                                {selectedTicket?.messages.map((msg) => {
                                    const isSupport = msg.sender === 'support';
                                    return (
                                        <div key={msg.id} className={`flex ${isSupport ? 'justify-start' : 'justify-end'}`}>
                                            <div className={`max-w-[70%] ${isSupport ? 'mr-2' : 'ml-2'}`}>
                                                {isSupport && (
                                                    <div className="flex items-center gap-1.5 mb-1">
                                                        <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                                                            <Headphones size={12} className="text-white" />
                                                        </div>
                                                        <span className="text-xs text-slate-600">الدعم</span>
                                                    </div>
                                                )}
                                                <div className={`px-3 py-2 rounded-lg ${isSupport
                                                        ? 'bg-white text-slate-900 border'
                                                        : 'bg-blue-600 text-white'
                                                    }`}>
                                                    <p className="text-sm">{msg.text}</p>
                                                    <p className={`text-xs mt-1 ${isSupport ? 'text-slate-400' : 'text-white/70'}`}>
                                                        {msg.time}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t bg-white">
                            <div className="flex items-end gap-2">
                                <Button variant="ghost" size="icon" className="h-9 w-9">
                                    <Paperclip size={18} />
                                </Button>
                                <Textarea
                                    placeholder="اكتب رسالتك..."
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    className="min-h-[36px] max-h-[100px] resize-none"
                                    rows={1}
                                />
                                <Button className="bg-blue-600 hover:bg-blue-700 h-9">
                                    <Send size={16} />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* New Ticket Sheet */}
            <Sheet open={showNewTicketSheet} onOpenChange={setShowNewTicketSheet}>
                <SheetContent side="left" className="w-[400px] sm:w-[520px] p-0 flex flex-col overflow-hidden">
                    <SheetHeader className="px-6 pt-8 pb-4 border-b">
                        <SheetTitle className="text-lg font-bold text-slate-900">تذكرة جديدة</SheetTitle>
                        <SheetDescription className="text-sm">املأ البيانات وسيتم الرد عليك قريباً</SheetDescription>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto px-6 py-4">
                        <div className="space-y-4">
                            <div>
                                <Label className="text-sm font-medium">الموضوع *</Label>
                                <Input
                                    value={newTicket.subject}
                                    onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                                    placeholder="عنوان المشكلة"
                                    className="mt-1.5"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <Label className="text-sm font-medium">التصنيف *</Label>
                                    <Select
                                        value={newTicket.category}
                                        onValueChange={(value) => setNewTicket({ ...newTicket, category: value })}
                                    >
                                        <SelectTrigger className="mt-1.5">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(categories).map(([key, cat]) => (
                                                <SelectItem key={key} value={key}>{cat.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label className="text-sm font-medium">الأولوية *</Label>
                                    <Select
                                        value={newTicket.priority}
                                        onValueChange={(value) => setNewTicket({ ...newTicket, priority: value })}
                                    >
                                        <SelectTrigger className="mt-1.5">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(priorities).map(([key, priority]) => (
                                                <SelectItem key={key} value={key}>{priority.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div>
                                <Label className="text-sm font-medium">الوصف *</Label>
                                <Textarea
                                    value={newTicket.description}
                                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                                    placeholder="اشرح المشكلة بالتفصيل..."
                                    className="mt-1.5 min-h-[100px] resize-none"
                                />
                            </div>

                            <div>
                                <Label className="text-sm font-medium">مرفقات (اختياري)</Label>
                                <div className="mt-1.5 border-2 border-dashed rounded-lg p-6 text-center hover:bg-slate-50 cursor-pointer">
                                    <FileText className="mx-auto text-slate-400 mb-2" size={28} />
                                    <p className="text-xs text-slate-500">اسحب الملفات أو انقر للاختيار</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border-t flex gap-2">
                        <Button variant="outline" className="flex-1" onClick={() => setShowNewTicketSheet(false)}>
                            إلغاء
                        </Button>
                        <Button
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                            disabled={!newTicket.subject || !newTicket.description}
                            onClick={() => setShowNewTicketSheet(false)}
                        >
                            إرسال
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
