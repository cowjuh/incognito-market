import { useRouter } from "next/router";
import { useShop } from "../../hooks/useShop";
import MainLayout from "../../layout/MainLayout";
import { ReactNode } from "react";
import { NextPageWithLayout } from "../../layout/NextPageWithLayout";
import PaddedLayout from "../../layout/PaddedLayout";
import Link from "next/link";
import Avatar from "@/Avatar";

const ShopPage: NextPageWithLayout = () => {
    const router = useRouter();
    const { slug } = router.query;
    const { shop } = useShop(slug as string);

    return (
        <div className="flex w-full h-full divide-x">
            <div className="w-[20%] max-w-[400px] flex flex-col gap-4 flex-grow">
                <Link href={`/`}>
                    Back
                </Link>
                {shop &&
                    <div className="flex flex-col gap-4">
                        <Avatar src={shop.profilePicture} alt="Picture of the author" className="h-20 w-20" />
                        <h2 className="text-lg">{shop.name}</h2>
                        <p>{shop.bio}</p>
                        <p>{shop.email}</p>
                    </div>
                }
            </div>
            <div className="p-4">main content</div>
        </div>
    );
}

ShopPage.getLayout = function getLayout(page: ReactNode) {
    return (
        <MainLayout>
            <PaddedLayout>
                {page}
            </PaddedLayout>
        </MainLayout>
    )
}

export default ShopPage;