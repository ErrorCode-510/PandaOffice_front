import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoticePagingBar from "./NoticePagingBar";
import { callNoticeByCategoryAPI } from "../../apis/NoticeAPICalls";
import NoticeListItem from "./NoticeListItem";
import { useParams } from "react-router-dom";
import "./notice.css";


// 카테고리별 공지사항 목록 페이지 (사이드바)

const categoryTitles = {
    group: {
        accounting: "회계",
        sales: "영업",
        hr: "인사",
        marketing: "마케팅",
        planning: "기획"
    },
    event: {
        marriage: "결혼",
        obituary: "부고",
        dol: "돌잔치"
    }
};


const CategoryNoticeList = () => {
    const { category, subCategory } = useParams();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const noticesByCategory = useSelector(state => state.noticeReducer.noticesByCategory);
    const [noticeData, setNoticeData] = useState(null);
    const [title, setTitle] = useState("");

    useEffect(() => {
        console.log(`Fetching data for category: ${category}, subCategory: ${subCategory}, page: ${currentPage}`);
        dispatch(callNoticeByCategoryAPI({ category, subCategory, currentPage }));
    }, [category, subCategory, currentPage, dispatch]);

    useEffect(() => {
        console.log('noticesByCategory:', noticesByCategory);
        if (noticesByCategory && noticesByCategory[category] && noticesByCategory[category][subCategory]) {
            setNoticeData(noticesByCategory[category][subCategory]);
            console.log('Notice data set:', noticesByCategory[category][subCategory]);
        } else {
            setNoticeData(null);
            console.log('No notice data available for category and subCategory');
        }
    }, [category, subCategory, noticesByCategory]);

    useEffect(() => {
        if (categoryTitles[category] && categoryTitles[category][subCategory]) {
            setTitle(categoryTitles[category][subCategory]);
        } else {
            setTitle(`${subCategory}`);
        }
    }, [category, subCategory]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            { noticeData ? (
                <>
                    <h1>{title}</h1>
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
                            {noticeData.data.map(notice => (
                                <NoticeListItem key={notice.noticeId} notice={notice} />
                            ))}
                        </div>
                        <NoticePagingBar pageInfo={noticeData.pageInfo} setCurrentPage={handlePageChange} />
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default CategoryNoticeList;
