import { Package, ShoppingCart, Edit, Trash2, Plus, User, MapPin, ExternalLink, Filter, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const activities = [
    {
        id: 1,
        employee: { name: 'أحمد محمد', role: 'مدير المنتجات', avatar: 'https://i.pravatar.cc/150?img=11' },
        action: 'أضاف منتج جديد',
        target: 'هاتف سامسونج Galaxy S24',
        location: 'القاهرة، مصر',
        time: 'منذ 5 دقائق',
        date: '21 ديسمبر 2024',
        icon: Plus,
        iconBg: 'bg-emerald-50',
        iconColor: 'text-emerald-600'
    },
    {
        id: 2,
        employee: { name: 'سارة أحمد', role: 'مسؤولة المخزون', avatar: 'https://i.pravatar.cc/150?img=5' },
        action: 'عدّل سعر منتج',
        target: 'سماعات AirPods Pro',
        details: 'من 4,500 إلى 4,200 ج.م',
        location: 'الإسكندرية، مصر',
        time: 'منذ 15 دقيقة',
        date: '21 ديسمبر 2024',
        icon: Edit,
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-600'
    },
    {
        id: 3,
        employee: { name: 'محمد علي', role: 'مسؤول الطلبات', avatar: 'https://i.pravatar.cc/150?img=12' },
        action: 'حدّث حالة طلب',
        target: 'ORD-2024-78432',
        details: 'من "جديد" إلى "تحت التجهيز"',
        location: 'الجيزة، مصر',
        time: 'منذ 30 دقيقة',
        date: '21 ديسمبر 2024',
        icon: ShoppingCart,
        iconBg: 'bg-amber-50',
        iconColor: 'text-amber-600'
    },
    {
        id: 4,
        employee: { name: 'نورهان طه', role: 'مسؤولة المنتجات', avatar: 'https://i.pravatar.cc/150?img=9' },
        action: 'حذف منتج',
        target: 'كابل شحن قديم',
        location: 'القاهرة، مصر',
        time: 'منذ ساعة',
        date: '21 ديسمبر 2024',
        icon: Trash2,
        iconBg: 'bg-red-50',
        iconColor: 'text-red-600'
    },
    {
        id: 5,
        employee: { name: 'أحمد محمد', role: 'مدير المنتجات', avatar: 'https://i.pravatar.cc/150?img=11' },
        action: 'أضاف 5 منتجات',
        target: 'تشكيلة إكسسوارات',
        location: 'القاهرة، مصر',
        time: 'منذ 2 ساعة',
        date: '21 ديسمبر 2024',
        icon: Package,
        iconBg: 'bg-indigo-50',
        iconColor: 'text-indigo-600'
    },
];

export default function ActivityLog() {
    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="page-title">{t('activityLog.title')}</h2>
                    <p className="page-subtitle">{t('activityLog.subtitle')}</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Filter size={16} />
                        تصفية
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Calendar size={16} />
                        اليوم
                    </Button>
                </div>
            </div>

            {/* Activity List */}
            <Card className="border-slate-100 shadow-sm">
                <CardContent className="p-0">
                    {activities.map((activity, idx) => {
                        const IconComponent = activity.icon;
                        return (
                            <div key={activity.id}>
                                <div className="flex items-start gap-4 p-6">
                                    {/* Employee Avatar */}
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={activity.employee.avatar} alt={activity.employee.name} />
                                        <AvatarFallback>{activity.employee.name.charAt(0)}</AvatarFallback>
                                    </Avatar>

                                    {/* Activity Content */}
                                    <div className="flex-1 min-w-0">
                                        {/* Employee Name & Role */}
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-semibold text-sm text-slate-900">{activity.employee.name}</span>
                                            <Badge variant="secondary" className="text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-100">
                                                {activity.employee.role}
                                            </Badge>
                                        </div>

                                        {/* Action */}
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className={`flex items-center justify-center w-7 h-7 rounded-md ${activity.iconBg}`}>
                                                <IconComponent size={14} className={activity.iconColor} />
                                            </div>
                                            <span className="text-sm text-slate-700">
                                                {activity.action}: <span className="text-blue-600 font-medium">{activity.target}</span>
                                            </span>
                                        </div>

                                        {activity.details && (
                                            <p className="text-xs text-slate-500 mb-2 mr-9">{activity.details}</p>
                                        )}

                                        {/* Location & Time */}
                                        <div className="flex items-center gap-4 text-xs text-slate-400">
                                            <span className="flex items-center gap-1">
                                                <MapPin size={12} />
                                                {activity.location}
                                            </span>
                                            <span>{activity.time}</span>
                                        </div>
                                    </div>

                                    {/* Link to Employee Profile */}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => navigate('/employees')}
                                        className="gap-2 text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                                    >
                                        <User size={14} />
                                        الملف الشخصي
                                        <ExternalLink size={12} />
                                    </Button>
                                </div>
                                {idx < activities.length - 1 && <Separator className="bg-slate-50" />}
                            </div>
                        );
                    })}
                </CardContent>
            </Card>
        </div>
    );
}
