import { useState } from 'react';
import {
    TrendingUp,
    TrendingDown,
    Eye,
    Edit,
    Trash2,
    Clock,
    ShoppingBag,
    Receipt,
    Wallet,
    TrendingUpIcon,
    CalendarIcon,
    Filter,
    Upload,
    ChevronDown
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
    Filler,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

// Import card images
import CardImage from '../assets/image/card.png';
import CardsImage from '../assets/image/cards.png';

// Import wallet icons
import FrameIcon from '../assets/icons/Frame.svg';
import Frame1Icon from '../assets/icons/Frame-1.svg';
import Frame2Icon from '../assets/icons/Frame-2.svg';
import Frame3Icon from '../assets/icons/Frame-3.svg';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

// Stats data with colors
const statsCards = [
    {
        id: 1,
        label: 'عدد الطلبات',
        value: '1,277',
        change: '+12.5%',
        positive: true,
        color: '#3b82f6', // Blue
        bgColor: 'rgba(59, 130, 246, 0.08)',
        sparkline: [10, 15, 12, 18, 20, 15, 22, 25, 20, 28]
    },
    {
        id: 2,
        label: 'متوسط قيمة الطلب',
        value: 'EGP 450',
        change: '-3%',
        positive: false,
        color: '#ef4444', // Red
        bgColor: 'rgba(239, 68, 68, 0.08)',
        sparkline: [20, 18, 15, 12, 14, 10, 8, 12, 10, 8]
    },
    {
        id: 3,
        label: 'صافي الدخل',
        value: 'EGP 20,000',
        change: '+8%',
        positive: true,
        color: '#10b981', // Green
        bgColor: 'rgba(16, 185, 129, 0.08)',
        sparkline: [5, 10, 8, 15, 12, 18, 20, 22, 25, 28]
    },
    {
        id: 4,
        label: 'اجمالي المبيعات',
        value: 'EGP 67,000',
        change: '+15%',
        positive: true,
        color: '#f59e0b', // Orange/Warning
        bgColor: 'rgba(245, 158, 11, 0.08)',
        sparkline: [8, 12, 15, 10, 18, 22, 25, 28, 30, 35]
    },
];

// Orders table data
const recentOrders = [
    { id: '#1547988', name: 'كاميرا رقمية', category: 'الأجهزة', status: 'نشط', price: 'EGP 241.45', date: '15-05-2024' },
    { id: '#1547989', name: 'سماعات بلوتوث', category: 'الأجهزة', status: 'نشط', price: 'EGP 320.00', date: '15-05-2024' },
    { id: '#1547990', name: 'ساعة ذكية', category: 'الأجهزة', status: 'نشط', price: 'EGP 580.00', date: '15-05-2024' },
    { id: '#1547991', name: 'حافظة جوال', category: 'اكسسوارات', status: 'غير نشط', price: 'EGP 45.00', date: '15-06-2024' },
    { id: '#1547992', name: 'شاحن سريع', category: 'اكسسوارات', status: 'نشط', price: 'EGP 120.00', date: '15-06-2024' },
];

// Latest orders
const latestOrders = [
    { name: 'سمير ع.', product: 'جهاز لوحي', amount: 'EGP 2,145.90' },
    { name: 'أحمد م.', product: 'سماعات', amount: 'EGP 450.00' },
    { name: 'محمد س.', product: 'ساعة ذكية', amount: 'EGP 890.00' },
    { name: 'علي ح.', product: 'كاميرا', amount: 'EGP 1,200.00' },
];

// Best selling products
const bestProducts = [
    { name: 'سماعات AirPods', amount: 'EGP 1,850', qty: '156 قطعة' },
    { name: 'ساعة Apple Watch', amount: 'EGP 3,200', qty: '98 قطعة' },
    { name: 'شاحن MagSafe', amount: 'EGP 650', qty: '234 قطعة' },
];

export default function Home() {
    const [chartPeriod, setChartPeriod] = useState('سنوي');
    const [date, setDate] = useState({
        from: new Date(2025, 0, 8),
        to: new Date(2026, 11, 7),
    });

    // Sales chart data - matching the reference design exactly
    const salesChartData = {
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
        datasets: [
            {
                label: 'مدفوع',
                data: [35, 28, 45, 50, 42, 38, 30, 35, 42, 55, 48, 85],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.15)',
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                borderWidth: 2.5,
            },
            {
                label: 'غير مدفوع',
                data: [25, 32, 48, 45, 38, 30, 28, 32, 45, 52, 50, 55],
                borderColor: '#fbbf24',
                backgroundColor: 'transparent',
                borderDash: [5, 5],
                tension: 0.4,
                pointRadius: 0,
                borderWidth: 2,
            },
            {
                label: 'مسترد',
                data: [8, 12, 25, 32, 28, 18, 10, 15, 22, 35, 30, 45],
                borderColor: '#10b981',
                backgroundColor: 'transparent',
                tension: 0.4,
                pointRadius: 0,
                borderWidth: 2.5,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                reverse: true,
                grid: {
                    display: true,
                    color: 'rgba(203, 213, 225, 0.5)',
                    drawBorder: false,
                    borderDash: [4, 4],
                    drawTicks: false,
                },
                ticks: {
                    color: '#94a3b8',
                    font: { family: 'Cairo', size: 11 },
                    maxRotation: 0,
                    autoSkip: false,
                }
            },
            y: {
                position: 'right',
                min: 0,
                max: 100,
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    color: '#475569',
                    font: { family: 'Cairo', size: 12, weight: '600' },
                    stepSize: 20,
                }
            }
        }
    };

    // Wallet donut data
    const walletDonutData = {
        labels: ['متوفر', 'محجوز'],
        datasets: [{
            data: [75, 25],
            backgroundColor: ['#3b82f6', '#e2e8f0'],
            borderWidth: 0,
            cutout: '70%',
        }]
    };

    // Products summary donut
    const productDonutData = {
        labels: ['نشط', 'منخفض المخزون', 'قيد المراجعة'],
        datasets: [{
            data: [156, 23, 12],
            backgroundColor: ['#10b981', '#f59e0b', '#3b82f6'],
            borderWidth: 0,
            cutout: '70%',
        }]
    };

    return (
        <div>
            {/* Welcome Header - Full Width */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="page-title">مرحباً، جاك ميلر 👋</h2>
                    <p className="page-subtitle">إدارة العملاء والمبيعات باستخدام رؤى في الوقت الفعلي</p>
                </div>
                <div className="flex items-center gap-4">
                    {/* Date Picker Button */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="h-11 justify-start text-right font-medium text-slate-600 bg-white border-slate-200">
                                <CalendarIcon className="ml-2 h-4 w-4" />
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, "LLO", { locale: ar })} -{" "}
                                            {format(date.to, "LLO", { locale: ar })}
                                        </>
                                    ) : (
                                        format(date.from, "LLO", { locale: ar })
                                    )
                                ) : (
                                    <span>اختر التاريخ</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                                locale={ar}
                            />
                        </PopoverContent>
                    </Popover>

                    {/* Cloud Upload Icon */}
                    <Button variant="outline" size="icon" className="h-11 w-11 bg-white border-slate-200">
                        <Upload className="h-4 w-4 text-slate-800" />
                    </Button>

                    {/* Filter Button */}
                    <Button className="h-11 gap-2 bg-blue-600 hover:bg-blue-700 font-semibold px-4">
                        <Filter className="h-4 w-4 text-white" />
                        فلاتر
                    </Button>
                </div>
            </div>

            {/* Main Two-Column Layout - Starts right after header */}
            <div className="grid grid-cols-[75%_25%] gap-6 mb-8">

                {/* Main Content Column (Right in RTL) */}
                <div className="flex flex-col gap-6">

                    {/* Stats Cards Row - Inside main content */}
                    <div className="grid grid-cols-4 gap-4">
                        {statsCards.map((card) => {
                            const maxVal = Math.max(...card.sparkline);
                            const points = card.sparkline.map((val, i) =>
                                `${(i / (card.sparkline.length - 1)) * 100},${50 - (val / maxVal) * 40}`
                            ).join(' ');
                            const areaPoints = `0,50 ${points} 100,50`;

                            return (
                                <Card key={card.id} className="overflow-hidden border-slate-100 shadow-sm bg-white hover:shadow-md transition-all duration-200">
                                    <div className="p-5">
                                        {/* Row 1: Icon (left) + Label (right) */}
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-lg" style={{ background: `${card.color}15`, color: card.color }}>
                                                {card.id === 1 && <ShoppingBag size={20} strokeWidth={1.5} />}
                                                {card.id === 2 && <Receipt size={20} strokeWidth={1.5} />}
                                                {card.id === 3 && <Wallet size={20} strokeWidth={1.5} />}
                                                {card.id === 4 && <TrendingUpIcon size={20} strokeWidth={1.5} />}
                                            </div>
                                            <span className="text-sm font-medium text-slate-500">{card.label}</span>
                                        </div>

                                        {/* Row 2: Value + Unit (left) + Change (right) */}
                                        <div className="flex justify-between items-end mb-4">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-2xl font-bold text-slate-900">{card.value}</span>
                                                {card.unit && <span className="text-sm font-medium text-slate-500">{card.unit}</span>}
                                            </div>
                                            <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${card.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                                <span dir="ltr">{card.change}</span>
                                                {card.positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                            </div>
                                        </div>

                                        {/* Row 3: Area Chart */}
                                        <div className="h-12 w-full -mb-2 opacity-75">
                                            <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none" className="overflow-visible">
                                                <defs>
                                                    <linearGradient id={`gradient-${card.id}`} x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor={card.color} stopOpacity="0.25" />
                                                        <stop offset="100%" stopColor={card.color} stopOpacity="0.02" />
                                                    </linearGradient>
                                                </defs>
                                                <polygon
                                                    points={areaPoints}
                                                    fill={`url(#gradient-${card.id})`}
                                                />
                                                <polyline
                                                    points={points}
                                                    fill="none"
                                                    stroke={card.color}
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>

                    {/* Sales Chart + Recent Orders Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        {/* Sales Chart - Right (larger) */}
                        <Card className="lg:col-span-3 border-slate-100 shadow-sm bg-white">
                            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-100 space-y-0">
                                <CardTitle className="text-xl font-bold text-slate-900">المبيعات</CardTitle>
                                <div className="flex bg-slate-50 p-1 rounded-lg">
                                    {['يومي', 'شهري', 'سنوي'].map((period) => (
                                        <button
                                            key={period}
                                            onClick={() => setChartPeriod(period)}
                                            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${chartPeriod === period ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                                        >
                                            {period}
                                        </button>
                                    ))}
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                {/* Legend */}
                                <div className="flex justify-center gap-8 mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                        <span className="text-sm font-medium text-slate-700">مسترد</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                        <span className="text-sm font-medium text-slate-700">غير مدفوع</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                        <span className="text-sm font-medium text-slate-700">مدفوع</span>
                                    </div>
                                </div>

                                <div className="h-[300px] w-full">
                                    <Line data={salesChartData} options={chartOptions} />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Orders Table - Left (smaller) */}
                        <Card className="lg:col-span-2 border-slate-100 shadow-sm bg-white flex flex-col">
                            <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
                                <CardTitle className="text-xl font-bold text-slate-900">الطلبات الأخيرة</CardTitle>
                                <Button variant="outline" size="sm" className="text-xs h-8 bg-white border-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-sm">عرض الكل</Button>
                            </CardHeader>
                            <CardContent className="p-0 flex-1">
                                <Table>
                                    <TableHeader className="bg-slate-50/50">
                                        <TableRow className="hover:bg-transparent border-slate-100">
                                            <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">معرف الطلب</TableHead>
                                            <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">المنتج</TableHead>
                                            <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">المبلغ</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {[
                                            { id: '#SPK781', product: 'برايستون جراي', amount: '2,145.90 جنيه' },
                                            { id: '#SPK782', product: 'ايفون 13 برو', amount: '4,500.00 جنيه' },
                                            { id: '#SPK783', product: 'لابتوب اتش بي', amount: '1,200.00 جنيه' },
                                            { id: '#SPK784', product: 'سماعة سوني', amount: '350.00 جنيه' },
                                        ].map((order, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell className="font-semibold text-blue-600">{order.id}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex items-center justify-center w-8 h-8 rounded bg-slate-100 text-lg">
                                                            📷
                                                        </div>
                                                        <span className="text-sm font-medium text-slate-700">{order.product}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-sm text-slate-600">{order.amount}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>


                    {/* Wallet Section */}
                    <Card className="border-slate-100 shadow-sm bg-white">
                        <CardContent className="p-6">
                            {/* Header: Title (right) + Filters (left) with max spacing */}
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-bold text-slate-900">محفظة البائع</h3>
                                <div className="flex bg-slate-50 p-1 rounded-lg">
                                    {['الكل', 'هذا الشهر', 'الشهر الماضي'].map((filter, idx) => (
                                        <button
                                            key={filter}
                                            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${idx === 0 ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Main Content: Cards (right) | Stats (center) | Donut (left) */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

                                {/* Donut Chart - Far LEFT */}
                                <div className="flex justify-center relative">
                                    <div className="w-[200px] h-[200px] relative">
                                        <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                                            {/* Outer ring - dark blue */}
                                            <circle cx="100" cy="100" r="90" fill="none" stroke="#e8f0fe" strokeWidth="12" />
                                            <circle cx="100" cy="100" r="90" fill="none" stroke="#1e40af" strokeWidth="12"
                                                strokeDasharray="400 566" strokeLinecap="round" />

                                            {/* Middle ring - medium blue */}
                                            <circle cx="100" cy="100" r="72" fill="none" stroke="#e8f0fe" strokeWidth="10" />
                                            <circle cx="100" cy="100" r="72" fill="none" stroke="#3b82f6" strokeWidth="10"
                                                strokeDasharray="340 452" strokeLinecap="round" />

                                            {/* Inner ring - light blue/cyan */}
                                            <circle cx="100" cy="100" r="56" fill="none" stroke="#e8f0fe" strokeWidth="8" />
                                            <circle cx="100" cy="100" r="56" fill="none" stroke="#06b6d4" strokeWidth="8"
                                                strokeDasharray="280 352" strokeLinecap="round" />
                                        </svg>
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[100px]">
                                            <div className="text-[11px] text-slate-500 mb-0.5">المبالغ المسحوبة</div>
                                            <div className="text-xl font-bold text-slate-900 leading-tight">241.45</div>
                                            <div className="text-xs font-semibold text-slate-700">جنيه</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats Section - CENTER (2 columns) */}
                                <div>
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                        <div className="flex items-center gap-3">
                                            <img src={Frame1Icon} alt="" className="w-12 h-12" />
                                            <div>
                                                <p className="font-medium text-[13px] text-slate-500 mb-1">إجمالي الأرباح</p>
                                                <p className="text-lg font-bold text-slate-900">2,145.90 جنيه</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <img src={FrameIcon} alt="" className="w-12 h-12" />
                                            <div>
                                                <p className="font-medium text-[13px] text-slate-500 mb-1">الرصيد الإعلاني</p>
                                                <p className="text-lg font-bold text-slate-900">2,145.90 جنيه</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <img src={Frame3Icon} alt="" className="w-12 h-12" />
                                            <div>
                                                <p className="font-medium text-[13px] text-slate-500 mb-1">الرصيد</p>
                                                <p className="text-lg font-bold text-slate-900">2,145.90 جنيه</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <img src={Frame2Icon} alt="" className="w-12 h-12" />
                                            <div>
                                                <p className="font-medium text-[13px] text-slate-500 mb-1">المحجوز</p>
                                                <p className="text-lg font-bold text-slate-900">2,145.90 جنيه</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bank Cards Image - Far RIGHT (larger) */}
                                <div className="flex justify-end">
                                    <img src={CardsImage} alt="Bank Cards" className="w-[320px] h-auto object-contain" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>






                    {/* Products Table */}
                    <Card className="border-slate-100 shadow-sm bg-white">
                        <CardHeader className="flex flex-row items-center justify-between pb-6">
                            <CardTitle className="text-lg font-bold text-slate-900">المنتجات المضافة حديثا</CardTitle>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Input
                                        type="text"
                                        placeholder="بحث..."
                                        className="h-9 w-[200px]"
                                    />
                                </div>
                                <Select>
                                    <SelectTrigger className="h-9 w-[130px] text-xs">
                                        <div className="flex items-center gap-2">
                                            <Filter size={14} />
                                            <SelectValue placeholder="فلترة حسب" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="date">التاريخ</SelectItem>
                                        <SelectItem value="price">السعر</SelectItem>
                                        <SelectItem value="status">الحالة</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader className="bg-slate-50/50">
                                    <TableRow className="hover:bg-transparent border-slate-100">
                                        <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">معرف المنتج</TableHead>
                                        <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">اسم المنتج</TableHead>
                                        <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">فئة</TableHead>
                                        <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">التخفيض</TableHead>
                                        <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">سعر</TableHead>
                                        <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">حالة</TableHead>
                                        <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">تاريخ الإضافة</TableHead>
                                        <TableHead className="text-left h-10 text-xs font-semibold text-slate-600">الإجراءات</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentOrders.map((order, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell className="font-mono text-xs font-semibold">{order.id}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center justify-center w-8 h-8 rounded bg-slate-100 text-sm">
                                                        📷
                                                    </div>
                                                    <span className="font-medium text-slate-700">{order.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{order.category}</TableCell>
                                            <TableCell><Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">40%</Badge></TableCell>
                                            <TableCell className="font-semibold">{order.price}</TableCell>
                                            <TableCell><Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-200 text-xs font-normal">تم الحفظ كمسودة</Badge></TableCell>
                                            <TableCell className="text-slate-500">{order.date}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2 justify-end">
                                                    <button style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', background: '#dbeafe', color: '#2563eb', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Eye size={14} /></button>
                                                    <button style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', background: '#fef3c7', color: '#f59e0b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Edit size={14} /></button>
                                                    <button style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', background: '#fee2e2', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Trash2 size={14} /></button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                                <span className="text-xs text-slate-400 font-medium">عرض 1-5 من 20 منتج</span>
                                <div className="flex items-center gap-1">
                                    <Button variant="outline" size="sm" className="h-8 px-3 text-xs bg-white border-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-50">السابق</Button>
                                    <div className="flex items-center gap-1 mx-2">
                                        <Button variant="default" size="sm" className="h-8 w-8 p-0 text-xs bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-200">1</Button>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-xs text-slate-500 hover:text-slate-900 hover:bg-slate-50">2</Button>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-xs text-slate-500 hover:text-slate-900 hover:bg-slate-50">3</Button>
                                        <span className="text-xs text-slate-400 px-1">...</span>
                                    </div>
                                    <Button variant="outline" size="sm" className="h-8 px-3 text-xs bg-white border-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-50">التالي</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Left Sidebar Column */}
                <div className="flex flex-col gap-6">
                    {/* Store Rating Card - Compact */}
                    <Card className="border-slate-100 shadow-sm bg-white">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-bold text-slate-900">متوسط تقييم المتجر</CardTitle>
                            <Button variant="outline" size="sm" className="h-8 text-xs gap-1 bg-white border-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-sm">
                                عرض الكل
                                <ChevronDown size={14} className="opacity-70" />
                            </Button>
                        </CardHeader>

                        <CardContent>
                            {/* Stats Banner */}
                            <div className="flex items-center justify-between mb-6 bg-slate-50 rounded-lg p-4">
                                <div>
                                    <p className="text-xs font-medium text-slate-500 mb-1">النمو الإجمالي العام الماضي</p>
                                    <p className="text-xl font-bold text-emerald-500">+15%</p>
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-medium text-slate-500 mb-1">اجمالي التقييمات</p>
                                    <p className="text-xl font-bold text-blue-700">15,432</p>
                                </div>
                            </div>

                            {/* Ring Chart - Larger */}
                            <div className="relative w-[180px] h-[180px] mx-auto">
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                    <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                                    <circle
                                        cx="50" cy="50" r="42"
                                        fill="none"
                                        stroke="#2563eb"
                                        strokeWidth="8"
                                        strokeDasharray="242"
                                        strokeDashoffset="19"
                                        strokeLinecap="round"
                                        transform="rotate(-90 50 50)"
                                    />
                                </svg>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                    <h3 className="text-3xl font-bold text-slate-900 mb-1">92%</h3>
                                    <p className="text-xs font-medium text-slate-400">رضا العملاء</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Products Summary */}
                    <Card className="border-slate-100 shadow-sm bg-white">
                        <CardContent className="p-6">
                            <h4 className="text-lg font-bold text-slate-900 mb-6 text-right">ملخص المنتجات</h4>

                            {/* Semi-circle Gauge Chart */}
                            <div className="relative w-full max-w-[260px] h-[140px] mx-auto mb-4">
                                <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
                                    <path d="M 20 90 A 80 80 0 0 1 92.48 10.4" fill="none" stroke="#3b82f6" strokeWidth="12" />
                                    <path d="M 92.48 10.4 A 80 80 0 0 1 134.0 17.6" fill="none" stroke="#06b6d4" strokeWidth="12" />
                                    <path d="M 134.0 17.6 A 80 80 0 0 1 173.36 58.08" fill="none" stroke="#10b981" strokeWidth="12" />
                                    <path d="M 173.36 58.08 A 80 80 0 0 1 180 90" fill="none" stroke="#ec4899" strokeWidth="12" />
                                </svg>
                                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center">
                                    <div className="text-xs text-slate-500 mb-0.5">الاجمالي</div>
                                    <div className="text-2xl font-bold text-slate-900">3736</div>
                                </div>
                            </div>

                            {/* Legend Items */}
                            <div className="flex flex-col">
                                <div className="border-b border-slate-100 py-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                            <span className="text-sm font-semibold text-slate-800">المنتجات النشطة</span>
                                        </div>
                                        <div className="text-left">
                                            <p className="text-xs text-slate-500">المجموع</p>
                                            <p className="text-base font-bold text-slate-900">1,765</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-blue-500 mt-1 text-right">زيادة بنسبة 1.67%</p>
                                </div>

                                <div className="border-b border-slate-100 py-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                                            <span className="text-sm font-semibold text-slate-800">منتجات منخفضه المخزون</span>
                                        </div>
                                        <div className="text-left">
                                            <p className="text-xs text-slate-500">المجموع</p>
                                            <p className="text-base font-bold text-slate-900">634</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-cyan-500 mt-1 text-right">زيادة بنسبة 0.46%</p>
                                </div>

                                <div className="border-b border-slate-100 py-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                            <span className="text-sm font-semibold text-slate-800">منتجات تحت المراجعه</span>
                                        </div>
                                        <div className="text-left">
                                            <p className="text-xs text-slate-500">المجموع</p>
                                            <p className="text-base font-bold text-slate-900">878</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-red-500 mt-1 text-right">تم تخفيضه بواسطة 3.43%</p>
                                </div>

                                <div className="py-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                                            <span className="text-sm font-semibold text-slate-800">منتجات مرفوضه</span>
                                        </div>
                                        <div className="text-left">
                                            <p className="text-xs text-slate-500">المجموع</p>
                                            <p className="text-base font-bold text-slate-900">470</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-pink-500 mt-1 text-right">زيادة بنسبة 0.13%</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Best Selling Products */}
                    <Card className="border-slate-100 shadow-sm bg-white">
                        <CardHeader className="flex flex-row items-center justify-between pb-4">
                            <CardTitle className="text-lg font-bold text-slate-800">المنتجات الأكثر مبيعا</CardTitle>
                            <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-sm">عرض الكل</Button>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            {[
                                { name: 'حذاء أنيق', category: 'أحذية القدم', price: '241.45 جنيه', sales: '241.45 مبيعات' },
                                { name: 'حذاء أنيق', category: 'أحذية القدم', price: '241.45 جنيه', sales: '241.45 مبيعات' },
                                { name: 'حذاء أنيق', category: 'أحذية القدم', price: '241.45 جنيه', sales: '241.45 مبيعات' },
                                { name: 'حذاء أنيق', category: 'أحذية القدم', price: '241.45 جنيه', sales: '241.45 مبيعات' },
                            ].map((product, idx) => (
                                <div key={idx} className={`flex items-center gap-3 py-2 ${idx < 3 ? 'border-b border-slate-50' : ''}`}>
                                    <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-xl">
                                        👟
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-sm text-slate-900">{product.name}</p>
                                        <p className="text-xs text-slate-500">{product.category}</p>
                                    </div>
                                    <div className="text-left">
                                        <p className="font-semibold text-sm text-slate-900">{product.price}</p>
                                        <p className="text-[10px] text-slate-400">{product.sales}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div >
    );
}
