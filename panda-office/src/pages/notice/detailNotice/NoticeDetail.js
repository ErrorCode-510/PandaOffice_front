import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callNoticeDetailAPI } from "../../../apis/NoticeAPICalls";

const NoticeDetail = () => {
    const { noticeId } = useParams();
    const dispatch = useDispatch();
    const { detail } = useSelector(state => state.noticeReducer);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(callNoticeDetailAPI(noticeId));
    }, [dispatch, noticeId]);

    if (!detail) return <div>Loading...</div>;

    const beforeOnClick = () => {
        navigate(`/notice/detail/${noticeId}` - 1)
    }

    return (
        <div className="notice-detail">
            <h1>제목: {detail.title}</h1>
            <p>작성자: {detail.name} {detail.job}</p>
            <p>작성일: {detail.postedDate}</p>
            <p>조회수: {detail.viewCount}</p>
            <div>{detail.content}</div>
            <div onClick={beforeOnClick}>이전글</div>
            <div>다음글</div>
        </div>
    );
};

export default NoticeDetail;
