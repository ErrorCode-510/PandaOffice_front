import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callAttendanceRequestStatusAPI } from '../../../apis/AttendanceAPICalls';
import './AttendanceRequestStatus.css';

const Search = () => {
    const dispatch = useDispatch();
    const attendanceRequestStatus = useSelector(state => state.attendanceReducer.searchAttendanceRequestStatus) || {
        attendanceSummary: {},
        overTimeRecordsForToday: { overTimeRecords: [], lateRecords: [] },
        overTimeRecords: { overTimeRecords: [], lateRecords: [] },
        usedLeaveRecordsForToday: { annualLeaveUsedRecords: [] },
        annualLeaveUsedRecords: { annualLeaveUsedRecords: [] }
    };

    const currentYearStart = `${new Date().getFullYear()}-01-01`;
    const currentYearEnd = `${new Date().getFullYear()}-12-31`;
    const [startDate, setStartDate] = useState(currentYearStart);
    const [endDate, setEndDate] = useState(currentYearEnd);

    useEffect(() => {
        dispatch(callAttendanceRequestStatusAPI(currentYearStart, currentYearEnd, 'search'));
    }, [dispatch]);

    const handleSearch = () => {
        dispatch(callAttendanceRequestStatusAPI(startDate, endDate, 'search'));
    };

    const { overTimeRecords, annualLeaveUsedRecords } = attendanceRequestStatus;

    return (
        <div className="search">
            <div className="attendance-search">
                <label>조회 기간</label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                <span>~</span>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                <button type="button" onClick={handleSearch}>검색</button>
            </div>
            <div className="leave-history">
                <h2 className="left-align">지각: 총 {overTimeRecords.lateRecords.length}건</h2>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>근태 구분</th>
                            <th>시작일자 ~ 종료일자</th>
                            <th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {overTimeRecords.lateRecords.map((record, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>지각</td>
                                <td>{record.date} {record.startTime} ~ {record.endTime}</td>
                                <td>신청 완료</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h2 className="left-align">연장 근무 신청 현황: 총 {overTimeRecords.overTimeRecords.length}건</h2>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>근태 구분</th>
                            <th>시작일자 ~ 종료일자</th>
                            <th>소요 시간</th>
                            <th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {overTimeRecords.overTimeRecords.map((record, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{record.type}</td>
                                <td>{record.dateRange}</td>
                                <td>{record.duration}</td>
                                <td>신청 완료</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h2 className="left-align">연차 신청 현황: 총 {annualLeaveUsedRecords.annualLeaveUsedRecords.length}건</h2>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>연차 구분</th>
                            <th>시작일자 ~ 종료일자</th>
                            <th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {annualLeaveUsedRecords.annualLeaveUsedRecords.map((record, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{record.usedType}</td>
                                <td>{record.dateRange}</td>
                                <td>신청완료</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Search;
