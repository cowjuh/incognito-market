import { ReactNode, HTMLAttributes } from "react";
import Header from "@/Header";
import Footer from "@/Footer";
import { cn } from "@/lib/utils";
import { Alert } from "@/ui/alert";

interface MainLayoutProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, className, ...props }) => {
    return (
        <div className={cn("min-h-[calc(100vh)] h-full flex flex-col bg-neutral-100", className)} {...props}>
            <Alert className="rounded-none border-t-0 border-b bg-neutral-50 text-neutral-500">
                This app is still a work in progress! Lots of things are hardcoded to give you a preview of the final product.
            </Alert>
            <Header />
            <div className="w-full flex flex-col flex-grow h-full">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;