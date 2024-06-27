import { Routes, Route } from "react-router-dom";

function EmployeeRoutes() {
    return (
        <Routes>
            <Route path="test" element={<div>인사관리 라우팅 테스트</div>} />
            {/* 라우트 적용 */}
        </Routes>
    );
}

export default EmployeeRoutes;
