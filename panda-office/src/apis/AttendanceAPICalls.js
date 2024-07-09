import { authRequest } from './api';
import {
    getAttendanceStatus,
    getAnnualLeaveRecord,
    getAnnualLeaveCalendar,
    getAttendanceRequestStatus,
    getAllLeaveAdjustment,
    getLeaveAdjustmentSearch,
    getCurrentYearAttendanceRequestStatus,
    getSearchAttendanceRequestStatus
} from '../modules/AttendanceModules';

export const callAttendanceStatusAPI = (searchDate) => {
    return async (dispatch) => {
        try {
            const response = await authRequest.get(`/attendance/management/status?searchDate=${searchDate}`);
            if (response.status === 200) {
                dispatch(getAttendanceStatus(response.data));
            } else {
                console.error('API 호출 실패:', response);
                // 에러 처리 로직 추가
                dispatch(getAttendanceStatus({
                    weeklyAccumulated: '0h 0m 0s',
                    weeklyOvertime: '0h 0m 0s',
                    weeklyRemaining: '0h 0m 0s',
                    monthlyAccumulated: '0h 0m 0s',
                    monthlyOvertime: '0h 0m 0s',
                    weeklyDetails: []
                }));
            }
        } catch (error) {
            console.error('API 호출 에러:', error);
            // 에러 처리 로직 추가
            dispatch(getAttendanceStatus({
                weeklyAccumulated: '0h 0m 0s',
                weeklyOvertime: '0h 0m 0s',
                weeklyRemaining: '0h 0m 0s',
                monthlyAccumulated: '0h 0m 0s',
                monthlyOvertime: '0h 0m 0s',
                weeklyDetails: []
            }));
        }
    };
};

export const callAnnualLeaveRecordAPI = (startDate, endDate) => {
    return async (dispatch) => {
        try {
            const response = await authRequest.get(`/attendance/management/annual_leave_record?startDate=${startDate}&endDate=${endDate}`);
            if (response.status === 200) {
                dispatch(getAnnualLeaveRecord(response.data));
            } else {
                console.error('API 호출 실패:', response);
                // 에러 처리 로직 추가
            }
        } catch (error) {
            console.error('연차 내역 조회 에러:', error);
            // 에러 처리 로직 추가
        }
    };
};

export const callAnnualLeaveCalendarAPI = () => {
    return async (dispatch) => {
        try {
            const response = await authRequest.get('/attendance/management/annual_leave_calendar');
            if (response.status === 200) {
                dispatch(getAnnualLeaveCalendar(response.data));
            } else {
                console.error('API 호출 실패:', response);
                // 에러 처리 로직 추가
            }
        } catch (error) {
            console.error('연차 캘린더 조회 에러:', error);
            // 에러 처리 로직 추가
        }
    };
};

export const callAttendanceRequestStatusAPI = (startDate, endDate, type) => {
    return async (dispatch) => {
        try {
            const response = await authRequest.get(`/attendance/request_status?startDate=${startDate}&endDate=${endDate}`);
            if (response.status === 200) {
                if (type === 'currentYear') {
                    dispatch(getCurrentYearAttendanceRequestStatus(response.data));
                } else {
                    dispatch(getSearchAttendanceRequestStatus(response.data));
                }
            } else {
                console.error('API 호출 실패:', response);
                // 기본값 설정
                const defaultData = {
                    attendanceSummary: {
                        lateCount: 0,
                        overtimeCount: 0,
                        holidayWorkCount: 0,
                        annualLeaveCount: 0,
                        totalCount: 0
                    },
                    overTimeRecordsForToday: { overTimeRecords: [], lateRecords: [] },
                    overTimeRecords: { overTimeRecords: [], lateRecords: [] },
                    usedLeaveRecordsForToday: { annualLeaveUsedRecords: [] },
                    annualLeaveUsedRecords: { annualLeaveUsedRecords: [] }
                };
                if (type === 'currentYear') {
                    dispatch(getCurrentYearAttendanceRequestStatus(defaultData));
                } else {
                    dispatch(getSearchAttendanceRequestStatus(defaultData));
                }
            }
        } catch (error) {
            console.error('근태 신청 내역 조회 에러:', error);
            // 기본값 설정
            const defaultData = {
                attendanceSummary: {
                    lateCount: 0,
                    overtimeCount: 0,
                    holidayWorkCount: 0,
                    annualLeaveCount: 0,
                    totalCount: 0
                },
                overTimeRecordsForToday: { overTimeRecords: [], lateRecords: [] },
                overTimeRecords: { overTimeRecords: [], lateRecords: [] },
                usedLeaveRecordsForToday: { annualLeaveUsedRecords: [] },
                annualLeaveUsedRecords: { annualLeaveUsedRecords: [] }
            };
            if (type === 'currentYear') {
                dispatch(getCurrentYearAttendanceRequestStatus(defaultData));
            } else {
                dispatch(getSearchAttendanceRequestStatus(defaultData));
            }
        }
    };
};

export const callAllLeaveAdjustmentAPI = () => {
    return async (dispatch) => {
        try {
            const response = await authRequest.get('/attendance/all_leave_adjustment');
            if (response.status === 200) {
                dispatch(getAllLeaveAdjustment(response.data));
            } else {
                console.error('API 호출 실패:', response);
                // 에러 처리 로직 추가
            }
        } catch (error) {
            console.error('연차 조정 첫페이지 조회 에러:', error);
            // 에러 처리 로직 추가
        }
    };
};

export const callLeaveAdjustmentSearchAPI = (hireYear) => {
    return async (dispatch) => {
        try {
            const response = await authRequest.get(`/attendance/all_leave_adjustment/search?hireYear=${hireYear}`);
            if (response.status === 200) {
                dispatch(getLeaveAdjustmentSearch(response.data));
            } else {
                console.error('API 호출 실패:', response);
                // 에러 처리 로직 추가
            }
        } catch (error) {
            console.error('연차 조정 검색 에러:', error);
            // 에러 처리 로직 추가
        }
    };
};
