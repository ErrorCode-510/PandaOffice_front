import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {
    scheduleStatus: false
}

/* 액션 타입 */
const GET_SCHEDULE_STATUS = 'schedule/GET_SCHEDULE_STATUS'

/* 액션 생성 함수 */
export const { schedule: { getScheduleStatus }} = createActions({
    [GET_SCHEDULE_STATUS]: state => ({ scheduleStatus: state })
})

/* 리듀서 */
const interviewScheduleReducer = handleActions({
    [GET_SCHEDULE_STATUS]: (state, { payload }) => {
        console.log('리듀서 값 전달 확인: ' + JSON.stringify(payload.scheduleStatus))
        return {...state, scheduleStatus: payload.scheduleStatus }
    },
}, initialState)

export default interviewScheduleReducer;