import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PaddedLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode
}

const PaddedLayout: React.FC<PaddedLayoutProps> = ({ children, className, ...props }) => {
    return (
        <div className={cn("p-4 w-full flex-grow flex flex-col", className)} {...props}>
            {children}
        </div>
    )
}

export default PaddedLayout;