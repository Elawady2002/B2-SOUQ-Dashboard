import { useState } from 'react';
import {
    Users,
    Plus,
    Edit,
    Trash2,
    Search,
    Filter,
    Download,
    Shield,
    Home,
    Store,
    Package,
    Truck,
    Tag,
    RotateCcw,
    Megaphone,
    BarChart2,
    User,
    Headphones,
    X,
    Check
} from 'lucide-react';

// Dashboard pages for role permissions
const dashboardPages = [
    { id: 'home', name: 'الصفحة الرئيسية', icon: Home },
    { id: 'profile', name: 'حساب التاجر', icon: User },
    { id: 'store', name: 'ملف المتجر', icon: Store },
    { id: 'products', name: 'قسم المبيعات', icon: Package },
    { id: 'orders', name: 'الشحنات', icon: Truck },
    { id: 'employees', name: 'الموظفين', icon: Users },
    { id: 'returns', name: 'المرتجعات', icon: RotateCcw },
    { id: 'discounts', name: 'الخصومات', icon: Tag },
    { id: 'ads', name: 'الإعلانات', icon: Megaphone },
    { id: 'reports', name: 'الأرباح', icon: BarChart2 },
    { id: 'support', name: 'الدعم', icon: Headphones },
    { id: 'faq', name: 'الاسئلة الشائعة', icon: Shield },
];

const employees = [
    { id: 1, name: 'نورهان طه', email: 'nourhan@gmail.com', phone: '+201009432089', role: 'مدير المتجر', status: 'active', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'نورهان طه', email: 'mohamediet@gmail.com', phone: '+201142040360', role: 'مسؤولة المنتجات', status: 'active', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'نورهان طه', email: 'tarake7353@gmail.com', phone: '+201111295586', role: 'مدير المتجر', status: 'inactive', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'نورهان طه', email: 'hatemakf@gmail.com', phone: '+201001989194', role: 'مدير المتجر', status: 'active', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: 'نورهان طه', email: 'assmaelbaymey@gmail.com', phone: '+201140034239', role: 'مدير المتجر', status: 'active', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 6, name: 'نورهان طه', email: 'assmaelbaymey@gmail.com', phone: '+201140034239', role: 'مدير المتجر', status: 'active', avatar: 'https://i.pravatar.cc/150?img=6' },
    { id: 7, name: 'نورهان طه', email: 'assmaelbaymey@gmail.com', phone: '+201140034239', role: 'مدير المتجر', status: 'active', avatar: 'https://i.pravatar.cc/150?img=7' },
    { id: 8, name: 'نورهان طه', email: 'assmaelbaymey@gmail.com', phone: '+201140034239', role: 'مدير المتجر', status: 'active', avatar: 'https://i.pravatar.cc/150?img=8' },
    { id: 9, name: 'نورهان طه', email: 'assmaelbaymey@gmail.com', phone: '+201140034239', role: 'مدير المتجر', status: 'active', avatar: 'https://i.pravatar.cc/150?img=9' },
];

const roles = [
    { id: 1, name: 'مدير المنتج', department: 'قسم المنتجات', icon: Package, color: '#3b82f6', bgColor: '#eff6ff', members: ['https://i.pravatar.cc/150?img=1', 'https://i.pravatar.cc/150?img=2', 'https://i.pravatar.cc/150?img=3'], extraMembers: 5, status: 'active' },
    { id: 2, name: 'مدير التسويق', department: 'قسم التسويق', icon: Megaphone, color: '#ef4444', bgColor: '#fef2f2', members: ['https://i.pravatar.cc/150?img=4', 'https://i.pravatar.cc/150?img=5', 'https://i.pravatar.cc/150?img=6'], extraMembers: 5, status: 'active' },
    { id: 3, name: 'مسؤول المبيعات', department: 'قسم المبيعات', icon: BarChart2, color: '#10b981', bgColor: '#ecfdf5', members: ['https://i.pravatar.cc/150?img=7', 'https://i.pravatar.cc/150?img=8', 'https://i.pravatar.cc/150?img=9'], extraMembers: 5, status: 'active' },
];

const PERMISSION_LEVELS = { ADMIN: 'admin', VIEW_ONLY: 'view_only', HIDDEN: 'hidden' };

export default function Employees() {
    const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
    const [showAddRoleModal, setShowAddRoleModal] = useState(false);
    const [activeTab, setActiveTab] = useState('employees');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [rolePermissions, setRolePermissions] = useState(
        dashboardPages.reduce((acc, page) => ({ ...acc, [page.id]: page.id === 'home' ? PERMISSION_LEVELS.VIEW_ONLY : page.id === 'store' ? PERMISSION_LEVELS.HIDDEN : PERMISSION_LEVELS.ADMIN }), {})
    );

    const setPermissionLevel = (pageId, level) => setRolePermissions(prev => ({ ...prev, [pageId]: level }));

    const filteredEmployees = employees.filter(emp => emp.name.includes(searchQuery) || emp.email.includes(searchQuery));
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    const paginatedEmployees = filteredEmployees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div>
                    <h2 className="page-title">إدارة الفريق</h2>
                    <p className="page-subtitle">إضافة وتعديل صلاحيات فريق عملك</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={() => setShowAddRoleModal(true)} style={{ background: 'white', color: '#2563eb', border: '2px solid #2563eb', padding: '10px 20px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, cursor: 'pointer' }}>
                        <Plus size={18} /> إضافة دور جديد
                    </button>
                    <button onClick={() => setShowAddEmployeeModal(true)} style={{ background: '#2563eb', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, cursor: 'pointer' }}>
                        <Plus size={18} /> إضافة موظف جديد
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '32px', borderBottom: '2px solid #e2e8f0', marginBottom: '24px' }}>
                <button onClick={() => setActiveTab('employees')} style={{ background: 'none', border: 'none', padding: '12px 0', fontSize: '15px', fontWeight: activeTab === 'employees' ? 600 : 400, color: activeTab === 'employees' ? '#1e293b' : '#64748b', borderBottom: activeTab === 'employees' ? '2px solid #1e293b' : 'none', marginBottom: '-2px', cursor: 'pointer' }}>كل الموظفين</button>
                <button onClick={() => setActiveTab('roles')} style={{ background: 'none', border: 'none', padding: '12px 0', fontSize: '15px', fontWeight: activeTab === 'roles' ? 600 : 400, color: activeTab === 'roles' ? '#1e293b' : '#64748b', borderBottom: activeTab === 'roles' ? '2px solid #1e293b' : 'none', marginBottom: '-2px', cursor: 'pointer' }}>كل الأدوار</button>
            </div>

            {/* Search */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', gap: '16px' }}>
                <div style={{ flex: 1, maxWidth: '400px', position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input type="text" placeholder="ابحث عن موظفين" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', padding: '10px 40px 10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }} />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{ background: 'white', border: '1px solid #e2e8f0', padding: '10px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', cursor: 'pointer' }}><Filter size={16} /> تصفية</button>
                    <button style={{ background: 'white', border: '1px solid #e2e8f0', padding: '10px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', cursor: 'pointer' }}><Download size={16} /> تصدير البيانات</button>
                </div>
            </div>

            {/* Content */}
            {activeTab === 'employees' ? (
                <div className="card">
                    <div className="table-container">
                        <table className="table">
                            <thead><tr><th>اسم الموظف</th><th>الدور الوظيفي</th><th>رقم الهاتف</th><th>البريد الكتروني</th><th>الحالة</th><th>إجراءات</th></tr></thead>
                            <tbody>
                                {paginatedEmployees.map((emp) => (
                                    <tr key={emp.id}>
                                        <td><div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><img src={emp.avatar} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%' }} /><span style={{ fontWeight: 500 }}>{emp.name}</span></div></td>
                                        <td style={{ color: '#64748b' }}>{emp.role}</td>
                                        <td style={{ direction: 'ltr', textAlign: 'right', color: '#64748b' }}>{emp.phone}</td>
                                        <td style={{ color: '#64748b' }}>{emp.email}</td>
                                        <td><span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: 500, background: emp.status === 'active' ? '#d1fae5' : '#fee2e2', color: emp.status === 'active' ? '#065f46' : '#991b1b' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', background: emp.status === 'active' ? '#10b981' : '#ef4444' }}></span>{emp.status === 'active' ? 'نشط' : 'غير نشط'}</span></td>
                                        <td><div style={{ display: 'flex', gap: '8px' }}><button style={{ width: '32px', height: '32px', borderRadius: '6px', border: 'none', background: '#fef3c7', color: '#f59e0b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={16} /></button><button style={{ width: '32px', height: '32px', borderRadius: '6px', border: 'none', background: '#dbeafe', color: '#2563eb', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Edit size={16} /></button><button style={{ width: '32px', height: '32px', borderRadius: '6px', border: 'none', background: '#fee2e2', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Trash2 size={16} /></button></div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', padding: '0 16px' }}>
                        <span style={{ fontSize: '14px', color: '#64748b' }}>عرض {itemsPerPage} مدخلات ←</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '14px', color: '#64748b' }}>السابق</span>
                            {Array.from({ length: totalPages }, (_, i) => (<button key={i + 1} onClick={() => setCurrentPage(i + 1)} style={{ width: '32px', height: '32px', borderRadius: '6px', border: 'none', background: currentPage === i + 1 ? '#2563eb' : 'transparent', color: currentPage === i + 1 ? 'white' : '#64748b', cursor: 'pointer', fontWeight: 500 }}>{i + 1}</button>))}
                            <span style={{ fontSize: '14px', color: '#2563eb', cursor: 'pointer' }}>التالى</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="card">
                    <div className="table-container">
                        <table className="table">
                            <thead><tr><th>اسم الدور</th><th>اعضاء الفريق</th><th>الحالة</th><th>إجراءات</th></tr></thead>
                            <tbody>
                                {roles.map((role) => {
                                    const RoleIcon = role.icon; return (
                                        <tr key={role.id}>
                                            <td><div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '44px', height: '44px', borderRadius: '10px', background: role.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RoleIcon size={22} color={role.color} /></div><div><p style={{ fontWeight: 600, margin: 0 }}>{role.name}</p><p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>{role.department}</p></div></div></td>
                                            <td><div style={{ display: 'flex', alignItems: 'center' }}>{role.members.map((av, i) => (<img key={i} src={av} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid white', marginLeft: i > 0 ? '-10px' : 0 }} />))}<span style={{ marginRight: '8px', fontSize: '13px', color: '#64748b', background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px' }}>+{role.extraMembers}</span></div></td>
                                            <td><span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: 500, background: '#d1fae5', color: '#065f46' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span>نشط</span></td>
                                            <td><div style={{ display: 'flex', gap: '8px' }}><button style={{ width: '32px', height: '32px', borderRadius: '6px', border: 'none', background: '#fef3c7', color: '#f59e0b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RotateCcw size={16} /></button><button style={{ width: '32px', height: '32px', borderRadius: '6px', border: 'none', background: '#dbeafe', color: '#2563eb', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Edit size={16} /></button><button style={{ width: '32px', height: '32px', borderRadius: '6px', border: 'none', background: '#fee2e2', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Trash2 size={16} /></button></div></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', padding: '0 16px' }}>
                        <span style={{ fontSize: '14px', color: '#64748b' }}>عرض 5 مدخلات ←</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ fontSize: '14px', color: '#64748b' }}>السابق</span><button style={{ width: '32px', height: '32px', borderRadius: '6px', border: 'none', background: '#2563eb', color: 'white', cursor: 'pointer', fontWeight: 500 }}>1</button><button style={{ width: '32px', height: '32px', borderRadius: '6px', border: 'none', background: 'transparent', color: '#64748b', cursor: 'pointer', fontWeight: 500 }}>2</button><span style={{ fontSize: '14px', color: '#2563eb', cursor: 'pointer' }}>التالى</span></div>
                    </div>
                </div>
            )}

            {/* Add Employee Modal */}
            {showAddEmployeeModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowAddEmployeeModal(false)}>
                    <div style={{ background: 'white', borderRadius: '12px', padding: '32px', maxWidth: '500px', width: '90%' }} onClick={e => e.stopPropagation()}>
                        <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>إضافة موظف جديد</h3>
                        <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>الاسم الكامل</label><input type="text" placeholder="أدخل اسم الموظف" style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px' }} /></div>
                        <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>البريد الإلكتروني</label><input type="email" placeholder="example@email.com" style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px' }} /></div>
                        <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>رقم الهاتف</label><input type="tel" placeholder="+20 XXX XXX XXXX" style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px' }} /></div>
                        <div style={{ marginBottom: '24px' }}><label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>الدور الوظيفي</label><select style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px' }}><option>اختر الدور</option><option>مدير المتجر</option><option>مسؤول المبيعات</option></select></div>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}><button onClick={() => setShowAddEmployeeModal(false)} style={{ padding: '10px 20px', border: '1px solid #e2e8f0', borderRadius: '8px', background: 'white', cursor: 'pointer' }}>إلغاء</button><button style={{ padding: '10px 20px', borderRadius: '8px', background: '#2563eb', color: 'white', border: 'none', cursor: 'pointer' }}>إضافة</button></div>
                    </div>
                </div>
            )}

            {/* Add Role Modal */}
            {showAddRoleModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowAddRoleModal(false)}>
                    <div style={{ background: 'white', borderRadius: '16px', padding: '32px', maxWidth: '700px', width: '90%', maxHeight: '90vh', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
                        <div style={{ marginBottom: '32px' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px', textAlign: 'right' }}>بيانات الدور</h3>
                            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px', textAlign: 'right' }}>قم بتعريف اسم الدور الجديد ليتم تعيينه للموظفين لاحقا</p>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500, textAlign: 'right' }}>اسم الدور الوظيفي</label>
                            <input type="text" placeholder="مثال: مدير المنتاج" style={{ width: '100%', padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', textAlign: 'right' }} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px', textAlign: 'right' }}>تكوين الصلاحيات</h3>
                            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px', textAlign: 'right' }}>حدد مستوى الوصول المسموح به لهذا الدور لكل صفحة من صفحات النظام.</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px', marginBottom: '12px' }}><span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>مستوى الصلاحيات</span><span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>اسم الصفحة</span></div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {dashboardPages.map((page) => {
                                    const Icon = page.icon; const level = rolePermissions[page.id]; return (
                                        <div key={page.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#fafafa', borderRadius: '10px' }}>
                                            <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', borderRadius: '8px', padding: '4px' }}>
                                                <button onClick={() => setPermissionLevel(page.id, PERMISSION_LEVELS.HIDDEN)} style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: level === PERMISSION_LEVELS.HIDDEN ? '#2563eb' : 'transparent', color: level === PERMISSION_LEVELS.HIDDEN ? 'white' : '#64748b', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>{level === PERMISSION_LEVELS.HIDDEN && <Check size={14} />}مخفي</button>
                                                <button onClick={() => setPermissionLevel(page.id, PERMISSION_LEVELS.VIEW_ONLY)} style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: level === PERMISSION_LEVELS.VIEW_ONLY ? '#2563eb' : 'transparent', color: level === PERMISSION_LEVELS.VIEW_ONLY ? 'white' : '#64748b', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>{level === PERMISSION_LEVELS.VIEW_ONLY && <Check size={14} />}عرض فقط</button>
                                                <button onClick={() => setPermissionLevel(page.id, PERMISSION_LEVELS.ADMIN)} style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: level === PERMISSION_LEVELS.ADMIN ? '#2563eb' : 'transparent', color: level === PERMISSION_LEVELS.ADMIN ? 'white' : '#64748b', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>{level === PERMISSION_LEVELS.ADMIN && <Check size={14} />}مدير</button>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span style={{ fontSize: '14px', fontWeight: 500 }}>{page.name}</span><div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={18} color="#64748b" /></div></div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}><button onClick={() => setShowAddRoleModal(false)} style={{ padding: '12px 24px', border: '1px solid #e2e8f0', borderRadius: '8px', background: 'white', cursor: 'pointer', fontWeight: 500 }}>إلغاء</button><button style={{ padding: '12px 24px', borderRadius: '8px', background: '#2563eb', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 500 }}>حفظ الدور</button></div>
                    </div>
                </div>
            )}
        </div>
    );
}
