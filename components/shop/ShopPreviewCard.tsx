import { useRouter } from 'next/router';
import Avatar from '@/Avatar';
import { ShopWithRelations } from 'pages/api/shop';
import NextImage from 'next/image';
import { parseJson } from 'utils/prisma/prismaUtils';
import { SewingPinIcon } from '@radix-ui/react-icons';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/ui/carousel";
import { useEffect, useRef, useState } from 'react';
import useImageDimensions from 'hooks/useImageDimensions';
import { getCarouselFlexBasisPx } from 'utils/imageUtils';

interface ShopPreviewCardProps {
    shop: ShopWithRelations;
}

const ShopPreviewCard: React.FC<ShopPreviewCardProps> = ({ shop }) => {
    const router = useRouter();
    const imageDimensions = useImageDimensions(shop.featuredItems);
    const [carouselHeight, setCarouselHeight] = useState(0);
    const carouselRef = useRef(null);

    useEffect(() => {
        if (carouselRef.current) {
            setCarouselHeight(carouselRef.current.offsetHeight);
        }
    }, []);

    return (
        <div
            onClick={() => router.push(`/shop/${shop.id}`)}
            key={shop.id}
            className="rounded-lg border flex flex-col gap-4 py-4 cursor-pointer w-[300px] justify-between hover:border-neutral-400 transition-all"
        >
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-2 px-4'>
                    <Avatar src={shop.profilePicture || undefined} alt="Picture of the author" />
                    <div className='flex flex-col'>
                        <span>{shop.name}</span>
                        <span className='text-neutral-400'>@{shop.username}</span>
                    </div>
                </div>
                {shop.featuredItems.map((item, itemIndex) => (
                    <Carousel key={itemIndex} className="w-full h-48"
                        opts={{
                            align: 'center',
                        }}>
                        <CarouselContent
                            ref={carouselRef}
                            className="flex -ml-1 h-48">
                            {parseJson<Array<any>>(item.images).map((image, imageIndex) => {
                                const flexBasis = getCarouselFlexBasisPx(imageDimensions[imageIndex], carouselHeight, imageIndex);
                                return (
                                    <CarouselItem key={`${itemIndex}-${imageIndex}`} style={{ flex: `0 0 ${flexBasis}px` }} className='pl-1'>
                                        <NextImage
                                            src={image}
                                            alt={image.alt}
                                            width={500}
                                            height={500}
                                            className='h-full w-auto'
                                        />
                                    </CarouselItem>
                                )
                            })}
                        </CarouselContent>
                        <CarouselPrevious className='left-4' />
                        <CarouselNext className='right-4' />
                    </Carousel>
                ))}
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