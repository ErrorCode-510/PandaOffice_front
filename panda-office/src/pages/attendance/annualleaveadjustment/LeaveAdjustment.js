import React from 'react';
import './LeaveAdjustment.css';

const LeaveAdjustment = () => {
    return (
        <div className="leave-adjustment">
            <h4 className="adjust-title">연차 부여</h4>
            <table className="adjust-leave-table">
                <tbody>
                    <tr>
                        <th className="rounded-left-top">잔여</th>
                        <td><input type="text" value="0" readOnly /></td>
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
    );
};

export default LeaveAdjustment;
