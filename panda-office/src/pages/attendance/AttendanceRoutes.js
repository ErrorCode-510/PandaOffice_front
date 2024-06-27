import { Routes, Route } from "react-router-dom";

function AttendanceRoutes() {
    return (
        <Routes>
            <Route path="test" element={<div>근태 라우팅 테스트</div>} />
            {/* 라우트 적용 */}
        </Routes>
    );
}

export default AttendanceRoutes;
