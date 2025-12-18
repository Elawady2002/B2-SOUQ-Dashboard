import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Handle login logic
        console.log('Login submitted:', formData);
        navigate('/'); // Redirect to dashboard
    };

    return (
        <div>
            <div className="mb-6">
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>تسجيل الدخول</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>مرحباً بك مجدداً، أدخل بياناتك للمتابعة</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>البريد الإلكتروني</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <Mail size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            style={{ background: 'var(--bg-main)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                            placeholder="name@company.com"
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>كلمة المرور</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <Lock size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            style={{ background: 'var(--bg-main)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="text-sm">
                        <a href="#" className="font-medium hover:text-indigo-500" style={{ color: 'var(--primary)' }}>
                            نسيت كلمة المرور؟
                        </a>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6"
                    style={{ background: 'var(--primary)', color: '#fff' }}
                >
                    تسجيل الدخول
                </button>

                <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm">
                        <span className="text-gray-500 ml-1" style={{ color: 'var(--text-secondary)' }}>ليس لديك حساب؟</span>
                        <Link to="/register" className="font-medium hover:text-indigo-500" style={{ color: 'var(--primary)' }}>
                            إنشاء حساب جديد
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
