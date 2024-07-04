import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {
    notice: null,
    detail: null
};

/* 액션 타입 */
const GET_NOTICE = "notice/GET_NOTICE";
const SET_NOTICE = "notice/SET_NOTICE"

/* 액션 함수 */
export const { notice: { getNotice, setNotice } } = createActions({
    [GET_NOTICE]: result => ({ notice: result.data }),
    [SET_NOTICE]: detail => ({ notice: detail})
});

// type : GET_NOTICE
// payload: {
//     notice: result.data
// }

/* 리듀서 함수 */
const noticeReducer = handleActions({
    [GET_NOTICE]: (state, { payload }) => ({ ...state, notice: payload.notice }),
    [SET_NOTICE]: (state, { payload }) => {
        // console.log('리듀서 공지 ID 확인: ' + JSON.stringify(notice.id))
        return { ...state, detail: payload.detail }
    }
}, initialState);

export default noticeReducer;