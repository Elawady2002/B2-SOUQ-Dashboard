import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
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

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

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
    { id: 2, name: 'محمد علي', email: 'mohamediet@gmail.com', phone: '+201142040360', role: 'مسؤولة المنتجات', status: 'active', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'سارة أحمد', email: 'tarake7353@gmail.com', phone: '+201111295586', role: 'مدير المتجر', status: 'inactive', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'أحمد حسن', email: 'hatemakf@gmail.com', phone: '+201001989194', role: 'مدير المتجر', status: 'active', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: 'فاطمة محمود', email: 'assmaelbaymey@gmail.com', phone: '+201140034239', role: 'مدير المتجر', status: 'active', avatar: 'https://i.pravatar.cc/150?img=5' },
];

const roles = [
    { id: 1, name: 'مدير المنتج', department: 'قسم المنتجات', icon: Package, color: 'text-blue-600', bgColor: 'bg-blue-50', members: ['https://i.pravatar.cc/150?img=1', 'https://i.pravatar.cc/150?img=2', 'https://i.pravatar.cc/150?img=3'], extraMembers: 5, status: 'active' },
    { id: 2, name: 'مدير التسويق', department: 'قسم التسويق', icon: Megaphone, color: 'text-red-600', bgColor: 'bg-red-50', members: ['https://i.pravatar.cc/150?img=4', 'https://i.pravatar.cc/150?img=5', 'https://i.pravatar.cc/150?img=6'], extraMembers: 5, status: 'active' },
    { id: 3, name: 'مسؤول المبيعات', department: 'قسم المبيعات', icon: BarChart2, color: 'text-emerald-600', bgColor: 'bg-emerald-50', members: ['https://i.pravatar.cc/150?img=7', 'https://i.pravatar.cc/150?img=8', 'https://i.pravatar.cc/150?img=9'], extraMembers: 5, status: 'active' },
];

const PERMISSION_LEVELS = { ADMIN: 'admin', VIEW_ONLY: 'view_only', HIDDEN: 'hidden' };

export default function Employees() {
    const { t } = useLanguage();
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
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="page-title">{t('employees.title')}</h2>
                    <p className="page-subtitle">{t('employees.subtitle')}</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setShowAddRoleModal(true)} className="gap-2">
                        <Plus size={18} /> {t('employees.addRole') || 'Add Role'}
                    </Button>
                    <Button onClick={() => setShowAddEmployeeModal(true)} className="gap-2 bg-blue-600 hover:bg-blue-700">
                        <Plus size={18} /> {t('employees.addEmployee')}
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="employees">{t('employees.allEmployees') || 'All Employees'}</TabsTrigger>
                    <TabsTrigger value="roles">{t('employees.allRoles') || 'All Roles'}</TabsTrigger>
                </TabsList>

                {/* Search & Actions */}
                <div className="flex items-center justify-between gap-4 mt-4">
                    <div className="relative flex-1 max-w-md">
                        <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input
                            type="text"
                            placeholder={t('employees.searchPlaceholder') || 'Search employees'}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pr-10"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Filter size={16} /> {t('common.filter') || 'Filter'}
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Download size={16} /> {t('common.export') || 'Export'}
                        </Button>
                    </div>
                </div>

                <TabsContent value="employees" className="mt-4">
                    <Card>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="text-right">{t('employees.name')}</TableHead>
                                        <TableHead className="text-right">{t('employees.role')}</TableHead>
                                        <TableHead className="text-right">{t('employees.phone')}</TableHead>
                                        <TableHead className="text-right">{t('employees.email')}</TableHead>
                                        <TableHead className="text-center">{t('employees.status')}</TableHead>
                                        <TableHead className="text-center">{t('products.actions')}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedEmployees.map((emp) => (
                                        <TableRow key={emp.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={emp.avatar} alt={emp.name} />
                                                        <AvatarFallback>{emp.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="font-medium">{emp.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-slate-600">{emp.role}</TableCell>
                                            <TableCell className="text-slate-600" dir="ltr">{emp.phone}</TableCell>
                                            <TableCell className="text-slate-600">{emp.email}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant="secondary" className={emp.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}>
                                                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${emp.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                                    {emp.status === 'active' ? t('employees.active') : t('employees.inactive')}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-600 hover:bg-amber-50">
                                                        <X size={16} />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50">
                                                        <Edit size={16} />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50">
                                                        <Trash2 size={16} />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-4 px-4">
                        <span className="text-sm text-slate-600">{t('home.showing')} {itemsPerPage} {t('common.entries') || 'entries'}</span>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-600">{t('home.previous')}</span>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <Button
                                    key={i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    variant={currentPage === i + 1 ? "default" : "ghost"}
                                    size="sm"
                                    className={currentPage === i + 1 ? 'bg-blue-600 hover:bg-blue-700' : ''}
                                >
                                    {i + 1}
                                </Button>
                            ))}
                            <span className="text-sm text-blue-600 cursor-pointer">{t('home.next')}</span>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="roles" className="mt-4">
                    <Card>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="text-right">اسم الدور</TableHead>
                                        <TableHead className="text-right">اعضاء الفريق</TableHead>
                                        <TableHead className="text-center">الحالة</TableHead>
                                        <TableHead className="text-center">إجراءات</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {roles.map((role) => {
                                        const RoleIcon = role.icon;
                                        return (
                                            <TableRow key={role.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-11 h-11 rounded-lg ${role.bgColor} flex items-center justify-center`}>
                                                            <RoleIcon size={22} className={role.color} />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-slate-900">{role.name}</p>
                                                            <p className="text-xs text-slate-500">{role.department}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        {role.members.map((av, i) => (
                                                            <Avatar key={i} className={`h-8 w-8 border-2 border-white ${i > 0 ? '-mr-2' : ''}`}>
                                                                <AvatarImage src={av} />
                                                            </Avatar>
                                                        ))}
                                                        <Badge variant="secondary" className="mr-2 bg-slate-100 text-slate-600">
                                                            +{role.extraMembers}
                                                        </Badge>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
                                                        نشط
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-600 hover:bg-amber-50">
                                                            <RotateCcw size={16} />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50">
                                                            <Edit size={16} />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50">
                                                            <Trash2 size={16} />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Add Employee Modal */}
            <Dialog open={showAddEmployeeModal} onOpenChange={setShowAddEmployeeModal}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>إضافة موظف جديد</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">الاسم الكامل</Label>
                            <Input id="name" placeholder="أدخل اسم الموظف" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">البريد الإلكتروني</Label>
                            <Input id="email" type="email" placeholder="example@email.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">رقم الهاتف</Label>
                            <Input id="phone" type="tel" placeholder="+20 XXX XXX XXXX" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">الدور الوظيفي</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="اختر الدور" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="manager">مدير المتجر</SelectItem>
                                    <SelectItem value="sales">مسؤول المبيعات</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAddEmployeeModal(false)}>إلغاء</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">إضافة</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Add Role Modal */}
            <Dialog open={showAddRoleModal} onOpenChange={setShowAddRoleModal}>
                <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>إنشاء دور جديد</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">بيانات الدور</h3>
                                <p className="text-sm text-slate-600 mb-4">قم بتعريف اسم الدور الجديد ليتم تعيينه للموظفين لاحقا</p>
                                <div className="space-y-2">
                                    <Label htmlFor="roleName">اسم الدور الوظيفي</Label>
                                    <Input id="roleName" placeholder="مثال: مدير المنتاج" />
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="text-lg font-semibold mb-2">تكوين الصلاحيات</h3>
                                <p className="text-sm text-slate-600 mb-4">حدد مستوى الوصول المسموح به لهذا الدور لكل صفحة من صفحات النظام.</p>
                                <div className="space-y-3">
                                    {dashboardPages.map((page) => {
                                        const Icon = page.icon;
                                        const level = rolePermissions[page.id];
                                        return (
                                            <div key={page.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                                                        <Icon size={18} className="text-slate-600" />
                                                    </div>
                                                    <span className="font-medium text-sm">{page.name}</span>
                                                </div>
                                                <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
                                                    <Button
                                                        onClick={() => setPermissionLevel(page.id, PERMISSION_LEVELS.HIDDEN)}
                                                        variant="ghost"
                                                        size="sm"
                                                        className={`gap-1 ${level === PERMISSION_LEVELS.HIDDEN ? 'bg-blue-600 text-white hover:bg-blue-700 hover:text-white' : ''}`}
                                                    >
                                                        {level === PERMISSION_LEVELS.HIDDEN && <Check size={14} />}
                                                        مخفي
                                                    </Button>
                                                    <Button
                                                        onClick={() => setPermissionLevel(page.id, PERMISSION_LEVELS.VIEW_ONLY)}
                                                        variant="ghost"
                                                        size="sm"
                                                        className={`gap-1 ${level === PERMISSION_LEVELS.VIEW_ONLY ? 'bg-blue-600 text-white hover:bg-blue-700 hover:text-white' : ''}`}
                                                    >
                                                        {level === PERMISSION_LEVELS.VIEW_ONLY && <Check size={14} />}
                                                        عرض فقط
                                                    </Button>
                                                    <Button
                                                        onClick={() => setPermissionLevel(page.id, PERMISSION_LEVELS.ADMIN)}
                                                        variant="ghost"
                                                        size="sm"
                                                        className={`gap-1 ${level === PERMISSION_LEVELS.ADMIN ? 'bg-blue-600 text-white hover:bg-blue-700 hover:text-white' : ''}`}
                                                    >
                                                        {level === PERMISSION_LEVELS.ADMIN && <Check size={14} />}
                                                        مدير
                                                    </Button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAddRoleModal(false)}>إلغاء</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">حفظ الدور</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
