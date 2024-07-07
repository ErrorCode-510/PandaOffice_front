import { Routes, Route } from "react-router-dom";
import Notice from "./Notice";
import React from 'react';
import NoticeDetail from './detailNotice/NoticeDetail';
import NoticeList  from "./NoticeList";
import { useSelector } from "react-redux";

function NoticeRoutes() {

    const {notices} = useSelector(state => state.noticeReducer);
    const noticesByCategory = useSelector(state => state.noticeReducer.noticesByCategory);

    return (
        <Routes>
            {/* 전체공지 목록페이지 */}
            <Route path="/all-notice" element={<Notice />} />
            {/* 사이드바 카테고리 목록페이지 */}
            <Route path="/category/:category/:subCategory" element={<NoticeList notice={noticesByCategory} />} />
            {/* 공지사항 상세페이지 */}
            <Route path="/detail/:noticeId" element={<NoticeDetail />} />
        </Routes>
    );
}

export default NoticeRoutes;
