import NoticeListItem from "./NoticeListItem";
import './notice.css';
import PagingBar from "./NoticePagingBar";
import { callNoticeByCategoryAPI, callNoticeListAPI  } from "../../apis/NoticeAPICalls";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const NoticeList = ({notice}) => {
    const { category, subCategory } = useParams();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 상태
    const [totalPages, setTotalPages] = useState(1);  // 총 페이지 수 상태


    // 페이지가 변경될 때마다 API 호출
    useEffect(() => {
        if (category && subCategory) {
            // 카테고리와 서브카테고리가 있는 경우 해당 API 호출
            dispatch(callNoticeByCategoryAPI({category, subCategory, currentPage}))
                .then((response) => {
                    if (response && response.totalPages) {
                        setTotalPages(response.totalPages);  // API 응답에서 총 페이지 수를 totalPages 상태에 저장
                    }
                });
        } else {
            // 카테고리와 서브카테고리가 없는경우 전체 공지사항 API 호출
            dispatch(callNoticeListAPI({currentPage}))
                .then((response) => {
                    if (response && response.totalPages) {
                        setTotalPages(response.totalPages);
                    }
                });
        }
    }, [category, subCategory, currentPage, dispatch]);


    const handlePageChange = (page) => {
        setCurrentPage(page);  // 현재 페이지 변경
    };

    // 페이지네이션 정보를 계산
    const pageInfo = {
        startPage: Math.max(1, currentPage - 2),  // 시작 페이지 계산
        endPage: Math.min(totalPages, currentPage + 2),  // 끝 페이지 계산
        currentPage,
        maxPage: totalPages
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
                    <NoticeListItem key={notice.noticeId} notice={notice} />  // 공지사항 항목을 렌더링
                ))}
            </div>
            
        </div>
    );
};

export default NoticeList;
