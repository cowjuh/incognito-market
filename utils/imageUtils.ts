export async function getImageDimensions(url: string): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.onerror = reject;
        img.src = url;
    });
}

type ImageDimensions = {
    width: number;
    height: number;
};

export const getCarouselFlexBasisPx = (imageDimensions: ImageDimensions, carouselHeight: number) => {
    const aspectRatio = imageDimensions.width / imageDimensions.height;
    const imageWidth = aspectRatio * carouselHeight;
    return imageWidth;
};