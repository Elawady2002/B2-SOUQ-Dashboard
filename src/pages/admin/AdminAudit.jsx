import { useState } from 'react';
import {
    Activity,
    Search,
    Filter,
    Download,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Server,
    ShieldAlert,
    User
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function AdminAudit() {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Audit Logs
    const auditLogs = [
        { id: 1001, actor: 'أحمد الإداري', action: 'تغيير حالة تاجر', target: 'متجر الإلكترونيات', ip: '192.168.1.1', time: '2025-12-27 10:30 AM', status: 'success', severity: 'critical' },
        { id: 1002, actor: 'منى الدعم', action: 'إغلاق نزاع #552', target: 'العميل: محمد علي', ip: '192.168.1.45', time: '2025-12-27 09:15 AM', status: 'success', severity: 'normal' },
        { id: 1003, actor: 'النظام', action: 'عملية دفع فاشلة', target: 'طلب #9921', ip: 'Server', time: '2025-12-27 08:45 AM', status: 'failed', severity: 'warning' },
        { id: 1004, actor: 'خالد المالي', action: 'صرف مستحقات', target: 'أزياء الموضة', ip: '10.0.0.23', time: '2025-12-26 14:20 PM', status: 'success', severity: 'critical' },
        { id: 1005, actor: 'سارة العمليات', action: 'تحديث المخزون', target: 'Product SKU-123', ip: '192.168.1.12', time: '2025-12-26 11:00 AM', status: 'success', severity: 'normal' },
    ];

    const getSeverityBadge = (severity) => {
        switch (severity) {
            case 'critical':
                return <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">حساس</Badge>;
            case 'warning':
                return <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">تحذير</Badge>;
            default:
                return <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-200">عادي</Badge>;
        }
    };

    return (
        <div className="space-y-6" dir="rtl">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">سجل النشاطات (Audit Log)</h1>
                    <p className="text-slate-500 mt-1">تتبع العمليات الحساسة وسجل النظام للأمان والمراجعة.</p>
                </div>
                <Button variant="outline" className="gap-2">
                    <Download size={18} />
                    تصدير السجل
                </Button>
            </div>

            <Card className="border-slate-100 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
                    <div className="flex items-center gap-2 flex-1">
                        <div className="relative w-64">
                            <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="بحث في السجل..."
                                className="pr-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="كل المستويات" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">الكل</SelectItem>
                                <SelectItem value="critical">عمليات حساسة</SelectItem>
                                <SelectItem value="warning">تحذيرات</SelectItem>
                                <SelectItem value="normal">عادي</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" className="gap-2">
                            <Filter size={16} />
                            تصفية متقدمة
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-right">المستخدم / النظام</TableHead>
                                <TableHead className="text-right">الإجراء</TableHead>
                                <TableHead className="text-right">الهدف المتأثر</TableHead>
                                <TableHead className="text-right">IP Address</TableHead>
                                <TableHead className="text-right">التوقت</TableHead>
                                <TableHead className="text-right">المستوى</TableHead>
                                <TableHead className="text-right">الحالة</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {auditLogs.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback className={log.actor === 'النظام' ? 'bg-slate-800 text-white' : 'bg-blue-50 text-blue-600'}>
                                                    {log.actor === 'النظام' ? <Server size={14} /> : <User size={14} />}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm font-medium text-slate-900">{log.actor}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-slate-700">{log.action}</TableCell>
                                    <TableCell className="text-slate-500 text-sm">{log.target}</TableCell>
                                    <TableCell className="font-mono text-xs text-slate-500">{log.ip}</TableCell>
                                    <TableCell className="text-slate-500 text-sm" dir="ltr">{log.time}</TableCell>
                                    <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                                    <TableCell>
                                        {log.status === 'success' ? (
                                            <CheckCircle size={18} className="text-emerald-500" />
                                        ) : (
                                            <XCircle size={18} className="text-red-500" />
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
