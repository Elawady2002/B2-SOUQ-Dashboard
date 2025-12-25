import { Badge } from 'lucide-react';
import {
    Search,
    Globe,
    Bell,
    User,
    Menu,
    ShieldCheck
} from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminHeader() {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4 sticky top-0 z-10 shadow-sm">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
            </div>

            <div className="flex flex-1 items-center gap-4 md:gap-6">
                {/* Search */}
                <div className="relative flex-1 max-w-md hidden md:flex">
                    <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        type="search"
                        placeholder="ابحث في النظام..."
                        className="w-full rounded-full bg-slate-50 border-slate-200 pr-8 pl-4 md:w-[300px] lg:w-[400px] focus:ring-blue-200 focus:border-blue-400"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4 ml-4 mr-4">
                <div className="hidden md:flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    <ShieldCheck size={14} className="text-blue-600" />
                    <span className="text-xs font-semibold text-blue-700">Admin Access</span>
                </div>

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="h-9 w-9 relative text-slate-500 hover:text-slate-700 hover:bg-slate-100">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 border-2 border-white animate-pulse"></span>
                    <span className="sr-only">الإشعارات</span>
                </Button>

                {/* Profile */}
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-slate-900 text-white hover:bg-slate-800 flex items-center justify-center">
                    <User size={18} />
                </Button>
            </div>
        </header >
    );
}
