import { useRouter } from 'next/router';
import { Shop as TShop } from '@prisma/client';
import Avatar from '@/Avatar';

interface ShopPreviewCardProps {
    shop: TShop;
}

const ShopPreviewCard: React.FC<ShopPreviewCardProps> = ({ shop }) => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/shop/${shop.id}`)}
            key={shop.id}
            className="border rounded-md flex flex-col gap-2 p-2 cursor-pointer w-[250px] "
        >
            <Avatar src={shop.profilePicture || undefined} alt="Picture of the author" />
            <span>{shop.name}</span>
            <p>{shop.bio}</p>
        </div>
    );
};

export default ShopPreviewCard;