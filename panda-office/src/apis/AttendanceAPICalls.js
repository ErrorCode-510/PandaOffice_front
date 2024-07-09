import { authRequest } from './api';
import {
    getAttendanceStatus,
    getCurrentYearAnnualLeaveRecord, 
    getSearchAnnualLeaveRecord,
    getAnnualLeaveCalendar,
    getAttendanceRequestStatus,
    getAllLeaveAdjustment,
    getLeaveAdjustmentSearch,
    saveAttendanceMessage 
} from '../modules/AttendanceModules';



export const callAttendanceStatusAPI = (searchDate) => {
    return async (dispatch) => {
        const response = await authRequest.get(`/attendance/management/status?searchDate=${searchDate}`);
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

export const callAnnualLeaveRecordAPI = (startDate, endDate, type) => {
    return async (dispatch) => {
        try {
            const response = await authRequest.get(`/attendance/management/annual_leave_record?startDate=${startDate}&endDate=${endDate}`);
            if (response.status === 200) {
                if (type === 'currentYear') {
                    dispatch(getCurrentYearAnnualLeaveRecord(response.data));
                } else {
                    dispatch(getSearchAnnualLeaveRecord(response.data));
                }
            } else {
                console.error('API 호출 실패:', response);
            }
        } catch (error) {
            console.error('연차 내역 조회 에러:', error);
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

export const callAttendanceRequestStatusAPI = (startDate, endDate) => {
    return async (dispatch) => {
        try {
            const response = await authRequest.get(`/attendance/request_status?startDate=${startDate}&endDate=${endDate}`);
            if (response.status === 200) {
                dispatch(getAttendanceRequestStatus(response.data));
            } else {
                console.error('API 호출 실패:', response);
                // 에러 처리 로직 추가
            }
        } catch (error) {
            console.error('근태 신청 현황 조회 에러:', error);
            // 에러 처리 로직 추가
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
