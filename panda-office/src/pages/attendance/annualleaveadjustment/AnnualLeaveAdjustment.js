import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { callAllLeaveAdjustmentAPI, callLeaveAdjustmentSearchAPI } from '../../../apis/AttendanceAPICalls';
import AnnualLeaveHistory from './AnnualLeaveHistory';
import LeaveAdjustment from './LeaveAdjustment';
import './AnnualLeaveAdjustment.css';

const AnnualLeaveAdjustment = () => {
    const dispatch = useDispatch();
    const [selectedYear, setSelectedYear] = useState(new Date());
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [visibleRecords, setVisibleRecords] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const allLeaveRecords = useSelector(state => state.attendanceReducer.allLeaveAdjustment) || [];

    useEffect(() => {
        dispatch(callAllLeaveAdjustmentAPI());
    }, [dispatch]);

    useEffect(() => {
        if (allLeaveRecords.length > 0) {
            setVisibleRecords(allLeaveRecords.slice(0, 10));
        }
    }, [allLeaveRecords]);

    const handleYearChange = (date) => {
        setSelectedYear(date);
    };

    const handleSearch = () => {
        const year = selectedYear.getFullYear();
        dispatch(callLeaveAdjustmentSearchAPI(year));
    };

    const handleRowClick = (employee, index) => {
        setSelectedEmployee(employee);
        setSelectedRowIndex(index);
    };

    const fetchMoreRecords = () => {
        if (visibleRecords.length >= allLeaveRecords.length) {
            setHasMore(false);
            return;
        }
        const nextRecords = allLeaveRecords.slice(visibleRecords.length, visibleRecords.length + 10);
        setVisibleRecords(prevRecords => [...prevRecords, ...nextRecords]);
    };

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
                <InfiniteScroll
                    dataLength={visibleRecords.length}
                    next={fetchMoreRecords}
                    hasMore={hasMore}
                    loader={<h4></h4>} 
                    endMessage={<p>모든 데이터를 불러왔습니다.</p>}
                >
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
                            {visibleRecords.map((record, index) => (
                                <tr
                                    key={index}
                                    onClick={() => handleRowClick(record, index)}
                                    className={selectedRowIndex === index ? 'selected-row' : ''}
                                >
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
                </InfiniteScroll>
            </div>
            {selectedEmployee && (
                <div className="leave-section">
                    <div className="leave-history">
                        <AnnualLeaveHistory selectedEmployee={selectedEmployee} />
                    </div>
                    <div className="leave-adjustment-container">
                        <LeaveAdjustment remainingLeave={selectedEmployee.remainingLeave} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnnualLeaveAdjustment;
