import { Routes, Route } from "react-router-dom";
import DocumentList from "../../components/e_approval/DocumentList";

function E_ApprovalRoute() {
    return (
        <Routes>
            {/* exceptColumn = 노출하지 않으려는 열 */}
            <Route path="draft-box" element={<DocumentList exceptColumn={['template']} searchDefault={'/afd'}/>} />
            <Route path="pending-box" element={<div>test2</div>} />
            <Route path="scheduled-box" element={<div>test2</div>} />
            <Route path="archived-box" element={<div>test2</div>} />
        </Routes>
    );
}

export default E_ApprovalRoute;
