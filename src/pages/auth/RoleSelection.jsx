import { useNavigate, useLocation } from 'react-router-dom';
import { Store, ShieldCheck, ArrowRight, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Logo from '../../assets/image/logo2.svg';

export default function RoleSelection() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden" dir="rtl">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 0 C 50 100 80 100 100 0 Z" fill="currentColor" />
                </svg>
            </div>

            <div className="relative z-10 w-full max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <img src={Logo} alt="B2 SOUQ" className="h-12 mx-auto mb-6" />
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        اختر نوع حسابك
                    </h1>
                    <p className="text-slate-600 text-lg max-w-xl mx-auto">
                        مرحباً بك في B2 SOUQ. الرجاء اختيار لوحة التحكم المناسبة للمتابعة.
                    </p>
                </div>

                {/* Cards Container */}
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    {/* Merchant Card */}
                    <Card
                        className="group relative overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-600"
                        onClick={() => navigate('/login', { state: location.state })}
                    >
                        <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <CardHeader>
                            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Store size={32} />
                            </div>
                            <CardTitle className="text-2xl font-bold text-slate-900">
                                تاجر / بائع
                            </CardTitle>
                            <CardDescription className="text-base text-slate-500 mt-2">
                                لوحة تحكم التجار لإدارة المنتجات، الطلبات، والمخزون.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center text-sm text-slate-600">
                                    <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center ml-3 shrink-0">
                                        <TrendingUp size={14} />
                                    </div>
                                    تابع مبيعاتك وأرباحك
                                </li>
                                <li className="flex items-center text-sm text-slate-600">
                                    <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center ml-3 shrink-0">
                                        <Users size={14} />
                                    </div>
                                    تواصل مع عملائك بسهولة
                                </li>
                            </ul>

                            <Button className="w-full bg-slate-100 text-slate-900 hover:bg-blue-600 hover:text-white group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                دخول كتاجر
                                <ArrowRight className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Admin Card */}
                    <Card
                        className="group relative overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-600"
                        onClick={() => navigate('/admin/login', { state: location.state })}
                    >
                        <div className="absolute top-0 left-0 w-2 h-full bg-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <CardHeader>
                            <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <ShieldCheck size={32} />
                            </div>
                            <CardTitle className="text-2xl font-bold text-slate-900">
                                إدارة النظام
                            </CardTitle>
                            <CardDescription className="text-base text-slate-500 mt-2">
                                لوحة التحكم الخاصة بمشرفي ومسؤولي المنصة.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center text-sm text-slate-600">
                                    <div className="w-6 h-6 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center ml-3 shrink-0">
                                        <Users size={14} />
                                    </div>
                                    إدارة التجار والمستخدمين
                                </li>
                                <li className="flex items-center text-sm text-slate-600">
                                    <div className="w-6 h-6 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center ml-3 shrink-0">
                                        <ShieldCheck size={14} />
                                    </div>
                                    مراقبة العمليات والتقارير
                                </li>
                            </ul>

                            <Button className="w-full bg-slate-100 text-slate-900 hover:bg-purple-600 hover:text-white group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                دخول كمسؤول
                                <ArrowRight className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Footer */}
                <div className="mt-12 text-center text-sm text-slate-400">
                    &copy; 2025 B2 SOUQ. جميع الحقوق محفوظة.
                </div>
            </div>
        </div>
    );
}
