import {
    Wallet,
    Download,
    ArrowUp,
    ArrowDown,
    Clock,
    CheckCircle,
    AlertTriangle,
    Plus,
    CreditCard,
    X
} from 'lucide-react';
import { useState } from 'react';

const transactions = [
    { id: 1, type: 'deposit', amount: 45000, date: '2024-12-18', description: 'إيداع من طلب ORD-2024-78432', status: 'completed' },
    { id: 2, type: 'withdrawal', amount: 25000, date: '2024-12-17', description: 'طلب سحب للحساب البنكي', status: 'completed' },
    { id: 3, type: 'commission', amount: 1350, date: '2024-12-17', description: 'عمولة المنصة - 3%', status: 'completed' },
    { id: 4, type: 'deposit', amount: 17450, date: '2024-12-16', description: 'إيداع من طلب ORD-2024-78431', status: 'completed' },
    { id: 5, type: 'withdrawal', amount: 15000, date: '2024-12-15', description: 'طلب سحب للحساب البنكي', status: 'pending' },
    { id: 6, type: 'refund', amount: 8500, date: '2024-12-14', description: 'استرداد - طلب مرتجع', status: 'completed' },
    { id: 7, type: 'ad_payment', amount: 5000, date: '2024-12-10', description: 'دفع إعلان - Galaxy S24', status: 'completed' },
];

const withdrawalRequests = [
    { id: 1, amount: 25000, date: '2024-12-17', bank: 'البنك الأهلي', account: '•••• 4521', status: 'completed' },
    { id: 2, amount: 15000, date: '2024-12-15', bank: 'البنك الأهلي', account: '•••• 4521', status: 'pending' },
    { id: 3, amount: 20000, date: '2024-12-10', bank: 'البنك الأهلي', account: '•••• 4521', status: 'completed' },
];

const typeConfig = {
    deposit: { label: 'إيداع', color: 'success', icon: ArrowDown },
    withdrawal: { label: 'سحب', color: 'danger', icon: ArrowUp },
    commission: { label: 'عمولة', color: 'warning', icon: CreditCard },
    refund: { label: 'استرداد', color: 'info', icon: ArrowDown },
    ad_payment: { label: 'إعلان', color: 'primary', icon: CreditCard },
};

export default function WalletPage() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h2 className="page-title">المحفظة وطلبات السحب</h2>
                <p className="page-subtitle">إدارة أرصدتك وطلبات السحب</p>
            </div>

            {/* Balance Cards */}
            <div className="grid grid-cols-4 mb-xl">
                <div className="stats-card" style={{ background: 'var(--bg-card)', border: '2px solid var(--accent-primary)' }}>
                    <div className="stats-card-icon primary">
                        <Wallet size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">الرصيد الإجمالي</div>
                        <div className="stats-card-value">128,450 ج.م</div>
                    </div>
                </div>
                <div className="stats-card" style={{ background: 'var(--success-bg)', border: '2px solid var(--success)' }}>
                    <div className="stats-card-icon success">
                        <CheckCircle size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">قابل للسحب</div>
                        <div className="stats-card-value" style={{ color: 'var(--success)' }}>98,200 ج.م</div>
                    </div>
                </div>
                <div className="stats-card" style={{ background: 'var(--warning-bg)', border: '2px solid var(--warning)' }}>
                    <div className="stats-card-icon warning">
                        <Clock size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">رصيد معلق</div>
                        <div className="stats-card-value" style={{ color: 'var(--warning)' }}>22,750 ج.م</div>
                    </div>
                </div>
                <div className="stats-card" style={{ background: 'var(--danger-bg)', border: '2px solid var(--danger)' }}>
                    <div className="stats-card-icon danger">
                        <AlertTriangle size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">محجوز (نزاعات)</div>
                        <div className="stats-card-value" style={{ color: 'var(--danger)' }}>7,500 ج.م</div>
                    </div>
                </div>
            </div>

            {/* Withdraw Button */}
            <div className="card mb-lg" style={{ background: 'var(--accent-gradient)' }}>
                <div className="flex items-center justify-between">
                    <div>
                        <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>سحب الأرباح</h3>
                        <p style={{ opacity: 0.8 }}>الرصيد القابل للسحب: 98,200 ج.م</p>
                    </div>
                    <button className="btn btn-secondary" onClick={() => setShowModal(true)}>
                        <Download size={18} />
                        طلب سحب جديد
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-2">
                {/* Transactions */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">سجل الحركات</h3>
                    </div>
                    <div className="flex flex-col gap-md">
                        {transactions.map((tx) => {
                            const type = typeConfig[tx.type];
                            return (
                                <div key={tx.id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-md)',
                                    padding: 'var(--spacing-md)',
                                    background: 'var(--bg-secondary)',
                                    borderRadius: 'var(--radius-md)'
                                }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: 'var(--radius-md)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: `var(--${type.color}-bg)`,
                                        color: `var(--${type.color})`
                                    }}>
                                        <type.icon size={20} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontWeight: '500', fontSize: '14px' }}>{type.label}</p>
                                        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{tx.description}</p>
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <p style={{
                                            fontWeight: '600',
                                            color: tx.type === 'deposit' || tx.type === 'refund' ? 'var(--success)' : 'var(--danger)'
                                        }}>
                                            {tx.type === 'deposit' || tx.type === 'refund' ? '+' : '-'}
                                            {tx.amount.toLocaleString('en-US')} ج.م
                                        </p>
                                        <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{tx.date}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Withdrawal Requests */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">طلبات السحب</h3>
                    </div>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>المبلغ</th>
                                    <th>التاريخ</th>
                                    <th>البنك</th>
                                    <th>الحساب</th>
                                    <th>الحالة</th>
                                </tr>
                            </thead>
                            <tbody>
                                {withdrawalRequests.map((req) => (
                                    <tr key={req.id}>
                                        <td style={{ fontWeight: '600' }}>{req.amount.toLocaleString('en-US')} ج.م</td>
                                        <td>{req.date}</td>
                                        <td>{req.bank}</td>
                                        <td style={{ fontFamily: 'monospace' }}>{req.account}</td>
                                        <td>
                                            <span className={`badge badge-${req.status === 'completed' ? 'success' : 'warning'}`}>
                                                {req.status === 'completed' ? 'تم التحويل' : 'قيد المعالجة'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Bank Info */}
                    <div style={{
                        marginTop: 'var(--spacing-lg)',
                        padding: 'var(--spacing-lg)',
                        background: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-md)'
                    }}>
                        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>الحساب البنكي المسجل</h4>
                        <div className="grid grid-cols-2" style={{ gap: 'var(--spacing-sm)' }}>
                            <p style={{ fontSize: '13px' }}><span style={{ color: 'var(--text-muted)' }}>البنك:</span> البنك الأهلي المصري</p>
                            <p style={{ fontSize: '13px' }}><span style={{ color: 'var(--text-muted)' }}>صاحب الحساب:</span> شركة التقنية المتقدمة</p>
                            <p style={{ fontSize: '13px' }}><span style={{ color: 'var(--text-muted)' }}>IBAN:</span> EG38 0019 •••• •••• 6789</p>
                            <p style={{ fontSize: '13px' }}><span style={{ color: 'var(--text-muted)' }}>آخر 4 أرقام:</span> 4521</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Withdrawal Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">طلب سحب جديد</h3>
                            <button className="modal-close" onClick={() => setShowModal(false)}>
                                <X size={18} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div style={{
                                padding: 'var(--spacing-lg)',
                                background: 'var(--success-bg)',
                                borderRadius: 'var(--radius-md)',
                                marginBottom: 'var(--spacing-lg)',
                                textAlign: 'center'
                            }}>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>الرصيد القابل للسحب</p>
                                <p style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success)' }}>98,200 ج.م</p>
                            </div>

                            <div className="form-group">
                                <label className="form-label">المبلغ المطلوب سحبه</label>
                                <input type="number" className="form-input" placeholder="أدخل المبلغ" />
                            </div>

                            <div className="form-group">
                                <label className="form-label">الحساب البنكي</label>
                                <select className="form-select">
                                    <option>البنك الأهلي - •••• 4521</option>
                                </select>
                            </div>

                            <div style={{
                                padding: 'var(--spacing-md)',
                                background: 'var(--info-bg)',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '13px',
                                color: 'var(--info)'
                            }}>
                                💡 يتم تحويل المبلغ خلال 2-3 أيام عمل
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-success">
                                <Download size={18} />
                                تأكيد طلب السحب
                            </button>
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                إلغاء
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
