import { useRouter } from 'next/router';
import Avatar from '@/Avatar';
import { ShopWithRelations } from 'pages/api/shop';
import NextImage from 'next/image';
import { parseJson } from 'utils/prisma/prismaUtils';
import { ExternalLinkIcon, GearIcon, Pencil1Icon, SewingPinIcon } from '@radix-ui/react-icons';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/ui/carousel";
import { useEffect, useRef, useState } from 'react';
import useImageDimensions from 'hooks/useImageDimensions';
import { getCarouselFlexBasisPx } from 'utils/imageUtils';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

interface ShopPreviewCardProps {
    shop: ShopWithRelations;
    isVendorView?: boolean;
}

const ShopPreviewCard: React.FC<ShopPreviewCardProps> = ({ shop, isVendorView }) => {
    const router = useRouter();
    const imageDimensions = useImageDimensions(shop.featuredItems);
    const [carouselHeight, setCarouselHeight] = useState(0);
    const carouselRef = useRef(null);
    const [isHoveringFooter, setIsHoveringFooter] = useState(false);

    useEffect(() => {
        if (carouselRef.current) {
            setCarouselHeight(carouselRef.current.offsetHeight);
        }
    }, []);

    const handleVisit = () => {
        router.push(`/shop/${shop.id}`);
    }

    const handleEdit = () => {
        router.push(`/vendor/edit/${shop.id}`);
    }

    return (
        <div
            onClick={handleVisit}
            key={shop.id}
            onMouseEnter={() => setIsHoveringFooter(true)}
            onMouseLeave={() => setIsHoveringFooter(false)}
            className={cn(
                "rounded-lg border flex flex-col py-0 cursor-pointer w-[300px] justify-between hover:border-neutral-400 transition-all",
                isVendorView && 'hover:border-inherit cursor-default'
            )}
        >
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-2 px-4 pt-4'>
                    <Avatar src={shop.profilePicture || undefined} alt="Picture of the author" />
                    <div className='flex flex-col'>
                        <span>{shop.name}</span>
                        <span className='text-neutral-400'>@{shop.username}</span>
                    </div>
                </div>
                {imageDimensions && shop.featuredItems.map((item, itemIndex) => (
                    <Carousel key={itemIndex} className="w-full h-48"
                        opts={{
                            align: 'center',
                        }}>
                        <CarouselContent
                            ref={carouselRef}
                            className="flex -ml-1 h-48">
                            {parseJson<Array<any>>(item.images).map((image, imageIndex) => {
                                if (!imageDimensions[imageIndex]) return null;
                                const flexBasis = getCarouselFlexBasisPx(imageDimensions[imageIndex], carouselHeight);
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
            <div className='flex flex-col gap-2 relative overflow-hidden h-24 pb-4'>
                <AnimatePresence>
                    {!(isVendorView && isHoveringFooter) &&
                        <motion.div
                            key={`bio-${shop.id}`}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 flex flex-col justify-center gap-2"
                        >
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
                        </motion.div>
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {isVendorView && isHoveringFooter &&
                        <motion.div
                            key={`actions-${shop.id}`}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 flex justify-center items-center gap-2 bg-neutral-100"
                        >
                            <motion.div
                                onClick={handleVisit}
                                className='bg-neutral-200 bg-opacity-50 hover:bg-opacity-100 p-2 px-3 rounded-full flex gap-1 items-center text-sm transition-all cursor-pointer'>
                                <ExternalLinkIcon className='w-4 h-4' />
                                <span>Visit</span>
                            </motion.div>
                            <motion.div
                                onClick={handleEdit}
                                className='bg-neutral-200 bg-opacity-50 hover:bg-opacity-100 p-2 px-3 rounded-full flex gap-1 items-center text-sm transition-all cursor-pointer'>
                                <GearIcon className='w-4 h-4' />
                                <span>Manage</span>
                            </motion.div>
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ShopPreviewCard;