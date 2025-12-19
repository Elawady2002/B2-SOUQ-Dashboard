import { useState } from 'react';
import {
    Users,
    Plus,
    Edit,
    Trash2,
    Eye,
    Search,
    Filter,
    Download,
    UserPlus,
    Shield,
    Home,
    Store,
    Package,
    Truck,
    Tag,
    RotateCcw,
    Megaphone,
    BarChart2,
    FileText,
    User,
    Activity,
    Headphones,
    Star
} from 'lucide-react';

// Dashboard pages for role permissions
const dashboardPages = [
    { id: 'home', name: 'الرئيسية', icon: Home },
    { id: 'store', name: 'المتجر', icon: Store },
    { id: 'products', name: 'المنتجات', icon: Package },
    { id: 'orders', name: 'الطلبات', icon: Truck },
    { id: 'inventory', name: 'المخزون', icon: Tag },
    { id: 'returns', name: 'المرتجعات', icon: RotateCcw },
    { id: 'campaigns', name: 'الحملات', icon: Megaphone },
    { id: 'ads', name: 'الإعلانات', icon: BarChart2 },
    { id: 'reports', name: 'التقارير', icon: FileText },
    { id: 'profile', name: 'ملفي', icon: User },
    { id: 'employees', name: 'الموظفين', icon: Users },
    { id: 'activity', name: 'سجل النشاط', icon: Activity },
    { id: 'support', name: 'الدعم', icon: Headphones },
    { id: 'reviews', name: 'التقييمات', icon: Star },
];

const employees = [
    {
        id: 1,
        name: 'نورهان طه',
        email: 'nourhan@gmail.com',
        phone: '+201009432089',
        role: 'مدير المتجر',
        status: 'active',
        avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
        id: 2,
        name: 'محمد الدين',
        email: 'mohameddin@gmail.com',
        phone: '+201142940360',
        role: 'مسؤولة المبيعات',
        status: 'active',
        avatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
        id: 3,
        name: 'طارق',
        email: 'tarek7353@gmail.com',
        phone: '+201111295586',
        role: 'مدير المتجر',
        status: 'inactive',
        avatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
        id: 4,
        name: 'حاتم علي',
        email: 'hatemali@gmail.com',
        phone: '+201001889194',
        role: 'مدير المخزن',
        status: 'active',
        avatar: 'https://i.pravatar.cc/150?img=4'
    },
];

export default function Employees() {
    const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
    const [showAddRoleModal, setShowAddRoleModal] = useState(false);
    const [activeTab, setActiveTab] = useState('employees'); // 'employees' or 'roles'
    const [searchQuery, setSearchQuery] = useState('');
    const [rolePermissions, setRolePermissions] = useState(
        dashboardPages.reduce((acc, page) => ({ ...acc, [page.id]: false }), {})
    );

    const togglePermission = (pageId) => {
        setRolePermissions(prev => ({
            ...prev,
            [pageId]: !prev[pageId]
        }));
    };


    return (
        <div>
            {/* Page Header */}
            <div className="page-header" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px'
            }}>
                <div>
                    <h2 className="page-title">إدارة الفريق</h2>
                    <p className="page-subtitle">إضافة وتعديل وإدارة فريقك</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        className="btn btn-secondary"
                        onClick={() => setShowAddRoleModal(true)}
                        style={{
                            background: 'white',
                            color: '#2563eb',
                            border: '2px solid #2563eb',
                            padding: '10px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <Plus size={18} />
                        إضافة دور جديد
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowAddEmployeeModal(true)}
                        style={{
                            padding: '10px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <Plus size={18} />
                        إضافة موظف جديد
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div style={{
                display: 'flex',
                gap: '32px',
                borderBottom: '2px solid #e2e8f0',
                marginBottom: '24px'
            }}>
                <button
                    onClick={() => setActiveTab('employees')}
                    style={{
                        background: 'none',
                        border: 'none',
                        padding: '12px 0',
                        fontSize: '15px',
                        fontWeight: activeTab === 'employees' ? 600 : 400,
                        color: activeTab === 'employees' ? '#2563eb' : '#64748b',
                        borderBottom: activeTab === 'employees' ? '2px solid #2563eb' : 'none',
                        marginBottom: '-2px',
                        cursor: 'pointer'
                    }}
                >
                    كل الموظفين
                </button>
                <button
                    onClick={() => setActiveTab('roles')}
                    style={{
                        background: 'none',
                        border: 'none',
                        padding: '12px 0',
                        fontSize: '15px',
                        fontWeight: activeTab === 'roles' ? 600 : 400,
                        color: activeTab === 'roles' ? '#2563eb' : '#64748b',
                        borderBottom: activeTab === 'roles' ? '2px solid #2563eb' : 'none',
                        marginBottom: '-2px',
                        cursor: 'pointer'
                    }}
                >
                    كل الأدوار
                </button>
            </div>

            {/* Search and Filters */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                gap: '16px'
            }}>
                {/* Search */}
                <div style={{
                    flex: 1,
                    maxWidth: '400px',
                    position: 'relative'
                }}>
                    <Search
                        size={18}
                        style={{
                            position: 'absolute',
                            right: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#94a3b8'
                        }}
                    />
                    <input
                        type="text"
                        placeholder="ابحث عن موظفين"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px 40px 10px 12px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            fontSize: '14px'
                        }}
                    />
                </div>

                {/* Filter and Export Buttons */}
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        className="btn btn-secondary"
                        style={{
                            background: 'white',
                            border: '1px solid #e2e8f0',
                            padding: '10px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: '#475569'
                        }}
                    >
                        <Filter size={16} />
                        تصفية
                    </button>
                    <button
                        className="btn btn-secondary"
                        style={{
                            background: 'white',
                            border: '1px solid #e2e8f0',
                            padding: '10px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: '#475569'
                        }}
                    >
                        <Download size={16} />
                        تصدير البيانات
                    </button>
                </div>
            </div>

            {/* Employees Table */}
            <div className="card">
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>اسم الموظف</th>
                                <th>الدور الوظيفي</th>
                                <th>البريد الإلكتروني</th>
                                <th>رقم الهاتف</th>
                                <th>الحالة</th>
                                <th>إجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees
                                .filter(emp =>
                                    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    emp.email.toLowerCase().includes(searchQuery.toLowerCase())
                                )
                                .map((employee) => (
                                    <tr key={employee.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <img
                                                    src={employee.avatar}
                                                    alt={employee.name}
                                                    style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        borderRadius: '50%',
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                                <span style={{ fontWeight: '500', color: '#1e293b' }}>
                                                    {employee.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span style={{ color: '#64748b' }}>{employee.role}</span>
                                        </td>
                                        <td>
                                            <span style={{ color: '#64748b' }}>{employee.email}</span>
                                        </td>
                                        <td style={{ direction: 'ltr', textAlign: 'right' }}>
                                            <span style={{ color: '#64748b' }}>{employee.phone}</span>
                                        </td>
                                        <td>
                                            <span
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    padding: '4px 12px',
                                                    borderRadius: '6px',
                                                    fontSize: '13px',
                                                    fontWeight: '500',
                                                    background: employee.status === 'active' ? '#d1fae5' : '#fee2e2',
                                                    color: employee.status === 'active' ? '#065f46' : '#991b1b'
                                                }}
                                            >
                                                <span style={{
                                                    width: '6px',
                                                    height: '6px',
                                                    borderRadius: '50%',
                                                    background: employee.status === 'active' ? '#10b981' : '#ef4444'
                                                }}></span>
                                                {employee.status === 'active' ? 'نشط' : 'غير نشط'}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button
                                                    className="action-btn action-btn-view"
                                                    title="عرض"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    className="action-btn action-btn-edit"
                                                    title="تعديل"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    className="action-btn action-btn-delete"
                                                    title="حذف"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Employee Modal */}
            {showAddEmployeeModal && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000
                    }}
                    onClick={() => setShowAddEmployeeModal(false)}
                >
                    <div
                        style={{
                            background: 'white',
                            borderRadius: '12px',
                            padding: '32px',
                            maxWidth: '500px',
                            width: '90%',
                            maxHeight: '90vh',
                            overflow: 'auto'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>
                            إضافة موظف جديد
                        </h3>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
                                الاسم الكامل
                            </label>
                            <input
                                type="text"
                                placeholder="أدخل اسم الموظف"
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    fontSize: '14px'
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
                                البريد الإلكتروني
                            </label>
                            <input
                                type="email"
                                placeholder="example@email.com"
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    fontSize: '14px'
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
                                رقم الهاتف
                            </label>
                            <input
                                type="tel"
                                placeholder="+20 XXX XXX XXXX"
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    fontSize: '14px'
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
                                الدور الوظيفي
                            </label>
                            <select
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    fontSize: '14px'
                                }}
                            >
                                <option>اختر الدور</option>
                                <option>مدير المتجر</option>
                                <option>مسؤول المبيعات</option>
                                <option>مدير المخزن</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => setShowAddEmployeeModal(false)}
                                style={{
                                    padding: '10px 20px',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    background: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                إلغاء
                            </button>
                            <button
                                className="btn btn-primary"
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '8px'
                                }}
                            >
                                إضافة
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Role Modal */}
            {showAddRoleModal && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000
                    }}
                    onClick={() => setShowAddRoleModal(false)}
                >
                    <div
                        style={{
                            background: 'white',
                            borderRadius: '12px',
                            padding: '32px',
                            maxWidth: '500px',
                            width: '90%',
                            maxHeight: '90vh',
                            overflow: 'auto'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>
                            إضافة دور جديد
                        </h3>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
                                اسم الدور
                            </label>
                            <input
                                type="text"
                                placeholder="مثال: مسؤول المبيعات"
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    fontSize: '14px'
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
                                الوصف
                            </label>
                            <textarea
                                placeholder="وصف مختصر للدور والصلاحيات"
                                rows={4}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    resize: 'vertical'
                                }}
                            />
                        </div>

                        {/* Permissions Section */}
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>
                                صلاحيات الدور
                            </label>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '8px',
                                maxHeight: '250px',
                                overflow: 'auto',
                                padding: '4px'
                            }}>
                                {dashboardPages.map((page) => {
                                    const IconComponent = page.icon;
                                    return (
                                        <label
                                            key={page.id}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                padding: '10px 12px',
                                                background: rolePermissions[page.id] ? '#eff6ff' : '#f8fafc',
                                                border: rolePermissions[page.id] ? '1px solid #2563eb' : '1px solid #e2e8f0',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={rolePermissions[page.id]}
                                                onChange={() => togglePermission(page.id)}
                                                style={{
                                                    width: '16px',
                                                    height: '16px',
                                                    accentColor: '#2563eb'
                                                }}
                                            />
                                            <IconComponent
                                                size={18}
                                                color={rolePermissions[page.id] ? '#2563eb' : '#64748b'}
                                            />
                                            <span style={{
                                                fontSize: '13px',
                                                fontWeight: 500,
                                                color: rolePermissions[page.id] ? '#1e40af' : '#475569'
                                            }}>
                                                {page.name}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => setShowAddRoleModal(false)}
                                style={{
                                    padding: '10px 20px',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    background: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                إلغاء
                            </button>
                            <button
                                className="btn btn-primary"
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '8px'
                                }}
                            >
                                إضافة
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
