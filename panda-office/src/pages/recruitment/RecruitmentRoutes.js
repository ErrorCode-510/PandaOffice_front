import { Routes, Route } from "react-router-dom";

function RecruitmentRoutes() {
    return (
        <Routes>
            <Route path="test" element={<div>면접 라우팅 테스트</div>} />
            {/* 라우트 적용 */}
        </Routes>
    );
}

export default RecruitmentRoutes;
