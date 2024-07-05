import NoticeListItem from "./NoticeListItem";
import './notice.css';
import { callNoticeListAPI, callNoticeByCategoryAPI } from "../../apis/NoticeAPICalls";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const NoticeList = ({notice}) => {
    const { category, subCategory } = useParams();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // useEffect(() => {
    //     if (category && subCategory) {
    //         dispatch(callNoticeByCategoryAPI({ category, subCategory, currentPage }));
    //     } else {
    //         dispatch(callNoticeListAPI({ currentPage }));
    //     }
    // }, [category, subCategory, currentPage, dispatch]);

    // useEffect(() => {
    //     if (notice && notice.pagingButtonInfo) {
    //         setTotalPages(notice.pagingButtonInfo.totalPages);
    //     }
    // }, [notice]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

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
            {/* <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        disabled={currentPage === index + 1}
                    >
                    </button>
                ))}
            </div> */}
        </div>
    );
};

export default NoticeList;
