import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

// Pages
import Home from '../../pages/Home';
import SellerProfile from '../../pages/SellerProfile';
import StoreProfile from '../../pages/StoreProfile';
import Employees from '../../pages/Employees';
import Products from '../../pages/Products';
import Inventory from '../../pages/Inventory';
import Orders from '../../pages/Orders';
import Returns from '../../pages/Returns';
import Campaigns from '../../pages/Campaigns';
import Ads from '../../pages/Ads';
import Reports from '../../pages/Reports';
import Wallet from '../../pages/Wallet';
import Reviews from '../../pages/Reviews';
import Messages from '../../pages/Messages';
import ActivityLog from '../../pages/ActivityLog';

const pageTitles = {
    '/': 'الصفحة الرئيسية',
    '/seller-profile': 'ملف التاجر',
    '/store-profile': 'ملف المتجر',
    '/employees': 'إدارة الموظفين',
    '/products': 'المنتجات',
    '/inventory': 'المخزون',
    '/orders': 'الطلبات والشحن',
    '/returns': 'المرتجعات والنزاعات',
    '/campaigns': 'الحملات والعروض',
    '/ads': 'الإعلانات المدفوعة',
    '/reports': 'التقارير والتحليلات',
    '/wallet': 'المحفظة وطلبات السحب',
    '/reviews': 'التقييمات والأسئلة',
    '/messages': 'الرسائل والدعم',
    '/activity-log': 'سجل النشاط',
};

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    // Close sidebar when route changes (mobile)
    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    // Close sidebar when clicking outside (mobile)
    const handleOverlayClick = () => {
        setSidebarOpen(false);
    };

    return (
        <div className="dashboard-layout">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={handleOverlayClick}
                />
            )}

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="main-content">
                <Header
                    title={pageTitles[location.pathname] || 'لوحة التحكم'}
                    onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                />

                <div className="page-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/seller-profile" element={<SellerProfile />} />
                        <Route path="/store-profile" element={<StoreProfile />} />
                        <Route path="/employees" element={<Employees />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/inventory" element={<Inventory />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/returns" element={<Returns />} />
                        <Route path="/campaigns" element={<Campaigns />} />
                        <Route path="/ads" element={<Ads />} />
                        <Route path="/reports" element={<Reports />} />
                        <Route path="/wallet" element={<Wallet />} />
                        <Route path="/reviews" element={<Reviews />} />
                        <Route path="/messages" element={<Messages />} />
                        <Route path="/activity-log" element={<ActivityLog />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
}
