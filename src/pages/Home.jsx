import { useState } from 'react';
import {
    TrendingUp,
    TrendingDown,
    Eye,
    Edit,
    Trash2,
    Clock
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
                    color: 'rgba(0,0,0,0.04)',
                    drawBorder: false,
                },
                ticks: {
                    color: '#64748b',
                    font: { family: 'Cairo', size: 11 }
                }
            },
            y: {
                position: 'right',
                min: 0,
                max: 100,
                grid: {
                    color: 'rgba(0,0,0,0.04)',
                    drawBorder: false,
                },
                ticks: {
                    color: '#64748b',
                    font: { family: 'Cairo', size: 11 },
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
            {/* Welcome Header */}
            <div className="page-header">
                <h2 className="page-title">مرحباً، جاك ميلر 👋</h2>
                <p className="page-subtitle">إدارة الطلبات والمبيعات بسهولة</p>
            </div>

            {/* Stats Cards Row */}
            <div className="grid grid-cols-4 mb-lg">
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
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M12 7v5M12 15h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
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

            {/* Main Content - Responsive Grid */}
            <div className="grid grid-cols-3 mb-lg" style={{ gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)' }}>
                {/* Sales Chart */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">المبيعات</h3>
                        <div className="chart-filters">
                            {['يومي', 'شهري', 'سنوي'].map((period) => (
                                <button
                                    key={period}
                                    className={`chart-filter-btn ${chartPeriod === period ? 'active' : ''}`}
                                    onClick={() => setChartPeriod(period)}
                                >
                                    {period}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="chart-container" style={{ height: 320 }}>
                        <Line data={salesChartData} options={chartOptions} />
                    </div>
                </div>

                {/* Products Summary */}
                <div className="card">
                    <h4 className="card-title mb-md">ملخص المنتجات</h4>
                    <div style={{ position: 'relative', width: '100%', maxWidth: 160, margin: '0 auto' }}>
                        <Doughnut
                            data={productDonutData}
                            options={{
                                plugins: { legend: { display: false } },
                                cutout: '70%'
                            }}
                        />
                        <div className="donut-center">
                            <div className="donut-center-value" style={{ fontSize: 18 }}>191</div>
                            <div className="donut-center-label">منتج</div>
                        </div>
                    </div>
                    {/* Legend */}
                    <div className="flex flex-col gap-sm mt-md">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-sm">
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></div>
                                <span style={{ fontSize: 12 }}>نشط</span>
                            </div>
                            <span style={{ fontWeight: 600, fontSize: 12 }}>156</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-sm">
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }}></div>
                                <span style={{ fontSize: 12 }}>منخفض المخزون</span>
                            </div>
                            <span style={{ fontWeight: 600, fontSize: 12 }}>23</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-sm">
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6' }}></div>
                                <span style={{ fontSize: 12 }}>قيد المراجعة</span>
                            </div>
                            <span style={{ fontWeight: 600, fontSize: 12 }}>12</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Section - Wallet & Rating */}
            <div className="grid grid-cols-2 mb-lg">
                {/* Wallet Card */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">محفظة البائع</h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-lg">
                        {/* Bank Card Image */}
                        <div style={{ width: '100%', maxWidth: 220 }}>
                            <img src={CardImage} alt="Bank Card" style={{ width: '100%', borderRadius: 12 }} />
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-md" style={{ flex: 1 }}>
                            <div style={{ textAlign: 'center', minWidth: 80 }}>
                                <div style={{
                                    width: 50, height: 50,
                                    background: 'var(--success-bg)',
                                    borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 8px'
                                }}>
                                    <TrendingUp size={20} style={{ color: 'var(--success)' }} />
                                </div>
                                <p style={{ fontWeight: 500, fontSize: 11, color: 'var(--text-muted)' }}>الإيداعات</p>
                                <p style={{ fontSize: 14, fontWeight: 700 }}>EGP 2,145</p>
                            </div>

                            <div style={{ textAlign: 'center', minWidth: 80 }}>
                                <div style={{
                                    width: 50, height: 50,
                                    background: 'var(--accent-light)',
                                    borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 8px'
                                }}>
                                    <Clock size={20} style={{ color: 'var(--accent-primary)' }} />
                                </div>
                                <p style={{ fontWeight: 500, fontSize: 11, color: 'var(--text-muted)' }}>المتاح</p>
                                <p style={{ fontSize: 14, fontWeight: 700 }}>EGP 1,850</p>
                            </div>

                            <div style={{ textAlign: 'center', minWidth: 80 }}>
                                <div style={{
                                    width: 50, height: 50,
                                    background: 'var(--danger-bg)',
                                    borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 8px'
                                }}>
                                    <TrendingDown size={20} style={{ color: 'var(--danger)' }} />
                                </div>
                                <p style={{ fontWeight: 500, fontSize: 11, color: 'var(--text-muted)' }}>المحجوز</p>
                                <p style={{ fontSize: 14, fontWeight: 700 }}>EGP 295</p>
                            </div>
                        </div>

                        {/* Donut */}
                        <div style={{ width: 100, position: 'relative', flexShrink: 0 }}>
                            <Doughnut data={walletDonutData} options={{ plugins: { legend: { display: false } } }} />
                            <div className="donut-center">
                                <div style={{ fontSize: 12, fontWeight: 700 }}>75%</div>
                                <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>متاح</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Store Rating */}
                <div className="card">
                    <h4 className="card-title mb-md">تقييم المتجر</h4>
                    <div className="flex items-center gap-lg flex-wrap">
                        <div className="satisfaction-ring">
                            <svg viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                                <circle
                                    cx="50" cy="50" r="40"
                                    fill="none"
                                    stroke="#3b82f6"
                                    strokeWidth="8"
                                    strokeDasharray="251"
                                    strokeDashoffset="20"
                                    strokeLinecap="round"
                                    transform="rotate(-90 50 50)"
                                />
                            </svg>
                            <div className="satisfaction-value">
                                <h3 style={{ fontSize: 20 }}>92%</h3>
                                <p style={{ fontSize: 10 }}>رضا العملاء</p>
                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div className="mb-sm">
                                <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>التقييم الإيجابي</span>
                                <p style={{ fontWeight: 600, color: 'var(--success)', fontSize: 14 }}>+15%</p>
                            </div>
                            <div>
                                <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>إجمالي التقييمات</span>
                                <p style={{ fontWeight: 700, fontSize: 18, color: 'var(--accent-primary)' }}>15,432</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-3" style={{ gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)' }}>
                {/* Products Table */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">المنتجات المضافة حديثاً</h3>
                    </div>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>المنتج</th>
                                    <th>المعرف</th>
                                    <th>الفئة</th>
                                    <th>السعر</th>
                                    <th>الحالة</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order, idx) => (
                                    <tr key={idx}>
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
                                        <td style={{ fontFamily: 'monospace', fontSize: 11 }}>{order.id}</td>
                                        <td>{order.category}</td>
                                        <td style={{ fontWeight: 600 }}>{order.price}</td>
                                        <td>
                                            <span className={`badge ${order.status === 'نشط' ? 'badge-success' : 'badge-danger'}`}>
                                                {order.status}
                                            </span>
                                        </td>
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
                </div>

                {/* Sidebar Cards */}
                <div className="flex flex-col gap-md">
                    {/* Latest Orders */}
                    <div className="card">
                        <h4 className="card-title mb-md">آخر الطلبات</h4>
                        <div className="flex flex-col gap-sm">
                            {latestOrders.map((order, idx) => (
                                <div key={idx} className="flex items-center justify-between" style={{ padding: '6px 0', borderBottom: '1px solid var(--border-light)' }}>
                                    <div className="flex items-center gap-sm">
                                        <div style={{
                                            width: 28, height: 28,
                                            background: 'var(--accent-light)',
                                            borderRadius: 6,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: 12
                                        }}>
                                            📦
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: 500, fontSize: 12 }}>{order.name}</p>
                                            <p style={{ fontSize: 10, color: 'var(--text-muted)' }}>{order.product}</p>
                                        </div>
                                    </div>
                                    <span style={{ fontWeight: 600, fontSize: 11 }}>{order.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Best Selling */}
                    <div className="card">
                        <h4 className="card-title mb-md">الأكثر مبيعاً</h4>
                        <div className="flex flex-col gap-sm">
                            {bestProducts.map((product, idx) => (
                                <div key={idx} className="flex items-center gap-sm" style={{ padding: '6px 0' }}>
                                    <div style={{
                                        width: 36, height: 36,
                                        background: 'var(--bg-input)',
                                        borderRadius: 6,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 14
                                    }}>
                                        🎧
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontWeight: 500, fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</p>
                                        <p style={{ fontSize: 10, color: 'var(--text-muted)' }}>{product.qty}</p>
                                    </div>
                                    <span style={{ fontWeight: 600, fontSize: 11, color: 'var(--success)' }}>{product.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
