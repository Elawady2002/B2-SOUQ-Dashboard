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
    TrendingUpIcon
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

// Import card images
import CardImage from '../assets/image/card.png';
import CardsImage from '../assets/image/card.png';

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
        unit: 'طلب',
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
                borderColor: '#94a3b8',
                backgroundColor: 'transparent',
                borderDash: [5, 5],
                tension: 0.4,
                pointRadius: 0,
                borderWidth: 2,
            },
            {
                label: 'مسترد',
                data: [8, 12, 25, 32, 28, 18, 10, 15, 22, 35, 30, 45],
                borderColor: '#ef4444',
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
                position: 'top',
                rtl: true,
                align: 'center',
                labels: {
                    color: '#1e293b',
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 25,
                    font: { family: 'Cairo', size: 12, weight: '500' }
                }
            }
        },
        scales: {
            x: {
                reverse: true,
                grid: {
                    display: true,
                    color: 'rgba(148, 163, 184, 0.4)',
                    drawBorder: false,
                    borderDash: [4, 4],
                },
                ticks: {
                    color: '#94a3b8',
                    font: { family: 'Cairo', size: 11 }
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
            <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-lg)' }}>
                <div>
                    <h2 className="page-title">مرحباً، جاك ميلر 👋</h2>
                    <p className="page-subtitle">إدارة العملاء والمبيعات باستخدام رؤى في الوقت الفعلي</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                    {/* Date Display */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '10px 16px',
                        background: '#fff',
                        border: '1px solid #e2e8f0',
                        borderRadius: 'var(--radius-md)',
                        fontSize: 14,
                        color: '#64748b',
                        fontWeight: 500
                    }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span>دسمبر 07,2026 إلى 08,2025 يناير</span>
                    </div>
                    {/* Cloud Upload Icon */}
                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 44,
                        height: 44,
                        background: '#fff',
                        border: '1px solid #e2e8f0',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer'
                    }}>
                        <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                            <path d="M10.6667 2.66666C7.92 2.66666 5.76 4.75333 5.458 7.41666C4.87723 7.51061 4.3326 7.75966 3.88165 8.13751C3.4307 8.51535 3.09016 9.00797 2.896 9.56333C1.256 10.036 0 11.4987 0 13.3333C0 15.5493 1.784 17.3333 4 17.3333H17.3333C19.5493 17.3333 21.3333 15.5493 21.3333 13.3333C21.3333 12.16 20.7633 11.1093 19.9373 10.3747C19.7827 8.032 17.914 6.16266 15.5627 6.04133C14.76 4.08866 12.9187 2.66666 10.6667 2.66666ZM10.6667 4C12.508 4 13.98 5.18 14.5 6.85333L14.6467 7.33333H15.3333C17.17 7.33333 18.6667 8.83 18.6667 10.6667V11L18.9373 11.2087C19.264 11.459 19.5294 11.7804 19.7135 12.1485C19.8977 12.5166 19.9956 12.9218 20 13.3333C20 14.8507 18.8507 16 17.3333 16H4C2.48267 16 1.33333 14.8507 1.33333 13.3333C1.33333 11.9867 2.3 10.9413 3.52 10.7293L3.958 10.646L4.04133 10.2073C4.24133 9.30933 5.03733 8.66666 6 8.66666H6.66667V8C6.66667 5.75333 8.42 4 10.6667 4ZM10.6667 7.72933L10.1867 8.18733L7.52 10.854L8.48 11.814L10 10.2913V14.6667H11.3333V10.2913L12.8533 11.8127L13.8133 10.8527L11.1467 8.186L10.6667 7.72933Z" fill="black" />
                        </svg>
                    </button>
                    {/* Filter Button */}
                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '10px 18px',
                        background: '#3b82f6',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}>
                        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
                            <path d="M0 0.666667C0 0.489856 0.0702378 0.320286 0.195262 0.195262C0.320286 0.0702378 0.489856 0 0.666667 0H14C14.1768 0 14.3464 0.0702378 14.4714 0.195262C14.5964 0.320286 14.6667 0.489856 14.6667 0.666667C14.6667 0.843478 14.5964 1.01305 14.4714 1.13807C14.3464 1.2631 14.1768 1.33333 14 1.33333H0.666667C0.489856 1.33333 0.320286 1.2631 0.195262 1.13807C0.0702378 1.01305 0 0.843478 0 0.666667ZM2.22222 5.11111C2.22222 4.9343 2.29246 4.76473 2.41748 4.63971C2.54251 4.51468 2.71208 4.44444 2.88889 4.44444H11.7778C11.9546 4.44444 12.1242 4.51468 12.2492 4.63971C12.3742 4.76473 12.4444 4.9343 12.4444 5.11111C12.4444 5.28792 12.3742 5.45749 12.2492 5.58252C12.1242 5.70754 11.9546 5.77778 11.7778 5.77778H2.88889C2.71208 5.77778 2.54251 5.70754 2.41748 5.58252C2.29246 5.45749 2.22222 5.28792 2.22222 5.11111ZM4.88889 9.55556C4.88889 9.37875 4.95913 9.20918 5.08415 9.08415C5.20918 8.95913 5.37874 8.88889 5.55556 8.88889H9.11111C9.28792 8.88889 9.45749 8.95913 9.58252 9.08415C9.70754 9.20918 9.77778 9.37875 9.77778 9.55556C9.77778 9.73237 9.70754 9.90194 9.58252 10.027C9.45749 10.152 9.28792 10.2222 9.11111 10.2222H5.55556C5.37874 10.2222 5.20918 10.152 5.08415 10.027C4.95913 9.90194 4.88889 9.73237 4.88889 9.55556Z" fill="white" />
                        </svg>
                        فلاتر
                    </button>
                </div>
            </div>

            {/* Main Two-Column Layout - Starts right after header */}
            <div className="grid mb-lg" style={{ gridTemplateColumns: '75% 25%', gap: 'var(--spacing-lg)' }}>

                {/* Main Content Column (Right in RTL) */}
                <div className="flex flex-col gap-lg">

                    {/* Stats Cards Row - Inside main content */}
                    <div className="grid grid-cols-4" style={{ gap: 'var(--spacing-md)' }}>
                        {statsCards.map((card) => {
                            const maxVal = Math.max(...card.sparkline);
                            const points = card.sparkline.map((val, i) =>
                                `${(i / (card.sparkline.length - 1)) * 100},${50 - (val / maxVal) * 40}`
                            ).join(' ');
                            const areaPoints = `0,50 ${points} 100,50`;

                            return (
                                <div key={card.id} className="stats-card">
                                    {/* Row 1: Icon (left) + Label (right) */}
                                    <div className="stats-card-row">
                                        <div className="stats-card-icon" style={{ background: `${card.color}15`, color: card.color }}>
                                            {card.id === 1 && <ShoppingBag size={20} strokeWidth={1.5} />}
                                            {card.id === 2 && <Receipt size={20} strokeWidth={1.5} />}
                                            {card.id === 3 && <Wallet size={20} strokeWidth={1.5} />}
                                            {card.id === 4 && <TrendingUpIcon size={20} strokeWidth={1.5} />}
                                        </div>
                                        <div className="stats-card-label">{card.label}</div>
                                    </div>

                                    {/* Row 2: Value + Unit (left) + Change (right) */}
                                    <div className="stats-card-row stats-card-main">
                                        <div className="stats-card-value-group">
                                            <span className="stats-card-value">{card.value}</span>
                                            {card.unit && <span className="stats-card-unit">{card.unit}</span>}
                                        </div>
                                        <div className={`stats-card-change ${card.positive ? 'positive' : 'negative'}`}>
                                            <span>{card.change}</span>
                                            {card.positive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                        </div>
                                    </div>

                                    {/* Row 3: Area Chart */}
                                    <div className="stats-card-chart">
                                        <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
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
                            );
                        })}
                    </div>

                    {/* Sales Chart + Recent Orders Row */}
                    <div className="grid" style={{ gridTemplateColumns: '3fr 2fr', gap: 'var(--spacing-md)' }}>
                        {/* Sales Chart - Right (larger) */}
                        <div className="card" style={{ minHeight: 350 }}>
                            <div className="card-header">
                                <h3 className="card-title" style={{ fontSize: 20, fontWeight: 800, color: '#101828' }}>المبيعات</h3>
                                <div className="chart-filters" style={{ background: '#f5f7fa', padding: 4, borderRadius: 8 }}>
                                    {['يومي', 'شهري', 'سنوي'].map((period) => (
                                        <button
                                            key={period}
                                            className={`chart-filter-btn ${chartPeriod === period ? 'active' : ''}`}
                                            style={{ minWidth: 60, fontSize: 12, borderRadius: 6 }}
                                            onClick={() => setChartPeriod(period)}
                                        >
                                            {period}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="chart-container" style={{ height: 300 }}>
                                <Line data={salesChartData} options={chartOptions} />
                            </div>
                        </div>

                        {/* Recent Orders Table - Left (smaller) */}
                        <div className="card" style={{ minHeight: 280 }}>

                            <div className="card-header">
                                <h3 className="card-title" style={{ fontSize: 20, fontWeight: 800, color: '#101828' }}>الطلبات الأخيرة</h3>
                                <button className="btn" style={{ fontSize: 12, padding: '8px 14px', border: '1px solid #e2e8f0', borderRadius: 8, color: '#475569' }}>عرض الكل</button>
                            </div>
                            <div className="table-container">
                                <table className="table" style={{ minWidth: 'auto' }}>
                                    <thead>
                                        <tr>
                                            <th>معرف الطلب</th>
                                            <th>المنتج</th>
                                            <th>كمية</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { id: '#SPK781', product: 'برايستون جراي', amount: '2,145.90 جنيه' },
                                            { id: '#SPK781', product: 'برايستون جراي', amount: '2,145.90 جنيه' },
                                            { id: '#SPK781', product: 'برايستون جراي', amount: '2,145.90 جنيه' },
                                        ].map((order, idx) => (
                                            <tr key={idx}>
                                                <td style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{order.id}</td>
                                                <td>
                                                    <div className="flex items-center gap-sm">
                                                        <div style={{
                                                            width: 32, height: 32, borderRadius: 'var(--radius-sm)',
                                                            background: 'var(--bg-input)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                        }}>
                                                            📷
                                                        </div>
                                                        <span>{order.product}</span>
                                                    </div>
                                                </td>
                                                <td>{order.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>


                    {/* Wallet Section */}
                    <div className="card" style={{ padding: 16 }}>
                        {/* Header: Title (right) + Filters (left) with max spacing */}
                        <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-xl)' }}>
                            <h3 className="card-title" style={{ fontSize: 18, fontWeight: 700, color: '#1e3a5f', margin: 0 }}>محفظة البائع</h3>
                            <div className="chart-filters" style={{ margin: 0 }}>
                                {['الكل', 'هذا الشهر', 'الشهر الماضي'].map((filter, idx) => (
                                    <button key={filter} className={`chart-filter-btn ${idx === 0 ? 'active' : ''}`} style={{ padding: '8px 16px', fontSize: 13 }}>{filter}</button>
                                ))}
                            </div>
                        </div>

                        {/* Main Content: Cards (right) | Stats (center) | Donut (left) */}
                        <div className="flex items-center justify-between">

                            {/* Donut Chart - Far LEFT */}
                            <div style={{ flexShrink: 0, width: 200, height: 200, position: 'relative' }}>
                                <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
                                    {/* Outer ring - dark blue */}
                                    <circle cx="100" cy="100" r="90" fill="none" stroke="#e8f0fe" strokeWidth="12" />
                                    <circle cx="100" cy="100" r="90" fill="none" stroke="#1e40af" strokeWidth="12"
                                        strokeDasharray="400 566" strokeLinecap="round" transform="rotate(-90 100 100)" />

                                    {/* Middle ring - medium blue */}
                                    <circle cx="100" cy="100" r="72" fill="none" stroke="#e8f0fe" strokeWidth="10" />
                                    <circle cx="100" cy="100" r="72" fill="none" stroke="#3b82f6" strokeWidth="10"
                                        strokeDasharray="340 452" strokeLinecap="round" transform="rotate(-90 100 100)" />

                                    {/* Inner ring - light blue/cyan */}
                                    <circle cx="100" cy="100" r="56" fill="none" stroke="#e8f0fe" strokeWidth="8" />
                                    <circle cx="100" cy="100" r="56" fill="none" stroke="#06b6d4" strokeWidth="8"
                                        strokeDasharray="280 352" strokeLinecap="round" transform="rotate(-90 100 100)" />
                                </svg>
                                <div style={{
                                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                    textAlign: 'center', width: 100
                                }}>
                                    <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 2 }}>المبالغ المسحوبة</div>
                                    <div style={{ fontSize: 22, fontWeight: 700, color: '#1f2937' }}>241.45</div>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1f2937' }}>جنيه</div>
                                </div>
                            </div>

                            {/* Stats Section - CENTER (2 columns) */}
                            <div style={{ flexShrink: 0 }}>
                                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 48, rowGap: 32 }}>
                                    <div className="flex items-center gap-md">
                                        <img src={Frame1Icon} alt="" style={{ width: 48, height: 48 }} />
                                        <div>
                                            <p style={{ fontWeight: 500, fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>إجمالي الأرباح</p>
                                            <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>2,145.90 جنيه</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-md">
                                        <img src={FrameIcon} alt="" style={{ width: 48, height: 48 }} />
                                        <div>
                                            <p style={{ fontWeight: 500, fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>الرصيد الإعلاني</p>
                                            <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>2,145.90 جنيه</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-md">
                                        <img src={Frame3Icon} alt="" style={{ width: 48, height: 48 }} />
                                        <div>
                                            <p style={{ fontWeight: 500, fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>الرصيد</p>
                                            <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>2,145.90 جنيه</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-md">
                                        <img src={Frame2Icon} alt="" style={{ width: 48, height: 48 }} />
                                        <div>
                                            <p style={{ fontWeight: 500, fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>المحجوز</p>
                                            <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>2,145.90 جنيه</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bank Cards Image - Far RIGHT (larger) */}
                            <div style={{ flexShrink: 0 }}>
                                <img src={CardsImage} alt="Bank Cards" style={{ width: 320, height: 'auto', objectFit: 'contain' }} />
                            </div>
                        </div>
                    </div>






                    {/* Products Table */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title" style={{ fontSize: 18, fontWeight: 700, color: '#1e293b' }}>المنتجات المضافة حديثا</h3>
                            <div className="flex items-center gap-sm">
                                <button className="btn btn-primary" style={{
                                    fontSize: 13,
                                    padding: '8px 16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 6
                                }}>
                                    فلترة حسب
                                    <span style={{ fontSize: 10 }}>▼</span>
                                </button>
                                <input
                                    type="text"
                                    placeholder="بحث..."
                                    style={{
                                        padding: '8px 14px',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid #e2e8f0',
                                        fontSize: 13,
                                        minWidth: 180
                                    }}
                                />
                            </div>
                        </div>
                        <div className="table-container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>معرفة المنتج</th>
                                        <th>اسم المنتج</th>
                                        <th>فئة</th>
                                        <th>التخفيض</th>
                                        <th>سعر</th>
                                        <th>حالة</th>
                                        <th>تاريخ الإضافة</th>
                                        <th>الإجراءات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map((order, idx) => (
                                        <tr key={idx}>
                                            <td style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 600 }}>{order.id}</td>
                                            <td>
                                                <div className="flex items-center gap-sm">
                                                    <div style={{
                                                        width: 32, height: 32,
                                                        background: 'var(--bg-input)',
                                                        borderRadius: 6,
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        fontSize: 14
                                                    }}>
                                                        📷
                                                    </div>
                                                    <span>{order.name}</span>
                                                </div>
                                            </td>
                                            <td>{order.category}</td>
                                            <td><span className="badge badge-primary">40%</span></td>
                                            <td style={{ fontWeight: 600 }}>{order.price}</td>
                                            <td><span className="badge badge-warning">تم الحفظ كمسودة</span></td>
                                            <td>{order.date}</td>
                                            <td>
                                                <div className="flex gap-xs">
                                                    <button className="btn btn-secondary btn-sm"><Eye size={12} /></button>
                                                    <button className="btn btn-secondary btn-sm"><Edit size={12} /></button>
                                                    <button className="btn btn-secondary btn-sm"><Trash2 size={12} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex items-center justify-between mt-md" style={{ padding: '8px 0' }}>
                            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>عرض 5 منتجات ←</span>
                            <div className="flex items-center gap-sm">
                                <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: 11 }}>السابق</button>
                                <span className="btn btn-primary" style={{ padding: '4px 10px', fontSize: 11 }}>1</span>
                                <span style={{ fontSize: 12 }}>2</span>
                                <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: 11 }}>التالي</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Left Sidebar Column */}
                <div className="flex flex-col gap-lg">
                    {/* Store Rating Card - Compact */}
                    <div className="card" style={{ padding: 'var(--spacing-lg)' }}>
                        <div className="card-header" style={{ marginBottom: 'var(--spacing-md)' }}>
                            <h4 className="card-title" style={{ fontSize: 18, fontWeight: 700, color: '#1e293b' }}>متوسط تقييم المتجر</h4>
                            <button className="btn btn-secondary" style={{ fontSize: 12, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6, border: '1px solid #e2e8f0' }}>
                                عرض الكل
                                <span style={{ fontSize: 10 }}>▼</span>
                            </button>
                        </div>

                        {/* Stats Banner - Light gray background */}
                        <div className="flex items-center justify-between mb-lg" style={{
                            background: '#f8f9fa',
                            borderRadius: 'var(--radius-lg)',
                            padding: 'var(--spacing-lg)'
                        }}>
                            <div>
                                <p style={{ fontSize: 13, color: '#64748b', fontWeight: 500, marginBottom: 6 }}>النمو الإجمالي العام الماضي</p>
                                <p style={{ fontSize: 24, fontWeight: 700, color: '#10b981' }}>+15%</p>
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <p style={{ fontSize: 13, color: '#64748b', fontWeight: 500, marginBottom: 6 }}>اجمالي التقييمات</p>
                                <p style={{ fontSize: 26, fontWeight: 700, color: '#1e40af' }}>15,432</p>
                            </div>
                        </div>

                        {/* Ring Chart - Larger */}
                        <div style={{ position: 'relative', width: 200, height: 200, margin: '0 auto' }}>
                            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                                <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                                <circle
                                    cx="50" cy="50" r="42"
                                    fill="none"
                                    stroke="#0066FF"
                                    strokeWidth="8"
                                    strokeDasharray="242"
                                    strokeDashoffset="19"
                                    strokeLinecap="round"
                                    transform="rotate(-90 50 50)"
                                />
                            </svg>
                            <div style={{
                                position: 'absolute', top: '50%', left: '50%',
                                transform: 'translate(-50%, -50%)',
                                textAlign: 'center'
                            }}>
                                <h3 style={{ fontSize: 36, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>92%</h3>
                                <p style={{ fontSize: 13, color: '#9ca3af', fontWeight: 500 }}>رضا العملاء</p>
                            </div>
                        </div>
                    </div>

                    {/* Products Summary */}
                    <div className="card">
                        <h4 className="card-title" style={{ fontSize: 18, fontWeight: 700, color: '#1e3a5f', marginBottom: 'var(--spacing-lg)', textAlign: 'right' }}>ملخص المنتجات</h4>

                        {/* Semi-circle Gauge Chart - Reduced size */}
                        <div style={{ position: 'relative', width: '100%', maxWidth: 260, height: 140, margin: '0 auto', marginBottom: 'var(--spacing-md)' }}>
                            <svg viewBox="0 0 200 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                                {/* Blue segment - المنتجات النشطة */}
                                <path
                                    d="M 20 90 A 80 80 0 0 1 92.48 10.4"
                                    fill="none"
                                    stroke="#3b82f6"
                                    strokeWidth="12"
                                    strokeLinecap="butt"
                                />

                                {/* Cyan segment - منخفضة المخزون */}
                                <path
                                    d="M 92.48 10.4 A 80 80 0 0 1 134.0 17.6"
                                    fill="none"
                                    stroke="#06b6d4"
                                    strokeWidth="12"
                                    strokeLinecap="butt"
                                />

                                {/* Green segment - تحت المراجعة */}
                                <path
                                    d="M 134.0 17.6 A 80 80 0 0 1 173.36 58.08"
                                    fill="none"
                                    stroke="#10b981"
                                    strokeWidth="12"
                                    strokeLinecap="butt"
                                />

                                {/* Pink segment - مرفوضة */}
                                <path
                                    d="M 173.36 58.08 A 80 80 0 0 1 180 90"
                                    fill="none"
                                    stroke="#ec4899"
                                    strokeWidth="12"
                                    strokeLinecap="butt"
                                />
                            </svg>
                            <div style={{
                                position: 'absolute', bottom: 10, left: '50%',
                                transform: 'translateX(-50%)',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 2 }}>الاجمالي</div>
                                <div style={{ fontSize: 24, fontWeight: 700, color: '#1e293b' }}>3736</div>
                            </div>
                        </div>

                        {/* Legend Items */}
                        <div className="flex flex-col" style={{ gap: 0 }}>
                            {/* المنتجات النشطة */}
                            <div style={{ borderBottom: '1px solid var(--border-light)', padding: '12px 0' }}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-sm">
                                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#3b82f6' }}></div>
                                        <span style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>المنتجات النشطة</span>
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <p style={{ fontSize: 12, color: '#6b7280' }}>المجموع</p>
                                        <p style={{ fontSize: 16, fontWeight: 700, color: '#1e293b' }}>1,765</p>
                                    </div>
                                </div>
                                <p style={{ fontSize: 12, color: '#3b82f6', marginTop: 4, textAlign: 'right' }}>زيادة بنسبة 1.67%</p>
                            </div>

                            {/* منتجات منخفضة المخزون */}
                            <div style={{ borderBottom: '1px solid var(--border-light)', padding: '12px 0' }}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-sm">
                                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#06b6d4' }}></div>
                                        <span style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>منتجات منخفضه المخزون</span>
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <p style={{ fontSize: 12, color: '#6b7280' }}>المجموع</p>
                                        <p style={{ fontSize: 16, fontWeight: 700, color: '#1e293b' }}>634</p>
                                    </div>
                                </div>
                                <p style={{ fontSize: 12, color: '#06b6d4', marginTop: 4, textAlign: 'right' }}>زيادة بنسبة 0.46%</p>
                            </div>

                            {/* منتجات تحت المراجعة */}
                            <div style={{ borderBottom: '1px solid var(--border-light)', padding: '12px 0' }}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-sm">
                                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }}></div>
                                        <span style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>منتجات تحت المراجعه</span>
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <p style={{ fontSize: 12, color: '#6b7280' }}>المجموع</p>
                                        <p style={{ fontSize: 16, fontWeight: 700, color: '#1e293b' }}>878</p>
                                    </div>
                                </div>
                                <p style={{ fontSize: 12, color: '#ef4444', marginTop: 4, textAlign: 'right' }}>تم تخفيضه بواسطة 3.43%</p>
                            </div>

                            {/* منتجات مرفوضة */}
                            <div style={{ padding: '12px 0' }}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-sm">
                                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ec4899' }}></div>
                                        <span style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>منتجات مرفوضه</span>
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <p style={{ fontSize: 12, color: '#6b7280' }}>المجموع</p>
                                        <p style={{ fontSize: 16, fontWeight: 700, color: '#1e293b' }}>470</p>
                                    </div>
                                </div>
                                <p style={{ fontSize: 12, color: '#ec4899', marginTop: 4, textAlign: 'right' }}>زيادة بنسبة 0.13%</p>
                            </div>
                        </div>
                    </div>

                    {/* Best Selling Products */}
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title" style={{ fontSize: 18, fontWeight: 700, color: '#1e3a5f' }}>المنتجات الأكثر مبيعا</h4>
                            <button className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 8px' }}>عرض الكل</button>
                        </div>
                        <div className="flex flex-col gap-sm">
                            {[
                                { name: 'حذاء أنيق', category: 'أحذية القدم', price: '241.45 جنيه', sales: '241.45 مبيعات' },
                                { name: 'حذاء أنيق', category: 'أحذية القدم', price: '241.45 جنيه', sales: '241.45 مبيعات' },
                                { name: 'حذاء أنيق', category: 'أحذية القدم', price: '241.45 جنيه', sales: '241.45 مبيعات' },
                                { name: 'حذاء أنيق', category: 'أحذية القدم', price: '241.45 جنيه', sales: '241.45 مبيعات' },
                            ].map((product, idx) => (
                                <div key={idx} className="flex items-center gap-sm" style={{ padding: '8px 0', borderBottom: idx < 3 ? '1px solid var(--border-light)' : 'none' }}>
                                    <div style={{
                                        width: 48, height: 48,
                                        background: 'var(--bg-input)',
                                        borderRadius: 8,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 20
                                    }}>
                                        👟
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontWeight: 600, fontSize: 13 }}>{product.name}</p>
                                        <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{product.category}</p>
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <p style={{ fontWeight: 600, fontSize: 13 }}>{product.price}</p>
                                        <p style={{ fontSize: 10, color: 'var(--text-muted)' }}>{product.sales}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
