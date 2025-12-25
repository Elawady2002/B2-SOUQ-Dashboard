import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Logo from '../../assets/image/logo2.svg';
import Logo3 from '../../assets/image/logo3.svg';

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        agreeToTerms: false
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'merchant');

        // Redirect to intended page or home
        const from = location.state?.from || '/';

        navigate(from);
    };

    const handleSocialLogin = (provider) => {
        console.log(`Login with ${provider}`);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'merchant');

        // Redirect to intended page or home
        const from = location.state?.from || '/';

        navigate(from);
    };

    return (
        <div className="min-h-screen flex" dir="rtl">
            {/* Left Side - Dashboard Preview with Brand Blue */}
            <div className="hidden lg:flex flex-1 bg-blue-600 p-12 flex-col justify-center items-center text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 400 400">
                        <defs>
                            <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#gridPattern)" />
                    </svg>
                </div>

                <div className="relative z-10 max-w-xl w-full">
                    {/* Hero Text replaced with Logo & Content */}
                    <div className="mb-8 flex flex-col items-center text-center">
                        <img src={Logo3} alt="B2 SOUQ" className="h-10 mb-6" />
                        <h1 className="text-4xl font-bold mb-3 leading-tight text-white">انضم إلى منصة B2-SOUQ</h1>
                        <p className="text-white/90 text-lg leading-relaxed">
                            ابدأ رحلتك في التجارة الإلكترونية اليوم.
                            <br />
                            سجل الآن واحصل على لوحة تحكم احترافية.
                        </p>
                    </div>

                    {/* Dashboard Mockup */}
                    <div className="bg-white rounded-2xl p-6 shadow-2xl mb-8">
                        <img
                            src={new URL('../../assets/image/dashboard-mockup.png', import.meta.url).href}
                            alt="معاينة لوحة التحكم"
                            className="w-full h-auto rounded-lg"
                        />
                    </div>

                    {/* Partner Logos */}
                    <div className="flex items-center justify-center gap-6 opacity-70 flex-wrap text-white">
                        <span className="text-sm font-medium">Stripe</span>
                        <span className="text-sm font-medium">Spotify</span>
                        <span className="text-sm font-medium">Google</span>
                        <span className="text-sm font-medium">Booking.com</span>
                        <span className="text-sm font-medium">WeChat</span>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 bg-white flex items-center justify-center p-8 lg:p-12">
                <div className="w-full max-w-md">






                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
                                الاسم
                            </label>
                            <Input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="عبدالله أحمد"
                                className="h-11"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                                البريد الإلكتروني
                            </label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="example@company.com"
                                className="h-11"
                                dir="ltr"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                    كلمة المرور
                                </label>
                                <button
                                    type="button"
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                    onClick={() => console.log('Forgot password')}
                                >
                                    نسيت كلمة المرور؟
                                </button>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="8 أحرف على الأقل"
                                    className="h-11 pl-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-start gap-2 py-2">
                            <Checkbox
                                id="terms"
                                checked={formData.agreeToTerms}
                                onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked })}
                                className="mt-0.5 border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                            />
                            <label htmlFor="terms" className="text-sm text-slate-600 cursor-pointer leading-tight">
                                أوافق على{' '}
                                <a href="/terms" className="text-blue-600 hover:underline font-medium">الشروط والخصوصية</a>
                            </label>
                        </div>

                        {/* Login Button */}
                        <Button
                            type="submit"
                            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                        >
                            تسجيل الدخول
                        </Button>

                        {/* Sign Up Link */}
                        <div className="text-center pt-2">
                            <p className="text-sm text-slate-600">
                                لديك حساب؟{' '}
                                <button
                                    type="button"
                                    onClick={() => navigate('/register')}
                                    className="text-blue-600 hover:underline font-medium"
                                >
                                    سجل الآن
                                </button>
                            </p>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="mt-12 text-center">
                        <p className="text-xs text-slate-400">جميع الحقوق محفوظة 2022</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
