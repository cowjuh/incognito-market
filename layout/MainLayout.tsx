import { ReactNode } from "react"
import Header from "@/Header";
import Footer from "@/Footer";

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className={"min-h-[calc(100vh)] flex flex-col"}>
            <Header />
            <div className="flex-grow w-full">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout;
