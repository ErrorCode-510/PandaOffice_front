import { Routes, Route } from "react-router-dom";

function WelfareRoutes() {
    return (
        <Routes>
            <Route path="test" element={<div>민원 라우팅 테스트</div>} />
            {/* 라우트 적용 */}
        </Routes>
    );
}

export default WelfareRoutes;
