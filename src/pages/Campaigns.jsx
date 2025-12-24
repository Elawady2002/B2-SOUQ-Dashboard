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
    Trash,
    Sparkles,
    Zap,
    ArrowLeft,
    Package
} from 'lucide-react';
import { useState } from 'react';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
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
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from "@/components/ui/sheet";
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

const getPlatformCampaigns = (t) => [
    {
        id: 1,
        name: t('campaigns.endYearSale'),
        description: t('campaigns.allCategoriesDiscount'),
        discount: '30%',
        startDate: '2024-12-20',
        endDate: '2024-12-31',
        minPrice: 100,
        products: 150,
        status: 'upcoming',
        joined: false,
        color: 'blue',
        icon: Sparkles
    },
    {
        id: 2,
        name: t('campaigns.winterOffers'),
        description: t('campaigns.clothesAccessories'),
        discount: '25%',
        startDate: '2024-12-15',
        endDate: '2024-12-25',
        minPrice: 80,
        products: 200,
        status: 'active',
        joined: true,
        color: 'emerald',
        icon: Gift
    },
    {
        id: 3,
        name: t('campaigns.whiteFriday'),
        description: t('campaigns.biggestSale'),
        discount: '50%',
        startDate: '2024-11-25',
        endDate: '2024-11-30',
        minPrice: 50,
        products: 300,
        status: 'ended',
        joined: true,
        color: 'slate',
        icon: Zap
    },
];

const getStoreCampaigns = (t) => [
    {
        id: 1,
        name: t('campaigns.phonesDiscount'),
        type: 'price_discount',
        typeLabel: t('campaigns.priceDiscount'),
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
        name: t('campaigns.buy2get20'),
        type: 'multi_piece',
        typeLabel: t('campaigns.quantityOffer'),
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
        name: t('campaigns.phonesGroup'),
        type: 'group_discount',
        typeLabel: t('campaigns.groupDiscount'),
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
        name: t('campaigns.openingOffer'),
        type: 'price_discount',
        typeLabel: t('campaigns.priceDiscount'),
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

const typeConfig = {
    price_discount: { color: 'bg-blue-50 text-blue-700 border-blue-200' },
    multi_piece: { color: 'bg-purple-50 text-purple-700 border-purple-200' },
    group_discount: { color: 'bg-orange-50 text-orange-700 border-orange-200' },
};

export default function Campaigns() {
    const { t, isRTL } = useLanguage();
    const [searchParams, setSearchParams] = useSearchParams();

    // Create Offer Sheet State
    const showModal = searchParams.get('sheet') === 'create-campaign';
    const setShowModal = (open) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            if (open) {
                newParams.set('sheet', 'create-campaign');
            } else {
                newParams.delete('sheet');
            }
            return newParams;
        });
    };

    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [showReportModal, setShowReportModal] = useState(false);

    const platformCampaigns = getPlatformCampaigns(t);
    const storeCampaigns = getStoreCampaigns(t);

    // Dynamic status config with translations
    const statusConfig = {
        active: { label: t('campaigns.active'), bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
        upcoming: { label: t('campaigns.upcoming'), bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
        ended: { label: t('campaigns.ended'), bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
    };

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
                    <h2 className="text-2xl font-bold text-slate-900">{t('campaigns.title')}</h2>
                    <p className="text-sm text-slate-500 mt-1">{t('campaigns.subtitle')}</p>
                </div>
                <Button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 gap-2">
                    <Plus size={18} />
                    {t('campaigns.createOffer')}
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                            <Megaphone size={22} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">{t('campaigns.activeCampaigns')}</p>
                            <p className="text-xl font-bold text-slate-900">{activeCampaigns}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                            <ShoppingCart size={22} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">{t('campaigns.salesFromOffers')}</p>
                            <p className="text-xl font-bold text-slate-900">{totalSales}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                            <TrendingUp size={22} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">{t('campaigns.totalRevenue')}</p>
                            <p className="text-xl font-bold text-slate-900">{totalRevenue.toLocaleString('en-US')} {t('common.egp')}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                            <Eye size={22} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">{t('campaigns.visitsFromOffers')}</p>
                            <p className="text-xl font-bold text-slate-900">{totalVisits.toLocaleString('en-US')}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Platform Campaigns - Card Based Design */}
            <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader className="pb-4 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-bold text-slate-800">{t('campaigns.platformCampaigns')}</CardTitle>
                            <CardDescription className="text-slate-500">{t('campaigns.platformDescription')}</CardDescription>
                        </div>
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-medium">
                            {platformCampaigns.filter(c => c.status === 'active').length} {t('campaigns.activeCampaign')}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {platformCampaigns.map((campaign) => {
                            const status = statusConfig[campaign.status];
                            const Icon = campaign.icon;
                            const colorClasses = {
                                blue: 'from-blue-500 to-indigo-600',
                                emerald: 'from-emerald-500 to-teal-600',
                                slate: 'from-slate-400 to-slate-500',
                            };

                            return (
                                <div
                                    key={campaign.id}
                                    className={`relative rounded-2xl overflow-hidden border ${campaign.status === 'ended' ? 'border-slate-200 opacity-70' : 'border-slate-200'
                                        }`}
                                >
                                    {/* Header with Gradient */}
                                    <div className={`bg-gradient-to-r ${colorClasses[campaign.color]} p-4`}>
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                                                    <Icon className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-white text-sm">{campaign.name}</h3>
                                                    <p className="text-white/80 text-xs">{campaign.description}</p>
                                                </div>
                                            </div>
                                            <div className="text-2xl font-black text-white">{campaign.discount}</div>
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="p-4 bg-white">
                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            <div className="bg-slate-50 rounded-lg p-2.5">
                                                <p className="text-[10px] text-slate-500">{t('campaigns.period')}</p>
                                                <p className="text-xs font-semibold text-slate-800 font-mono" dir="ltr">
                                                    {campaign.startDate.slice(5)} → {campaign.endDate.slice(5)}
                                                </p>
                                            </div>
                                            <div className="bg-slate-50 rounded-lg p-2.5">
                                                <p className="text-[10px] text-slate-500">{t('campaigns.minPrice')}</p>
                                                <p className="text-xs font-semibold text-slate-800">{campaign.minPrice} {t('home.currency')}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${status.dot}`}></div>
                                                <span className={`text-xs font-medium ${status.text}`}>{status.label}</span>
                                                <span className="text-xs text-slate-400">• {campaign.products} {t('home.products')}</span>
                                            </div>

                                            {campaign.status !== 'ended' && (
                                                <Button
                                                    size="sm"
                                                    className={`h-8 text-xs ${campaign.joined
                                                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                                        }`}
                                                    disabled={campaign.joined}
                                                >
                                                    {campaign.joined ? (
                                                        <>
                                                            <CheckCircle size={14} className="ml-1" />
                                                            {t('campaigns.joined')}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Plus size={14} className="ml-1" />
                                                            {t('campaigns.joinNow')}
                                                        </>
                                                    )}
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Store Campaigns */}
            <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader className="pb-4 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-bold text-slate-800">{t('campaigns.yourOffers')}</CardTitle>
                            <CardDescription className="text-slate-500">{t('campaigns.yourOffersDescription')}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50/50">
                            <TableRow className="hover:bg-transparent border-slate-100">
                                <TableHead className="text-right h-11 text-xs font-semibold text-slate-600">{t('campaigns.offerName')}</TableHead>
                                <TableHead className="text-center h-11 text-xs font-semibold text-slate-600">{t('campaigns.offerType')}</TableHead>
                                <TableHead className="text-center h-11 text-xs font-semibold text-slate-600">{t('campaigns.discount')}</TableHead>
                                <TableHead className="text-center h-11 text-xs font-semibold text-slate-600">{t('campaigns.products')}</TableHead>
                                <TableHead className="text-center h-11 text-xs font-semibold text-slate-600">{t('campaigns.sales')}</TableHead>
                                <TableHead className="text-center h-11 text-xs font-semibold text-slate-600">{t('campaigns.revenue')}</TableHead>
                                <TableHead className="text-center h-11 text-xs font-semibold text-slate-600">{t('campaigns.status')}</TableHead>
                                <TableHead className="text-center h-11 text-xs font-semibold text-slate-600 w-[80px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {storeCampaigns.map((campaign) => {
                                const status = statusConfig[campaign.status];
                                const type = typeConfig[campaign.type];

                                return (
                                    <TableRow key={campaign.id} className="hover:bg-slate-50/50 border-slate-50">
                                        <TableCell className="font-semibold text-slate-800 text-sm py-4">{campaign.name}</TableCell>
                                        <TableCell className="text-center py-4">
                                            <Badge variant="outline" className={`${type.color} font-medium text-xs border`}>
                                                {/* Translate campaign type dynamically */}
                                                {campaign.type === 'price_discount' ? t('campaigns.priceDiscount') :
                                                    campaign.type === 'multi_piece' ? t('campaigns.quantityOffer') :
                                                        t('campaigns.groupDiscount')}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center py-4">
                                            <span className="font-bold text-emerald-600">{campaign.discount}</span>
                                        </TableCell>
                                        <TableCell className="text-center text-slate-600 py-4">{campaign.products}</TableCell>
                                        <TableCell className="text-center py-4">
                                            <span className="font-semibold text-slate-800">{campaign.sales}</span>
                                        </TableCell>
                                        <TableCell className="text-center py-4">
                                            <span className="font-bold text-slate-900">{campaign.revenue.toLocaleString('en-US')} {t('home.currency')}</span>
                                        </TableCell>
                                        <TableCell className="text-center py-4">
                                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${status.bg}`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></div>
                                                <span className={`text-xs font-medium ${status.text}`}>{status.label}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="flex items-center justify-center gap-1">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 text-blue-600 hover:bg-blue-50 rounded-lg"
                                                    onClick={() => {
                                                        setSelectedCampaign(campaign);
                                                        setShowReportModal(true);
                                                    }}
                                                    title="تقرير"
                                                >
                                                    <BarChart3 size={16} />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 text-amber-600 hover:bg-amber-50 rounded-lg"
                                                    title="تعديل"
                                                >
                                                    <Edit size={16} />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Create Campaign Side Menu (Sheet) */}
            <Sheet open={showModal} onOpenChange={setShowModal}>
                <SheetContent side="left" className="w-[400px] sm:w-[540px] overflow-y-auto px-0">
                    <SheetHeader className="px-3 pt-12 pb-6 border-b border-slate-100 bg-slate-50/30">
                        <SheetTitle className="text-xl font-bold text-slate-900 text-start">
                            {t('campaigns.createOfferTitle')}
                        </SheetTitle>
                    </SheetHeader>

                    <div className="py-6 px-6 space-y-6" dir="rtl">
                        <div className="space-y-2">
                            <Label>{t('campaigns.offerName')}</Label>
                            <Input placeholder={t('campaigns.offerName')} className="bg-white border-slate-200" />
                        </div>

                        <div className="space-y-2">
                            <Label>{t('campaigns.offerType')}</Label>
                            <Select>
                                <SelectTrigger className="bg-white border-slate-200">
                                    <SelectValue placeholder={t('campaigns.selectOfferType')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="price_discount">{t('campaigns.priceDiscount')}</SelectItem>
                                    <SelectItem value="group_discount">{t('campaigns.groupDiscount')}</SelectItem>
                                    <SelectItem value="multi_piece">{t('campaigns.quantityOffer')}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>{t('campaigns.discountPercentage')} (%)</Label>
                                <Input type="number" placeholder="15" className="bg-white border-slate-200" />
                            </div>
                            <div className="space-y-2">
                                <Label>{t('campaigns.products')}</Label>
                                <Select>
                                    <SelectTrigger className="bg-white border-slate-200">
                                        <SelectValue placeholder={t('campaigns.selectProducts')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">{t('campaigns.allProducts')}</SelectItem>
                                        <SelectItem value="phones">{t('campaigns.phones')}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>{t('campaigns.startDate')}</Label>
                                <Input type="date" className="bg-white border-slate-200" />
                            </div>
                            <div className="space-y-2">
                                <Label>{t('campaigns.endDate')}</Label>
                                <Input type="date" className="bg-white border-slate-200" />
                            </div>
                        </div>

                        <div className="flex gap-2 pt-4">
                            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white gap-2">
                                <Plus size={18} />
                                {t('campaigns.createTheOffer')}
                            </Button>
                            <Button variant="outline" onClick={() => setShowModal(false)} className="flex-1">{t('common.cancel')}</Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Campaign Report Modal */}
            <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
                <DialogContent className="sm:max-w-[700px] bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                            {t('campaigns.campaignReport')}: {selectedCampaign?.name}
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
                                        <p className="text-xs text-slate-500">{t('campaigns.resultingSales')}</p>
                                        <p className="text-xl font-bold text-emerald-700">{selectedCampaign.sales}</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-center gap-4">
                                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                                        <Users size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">{t('campaigns.visits')}</p>
                                        <p className="text-xl font-bold text-amber-700">{selectedCampaign.visits.toLocaleString('en-US')}</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 flex items-center gap-4">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                                        <TrendingUp size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">{t('campaigns.revenue')}</p>
                                        <p className="text-xl font-bold text-purple-700">{selectedCampaign.revenue.toLocaleString('en-US')} {t('home.currency')}</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                        <DollarSign size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">{t('campaigns.profitImpact')}</p>
                                        <p className="text-xl font-bold text-blue-700">+{selectedCampaign.profit.toLocaleString('en-US')} {t('home.currency')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Details Table */}
                            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                                <h4 className="font-bold text-slate-900 mb-4 text-sm">{t('campaigns.campaignDetails')}</h4>
                                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-500 mb-1">{t('campaigns.offerType')}</span>
                                        <span className="font-semibold text-slate-900">{selectedCampaign.typeLabel}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-500 mb-1">{t('campaigns.discountPercentage')}</span>
                                        <span className="font-bold text-emerald-600">{selectedCampaign.discount}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-500 mb-1">{t('campaigns.numberOfProducts')}</span>
                                        <span className="font-semibold text-slate-900">{selectedCampaign.products} {t('home.products')}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-500 mb-1">{t('campaigns.period')}</span>
                                        <span className="font-medium text-slate-700 text-xs font-mono">{selectedCampaign.startDate} - {selectedCampaign.endDate}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="secondary" onClick={() => setShowReportModal(false)}>{t('common.close')}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
