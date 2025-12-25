import { BarChart3, PieChart, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export default function AdminReports() {
    // Chart Data
    const revenueData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'الإيرادات',
                data: [12000, 19000, 15000, 22000, 24000, 28000],
                backgroundColor: '#3b82f6', // blue-500
                borderRadius: 4,
            },
            {
                label: 'المصروفات',
                data: [8000, 12000, 10000, 14000, 16000, 18000],
                backgroundColor: '#cbd5e1', // slate-300
                borderRadius: 4,
            }
        ]
    };

    const categoryData = {
        labels: ['إلكترونيات', 'ملابس', 'منزل', 'جمال', 'أخرى'],
        datasets: [
            {
                data: [35, 25, 20, 10, 10],
                backgroundColor: [
                    '#3b82f6', // blue
                    '#8b5cf6', // violet
                    '#f59e0b', // amber
                    '#10b981', // emerald
                    '#64748b', // slate
                ],
                borderWidth: 0,
            }
        ]
    };

    return (
        <div className="space-y-6" dir="rtl">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">التقارير المالية</h1>
                    <p className="text-slate-500 mt-1">تحليل شامل لأداء المنصة المالي.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Calendar size={16} />
                        آخر 30 يوم
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                        <Download size={16} />
                        تصدير تقرير PDF
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Bar Chart */}
                <Card className="lg:col-span-2 shadow-sm border-slate-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 size={20} className="text-blue-600" />
                            الإيرادات والمصروفات
                        </CardTitle>
                        <CardDescription>مقارنة شهرية للأداء المالي</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <Bar
                                data={revenueData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                        y: { beginAtZero: true, grid: { drawBorder: false } },
                                        x: { grid: { display: false } }
                                    }
                                }}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Pie Chart */}
                <Card className="shadow-sm border-slate-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PieChart size={20} className="text-purple-600" />
                            توزيع المبيعات
                        </CardTitle>
                        <CardDescription>حسب فئات المنتجات</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] flex items-center justify-center">
                            <Doughnut
                                data={categoryData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    cutout: '70%',
                                    plugins: {
                                        legend: { position: 'bottom' }
                                    }
                                }}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Stats Summary Table */}
            <Card className="shadow-sm border-slate-200">
                <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse">
                        {[
                            { label: 'صافي الربح', value: 'EGP 450,200', change: '+12%', color: 'text-green-600' },
                            { label: 'إجمالي العمولات', value: 'EGP 85,000', change: '+5%', color: 'text-blue-600' },
                            { label: 'قيمة المرتجعات', value: 'EGP 12,400', change: '-2%', color: 'text-red-600' },
                            { label: 'متوسط قيمة الطلب', value: 'EGP 1,250', change: '+8%', color: 'text-slate-900' },
                        ].map((stat, i) => (
                            <div key={i} className="p-6 text-center">
                                <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
                                <h3 className={`text-2xl font-bold ${stat.color}`}>{stat.value}</h3>
                                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full mt-2 inline-block">
                                    {stat.change} مقارنة بالشهر الماضي
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
