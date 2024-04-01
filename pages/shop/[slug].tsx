import { useRouter } from "next/router";
import { useShop } from "../../hooks/useShop";
import Image from "next/image";
import MainLayout from "../../layout/MainLayout";
import { ReactNode } from "react";
import { NextPageWithLayout } from "../../layout/NextPageWithLayout";
import PaddedLayout from "../../layout/PaddedLayout";

const ShopPage: NextPageWithLayout = () => {
    const router = useRouter();
    const { slug } = router.query;
    const { shop } = useShop(slug as string);

    return (
        <div>
            <h1>Shop: {slug}</h1>
            {shop &&
                <div>
                    <h2>{shop.name}</h2>
                    <p>{shop.bio}</p>
                    <p>{shop.email}</p>
                    <Image src={shop.profilePicture} alt="Picture of the author" width={500} height={500} className="w-20 h-auto" />
                </div>
            }
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