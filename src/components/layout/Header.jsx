import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../../assets/icons/material-symbols-light_search.svg';
import NightIcon from '../../assets/icons/fluent-mdl2_clear-night.svg';
import LanguageIcon from '../../assets/icons/famicons_language-outline.svg';
import MaximizeIcon from '../../assets/icons/gg_maximize-alt.svg';
import QuestionIcon from '../../assets/icons/mingcute_question-line.svg';
import SettingsIcon from '../../assets/icons/uil_setting.svg';
import Avatar from '../../assets/image/avater.png';

export default function Header({ onMenuClick }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('sellerData');
        navigate('/login');
    };
    return (
        <header className="header">
            {/* Right Side - Search + Menu */}
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
                    <input type="text" placeholder="ابحث عن شيء..." />
                </div>
            </div>

            {/* Left Side - Icons & Profile */}
            <div className="header-left">
                {/* Language */}
                <button className="header-icon-btn" title="اللغة">
                    <img src={LanguageIcon} alt="" style={{ width: 20, height: 20 }} />
                </button>

                {/* Night Mode */}
                <button className="header-icon-btn" title="الوضع الليلي">
                    <img src={NightIcon} alt="" style={{ width: 20, height: 20 }} />
                </button>

                {/* Shopping Cart with badge */}
                <button className="header-icon-btn" title="السلة" style={{ position: 'relative' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span className="header-badge" style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        background: '#ef4444',
                        color: 'white',
                        fontSize: 10,
                        fontWeight: 600,
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>9</span>
                </button>

                {/* Maximize */}
                <button className="header-icon-btn" title="تكبير">
                    <img src={MaximizeIcon} alt="" style={{ width: 20, height: 20 }} />
                </button>


                {/* Avatar */}
                <div className="header-profile">
                    <img
                        src={Avatar}
                        alt="Profile"
                        className="header-profile-avatar"
                        style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
                    />
                </div>

                {/* Settings */}
                <button className="header-icon-btn" title="الإعدادات">
                    <img src={SettingsIcon} alt="" style={{ width: 20, height: 20 }} />
                </button>
            </div>
        </header>
    );
}
