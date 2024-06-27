import { ReactNode } from "react";
import { NextPageWithLayout } from "./NextPageWithLayout";
import FilterPanel from "@/FilterPanel";
import MainLayout from "./MainLayout";
import FullWidthLayout from "./FullWidthLayout";

const ShopperLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <main>
            <MainLayout>
                <FullWidthLayout className="flex flex-row divide-x flex-grow py-0">
                    <FilterPanel />
                    <div className="flex flex-col p-4 gap-2 w-full">
                        {children}
                    </div>
                </FullWidthLayout>
            </MainLayout>
        </main>
    )
}

export default ShopperLayout;

