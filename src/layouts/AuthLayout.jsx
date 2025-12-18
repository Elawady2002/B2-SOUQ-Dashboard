import { Outlet } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export default function AuthLayout() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8" style={{ background: 'var(--bg-main)' }}>
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center" style={{ background: 'var(--primary)', boxShadow: 'var(--shadow-lg)' }}>
                        <ShoppingBag size={32} color="#fff" />
                    </div>
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2" style={{ color: 'var(--text-primary)' }}>
                    لوحة تحكم التاجر
                </h2>
                <p className="text-sm text-gray-500" style={{ color: 'var(--text-secondary)' }}>
                    منصة B2-SOUQ للتجارة الإلكترونية
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10" style={{ background: 'var(--bg-card)', boxShadow: 'var(--shadow-md)', borderRadius: 'var(--radius-lg)' }}>
                    <Outlet />
                </div>
            </div>

            <div className="mt-8 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                &copy; {new Date().getFullYear()} B2-SOUQ. جميع الحقوق محفوظة.
            </div>
        </div>
    );
}
