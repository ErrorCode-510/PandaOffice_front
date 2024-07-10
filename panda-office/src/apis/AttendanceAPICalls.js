import { authRequest } from './api';
import {
    /* 1.현년도 근태 현황 불러오기 */
    getAttendanceStatus,
    /* 2.현재 연차 기록 불러오기  */
    getCurrentYearAnnualLeaveRecord, 
    /* 2.검색된 연차 기록 불러오기 */
    getSearchAnnualLeaveRecord,
    /* 3.연차 캘린더에 넣을 값 불러오기 */
    getAnnualLeaveCalendar,
    /* 4.현재 년도의 근태 신청 현황 불러오기 */
    getCurrentYearAttendanceRequestStatus,
    /* 4.검색 받은 년도의 근태 신청 현황 불러오기 */
    getSearchAttendanceRequestStatus,
    /* 5.모든 사원의 현재 모든 연차 불러오기 */
    getAllLeaveAdjustment,
    /* 5.입사년도를 기준으로 검색한 사원들의 현년도 모든 연차 불러오기 */
    getLeaveAdjustmentSearch,
    saveAttendanceMessage
} from '../modules/AttendanceModules';

/* 1.내 근태 현황 확인 */
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

/* 2.내 연차 내역 확인 */
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

/* 3.연차 캘린더 확인 */
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

/* 4.내 근태 신청 현황 확인 */
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

/* 5.사원들의 연차 조정 */
export const callAllLeaveAdjustmentAPI = () => {
    return async (dispatch) => {
        try {
            const response = await authRequest.get('/attendance/all_leave_adjustment');
            if (response.status === 200) {
                dispatch(getAllLeaveAdjustment(response.data.allLeaveRecords)); // response.data.allLeaveRecords 사용
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

/* 5.입사년도를 기준으로 사원들 검색하기 */
export const callLeaveAdjustmentSearchAPI = (hireYear) => {
    return async (dispatch) => {
        try {
            const response = await authRequest.get(`/attendance/all_leave_adjustment/search?hireYear=${hireYear}`);
            if (response.status === 200) {
                dispatch(getLeaveAdjustmentSearch(response.data.allLeaveRecords)); // response.data.allLeaveRecords 사용
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

/* 6.출근 찍기 */
export const callCheckInAPI = (attendanceData) => {
    return async (dispatch) => {
        try {
            const response = await authRequest.post('/attendance/check-in', {
                checkInDate: attendanceData.checkInDate,
                checkInTime: attendanceData.checkInTime
            });
            dispatch(saveAttendanceMessage(response.data));
            return response;
        } catch (error) {
            console.error("출근 API 오류:", error.response?.data || error.message);
            const errorMessage = error.response?.data === "이미 오늘 출근 체크를 하셨습니다."
                ? error.response.data
                : "출근 체크 중 오류가 발생했습니다. 다시 시도해 주세요.";
            dispatch(saveAttendanceMessage(errorMessage));
            throw error;
        }
    };
};
/* 6.퇴근 찍기 */
export const callCheckOutAPI = (attendanceData) => {
    return async (dispatch) => {
        try {
            const response = await authRequest.put('/attendance/check-out', {
                checkInDate: attendanceData.checkInDate,
                checkOutTime: attendanceData.checkOutTime
            });
            dispatch(saveAttendanceMessage("퇴근 성공"));
            return response;
        } catch (error) {
            console.error("퇴근 API 오류:", error.response?.data || error.message);
            dispatch(saveAttendanceMessage("퇴근 실패: " + (error.response?.data || error.message)));
            throw error;
        }
    };
};
