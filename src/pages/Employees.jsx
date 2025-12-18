import { useState } from 'react';
import {
    Users,
    Plus,
    Edit,
    Trash2,
    Key,
    Eye,
    Shield,
    Package,
    ShoppingCart,
    Warehouse,
    Truck,
    MessageSquare,
    MoreVertical,
    X
} from 'lucide-react';

const employees = [
    {
        id: 1,
        name: 'محمد أحمد',
        email: 'mohamed@store.com',
        phone: '+20 123 456 7890',
        role: 'مسؤول المنتجات',
        permissions: ['products', 'inventory'],
        status: 'active',
        lastActive: 'منذ 5 دقائق'
    },
    {
        id: 2,
        name: 'سارة محمود',
        email: 'sara@store.com',
        phone: '+20 111 222 3333',
        role: 'مسؤول الطلبات',
        permissions: ['orders', 'shipping'],
        status: 'active',
        lastActive: 'منذ ساعة'
    },
    {
        id: 3,
        name: 'أحمد علي',
        email: 'ahmed.ali@store.com',
        phone: '+20 100 200 3000',
        role: 'مسؤول الشحن',
        permissions: ['shipping'],
        status: 'inactive',
        lastActive: 'منذ 3 أيام'
    },
    {
        id: 4,
        name: 'فاطمة حسن',
        email: 'fatma@store.com',
        phone: '+20 155 666 7777',
        role: 'مسؤول التواصل',
        permissions: ['messages', 'reviews'],
        status: 'active',
        lastActive: 'الآن'
    },
];

const roles = [
    { id: 'products', label: 'مسؤول المنتجات', icon: Package, color: 'primary' },
    { id: 'orders', label: 'مسؤول الطلبات', icon: ShoppingCart, color: 'info' },
    { id: 'inventory', label: 'مسؤول المخزون', icon: Warehouse, color: 'warning' },
    { id: 'shipping', label: 'مسؤول الشحن', icon: Truck, color: 'success' },
    { id: 'messages', label: 'مسؤول التواصل', icon: MessageSquare, color: 'primary' },
    { id: 'manager', label: 'مدير المتجر', icon: Shield, color: 'danger' },
];

export default function Employees() {
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    return (
        <div>
            {/* Page Header */}
            <div className="page-header flex items-center justify-between">
                <div>
                    <h2 className="page-title">إدارة الموظفين</h2>
                    <p className="page-subtitle">إضافة وإدارة صلاحيات موظفي المتجر</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={18} />
                    إضافة موظف
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 mb-xl">
                <div className="stats-card">
                    <div className="stats-card-icon primary">
                        <Users size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">إجمالي الموظفين</div>
                        <div className="stats-card-value">4</div>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon success">
                        <Users size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">نشط الآن</div>
                        <div className="stats-card-value">3</div>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon warning">
                        <Shield size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">أنواع الأدوار</div>
                        <div className="stats-card-value">6</div>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon danger">
                        <Users size={24} />
                    </div>
                    <div className="stats-card-content">
                        <div className="stats-card-label">غير نشط</div>
                        <div className="stats-card-value">1</div>
                    </div>
                </div>
            </div>

            {/* Employees Table */}
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">قائمة الموظفين</h3>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>الموظف</th>
                                <th>البريد الإلكتروني</th>
                                <th>رقم الهاتف</th>
                                <th>الدور</th>
                                <th>الحالة</th>
                                <th>آخر نشاط</th>
                                <th>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>
                                        <div className="flex items-center gap-md">
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                background: 'var(--accent-gradient)',
                                                borderRadius: 'var(--radius-md)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: '600'
                                            }}>
                                                {employee.name.charAt(0)}
                                            </div>
                                            <span style={{ fontWeight: '500' }}>{employee.name}</span>
                                        </div>
                                    </td>
                                    <td>{employee.email}</td>
                                    <td style={{ direction: 'ltr', textAlign: 'right' }}>{employee.phone}</td>
                                    <td>
                                        <span className="badge badge-primary">{employee.role}</span>
                                    </td>
                                    <td>
                                        <span className={`badge badge-${employee.status === 'active' ? 'success' : 'danger'}`}>
                                            {employee.status === 'active' ? 'نشط' : 'غير نشط'}
                                        </span>
                                    </td>
                                    <td style={{ color: 'var(--text-muted)' }}>{employee.lastActive}</td>
                                    <td>
                                        <div className="flex items-center gap-sm">
                                            <button className="btn btn-secondary btn-sm" title="عرض">
                                                <Eye size={14} />
                                            </button>
                                            <button className="btn btn-secondary btn-sm" title="تعديل">
                                                <Edit size={14} />
                                            </button>
                                            <button className="btn btn-secondary btn-sm" title="إعادة كلمة المرور">
                                                <Key size={14} />
                                            </button>
                                            <button className="btn btn-danger btn-sm" title="حذف">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Roles & Permissions Section */}
            <div className="card mt-lg">
                <div className="card-header">
                    <h3 className="card-title">الأدوار والصلاحيات</h3>
                </div>
                <div className="grid grid-cols-3">
                    {roles.map((role) => (
                        <div key={role.id} style={{
                            padding: 'var(--spacing-lg)',
                            background: 'var(--bg-secondary)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-color)'
                        }}>
                            <div className="flex items-center gap-md mb-md">
                                <div className={`stats-card-icon ${role.color}`} style={{ width: '40px', height: '40px' }}>
                                    <role.icon size={20} />
                                </div>
                                <h4 style={{ fontSize: '16px', fontWeight: '600' }}>{role.label}</h4>
                            </div>
                            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                {role.id === 'products' && 'إضافة وتعديل المنتجات، إدارة الفئات والأسعار'}
                                {role.id === 'orders' && 'عرض الطلبات، تحديث الحالات، التواصل مع العملاء'}
                                {role.id === 'inventory' && 'إدارة المخزون، تحديث الكميات، تتبع الحركات'}
                                {role.id === 'shipping' && 'إدارة الشحنات، التواصل مع شركات التوصيل'}
                                {role.id === 'messages' && 'الرد على الرسائل والتقييمات والأسئلة'}
                                {role.id === 'manager' && 'جميع الصلاحيات ما عدا المعلومات المالية الحساسة'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Employee Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">إضافة موظف جديد</h3>
                            <button className="modal-close" onClick={() => setShowModal(false)}>
                                <X size={18} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="grid grid-cols-2" style={{ gap: 'var(--spacing-md)' }}>
                                <div className="form-group">
                                    <label className="form-label">الاسم الكامل</label>
                                    <input type="text" className="form-input" placeholder="أدخل اسم الموظف" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">رقم الهاتف</label>
                                    <input type="tel" className="form-input" placeholder="+20 XXX XXX XXXX" />
                                </div>
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="form-label">البريد الإلكتروني</label>
                                    <input type="email" className="form-input" placeholder="employee@store.com" />
                                </div>
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="form-label">كلمة المرور المؤقتة</label>
                                    <input type="password" className="form-input" placeholder="سيتم إرسالها للموظف" />
                                </div>
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="form-label">الدور</label>
                                    <select className="form-select">
                                        <option value="">اختر الدور</option>
                                        {roles.map((role) => (
                                            <option key={role.id} value={role.id}>{role.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="form-label">الصلاحيات</label>
                                    <div className="flex gap-md" style={{ flexWrap: 'wrap' }}>
                                        {roles.slice(0, 5).map((role) => (
                                            <label key={role.id} className="flex items-center gap-sm" style={{ cursor: 'pointer' }}>
                                                <input type="checkbox" />
                                                <span style={{ fontSize: '14px' }}>{role.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary">
                                <Plus size={18} />
                                إضافة الموظف
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
