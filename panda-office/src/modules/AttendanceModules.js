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
    attendanceRequestStatus: null,
    allLeaveAdjustment: null,
    leaveAdjustmentSearch: null
};

/* 액션 타입 */
const GET_ATTENDANCE_STATUS = 'attendance/GET_ATTENDANCE_STATUS';
const GET_CURRENT_YEAR_ANNUAL_LEAVE_RECORD = 'attendance/GET_CURRENT_YEAR_ANNUAL_LEAVE_RECORD';
const GET_SEARCH_ANNUAL_LEAVE_RECORD = 'attendance/GET_SEARCH_ANNUAL_LEAVE_RECORD';
const GET_ANNUAL_LEAVE_CALENDAR = 'attendance/GET_ANNUAL_LEAVE_CALENDAR';
const GET_ATTENDANCE_REQUEST_STATUS = 'attendance/GET_ATTENDANCE_REQUEST_STATUS';
const GET_ALL_LEAVE_ADJUSTMENT = 'attendance/GET_ALL_LEAVE_ADJUSTMENT';
const GET_LEAVE_ADJUSTMENT_SEARCH = 'attendance/GET_LEAVE_ADJUSTMENT_SEARCH';

const SAVE_ATTENDANCE_MESSAGE = 'attendance/SAVE_ATTENDANCE_SUCCESS';

/* 액션 생성 함수 */
export const { attendance: {
    getAttendanceStatus,
    getCurrentYearAnnualLeaveRecord, 
    getSearchAnnualLeaveRecord,
    getAnnualLeaveCalendar,
    getAttendanceRequestStatus,
    getAllLeaveAdjustment,
    getLeaveAdjustmentSearch,

    saveAttendanceMessage 

}
} = createActions({
    [GET_ATTENDANCE_STATUS]: (status) => ({ status }),
    [GET_CURRENT_YEAR_ANNUAL_LEAVE_RECORD]: (record) => ({ record }),
    [GET_SEARCH_ANNUAL_LEAVE_RECORD]: (record) => ({ record }),
    [GET_ANNUAL_LEAVE_CALENDAR]: (calendar) => ({ calendar }),
    [GET_ATTENDANCE_REQUEST_STATUS]: (requestStatus) => ({ requestStatus }),
    [GET_ALL_LEAVE_ADJUSTMENT]: (adjustment) => ({ adjustment }),
    [GET_LEAVE_ADJUSTMENT_SEARCH]: (searchResult) => ({ searchResult }),

    [SAVE_ATTENDANCE_MESSAGE]: (message) => ({ message })
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
    /* 현재 근태 상태를 가져옴  */
    [GET_ATTENDANCE_STATUS]: (state, { payload }) => ({ ...state, attendanceStatus: payload.status }),

    /* 현년도의 연차 내역을 가져옴 */
    [GET_CURRENT_YEAR_ANNUAL_LEAVE_RECORD]: (state, { payload }) => ({...state,currentYearAnnualLeaveRecord: payload.record,}),

    /* 검색받은 날짜의 연차 소진/ 생성 내역을 가져옴 */
    [GET_SEARCH_ANNUAL_LEAVE_RECORD]: (state, { payload }) => ({...state,searchAnnualLeaveRecord: payload.record,}),

    /* 검색한 달의 모든 사원 연차 내역을 가져옴 */
    [GET_ANNUAL_LEAVE_CALENDAR]: (state, { payload }) => ({ ...state, annualLeaveCalendar: payload.calendar }),

    /* 현재 근태 신청 현황을 가져옴 */
    [GET_ATTENDANCE_REQUEST_STATUS]: (state, { payload }) => ({ ...state, attendanceRequestStatus: payload.requestStatus }),

    /* 모든 사원의 연차 내역을 가져옴  */
    [GET_ALL_LEAVE_ADJUSTMENT]: (state, { payload }) => ({ ...state, allLeaveAdjustment: payload.adjustment }),

    /* 검색받은 사원의 연차 내역을 가져옴 */
    [GET_LEAVE_ADJUSTMENT_SEARCH]: (state, { payload }) => ({ ...state, leaveAdjustmentSearch: payload.searchResult }),

    /* 출퇴근 찍기 */
    [SAVE_ATTENDANCE_MESSAGE]: (state, { payload }) => ({...state, message: payload.message })

}, initialState);

export default attendanceReducer;
