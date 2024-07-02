import NoticeListItem from "./NoticeListItem";
import './notice.css';  // css 파일을 임포트
import React from "react";

const NoticeList = ({notice}) => {
    {/* console.log("공지사항 리스트 데이터 받기 : " + JSON.stringify((notice))) */ }
    return (
        <>
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
        </>
    )
}

export default NoticeList;