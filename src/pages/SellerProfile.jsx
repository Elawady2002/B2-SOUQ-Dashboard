import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
    Download,
    Edit2, Phone, Mail, MapPin, Calendar as CalendarIcon,
    CheckCircle, XCircle, ExternalLink,
    Instagram, MessageCircle,
    ShoppingBag,
    Wallet,
    CreditCard,
    ArrowUp,
    ArrowDown,
    Plus,
    Upload,
    Building2,
    Check
} from 'lucide-react';
import VisaCard from '../assets/image/card profile.png';
import WalletIcon from '../assets/icons/Frame-3.svg';
import SalesIcon from '../assets/icons/Frame-1.svg';
import RevenueIcon from '../assets/icons/Frame-2.svg';
import TransactionIcon from '../assets/icons/Frame.svg';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function SellerProfile() {
    const { t } = useLanguage();
    const [showAddBankSheet, setShowAddBankSheet] = useState(false);
    const [newBankAccount, setNewBankAccount] = useState({
        holderName: '',
        bankName: '',
        accountNumber: '',
        iban: '',
        swiftCode: '',
        phoneNumber: '',
        billingAddress: ''
    });
    // Mock data
    const walletData = {
        balance: 156000,
        totalSales: 156000,
        transactionCount: 156
    };

    const transactions = [
        { id: 'TX-990381', date: '2023-10-24', amount: 24145, status: 'completed' },
        { id: 'TX-990381', date: '2023-10-24', amount: 24145, status: 'pending' },
        { id: 'TX-990381', date: '2023-10-24', amount: 24145, status: 'cancelled' }
    ];

    const personalInfo = {
        name: 'عبدالله احمد العوضي محمد',
        email: 'members@example.com',
        phone: '+966545757',
        nationalId: '435-10331-90428',
        registrationDate: '2023-10-24',
        address: 'جدة، المملكة العربية السعودية'
    };

    const businessDocs = [
        {
            title: 'الضرائب والاستثمار والتأمينات',
            number: '1301240XXXXXX',
            expiry: '2023-10-24'
        },
        {
            title: 'الملكيات الفكرية والعلامات',
            number: 'CR1234567890',
            expiry: null
        },
        {
            title: 'الملكيات الشخص والتوصيل',
            number: 'LIC-2023-001',
            expiry: '2023-10-24'
        }
    ];

    const contactInfo = {
        phones: [
            { label: 'رقم الجوال', number: '+966545757', verified: true },
            { label: 'رقم آخر', number: '+966545757', verified: false }
        ],
        emails: [
            { label: 'البريد الإلكتروني', email: 'support@merchant-store.com', verified: true }
        ],
        social: [
            { platform: 'واتساب', handle: 'متاح', active: true },
            { platform: 'انستغرام', handle: '@merchant', active: false }
        ]
    };

    const subscriptionInfo = {
        plan: 'الباقة الأساسية',
        status: 'نشط',
        expiryDate: '2024-10-24',
        features: ['لوحة تحكم احترافية', 'تقارير مفصلة', 'دعم فني']
    };

    const getStatusBadge = (status) => {
        const styles = {
            completed: { class: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200", text: t('sellerProfile.completed') || 'Completed' },
            pending: { class: "bg-amber-100 text-amber-700 hover:bg-amber-200", text: t('sellerProfile.pendingStatus') || 'Pending' },
            cancelled: { class: "bg-rose-100 text-rose-700 hover:bg-rose-200", text: t('sellerProfile.cancelled') || 'Cancelled' }
        };
        const style = styles[status] || styles.pending;
        return (
            <Badge variant="secondary" className={`${style.class} font-normal`}>
                {style.text}
            </Badge>
        );
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">{t('sellerProfile.financialWallet')}</h1>
            </div>

            {/* Stats Cards - Full Width in One Row */}
            <div className="grid grid-cols-4 gap-4">

                {/* Card 1: Withdrawable Balance */}
                <Card className="border-slate-100 shadow-sm bg-white hover:bg-slate-50/50 transition-colors">
                    <CardContent className="p-6 flex items-center gap-4">
                        <img src={WalletIcon} alt="Wallet" className="w-12 h-12" />
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-500 mb-1">{t('sellerProfile.withdrawableBalance')}</p>
                            <div className="text-2xl font-bold text-slate-900">
                                156,000 <span className="text-xs font-medium text-slate-400">{t('home.currency')}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Card 2: Pending Profits */}
                <Card className="border-slate-100 shadow-sm bg-white hover:bg-slate-50/50 transition-colors">
                    <CardContent className="p-6 flex items-center gap-4">
                        <img src={SalesIcon} alt="Sales" className="w-12 h-12" />
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-500 mb-1">{t('sellerProfile.pendingProfits')}</p>
                            <div className="text-2xl font-bold text-slate-900">
                                156,000 <span className="text-xs font-medium text-slate-400">{t('home.currency')}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Card 3: Total Sales */}
                <Card className="border-slate-100 shadow-sm bg-white hover:bg-slate-50/50 transition-colors">
                    <CardContent className="p-6 flex items-center gap-4">
                        <img src={RevenueIcon} alt="Revenue" className="w-12 h-12" />
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-500 mb-1">{t('home.totalSales')}</p>
                            <div className="text-2xl font-bold text-slate-900">
                                156,000 <span className="text-xs font-medium text-slate-400">{t('home.currency')}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Card 4: Transaction Count */}
                <Card className="border-slate-100 shadow-sm bg-white hover:bg-slate-50/50 transition-colors">
                    <CardContent className="p-6 flex items-center gap-4">
                        <img src={TransactionIcon} alt="Transactions" className="w-12 h-12" />
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-500 mb-1">{t('sellerProfile.transactionCount')}</p>
                            <div className="text-2xl font-bold text-slate-900">
                                156 <span className="text-xs font-medium text-slate-400">{t('sellerProfile.transaction')}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Transactions Table */}
            <Card className="border-slate-100 shadow-sm bg-white overflow-hidden">
                <CardHeader className="pb-4 border-b border-slate-50">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-bold text-foreground">{t('wallet.transactions')}</CardTitle>
                        <Button variant="outline" size="sm" className="gap-2 h-9">
                            <Download size={16} />
                            {t('wallet.downloadStatement') || 'تنزيل كشف الحساب'}
                        </Button>
                    </div>
                </CardHeader>
                <div className="p-0">
                    <Table>
                        <TableHeader className="bg-muted/50 sticky top-0 z-10 backdrop-blur-xs">
                            <TableRow className="hover:bg-transparent border-slate-100">
                                <TableHead className="text-right font-medium text-muted-foreground">{t('wallet.transactionType') || 'نوع المعاملة'}</TableHead>
                                <TableHead className="text-right font-medium text-muted-foreground">{t('wallet.amount')}</TableHead>
                                <TableHead className="text-right font-medium text-muted-foreground">{t('returns.date')}</TableHead>
                                <TableHead className="text-right font-medium text-muted-foreground">{t('wallet.bank')}</TableHead>
                                <TableHead className="text-right font-medium text-muted-foreground">{t('wallet.account')}</TableHead>
                                <TableHead className="text-right font-medium text-muted-foreground">{t('products.status')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* Deposit Transaction */}
                            <TableRow className="hover:bg-muted/50 transition-colors">
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                                            <ArrowDown size={16} className="text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">{t('wallet.deposit')}</p>
                                            <p className="text-xs text-muted-foreground">ORD-2024-78432</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="font-bold text-emerald-600">+ 45,000 {t('home.currency')}</TableCell>
                                <TableCell className="text-sm text-muted-foreground">2024-12-18</TableCell>
                                <TableCell className="text-sm text-muted-foreground">wallet.bankName</TableCell>
                                <TableCell className="font-mono text-sm text-muted-foreground">•••• 4521</TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-normal">
                                        {t('wallet.transferred') || 'تم التحويل'}
                                    </Badge>
                                </TableCell>
                            </TableRow>

                            {/* Withdrawal Transaction */}
                            <TableRow className="hover:bg-muted/50 transition-colors">
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
                                            <ArrowUp size={16} className="text-rose-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">{t('wallet.withdrawal')}</p>
                                            <p className="text-xs text-muted-foreground">{t('wallet.transactionDesc_withdrawal')}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="font-bold text-rose-600">- 25,000 {t('home.currency')}</TableCell>
                                <TableCell className="text-sm text-muted-foreground">2024-12-17</TableCell>
                                <TableCell className="text-sm text-muted-foreground">wallet.bankName</TableCell>
                                <TableCell className="font-mono text-sm text-muted-foreground">•••• 4521</TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-normal">
                                        {t('wallet.transferred') || 'تم التحويل'}
                                    </Badge>
                                </TableCell>
                            </TableRow>

                            {/* Commission Transaction */}
                            <TableRow className="hover:bg-muted/50 transition-colors">
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                                            <CreditCard size={16} className="text-amber-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">{t('wallet.commission')}</p>
                                            <p className="text-xs text-muted-foreground">{t('wallet.transactionDesc_commission')} - 3%</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="font-bold text-rose-600">- 1,350 {t('home.currency')}</TableCell>
                                <TableCell className="text-sm text-muted-foreground">2024-12-17</TableCell>
                                <TableCell className="text-sm text-muted-foreground">wallet.bankName</TableCell>
                                <TableCell className="font-mono text-sm text-muted-foreground">•••• 4521</TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-normal">
                                        {t('wallet.transferred') || 'تم التحويل'}
                                    </Badge>
                                </TableCell>
                            </TableRow>

                            {/* Another Deposit */}
                            <TableRow className="hover:bg-muted/50 transition-colors">
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                                            <ArrowDown size={16} className="text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">{t('wallet.deposit')}</p>
                                            <p className="text-xs text-muted-foreground">ORD-2024-78431</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="font-bold text-emerald-600">+ 17,450 {t('home.currency')}</TableCell>
                                <TableCell className="text-sm text-slate-600">2024-12-16</TableCell>
                                <TableCell className="text-sm text-slate-600">wallet.bankName</TableCell>
                                <TableCell className="font-mono text-sm text-slate-600">•••• 4521</TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-normal">
                                        {t('wallet.transferred') || 'تم التحويل'}
                                    </Badge>
                                </TableCell>
                            </TableRow>

                            {/* Pending Withdrawal */}
                            <TableRow className="hover:bg-slate-50/50">
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
                                            <ArrowUp size={16} className="text-rose-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">{t('wallet.withdrawal')}</p>
                                            <p className="text-xs text-slate-500">{t('wallet.transactionDesc_withdrawal')}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="font-bold text-rose-600">- 15,000 {t('home.currency')}</TableCell>
                                <TableCell className="text-sm text-slate-600">2024-12-15</TableCell>
                                <TableCell className="text-sm text-slate-600">wallet.bankName</TableCell>
                                <TableCell className="font-mono text-sm text-slate-600">•••• 4521</TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="bg-amber-50 text-amber-700 hover:bg-amber-100 font-normal">
                                        {t('wallet.processing') || 'قيد المعالجة'}
                                    </Badge>
                                </TableCell>
                            </TableRow>

                            {/* Refund */}
                            <TableRow className="hover:bg-slate-50/50">
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                            <ArrowDown size={16} className="text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">{t('wallet.refund')}</p>
                                            <p className="text-xs text-slate-500">{t('wallet.transactionDesc_refund')}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="font-bold text-emerald-600">+ 8,500 {t('home.currency')}</TableCell>
                                <TableCell className="text-sm text-slate-600">2024-12-14</TableCell>
                                <TableCell className="text-sm text-slate-600">wallet.bankName</TableCell>
                                <TableCell className="font-mono text-sm text-slate-600">•••• 4521</TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-normal">
                                        {t('wallet.transferred') || 'تم التحويل'}
                                    </Badge>
                                </TableCell>
                            </TableRow>

                            {/* Ad Payment */}
                            <TableRow className="hover:bg-slate-50/50">
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                                            <CreditCard size={16} className="text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">{t('wallet.adPayment')}</p>
                                            <p className="text-xs text-slate-500">{t('wallet.transactionDesc_adPayment')} - Galaxy S24</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="font-bold text-rose-600">- 5,000 {t('home.currency')}</TableCell>
                                <TableCell className="text-sm text-slate-600">2024-12-10</TableCell>
                                <TableCell className="text-sm text-slate-600">wallet.bankName</TableCell>
                                <TableCell className="font-mono text-sm text-slate-600">•••• 4521</TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-normal">
                                        {t('wallet.transferred') || 'تم التحويل'}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </Card>

            {/* Bank Accounts Section */}
            <Card className="border-slate-100 shadow-sm bg-white overflow-hidden">
                <CardHeader className="pb-4 border-b border-slate-50">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-bold text-slate-900">الحسابات البنكية المرتبطة</CardTitle>
                            <CardDescription className="text-sm text-slate-500 mt-1">إدارة حسابات السحب البنكية</CardDescription>
                        </div>
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 gap-2"
                            onClick={() => setShowAddBankSheet(true)}
                        >
                            <Plus size={18} />
                            إضافة حساب جديد
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid grid-cols-3 gap-6">
                        {/* Bank Card 1 - Blue Professional */}
                        <div className="relative w-full max-w-[280px] aspect-[1.586/1] rounded-2xl overflow-hidden bg-gradient-to-br from-[#0066FF] to-[#0052CC] p-5 cursor-pointer hover:scale-105 transition-transform shadow-xl">
                            {/* Diagonal Lines Pattern Background */}
                            <div className="absolute inset-0 opacity-[0.08]">
                                <svg className="w-full h-full" viewBox="0 0 400 250" preserveAspectRatio="none">
                                    <defs>
                                        <pattern id="diagonalLines1" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(45)">
                                            <line x1="0" y1="0" x2="0" y2="20" stroke="white" strokeWidth="15" />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#diagonalLines1)" />
                                </svg>
                            </div>

                            <div className="relative h-full flex flex-col justify-between text-white">
                                {/* Top Section - Logo & Contactless */}
                                <div className="flex items-start justify-between">
                                    <div className="text-white font-black text-xl tracking-tight">
                                        B2<span className="font-light">SOUQ</span>
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <div className="flex gap-0.5">
                                            <div className="w-3 h-3 rounded-full border-2 border-white/80"></div>
                                            <div className="w-3 h-3 rounded-full border-2 border-white/80 -ml-1.5"></div>
                                        </div>
                                        <div className="flex gap-0.5 -mt-1.5">
                                            <div className="w-3 h-3 rounded-full border-2 border-white/80"></div>
                                            <div className="w-3 h-3 rounded-full border-2 border-white/80 -ml-1.5"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Middle Section - Bank Name Badge */}
                                <div className="flex items-center justify-between">
                                    <Badge className="bg-emerald-400/90 hover:bg-emerald-500 text-white border-0 text-[9px] px-2 py-0.5 font-medium">
                                        <CheckCircle size={9} className="ml-0.5" />
                                        موثق
                                    </Badge>
                                    <div className="text-white/90 text-[10px] font-medium">البنك الأهلي السعودي</div>
                                </div>

                                {/* Bottom Section - Card Details */}
                                <div>
                                    <div className="text-white/90 text-[10px] font-light mb-1 uppercase tracking-wide">عبدالله احمد العوضي</div>
                                    <div className="flex items-end justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="text-white font-mono text-base tracking-wider">•••• 4521</div>
                                            <div className="text-white/70 text-[10px] font-light">08/27</div>
                                        </div>
                                        <div className="bg-white px-2 py-1 rounded text-[#0066FF] font-black text-xs">
                                            VISA
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bank Card 2 - Purple Professional */}
                        <div className="relative w-full max-w-[280px] aspect-[1.586/1] rounded-2xl overflow-hidden bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] p-5 cursor-pointer hover:scale-105 transition-transform shadow-xl">
                            {/* Diagonal Lines Pattern Background */}
                            <div className="absolute inset-0 opacity-[0.08]">
                                <svg className="w-full h-full" viewBox="0 0 400 250" preserveAspectRatio="none">
                                    <defs>
                                        <pattern id="diagonalLines2" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(45)">
                                            <line x1="0" y1="0" x2="0" y2="20" stroke="white" strokeWidth="15" />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#diagonalLines2)" />
                                </svg>
                            </div>

                            <div className="relative h-full flex flex-col justify-between text-white">
                                {/* Top Section - Logo & Contactless */}
                                <div className="flex items-start justify-between">
                                    <div className="text-white font-black text-xl tracking-tight">
                                        B2<span className="font-light">SOUQ</span>
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <div className="flex gap-0.5">
                                            <div className="w-3 h-3 rounded-full border-2 border-white/80"></div>
                                            <div className="w-3 h-3 rounded-full border-2 border-white/80 -ml-1.5"></div>
                                        </div>
                                        <div className="flex gap-0.5 -mt-1.5">
                                            <div className="w-3 h-3 rounded-full border-2 border-white/80"></div>
                                            <div className="w-3 h-3 rounded-full border-2 border-white/80 -ml-1.5"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Middle Section - Bank Name Badge */}
                                <div className="flex items-center justify-between">
                                    <Badge className="bg-emerald-400/90 hover:bg-emerald-500 text-white border-0 text-[9px] px-2 py-0.5 font-medium">
                                        <CheckCircle size={9} className="ml-0.5" />
                                        موثق
                                    </Badge>
                                    <div className="text-white/90 text-[10px] font-medium">مصرف الراجحي</div>
                                </div>

                                {/* Bottom Section - Card Details */}
                                <div>
                                    <div className="text-white/90 text-[10px] font-light mb-1 uppercase tracking-wide">عبدالله احمد العوضي</div>
                                    <div className="flex items-end justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="text-white font-mono text-base tracking-wider">•••• 7832</div>
                                            <div className="text-white/70 text-[10px] font-light">05/26</div>
                                        </div>
                                        <div className="bg-white px-2 py-1 rounded text-[#8B5CF6] font-black text-xs">
                                            VISA
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Add New Card */}
                        <button
                            onClick={() => setShowAddBankSheet(true)}
                            className="w-full aspect-[1.6/1] rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-blue-400 transition-all flex flex-col items-center justify-center gap-3 group"
                        >
                            <div className="w-14 h-14 rounded-full bg-slate-200 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                                <Plus size={28} className="text-slate-500 group-hover:text-blue-600 transition-colors" />
                            </div>
                            <div>
                                <div className="font-semibold text-slate-700 group-hover:text-blue-600 transition-colors text-sm">إضافة حساب بنكي</div>
                                <div className="text-xs text-slate-400 mt-0.5">لعمليات السحب</div>
                            </div>
                        </button>
                    </div>
                </CardContent>
            </Card>

            {/* Bottom Grid - 3 Columns */}
            <div className="grid grid-cols-3 gap-6">
                {/* Personal Information */}
                <Card className="border-slate-100 shadow-sm bg-white h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-50">
                        <CardTitle className="text-lg font-bold text-slate-800">{t('sellerProfile.kycVerification')}</CardTitle>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600">
                            <Edit2 size={16} />
                        </Button>
                    </CardHeader>
                    <CardContent className="p-6 flex flex-col gap-5">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-slate-400">{t('sellerProfile.fullName')}</span>
                            <span className="text-sm font-semibold text-slate-800">{personalInfo.name}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-slate-400">{t('employees.email')}</span>
                            <span className="text-sm font-medium text-slate-800">{personalInfo.email}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-slate-400">{t('sellerProfile.mobileNumber')}</span>
                            <span className="text-sm font-medium text-slate-800 dir-ltr text-right">{personalInfo.phone}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-slate-400">{t('sellerProfile.nationalId')}</span>
                            <span className="text-sm font-medium text-slate-800">{personalInfo.nationalId}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-slate-400">{t('sellerProfile.registrationDate')}</span>
                            <span className="text-sm font-medium text-slate-800">{personalInfo.registrationDate}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Business Information */}
                <Card className="border-slate-100 shadow-sm bg-white h-full">
                    <CardHeader className="pb-4 border-b border-slate-50">
                        <CardTitle className="text-lg font-bold text-slate-800">{t('sellerProfile.commercialLegal')}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 flex flex-col gap-4">
                        {businessDocs.map((doc, index) => (
                            <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between group hover:border-slate-200 transition-colors">
                                <div className="flex-1">
                                    <div className="text-xs text-slate-500 mb-1">{doc.title}</div>
                                    <div className="text-sm font-semibold text-slate-800 mb-0.5">{doc.number}</div>
                                    {doc.expiry && (
                                        <div className="text-[10px] text-slate-400">
                                            {t('sellerProfile.expiresOn')} {doc.expiry}
                                        </div>
                                    )}
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                                    <Download size={16} />
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="border-slate-100 shadow-sm bg-white h-full">
                    <CardHeader className="pb-4 border-b border-slate-50">
                        <CardTitle className="text-lg font-bold text-slate-800">{t('sellerProfile.addressesContact')}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 flex flex-col gap-6">
                        {/* Phone Numbers */}
                        <div>
                            <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                <Phone size={14} className="text-slate-400" />
                                {t('sellerProfile.contactNumbers')}
                            </h4>
                            <div className="flex flex-col gap-3">
                                {contactInfo.phones.map((phone, index) => (
                                    <div key={index} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                                        <div>
                                            <div className="text-xs text-slate-500">{phone.label}</div>
                                            <div className="text-sm font-medium text-slate-800 dir-ltr text-right">{phone.number}</div>
                                        </div>
                                        {phone.verified && (
                                            <CheckCircle size={16} className="text-emerald-500" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Separator className="bg-slate-100" />

                        {/* Email */}
                        <div>
                            <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                <Mail size={14} className="text-slate-400" />
                                {t('employees.email')}
                            </h4>
                            {contactInfo.emails.map((email, index) => (
                                <div key={index} className="flex items-center justify-between py-2">
                                    <div>
                                        <div className="text-xs text-slate-500">{email.label}</div>
                                        <div className="text-sm font-medium text-slate-800">{email.email}</div>
                                    </div>
                                    {email.verified && (
                                        <CheckCircle size={16} className="text-emerald-500" />
                                    )}
                                </div>
                            ))}
                        </div>

                        <Separator className="bg-slate-100" />

                        {/* Social Media */}
                        <div>
                            <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                <MessageCircle size={14} className="text-slate-400" />
                                {t('sellerProfile.socialMedia')}
                            </h4>
                            {contactInfo.social.map((social, index) => (
                                <div key={index} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                                    <div>
                                        <div className="text-xs text-slate-500">{social.platform}</div>
                                        <div className="text-sm font-medium text-slate-800">{social.handle}</div>
                                    </div>
                                    {social.active && (
                                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 font-normal text-[10px]">
                                            {t('employees.active')}
                                        </Badge>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Add Bank Account Sheet */}
            <Sheet open={showAddBankSheet} onOpenChange={setShowAddBankSheet}>
                <SheetContent side="left" className="w-[400px] sm:w-[540px] p-0 flex flex-col overflow-hidden">
                    <SheetHeader className="px-6 pt-8 pb-4 border-b bg-gradient-to-br from-blue-50 to-white">
                        <SheetTitle className="text-xl font-bold text-slate-900">إضافة حساب بنكي</SheetTitle>
                        <SheetDescription className="text-sm">أضف حساباً بنكياً جديداً لعمليات السحب</SheetDescription>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto px-6 py-6">
                        <div className="space-y-4">
                            {/* Account Holder Name */}
                            <div>
                                <Label className="text-sm font-medium text-slate-700">اسم صاحب الحساب *</Label>
                                <Input
                                    value={newBankAccount.holderName}
                                    onChange={(e) => setNewBankAccount({ ...newBankAccount, holderName: e.target.value })}
                                    placeholder="الاسم الكامل كما يظهر في البنك"
                                    className="mt-1.5 h-11"
                                />
                            </div>

                            {/* Bank Name */}
                            <div>
                                <Label className="text-sm font-medium text-slate-700">اسم البنك *</Label>
                                <Select
                                    value={newBankAccount.bankName}
                                    onValueChange={(value) => setNewBankAccount({ ...newBankAccount, bankName: value })}
                                >
                                    <SelectTrigger className="mt-1.5 h-11">
                                        <SelectValue placeholder="اختر البنك" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="alahli">البنك الأهلي السعودي</SelectItem>
                                        <SelectItem value="alrajhi">مصرف الراجحي</SelectItem>
                                        <SelectItem value="riyad">بنك الرياض</SelectItem>
                                        <SelectItem value="sab">البنك السعودي البريطاني SABB</SelectItem>
                                        <SelectItem value="alinma">بنك الإنماء</SelectItem>
                                        <SelectItem value="aljazira">بنك الجزيرة</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Account Number */}
                            <div>
                                <Label className="text-sm font-medium text-slate-700">رقم الحساب *</Label>
                                <Input
                                    type="tel"
                                    value={newBankAccount.accountNumber}
                                    onChange={(e) => setNewBankAccount({ ...newBankAccount, accountNumber: e.target.value })}
                                    placeholder="0000000000"
                                    className="mt-1.5 h-11 font-mono"
                                    maxLength="20"
                                />
                            </div>

                            {/* IBAN */}
                            <div>
                                <Label className="text-sm font-medium text-slate-700">رقم الآيبان (IBAN) *</Label>
                                <Input
                                    type="text"
                                    value={newBankAccount.iban}
                                    onChange={(e) => setNewBankAccount({ ...newBankAccount, iban: e.target.value.toUpperCase() })}
                                    placeholder="SA00 0000 0000 0000 0000 0000"
                                    className="mt-1.5 h-11 font-mono"
                                    maxLength="32"
                                />
                                <p className="text-xs text-slate-400 mt-1">ابدأ بـ SA ثم الأرقام</p>
                            </div>

                            {/* SWIFT/BIC Code */}
                            <div>
                                <Label className="text-sm font-medium text-slate-700">كود SWIFT/BIC *</Label>
                                <Input
                                    type="text"
                                    value={newBankAccount.swiftCode}
                                    onChange={(e) => setNewBankAccount({ ...newBankAccount, swiftCode: e.target.value.toUpperCase() })}
                                    placeholder="RJHISARI"
                                    className="mt-1.5 h-11 font-mono"
                                    maxLength="11"
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <Label className="text-sm font-medium text-slate-700">رقم الجوال المرتبط بالحساب *</Label>
                                <Input
                                    type="tel"
                                    value={newBankAccount.phoneNumber}
                                    onChange={(e) => setNewBankAccount({ ...newBankAccount, phoneNumber: e.target.value })}
                                    placeholder="+966 50 000 0000"
                                    className="mt-1.5 h-11"
                                    dir="ltr"
                                />
                            </div>

                            {/* Billing Address */}
                            <div>
                                <Label className="text-sm font-medium text-slate-700">عنوان الفواتير (اختياري)</Label>
                                <Textarea
                                    value={newBankAccount.billingAddress}
                                    onChange={(e) => setNewBankAccount({ ...newBankAccount, billingAddress: e.target.value })}
                                    placeholder="أدخل العنوان الموجود في كشف الحساب البنكي"
                                    className="mt-1.5 min-h-[80px] resize-none"
                                />
                            </div>

                            {/* Document Upload */}
                            <div>
                                <Label className="text-sm font-medium text-slate-700">كشف حساب بنكي (آخر 3 أشهر) *</Label>
                                <div className="mt-1.5 border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 cursor-pointer transition">
                                    <Upload className="mx-auto text-slate-400 mb-3" size={36} />
                                    <p className="text-sm text-slate-600 font-medium mb-1">اسحب الملف هنا أو انقر للاختيار</p>
                                    <p className="text-xs text-slate-400">PDF, JPG, PNG حتى 10MB</p>
                                    <p className="text-xs text-amber-600 mt-2">تأكد من ظهور الاسم والعنوان للتحقق</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setShowAddBankSheet(false)}
                        >
                            إلغاء
                        </Button>
                        <Button
                            className="flex-1 bg-blue-600 hover:bg-blue-700 gap-2"
                            disabled={
                                !newBankAccount.holderName ||
                                !newBankAccount.bankName ||
                                !newBankAccount.accountNumber ||
                                !newBankAccount.iban ||
                                !newBankAccount.swiftCode ||
                                !newBankAccount.phoneNumber
                            }
                        >
                            <Check size={18} />
                            إضافة الحساب
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
