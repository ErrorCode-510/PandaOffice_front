import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callAnnualLeaveRecordAPI } from '../../../apis/AttendanceAPICalls';
import './AnnualLeaveRecord.css';

const Current = () => {
    const dispatch = useDispatch();
    const annualLeaveRecord = useSelector(state => state.attendanceReducer.currentYearAnnualLeaveRecord);
    const nowDate = new Date().toISOString().slice(0, 10); // 현재 날짜를 yyyy-MM-dd 형식으로 표시

    useEffect(() => {
        dispatch(callAnnualLeaveRecordAPI('2024-01-01', nowDate, 'currentYear'));
    }, [dispatch, nowDate]);

    if (!annualLeaveRecord) {
        return <div>로딩 중...</div>;
    }

    const { calculateResponse, usedResponse } = annualLeaveRecord;

    return (
        <div className="current">
            <div className="header">
                <span>내 연차 내역</span>
                <span className="current-date">현재 날짜 : {nowDate}</span>
            </div>
            <div className="content">
                <div className="user-info">
                    <div className='img'>
                        <img src="/image/김민수.png" alt="User" />
                    </div>
                    <span>
                        김민수 인사 팀
                    </span>
                </div>
                <div className="leave-stats">
                    <div className="stat">
                        <span>발생 연차</span>
                        <span>{calculateResponse?.calculateLeaveRecord?.defaultLeave || 0}</span>
                    </div>
                    <div className="stat">
                        <span>부여 연차</span>
                        <span>{calculateResponse?.calculateLeaveRecord?.grantedLeave || 0}</span>
                    </div>
                    <div className="stat">
                        <span>총 연차</span>
                        <span>{calculateResponse?.calculateLeaveRecord?.totalLeave || 0}</span>
                    </div>
                    <div className="stat">
                        <span>사용 연차</span>
                        <span>{calculateResponse?.calculateLeaveRecord?.usedLeave || 0}</span>
                    </div>
                    <div className="stat">
                        <span>잔여 연차</span>
                        <span>{calculateResponse?.calculateLeaveRecord?.remainingLeave || 0}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Current;
