import { createActions, handleActions } from "redux-actions";


/* 초기값 */
const initialState = {
    notice: [],
    detail: null,
    noticesByCategory: {},
    addNotice: null
};

/* 액션 타입 */
const GET_NOTICE = "notice/GET_NOTICE";
const SET_NOTICE = "notice/SET_NOTICE";
const GET_NOTICE_BY_CATEGORY = "notice/GET_NOTICE_BY_CATEGORY";
const ADD_NOTICE = "notice/ADD_NOTICE";

/* 액션 함수 */
export const { notice: { getNotice, setNotice, getNoticeByCategory, addNotice }} = createActions ({
    [GET_NOTICE]: result => ({ notice: result.data }),
    [SET_NOTICE]: detail => ({ detail: detail.data }),
    [GET_NOTICE_BY_CATEGORY]: result => ({ category: result.category, subCategory: result.subCategory, data: result.data }),
    [ADD_NOTICE]: result => ({ notice: result.data })
});
/* 리듀서 함수 */
const noticeReducer = handleActions({
    [GET_NOTICE]: (state, { payload }) => {
        return { ...state, notice: payload.notice };
    },
    [SET_NOTICE]: (state, { payload }) => {
        return { ...state, detail: payload.detail };
    },
    [GET_NOTICE_BY_CATEGORY]: (state, { payload }) => {
        const { category, subCategory, data } = payload;
        const updatedNoticesByCategory = { ...state.noticesByCategory };
        if (!updatedNoticesByCategory[category]) {
            updatedNoticesByCategory[category] = {};
        }
        updatedNoticesByCategory[category][subCategory] = data;
        return { ...state, noticesByCategory: updatedNoticesByCategory };
    },
    [ADD_NOTICE]: (state, { payload }) => {
        return { ...state, notice: [...state.notice, payload.notice]};
    }
}, initialState);

export default noticeReducer;
