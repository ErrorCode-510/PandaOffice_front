import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callAttendanceRequestStatusAPI } from '../../../apis/AttendanceAPICalls';
import './AttendanceRequestStatus.css';

const Current = () => {
    const dispatch = useDispatch();
    const attendanceRequestStatus = useSelector(state => state.attendanceReducer.currentYearAttendanceRequestStatus) || {
        attendanceSummary: {},
        overTimeRecordsForToday: { overTimeRecords: [], lateRecords: [] },
        overTimeRecords: { overTimeRecords: [], lateRecords: [] },
        usedLeaveRecordsForToday: { annualLeaveUsedRecords: [] },
        annualLeaveUsedRecords: { annualLeaveUsedRecords: [] }
    };

    const nowDate = new Date().toISOString().slice(0, 10); // 현재 날짜를 yyyy-MM-dd 형식으로 표시

    useEffect(() => {
        const currentYearStart = `${new Date().getFullYear()}-01-01`;
        const currentYearEnd = `${new Date().getFullYear()}-12-31`;
        dispatch(callAttendanceRequestStatusAPI(currentYearStart, currentYearEnd, 'currentYear'));
    }, [dispatch]);

    const { attendanceSummary } = attendanceRequestStatus;

    // 임시로 사용자 이름과 부서명을 설정 (API 데이터로 대체 가능)
    const employeeName = "김민수";
    const departmentName = "인사";

    return (
        <div className="attendance-request-status">
            <div className="header">
                <span>내 근태 신청 현황</span>
                <span className="current-date">현재 날짜 : {nowDate}</span>
            </div>
            <div className="content">
                <div className="user-info">
                    <img src="user-image.png" alt="User" />
                    <span>{`${employeeName} ${departmentName}팀`}</span>
                </div>
                <div className="leave-stats">
                    <div className="stat">
                        <span>지각</span>
                        <span>{attendanceSummary.lateCount || 0}</span>
                    </div>
                    <div className="stat">
                        <span>연장 근무</span>
                        <span>{attendanceSummary.overtimeCount || 0}</span>
                    </div>
                    <div className="stat">
                        <span>휴일 근무</span>
                        <span>{attendanceSummary.holidayWorkCount || 0}</span>
                    </div>
                    <div className="stat">
                        <span>연차</span>
                        <span>{attendanceSummary.annualLeaveCount || 0}</span>
                    </div>
                    <div className="stat">
                        <span>총합</span>
                        <span>{attendanceSummary.totalCount || 0}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Current;
