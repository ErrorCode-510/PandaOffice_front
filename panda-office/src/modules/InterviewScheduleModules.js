import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {
    place: null
}

/* 액션 타입 */
const GET_PLACE = 'schedule/GET_Place';

/* 액션 생성 함수 */
export const { schedule: { getPlace }} = createActions({
    [GET_PLACE]: (state, { payload }) => ({...state, place: payload.place })
})

/* 리듀서 */
const interviewScheduleReducer = handleActions({
    [GET_PLACE]: (state, { payload }) => ({...state, place: payload.place }),
}, initialState)

export default interviewScheduleReducer;