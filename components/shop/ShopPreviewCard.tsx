import { useRouter } from 'next/router';
import Avatar from '@/Avatar';
import { ShopWithRelations } from 'pages/api/shop';
import Image from 'next/image';
import { Prisma } from '@prisma/client';
import { parseJson } from 'utils/prisma/prismaUtils';
import { SewingPinIcon } from '@radix-ui/react-icons';

interface ShopPreviewCardProps {
    shop: ShopWithRelations;
}

const ShopPreviewCard: React.FC<ShopPreviewCardProps> = ({ shop }) => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/shop/${shop.id}`)}
            key={shop.id}
            className="rounded-lg border flex flex-col gap-4 py-4 cursor-pointer w-[300px] overflow-hidden justify-between hover:border-neutral-400 transition-all"
        >
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-2 px-4'>
                    <Avatar src={shop.profilePicture || undefined} alt="Picture of the author" />
                    <div className='flex flex-col'>
                        <span>{shop.name}</span>
                        <span className='text-neutral-400'>@{shop.username}</span>
                    </div>
                </div>
                {shop.featuredItems && shop.featuredItems.map((item, i) => {
                    return (
                        <div className='flex items-center gap-2 overflow-x-scroll hide-scrollbar' key={i}>
                            {parseJson<Array<any>>(item.images).length > 0 && parseJson<Array<any>>(item.images).map((image, i) => {
                                return (
                                    <Image
                                        key={i}
                                        src={image}
                                        alt={image.alt}
                                        width={500}
                                        height={500}
                                        className='h-48 w-auto'
                                    />
                                )
                            })}
                        </div>
                    )
                })}
                {shop.featuredItems.length === 0 &&
                    <div className="bg-neutral-200 min-h-48 w-full" />
                }
            </div>
            <div className='px-4'>
                {shop.bio && <p>{shop.bio}</p>}
                {!shop.bio && <p className='text-neutral-400'>No bio</p>}
            </div>
            <div className='px-4 flex flex-col gap-2'>
                <div className='flex items-center gap-1 text-neutral-400 text-xs'>
                    <SewingPinIcon className='w-3 h-3' />
                    {shop.city}
                </div>
            </div>
        </div>
    );
};

export default ShopPreviewCard;