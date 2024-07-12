import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = {
    attendanceStatus: {
        weeklyAccumulated: '0h 0m 0s',
        weeklyOvertime: '0h 0m 0s',
        weeklyRemaining: '0h 0m 0s',
        monthlyAccumulated: '0h 0m 0s',
        monthlyOvertime: '0h 0m 0s',
        weeklyDetails: []
    },
    currentYearAnnualLeaveRecord: null,
    searchAnnualLeaveRecord: null,
    annualLeaveCalendar: null,
    modal:false,
    currentYearAttendanceRequestStatus: null,
    searchAttendanceRequestStatus: null,
    allLeaveAdjustment: [], // 초기값을 빈 배열로 설정
    message: null
};

/* 액션 타입 */
const GET_ATTENDANCE_STATUS = 'attendance/GET_ATTENDANCE_STATUS';
const GET_CURRENT_YEAR_ANNUAL_LEAVE_RECORD = 'attendance/GET_CURRENT_YEAR_ANNUAL_LEAVE_RECORD';
const GET_SEARCH_ANNUAL_LEAVE_RECORD = 'attendance/GET_SEARCH_ANNUAL_LEAVE_RECORD';
const GET_ANNUAL_LEAVE_CALENDAR = 'attendance/GET_ANNUAL_LEAVE_CALENDAR';
const GET_MODAL = "attendance/GET_MODAL"
const GET_CURRENT_YEAR_ATTENDANCE_REQUEST_STATUS = 'attendance/GET_CURRENT_YEAR_ATTENDANCE_REQUEST_STATUS';
const GET_SEARCH_ATTENDANCE_REQUEST_STATUS = 'attendance/GET_SEARCH_ATTENDANCE_REQUEST_STATUS';
const GET_LEAVE_ADJUSTMENT = 'attendance/GET_LEAVE_ADJUSTMENT';
const SAVE_ATTENDANCE_MESSAGE = 'attendance/SAVE_ATTENDANCE_MESSAGE';

/* 액션 생성 함수 */
export const { attendance: {
    getAttendanceStatus,
    getCurrentYearAnnualLeaveRecord,
    getSearchAnnualLeaveRecord,

    getAnnualLeaveCalendar,
    getModal,
    getCurrentYearAttendanceRequestStatus,
    getSearchAttendanceRequestStatus,
    getLeaveAdjustment,
    saveAttendanceMessage
} } = createActions({
    [GET_ATTENDANCE_STATUS]: (status) => ({ status }),
    [GET_CURRENT_YEAR_ANNUAL_LEAVE_RECORD]: (record) => ({ record }),
    [GET_SEARCH_ANNUAL_LEAVE_RECORD]: (record) => ({ record }),
    [GET_ANNUAL_LEAVE_CALENDAR]: (calendar) => ({ calendar }),
    [GET_MODAL] : (modal) =>({modal}),
    [GET_CURRENT_YEAR_ATTENDANCE_REQUEST_STATUS]: (status) => ({ status }),
    [GET_SEARCH_ATTENDANCE_REQUEST_STATUS]: (status) => ({ status }),
    [GET_LEAVE_ADJUSTMENT]: (adjustment) => ({ adjustment }),
    [SAVE_ATTENDANCE_MESSAGE]: (message) => ({ message })
});

/* 리듀서 */
const attendanceReducer = handleActions({
    [GET_ATTENDANCE_STATUS]: (state, { payload }) => ({ ...state, attendanceStatus: payload.status }),

    /* 현년도의 연차 내역을 가져옴 */
    [GET_CURRENT_YEAR_ANNUAL_LEAVE_RECORD]: (state, { payload }) => ({ ...state, currentYearAnnualLeaveRecord: payload.record }),
    [GET_SEARCH_ANNUAL_LEAVE_RECORD]: (state, { payload }) => ({ ...state, searchAnnualLeaveRecord: payload.record }),

    /* 검색한 달의 모든 사원 연차 내역을 가져옴 */
    [GET_ANNUAL_LEAVE_CALENDAR]: (state, { payload }) => ({ ...state, annualLeaveCalendar: payload.calendar }),
    [GET_MODAL] : (state, { payload }) => ({ ...state, modal: payload.modal }),

    /* 현재 근태 신청 현황을 가져옴 */
    [GET_CURRENT_YEAR_ATTENDANCE_REQUEST_STATUS]: (state, { payload }) => ({ ...state, currentYearAttendanceRequestStatus: payload.status }),
    [GET_SEARCH_ATTENDANCE_REQUEST_STATUS]: (state, { payload }) => ({ ...state, searchAttendanceRequestStatus: payload.status }),
    [GET_LEAVE_ADJUSTMENT]: (state, { payload }) => ({ ...state, allLeaveAdjustment: payload.adjustment }),
    [SAVE_ATTENDANCE_MESSAGE]: (state, { payload }) => ({ ...state, message: payload.message })
}, initialState);

export default attendanceReducer;
