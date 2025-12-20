import { useState } from 'react';
import {
    Download,
    Edit2, Phone, Mail, MapPin, Calendar as CalendarIcon,
    CheckCircle, XCircle, ExternalLink,
    Instagram, MessageCircle,
    ShoppingBag,
    Wallet,
    CreditCard
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function SellerProfile() {
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
            completed: { class: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200", text: 'مكتمل' },
            pending: { class: "bg-amber-100 text-amber-700 hover:bg-amber-200", text: 'قيد الانتظار' },
            cancelled: { class: "bg-rose-100 text-rose-700 hover:bg-rose-200", text: 'ملغي' }
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
                <h1 className="text-2xl font-bold text-slate-900">المحفظة المالية</h1>
            </div>

            {/* Top Section - Wallet Card & Stats */}
            <div className="grid grid-cols-[380px_1fr] gap-6">
                {/* Wallet Card - Far Right */}
                <div className="relative">
                    <img
                        src={VisaCard}
                        alt="B2-SOUQ Visa Card"
                        className="w-full h-auto rounded-2xl object-cover bg-transparent"
                    />
                </div>

                {/* Stats Cards - Left Side - 2x2 Grid */}
                <div className="grid grid-cols-2 gap-4">

                    {/* Card 1: Withdrawable Balance */}
                    <Card className="border-slate-100 shadow-sm bg-white hover:bg-slate-50/50 transition-colors">
                        <CardContent className="p-6 flex items-center gap-4">
                            <img src={WalletIcon} alt="Wallet" className="w-12 h-12" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-slate-500 mb-1">الرصيد القابل للسحب</p>
                                <div className="text-2xl font-bold text-slate-900">
                                    156,000 <span className="text-xs font-medium text-slate-400">جنيه</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 2: Pending Profits */}
                    <Card className="border-slate-100 shadow-sm bg-white hover:bg-slate-50/50 transition-colors">
                        <CardContent className="p-6 flex items-center gap-4">
                            <img src={SalesIcon} alt="Sales" className="w-12 h-12" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-slate-500 mb-1">الأرباح المعلقة</p>
                                <div className="text-2xl font-bold text-slate-900">
                                    156,000 <span className="text-xs font-medium text-slate-400">جنيه</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 3: Total Sales */}
                    <Card className="border-slate-100 shadow-sm bg-white hover:bg-slate-50/50 transition-colors">
                        <CardContent className="p-6 flex items-center gap-4">
                            <img src={RevenueIcon} alt="Revenue" className="w-12 h-12" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-slate-500 mb-1">إجمالي المبيعات</p>
                                <div className="text-2xl font-bold text-slate-900">
                                    156,000 <span className="text-xs font-medium text-slate-400">جنيه</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 4: Transaction Count */}
                    <Card className="border-slate-100 shadow-sm bg-white hover:bg-slate-50/50 transition-colors">
                        <CardContent className="p-6 flex items-center gap-4">
                            <img src={TransactionIcon} alt="Transactions" className="w-12 h-12" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-slate-500 mb-1">عدد المعاملات</p>
                                <div className="text-2xl font-bold text-slate-900">
                                    156 <span className="text-xs font-medium text-slate-400">معاملة</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Transactions Table */}
            <Card className="border-slate-100 shadow-sm bg-white">
                <CardHeader className="pb-4 border-b border-slate-50">
                    <CardTitle className="text-lg font-bold text-slate-800">أحدث المعاملات</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50/50">
                            <TableRow className="hover:bg-transparent border-slate-100">
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">رقم المعاملة</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">التاريخ</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">المبلغ</TableHead>
                                <TableHead className="text-right h-10 text-xs font-semibold text-slate-600">الحالة</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((tx, index) => (
                                <TableRow key={index} className="hover:bg-slate-50">
                                    <TableCell className="font-mono text-sm font-semibold text-slate-700">{tx.id}</TableCell>
                                    <TableCell className="text-slate-600">{tx.date}</TableCell>
                                    <TableCell className="font-bold text-slate-800">{tx.amount.toLocaleString('en-US')} ج.م</TableCell>
                                    <TableCell>{getStatusBadge(tx.status)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Bottom Grid - 3 Columns */}
            <div className="grid grid-cols-3 gap-6">
                {/* Personal Information */}
                <Card className="border-slate-100 shadow-sm bg-white h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-50">
                        <CardTitle className="text-lg font-bold text-slate-800">بطاقة الهوية والتحقق (KYC)</CardTitle>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600">
                            <Edit2 size={16} />
                        </Button>
                    </CardHeader>
                    <CardContent className="p-6 flex flex-col gap-5">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-slate-400">الاسم الكامل</span>
                            <span className="text-sm font-semibold text-slate-800">{personalInfo.name}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-slate-400">البريد الإلكتروني</span>
                            <span className="text-sm font-medium text-slate-800">{personalInfo.email}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-slate-400">رقم الجوال</span>
                            <span className="text-sm font-medium text-slate-800 dir-ltr text-right">{personalInfo.phone}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-slate-400">رقم الهوية الوطنية</span>
                            <span className="text-sm font-medium text-slate-800">{personalInfo.nationalId}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-slate-400">تاريخ التسجيل</span>
                            <span className="text-sm font-medium text-slate-800">{personalInfo.registrationDate}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Business Information */}
                <Card className="border-slate-100 shadow-sm bg-white h-full">
                    <CardHeader className="pb-4 border-b border-slate-50">
                        <CardTitle className="text-lg font-bold text-slate-800">الأبعاد التجارية والقانونية</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 flex flex-col gap-4">
                        {businessDocs.map((doc, index) => (
                            <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between group hover:border-slate-200 transition-colors">
                                <div className="flex-1">
                                    <div className="text-xs text-slate-500 mb-1">{doc.title}</div>
                                    <div className="text-sm font-semibold text-slate-800 mb-0.5">{doc.number}</div>
                                    {doc.expiry && (
                                        <div className="text-[10px] text-slate-400">
                                            تنتهي بتاريخ {doc.expiry}
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
                        <CardTitle className="text-lg font-bold text-slate-800">العناوين والتواصل</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 flex flex-col gap-6">
                        {/* Phone Numbers */}
                        <div>
                            <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                <Phone size={14} className="text-slate-400" />
                                أرقام التواصل
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
                                البريد الإلكتروني
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
                                وسائل التواصل
                            </h4>
                            {contactInfo.social.map((social, index) => (
                                <div key={index} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                                    <div>
                                        <div className="text-xs text-slate-500">{social.platform}</div>
                                        <div className="text-sm font-medium text-slate-800">{social.handle}</div>
                                    </div>
                                    {social.active && (
                                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 font-normal text-[10px]">
                                            نشط
                                        </Badge>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Subscription Section */}
            <Card className="border-slate-100 shadow-sm bg-white">
                <CardHeader className="pb-2 border-b border-slate-50">
                    <CardTitle className="text-lg font-bold text-slate-800">الترقيات المتاحة</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm text-slate-500 mb-1">الباقة الحالية</div>
                            <div className="text-xl font-bold text-slate-900">{subscriptionInfo.plan}</div>
                            <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                <CalendarIcon size={12} />
                                تنتهي في {subscriptionInfo.expiryDate}
                            </div>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-100">
                            ترقية الباقة
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
