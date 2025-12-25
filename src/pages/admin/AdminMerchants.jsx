import { useState } from 'react';
import {
    Search,
    Filter,
    MoreHorizontal,
    ShieldAlert,
    CheckCircle,
    XCircle,
    Eye,
    Mail
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function AdminMerchants() {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Data
    const merchants = [
        { id: 1, name: 'أحمد محمد', store: 'متجر الإلكترونيات', email: 'ahmed@example.com', sales: 'EGP 124,000', status: 'active', joinDate: '2025-01-15' },
        { id: 2, name: 'سارة علي', store: 'أزياء الموضة', email: 'sara@example.com', sales: 'EGP 98,500', status: 'active', joinDate: '2025-02-01' },
        { id: 3, name: 'خالد عمر', store: 'مستلزمات رياضية', email: 'khaled@example.com', sales: 'EGP 45,000', status: 'warning', joinDate: '2025-03-10' },
        { id: 4, name: 'منى حسن', store: 'ديكور منزلي', email: 'mona@example.com', sales: 'EGP 12,000', status: 'banned', joinDate: '2025-04-05' },
        { id: 5, name: 'يوسف كمال', store: 'ألعاب أطفال', email: 'yousef@example.com', sales: 'EGP 0', status: 'pending', joinDate: '2025-05-20' },
    ];

    return (
        <div className="space-y-6" dir="rtl">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">إدارة التجار</h1>
                    <p className="text-slate-500 mt-1">عرض وإدارة حسابات البائعين والتاجر المسجلين.</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <Mail className="ml-2 h-4 w-4" />
                    مراسلة الجميع
                </Button>
            </div>

            <Card className="border-slate-100 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
                    <div className="flex items-center gap-2">
                        <div className="relative w-64">
                            <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="بحث عن تاجر..."
                                className="pr-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" className="gap-2">
                            <Filter size={16} />
                            تصفية
                        </Button>
                    </div>
                    <div className="text-sm text-slate-500">
                        عرض <span className="font-bold text-slate-900">{merchants.length}</span> تاجر
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-right">التاجر</TableHead>
                                <TableHead className="text-right">المتجر</TableHead>
                                <TableHead className="text-right">تاريخ الانضمام</TableHead>
                                <TableHead className="text-right">المبيعات</TableHead>
                                <TableHead className="text-right">الحالة</TableHead>
                                <TableHead className="text-right w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {merchants.map((merchant) => (
                                <TableRow key={merchant.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarFallback className="bg-slate-100 text-slate-600">
                                                    {merchant.name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium text-slate-900">{merchant.name}</div>
                                                <div className="text-xs text-slate-500">{merchant.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">{merchant.store}</TableCell>
                                    <TableCell>{merchant.joinDate}</TableCell>
                                    <TableCell>{merchant.sales}</TableCell>
                                    <TableCell>
                                        {merchant.status === 'active' && <Badge className="bg-green-100 text-green-700 hover:bg-green-200">نشط</Badge>}
                                        {merchant.status === 'warning' && <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">تحذير</Badge>}
                                        {merchant.status === 'banned' && <Badge className="bg-red-100 text-red-700 hover:bg-red-200">محظور</Badge>}
                                        {merchant.status === 'pending' && <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200">معلق</Badge>}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-[160px]">
                                                <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="gap-2">
                                                    <Eye size={14} /> عرض التفاصيل
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="gap-2 text-red-600">
                                                    <ShieldAlert size={14} /> حظر التاجر
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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
