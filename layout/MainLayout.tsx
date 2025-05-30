import { ReactNode, HTMLAttributes } from "react";
import Header from "@/Header";
import Footer from "@/Footer";
import { cn } from "@/lib/utils";

interface MainLayoutProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, className, ...props }) => {
    return (
        <div className={cn("min-h-[calc(100vh)] h-full flex flex-col bg-neutral-100", className)} {...props}>
            <Header />
            <div className="w-full flex flex-col flex-grow h-full">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;