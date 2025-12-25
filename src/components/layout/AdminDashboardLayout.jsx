import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import AdminHeader from './AdminHeader';

export default function AdminDashboardLayout() {
    return (
        <SidebarProvider>
            <AdminSidebar />
            <SidebarInset>
                <AdminHeader />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:px-8 lg:py-6 bg-slate-50">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
