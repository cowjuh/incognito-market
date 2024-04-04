import { EntityEditorForm } from "@/vendor/entityEditor/EntityEditorForm";
import MainLayout from "layout/MainLayout";
import { NextPageWithLayout } from "layout/NextPageWithLayout";
import PaddedLayout from "layout/PaddedLayout";
import { ReactNode } from "react";

const EditorPage: NextPageWithLayout = () => {
    return (
        <div className="max-w-[700px] w-full flex flex-col gap-4">
            <h1 className="text-xl">Create Shop</h1>
            <EntityEditorForm />
        </div>
    )
}

EditorPage.getLayout = function getLayout(page: ReactNode) {
    return (
        <MainLayout>
            <PaddedLayout className="items-center">
                {page}
            </PaddedLayout>
        </MainLayout>
    )
}

export default EditorPage;