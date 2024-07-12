import { authRequest } from './api';
import { getNotice, getNoticeByCategory, setNotice, addNotice } from '../modules/NoticeModules';


/* 공지사항 전체 조회 API */
export const callNoticeListAPI = ({ currentPage }) => {

    return async (dispatch, getState) => {
        const result = await authRequest.get(`/notice/notices?page=${currentPage}`);
        console.log(`Fetching all notices for page: ${currentPage}`);

        if (result.status === 200) {
            dispatch(getNotice(result.data));
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
        try {
            const apiUrl = `/notice/category/filter?category=${category}&subCategory=${subCategory}&page=${currentPage}`;
            const result = await authRequest.get(apiUrl);
            
            if (result.status === 200) {
                dispatch(getNoticeByCategory({
                    category,
                    subCategory,
                    data: result.data
                }));
                return result.data;

            } else {
                console.error('callNoticeByCategoryAPI error : ', result);
            }
        } catch (error) {
            console.error('callNoticeByCategoryAPI error : ', error);
        }
    };
}

/* 공지사항 등록 API */
export const callAddNoticeAPI = (formData) => {
    return async (dispatch) => {
        const result = await authRequest.post('/notice/regist', formData);
        
        if (result.status === 201) {
            dispatch(addNotice( result.data ));
            
            return result;  // 응답을 반환하여 성공 여부 확인
        } else {
            console.error('callAddNoticeAPI error : ', result);
        }
    }
}