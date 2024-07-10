import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { callAllLeaveAdjustmentAPI, callLeaveAdjustmentSearchAPI } from '../../../apis/AttendanceAPICalls';
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
                                <th rowSpan="2" className='rounded-left-top'>번호</th>
                                <th rowSpan="2">부서</th>
                                <th rowSpan="2">직급</th>
                                <th rowSpan="2">사원</th>
                                <th rowSpan="2">그룹입사일</th>
                                <th rowSpan="2">근속기간</th>
                                <th colSpan="6">부여</th>
                                <th colSpan="5">소진</th>
                                <th rowSpan="2" className="rounded-right-top">잔여</th>
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
                                    <td>{record.additionalGrant}</td>
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
                <div className="annual-leave-adjustment">
                    <h2>{selectedEmployee.employeeName} {selectedEmployee.jobName}의 연차 변경이력</h2>
                    <div className="leave-container">
                        <div className="leave-history">
                            <div className="generation-history">
                                <h3>부여 연차</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th rowSpan="2" className="rounded-left-top">번호</th>
                                            <th colSpan="5">기본 부여</th>
                                            <th rowSpan="2" className="rounded-right-top">등록 일자</th>
                                        </tr>
                                        <tr>
                                            <th className="no-radius">기본발생</th>
                                            <th>가산</th>
                                            <th>1년미만</th>
                                            <th>보상</th>
                                            <th className="no-radius">대체</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedEmployee.grantRecords && selectedEmployee.grantRecords.map((grant, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{grant.defaultGrant}</td>
                                                <td>{grant.additionalGrant}</td>
                                                <td>{grant.underOneYearGrant}</td>
                                                <td>{grant.rewardGrant}</td>
                                                <td>{grant.replaceGrant}</td>
                                                <td>{grant.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="usage-history">
                                <h3>소진 연차</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="rounded-left-top">번호</th>
                                            <th>신청(조정)일</th>
                                            <th>사용기간</th>
                                            <th>근태항목</th>
                                            <th>사용일수</th>
                                            <th className="rounded-right-top">사용 내용</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedEmployee.usedRecords && selectedEmployee.usedRecords.map((used, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{used.usedStartDate}</td>
                                                <td>{`${used.usedStartDate} ~ ${used.usedEndDate}`}</td>
                                                <td>{used.leaveSession}</td>
                                                <td>{used.usedAmount}</td>
                                                <td>{used.description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="adjustment-info">
                            <h3>조정 정보</h3>
                            <div className="adjustment-form">
                                <table className="adjust-leave-table">
                                    <tbody>
                                        <tr>
                                            <th className="rounded-left-top">잔여</th>
                                            <td><input type="text" value={selectedEmployee.remainingLeave} readOnly /></td>
                                        </tr>
                                        <tr>
                                            <th>조정 일수</th>
                                            <td className="adjust-days">
                                                <button type="button">-</button>
                                                <input type="text" value="0" readOnly />
                                                <button type="button">+</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>합계</th>
                                            <td><input type="text" value={selectedEmployee.remainingLeave} readOnly /></td>
                                        </tr>
                                        <tr>
                                            <th className="rounded-left-bottom">사유</th>
                                            <td className="reason-buttons">
                                                <button type="button">연장 근무</button>
                                                <button type="button">휴일 근무</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button type="button" className="save-button">저장</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnnualLeaveAdjustment;
