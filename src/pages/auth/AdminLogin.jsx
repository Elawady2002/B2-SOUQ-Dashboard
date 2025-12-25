import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Logo from '../../assets/image/logo2.svg'; // Use generic logo or specific admin logo if available

export default function AdminLogin() {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        // Set Admin Auth Flag
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'admin'); // Important for distinguishing roles

        // Redirect to intended page or admin dashboard
        const from = location.state?.from || '/admin/dashboard';

        navigate(from);
    };

    return (
        <div className="min-h-screen flex" dir="rtl">
            {/* Left Side - Admin Theme (Purple/Dark) */}
            <div className="hidden lg:flex flex-1 bg-slate-900 p-12 flex-col justify-center items-center text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: 'rgb(37, 99, 235)', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: 'rgb(30, 64, 175)', stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grad1)" opacity="0.2" />
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="url(#grad1)" />
                    </svg>
                </div>

                <div className="relative z-10 max-w-xl w-full text-center">
                    <div className="mb-8 flex flex-col items-center">
                        <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-blue-900/50">
                            <ShieldCheck size={48} className="text-white" />
                        </div>
                        <h1 className="text-4xl font-bold mb-3 leading-tight text-white">إدارة نظام B2-SOUQ</h1>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            لوحة التحكم المركزية للمسؤولين.
                            <br />
                            إدارة شاملة للتجار، الطلبات، والعمليات.
                        </p>
                    </div>

                    {/* Stats Mockup or decorative element */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mt-8">
                        <div className="flex justify-between items-center text-sm border-b border-white/10 pb-4 mb-4">
                            <span className="text-slate-300">حالة النظام</span>
                            <span className="text-green-400 font-semibold flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                يعمل بكفاءة
                            </span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="text-2xl font-bold text-white">99.9%</div>
                                <div className="text-xs text-slate-400 mt-1">Uptime</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">24/7</div>
                                <div className="text-xs text-slate-400 mt-1">Monitoring</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">Secure</div>
                                <div className="text-xs text-slate-400 mt-1">Encrypted</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 bg-white flex items-center justify-center p-8 lg:p-12">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8 lg:hidden">
                        <img src={Logo} alt="Logo" className="h-10 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-slate-900">تسجيل دخول المسؤول</h2>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                البريد الإلكتروني الإداري
                            </label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="admin@b2-souq.com"
                                className="h-12 border-slate-200 focus:border-blue-600 focus:ring-blue-100"
                                dir="ltr"
                                required
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                    كلمة المرور
                                </label>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                    className="h-12 pl-10 border-slate-200 focus:border-blue-600 focus:ring-blue-100"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="remember"
                                    checked={formData.rememberMe}
                                    onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked })}
                                    className="border-slate-300 data-[state=checked]:bg-blue-600 text-white"
                                />
                                <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer">
                                    تذكرني
                                </label>
                            </div>
                            <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                نسيت كلمة المرور؟
                            </a>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all"
                        >
                            دخول للوحة التحكم
                        </Button>

                        <div className="text-center mt-6">
                            <button
                                type="button"
                                onClick={() => navigate('/role-select')}
                                className="text-slate-500 hover:text-slate-700 text-sm flex items-center justify-center gap-1 mx-auto"
                            >
                                <ArrowRight size={14} className="rotate-180" />
                                العودة لاختيار الدور
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

