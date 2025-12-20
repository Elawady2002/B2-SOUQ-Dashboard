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
        <div>
            {/* Page Header */}
            <div className="page-header flex items-center justify-between">
                <div>
                    <h2 className="page-title">التقارير والتحليلات</h2>
                    <p className="page-subtitle">نظرة شاملة على أداء متجرك</p>
                </div>
                <button className="btn btn-primary">
                    <Download size={18} />
                    تصدير التقرير
                </button>
            </div>

            {/* Simple Stats Cards with Sparklines */}
            <div className="grid grid-cols-6 mb-lg" style={{ gap: 'var(--spacing-md)' }}>
                {reportCards.map((card, idx) => {
                    const maxVal = Math.max(...card.sparkline);
                    const points = card.sparkline.map((val, i) =>
                        `${(i / (card.sparkline.length - 1)) * 100},${50 - (val / maxVal) * 40}`
                    ).join(' ');
                    const areaPoints = `0,50 ${points} 100,50`;

                    return (
                        <div key={idx} className="stats-card">
                            {/* Row 1: Icon + Label */}
                            <div className="stats-card-row">
                                <div className="stats-card-icon" style={{ background: '#eff6ff', color: '#3b82f6' }}>
                                    <card.icon size={20} strokeWidth={1.5} />
                                </div>
                                <div className="stats-card-label">{card.label}</div>
                            </div>

                            {/* Row 2: Value + Change */}
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

                            {/* Row 3: Simple Chart */}
                            <div className="stats-card-chart">
                                <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id={`gradient-${idx}`} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
                                        </linearGradient>
                                    </defs>
                                    <polygon points={areaPoints} fill={`url(#gradient-${idx})`} />
                                    <polyline
                                        points={points}
                                        fill="none"
                                        stroke="#3b82f6"
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

            {/* Charts Row */}
            <div className="grid grid-cols-3 mb-lg" style={{ gap: 'var(--spacing-md)' }}>
                {/* Sales by Shipping Type */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">المبيعات حسب نوع الشحن</h3>
                    </div>
                    <div className="chart-container" style={{ height: '280px', padding: 'var(--spacing-md)' }}>
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
                                            font: { family: 'Cairo', size: 12 }
                                        }
                                    }
                                },
                                cutout: '65%'
                            }}
                        />
                    </div>
                </div>

                {/* Monthly Sales & Profits */}
                <div className="card" style={{ gridColumn: 'span 2' }}>
                    <div className="card-header">
                        <h3 className="card-title">المبيعات والأرباح الشهرية</h3>
                    </div>
                    <div className="chart-container" style={{ height: '280px', padding: 'var(--spacing-md)' }}>
                        <Bar
                            data={monthlySalesData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                        rtl: true,
                                        labels: {
                                            color: '#64748b',
                                            font: { family: 'Cairo', size: 12 }
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
                                        ticks: { color: '#64748b', font: { family: 'Cairo' } }
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Tables Row */}
            <div className="grid grid-cols-2 mb-lg" style={{ gap: 'var(--spacing-md)' }}>
                {/* Top Cities */}
                <div className="card">
                    <div className="card-header">
                        <div className="flex items-center gap-sm">
                            <MapPin size={20} style={{ color: '#3b82f6' }} />
                            <h3 className="card-title">المدن الأكثر طلباً</h3>
                        </div>
                    </div>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>المدينة</th>
                                    <th>الطلبات</th>
                                    <th>الإيرادات</th>
                                    <th>النسبة</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topCities.map((city, idx) => (
                                    <tr key={idx}>
                                        <td style={{ fontWeight: '600' }}>{city.city}</td>
                                        <td>{city.orders}</td>
                                        <td style={{ fontWeight: '600', color: '#3b82f6' }}>{city.revenue}</td>
                                        <td>
                                            <div className="flex items-center gap-sm">
                                                <div style={{
                                                    flex: 1,
                                                    maxWidth: '80px',
                                                    height: '6px',
                                                    background: '#f1f5f9',
                                                    borderRadius: 'var(--radius-full)',
                                                    overflow: 'hidden'
                                                }}>
                                                    <div style={{
                                                        width: `${city.percentage}%`,
                                                        height: '100%',
                                                        background: '#3b82f6',
                                                        borderRadius: 'var(--radius-full)'
                                                    }}></div>
                                                </div>
                                                <span style={{ fontSize: 13, fontWeight: 600, color: '#64748b', minWidth: 35 }}>{city.percentage}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Top Products */}
                <div className="card">
                    <div className="card-header">
                        <div className="flex items-center gap-sm">
                            <Package size={20} style={{ color: '#3b82f6' }} />
                            <h3 className="card-title">أفضل المنتجات أداءً</h3>
                        </div>
                    </div>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>المنتج</th>
                                    <th>المبيعات</th>
                                    <th>الإيرادات</th>
                                    <th>الأداء</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topProducts.map((product, idx) => (
                                    <tr key={idx}>
                                        <td style={{ fontWeight: '500', fontSize: '13px' }}>{product.name}</td>
                                        <td>{product.sales}</td>
                                        <td style={{ fontWeight: '600', color: '#3b82f6' }}>{product.revenue}</td>
                                        <td>
                                            <span className={`badge badge-${product.performance === 'excellent' ? 'success' : product.performance === 'good' ? 'info' : 'secondary'}`}>
                                                {product.performance === 'excellent' ? 'ممتاز' : product.performance === 'good' ? 'جيد' : 'متوسط'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Simple Operational Stats */}
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">الإحصائيات التشغيلية</h3>
                </div>
                <div className="grid grid-cols-4" style={{ gap: 'var(--spacing-md)' }}>
                    <div style={{
                        padding: 'var(--spacing-lg)',
                        background: 'var(--bg-input)',
                        borderRadius: 'var(--radius-md)'
                    }}>
                        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>سرعة التجهيز</p>
                        <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>2.5 ساعة</p>
                        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>متوسط وقت التجهيز</p>
                    </div>

                    <div style={{
                        padding: 'var(--spacing-lg)',
                        background: 'var(--bg-input)',
                        borderRadius: 'var(--radius-md)'
                    }}>
                        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>نسبة التسليم الناجح</p>
                        <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>94.5%</p>
                        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>من إجمالي الشحنات</p>
                    </div>

                    <div style={{
                        padding: 'var(--spacing-lg)',
                        background: 'var(--bg-input)',
                        borderRadius: 'var(--radius-md)'
                    }}>
                        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>التكلفة التشغيلية</p>
                        <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>18,200 ج.م</p>
                        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>هذا الشهر</p>
                    </div>

                    <div style={{
                        padding: 'var(--spacing-lg)',
                        background: 'var(--bg-input)',
                        borderRadius: 'var(--radius-md)'
                    }}>
                        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>معدل رضا العملاء</p>
                        <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>4.8/5</p>
                        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>من 2,450 تقييم</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
