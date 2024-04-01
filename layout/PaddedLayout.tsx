import { ReactNode } from "react";

const PaddedLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="p-4 w-full h-full flex flex-col">
            {children}
        </div>
    )
}

export default PaddedLayout;