import React from 'react';
import { Button } from "@/ui/button";
import { formatPostedAt } from "utils/stringUtils";
import { cn } from "@/lib/utils";

interface Update {
    title: string;
    content: string;
    postedAt: Date | string;
    callToActionLink?: string;
    callToActionText?: string;
}


interface UpdateCardProps extends React.HTMLProps<HTMLDivElement> {
    update: Update;
    isPreview?: boolean;
}

const UpdateCard: React.FC<UpdateCardProps> = ({ update, isPreview, className, ...props }) => {
    return (
        <div className={cn("flex flex-col gap-2 border p-4 rounded-md", className)} {...props}>
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
        </div>
    );
};

export default UpdateCard;