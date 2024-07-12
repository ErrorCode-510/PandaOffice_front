import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoticePagingBar from "./NoticePagingBar";
import { callNoticeListAPI } from "../../apis/NoticeAPICalls";  // 공지사항 목록 API 호출
import NoticeList from "./NoticeList";
import "./notice.css";


const Notice = () => {

    // 액션을 디스패치 하기 위해 디스패치 훅을 사용 
    const dispatch = useDispatch();

    /* 페이지 번호 상태 저장하기: 디폴트 1 */
    const [currentPage, setCurrentPage] = useState(1);

    // useSelector를 사용하여 notice 데이터를 가져옴, noticeReducer에서 가져온 데이터를 notice 변수에 저장
    const {notice} = useSelector(state => state.noticeReducer);

    // useEffect는 컴포넌트가 마운트되거나 currentPage 상태가 변경될 때마다 callNoticeListAPI함수를 호출하여, 공지사항 리스트를 불러옴
    useEffect(() => {
        dispatch(callNoticeListAPI({ currentPage }));
    }, [currentPage, dispatch]);

    return (
        <>
            { notice && (
                <>
                    <h1>전체공지</h1>
                    <div className="notice-wrap">
                        <NoticeList notice={notice.data} />
                        <NoticePagingBar pageInfo={notice.pageInfo} setCurrentPage={setCurrentPage} />
                    </div>
                </>
            )}
        </>
    );
}

export default Notice;
