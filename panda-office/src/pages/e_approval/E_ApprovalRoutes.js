import { Routes, Route } from "react-router-dom";

function E_ApprovalRoute() {
    return (
        <Routes>
            <Route path="a" element={<div style={{width: '100%', height:"1000px", backgroundColor: "black"}}>test1</div>} />
            <Route path="b" element={<div>test2</div>} />
        </Routes>
    );
}

export default E_ApprovalRoute;
