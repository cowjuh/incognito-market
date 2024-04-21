import { Shop } from "@prisma/client";
import NavLink from '@/shared/NavLink';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/ui/select";
import { useUserShops } from "hooks/useUserShops";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Avatar from "@/Avatar";

interface ShopSettingsSidebarProps {
    activeShop: Shop;
}

export default function ShopSettingsSidebar({ activeShop }: ShopSettingsSidebarProps) {
    const { data: session } = useSession();
    const { shops, loading: shopsLoading } = useUserShops(session?.user?.id);
    const router = useRouter();

    const handleOnShopChange = (shopId: string) => {
        const basePath = router.asPath.slice(0, router.asPath.lastIndexOf('/') + 1);
        router.push(`${basePath}${shopId}`);
    };

    return (
        <nav className="flex flex-col gap-4 text-sm text-muted-foreground flex-grow max-w-[400px] min-w-[250px] p-4">
            <Select onValueChange={handleOnShopChange}>
                <SelectTrigger>
                    <div className="flex items-center gap-2 h-7">
                        <Avatar src={activeShop.profilePicture} alt={activeShop.name} className="w-5 h-5" />
                        <SelectValue placeholder={activeShop.name} >
                            {activeShop.name}
                        </SelectValue>
                    </div>
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
            <NavLink href={`/vendor/shop/dashboard/${activeShop.id}`}>Dashboard</NavLink>
            <NavLink href={`/vendor/shop/updates/${activeShop.id}`} >Updates</NavLink>
            <NavLink href={`/vendor/shop/events/${activeShop.id}`} isDisabled>Events</NavLink>
            <NavLink href="/vendor/shop/team" isDisabled>Team</NavLink>
        </nav>
    );
}