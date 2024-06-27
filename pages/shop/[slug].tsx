import { useRouter } from "next/router";
import { useShop } from "../../hooks/useShop";
import MainLayout from "../../layout/MainLayout";
import FullWidthLayout from "../../layout/FullWidthLayout";
import { ReactNode } from "react";
import { NextPageWithLayout } from "../../layout/NextPageWithLayout";
import Link from "next/link";
import Avatar from "@/Avatar";
import { Skeleton } from "@/ui/skeleton";
import { SocialMediaName } from "@prisma/client";
import { ChevronLeftIcon, InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { SiFacebook, SiTiktok } from '@icons-pack/react-simple-icons';
import Image from "next/image";
import { parseJson } from "utils/prisma/prismaUtils";
import UpdateCard from "@/shop/UpdateCard";
import ShopOwnerBanner from "@/ShopOwnerBanner";
import { useSession } from "next-auth/react";
import ShopRating from "@/rating/ShopRating";

const socialMediaIcons = {
    [SocialMediaName.INSTAGRAM]: InstagramLogoIcon,
    [SocialMediaName.FACEBOOK]: SiFacebook,
    [SocialMediaName.TWITTER]: TwitterLogoIcon,
    [SocialMediaName.TIKTOK]: SiTiktok,
};

const ShopPage: NextPageWithLayout = () => {
    const router = useRouter();
    const session = useSession();
    const { slug } = router.query;
    const { shop, loading, error } = useShop(slug as string);
    const showSkeleton = !shop || loading;

    return (
        <div className="max-w-[1500px] w-full">
            {shop && session.data?.user?.id === shop.ownerId && <ShopOwnerBanner shop={shop} />}
            <div className="p-4 pb-0 w-full">
                <Link href={`/`} className="flex items-center gap-1 text-neutral-500 hover:text-neutral-700">
                    <ChevronLeftIcon className="w-4 h-4" />
                    <span>Back</span>
                </Link>
            </div>
            <div className="flex w-full h-full gap-10">
                <div className="w-[15%] min-w-[300px] max-w-[350px] flex flex-col gap-4 flex-grow p-4">
                    {shop &&
                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col gap-2">
                                <Avatar src={shop.profilePicture} alt="Picture of the author" className="h-20 w-20" />
                                <h2 className="text-lg">{shop.name}</h2>
                                <p className="text-neutral-400">@{shop.username}</p>
                                <p>{shop.bio}</p>
                            </div>
                            <ShopRating averageRating={shop.averageRating} numberOfRatings={shop.numberOfRatings} />
                            <div className="flex flex-col gap-1">
                                <h3 className="font-medium text-neutral-400">CONTACT</h3>
                                <p>{shop.websiteLink}</p>
                                <p>{shop.email}</p>
                                <p>{shop.phoneNumber}</p>
                                <div className="flex items-center gap-2">
                                    {shop.socialMedia.map((social) => {
                                        const Icon = socialMediaIcons[social.name];
                                        return (
                                            <Link href={social.link} target="_blank" rel="noreferrer">
                                                <Icon className="w-4 h-4 text-neutral-500 hover:text-neutral-700" />
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium text-neutral-400">LOCATION</h3>
                                <p>{shop.city}</p>
                            </div>
                            <div>
                                <h3 className="font-medium text-neutral-400">FOUNDED BY</h3>
                                <p>{shop.owner.name && <p>{shop.owner.name}</p>}</p>
                            </div>
                            {shop && shop.updates && shop.updates.length > 0 &&
                                <div className="w-full flex flex-col gap-4">
                                    <h3 className="font-medium text-neutral-400">UPDATES</h3>
                                    {shop.updates.map((update) => {
                                        return (
                                            <UpdateCard update={update} shopId={shop.id} />
                                        )
                                    })}
                                </div>
                            }
                        </div>
                    }
                </div>
                <div className="p-4 flex flex-col gap-10 w-full">
                    <div className="w-full flex flex-col gap-2">
                        <h3 className="font-medium text-neutral-400">FEATURED</h3>
                        {shop && shop.featuredItems && shop.featuredItems.map((item, i) => {
                            return (
                                <div className="flex items-center gap-4 flex-wrap">
                                    {parseJson<Array<any>>(item.images).map((image, i) => {
                                        return (
                                            <div className="h-60">
                                                <Image
                                                    key={i}
                                                    src={image}
                                                    alt={image.alt}
                                                    width={1000}
                                                    height={1000}
                                                    className="h-60 w-auto"
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <h3 className="font-medium text-neutral-400">ABOUT</h3>
                        <div className="max-w-[600px]">
                            {shop && !showSkeleton && shop.description}
                            {showSkeleton &&
                                <div className="w-full flex flex-col gap-3">
                                    <Skeleton className="w-full bg-neutral-100 h-4" />
                                    <Skeleton className="w-full bg-neutral-100 h-4" />
                                    <Skeleton className="w-full bg-neutral-100 h-4" />
                                    <Skeleton className="w-[50%] bg-neutral-100 h-4" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

ShopPage.getLayout = function getLayout(page: ReactNode) {
    return (
        <MainLayout>
            <FullWidthLayout className="flex items-center">
                {page}
            </FullWidthLayout>
        </MainLayout>
    )
}

export default ShopPage;