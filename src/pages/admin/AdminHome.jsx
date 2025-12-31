import {
    TrendingUp,
    TrendingDown,
    Users,
    ShoppingBag,
    DollarSign,
    Activity,
    ArrowUpRight,
    CreditCard,
    MoreHorizontal
} from 'lucide-react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    XAxis,
    ResponsiveContainer
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
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
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

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                    <TabsTrigger value="analytics">التحليلات</TabsTrigger>
                    <TabsTrigger value="reports">التقارير</TabsTrigger>
                    <TabsTrigger value="notifications">التنبيهات</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    {/* Stats Grid */}
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

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        {/* Main Chart */}
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

                        {/* Recent Sales / Top Merchants (Side Card) */}
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

                    {/* Recent Registrations Table */}
                    <Card className="shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="grid gap-2">
                                <CardTitle>طلبات التسجيل الجديدة</CardTitle>
                                <CardDescription>
                                    قائمة بالتجار الجدد بانتظار الموافقة.
                                </CardDescription>
                            </div>
                            <Button size="sm" className="gap-1">
                                عرض الكل
                                <ArrowUpRight className="h-4 w-4" />
                            </Button>
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
                </TabsContent>

                {/* Placeholders for other tabs */}
                <TabsContent value="analytics" className="h-[400px] flex items-center justify-center border rounded-lg border-dashed">
                    <div className="text-center text-muted-foreground">
                        <Activity className="mx-auto h-10 w-10 opacity-50 mb-2" />
                        <p>محتوى التحليلات قادم قريباً</p>
                    </div>
                </TabsContent>
                <TabsContent value="reports" className="h-[400px] flex items-center justify-center border rounded-lg border-dashed">
                    <div className="text-center text-muted-foreground">
                        <CreditCard className="mx-auto h-10 w-10 opacity-50 mb-2" />
                        <p> التقارير المالية قادمة قريباً</p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
