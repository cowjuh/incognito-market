import { ReactNode, HTMLAttributes } from "react";
import Header from "@/Header";
import Footer from "@/Footer";

interface MainLayoutProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, ...props }) => {
    return (
        <div className={"min-h-[calc(100vh)] h-[calc(100vh)] flex flex-col"} {...props}>
            <Header />
            <div className="w-full flex flex-col flex-grow h-full">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;