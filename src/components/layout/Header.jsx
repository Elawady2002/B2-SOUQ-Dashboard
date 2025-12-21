import { Badge } from 'lucide-react';
import {
    Search,
    Moon,
    Globe,
    ShoppingCart,
    Settings,
    Bell,
    User,
    Menu
} from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Avatar from '../../assets/image/avater.png';

export default function Header() {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 sticky top-0 z-10">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
            </div>

            <div className="flex flex-1 items-center gap-4 md:gap-6">
                {/* Search */}
                <div className="relative flex-1 max-w-md hidden md:flex">
                    <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="ابحث عن شيء..."
                        className="w-full rounded-full bg-background pr-8 pl-4 md:w-[300px] lg:w-[400px]"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                {/* Mobile Search Trigger (Optional - can add if needed) */}

                {/* Language */}
                <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Globe className="h-5 w-5" />
                    <span className="sr-only">اللغة</span>
                </Button>

                {/* Night Mode */}
                <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Moon className="h-5 w-5" />
                    <span className="sr-only">الوضع الليلي</span>
                </Button>

                {/* Shopping Cart */}
                <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
                        9
                    </span>
                    <span className="sr-only">السلة</span>
                </Button>

                {/* Profile */}
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full overflow-hidden">
                    <img
                        src={Avatar}
                        alt="Profile"
                        className="h-full w-full object-cover"
                    />
                </Button>

                {/* Settings */}
                <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">الإعدادات</span>
                </Button>
            </div>
        </header>
    );
}
