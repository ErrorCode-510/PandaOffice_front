import React from "react";
import NoticeListItem from "./NoticeListItem";
import "./notice.css";

const NoticeList = ({ notice }) => {
    return (
        <div className="notice-wrap">
            <div className="noticeList-ui">
                <ul className="noticeList-title">
                    <li>번호</li>
                    <li>제목</li>
                    <li>작성자</li>
                    <li>작성일</li>
                    <li>조회수</li>
                </ul>
            </div>
            <div>
                {notice && notice.map(notice => (
                    <NoticeListItem key={notice.noticeId} notice={notice} />
                ))}
            </div>
        </div>
    );
};

export default NoticeList;
