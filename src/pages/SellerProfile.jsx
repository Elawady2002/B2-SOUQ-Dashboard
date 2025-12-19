import { useState } from 'react';
import {
    Download,
    Edit2, Phone, Mail, MapPin, Calendar,
    CheckCircle, XCircle, ExternalLink,
    Instagram, MessageCircle
} from 'lucide-react';
import VisaCard from '../assets/image/card profile.png';
import WalletIcon from '../assets/icons/Frame-3.svg';
import SalesIcon from '../assets/icons/Frame-1.svg';
import RevenueIcon from '../assets/icons/Frame-2.svg';
import TransactionIcon from '../assets/icons/Frame.svg';

export default function SellerProfile() {
    // Mock data
    const walletData = {
        balance: 156000,
        totalSales: 156000,
        transactionCount: 156
    };

    const transactions = [
        { id: 'TX-990381', date: '2023-10-24', amount: 24145, status: 'completed' },
        { id: 'TX-990381', date: '2023-10-24', amount: 24145, status: 'pending' },
        { id: 'TX-990381', date: '2023-10-24', amount: 24145, status: 'cancelled' }
    ];

    const personalInfo = {
        name: 'عبدالله احمد العوضي محمد',
        email: 'members@example.com',
        phone: '+966545757',
        nationalId: '435-10331-90428',
        registrationDate: '2023-10-24',
        address: 'جدة، المملكة العربية السعودية'
    };

    const businessDocs = [
        {
            title: 'الضرائب والاستثمار والتأمينات',
            number: '1301240XXXXXX',
            expiry: '2023-10-24'
        },
        {
            title: 'الملكيات الفكرية والعلامات',
            number: 'CR1234567890',
            expiry: null
        },
        {
            title: 'الملكيات الشخص والتوصيل',
            number: 'LIC-2023-001',
            expiry: '2023-10-24'
        }
    ];

    const contactInfo = {
        phones: [
            { label: 'رقم الجوال', number: '+966545757', verified: true },
            { label: 'رقم آخر', number: '+966545757', verified: false }
        ],
        emails: [
            { label: 'البريد الإلكتروني', email: 'support@merchant-store.com', verified: true }
        ],
        social: [
            { platform: 'واتساب', handle: 'متاح', active: true },
            { platform: 'انستغرام', handle: '@merchant', active: false }
        ]
    };

    const subscriptionInfo = {
        plan: 'الباقة الأساسية',
        status: 'نشط',
        expiryDate: '2024-10-24',
        features: ['لوحة تحكم احترافية', 'تقارير مفصلة', 'دعم فني']
    };

    const getStatusBadge = (status) => {
        const styles = {
            completed: { bg: '#d1fae5', color: '#059669', text: 'مكتمل' },
            pending: { bg: '#fef3c7', color: '#d97706', text: 'قيد الانتظار' },
            cancelled: { bg: '#fee2e2', color: '#dc2626', text: 'ملغي' }
        };
        const style = styles[status];
        return (
            <span style={{
                background: style.bg,
                color: style.color,
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 600
            }}>
                {style.text}
            </span>
        );
    };

    return (
        <div className="page-content">
            {/* Page Header */}
            <div className="page-header">
                <h1 className="page-title">المحفظة المالية</h1>
            </div>

            {/* Top Section - Wallet Card & Stats */}
            <div style={{ display: 'flex', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)', alignItems: 'center' }}>
                {/* Wallet Card - Far Right */}
                <img
                    src={VisaCard}
                    alt="B2-SOUQ Visa Card"
                    style={{
                        width: '100%',
                        maxWidth: '420px',
                        height: 'auto',
                        display: 'block',
                        borderRadius: '16px'
                    }}
                />

                {/* Stats Cards - Left Side - 2x2 Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', flex: '1' }}>

                    {/* Card 1: Withdrawable Balance */}
                    <div style={{
                        background: 'white',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--spacing-lg)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img src={WalletIcon} alt="Wallet" style={{ width: '52px', height: '52px' }} />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginBottom: '8px' }}>
                                    الرصيد القابل لي السحب
                                </div>
                                <div style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>
                                    156,000 <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>جنيه</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Pending Profits */}
                    <div style={{
                        background: 'white',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--spacing-lg)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img src={SalesIcon} alt="Sales" style={{ width: '52px', height: '52px' }} />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginBottom: '8px' }}>
                                    الأرباح المعلقة
                                </div>
                                <div style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>
                                    156,000 <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>جنيه</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Total Sales */}
                    <div style={{
                        background: 'white',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--spacing-lg)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img src={RevenueIcon} alt="Revenue" style={{ width: '52px', height: '52px' }} />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginBottom: '8px' }}>
                                    إجمالي المبيعات
                                </div>
                                <div style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>
                                    156,000 <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>جنيه</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 4: Transaction Count */}
                    <div style={{
                        background: 'white',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--spacing-lg)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img src={TransactionIcon} alt="Transactions" style={{ width: '52px', height: '52px' }} />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginBottom: '8px' }}>
                                    عدد المعاملات
                                </div>
                                <div style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>
                                    156 <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>معاملة</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="card" style={{ marginBottom: 'var(--spacing-lg)' }}>
                <div className="card-header">
                    <h3 className="card-title">أحدث المعاملات</h3>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>رقم المعاملة</th>
                                <th>التاريخ</th>
                                <th>المبلغ</th>
                                <th>الحالة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((tx, index) => (
                                <tr key={index}>
                                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{tx.id}</td>
                                    <td>{tx.date}</td>
                                    <td style={{ fontWeight: 600 }}>{tx.amount.toLocaleString()} ريال</td>
                                    <td>{getStatusBadge(tx.status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bottom Grid - 3 Columns */}
            <div className="grid grid-cols-3" style={{ gap: 'var(--spacing-md)' }}>
                {/* Personal Information */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">بطاقة الهوية والتحقق (KYC)</h3>
                        <button className="header-icon-btn" style={{ width: '32px', height: '32px' }}>
                            <Edit2 size={16} />
                        </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                        <div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>الاسم الكامل</div>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{personalInfo.name}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>البريد الإلكتروني</div>
                            <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>{personalInfo.email}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>رقم الجوال</div>
                            <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>{personalInfo.phone}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>رقم الهوية الوطنية</div>
                            <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>{personalInfo.nationalId}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>تاريخ التسجيل</div>
                            <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>{personalInfo.registrationDate}</div>
                        </div>
                    </div>
                </div>

                {/* Business Information */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">الأبعاد التجارية والقانونية</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                        {businessDocs.map((doc, index) => (
                            <div key={index} style={{
                                padding: 'var(--spacing-md)',
                                background: 'var(--bg-input)',
                                borderRadius: 'var(--radius-md)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{doc.title}</div>
                                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '4px' }}>
                                        {doc.number}
                                    </div>
                                    {doc.expiry && (
                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                            تنتهي بتاريخ {doc.expiry}
                                        </div>
                                    )}
                                </div>
                                <Download size={18} style={{ color: 'var(--accent-primary)', cursor: 'pointer' }} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Information */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">العناوين والتواصل</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                        {/* Phone Numbers */}
                        <div>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--spacing-sm)' }}>
                                أرقام التواصل
                            </div>
                            {contactInfo.phones.map((phone, index) => (
                                <div key={index} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: 'var(--spacing-sm) 0',
                                    borderBottom: index < contactInfo.phones.length - 1 ? '1px solid var(--border-light)' : 'none'
                                }}>
                                    <div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{phone.label}</div>
                                        <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>{phone.number}</div>
                                    </div>
                                    {phone.verified && (
                                        <CheckCircle size={16} style={{ color: 'var(--success)' }} />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Email */}
                        <div>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--spacing-sm)' }}>
                                البريد الإلكتروني
                            </div>
                            {contactInfo.emails.map((email, index) => (
                                <div key={index} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: 'var(--spacing-sm) 0'
                                }}>
                                    <div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{email.label}</div>
                                        <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>{email.email}</div>
                                    </div>
                                    {email.verified && (
                                        <CheckCircle size={16} style={{ color: 'var(--success)' }} />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Social Media */}
                        <div>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--spacing-sm)' }}>
                                وسائل التواصل
                            </div>
                            {contactInfo.social.map((social, index) => (
                                <div key={index} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: 'var(--spacing-sm) 0',
                                    borderBottom: index < contactInfo.social.length - 1 ? '1px solid var(--border-light)' : 'none'
                                }}>
                                    <div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{social.platform}</div>
                                        <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>{social.handle}</div>
                                    </div>
                                    {social.active && (
                                        <span style={{
                                            background: 'var(--success-bg)',
                                            color: 'var(--success)',
                                            padding: '2px 8px',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            fontWeight: 600
                                        }}>نشط</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Subscription Section */}
            <div className="card" style={{ marginTop: 'var(--spacing-lg)' }}>
                <div className="card-header">
                    <h3 className="card-title">الترقيات المتاحة</h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '4px' }}>الباقة الحالية</div>
                        <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>{subscriptionInfo.plan}</div>
                        <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                            تنتهي في {subscriptionInfo.expiryDate}
                        </div>
                    </div>
                    <button className="btn btn-primary">
                        ترقية الباقة
                    </button>
                </div>
            </div>
        </div>
    );
}
