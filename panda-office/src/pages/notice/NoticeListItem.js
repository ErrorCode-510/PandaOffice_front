import { useNavigate } from "react-router-dom";
import React from 'react';
import './notice.css'; // css 파일을 임포트
// import {callNoticeDetailAPI} from '../../apis/NoticeAPICalls'

const NoticeListItem = ({ notice: { noticeId, title, postedDate, viewCount, name, job } }) => {
    const navigate = useNavigate();

    const handlerOnClick = () => {
        navigate(`/notice/detail/${noticeId}`);
        // dispatch(callNoticeDetailAPI(noticeId));
    }

    return (
        <div className="noticeListItem-wrap">
            <ul className="noticeListItem-ui" onClick={handlerOnClick}>
                <li>{noticeId}</li>
                <li>{title}</li>
                <li>{name} {job}</li>
                <li>{postedDate}</li>
                <li>{viewCount}</li>
            </ul>
        </div>
    )
}

export default NoticeListItem;
