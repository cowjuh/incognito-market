import { Shop } from "@prisma/client";
import NavLink from '@/shared/NavLink';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/ui/select";
import { useUserShops } from "hooks/useUserShops";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Avatar from "@/Avatar";
import { Skeleton } from "@/ui/skeleton";

interface ShopSettingsSidebarProps {
    activeShop?: Shop;
}

export default function ShopSettingsSidebar({ activeShop }: ShopSettingsSidebarProps) {
    const { data: session } = useSession();
    const { shops, loading: shopsLoading } = useUserShops(session?.user?.id);
    const router = useRouter();

    const handleOnShopChange = (shopId: string) => {
        const basePath = router.asPath.slice(0, router.asPath.lastIndexOf('/') + 1);
        router.push(`${basePath}${shopId}`);
    };

    const isLinkDisabled = !shops.length || shopsLoading || !activeShop;

    return (
        <nav className="flex flex-col gap-4 text-sm text-muted-foreground flex-grow max-w-[400px] min-w-[250px] p-4">
            {/* Shop selector - show even if activeShop isn't loaded yet */}
            <Select 
                onValueChange={handleOnShopChange} 
                value={activeShop?.id} 
                disabled={!shops.length}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select a shop">
                        {activeShop && (
                            <div className="flex items-center gap-2 h-7">
                                <Avatar src={activeShop.profilePicture} alt={activeShop.name} className="w-5 h-5" />
                                {activeShop.name}
                            </div>
                        )}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Select a shop</SelectLabel>
                        {shops.map((shop) => (
                            <SelectItem key={shop.id} value={shop.id}>
                                <div className="flex items-center gap-2 h-7">
                                    <Avatar src={shop.profilePicture} alt={shop.name} className="w-5 h-5" />
                                    {shop.name}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            {/* Navigation links - disabled if no active shop */}
            <NavLink 
                href={activeShop ? `/vendor/shop/dashboard/${activeShop.id}` : "#"}
                isDisabled={isLinkDisabled}
            >
                Dashboard
            </NavLink>
            <NavLink 
                href={activeShop ? `/vendor/shop/details/${activeShop.id}` : "#"}
                isDisabled={isLinkDisabled}
            >
                Details
            </NavLink>
            <NavLink 
                href={activeShop ? `/vendor/shop/updates/${activeShop.id}` : "#"}
                isDisabled={isLinkDisabled}
            >
                Updates
            </NavLink>
            <NavLink 
                href={activeShop ? `/vendor/shop/members/${activeShop.id}` : "#"}
                isDisabled={isLinkDisabled}
            >
                Members
            </NavLink>
            <NavLink 
                href={activeShop ? `/vendor/shop/events/${activeShop.id}` : "#"}
                isDisabled
                isComingSoon
            >
                Events
            </NavLink>
        </nav>
    );
}