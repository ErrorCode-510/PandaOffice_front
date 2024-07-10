import React from 'react';
import './AnnualLeaveHistory.css';

const AnnualLeaveHistory = ({ selectedEmployee }) => {
    if (!selectedEmployee) {
        return null;
    }

    return (
        <div className="annual-leave-history">
            <h3>
                <span className="employee-name">
                    {selectedEmployee.employeeName} {selectedEmployee.jobName}
                </span>
                의 연차 변경이력
            </h3>
            <hr />
            <div className="leave-container">
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
                <div className="leave-adjustment">
                    <h4 className="adjust-title">연차 부여</h4>
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
            <div className="leave-details">
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
    );
};

export default AnnualLeaveHistory;
