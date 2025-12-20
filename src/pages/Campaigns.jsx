import {
    Megaphone,
    Plus,
    TrendingUp,
    Eye,
    ShoppingCart,
    Percent,
    Calendar,
    CheckCircle,
    Clock,
    X,
    Edit,
    BarChart3,
    Users,
    DollarSign,
    Gift,
    Tag,
    Trash
} from 'lucide-react';
import { useState } from 'react';
import React from 'react';

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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const platformCampaigns = [
    {
        id: 1,
        name: 'تخفيضات نهاية العام',
        description: 'خصومات على جميع الفئات',
        discount: '30%',
        startDate: '2024-12-20',
        endDate: '2024-12-31',
        minPrice: 'الحد الأدنى: 100 ج.م',
        products: 150,
        status: 'upcoming',
        joined: false
    },
    {
        id: 2,
        name: 'عروض الشتاء',
        description: 'تخفيضات على الملابس والإكسسوارات',
        discount: '25%',
        startDate: '2024-12-15',
        endDate: '2024-12-25',
        minPrice: 'الحد الأدنى: 80 ج.م',
        products: 200,
        status: 'active',
        joined: true
    },
    {
        id: 3,
        name: 'الجمعة البيضاء',
        description: 'أكبر تخفيضات السنة',
        discount: '50%',
        startDate: '2024-11-25',
        endDate: '2024-11-30',
        minPrice: 'الحد الأدنى: 50 ج.م',
        products: 300,
        status: 'ended',
        joined: true
    },
];

const storeCampaigns = [
    {
        id: 1,
        name: 'خصم 15% على السماعات',
        type: 'price_discount',
        typeLabel: 'تخفيض سعر',
        discount: '15%',
        products: 8,
        sales: 45,
        visits: 320,
        revenue: 38250,
        profit: 5400,
        status: 'active',
        startDate: '2024-12-01',
        endDate: '2024-12-31'
    },
    {
        id: 2,
        name: 'اشتر 2 واحصل على خصم 20%',
        type: 'multi_piece',
        typeLabel: 'عرض كمية',
        discount: '20%',
        products: 5,
        sales: 23,
        visits: 180,
        revenue: 12650,
        profit: 1800,
        status: 'active',
        startDate: '2024-12-10',
        endDate: '2024-12-25'
    },
    {
        id: 3,
        name: 'خصم على مجموعة الهواتف',
        type: 'group_discount',
        typeLabel: 'خصم مجموعة',
        discount: '10%',
        products: 12,
        sales: 67,
        visits: 450,
        revenue: 45000,
        profit: 6200,
        status: 'active',
        startDate: '2024-12-05',
        endDate: '2024-12-20'
    },
    {
        id: 4,
        name: 'عرض الافتتاح',
        type: 'price_discount',
        typeLabel: 'تخفيض سعر',
        discount: '10%',
        products: 20,
        sales: 156,
        visits: 890,
        revenue: 78000,
        profit: 9800,
        status: 'ended',
        startDate: '2024-11-01',
        endDate: '2024-11-30'
    },
];

export default function Campaigns() {
    const [showModal, setShowModal] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [showReportModal, setShowReportModal] = useState(false);

    // Calculate totals
    const activeCampaigns = storeCampaigns.filter(c => c.status === 'active').length;
    const totalSales = storeCampaigns.reduce((sum, c) => sum + c.sales, 0);
    const totalRevenue = storeCampaigns.reduce((sum, c) => sum + c.revenue, 0);
    const totalVisits = storeCampaigns.reduce((sum, c) => sum + c.visits, 0);

    return (
        <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">الحملات والعروض</h2>
                    <p className="text-sm text-slate-500 mt-1">إدارة حملات المنصة وعروض متجرك</p>
                </div>
                <Button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 gap-2">
                    <Plus size={18} />
                    إنشاء عرض جديد
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500 font-medium mb-1">حملات نشطة</p>
                            <p className="text-3xl font-bold text-blue-600">{activeCampaigns}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                            <Megaphone size={24} />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500 font-medium mb-1">المبيعات من العروض</p>
                            <p className="text-3xl font-bold text-emerald-600">{totalSales}</p>
                        </div>
                        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                            <ShoppingCart size={24} />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500 font-medium mb-1">إجمالي العائد</p>
                            <p className="text-2xl font-bold text-purple-600">
                                {totalRevenue.toLocaleString('en-US')} <span className="text-sm font-normal text-slate-500">ج.م</span>
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                            <TrendingUp size={24} />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500 font-medium mb-1">الزيارات من العروض</p>
                            <p className="text-3xl font-bold text-amber-500">{totalVisits.toLocaleString('en-US')}</p>
                        </div>
                        <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
                            <Eye size={24} />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Platform Campaigns */}
            <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-50">
                    <CardTitle className="text-lg font-bold text-slate-800">حملات المنصة</CardTitle>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-normal">
                        المنصة تتحكم في الحد الأدنى للسعر
                    </Badge>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {platformCampaigns.map((campaign) => (
                            <div
                                key={campaign.id}
                                className={`rounded-xl border p-5 transition-all ${campaign.status === 'active'
                                    ? 'bg-emerald-50/50 border-emerald-200 shadow-sm'
                                    : campaign.status === 'upcoming'
                                        ? 'bg-blue-50/50 border-blue-200 shadow-sm'
                                        : 'bg-slate-50 border-slate-100 opacity-80'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-base font-bold text-slate-900">{campaign.name}</h4>
                                    <Badge className={`${campaign.status === 'active' ? 'bg-emerald-500 hover:bg-emerald-600' :
                                        campaign.status === 'upcoming' ? 'bg-blue-500 hover:bg-blue-600' :
                                            'bg-slate-500 hover:bg-slate-600'
                                        }`}>
                                        {campaign.status === 'active' ? 'نشط' : campaign.status === 'upcoming' ? 'قادم' : 'منتهي'}
                                    </Badge>
                                </div>
                                <p className="text-sm text-slate-600 mb-4 h-10">{campaign.description}</p>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2">
                                        <Percent size={14} className="text-emerald-600" />
                                        <span className="text-sm font-semibold text-emerald-700">خصم {campaign.discount}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-slate-400" />
                                        <span className="text-xs text-slate-500">{campaign.startDate} - {campaign.endDate}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Tag size={14} className="text-slate-400" />
                                        <span className="text-xs text-slate-500">{campaign.minPrice}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Gift size={14} className="text-slate-400" />
                                        <span className="text-xs text-slate-500">{campaign.products} منتج مشارك</span>
                                    </div>
                                </div>

                                {campaign.status !== 'ended' && (
                                    <Button
                                        className={`w-full ${campaign.joined
                                            ? 'bg-emerald-600 hover:bg-emerald-700'
                                            : 'bg-blue-600 hover:bg-blue-700'
                                            }`}
                                        disabled={campaign.joined}
                                    >
                                        {campaign.joined ? (
                                            <>
                                                <CheckCircle size={16} className="ml-2" />
                                                منضم للحملة
                                            </>
                                        ) : (
                                            <>
                                                <Plus size={16} className="ml-2" />
                                                الانضمام للحملة
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Store Campaigns */}
            <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader className="pb-4 border-b border-slate-50">
                    <CardTitle className="text-lg font-bold text-slate-800">عروض متجرك</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50/50">
                            <TableRow className="hover:bg-transparent border-slate-100">
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">اسم العرض</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">النوع</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">الخصم</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">المنتجات</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">المبيعات</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">الزيارات</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">العائد</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">تأثير الربح</TableHead>
                                <TableHead className="text-center h-10 text-xs font-semibold text-slate-600">الحالة</TableHead>
                                <TableHead className="text-center h-10 text-xs font-semibold text-slate-600">الإجراءات</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {storeCampaigns.map((campaign) => (
                                <TableRow key={campaign.id} className="hover:bg-slate-50/50">
                                    <TableCell className="font-semibold text-slate-800 text-sm py-3">{campaign.name}</TableCell>
                                    <TableCell className="py-3">
                                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-normal whitespace-nowrap">
                                            {campaign.typeLabel}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-bold text-emerald-600 py-3">{campaign.discount}</TableCell>
                                    <TableCell className="text-xs text-slate-500 py-3">{campaign.products} منتج</TableCell>
                                    <TableCell className="text-sm font-medium text-slate-700 py-3">{campaign.sales}</TableCell>
                                    <TableCell className="text-xs text-slate-500 py-3">{campaign.visits.toLocaleString('en-US')}</TableCell>
                                    <TableCell className="font-bold text-purple-600 py-3">{campaign.revenue.toLocaleString('en-US')} ج.م</TableCell>
                                    <TableCell className="font-bold text-emerald-600 py-3">+{campaign.profit.toLocaleString('en-US')} ج.م</TableCell>
                                    <TableCell className="text-center py-3">
                                        <Badge variant="secondary" className={`font-normal whitespace-nowrap ${campaign.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                                            }`}>
                                            {campaign.status === 'active' ? 'نشط' : 'منتهي'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <div className="flex items-center justify-center gap-1">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 text-blue-600 hover:bg-blue-50 rounded-full"
                                                onClick={() => {
                                                    setSelectedCampaign(campaign);
                                                    setShowReportModal(true);
                                                }}
                                                title="تقرير الحملة"
                                            >
                                                <BarChart3 size={16} />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full"
                                                title="تعديل"
                                            >
                                                <Edit size={16} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Create Campaign Modal */}
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent className="sm:max-w-[600px] bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                            إنشاء عرض جديد
                        </DialogTitle>
                    </DialogHeader>

                    <div className="py-4 space-y-4">
                        <div className="space-y-2">
                            <Label>اسم العرض</Label>
                            <Input placeholder="مثال: خصم 20% على الهواتف" className="bg-white border-slate-200" />
                        </div>

                        <div className="space-y-2">
                            <Label>نوع العرض</Label>
                            <Select>
                                <SelectTrigger className="bg-white border-slate-200">
                                    <SelectValue placeholder="اختر نوع العرض" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="price_discount">تخفيض السعر</SelectItem>
                                    <SelectItem value="group_discount">خصم على مجموعة منتجات</SelectItem>
                                    <SelectItem value="multi_piece">عرض على أكثر من قطعة</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>نسبة الخصم (%)</Label>
                                <Input type="number" placeholder="15" className="bg-white border-slate-200" />
                            </div>
                            <div className="space-y-2">
                                <Label>المنتجات</Label>
                                <Select>
                                    <SelectTrigger className="bg-white border-slate-200">
                                        <SelectValue placeholder="اختر المنتجات" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">كل المنتجات</SelectItem>
                                        <SelectItem value="phones">هواتف</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>تاريخ البداية</Label>
                                <Input type="date" className="bg-white border-slate-200" />
                            </div>
                            <div className="space-y-2">
                                <Label>تاريخ النهاية</Label>
                                <Input type="date" className="bg-white border-slate-200" />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="gap-2 border-t border-slate-100 pt-4">
                        <Button variant="outline" onClick={() => setShowModal(false)}>إلغاء</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                            <Plus size={18} />
                            إنشاء العرض
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Campaign Report Modal */}
            <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
                <DialogContent className="sm:max-w-[700px] bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                            تقرير الحملة: {selectedCampaign?.name}
                        </DialogTitle>
                    </DialogHeader>

                    {selectedCampaign && (
                        <div className="py-4 space-y-6">
                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-4">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                                        <ShoppingCart size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">المبيعات الناتجة</p>
                                        <p className="text-xl font-bold text-emerald-700">{selectedCampaign.sales}</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-center gap-4">
                                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                                        <Users size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">الزيارات</p>
                                        <p className="text-xl font-bold text-amber-700">{selectedCampaign.visits.toLocaleString('en-US')}</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 flex items-center gap-4">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                                        <TrendingUp size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">العائد</p>
                                        <p className="text-xl font-bold text-purple-700">{selectedCampaign.revenue.toLocaleString('en-US')} ج.م</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                        <DollarSign size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">تأثير على الربح</p>
                                        <p className="text-xl font-bold text-blue-700">+{selectedCampaign.profit.toLocaleString('en-US')} ج.م</p>
                                    </div>
                                </div>
                            </div>

                            {/* Details Table */}
                            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                                <h4 className="font-bold text-slate-900 mb-4 text-sm">تفاصيل الحملة</h4>
                                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-500 mb-1">نوع العرض</span>
                                        <span className="font-semibold text-slate-900">{selectedCampaign.typeLabel}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-500 mb-1">نسبة الخصم</span>
                                        <span className="font-bold text-emerald-600">{selectedCampaign.discount}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-500 mb-1">عدد المنتجات</span>
                                        <span className="font-semibold text-slate-900">{selectedCampaign.products} منتج</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-500 mb-1">الفترة</span>
                                        <span className="font-medium text-slate-700 text-xs font-mono">{selectedCampaign.startDate} - {selectedCampaign.endDate}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="secondary" onClick={() => setShowReportModal(false)}>إغلاق</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
