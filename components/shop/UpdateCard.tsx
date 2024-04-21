import React from 'react';
import { Button } from "@/ui/button";
import { formatPostedAt } from "utils/stringUtils";
import { cn } from "@/lib/utils";
import CreateUpdateDialog from '@/vendor/updates/CreateUpdateDialog';
import { FormMode } from 'types/form';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { Update } from '@prisma/client';

interface UpdateCardProps extends React.HTMLProps<HTMLDivElement> {
    update: Update;
    shopId: string;
    isPreview?: boolean;
    isVendorView?: boolean;
}

const UpdateCard: React.FC<UpdateCardProps> = ({ update, shopId, isPreview, isVendorView, className, ...props }) => {
    return (
        <div className={cn("flex flex-col gap-2 border p-4 rounded-md relative", className)} {...props}>
            <p className="font-medium">{update.title}</p>
            <p>{update.content}</p>
            <div className="flex w-full items-center justify-between">
                <p className="text-neutral-400 text-sm">
                    {isPreview ? "Just now" : formatPostedAt(String(update.postedAt))}
                </p>
                {update.callToActionLink && update.callToActionText && (
                    <Button variant="outline" className="bg-inherit hover:bg-neutral-50">
                        {update.callToActionText}
                    </Button>
                )}
            </div>
            {isVendorView &&
                <CreateUpdateDialog shopId={shopId} mode={FormMode.EDIT} initialUpdateObj={update}>
                    <div className="absolute top-4 right-4 flex items-center justify-center w-10 h-10">
                        <Button variant="ghost" className="p-0 w-full">
                            <Pencil1Icon />
                        </Button>
                    </div>
                </CreateUpdateDialog>
            }
        </div>
    );
};

export default UpdateCard;