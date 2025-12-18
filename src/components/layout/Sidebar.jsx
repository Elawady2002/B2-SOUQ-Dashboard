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
    { icon: ChartIcon, label: 'التقارير', path: '/reports' },
];

const settingsNavItems = [
    { icon: UserGearIcon, label: 'ملفي', path: '/seller-profile' },
    { icon: UsersIcon, label: 'الموظفين', path: '/employees' },
    { icon: SettingsIcon, label: 'الإعدادات', path: '/activity-log' },
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
            </nav>
        </aside>
    );
}
