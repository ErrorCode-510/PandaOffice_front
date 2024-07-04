import { authRequest } from './api';
import { getNotice, setNotice } from '../modules/NoticeModules';


/* 공지사항 전체 조회 API */
export const callNoticeListAPI = ({ currentPage }) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/notice/notices?page=${currentPage}`);
        console.log("test" + JSON.stringify(currentPage))
        if (result.status === 200) {
            dispatch(getNotice(result));
        } else {
            console.error('callNoticeListAPI error : ', result);
        }
    };
};


/* 공지사항 상세 조회 API */
export const callNoticeDetailAPI = (noticeId) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/notice/detail/${noticeId}`);

        if (result.status === 200) {
            dispatch(setNotice(result));
        } else {
            console.error('callNoticeDetailAPI error : ', result);
        }
    };
}