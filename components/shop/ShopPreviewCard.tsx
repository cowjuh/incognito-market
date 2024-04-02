import { useRouter } from 'next/router';
import Avatar from '@/Avatar';
import { ShopWithRelations } from 'pages/api/shop';
import Image from 'next/image';
import { Prisma } from '@prisma/client';
import { parseJson } from 'utils/prisma/prismaUtils';

interface ShopPreviewCardProps {
    shop: ShopWithRelations;
}

const ShopPreviewCard: React.FC<ShopPreviewCardProps> = ({ shop }) => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/shop/${shop.id}`)}
            key={shop.id}
            className="border rounded-md flex flex-col gap-2 p-4 cursor-pointer w-[350px]"
        >
            <div className='flex items-center gap-2'>

                <Avatar src={shop.profilePicture || undefined} alt="Picture of the author" />
                <span>{shop.name}</span>
            </div>
            <p>{shop.bio}</p>
            {shop.featuredItems && shop.featuredItems.map((item, i) => {
                return (
                    <div className='flex items-center gap-2 overflow-x-scroll hide-scrollbar' key={i}>
                        {parseJson<Array<any>>(item.images).map((image, i) => {
                            return (
                                <Image
                                    key={i}
                                    src={image}
                                    alt={image.alt}
                                    width={100}
                                    height={100}
                                    className='h-40 w-auto'
                                />
                            )
                        })}
                    </div>
                )
            })}
        </div>
    );
};

export default ShopPreviewCard;