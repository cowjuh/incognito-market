import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/ui/dialog";
import { SelectSeparator } from "@/ui/select";
import { Separator } from "@/ui/separator";
import { CropIcon } from "@radix-ui/react-icons";
import { useState, useRef } from "react";
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop, PercentCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

interface ImageCropDialogProps {
    src: string;
    onSave: (blob: Blob) => void;
}

const ImageCropDialog: React.FC<ImageCropDialogProps> = ({ src, onSave }) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const imgRef = useRef<HTMLImageElement>(null);
    const [crop, setCrop] = useState<Crop>({
        unit: '%',
        width: 50,
        height: 50,
        x: 25,
        y: 25
    });
    const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);

    const onImageLoad = (e) => {
        const { naturalWidth: width, naturalHeight: height } = e.currentTarget

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
        )

        setCrop(newCrop)
    }

    const onCropChange = (crop, percentCrop) => setCrop(percentCrop)

    const onCropComplete = (crop: PixelCrop, percentageCrop: PercentCrop) => {
        setCompletedCrop(crop);
    }

    const getCroppedImg = async (): Promise<Blob | null> => {
        if (!imgRef.current || !completedCrop) {
            return null;
        }

        const image = imgRef.current;
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = completedCrop.width;
        canvas.height = completedCrop.height;
        const ctx = canvas.getContext('2d');

        ctx?.drawImage(
            image,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            completedCrop.width,
            completedCrop.height
        )

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('Canvas is empty'))
                    return
                }
                resolve(blob)
            }, 'image/jpeg')
        })
    }

    const handleSave = async () => {
        const croppedImageBlob = await getCroppedImg();
        if (croppedImageBlob && onSave) {
            onSave(croppedImageBlob);
            setDialogOpen(false);
        }
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger className="flex items-center gap-2">
                <CropIcon className="w-4 h-4" />
                Crop
            </DialogTrigger>
            <DialogContent className="p-0 flex flex-col items-center gap-0" hideCloseIcon>
                <DialogHeader />
                <div className="w-full flex items-center justify-center p-4">
                    <ReactCrop crop={crop} onChange={onCropChange} onComplete={onCropComplete} aspect={1} keepSelection={true}>
                        <img ref={imgRef} src={src} alt="Image to crop" onLoad={onImageLoad} className="h-80 w-auto rounded-sm" />
                    </ReactCrop>
                </div>
                <Separator />
                <DialogFooter className="w-full flex">
                    <div className="p-4 flex flex-row items-center justify-between flex-grow">
                        <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ImageCropDialog;