import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from 'react';
import './notice.css';

const NoticeListItem = ({ notice: { noticeId, title, postedDate, viewCount, name, job, status } }) => {
    const navigate = useNavigate();

    const handlerOnClick = async () => {
        try {
            // 조회수 증가 API 호출
            await axios.put(`http://localhost:8001/notice/${noticeId}/incrementViewCount`);

            // 공지사항 상세 페이지로 이동
            navigate(`/notice/detail/${noticeId}`);
        } catch (error) {
            console.error('Error incrementing view count:', error);
        }
    };

    return (
        <div className={`noticeListItem-wrap ${status === 'N' ? 'private-notice' : ''}`}>
            <ul className="noticeListItem-ui" onClick={handlerOnClick}>
                <li>{noticeId}</li>
                <li>{title} {status === 'N' && <span className="private-label">비공개</span>}</li>
                <li>{name} {job}</li>
                <li>{postedDate}</li>
                <li>{viewCount}</li>
            </ul>
        </div>
    )
}

export default NoticeListItem;
