import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import Header from './Header';

export default function DashboardLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:px-8 lg:py-6 bg-muted/40">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
