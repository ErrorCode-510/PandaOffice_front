import { Routes, Route } from "react-router-dom";

function E_ApprovalRoute() {
    return (
        <Routes>
            <Route path="a" element={<div>test1</div>} />
            <Route path="b" element={<div>test2</div>} />
        </Routes>
    );
}

export default E_ApprovalRoute;
