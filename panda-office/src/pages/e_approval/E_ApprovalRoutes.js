import { Routes, Route } from "react-router-dom";
import { DocumentTemplateFolderPage } from "./documentTemplate/E_ApprovalTemplateFolder";
import DocumentTemplateRegist from "./documentTemplate/E_ApprovalTemplateRegist";
import { ViewDocument } from "./document/ViewDocument";
import { DraftDocument } from "./document/DraftDocument";

function E_ApprovalRoute() {
    return (
        <Routes>
            <Route path="approval-document/:documentId"
            element={<ViewDocument/>}/>

            <Route path="document-template"
                element={<DocumentTemplateFolderPage
                />}
            ></Route>


            <Route path="document-template/regist"
            element={<DocumentTemplateRegist/>}
            ></Route>
            
            <Route path="draft"
            element={<DraftDocument/>}
            ></Route>
        </Routes>
    );
}

export default E_ApprovalRoute;