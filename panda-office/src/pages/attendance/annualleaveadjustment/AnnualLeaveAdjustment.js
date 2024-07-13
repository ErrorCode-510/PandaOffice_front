import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { callLeaveAdjustmentAPI } from '../../../apis/AttendanceAPICalls';
import AnnualLeaveHistoryWithAdjustment from './AnnualLeaveHistoryWithAdjustment';
import './AnnualLeaveAdjustment.css';

const AnnualLeaveAdjustment = () => {
    const dispatch = useDispatch();
    const [selectedYear, setSelectedYear] = useState(new Date());
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [visibleRecords, setVisibleRecords] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const allLeaveRecords = useSelector(state => state.attendanceReducer.allLeaveAdjustment) || [];
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        dispatch(callLeaveAdjustmentAPI());
    }, [dispatch]);

    useEffect(() => {
        if (allLeaveRecords.length > 0) {
            setVisibleRecords(allLeaveRecords.slice(0, 10));
            setHasMore(allLeaveRecords.length > 10);
            setNoResults(false);
        } else if (allLeaveRecords.length === 0 && noResults === false) {
            setVisibleRecords([]);
            setHasMore(false);
            setNoResults(true);
            setSelectedEmployee(null);  // 검색 결과가 없을 때 변경 이력 초기화
        }
    }, [allLeaveRecords, noResults]);

    const handleYearChange = (date) => {
        setSelectedYear(date);
    };

    const handleSearch = () => {
        const year = selectedYear.getFullYear();
        setSelectedEmployee(null); // 검색 시 selectedEmployee 상태 초기화
        setSelectedRowIndex(null); // 검색 시 selectedRowIndex 상태 초기화
        setNoResults(false); // 검색 시 noResults 초기화
        dispatch(callLeaveAdjustmentAPI(year));
    };

    const handleRowClick = (employee, index) => {
        setSelectedEmployee(employee);
        setSelectedRowIndex(index);
    };

    const fetchMoreRecords = useCallback(() => {
        const currentLength = visibleRecords.length;
        if (currentLength >= allLeaveRecords.length) {
            setHasMore(false);
            return;
        }
        const nextRecords = allLeaveRecords.slice(currentLength, currentLength + 10);
        setVisibleRecords(prevRecords => [...prevRecords, ...nextRecords]);
    }, [allLeaveRecords, visibleRecords]);

    return (
        <div className="annual-leave-adjustment">
            <div className="header">
                <h2>전 사원 연차 내역</h2>
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
                {noResults ? (
                    <p>해당년도에 입사한 사원이 없습니다</p>
                ) : (
                    <div className="scrollable-table">
                        <InfiniteScroll
                            dataLength={visibleRecords.length}
                            next={fetchMoreRecords}
                            hasMore={hasMore}
                            endMessage={<p>모든 데이터를 불러왔습니다.</p>}
                        >
                            <table>
                                <thead>
                                    <tr>
                                        <th rowSpan="2" className='rounded-left-top'>번호</th>
                                        <th rowSpan="2">부서</th>
                                        <th rowSpan="2">직급</th>
                                        <th rowSpan="2">사원</th>
                                        <th rowSpan="2">그룹 입사일</th>
                                        <th rowSpan="2">근속 기간</th>
                                        <th colSpan="5">부여</th>
                                        <th colSpan="5">소진</th>
                                        <th rowSpan="2" className="rounded-right-top">잔여</th>
                                    </tr>
                                    <tr>
                                        <th className="no-radius">기본 발생</th>
                                        <th>1년 미만</th>
                                        <th>보상</th>
                                        <th>대체</th>
                                        <th className="no-radius">합계</th>
                                        <th>기본 사용</th>
                                        <th>1년 미만</th>
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
                )}
            </div>
            {selectedEmployee && (
                <div className="leave-section full-width">
                    <AnnualLeaveHistoryWithAdjustment selectedEmployee={selectedEmployee} />
                </div>
            )}
        </div>
    );
};

export default AnnualLeaveAdjustment;
