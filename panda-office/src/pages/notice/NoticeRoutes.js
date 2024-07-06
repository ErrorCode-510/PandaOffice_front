import { Routes, Route } from "react-router-dom";
// import Notice from "./Notice";
import React from 'react';
import NoticeDetail from './detailNotice/NoticeDetail';
import NoticeList from "./NoticeList";

function NoticeRoutes() {
    return (
        <Routes>
            <Route path="/all-notice" element={<Notice />} />
            <Route path="/category/:category/:subCategory" element={<NoticeList />} />
            <Route path="/detail/:noticeId" element={<NoticeDetail />} />
        </Routes>
    );
}

export default NoticeRoutes;
