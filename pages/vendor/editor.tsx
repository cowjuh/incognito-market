import { EntityEditorForm } from "@/vendor/entityEditor/EntityEditorForm";
import MainLayout from "layout/MainLayout";
import { NextPageWithLayout } from "layout/NextPageWithLayout";
import PaddedLayout from "layout/PaddedLayout";
import { ReactNode } from "react";
import { FormMode } from "types/form";

const EditorPage: NextPageWithLayout = () => {
    return (
        <div className="max-w-[700px] w-full flex flex-col gap-8">
            <div>
                <h1 className="text-xl">Shop Editor</h1>
                <p className="text-neutral-400">Set up and edit your shop</p>
            </div>
            <EntityEditorForm mode={FormMode.CREATE} />
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