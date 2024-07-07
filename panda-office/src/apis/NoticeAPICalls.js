import { authRequest } from './api';
import { getNotice, getNoticeByCategory, setNotice } from '../modules/NoticeModules';

/* 공지사항 전체 조회 API */
export const callNoticeListAPI = ({ currentPage }) => {
    return async (dispatch, getState) => {

        const result = await authRequest.get(`/notice/notices?page=${currentPage}`);
        console.log(`Fetching all notices for page: ${currentPage}`);

        if (result.status === 200) {
            dispatch(getNotice(result));
            return result.data;  // tatalPages 값을 얻기 위해 반환
        } else {
            console.error('callNoticeListAPI error : ', result);
        }
    };
};

/* 공지사항 상세 조회 API */
export const callNoticeDetailAPI = (noticeId) => {
    return async (dispatch, getState) => {
        
        const result = await authRequest.get(`/notice/notices/${noticeId}`);
        if (result.status === 200) {
            dispatch(setNotice(result));
        } else {
            console.error('callNoticeDetailAPI error : ', result);
        }
    };
}

/* 카테고리 별 공지사항 조회 API (사이드바) */
export const callNoticeByCategoryAPI = ({ category, subCategory, currentPage }) => {
    return async (dispatch, getState) => {

        const result = await authRequest.get(`/notice/category/${category}/${subCategory}?page=${currentPage}`);
        console.log(`Fetching notice for category: ${category}, subCategory: ${subCategory}, page: ${currentPage}`);

        if (result.status === 200) {
            dispatch(getNoticeByCategory(result));
            return result.data;  // totalPages 값을 얻기 위해 반환
        } else {
            console.error('callNoticeByCategoryAPI error : ', result);
        }
    };
}
