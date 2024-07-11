import React from 'react';
import './AnnualLeaveHistory.css';
import LeaveAdjustment from './LeaveAdjustment';

const AnnualLeaveHistory = () => {
    return (
        <div className="annual-leave-history">
            <h3><span className="employee-name">윤승희 슈퍼바이저</span>의 연차 변경이력</h3>
            <hr />
            <div className="leave-section">
                <div className="leave-details">
                    <h4>부여 연차</h4>
                    <table className="leave-table">
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
                            <tr>
                                <td>1</td>
                                <td>15</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>2024-01-01</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>1</td>
                                <td></td>
                                <td>2024-06-23</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <LeaveAdjustment />
            </div>
            <div className="leave-section full-width">
                <h4>소진 연차</h4>
                <table className="leave-table rounded-table">
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
                        <tr>
                            <td>1</td>
                            <td>2023-03-30</td>
                            <td>2023-03-30 ~ 2023-03-30</td>
                            <td>연차</td>
                            <td>1</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>2023-03-31</td>
                            <td>2023-03-31 ~ 2023-03-31</td>
                            <td>연차</td>
                            <td>1</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AnnualLeaveHistory;
