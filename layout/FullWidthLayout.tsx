import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FullWidthLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode
}

const FullWidthLayout: React.FC<FullWidthLayoutProps> = ({ children, className, ...props }) => {
    return (
        <div className={cn("w-full flex-grow h-full flex flex-col", className)} {...props}>
            {children}
        </div>
    )
}

export default FullWidthLayout;