import { Dialog, DialogContent, DialogTrigger } from "@/ui/dialog";
import UpdateEditorForm from "./UpdateEditorForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FormMode } from "types/form";
import { Update } from "@prisma/client";

interface CreateUpdateDialogProps {
    shopId: string;
    mode: FormMode;
    initialUpdateObj?: Update;
    children: React.ReactNode;
}

const CreateUpdateDialog: React.FC<CreateUpdateDialogProps> = ({ shopId, mode, initialUpdateObj, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleCancel = () => {
        setIsOpen(false);
    }

    const handleOnSuccess = () => {
        setIsOpen(false);
        router.reload(); // TODO: Use React Query to refetch the data
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
                <UpdateEditorForm shopId={shopId} onCancel={handleCancel} onSuccess={handleOnSuccess} mode={mode} initialUpdateObj={initialUpdateObj} />
            </DialogContent>
        </Dialog>
    )
};

export default CreateUpdateDialog;
