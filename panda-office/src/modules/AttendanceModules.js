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
    annualLeaveRecord: null,
    annualLeaveCalendar: null,
    currentYearAttendanceRequestStatus: null,
    searchAttendanceRequestStatus: null,
    allLeaveAdjustment: [], // 초기값을 빈 배열로 설정
    leaveAdjustmentSearch: null
};

/* 액션 타입 */
const GET_ATTENDANCE_STATUS = 'attendance/GET_ATTENDANCE_STATUS';
const GET_ANNUAL_LEAVE_RECORD = 'attendance/GET_ANNUAL_LEAVE_RECORD';
const GET_ANNUAL_LEAVE_CALENDAR = 'attendance/GET_ANNUAL_LEAVE_CALENDAR';
const GET_CURRENT_YEAR_ATTENDANCE_REQUEST_STATUS = 'attendance/GET_CURRENT_YEAR_ATTENDANCE_REQUEST_STATUS';
const GET_SEARCH_ATTENDANCE_REQUEST_STATUS = 'attendance/GET_SEARCH_ATTENDANCE_REQUEST_STATUS';
const GET_ALL_LEAVE_ADJUSTMENT = 'attendance/GET_ALL_LEAVE_ADJUSTMENT';
const GET_LEAVE_ADJUSTMENT_SEARCH = 'attendance/GET_LEAVE_ADJUSTMENT_SEARCH';

/* 액션 생성 함수 */
export const { attendance: {
    getAttendanceStatus,
    getAnnualLeaveRecord,
    getAnnualLeaveCalendar,
    getCurrentYearAttendanceRequestStatus,
    getSearchAttendanceRequestStatus,
    getAllLeaveAdjustment,
    getLeaveAdjustmentSearch
}
} = createActions({
    [GET_ATTENDANCE_STATUS]: (status) => ({ status }),
    [GET_ANNUAL_LEAVE_RECORD]: (record) => ({ record }),
    [GET_ANNUAL_LEAVE_CALENDAR]: (calendar) => ({ calendar }),
    [GET_CURRENT_YEAR_ATTENDANCE_REQUEST_STATUS]: (status) => ({ status }),
    [GET_SEARCH_ATTENDANCE_REQUEST_STATUS]: (status) => ({ status }),
    [GET_ALL_LEAVE_ADJUSTMENT]: (adjustment) => ({ adjustment }),
    [GET_LEAVE_ADJUSTMENT_SEARCH]: (searchResult) => ({ searchResult })
});

/* 리듀서 */
const attendanceReducer = handleActions({
    [GET_ATTENDANCE_STATUS]: (state, { payload }) => ({ ...state, attendanceStatus: payload.status }),
    [GET_ANNUAL_LEAVE_RECORD]: (state, { payload }) => ({ ...state, annualLeaveRecord: payload.record }),
    [GET_ANNUAL_LEAVE_CALENDAR]: (state, { payload }) => ({ ...state, annualLeaveCalendar: payload.calendar }),
    [GET_CURRENT_YEAR_ATTENDANCE_REQUEST_STATUS]: (state, { payload }) => ({ ...state, currentYearAttendanceRequestStatus: payload.status }),
    [GET_SEARCH_ATTENDANCE_REQUEST_STATUS]: (state, { payload }) => ({ ...state, searchAttendanceRequestStatus: payload.status }),
    [GET_ALL_LEAVE_ADJUSTMENT]: (state, { payload }) => ({ ...state, allLeaveAdjustment: payload.adjustment }),
    [GET_LEAVE_ADJUSTMENT_SEARCH]: (state, { payload }) => ({ ...state, leaveAdjustmentSearch: payload.searchResult })
}, initialState);

export default attendanceReducer;
