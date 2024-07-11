import React from 'react';
import './AnnualLeaveHistoryWithAdjustment.css';

const AnnualLeaveHistoryWithAdjustment = ({ selectedEmployee }) => {
    if (!selectedEmployee) {
        return null;
    }

    return (
        <div className="annual-leave-history">
            <h3>
                <span className="employee-name">
                    {selectedEmployee.employeeName} {selectedEmployee.jobName}
                </span>
                의 연차 변경 이력
            </h3>
            <hr />
            <div className="leave-section">
                <div className="leave-details">
                    <h4>부여 연차</h4>
                    <table className="leave-table top-table">
                        <thead>
                            <tr>
                                <th className="rounded-left-top">번호</th>
                                <th>기본 발생</th>
                                <th>1년 미만</th>
                                <th>보상</th>
                                <th>대체</th>
                                <th className="rounded-right-top">합계</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>{selectedEmployee.defaultGrant}</td>
                                <td>{selectedEmployee.underOneYearGrant}</td>
                                <td>{selectedEmployee.rewardGrant}</td>
                                <td>{selectedEmployee.replaceGrant}</td>
                                <td>{selectedEmployee.totalGrantedLeave}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="leave-adjustment">
                    <h4 className="adjust-title">연차 부여</h4>
                    <table className="adjust-leave-table middle-table">
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
                                <td><input type="text" value="0" readOnly /></td>
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
            <div className="leave-section full-width">
                <h4>소진 연차</h4>
                <table className="leave-table rounded-table bottom-table">
                    <thead>
                        <tr>
                            <th className="rounded-left-top">번호</th>
                            <th>기본 발생</th>
                            <th>1년 미만</th>
                            <th>보상</th>
                            <th>대체</th>
                            <th className="rounded-right-top">합계</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>{selectedEmployee.defaultUsed}</td>
                            <td>{selectedEmployee.underOneYearUsed}</td>
                            <td>{selectedEmployee.rewardUsed}</td>
                            <td>{selectedEmployee.replaceUsed}</td>
                            <td>{selectedEmployee.totalUsedLeave}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AnnualLeaveHistoryWithAdjustment;
