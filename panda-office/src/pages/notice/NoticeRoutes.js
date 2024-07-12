import { Routes, Route } from "react-router-dom";
import Notice from "./Notice";
import React from 'react';
import NoticeDetail from './detailNotice/NoticeDetail';
import CategoryNoticeList from "./CategoryNoticeList";
import NoticeRegist from './NoticeRegist'


function NoticeRoutes() {

    return (
        <Routes>
            {/* 전체공지 목록페이지 */}
            <Route path="/all-notice" element={<Notice />} />
            {/* 사이드바 카테고리 및 서브카테고리별 목록 페이지 */}
            <Route path="/category/:category/:subCategory" element={<CategoryNoticeList />} />
            {/* 공지사항 상세페이지 */}
            <Route path="/detail/:noticeId" element={<NoticeDetail />} />
            {/* 공지사항 등록페이지 */}
            <Route path="/regist" element={<NoticeRegist />} />
        </Routes>
    );
}

export default NoticeRoutes;
