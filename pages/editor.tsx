import { EntityEditorForm } from "@/vendor/entityEditor/EntityEditorForm";
import MainLayout from "layout/MainLayout";
import { NextPageWithLayout } from "layout/NextPageWithLayout";
import PaddedLayout from "layout/PaddedLayout";
import { ReactNode } from "react";

const EditorPage: NextPageWithLayout = () => {
    return (
        <EntityEditorForm />
    )
}

EditorPage.getLayout = function getLayout(page: ReactNode) {
    return (
        <MainLayout>
            <PaddedLayout>
                {page}
            </PaddedLayout>
        </MainLayout>
    )
}

export default EditorPage;