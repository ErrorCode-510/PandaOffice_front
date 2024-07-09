import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { callAllLeaveAdjustmentAPI, callLeaveAdjustmentSearchAPI } from '../../../apis/AttendanceAPICalls';
import AnnualLeaveHistory from './AnnualLeaveHistory';
import './AnnualLeaveAdjustment.css';

const AnnualLeaveAdjustment = () => {
    const dispatch = useDispatch();
    const [selectedYear, setSelectedYear] = useState(new Date());
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const allLeaveRecords = useSelector(state => state.attendanceReducer.allLeaveAdjustment) || []; // 기본값을 빈 배열로 설정

    useEffect(() => {
        dispatch(callAllLeaveAdjustmentAPI());
    }, [dispatch]);

    const handleYearChange = (date) => {
        setSelectedYear(date);
    };

    const handleSearch = () => {
        const year = selectedYear.getFullYear();
        dispatch(callLeaveAdjustmentSearchAPI(year));
    };

    const handleRowClick = (employee) => {
        setSelectedEmployee(employee);
    };

    if (!Array.isArray(allLeaveRecords)) {
        // allLeaveRecords가 배열이 아닌 경우 빈 배열로 설정
        return <div>로딩 중...</div>;
    }

    return (
        <div className="annual-leave-adjustment">
            <div className="header">
                <h2>연차 조정</h2>
            </div>
            <div className="search-bar">
                <label>귀속년도</label>
                <DatePicker
                    selected={selectedYear}
                    onChange={handleYearChange}
                    showYearPicker
                    dateFormat="yyyy"
                    className="year-picker"
                />
                <button type="button" className="search-button" onClick={handleSearch}>조회</button>
            </div>
            <div className="leave-info">
                <h2>연차 정보</h2>
                <table>
                    <thead>
                        <tr>
                            <th rowSpan="2">번호</th>
                            <th rowSpan="2">부서</th>
                            <th rowSpan="2">직급</th>
                            <th rowSpan="2">사원</th>
                            <th rowSpan="2">그룹입사일</th>
                            <th rowSpan="2">근속기간</th>
                            <th colSpan="6">부여</th>
                            <th colSpan="5">소진</th>
                            <th rowSpan="2" className="rounded-right">잔여</th>
                        </tr>
                        <tr>
                            <th className="no-radius">기본발생</th>
                            <th>가산</th>
                            <th>1년미만</th>
                            <th>보상</th>
                            <th>대체</th>
                            <th className="no-radius">합계</th>
                            <th>기본사용</th>
                            <th>1년미만</th>
                            <th>보상</th>
                            <th>대체</th>
                            <th className="no-radius">합계</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allLeaveRecords.map((record, index) => (
                            <tr key={index} onClick={() => handleRowClick(record)}>
                                <td>{index + 1}</td>
                                <td>{record.departmentName}</td>
                                <td>{record.jobName}</td>
                                <td>{record.employeeName}</td>
                                <td>{record.hireDate}</td>
                                <td>{record.yearsOfService}</td>
                                <td>{record.defaultGrant}</td>
                                <td>{record.underOneYearGrant}</td>
                                <td>{record.rewardGrant}</td>
                                <td>{record.replaceGrant}</td>
                                <td>{record.totalGrantedLeave}</td>
                                <td>{record.defaultUsed}</td>
                                <td>{record.underOneYearUsed}</td>
                                <td>{record.rewardUsed}</td>
                                <td>{record.replaceUsed}</td>
                                <td>{record.totalUsedLeave}</td>
                                <td>{record.remainingLeave}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedEmployee && (
                <>
                    <AnnualLeaveHistory selectedEmployee={selectedEmployee} />
                </>
            )}
        </div>
    );
};

export default AnnualLeaveAdjustment;
