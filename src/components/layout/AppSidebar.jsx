import * as React from "react"
import {
    Home,
    Store,
    Users,
    Package,
    Truck,
    RotateCcw,
    Megaphone,
    ChartBar,
    FileText,
    Settings,
    UserCog,
    Headset,
    HelpCircle,
    Activity,
    LogOut,
    Tag,
    Wallet,
    MessageSquare,
    Star
} from "lucide-react"
import { useLanguage } from "../../contexts/LanguageContext"
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
    SidebarMenuBadge,
    SidebarRail,
    SidebarSeparator,
    useSidebar,
} from "@/components/ui/sidebar"
import LogoFull from '../../assets/image/logo2.svg';
import LogoSmall from '../../assets/image/logo.svg';

export function AppSidebar({ ...props }) {
    const { t } = useLanguage()
    const location = useLocation()
    const navigate = useNavigate()
    const { state, setOpen } = useSidebar()

    const mainNavItems = [
        { icon: Home, labelKey: 'nav.home', path: '/' },
        { icon: UserCog, labelKey: 'nav.sellerProfile', path: '/seller-profile' },
        { icon: Store, labelKey: 'nav.storeProfile', path: '/store-profile' },
        { icon: Package, labelKey: 'nav.products', path: '/products', badge: 3 },
        { icon: Truck, labelKey: 'nav.orders', path: '/orders', badge: 12 },
        { icon: Tag, labelKey: 'nav.inventory', path: '/inventory' },
        { icon: RotateCcw, labelKey: 'nav.returns', path: '/returns' },
    ]

    const marketingNavItems = [
        { icon: Megaphone, labelKey: 'nav.campaigns', path: '/campaigns' },
        { icon: ChartBar, labelKey: 'nav.ads', path: '/ads' },
        { icon: FileText, labelKey: 'nav.reports', path: '/reports' },
    ]

    const settingsNavItems = [
        { icon: Users, labelKey: 'nav.employees', path: '/employees' },
        { icon: Activity, labelKey: 'nav.activityLog', path: '/activity-log' },
        { icon: MessageSquare, labelKey: 'nav.messages', path: '/messages' },
        { icon: Star, labelKey: 'nav.reviews', path: '/reviews' },
    ]

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('sellerData');
        navigate('/login', { replace: true });
    }

    return (
        <Sidebar
            collapsible="icon"
            {...props}
            onMouseEnter={() => state !== 'expanded' && setOpen(true)}
            onMouseLeave={() => state === 'expanded' && setOpen(false)}
        >
            <SidebarHeader>
                <div className="flex items-center justify-center py-2 h-12">
                    {state === "expanded" ? (
                        <img src={LogoFull} alt="B2 SOUQ" className="h-6 w-auto transition-all" />
                    ) : (
                        <img src={LogoSmall} alt="B2" className="h-6 w-auto transition-all" />
                    )}
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>{t('nav.mainMenu')}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainNavItems.map((item) => (
                                <SidebarMenuItem key={item.path}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={location.pathname === item.path}
                                        tooltip={t(item.labelKey)}
                                    >
                                        <NavLink to={item.path}>
                                            <item.icon />
                                            <span>{t(item.labelKey)}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                    {item.badge && (
                                        <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator />

                <SidebarGroup>
                    <SidebarGroupLabel>{t('nav.marketing')}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {marketingNavItems.map((item) => (
                                <SidebarMenuItem key={item.path}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={location.pathname === item.path}
                                        tooltip={t(item.labelKey)}
                                    >
                                        <NavLink to={item.path}>
                                            <item.icon />
                                            <span>{t(item.labelKey)}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator />

                <SidebarGroup>
                    <SidebarGroupLabel>{t('nav.settings')}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {settingsNavItems.map((item) => (
                                <SidebarMenuItem key={item.path}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={location.pathname === item.path}
                                        tooltip={t(item.labelKey)}
                                    >
                                        <NavLink to={item.path}>
                                            <item.icon />
                                            <span>{t(item.labelKey)}</span>
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
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            tooltip={t('nav.logout')}
                        >
                            <LogOut />
                            <span>{t('nav.logout')}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
