import { createActions, handleActions } from 'redux-actions'

/* 초기값 */
const initialState = {
    applicant: null,
    criteria: null,
    applicantId: null,
    applicantDetail: null
};

/* 액션 타입 */
const GET_APPLICANT = 'applicant/GET_APPLICANT';
const SET_CRITERIA = 'applicant/SET_CRITERIA';
const SET_APPLICANT_ID = 'applicant/SET_APPLICANT_ID';
const SET_APPLICANT_DEDATIL = 'applicant/SET_APPLICANT_DETAIL';

/* 액션 함수 */
export const { applicant: { getApplicant, setCriteria, setApplicantId, setApplicantDetail } } = createActions({
    [GET_APPLICANT]: result => ({ applicant: result.data }),
    [SET_CRITERIA]: params => ({ criteria: params }),
    [SET_APPLICANT_ID]: id => ({ applicantId: id }),
    [SET_APPLICANT_DEDATIL]: detail => ({ applicantDetail: detail })
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
    /* 전달 된 id 상태 값 저장하기 */
    [SET_APPLICANT_ID]: (state, { payload }) => {
        console.log('리듀서 함수 ID 확인: ' + JSON.stringify({ applicantId: payload }))
        return { ...state, applicantId: payload.applicantId }
    },
    [SET_APPLICANT_DEDATIL]: (state, { payload }) => {
        // console.log('리듀서 함수 ApplicantDetail: ' + JSON.stringify({ applicantDetail: payload }))
        return { ...state, applicantDetail: payload.applicantDetail }
    }
}, initialState);

export default applicantReducer;