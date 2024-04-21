import { Dialog, DialogContent, DialogTrigger } from "@/ui/dialog";
import CreateUpdateForm from "./CreateUpdateForm";
import { Button } from "@/ui/button";
import { useState } from "react";
import UpdateCard from "@/shop/UpdateCard";

interface CreateUpdateDialogProps {
    shopId: string;
}

const CreateUpdateDialog: React.FC<CreateUpdateDialogProps> = ({ shopId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleCancel = () => {
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    Create Update
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
                <CreateUpdateForm shopId={shopId} onCancel={handleCancel} />
            </DialogContent>
        </Dialog>
    )
};

export default CreateUpdateDialog;
