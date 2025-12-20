import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    DollarSign,
    ShoppingCart,
    Truck,
    RotateCcw,
    MapPin,
    Package,
    Clock,
    Percent,
    Download
} from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const reportCards = [
    {
        label: 'إجمالي المبيعات',
        value: '425,800',
        unit: 'ج.م',
        change: '+15.2%',
        positive: true,
        icon: ShoppingCart,
        sparkline: [30, 35, 32, 40, 38, 45, 42, 48, 50, 55]
    },
    {
        label: 'صافي الأرباح',
        value: '89,300',
        unit: 'ج.م',
        change: '+8.5%',
        positive: true,
        icon: DollarSign,
        sparkline: [15, 18, 16, 20, 22, 19, 24, 26, 25, 28]
    },
    {
        label: 'إجمالي الخصومات',
        value: '12,450',
        unit: 'ج.م',
        change: '-5.2%',
        positive: true,
        icon: Percent,
        sparkline: [8, 10, 12, 11, 9, 8, 7, 6, 7, 5]
    },
    {
        label: 'تكلفة الشحن',
        value: '18,200',
        unit: 'ج.م',
        change: '+3.1%',
        positive: false,
        icon: Truck,
        sparkline: [10, 12, 11, 13, 15, 14, 16, 17, 18, 19]
    },
    {
        label: 'المرتجعات',
        value: '8,650',
        unit: 'ج.م',
        change: '-12.4%',
        positive: true,
        icon: RotateCcw,
        sparkline: [15, 14, 13, 12, 11, 10, 9, 8, 7, 6]
    },
    {
        label: 'نسبة الإلغاء',
        value: '4.2%',
        change: '-1.8%',
        positive: true,
        icon: Clock,
        sparkline: [8, 7, 6, 7, 6, 5, 5, 4, 4, 3]
    },
];

const topCities = [
    { city: 'القاهرة', orders: 892, revenue: '178,400 ج.م', percentage: 42 },
    { city: 'الجيزة', orders: 456, revenue: '91,200 ج.م', percentage: 21 },
    { city: 'الإسكندرية', orders: 324, revenue: '64,800 ج.م', percentage: 15 },
    { city: 'المنصورة', orders: 198, revenue: '39,600 ج.م', percentage: 9 },
    { city: '6 أكتوبر', orders: 156, revenue: '31,200 ج.م', percentage: 7 },
];

const topProducts = [
    { name: 'هاتف سامسونج Galaxy S24', sales: 145, revenue: '217,500 ج.م', performance: 'excellent' },
    { name: 'سماعات Apple AirPods Pro', sales: 98, revenue: '147,000 ج.م', performance: 'excellent' },
    { name: 'ساعة Huawei Watch GT4', sales: 76, revenue: '91,200 ج.م', performance: 'good' },
    { name: 'شاحن لاسلكي سريع', sales: 234, revenue: '46,800 ج.م', performance: 'good' },
    { name: 'حافظة هاتف جلد', sales: 312, revenue: '31,200 ج.م', performance: 'average' },
];

export default function Reports() {
    const salesByShippingData = {
        labels: ['شحن المنصة الكامل', 'بيع مباشر + شحن المنصة', 'شحن ذاتي'],
        datasets: [
            {
                data: [45, 35, 20],
                backgroundColor: ['#3b82f6', '#60a5fa', '#93c5fd'],
                borderWidth: 0,
            },
        ],
    };

    const monthlySalesData = {
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
        datasets: [
            {
                label: 'المبيعات',
                data: [45000, 52000, 48000, 61000, 55000, 72000],
                backgroundColor: '#3b82f6',
                borderRadius: 6,
            },
            {
                label: 'الأرباح',
                data: [12000, 14500, 13200, 16800, 15200, 19800],
                backgroundColor: '#93c5fd',
                borderRadius: 6,
            },
        ],
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">التقارير والتحليلات</h2>
                    <p className="text-sm text-slate-500 mt-1">نظرة شاملة على أداء متجرك</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                    <Download size={18} />
                    تصدير التقرير
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <ShoppingCart size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">إجمالي المبيعات</p>
                            <p className="text-lg font-bold text-slate-900">425,800 ج.م</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <DollarSign size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">صافي الأرباح</p>
                            <p className="text-lg font-bold text-slate-900">89,300 ج.م</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                            <Percent size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">الخصومات</p>
                            <p className="text-lg font-bold text-slate-900">12,450 ج.م</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                            <Truck size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">تكلفة الشحن</p>
                            <p className="text-lg font-bold text-slate-900">18,200 ج.م</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                            <RotateCcw size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">المرتجعات</p>
                            <p className="text-lg font-bold text-slate-900">8,650 ج.م</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sales by Shipping Type */}
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-bold text-slate-800">المبيعات حسب نوع الشحن</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[220px] p-4">
                        <Doughnut
                            data={salesByShippingData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                        rtl: true,
                                        labels: {
                                            color: '#64748b',
                                            padding: 15,
                                            font: { family: 'Cairo', size: 11 }
                                        }
                                    }
                                },
                                cutout: '65%'
                            }}
                        />
                    </CardContent>
                </Card>

                {/* Monthly Sales & Profits */}
                <Card className="bg-white border-slate-200 shadow-sm lg:col-span-2">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-bold text-slate-800">المبيعات والأرباح الشهرية</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[220px] p-4">
                        <Bar
                            data={monthlySalesData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                        rtl: true,
                                        align: 'end',
                                        labels: {
                                            color: '#64748b',
                                            font: { family: 'Cairo', size: 12 },
                                            usePointStyle: true,
                                            boxWidth: 8
                                        }
                                    }
                                },
                                scales: {
                                    x: {
                                        grid: { display: false },
                                        ticks: { color: '#64748b', font: { family: 'Cairo' } }
                                    },
                                    y: {
                                        grid: { color: '#f1f5f9' },
                                        ticks: { color: '#64748b', font: { family: 'Cairo' } },
                                        border: { display: false }
                                    }
                                }
                            }}
                        />
                    </CardContent>
                </Card>
            </div>

            {/* Tables Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Cities */}
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardHeader className="pb-4 border-b border-slate-50">
                        <div className="flex items-center gap-2">
                            <MapPin size={20} className="text-blue-600" />
                            <CardTitle className="text-lg font-bold text-slate-800">المدن الأكثر طلباً</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                                <TableRow className="hover:bg-transparent border-slate-100">
                                    <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">المدينة</TableHead>
                                    <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">الطلبات</TableHead>
                                    <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">الإيرادات</TableHead>
                                    <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">النسبة</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {topCities.map((city, idx) => (
                                    <TableRow key={idx} className="hover:bg-slate-50/50">
                                        <TableCell className="font-semibold text-slate-700 py-3">{city.city}</TableCell>
                                        <TableCell className="text-slate-600 py-3">{city.orders}</TableCell>
                                        <TableCell className="font-bold text-slate-900 py-3">{city.revenue}</TableCell>
                                        <TableCell className="py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-[80px]">
                                                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${city.percentage}%` }}></div>
                                                </div>
                                                <span className="text-xs font-semibold text-slate-500 min-w-[30px]">{city.percentage}%</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Top Products */}
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardHeader className="pb-4 border-b border-slate-50">
                        <div className="flex items-center gap-2">
                            <Package size={20} className="text-blue-600" />
                            <CardTitle className="text-lg font-bold text-slate-800">أفضل المنتجات أداءً</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                                <TableRow className="hover:bg-transparent border-slate-100">
                                    <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">المنتج</TableHead>
                                    <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">المبيعات</TableHead>
                                    <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">الإيرادات</TableHead>
                                    <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">الأداء</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {topProducts.map((product, idx) => (
                                    <TableRow key={idx} className="hover:bg-slate-50/50">
                                        <TableCell className="font-medium text-slate-700 text-sm py-3 max-w-[150px] truncate" title={product.name}>{product.name}</TableCell>
                                        <TableCell className="text-slate-600 py-3">{product.sales}</TableCell>
                                        <TableCell className="font-bold text-slate-900 py-3">{product.revenue}</TableCell>
                                        <TableCell className="py-3">
                                            <Badge variant="secondary" className={`font-normal ${product.performance === 'excellent' ? 'bg-emerald-50 text-emerald-700' :
                                                product.performance === 'good' ? 'bg-blue-50 text-blue-700' :
                                                    'bg-slate-100 text-slate-600'
                                                }`}>
                                                {product.performance === 'excellent' ? 'ممتاز' : product.performance === 'good' ? 'جيد' : 'متوسط'}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Simple Operational Stats */}
            <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-slate-800">الإحصائيات التشغيلية</CardTitle>
                </CardHeader>
                <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                        <p className="text-sm font-medium text-slate-500 mb-2">سرعة التجهيز</p>
                        <p className="text-3xl font-bold text-slate-900 mb-1">2.5 ساعة</p>
                        <p className="text-xs text-slate-400">متوسط وقت التجهيز</p>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                        <p className="text-sm font-medium text-slate-500 mb-2">نسبة التسليم الناجح</p>
                        <p className="text-3xl font-bold text-slate-900 mb-1">94.5%</p>
                        <p className="text-xs text-slate-400">من إجمالي الشحنات</p>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                        <p className="text-sm font-medium text-slate-500 mb-2">التكلفة التشغيلية</p>
                        <p className="text-3xl font-bold text-slate-900 mb-1">18,200 ج.م</p>
                        <p className="text-xs text-slate-400">هذا الشهر</p>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                        <p className="text-sm font-medium text-slate-500 mb-2">معدل رضا العملاء</p>
                        <p className="text-3xl font-bold text-slate-900 mb-1">4.8/5</p>
                        <p className="text-xs text-slate-400">من 2,450 تقييم</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
