import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Logo from '../../assets/image/logo2.svg';

export default function Login() {
    const navigate = useNavigate();
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
        navigate('/');
    };

    const handleSocialLogin = (provider) => {
        console.log(`Login with ${provider}`);
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/');
    };

    return (
        <div className="min-h-screen flex" dir="rtl">
            {/* Left Side - Dashboard Preview with Blue Gradient */}
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#5B5FED] via-[#6366F1] to-[#7C3AED] p-12 flex-col justify-center items-center text-white relative overflow-hidden">
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
                    {/* Hero Text */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-3 leading-tight">أبسط طريقة لإدارة فريق العمل</h1>
                        <p className="text-white/80 text-base">أدخل بياناتك للوصول إلى حسابك</p>
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
                    <div className="flex items-center justify-center gap-6 opacity-70 flex-wrap">
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
                    {/* Logo positioned on left (in RTL = right visually) */}
                    <div className="mb-8 flex justify-start">
                        <img src={Logo} alt="B2 SOUQ" className="h-12" />
                    </div>

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">ابدأ الآن</h1>
                        <p className="text-sm text-slate-500">أدخل بياناتك للوصول إلى حسابك</p>
                    </div>

                    {/* Google Login Button - Full Width */}
                    <div className="mb-6">
                        <button
                            type="button"
                            onClick={() => handleSocialLogin('google')}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span>تسجيل الدخول بواسطة Google</span>
                        </button>
                    </div>

                    {/* OR Divider */}
                    <div className="relative flex items-center mb-6">
                        <div className="flex-1 border-t border-slate-200"></div>
                        <span className="px-4 text-sm text-slate-400">أو</span>
                        <div className="flex-1 border-t border-slate-200"></div>
                    </div>

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
                                className="mt-0.5"
                            />
                            <label htmlFor="terms" className="text-sm text-slate-600 cursor-pointer leading-tight">
                                أوافق على{' '}
                                <a href="/terms" className="text-blue-600 hover:underline">الشروط والخصوصية</a>
                            </label>
                        </div>

                        {/* Login Button */}
                        <Button
                            type="submit"
                            className="w-full h-11 bg-[#5B5FED] hover:bg-[#4F46E5] text-white font-medium"
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

const navigate = useNavigate();
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
    navigate('/');
};

const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/');
};

return (
    <div className="min-h-screen flex">
        {/* Left Side - Dashboard Preview with Blue Gradient */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#5B5FED] via-[#6366F1] to-[#7C3AED] p-12 flex-col justify-center items-center text-white relative overflow-hidden">
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
                {/* Hero Text */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-3 leading-tight">The simplest way to manage your workforce</h1>
                    <p className="text-white/80 text-base">Enter your credentials to access your account</p>
                </div>

                {/* Dashboard Mockup */}
                <div className="bg-white rounded-2xl p-6 shadow-2xl mb-8">
                    <img
                        src={new URL('../../assets/image/dashboard-mockup.png', import.meta.url).href}
                        alt="Dashboard Preview"
                        className="w-full h-auto rounded-lg"
                    />
                </div>

                {/* Partner Logos */}
                <div className="flex items-center justify-center gap-6 opacity-70 flex-wrap">
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
                {/* Logo */}
                <div className="mb-8">
                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6">
                        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                            <path d="M2 17L12 22L22 17" fill="white" />
                        </svg>
                    </div>
                </div>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Get Started Now</h1>
                    <p className="text-sm text-slate-500">Enter your credentials to access your account</p>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <button
                        type="button"
                        onClick={() => handleSocialLogin('apple')}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                        </svg>
                        <span>Log in with Apple</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSocialLogin('google')}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span>Log in with Google</span>
                    </button>
                </div>

                {/* OR Divider */}
                <div className="relative flex items-center mb-6">
                    <div className="flex-1 border-t border-slate-200"></div>
                    <span className="px-4 text-sm text-slate-400">or</span>
                    <div className="flex-1 border-t border-slate-200"></div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
                            Name
                        </label>
                        <Input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Rafiqul Rahman"
                            className="h-11"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                            Email address
                        </label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="rafiqul@company.com"
                            className="h-11"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                Password
                            </label>
                            <button
                                type="button"
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                onClick={() => console.log('Forgot password')}
                            >
                                ?Forget password
                            </button>
                        </div>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="min 8 chars"
                                className="h-11 pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
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
                            className="mt-0.5"
                        />
                        <label htmlFor="terms" className="text-sm text-slate-600 cursor-pointer leading-tight">
                            I agree to the{' '}
                            <a href="/terms" className="text-blue-600 hover:underline">Terms & Privacy</a>
                        </label>
                    </div>

                    {/* Login Button */}
                    <Button
                        type="submit"
                        className="w-full h-11 bg-[#5B5FED] hover:bg-[#4F46E5] text-white font-medium"
                    >
                        Login
                    </Button>

                    {/* Sign Up Link */}
                    <div className="text-center pt-2">
                        <p className="text-sm text-slate-600">
                            ?Have an account{' '}
                            <button
                                type="button"
                                onClick={() => navigate('/register')}
                                className="text-blue-600 hover:underline font-medium"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </form>

                {/* Footer */}
                <div className="mt-12 text-center">
                    <p className="text-xs text-slate-400">Acme. All right Reserved 2022</p>
                </div>
            </div>
        </div>
    </div>
);
}
