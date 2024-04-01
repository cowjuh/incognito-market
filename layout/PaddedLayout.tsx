import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PaddedLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode
}

const PaddedLayout: React.FC<PaddedLayoutProps> = ({ children, className, ...props }) => {
    return (
        <div className={cn("p-4 w-full h-full flex flex-col", className)}>
            {children}
        </div>
    )
}

export default PaddedLayout;