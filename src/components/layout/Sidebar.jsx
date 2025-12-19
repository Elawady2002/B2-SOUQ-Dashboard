import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';

// Import Logos
import LogoSmall from '../../assets/image/logo.svg';
import LogoFull from '../../assets/image/logo2.svg';

// Import SVG icons
import HomeIcon from '../../assets/icons/home.svg';
import StoreIcon from '../../assets/icons/material-symbols-light_storefront-outline-rounded.svg';
import UsersIcon from '../../assets/icons/ph_users.svg';
import PackageIcon from '../../assets/icons/ph_package-thin.svg';
import TruckIcon from '../../assets/icons/hugeicons_truck.svg';
import ReturnIcon from '../../assets/icons/ph_arrow-counter-clockwise-light.svg';
import MegaphoneIcon from '../../assets/icons/iconoir_megaphone.svg';
import ChartIcon from '../../assets/icons/ph_chart-bar.svg';
import TagIcon from '../../assets/icons/solar_tag-outline.svg';
import SettingsIcon from '../../assets/icons/uil_setting.svg';
import UserGearIcon from '../../assets/icons/ph_user-gear.svg';
import HeadsetIcon from '../../assets/icons/basil_headset-outline.svg';
import QuestionIcon from '../../assets/icons/mingcute_question-line.svg';
import FileTextIcon from '../../assets/icons/file-text.svg';
import ActivityIcon from '../../assets/icons/activity.svg';

const mainNavItems = [
    { icon: HomeIcon, label: 'الرئيسية', path: '/' },
    { icon: StoreIcon, label: 'المتجر', path: '/store-profile' },
    { icon: PackageIcon, label: 'المنتجات', path: '/products', badge: 3 },
    { icon: TruckIcon, label: 'الطلبات', path: '/orders', badge: 12 },
    { icon: TagIcon, label: 'المخزون', path: '/inventory' },
    { icon: ReturnIcon, label: 'المرتجعات', path: '/returns' },
];

const marketingNavItems = [
    { icon: MegaphoneIcon, label: 'الحملات', path: '/campaigns' },
    { icon: ChartIcon, label: 'الإعلانات', path: '/ads' },
    { icon: FileTextIcon, label: 'التقارير', path: '/reports' },
];

const settingsNavItems = [
    { icon: UserGearIcon, label: 'ملفي', path: '/seller-profile' },
    { icon: UsersIcon, label: 'الموظفين', path: '/employees' },
    { icon: ActivityIcon, label: 'سجل النشاط', path: '/activity-log' },
    { icon: HeadsetIcon, label: 'الدعم', path: '/messages' },
    { icon: QuestionIcon, label: 'التقييمات', path: '/reviews' },
];

export default function Sidebar({ isOpen, onClose }) {
    const [isHovered, setIsHovered] = useState(false);

    // Show full logo when sidebar is open or hovered
    const showFullLogo = isOpen || isHovered;

    const renderNavItem = (item) => (
        <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={() => isOpen && onClose()}
        >
            <span className="nav-item-icon">
                <img src={item.icon} alt="" />
            </span>
            <span className="nav-item-text">{item.label}</span>
            {item.badge && <span className="nav-item-badge">{item.badge}</span>}
        </NavLink>
    );

    return (
        <aside
            className={`sidebar ${isOpen ? 'open' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Logo */}
            <div className="sidebar-header">
                {showFullLogo ? (
                    <img
                        src={LogoFull}
                        alt="B2 SOUQ"
                        className="sidebar-logo-full"
                    />
                ) : (
                    <img
                        src={LogoSmall}
                        alt="B2"
                        className="sidebar-logo-small"
                    />
                )}

                {/* Mobile Close Button */}
                <button className="sidebar-close-btn" onClick={onClose}>
                    <X size={20} />
                </button>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">
                {/* Main Navigation */}
                <div className="nav-section">
                    <span className="nav-section-title">القائمة الرئيسية</span>
                    {mainNavItems.map(renderNavItem)}
                </div>

                {/* Marketing */}
                <div className="nav-section">
                    <span className="nav-section-title">التسويق</span>
                    {marketingNavItems.map(renderNavItem)}
                </div>

                {/* Settings */}
                <div className="nav-section">
                    <span className="nav-section-title">الإعدادات</span>
                    {settingsNavItems.map(renderNavItem)}
                </div>

                {/* Logout - At Bottom with Red Color */}
                <div style={{
                    marginTop: 'auto',
                    paddingTop: 'var(--spacing-xl)',
                    borderTop: '1px solid var(--border-light)'
                }}>
                    <button
                        className="nav-item"
                        onClick={() => {
                            localStorage.removeItem('isAuthenticated');
                            localStorage.removeItem('sellerData');
                            window.location.href = '/login';
                        }}
                        style={{
                            width: '100%',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#ef4444'
                        }}
                    >
                        <span className="nav-item-icon" style={{ color: '#ef4444' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                        </span>
                        <span className="nav-item-text" style={{ color: '#ef4444', fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>تسجيل الخروج</span>
                    </button>
                </div>
            </nav>
        </aside>
    );
}
