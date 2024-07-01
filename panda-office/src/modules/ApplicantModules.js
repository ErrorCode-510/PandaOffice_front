import { createActions, handleActions } from 'redux-actions'

/* 초기값 */
const initialState = {
    applicant: null,
    criteria: null
};

/* 액션 타입 */
const GET_APPLICANT = 'applicant/GET_APPLICANT';
const SET_CRITERIA = 'applicant/SET_CRITERIA';

/* 액션 함수 */
export const { applicant: { getApplicant, setCriteria, setCurrentPage } } = createActions({
    [GET_APPLICANT]: result => ({ applicant: result.data }),
    [SET_CRITERIA]: params => ({ criteria: params })
    // [SET_CURRENT_PAGE]: result => ({ currentPage: result.data})
});
/* getApplicant를 디스패치하면 액션 함수에서 applicant:getApplicant가 불러와지는데
* 액션타입의 값과 매핑이 되면서 액션타입의 값의 변수를 가져온다. */

/* 액션 함수를 풀어서 사용하기
 * getApplicant(result) 함수가 호출되면 다음과 같은 액션 객체를 반환:
 * {
 *     type: 'applicant/GET_APPLICANT',
 *     payload: {
 *         applicant: result.data
 *     }
 * }
 */

/* 리듀서 함수 */
const applicantReducer = handleActions({
    [GET_APPLICANT]: (state, { payload }) => ({ ...state, applicant: payload.applicant }),
    /* 검색 조건 상태 값 저장하기 */
    [SET_CRITERIA]: (state, { payload }) => {
        // console.log("리듀서 함수 로그: " + JSON.stringify(payload.criteria));
        return {...state, criteria: payload.criteria }
    }
}, initialState);

export default applicantReducer;