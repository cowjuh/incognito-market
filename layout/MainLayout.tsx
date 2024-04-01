import { ReactNode } from "react"
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className={"min-h-[calc(100vh)] flex flex-col bg-pink-50"}>
            <Header />
            <div className="flex-grow w-full">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout;
