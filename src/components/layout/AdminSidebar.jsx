import * as React from "react"
import {
    Home,
    Store,
    Users,
    Package,
    ShoppingCart,
    ShieldCheck,
    Megaphone,
    FileText,
    Settings,
    LogOut,
    MessageSquare,
    DollarSign,
    AlertCircle
} from "lucide-react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarSeparator,
    useSidebar,
} from "@/components/ui/sidebar"
import LogoFull from '../../assets/image/logo2.svg';
import LogoSmall from '../../assets/image/logo.svg';

export function AdminSidebar({ ...props }) {
    const location = useLocation()
    const navigate = useNavigate()
    const { state, setOpen } = useSidebar()

    const mainNavItems = [
        { icon: Home, label: 'الرئيسية', path: '/admin/dashboard' },
        { icon: Store, label: 'إدارة التجار', path: '/admin/merchants' },
        { icon: Users, label: 'المستخدمين', path: '/admin/users' },
    ]

    const operationItems = [
        { icon: Package, label: 'المنتجات', path: '/admin/products' },
        { icon: ShoppingCart, label: 'الطلبات', path: '/admin/orders' },
        { icon: AlertCircle, label: 'المرتجعات', path: '/admin/returns' },
    ]

    const marketingItems = [
        { icon: Megaphone, label: 'الإعلانات', path: '/admin/ads' },
        { icon: MessageSquare, label: 'الدعم الفني', path: '/admin/support' },
        { icon: FileText, label: 'التقارير المالية', path: '/admin/reports' },
    ]

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userRole'); // Clear role
        navigate('/role-select', { replace: true });
    }

    return (
        <Sidebar
            collapsible="icon"
            {...props}
            onMouseEnter={() => state !== 'expanded' && setOpen(true)}
            onMouseLeave={() => state === 'expanded' && setOpen(false)}
            className="border-l border-slate-200"
            side="left" // RTL default
        >
            <SidebarHeader className="bg-slate-900/5 pb-4">
                <div className="flex items-center justify-center py-4 h-16">
                    {state === "expanded" ? (
                        <div className="flex flex-col items-center">
                            <img src={LogoFull} alt="B2 SOUQ" className="h-6 w-auto mb-1" />
                            <span className="text-xs font-bold text-blue-700 tracking-wider">ADMIN PANEL</span>
                        </div>
                    ) : (
                        <ShieldCheck className="h-8 w-8 text-blue-600" />
                    )}
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>لوحة القيادة</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainNavItems.map((item) => (
                                <SidebarMenuItem key={item.path}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={location.pathname === item.path}
                                        tooltip={item.label}
                                        className="hover:bg-blue-50 hover:text-blue-600 data-[active=true]:bg-blue-50 data-[active=true]:text-blue-600"
                                    >
                                        <NavLink to={item.path}>
                                            <item.icon />
                                            <span>{item.label}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator />

                <SidebarGroup>
                    <SidebarGroupLabel>العمليات</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {operationItems.map((item) => (
                                <SidebarMenuItem key={item.path}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={location.pathname === item.path}
                                        tooltip={item.label}
                                        className="hover:bg-blue-50 hover:text-blue-600 data-[active=true]:bg-blue-50 data-[active=true]:text-blue-600"
                                    >
                                        <NavLink to={item.path}>
                                            <item.icon />
                                            <span>{item.label}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator />

                <SidebarGroup>
                    <SidebarGroupLabel>الإدارة والدعم</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {marketingItems.map((item) => (
                                <SidebarMenuItem key={item.path}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={location.pathname === item.path}
                                        tooltip={item.label}
                                        className="hover:bg-blue-50 hover:text-blue-600 data-[active=true]:bg-blue-50 data-[active=true]:text-blue-600"
                                    >
                                        <NavLink to={item.path}>
                                            <item.icon />
                                            <span>{item.label}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={handleLogout}
                            className="text-red-500 hover:bg-red-50 hover:text-red-600"
                            tooltip="تسجيل الخروج"
                        >
                            <LogOut />
                            <span>تسجيل الخروج</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
