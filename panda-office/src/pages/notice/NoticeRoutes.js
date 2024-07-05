import { Routes, Route } from "react-router-dom";
import React from 'react';
import NoticeDetail from './NoticeDetail';

function NoticeRoutes() {
    return (
        <Routes>
            <Route path="/all-notice" element={<Notice />} />
            <Route path="detail" element={<NoticeDetail />} />
        </Routes>
    );
}

export default NoticeRoutes;
