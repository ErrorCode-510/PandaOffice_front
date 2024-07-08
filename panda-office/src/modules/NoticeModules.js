import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {
    notice: null,
    detail: null
};

/* 액션 타입 */
const GET_NOTICE = "notice/GET_NOTICE";
const SET_NOTICE = "notice/SET_NOTICE";
const GET_NOTICE_BY_CATEGORY = "notice/GET_NOTICE_BY_CATEGORY";

/* 액션 함수 */
export const { notice: { getNotice, setNotice, getNoticeByCategory } } = createActions({
    [GET_NOTICE]: result => ({ notice: result.data }),
    [SET_NOTICE]: detail => ({ detail: detail.data }),
    [GET_NOTICE_BY_CATEGORY]: result => ({ Categorynotice: result.data })
});

/* 리듀서 함수 */
const noticeReducer = handleActions({
    [GET_NOTICE]: (state, { payload }) => ({ ...state, notice: payload.notice }),
    [SET_NOTICE]: (state, { payload }) => ({ ...state, detail: payload.detail }),
    [GET_NOTICE_BY_CATEGORY]: (state, { payload }) => ({ ...state, Categorynotice: payload.Categorynotice })
}, initialState);

export default noticeReducer;
