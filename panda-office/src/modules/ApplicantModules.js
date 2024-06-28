import { createActions, handleActions } from 'redux-actions'

/* 초기값 */    
const initialState = {};

/* 액션 타입 */
const GET_APPLICANT = 'applicant/GET_APPLICANT';

/* 액션 함수 */
export const { applicant : { getApplicant }} = createActions({
    [GET_APPLICANT]: result => {
        // console.log('액션함수 콘솔로그' + JSON.stringify(result))
        return {applicant : result.data}
    }
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
    [GET_APPLICANT] : (state, { payload }) => payload
}, initialState);

export default applicantReducer;