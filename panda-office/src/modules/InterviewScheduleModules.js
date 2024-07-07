import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {
    scheduleStatus: false,
    interviewer: {
        employeeName: '',
        jobTitle: "",
        departmentName: ""
    }
}

/* 액션 타입 */
const GET_SCHEDULE_STATUS = 'schedule/GET_SCHEDULE_STATUS'
const GET_INTERVIEWER = 'schedule/GET_INTERVIEWER'

/* 액션 생성 함수 */
export const { schedule: { getScheduleStatus, getInterviewer }} = createActions({
    [GET_SCHEDULE_STATUS]: state => ({ scheduleStatus: state }),
    [GET_INTERVIEWER]: data => ({ interviewer: data })
})

/* 리듀서 */
const interviewScheduleReducer = handleActions({
    [GET_SCHEDULE_STATUS]: (state, { payload }) => {
        // console.log('모달창 리듀서 확인: ' + JSON.stringify(payload.scheduleStatus))
        return {...state, scheduleStatus: payload.scheduleStatus }
    },
    [GET_INTERVIEWER]: (state, { payload }) => {
        // console.log('면접관 리듀서 확인: ' + JSON.stringify(payload.interviewer))
        return {...state, interviewer: payload.interviewer }
    },
}, initialState)

export default interviewScheduleReducer;