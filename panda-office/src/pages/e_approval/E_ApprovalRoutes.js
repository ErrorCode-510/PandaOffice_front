import { Routes, Route } from "react-router-dom";
import DocumentTable from "../../components/e_approval/DocumentTable";
import { DocumentTemplateFolderPage } from "./documentTemplate/E_ApprovalTemplateFolder";
import DocumentTemplateRegist from "./documentTemplate/E_ApprovalTemplateRegist";

function E_ApprovalRoute() {
    return (
        <Routes>
            {/* exceptColumn = 노출하지 않으려는 열 */}
            <Route path="draft-box"
                element={<DocumentTable
                    mainTitle={"내 기안 문서"}
                    exceptColumn={['template']}
                    searchDefault={'/afd'}
                />}
            />

            <Route path="pending-box"
                element={<DocumentTable
                    mainTitle={"결재 대기 문서"}
                    exceptColumn={[]}
                />}
            />


            <Route path="scheduled-box"
                element={<DocumentTable
                    mainTitle={"결재 예정 문서"}
                    exceptColumn={['template']}
                />}
            />

            <Route path="archived-box"
                element={<DocumentTable
                    mainTitle="후열 문서"
                    exceptColumn={['template']}
                />}
            />

            <Route path="document-template"
                element={<DocumentTemplateFolderPage
                />}
            ></Route>


            <Route path="document-template/regist"
            element={<DocumentTemplateRegist/>}
            ></Route>
        </Routes>
    );
}

export default E_ApprovalRoute;