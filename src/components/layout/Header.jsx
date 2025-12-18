import { Bell, Settings, Menu, X } from 'lucide-react';
import SearchIcon from '../../assets/icons/material-symbols-light_search.svg';
import NightIcon from '../../assets/icons/fluent-mdl2_clear-night.svg';

export default function Header({ onMenuClick }) {
    return (
        <header className="header">
            {/* Right Side - Menu + Search */}
            <div className="header-right">
                {/* Mobile Menu Button */}
                <button
                    className="header-menu-btn"
                    onClick={onMenuClick}
                    aria-label="فتح القائمة"
                >
                    <Menu size={22} />
                </button>

                <div className="header-search">
                    <img src={SearchIcon} alt="" className="header-search-icon" />
                    <input type="text" placeholder="ابحث..." />
                </div>
            </div>

            {/* Left Side - Actions & Profile */}
            <div className="header-left">
                <button className="header-icon-btn" title="الوضع الليلي">
                    <img src={NightIcon} alt="" style={{ width: 18, height: 18 }} />
                </button>

                <button className="header-icon-btn" title="الإشعارات">
                    <Bell size={18} />
                    <span className="badge">3</span>
                </button>

                <button className="header-icon-btn" title="الإعدادات">
                    <Settings size={18} />
                </button>

                {/* Profile */}
                <div className="header-profile">
                    <img
                        src="https://ui-avatars.com/api/?name=جاك+ميلر&background=2563eb&color=fff&size=36&font-size=0.4"
                        alt="Profile"
                        className="header-profile-avatar"
                        style={{ width: 32, height: 32, borderRadius: '50%' }}
                    />
                </div>
            </div>
        </header>
    );
}
