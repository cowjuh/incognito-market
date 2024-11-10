import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Separator } from "@/ui/separator";
import { useState, useRef, useEffect } from "react";
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop, PercentCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

interface ImageCropDialogProps {
    src: string;
    onSave: (blob: Blob) => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const ImageCropDialog: React.FC<ImageCropDialogProps> = ({ src, onSave, open, onOpenChange }) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const [crop, setCrop] = useState<Crop>({
        unit: '%',
        width: 50,
        height: 50,
        x: 25,
        y: 25
    });
    const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
    const [imgDimensions, setImgDimensions] = useState<{ width: number; height: number } | null>(null);

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
        
        // Store the actual displayed dimensions
        setImgDimensions({
            width: e.currentTarget.width,
            height: e.currentTarget.height
        });

        const newCrop = centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 90,
                },
                1,
                width,
                height
            ),
            width,
            height
        );

        setCrop(newCrop);

        // Calculate initial pixel crop based on the displayed image dimensions
        const pixelCrop: PixelCrop = {
            unit: 'px',
            x: (newCrop.x * e.currentTarget.width) / 100,
            y: (newCrop.y * e.currentTarget.height) / 100,
            width: (newCrop.width * e.currentTarget.width) / 100,
            height: (newCrop.height * e.currentTarget.height) / 100
        };

        setCompletedCrop(pixelCrop);
    }

    const onCropChange = (crop: Crop, percentCrop: PercentCrop) => {
        setCrop(percentCrop);
    }

    const onCropComplete = (crop: PixelCrop, percentageCrop: PercentCrop) => {
        setCompletedCrop(crop);
    }

    useEffect(() => {
        if (!open) {
            setCompletedCrop(null);
            setImgDimensions(null);
        }
    }, [open]);

    const getCroppedImg = async (): Promise<Blob | null> => {
        if (!imgRef.current || !completedCrop || !imgDimensions) {
            return null;
        }

        const image = imgRef.current;
        const canvas = document.createElement('canvas');
        
        // Calculate scaling factor between natural and displayed image sizes
        const scaleX = image.naturalWidth / imgDimensions.width;
        const scaleY = image.naturalHeight / imgDimensions.height;

        // Set canvas dimensions to the cropped size scaled to original image dimensions
        canvas.width = completedCrop.width * scaleX;
        canvas.height = completedCrop.height * scaleY;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return null;
        }

        // Set rendering quality
        ctx.imageSmoothingQuality = 'high';

        // Draw the cropped portion
        ctx.drawImage(
            image,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY
        );

        // Convert to blob
        return new Promise((resolve, reject) => {
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(new Error('Canvas is empty'));
                        return;
                    }
                    resolve(blob);
                },
                'image/jpeg',
                1
            );
        });
    };

    const handleSave = async () => {
        const croppedImageBlob = await getCroppedImg();
        if (croppedImageBlob && onSave) {
            onSave(croppedImageBlob);
            onOpenChange(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="p-0 flex flex-col items-center gap-0" hideCloseIcon>
                <DialogHeader />
                <div className="w-full flex items-center justify-center p-4">
                    <ReactCrop 
                        crop={crop} 
                        onChange={onCropChange} 
                        onComplete={onCropComplete} 
                        aspect={1} 
                        keepSelection={true}
                        minWidth={100}
                    >
                        <img 
                            ref={imgRef} 
                            src={src} 
                            alt="Image to crop" 
                            onLoad={onImageLoad} 
                            className="h-80 w-auto rounded-sm" 
                            crossOrigin="anonymous"
                        />
                    </ReactCrop>
                </div>
                <Separator />
                <DialogFooter className="w-full flex">
                    <div className="p-4 flex flex-row items-center justify-between flex-grow">
                        <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ImageCropDialog;