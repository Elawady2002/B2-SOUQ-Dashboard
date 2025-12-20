import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel } from '@/components/ui/field';
import LogoFull from '../../assets/image/logo3.svg';

const TESTIMONIALS = [
    {
        text: "منصة رائعة ساعدتني في إدارة متجري بشكل احترافي. الواجهة سهلة والأدوات قوية جداً!",
        author: "محمد أحمد",
        role: "تاجر إلكتروني",
        avatar: "https://i.pravatar.cc/150?img=11"
    },
    {
        text: "أفضل منصة تجارة إلكترونية استخدمتها. التقارير التفصيلية ساعدتني في تحسين مبيعاتي بنسبة 150%",
        author: "سارة خالد",
        role: "صاحبة متجر أزياء",
        avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
        text: "الدعم الفني ممتاز والمنصة سهلة الاستخدام حتى للمبتدئين. أنصح بها بشدة!",
        author: "أحمد عبدالله",
        role: "تاجر إلكترونيات",
        avatar: "https://i.pravatar.cc/150?img=12"
    },
    {
        text: "إدارة المخزون والطلبات أصبحت أسهل بكثير. وفرت علي الكثير من الوقت والجهد",
        author: "فاطمة محمود",
        role: "صاحبة متجر مستلزمات منزلية",
        avatar: "https://i.pravatar.cc/150?img=9"
    }
];

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/');
    };

    return (
        <div className="min-h-screen flex" dir="rtl">
            {/* Right Side - Blue Panel */}
            <div className="flex-[0_0_35%] bg-gradient-to-br from-primary to-primary-700 px-10 py-16 flex flex-col justify-center text-white relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute w-[400px] h-[400px] rounded-full bg-white/5 -top-24 -right-24" />
                <div className="absolute w-[300px] h-[300px] rounded-full bg-white/5 -bottom-20 -left-20" />

                <div className="relative z-10">
                    {/* Logo */}
                    <img
                        src={LogoFull}
                        alt="B2 SOUQ"
                        className="h-12 mb-10"
                    />

                    {/* Title */}
                    <h1 className="text-4xl font-bold mb-5 leading-tight text-white">
                        مرحباً بك في<br />
                        لوحة التحكم
                    </h1>

                    {/* Description */}
                    <p className="text-lg leading-relaxed mb-12 text-white/95">
                        منصة B2-SOUQ للتجارة الإلكترونية.<br />
                        إدارة متجرك بكل سهولة واحترافية.
                    </p>

                    {/* Testimonials Carousel */}
                    <Card className="bg-white/95 rounded-xl p-6 border-none min-h-[180px] shadow-lg">
                        <div className="transition-opacity duration-500">
                            <p className="text-base leading-relaxed mb-4 text-slate-600 min-h-[60px]">
                                "{TESTIMONIALS[currentTestimonial].text}"
                            </p>

                            <div className="flex items-center gap-3">
                                <img
                                    src={TESTIMONIALS[currentTestimonial].avatar}
                                    alt={TESTIMONIALS[currentTestimonial].author}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <div className="font-semibold text-sm text-slate-700">
                                        {TESTIMONIALS[currentTestimonial].author}
                                    </div>
                                    <div className="text-xs text-slate-500">
                                        {TESTIMONIALS[currentTestimonial].role}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 flex gap-1">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <span key={i} className="text-amber-400 text-base">★</span>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Progress Indicators */}
                    <div className="flex gap-2 mt-5 justify-center">
                        {TESTIMONIALS.map((_, index) => (
                            <div
                                key={index}
                                className={`h-1 flex-1 max-w-[60px] rounded-sm transition-all duration-300 cursor-pointer ${currentTestimonial === index ? 'bg-white' : 'bg-white/30'
                                    }`}
                                onClick={() => setCurrentTestimonial(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Left Side - Login Form */}
            <div className="flex-1 bg-slate-50 flex items-center justify-center p-10">
                <div className="w-full max-w-[480px]">
                    <Card className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
                        <form onSubmit={handleLogin} className="space-y-6">
                            {/* Email Field */}
                            <Field>
                                <FieldLabel htmlFor="email">البريد الإلكتروني</FieldLabel>
                                <div className="relative">
                                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="example@email.com"
                                        className="pr-10 h-12"
                                        required
                                    />
                                </div>
                            </Field>

                            {/* Password Field */}
                            <Field>
                                <FieldLabel htmlFor="password">كلمة المرور</FieldLabel>
                                <div className="relative">
                                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="pr-10 pl-10 h-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </Field>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full"
                            >
                                تسجيل الدخول
                            </Button>

                            {/* Register Link */}
                            <div className="text-center pt-4">
                                <p className="text-sm text-slate-600">
                                    ليس لديك حساب؟{' '}
                                    <button
                                        type="button"
                                        onClick={() => navigate('/register')}
                                        className="text-primary font-semibold hover:underline transition-all"
                                    >
                                        إنشاء حساب جديد
                                    </button>
                                </p>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
}
