import { Routes, Route } from "react-router-dom";

function NoticeRoutes() {
    return (
        <Routes>
            <Route path="test" element={<div>공지 라우팅 테스트</div>} />
            {/* 라우트 적용 */}
        </Routes>
    );
}

export default NoticeRoutes;
