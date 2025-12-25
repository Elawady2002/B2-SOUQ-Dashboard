import { useState } from 'react';
import {
    TrendingUp,
    TrendingDown,
    Users,
    Store,
    ShoppingBag,
    DollarSign,
    MoreHorizontal,
    ArrowUpRight
} from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Register ChartJS
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function AdminHome() {
    // Mock Data
    const statsCards = [
        {
            title: 'إجمالي الإيرادات',
            value: 'EGP 1,250,400',
            change: '+12.5%',
            trend: 'up',
            icon: DollarSign,
            color: 'text-green-600',
            bgColor: 'bg-green-100'
        },
        {
            title: 'إجمالي الطلبات',
            value: '45,231',
            change: '+8.2%',
            trend: 'up',
            icon: ShoppingBag,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100'
        },
        {
            title: 'التجار النشطين',
            value: '1,205',
            change: '+23',
            trend: 'up',
            icon: Store,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-100'
        },
        {
            title: 'المستخدمين الجدد',
            value: '8,540',
            change: '-2.4%',
            trend: 'down',
            icon: Users,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100'
        }
    ];

    // Chart Data
    const revenueChartData = {
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس'],
        datasets: [
            {
                label: 'الإيرادات (EGP)',
                data: [65000, 72000, 85000, 92000, 115000, 125000, 140000, 165000],
                borderColor: '#2563eb', // Blue
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 3,
            }
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { display: true, drawBorder: false },
            },
            x: {
                grid: { display: false, drawBorder: false },
            },
        },
    };

    return (
        <div className="space-y-6" dir="rtl">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900">لوحة التحكم الرئيسية</h1>
                <p className="text-slate-500 mt-1">نظرة عامة على أداء المنصة اليوم.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsCards.map((stat, index) => (
                    <Card key={index} className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                    {stat.change}
                                    {stat.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                                <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Charts & Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Revenue Chart */}
                <Card className="lg:col-span-2 border-slate-100 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl">نمو الإيرادات</CardTitle>
                        <CardDescription>تحليل الأداء المالي للمنصة خلال الأشهر الماضية</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <Line data={revenueChartData} options={chartOptions} />
                        </div>
                    </CardContent>
                </Card>

                {/* Top Merchants */}
                <Card className="border-slate-100 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl">أفضل التجار</CardTitle>
                        <CardDescription>التجار الأكثر مبيعاً هذا الشهر</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[
                                { name: 'متجر الإلكترونيات', sales: 'EGP 124k', initials: 'ES', color: 'bg-blue-100 text-blue-600' },
                                { name: 'أزياء الموضة', sales: 'EGP 98k', initials: 'FM', color: 'bg-pink-100 text-pink-600' },
                                { name: 'بيت الرياضة', sales: 'EGP 85k', initials: 'SH', color: 'bg-orange-100 text-orange-600' },
                                { name: 'عالم التقنية', sales: 'EGP 62k', initials: 'TW', color: 'bg-cyan-100 text-cyan-600' },
                                { name: 'مجوهرات الماس', sales: 'EGP 54k', initials: 'DJ', color: 'bg-indigo-100 text-indigo-600' },
                            ].map((merchant, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarFallback className={merchant.color}>{merchant.initials}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">{merchant.name}</p>
                                            <p className="text-xs text-slate-500">1.2k مبيعات</p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-bold text-slate-700">{merchant.sales}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Registrations Table */}
            <Card className="border-slate-100 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-xl">طلبات التسجيل الجديدة</CardTitle>
                        <CardDescription>تجار بانتظار الموافقة</CardDescription>
                    </div>
                    <Button variant="outline" className="gap-2">
                        عرض الكل
                        <ArrowUpRight size={16} />
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-right">اسم التاجر</TableHead>
                                <TableHead className="text-right">نوع المتجر</TableHead>
                                <TableHead className="text-right">تاريخ الطلب</TableHead>
                                <TableHead className="text-right">الحالة</TableHead>
                                <TableHead className="text-right">الإجراء</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[
                                { name: 'سامي للأدوات', type: 'أدوات منزلية', date: '25 ديسمبر 2025', status: 'pending' },
                                { name: 'بوتيك سندريلا', type: 'ملابس', date: '24 ديسمبر 2025', status: 'pending' },
                                { name: ' تك ستور', type: 'إلكترونيات', date: '23 ديسمبر 2025', status: 'approved' },
                            ].map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell className="font-medium">{row.name}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>
                                        {row.status === 'pending' ? (
                                            <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">بانتظار الموافقة</Badge>
                                        ) : (
                                            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">تمت الموافقة</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="sm">مراجعة</Button>
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
