import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {
    scheduleStatus: false,
    interviewer: {},
    interviewerId: [],
    applicantList: {},
    calendar: [],
    scheduleDetailModal: false
}

/* 액션 타입 */
const GET_SCHEDULE_STATUS = 'schedule/GET_SCHEDULE_STATUS'
const GET_INTERVIEWER = 'schedule/GET_INTERVIEWER'
const GET_INTERVIEWER_ID = 'schedule/GET_INTERVIEWER_ID'
const GET_APPLICANT_LIST = 'schedule/GET_APPLICANT_LIST'
const GET_CALENDAR = 'schedule/GET_CALENDAR'
const SET_REGIST_CALENDAL = 'schedule/SET_REGIST_CALENDAL'
const SET_SCHEDULE_MODAL = 'schedule/SET_SCHEDULE_MODAL';

/* 액션 생성 함수 */
export const { schedule: {
    getScheduleStatus,
    getInterviewer,
    getInterviewerId,
    getApplicantList,
    getCalendar,
    setRegistCalendar,
    setScheduleModal
} } = createActions({
    [GET_SCHEDULE_STATUS]: state => ({ scheduleStatus: state }),
    [GET_INTERVIEWER]: data => ({ interviewer: data }),
    [GET_INTERVIEWER_ID]: id => ({ interviewerId: id }),
    [GET_APPLICANT_LIST]: data => ({ applicantList: data }),
    [GET_CALENDAR]: data => ({ calendar: data }),
    [SET_REGIST_CALENDAL]: data => ({ registCalendar: data }),
    [SET_SCHEDULE_MODAL]: isTrue => ({ scheduleDetailModal: isTrue })
})

/* 리듀서 */
const interviewScheduleReducer = handleActions({
    [GET_SCHEDULE_STATUS]: (state, { payload }) => {
        return { ...state, scheduleStatus: payload.scheduleStatus }
    },
    [GET_INTERVIEWER]: (state, { payload }) => {
        return { ...state, interviewer: payload.interviewer }
    },
    [GET_INTERVIEWER_ID]: (state, { payload }) => {
        return { ...state, interviewerId: payload.interviewerId }
    },
    [GET_APPLICANT_LIST]: (state, { payload }) => {
        return { ...state, applicantList: payload.applicantList }
    },
    [GET_CALENDAR]: (state, { payload }) => {
        return { ...state, calendar: payload.calendar }
    },
    [SET_REGIST_CALENDAL]: (state, { payload }) => {
        return { ...state, registCalendar: payload.registCalendar }
    },
    [SET_SCHEDULE_MODAL]: (state, { payload }) => {
        return { ...state, scheduleDetailModal: payload.scheduleDetailModal }
    }
}, initialState)

export default interviewScheduleReducer;
