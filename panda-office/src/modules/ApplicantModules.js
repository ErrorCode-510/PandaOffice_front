import { createActions, handleActions } from 'redux-actions'

/* 초기값 */
const initialState = {
    applicant: null,
    criteria: null,
    applicantDetail: null,
    applicatnModify: null
};

/* 액션 타입 */
const GET_APPLICANT = 'applicant/GET_APPLICANT';
const SET_CRITERIA = 'applicant/SET_CRITERIA';
const SET_APPLICANT_DEDATIL = 'applicant/SET_APPLICANT_DETAIL';
const SET_APPLICANT_MODIFY = 'applicant/SET_APPLICANT_MODIFY';

/* 액션 함수 */
export const { applicant: { getApplicant, setCriteria, setApplicantDetail, setApplicantModify } } = createActions({
    [GET_APPLICANT]: result => ({ applicant: result.data }),
    [SET_CRITERIA]: params => ({ criteria: params }),
    [SET_APPLICANT_DEDATIL]: detail => ({ applicantDetail: detail }),
    [SET_APPLICANT_MODIFY]: modify => ({ applicatnModify: modify })
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
    [SET_CRITERIA]: (state, { payload }) => ({ ...state, criteria: payload.criteria }),
    [SET_APPLICANT_DEDATIL]: (state, { payload }) => {
        // console.log('리듀서 상세 확인: ' + JSON.stringify({ applicantDetail: payload }))
        return { ...state, applicantDetail: payload.applicantDetail }
    },
    [SET_APPLICANT_MODIFY]: (state, { payload }) => {
        // console.log('리듀서 수정 확인: ' + JSON.stringify({ applicatnModify: payload }))
        return { ...state, applicatnModify: payload.applicatnModify }   
    }
}, initialState);

export default applicantReducer;