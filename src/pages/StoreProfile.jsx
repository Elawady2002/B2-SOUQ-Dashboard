import { useState } from 'react';
import {
    Store,
    Camera,
    Globe,
    Phone,
    Mail,
    MapPin,
    Users,
    History,
    CreditCard,
    ChevronLeft,
    MessageCircle
} from 'lucide-react';

// Import social media icons
import FacebookIconSvg from '../assets/icons/Socials.svg';
import XIconSvg from '../assets/icons/Socials-1.svg';
import InstagramIconSvg from '../assets/icons/Socials-2.svg';
import TikTokIconSvg from '../assets/icons/Socials-3.svg';

export default function StoreProfile() {
    const [isStoreOpen, setIsStoreOpen] = useState(true);
    const [storeName, setStoreName] = useState('متجر الأناقة');
    const [storeNameEn, setStoreNameEn] = useState('Elegance store');
    const [storeDescription, setStoreDescription] = useState('وجهتكم الأولى للأزياء العصرية والمنتجات الراقية نقدم أفضل الماركات العالمية بأسعار منافسة');
    const [facebook, setFacebook] = useState('facebook.com/');
    const [twitter, setTwitter] = useState('X.com/');
    const [instagram, setInstagram] = useState('instagram.com/');
    const [tiktok, setTiktok] = useState('tiktok.com/');
    const [phone1, setPhone1] = useState('01037728582');
    const [phone2, setPhone2] = useState('01037728582');
    const [email, setEmail] = useState('example@gmail.com');
    const [city, setCity] = useState('أسوان');
    const [address, setAddress] = useState('56 شارع عبد السلام عارف بأسوان');
    const [website, setWebsite] = useState('merchant-saas.com');

    return (
        <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: '24px' }}>
            {/* Right Sidebar - Quick Actions */}
            <div style={{ width: '280px', flexShrink: 0 }}>
                {/* Store Status Card */}
                <div className="card" style={{ marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>حالة المتجر</h3>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '16px'
                    }}>
                        <div>
                            <p style={{ fontSize: '14px', fontWeight: 500 }}>وضع الصيانة</p>
                            <p style={{ fontSize: '12px', color: '#94a3b8' }}>تعطيل التصفح والطلبات</p>
                        </div>
                        <label style={{
                            position: 'relative',
                            width: '44px',
                            height: '24px',
                            cursor: 'pointer'
                        }}>
                            <input
                                type="checkbox"
                                checked={!isStoreOpen}
                                onChange={(e) => setIsStoreOpen(!e.target.checked)}
                                style={{ display: 'none' }}
                            />
                            <span style={{
                                position: 'absolute',
                                inset: 0,
                                background: !isStoreOpen ? '#2563eb' : '#e2e8f0',
                                borderRadius: '12px',
                                transition: 'all 0.3s'
                            }}>
                                <span style={{
                                    position: 'absolute',
                                    top: '2px',
                                    left: !isStoreOpen ? '22px' : '2px',
                                    width: '20px',
                                    height: '20px',
                                    background: 'white',
                                    borderRadius: '50%',
                                    transition: 'all 0.3s',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}></span>
                            </span>
                        </label>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 12px',
                        background: isStoreOpen ? '#d1fae5' : '#fee2e2',
                        borderRadius: '8px'
                    }}>
                        <span style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: isStoreOpen ? '#10b981' : '#ef4444'
                        }}></span>
                        <span style={{
                            fontSize: '14px',
                            color: isStoreOpen ? '#065f46' : '#991b1b',
                            fontWeight: 500
                        }}>
                            {isStoreOpen ? 'المتجر نشط' : 'المتجر معطل'}
                        </span>
                    </div>
                </div>

                {/* Social Links Card */}
                <div className="card" style={{ marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>الروابط الاجتماعية</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '10px 12px',
                            background: '#f8fafc',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0'
                        }}>
                            <input
                                type="text"
                                value={facebook}
                                onChange={(e) => setFacebook(e.target.value)}
                                style={{
                                    flex: 1,
                                    border: 'none',
                                    background: 'transparent',
                                    fontSize: '14px',
                                    outline: 'none'
                                }}
                            />
                            <img src={FacebookIconSvg} alt="Facebook" style={{ width: '24px', height: '24px' }} />
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '10px 12px',
                            background: '#f8fafc',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0'
                        }}>
                            <input
                                type="text"
                                value={twitter}
                                onChange={(e) => setTwitter(e.target.value)}
                                style={{
                                    flex: 1,
                                    border: 'none',
                                    background: 'transparent',
                                    fontSize: '14px',
                                    outline: 'none'
                                }}
                            />
                            <img src={XIconSvg} alt="X" style={{ width: '24px', height: '24px' }} />
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '10px 12px',
                            background: '#f8fafc',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0'
                        }}>
                            <input
                                type="text"
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                                style={{
                                    flex: 1,
                                    border: 'none',
                                    background: 'transparent',
                                    fontSize: '14px',
                                    outline: 'none'
                                }}
                            />
                            <img src={InstagramIconSvg} alt="Instagram" style={{ width: '24px', height: '24px' }} />
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '10px 12px',
                            background: '#f8fafc',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0'
                        }}>
                            <input
                                type="text"
                                value={tiktok}
                                onChange={(e) => setTiktok(e.target.value)}
                                style={{
                                    flex: 1,
                                    border: 'none',
                                    background: 'transparent',
                                    fontSize: '14px',
                                    outline: 'none'
                                }}
                            />
                            <img src={TikTokIconSvg} alt="TikTok" style={{ width: '24px', height: '24px' }} />
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="card">
                    <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>العمليات السريعة</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 16px',
                            background: '#f8fafc',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            width: '100%'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    background: '#dbeafe',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#2563eb'
                                }}>
                                    <Users size={18} />
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontSize: '14px', fontWeight: 500 }}>إدارة فريق العمل</p>
                                    <p style={{ fontSize: '12px', color: '#94a3b8' }}>وإضافة أو حذف موظفين</p>
                                </div>
                            </div>
                            <ChevronLeft size={18} color="#94a3b8" />
                        </button>

                        <button style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 16px',
                            background: '#f8fafc',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            width: '100%'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    background: '#d1fae5',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#059669'
                                }}>
                                    <History size={18} />
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontSize: '14px', fontWeight: 500 }}>سجل النشاطات</p>
                                    <p style={{ fontSize: '12px', color: '#94a3b8' }}>سجل الدخول والتعديلات</p>
                                </div>
                            </div>
                            <ChevronLeft size={18} color="#94a3b8" />
                        </button>

                        <button style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 16px',
                            background: '#f8fafc',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            width: '100%'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    background: '#fef3c7',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#d97706'
                                }}>
                                    <CreditCard size={18} />
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontSize: '14px', fontWeight: 500 }}>إعدادات الدفع</p>
                                    <p style={{ fontSize: '12px', color: '#94a3b8' }}>طرق الدفع والإعدادات</p>
                                </div>
                            </div>
                            <ChevronLeft size={18} color="#94a3b8" />
                        </button>
                    </div>
                </div>

                {/* Support Card */}
                <div style={{
                    marginTop: '16px',
                    padding: '24px',
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    borderRadius: '16px',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        bottom: '-20px',
                        left: '-20px',
                        width: '100px',
                        height: '100px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '50%'
                    }}></div>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: 'white' }}>تحتاج إلى مساعدة ؟</h3>
                    <p style={{ fontSize: '13px', color: 'white', opacity: 0.9, marginBottom: '16px', lineHeight: 1.6 }}>
                        فريق الدعم المباشر جاهز لمساعدتك في إعداد متجرك خطوة بخطوة
                    </p>
                    <button style={{
                        background: 'white',
                        color: '#2563eb',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <MessageCircle size={16} />
                        تواصل معنا
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1 }}>
                {/* Page Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '24px'
                }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 700 }}>إعدادات ملف المتجر</h2>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button style={{
                            padding: '10px 20px',
                            background: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 500
                        }}>
                            معاينة الصفحة
                        </button>
                        <button className="btn btn-primary" style={{
                            padding: '10px 20px'
                        }}>
                            حفظ التغييرات
                        </button>
                    </div>
                </div>

                {/* Banner & Logo Section */}
                <div className="card" style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>شعار وغلاف الموقع</h3>

                    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                        {/* Logo Upload */}
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                border: '3px dashed #2563eb',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: '#eff6ff',
                                cursor: 'pointer',
                                marginBottom: '8px'
                            }}>
                                <Camera size={32} color="#2563eb" />
                            </div>
                            <p style={{ fontSize: '12px', color: '#2563eb', fontWeight: 500 }}>رفع الشعار</p>
                        </div>

                        {/* Banner Upload */}
                        <div style={{ flex: 1 }}>
                            <div style={{
                                height: '150px',
                                background: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                position: 'relative'
                            }}>
                                <button style={{
                                    position: 'absolute',
                                    bottom: '12px',
                                    left: '12px',
                                    background: 'white',
                                    border: 'none',
                                    padding: '8px 16px',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '13px',
                                    fontWeight: 500,
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}>
                                    تغيير
                                </button>
                            </div>
                            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>1400 * 400 بكسل</p>
                        </div>
                    </div>
                </div>

                {/* Basic Identity */}
                <div className="card" style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>الهوية الأساسية</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#64748b' }}>
                                اسم المتجر (اللغة العربية)
                            </label>
                            <input
                                type="text"
                                value={storeName}
                                onChange={(e) => setStoreName(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    fontSize: '14px'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#64748b' }}>
                                اسم المتجر (اللغة الانجليزية)
                            </label>
                            <input
                                type="text"
                                value={storeNameEn}
                                onChange={(e) => setStoreNameEn(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    fontSize: '14px'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#64748b' }}>
                            وصف المتجر
                        </label>
                        <textarea
                            value={storeDescription}
                            onChange={(e) => setStoreDescription(e.target.value)}
                            rows={4}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                fontSize: '14px',
                                resize: 'vertical'
                            }}
                        />
                        <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px', textAlign: 'left' }}>500/0</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 16px',
                            background: '#f8fafc',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0'
                        }}>
                            <Globe size={18} color="#94a3b8" />
                            <input
                                type="text"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                style={{
                                    flex: 1,
                                    border: 'none',
                                    background: 'transparent',
                                    fontSize: '14px',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '12px 16px',
                            background: '#f8fafc',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            fontSize: '14px'
                        }}>
                            {storeNameEn}
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="card" style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>معلومات التواصل والموقع</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#64748b' }}>
                                رقم الهاتف
                            </label>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px 16px',
                                background: '#f8fafc',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0'
                            }}>
                                <Phone size={18} color="#94a3b8" />
                                <input
                                    type="tel"
                                    value={phone1}
                                    onChange={(e) => setPhone1(e.target.value)}
                                    style={{
                                        flex: 1,
                                        border: 'none',
                                        background: 'transparent',
                                        fontSize: '14px',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#64748b' }}>
                                رقم الهاتف (بديل للأعمال)
                            </label>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px 16px',
                                background: '#f8fafc',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0'
                            }}>
                                <Phone size={18} color="#94a3b8" />
                                <input
                                    type="tel"
                                    value={phone2}
                                    onChange={(e) => setPhone2(e.target.value)}
                                    style={{
                                        flex: 1,
                                        border: 'none',
                                        background: 'transparent',
                                        fontSize: '14px',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#64748b' }}>
                            البريد الإلكتروني
                        </label>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 16px',
                            background: '#f8fafc',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0'
                        }}>
                            <Mail size={18} color="#94a3b8" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    flex: 1,
                                    border: 'none',
                                    background: 'transparent',
                                    fontSize: '14px',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    <h4 style={{ fontSize: '14px', fontWeight: 600, marginTop: '24px', marginBottom: '16px' }}>عنوان المستودع الرئيسي</h4>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#64748b' }}>
                                المدينة
                            </label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    fontSize: '14px'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#64748b' }}>
                                العنوان التفصيلي
                            </label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    fontSize: '14px'
                                }}
                            />
                        </div>
                    </div>

                    {/* Map */}
                    <div style={{ marginTop: '16px' }}>
                        <div style={{
                            height: '200px',
                            background: '#e5e7eb',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            backgroundImage: 'url(https://maps.googleapis.com/maps/api/staticmap?center=24.7136,46.6753&zoom=14&size=600x300&maptype=roadmap&key=demo)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: '#ef4444',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)'
                            }}>
                                <MapPin size={20} color="white" />
                            </div>
                        </div>
                        <p style={{
                            fontSize: '12px',
                            color: '#64748b',
                            marginTop: '8px',
                            textAlign: 'center'
                        }}>
                            الرياض، المملكة العربية السعودية
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
