import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {
    scheduleStatus: false,
    interviewer: {},
    interviewerId: [],
    applicantList: {},
    calendar: [],
    scheduleModalStatus: false,
    detailCalendar: null,
    selectedEvent: null
}

/* 액션 타입 */
const GET_SCHEDULE_STATUS = 'schedule/GET_SCHEDULE_STATUS'
const GET_INTERVIEWER = 'schedule/GET_INTERVIEWER'
const GET_INTERVIEWER_ID = 'schedule/GET_INTERVIEWER_ID'
const GET_APPLICANT_LIST = 'schedule/GET_APPLICANT_LIST'
const GET_CALENDAR = 'schedule/GET_CALENDAR'
const SET_REGIST_CALENDAL = 'schedule/SET_REGIST_CALENDAL'
const SET_SCHEDULE_MODAL_STATUS = 'schedule/SET_SCHEDULE_MODAL_STATUS';
const GET_DETAIL_CALENDAR = 'schedule/GET_DETAIL_CALENDAR';
const SET_SELECTED_EVENT = 'schedule/SET_SELECTED_EVENT';

/* 액션 생성 함수 */
export const { schedule: {
    getScheduleStatus,
    getInterviewer,
    getInterviewerId,
    getApplicantList,
    getCalendar,
    setRegistCalendar,
    setScheduleModalStatus,
    getDetailCalendar,
    setSelectedEvent
} } = createActions({
    [GET_SCHEDULE_STATUS]: state => ({ scheduleStatus: state }),
    [GET_INTERVIEWER]: data => ({ interviewer: data }),
    [GET_INTERVIEWER_ID]: id => ({ interviewerId: id }),
    [GET_APPLICANT_LIST]: data => ({ applicantList: data }),
    [GET_CALENDAR]: data => ({ calendar: data }),
    [SET_REGIST_CALENDAL]: data => ({ registCalendar: data }),
    [SET_SCHEDULE_MODAL_STATUS]: isTrue => ({ scheduleModalStatus: isTrue }),
    [GET_DETAIL_CALENDAR]: data => ({ detailCalendar: data }),
    [SET_SELECTED_EVENT]: info => ({ selectedEvent: info })
})

/* 리듀서 */
const interviewScheduleReducer = handleActions({
    [GET_SCHEDULE_STATUS]: (state, { payload }) => ({ ...state, scheduleStatus: payload.scheduleStatus }),
    [GET_INTERVIEWER]: (state, { payload }) => ({ ...state, interviewer: payload.interviewer }),
    [GET_INTERVIEWER_ID]: (state, { payload }) => ({ ...state, interviewerId: payload.interviewerId }),
    [GET_APPLICANT_LIST]: (state, { payload }) => ({ ...state, applicantList: payload.applicantList }),
    [GET_CALENDAR]: (state, { payload }) => ({ ...state, calendar: payload.calendar }),
    [SET_REGIST_CALENDAL]: (state, { payload }) => ({ ...state, registCalendar: payload.registCalendar }),
    [SET_SCHEDULE_MODAL_STATUS]: (state, { payload }) => ({ ...state, scheduleModalStatus: payload.scheduleModalStatus }),
    [GET_DETAIL_CALENDAR]: (state, { payload }) => ({ ...state, detailCalendar: payload.detailCalendar }),
    [SET_SELECTED_EVENT]: (state, { payload }) => ({ ...state, selectedEvent: payload.selectedEvent })
}, initialState)

export default interviewScheduleReducer;
