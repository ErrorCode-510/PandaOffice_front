import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callAnnualLeaveRecordAPI } from '../../../apis/AttendanceAPICalls';
import './AnnualLeaveRecord.css';

const Search = () => {
    const dispatch = useDispatch();
    const annualLeaveRecord = useSelector(state => state.attendanceReducer.searchAnnualLeaveRecord);
    const currentYearStart = `${new Date().getFullYear()}-01-01`;
    const currentYearEnd = `${new Date().getFullYear()}-12-31`;
    const [startDate, setStartDate] = useState(currentYearStart);
    const [endDate, setEndDate] = useState(currentYearEnd);

    useEffect(() => {
        dispatch(callAnnualLeaveRecordAPI(currentYearStart, currentYearEnd, 'search'));
    }, [dispatch]);

    const handleSearch = () => {
        dispatch(callAnnualLeaveRecordAPI(startDate, endDate, 'search'));
    };

    if (!annualLeaveRecord) {
        return <div>로딩 중...</div>;
    }

    const { usedResponse, grantResponse } = annualLeaveRecord;

    return (
        <div className="search">
            <div className="annual-leave-search">
                <label>연차 사용기간</label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                <span>~</span>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                <button type="button" onClick={handleSearch}>검색</button>
            </div>
            <div className="leave-history">
                <h2>사용 내역</h2>
                <table>
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>부서명</th>
                            <th>휴가 종류</th>
                            <th>연차 사용기간</th>
                            <th>사용 연차</th>
                            <th>내용</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usedResponse?.annualLeaveUsedRecords?.length ? (
                            usedResponse.annualLeaveUsedRecords.map((usage, index) => (
                                <tr key={index}>
                                    <td>{usage.employeeName}</td>
                                    <td>{usage.departmentName}팀</td>
                                    <td>{usage.usedType}</td>
                                    <td>{usage.dateRange}</td>
                                    <td>{usage.usedAmount}</td>
                                    <td>{usage.leaveSession}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">연차 사용 내역이 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <h2>생성 내역</h2>
                <table>
                    <thead>
                        <tr>
                            <th>등록일</th>
                            <th>유효 기간</th>
                            <th>발생 일수</th>
                            <th>내용</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grantResponse?.grantedLeaveRecords?.length ? (
                            grantResponse.grantedLeaveRecords.map((grant, index) => (
                                <tr key={index}>
                                    <td>{grant.grantedDate}</td>
                                    <td>{grant.expirationDate}</td>
                                    <td>{grant.grantedAmount}</td>
                                    <td>{grant.annualLeaveCategory}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">연차 생성 내역이 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Search;
