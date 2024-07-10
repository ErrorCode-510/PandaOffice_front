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
    currentYearAttendanceRequestStatus: null,
    searchAttendanceRequestStatus: null,
    allLeaveAdjustment: null,
    leaveAdjustmentSearch: null
};

/* 액션 타입 */
const GET_ATTENDANCE_STATUS = 'attendance/GET_ATTENDANCE_STATUS';
const GET_CURRENT_YEAR_ANNUAL_LEAVE_RECORD = 'attendance/GET_CURRENT_YEAR_ANNUAL_LEAVE_RECORD';
const GET_SEARCH_ANNUAL_LEAVE_RECORD = 'attendance/GET_SEARCH_ANNUAL_LEAVE_RECORD';
const GET_ANNUAL_LEAVE_CALENDAR = 'attendance/GET_ANNUAL_LEAVE_CALENDAR';
const GET_CURRENT_YEAR_ATTENDANCE_REQUEST_STATUS = 'attendance/GET_CURRENT_YEAR_ATTENDANCE_REQUEST_STATUS';
const GET_SEARCH_ATTENDANCE_REQUEST_STATUS = 'attendance/GET_SEARCH_ATTENDANCE_REQUEST_STATUS';
const GET_ALL_LEAVE_ADJUSTMENT = 'attendance/GET_ALL_LEAVE_ADJUSTMENT';
const GET_LEAVE_ADJUSTMENT_SEARCH = 'attendance/GET_LEAVE_ADJUSTMENT_SEARCH';

/* 액션 생성 함수 */
export const { attendance: {
    getAttendanceStatus,
    getCurrentYearAnnualLeaveRecord, 
    getSearchAnnualLeaveRecord,
    getAnnualLeaveCalendar,
    getCurrentYearAttendanceRequestStatus,
    getSearchAttendanceRequestStatus,
    getAllLeaveAdjustment,
    getLeaveAdjustmentSearch
}
} = createActions({
    [GET_ATTENDANCE_STATUS]: (status) => ({ status }),
    [GET_CURRENT_YEAR_ANNUAL_LEAVE_RECORD]: (record) => ({ record }),
    [GET_SEARCH_ANNUAL_LEAVE_RECORD]: (record) => ({ record }),
    [GET_ANNUAL_LEAVE_CALENDAR]: (calendar) => ({ calendar }),
    [GET_CURRENT_YEAR_ATTENDANCE_REQUEST_STATUS]: (status) => ({ status }),
    [GET_SEARCH_ATTENDANCE_REQUEST_STATUS]: (status) => ({ status }),
    [GET_ALL_LEAVE_ADJUSTMENT]: (adjustment) => ({ adjustment }),
    [GET_LEAVE_ADJUSTMENT_SEARCH]: (searchResult) => ({ searchResult })
});


/* 리듀서 */
/* reducer:{
  "attendanceRecordResponse": {
    "calculatedAttendanceRecords": [
      {
        "weeklyTotalTime": "9시간 0분",
        "monthlyTotalTime": "9시간 0분",
        "remainingTime": "31시간 0분",
        "weeklyStartEndTimes": {
          "2024-6-W4: 4": [
            {
              "date": "30",
              "dayDuration": "9시간 0분",
              "week": "4",
              "start": "09:00",
              "end": "18:00",
              "day": "일"
            }
          ]
        }
      }
    ]
  },
  "calculatedOverTimeAndLatenessRecordResponse": {
    "calculatedOverTimeAndLatenessRecords": [
      {
        "weeklyOverTime": "3시간 0분",
        "monthlyOverTime": "3시간 0분"
      }
    ]
  }
},
    annualLeaveRecord: null,
    annualLeaveCalendar: null,
    attendanceRequestStatus: null,
    allLeaveAdjustment: null,
    leaveAdjustmentSearch: null
} */
const attendanceReducer = handleActions({
    [GET_ATTENDANCE_STATUS]: (state, { payload }) => ({ ...state, attendanceStatus: payload.status }),
    [GET_CURRENT_YEAR_ANNUAL_LEAVE_RECORD]: (state, { payload }) => ({...state,currentYearAnnualLeaveRecord: payload.record,}),
    [GET_SEARCH_ANNUAL_LEAVE_RECORD]: (state, { payload }) => ({...state,searchAnnualLeaveRecord: payload.record,}),
    [GET_ANNUAL_LEAVE_CALENDAR]: (state, { payload }) => ({ ...state, annualLeaveCalendar: payload.calendar }),
    [GET_CURRENT_YEAR_ATTENDANCE_REQUEST_STATUS]: (state, { payload }) => ({ ...state, currentYearAttendanceRequestStatus: payload.status }),
    [GET_SEARCH_ATTENDANCE_REQUEST_STATUS]: (state, { payload }) => ({ ...state, searchAttendanceRequestStatus: payload.status }),
    [GET_ALL_LEAVE_ADJUSTMENT]: (state, { payload }) => ({ ...state, allLeaveAdjustment: payload.adjustment }),
    [GET_LEAVE_ADJUSTMENT_SEARCH]: (state, { payload }) => ({ ...state, leaveAdjustmentSearch: payload.searchResult })
}, initialState);

export default attendanceReducer;
