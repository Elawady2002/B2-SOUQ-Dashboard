import {
    TrendingUp,
    TrendingDown,
    Users,
    ShoppingBag,
    DollarSign,
    Activity,
    ArrowUpRight,
    CreditCard,
    MoreHorizontal,
    Bell,
    CheckCircle2,
    AlertCircle,
    Package,
    Truck,
    Clock
} from 'lucide-react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
    CardAction
} from '@/components/ui/card';

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from '@/components/ui/button';
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AdminReports from './AdminReports';

export default function AdminHome() {
    // Recharts Data
    const chartData = [
        { month: "يناير", revenue: 65000 },
        { month: "فبراير", revenue: 72000 },
        { month: "مارس", revenue: 85000 },
        { month: "أبريل", revenue: 92000 },
        { month: "مايو", revenue: 115000 },
        { month: "يونيو", revenue: 125000 },
        { month: "يوليو", revenue: 140000 },
        { month: "أغسطس", revenue: 165000 },
    ]

    const chartConfig = {
        revenue: {
            label: "الإيرادات",
            color: "hsl(var(--primary))",
        },
    }

    // Analytics Data
    const visitsData = [
        { name: 'السبت', visits: 4000, orders: 2400 },
        { name: 'الأحد', visits: 3000, orders: 1398 },
        { name: 'الاثنين', visits: 2000, orders: 9800 },
        { name: 'الثلاثاء', visits: 2780, orders: 3908 },
        { name: 'الأربعاء', visits: 1890, orders: 4800 },
        { name: 'الخميس', visits: 2390, orders: 3800 },
        { name: 'الجمعة', visits: 3490, orders: 4300 },
    ];

    const deviceData = [
        { name: 'Desktop', value: 400, color: '#0088FE' },
        { name: 'Mobile', value: 300, color: '#00C49F' },
        { name: 'Tablet', value: 300, color: '#FFBB28' },
        { name: 'Other', value: 200, color: '#FF8042' },
    ];

    // Notifications Data
    const notifications = [
        {
            id: 1,
            title: "طلب جديد #1234",
            description: "تم استلام طلب جديد بقيمة 1,200 EGP",
            time: "منذ 5 دقائق",
            icon: ShoppingBag,
            color: "text-blue-500",
            bg: "bg-blue-100 placeholder:bg-blue-100"
        },
        {
            id: 2,
            title: "نفاد المخزون",
            description: "تنبيه: المنتج 'سماعة بلوتوث' قارب على النفاد",
            time: "منذ 2 ساعة",
            icon: AlertCircle,
            color: "text-red-500",
            bg: "bg-red-100"
        },
        {
            id: 3,
            title: "تاجر جديد",
            description: "سجل التاجر 'مكتبة النور' في المنصة",
            time: "منذ 4 ساعات",
            icon: Users,
            color: "text-green-500",
            bg: "bg-green-100"
        },
        {
            id: 4,
            title: "تحديث النظام",
            description: "تم تحديث النظام بنجاح إلى النسخة 2.0",
            time: "منذ يوم واحد",
            icon: CheckCircle2,
            color: "text-purple-500",
            bg: "bg-purple-100"
        },
        {
            id: 5,
            title: "مرتجع جديد",
            description: "تم طلب إرجاع للمنتج #9988",
            time: "منذ يومين",
            icon: Package,
            color: "text-orange-500",
            bg: "bg-orange-100"
        }
    ];

    // Stats Data
    const statsCards = [
        {
            title: 'إجمالي الإيرادات',
            value: 'EGP 1,250,400',
            change: '+12.5%',
            trend: 'up',
            icon: DollarSign,
            description: 'مقارنة بالشهر الماضي'
        },
        {
            title: 'إجمالي الطلبات',
            value: '45,231',
            change: '+8.2%',
            trend: 'up',
            icon: ShoppingBag,
            description: 'مقارنة بالشهر الماضي'
        },
        {
            title: 'زيارات المنصة',
            value: '125.4k',
            change: '+18.2%',
            trend: 'up',
            icon: Activity,
            description: 'مقارنة بالشهر الماضي'
        },
        {
            title: 'المستخدمين الجدد',
            value: '8,540',
            change: '-2.4%',
            trend: 'down',
            icon: Users,
            description: 'مقارنة بالشهر الماضي'
        }
    ];

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8" dir="rtl">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">لوحة التحكم</h2>
                    <p className="text-muted-foreground">
                        نظرة شاملة على أداء متجرك والعمليات الحالية.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">تنزيل التقرير</Button>
                </div>
            </div>

            <div className="space-y-8">

                {/* Section: Overview Stats */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {statsCards.map((stat, index) => (
                        <Card key={index} data-slot="card" className="shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <stat.icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                    <span className={stat.trend === 'up' ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                                        {stat.change}
                                    </span>
                                    {stat.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Section: Analytics */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold tracking-tight">التحليلات والأداء</h3>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        {/* Revenue Chart */}
                        <Card className="col-span-4 shadow-sm">
                            <CardHeader>
                                <CardTitle>نمو الإيرادات</CardTitle>
                                <CardDescription>
                                    عرض للإيرادات الشهرية للعام الحالي
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <ChartContainer config={chartConfig} className="aspect-auto h-[350px] w-full">
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>

                                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="month"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                        />
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent indicator="dot" hideLabel />}
                                        />
                                        <Area
                                            dataKey="revenue"
                                            type="natural"
                                            fill="url(#fillRevenue)"
                                            stroke="var(--color-revenue)"
                                            strokeWidth={2}
                                            fillOpacity={0.4}
                                        />
                                    </AreaChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        {/* Top Merchants */}
                        <Card className="col-span-3 shadow-sm">
                            <CardHeader>
                                <CardTitle>أفضل التجار</CardTitle>
                                <CardDescription>
                                    أعلى 5 تجار تحقيقاً للمبيعات هذا الشهر
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-8">
                                    {[
                                        { name: 'متجر الإلكترونيات', email: 'tech_store@example.com', sales: 'EGP 124k', initials: 'ES', color: 'bg-blue-100 text-blue-600' },
                                        { name: 'أزياء الموضة', email: 'fashion_hub@example.com', sales: 'EGP 98k', initials: 'FM', color: 'bg-pink-100 text-pink-600' },
                                        { name: 'بيت الرياضة', email: 'sports_house@example.com', sales: 'EGP 85k', initials: 'SH', color: 'bg-orange-100 text-orange-600' },
                                        { name: 'عالم التقنية', email: 'tech_world@example.com', sales: 'EGP 62k', initials: 'TW', color: 'bg-cyan-100 text-cyan-600' },
                                        { name: 'مجوهرات الماس', email: 'diamond_jewelry@example.com', sales: 'EGP 54k', initials: 'DJ', color: 'bg-indigo-100 text-indigo-600' },
                                    ].map((merchant, i) => (
                                        <div key={i} className="flex items-center">
                                            <Avatar className="h-9 w-9">
                                                <AvatarFallback className={merchant.color}>{merchant.initials}</AvatarFallback>
                                            </Avatar>
                                            <div className="mr-4 space-y-1">
                                                <p className="text-sm font-medium leading-none">{merchant.name}</p>
                                                <p className="text-sm text-muted-foreground">{merchant.email}</p>
                                            </div>
                                            <div className="mr-auto font-medium">{merchant.sales}</div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    {/* Visits Chart */}
                    <Card className="col-span-4 shadow-sm">
                        <CardHeader>
                            <CardTitle>الزيارات مقابل الطلبات</CardTitle>
                            <CardDescription>مقارنة أداء الأسبوع الحالي</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={visitsData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Legend />
                                        <Bar dataKey="visits" name="الزيارات" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="orders" name="الطلبات" fill="#10b981" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Device Usage */}
                    <Card className="col-span-3 shadow-sm">
                        <CardHeader>
                            <CardTitle>الأجهزة المستخدمة</CardTitle>
                            <CardDescription>توزيع المستخدمين حسب نوع الجهاز</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={deviceData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {deviceData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Section: Reports */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold tracking-tight">التقارير المالية</h3>
                    </div>
                    <AdminReports />
                </div>

                {/* Section: Activity & Notifications */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold tracking-tight">النشاطات والتنبيهات</h3>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        {/* Recent Registrations Table */}
                        <Card className="shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <Button size="sm" className="gap-1">
                                    عرض الكل
                                    <ArrowUpRight className="h-4 w-4" />
                                </Button>
                                <div className="grid gap-2 text-right">
                                    <CardTitle>طلبات التسجيل الجديدة</CardTitle>
                                    <CardDescription>
                                        قائمة بالتجار الجدد بانتظار الموافقة.
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="text-right">التاجر</TableHead>
                                            <TableHead className="text-right">النشاط</TableHead>
                                            <TableHead className="text-right hidden md:table-cell">التاريخ</TableHead>
                                            <TableHead className="text-right">الحالة</TableHead>
                                            <TableHead className="text-right">الإجراء</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {[
                                            { name: 'سامي للأدوات', email: 'sami@example.com', type: 'أدوات منزلية', date: '2023-12-25', status: 'pending' },
                                            { name: 'بوتيك سندريلا', email: 'cinderella@example.com', type: 'ملابس', date: '2023-12-24', status: 'pending' },
                                            { name: 'تك ستور', email: 'tech@example.com', type: 'إلكترونيات', date: '2023-12-23', status: 'approved' },
                                            { name: 'هايبر ماركت', email: 'hyper@example.com', type: 'سوبر ماركت', date: '2023-12-22', status: 'pending' },
                                            { name: 'كتب ومراجع', email: 'books@example.com', type: 'مكتبة', date: '2023-12-21', status: 'approved' },
                                        ].map((row, i) => (
                                            <TableRow key={i}>
                                                <TableCell>
                                                    <div className="font-medium">{row.name}</div>
                                                    <div className="text-xs text-muted-foreground md:hidden">{row.email}</div>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">{row.type}</TableCell>
                                                <TableCell className="table-cell md:hidden">
                                                    <div className="flex flex-col">
                                                        <span>{row.type}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">{row.date}</TableCell>
                                                <TableCell>
                                                    {row.status === 'pending' ? (
                                                        <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">بانتظار الموافقة</Badge>
                                                    ) : (
                                                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">مقبول</Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                                <span className="sr-only">Toggle menu</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>إجراءات</DropdownMenuLabel>
                                                            <DropdownMenuItem>مراجعة الطلب</DropdownMenuItem>
                                                            <DropdownMenuItem>مراسلة التاجر</DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem className="text-red-600">رفض الطلب</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        {/* Notifications */}
                        <Card>
                            <CardHeader>
                                <CardTitle>مركز التنبيهات</CardTitle>
                                <CardDescription>آخر النشاطات والتحديثات في النظام</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                                        >
                                            <div className={`p-2 rounded-full ${notification.bg}`}>
                                                <notification.icon className={`h-5 w-5 ${notification.color}`} />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-medium text-sm">{notification.title}</p>
                                                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    {notification.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="ghost" className="w-full">عرض كل التنبيهات</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>

            </div>
        </div>
    );
}
