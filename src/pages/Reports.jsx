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
    { label: 'إجمالي المبيعات', value: '425,800 ج.م', change: '+15.2%', positive: true, icon: ShoppingCart },
    { label: 'صافي الأرباح', value: '89,300 ج.م', change: '+8.5%', positive: true, icon: DollarSign },
    { label: 'إجمالي الخصومات', value: '12,450 ج.م', change: '-5.2%', positive: true, icon: Percent },
    { label: 'تكلفة الشحن', value: '18,200 ج.م', change: '+3.1%', positive: false, icon: Truck },
    { label: 'المرتجعات', value: '8,650 ج.م', change: '-12.4%', positive: true, icon: RotateCcw },
    { label: 'نسبة الإلغاء', value: '4.2%', change: '-1.8%', positive: true, icon: Clock },
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
                backgroundColor: ['#22c55e', '#3b82f6', '#f59e0b'],
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
                backgroundColor: 'rgba(99, 102, 241, 0.8)',
                borderRadius: 8,
            },
            {
                label: 'الأرباح',
                data: [12000, 14500, 13200, 16800, 15200, 19800],
                backgroundColor: 'rgba(34, 197, 94, 0.8)',
                borderRadius: 8,
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
                <button className="btn btn-secondary">
                    <Download size={18} />
                    تصدير التقرير
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-6 mb-xl">
                {reportCards.map((card, idx) => (
                    <div key={idx} className="stats-card">
                        <div className={`stats-card-icon ${card.positive ? 'success' : 'danger'}`}>
                            <card.icon size={24} />
                        </div>
                        <div className="stats-card-content">
                            <div className="stats-card-label">{card.label}</div>
                            <div className="stats-card-value" style={{ fontSize: '18px' }}>{card.value}</div>
                            <div className={`stats-card-change ${card.positive ? 'positive' : 'negative'}`}>
                                {card.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                <span>{card.change}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-3 mb-xl">
                {/* Sales by Shipping Type */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">المبيعات حسب نوع الشحن</h3>
                    </div>
                    <div className="chart-container" style={{ height: '250px' }}>
                        <Doughnut
                            data={salesByShippingData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                        rtl: true,
                                        labels: { color: '#94a3b8', padding: 15 }
                                    }
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Monthly Sales & Profits */}
                <div className="card" style={{ gridColumn: 'span 2' }}>
                    <div className="card-header">
                        <h3 className="card-title">المبيعات والأرباح الشهرية</h3>
                    </div>
                    <div className="chart-container" style={{ height: '250px' }}>
                        <Bar
                            data={monthlySalesData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                        rtl: true,
                                        labels: { color: '#94a3b8' }
                                    }
                                },
                                scales: {
                                    x: { grid: { display: false }, ticks: { color: '#64748b' } },
                                    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b' } }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Tables Row */}
            <div className="grid grid-cols-2">
                {/* Top Cities */}
                <div className="card">
                    <div className="card-header">
                        <div className="flex items-center gap-md">
                            <MapPin size={20} style={{ color: 'var(--accent-primary)' }} />
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
                                        <td style={{ fontWeight: '500' }}>{city.city}</td>
                                        <td>{city.orders}</td>
                                        <td style={{ color: 'var(--success)' }}>{city.revenue}</td>
                                        <td>
                                            <div className="flex items-center gap-sm">
                                                <div style={{
                                                    width: '60px',
                                                    height: '6px',
                                                    background: 'var(--bg-input)',
                                                    borderRadius: '3px',
                                                    overflow: 'hidden'
                                                }}>
                                                    <div style={{
                                                        width: `${city.percentage}%`,
                                                        height: '100%',
                                                        background: 'var(--accent-primary)'
                                                    }}></div>
                                                </div>
                                                <span>{city.percentage}%</span>
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
                        <div className="flex items-center gap-md">
                            <Package size={20} style={{ color: 'var(--success)' }} />
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
                                        <td style={{ color: 'var(--success)' }}>{product.revenue}</td>
                                        <td>
                                            <span className={`badge badge-${product.performance === 'excellent' ? 'success' : product.performance === 'good' ? 'info' : 'warning'}`}>
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

            {/* Operational Stats */}
            <div className="card mt-lg">
                <div className="card-header">
                    <h3 className="card-title">الإحصائيات التشغيلية</h3>
                </div>
                <div className="grid grid-cols-4">
                    <div style={{ padding: 'var(--spacing-lg)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>سرعة التجهيز</p>
                        <p style={{ fontSize: '24px', fontWeight: '700', color: 'var(--success)' }}>2.5 ساعة</p>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>متوسط وقت التجهيز</p>
                    </div>
                    <div style={{ padding: 'var(--spacing-lg)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>نسبة التسليم الناجح</p>
                        <p style={{ fontSize: '24px', fontWeight: '700', color: 'var(--success)' }}>94.5%</p>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>من إجمالي الشحنات</p>
                    </div>
                    <div style={{ padding: 'var(--spacing-lg)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>التكلفة التشغيلية</p>
                        <p style={{ fontSize: '24px', fontWeight: '700', color: 'var(--warning)' }}>18,200 ج.م</p>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>هذا الشهر</p>
                    </div>
                    <div style={{ padding: 'var(--spacing-lg)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>معدل رضا العملاء</p>
                        <p style={{ fontSize: '24px', fontWeight: '700', color: 'var(--success)' }}>4.8/5</p>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>من 2,450 تقييم</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
