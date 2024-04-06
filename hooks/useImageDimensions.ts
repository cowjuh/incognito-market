import { useEffect, useState } from 'react';
import { parseJson } from 'utils/prisma/prismaUtils';
import { getImageDimensions } from 'utils/imageUtils';

const useImageDimensions = (featuredItems) => {
    const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }[]>([]);

    useEffect(() => {
        Promise.all(
            featuredItems.flatMap(item =>
                parseJson<Array<any>>(item.images).map(image => getImageDimensions(image))
            )
        ).then(setImageDimensions);
    }, [featuredItems]);

    return imageDimensions;
};

export default useImageDimensions;