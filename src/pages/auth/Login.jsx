import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import LogoFull from '../../assets/image/logo2.svg';

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
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple authentication - just set a flag in localStorage
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/');
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            direction: 'rtl'
        }}>
            {/* Right Side - Blue Panel */}
            <div style={{
                flex: '0 0 40%',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                padding: '60px 50px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative circles */}
                <div style={{
                    position: 'absolute',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    top: '-100px',
                    right: '-100px'
                }} />
                <div style={{
                    position: 'absolute',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    bottom: '-80px',
                    left: '-80px'
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Logo */}
                    <img src={LogoFull} alt="B2 SOUQ" style={{ height: '50px', marginBottom: '40px', filter: 'brightness(0) invert(1)' }} />

                    {/* Title */}
                    <h1 style={{
                        fontSize: '42px',
                        fontWeight: 700,
                        marginBottom: '20px',
                        lineHeight: 1.2,
                        color: '#ffffff'
                    }}>
                        مرحباً بك في<br />
                        لوحة التحكم
                    </h1>

                    <p style={{
                        fontSize: '18px',
                        opacity: 0.95,
                        lineHeight: 1.6,
                        marginBottom: '50px',
                        color: '#f0f9ff'
                    }}>
                        منصة B2-SOUQ للتجارة الإلكترونية.<br />
                        إدارة متجرك بكل سهولة واحترافية.
                    </p>

                    {/* Testimonials Carousel */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '16px',
                        padding: '24px',
                        border: 'none',
                        position: 'relative',
                        minHeight: '180px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}>
                        {/* Testimonial Content */}
                        <div style={{
                            transition: 'opacity 0.5s',
                            opacity: 1
                        }}>
                            <p style={{
                                fontSize: '15px',
                                lineHeight: 1.7,
                                marginBottom: '16px',
                                color: '#475569',
                                minHeight: '60px'
                            }}>
                                "{TESTIMONIALS[currentTestimonial].text}"
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <img
                                    src={TESTIMONIALS[currentTestimonial].avatar}
                                    alt={TESTIMONIALS[currentTestimonial].author}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        objectFit: 'cover'
                                    }}
                                />
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '14px', color: '#1e293b' }}>{TESTIMONIALS[currentTestimonial].author}</div>
                                    <div style={{ fontSize: '13px', color: '#64748b' }}>{TESTIMONIALS[currentTestimonial].role}</div>
                                </div>
                            </div>
                            <div style={{ marginTop: '12px', display: 'flex', gap: '4px' }}>
                                {[1, 2, 3, 4, 5].map(i => (
                                    <span key={i} style={{ color: '#fbbf24', fontSize: '16px' }}>★</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Progress Indicators - Outside Card */}
                    <div style={{
                        display: 'flex',
                        gap: '8px',
                        marginTop: '20px',
                        justifyContent: 'center'
                    }}>
                        {TESTIMONIALS.map((_, index) => (
                            <div
                                key={index}
                                style={{
                                    height: '4px',
                                    flex: 1,
                                    maxWidth: '60px',
                                    background: currentTestimonial === index ? 'white' : 'rgba(255, 255, 255, 0.3)',
                                    borderRadius: '2px',
                                    transition: 'all 0.3s',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setCurrentTestimonial(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Left Side - Login Form */}
            <div style={{
                flex: 1,
                background: '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px'
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '480px'
                }}>
                    {/* Form Card */}
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '32px',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
                        marginBottom: '24px'
                    }}>
                        <form onSubmit={handleLogin}>
                            <div style={{ marginBottom: '16px' }}>
                                <label className="form-label">البريد الإلكتروني *</label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                    <input
                                        type="email"
                                        className="form-input"
                                        style={{ paddingRight: '40px' }}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="example@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label className="form-label">كلمة المرور *</label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-input"
                                        style={{ paddingRight: '40px', paddingLeft: '40px' }}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            position: 'absolute',
                                            left: '12px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            color: '#94a3b8',
                                            padding: 0
                                        }}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    background: '#2563eb',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '10px',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    marginBottom: '24px'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = '#1d4ed8';
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 8px 16px rgba(37, 99, 235, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = '#2563eb';
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            >
                                تسجيل الدخول
                            </button>
                        </form>

                        {/* Back to Register */}
                        <div style={{ textAlign: 'center', marginTop: '24px' }}>
                            <p style={{ fontSize: '14px', color: '#64748b' }}>
                                ليس لديك حساب؟{' '}
                                <button
                                    onClick={() => navigate('/register')}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#2563eb',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                                >
                                    إنشاء حساب جديد
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
            .form-label {
                display: block;
                margin-bottom: 8px;
                font-size: 14px;
                font-weight: 600;
                color: #475569;
            }
            
            .form-input {
                width: 100%;
                padding: 12px 14px;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                fontSize: 14px;
                outline: none;
                transition: all 0.2s;
                background: #fff;
            }
            
            .form-input:focus {
                border-color: #2563eb;
                box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
            }
        `}</style>
        </div>
    );
}
