import { UserIcon } from "@heroicons/react/24/outline"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Button } from "./ui/button"
import Link from "next/link"
import { Shop } from "@prisma/client"

interface ShopOwnerBannerProps {
    shop: Shop
}

const ShopOwnerBanner = ({ shop }: ShopOwnerBannerProps) => {
    return <Alert className="flex items-center justify-between rounded-none bg-neutral-50 bg-opacity-60 border-t-0">
        <AlertTitle className="text-sm font-medium flex items-center gap-2">
            <UserIcon className="h-4 w-4" />
            You are the owner of this shop
        </AlertTitle>
        <AlertDescription>
            <Link href={`/vendor/shop/dashboard/${shop.id}`}>
                <Button>Manage</Button>
            </Link>
        </AlertDescription>
    </Alert>
}

export default ShopOwnerBanner

