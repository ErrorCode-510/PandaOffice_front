import React from 'react';
import './AnnualLeaveHistoryWithAdjustment.css';

// AnnualLeaveHistoryWithAdjustment 컴포넌트
const AnnualLeaveHistoryWithAdjustment = ({ selectedEmployee }) => {
    if (!selectedEmployee) {
        return <div className="no-data">선택된 사원이 없습니다.</div>;
    }

    const grantedLeaves = selectedEmployee.grantedLeaveDetails || [];
    const usedLeaves = selectedEmployee.usedLeaveDetails || [];

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
                                <th>부여 종류</th>
                                <th>부여 날짜</th>
                                <th className="rounded-right-top">부여 연차</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grantedLeaves.length ? (
                                grantedLeaves.map((leave, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{leave.grantCategory}</td>
                                        <td>{leave.date}</td>
                                        <td>{leave.amount}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="no-data">연차 부여 내역이 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="leave-section full-width">
                <h4>소진 연차</h4>
                <table className="leave-table rounded-table bottom-table">
                    <thead>
                        <tr>
                            <th className="rounded-left-top">번호</th>
                            <th>휴가 종류</th>
                            <th>연차 사용 기간</th>
                            <th>연차 사용량</th>
                            <th className="rounded-right-top">시간</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usedLeaves.length ? (
                            usedLeaves.map((leave, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{leave.usedType}</td>
                                    <td>{leave.usedStartDate} ~ {leave.usedEndDate}</td>
                                    <td>{leave.usedAmount}</td>
                                    <td>{leave.leaveSession}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="no-data">연차 사용 내역이 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AnnualLeaveHistoryWithAdjustment;
