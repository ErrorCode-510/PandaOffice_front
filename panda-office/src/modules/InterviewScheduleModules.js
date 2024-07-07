import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {
    scheduleStatus: false,
    interviewer: {},
    interviewerId: [],
    applicantList: {}
}

/* 액션 타입 */
const GET_SCHEDULE_STATUS = 'schedule/GET_SCHEDULE_STATUS'
const GET_INTERVIEWER = 'schedule/GET_INTERVIEWER'
const GET_INTERVIEWER_ID = 'schedule/GET_INTERVIEWER_ID'
const GET_APPLICANT_LIST = 'schedule/GET_APPLICANT_LIST'

/* 액션 생성 함수 */
export const { schedule: { getScheduleStatus, getInterviewer, getInterviewerId, getApplicantList }} = createActions({
    [GET_SCHEDULE_STATUS]: state => ({ scheduleStatus: state }),
    [GET_INTERVIEWER]: data => ({ interviewer: data }),
    [GET_INTERVIEWER_ID]: id => ({ interviewerId: id }),
    [GET_APPLICANT_LIST]: data => ({ applicantList: data })
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
    [GET_INTERVIEWER_ID]: (state, { payload }) => {
        // console.log('면접관 아이디 리듀서 확인: ' + JSON.stringify(payload.interviewerId))
        return {...state, interviewerId: payload.interviewerId }
    },
    [GET_APPLICANT_LIST]: (state, { payload }) => {
        // console.log('interviewScheduleReducer getApplicantList Check: ' + JSON.stringify(payload.applicantList))
        return {...state, applicantList: payload.applicantList }
    }
}, initialState)

export default interviewScheduleReducer;