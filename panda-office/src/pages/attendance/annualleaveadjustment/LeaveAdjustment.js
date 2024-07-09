import React, { useState } from 'react';
import './LeaveAdjustment.css';

const LeaveAdjustment = ({ remainingLeave }) => {
    const [adjustDays, setAdjustDays] = useState(0);
    const [reason, setReason] = useState('');

    const handleDecrement = () => {
        setAdjustDays(adjustDays - 1);
    };

    const handleIncrement = () => {
        setAdjustDays(adjustDays + 1);
    };

    const handleReasonChange = (newReason) => {
        setReason(newReason);
    };

    const handleSave = () => {
        // 저장 로직 추가
        console.log('저장:', { remainingLeave, adjustDays, reason });
    };

    return (
        <div className="leave-adjustment">
            <h4 className="adjust-title">연차 부여</h4>
            <table className="adjust-leave-table">
                <tbody>
                    <tr>
                        <th className="rounded-left-top">잔여</th>
                        <td><input type="text" value={remainingLeave} readOnly /></td>
                    </tr>
                    <tr>
                        <th>조정 일수</th>
                        <td className="adjust-days">
                            <button type="button" onClick={handleDecrement}>-</button>
                            <input type="text" value={adjustDays} readOnly />
                            <button type="button" onClick={handleIncrement}>+</button>
                        </td>
                    </tr>
                    <tr>
                        <th>합계</th>
                        <td><input type="text" value={remainingLeave + adjustDays} readOnly /></td>
                    </tr>
                    <tr>
                        <th className="rounded-left-bottom">사유</th>
                        <td className="reason-buttons">
                            <button type="button" onClick={() => handleReasonChange('연장 근무')}>연장 근무</button>
                            <button type="button" onClick={() => handleReasonChange('휴일 근무')}>휴일 근무</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="button" className="save-button" onClick={handleSave}>저장</button>
        </div>
    );
};

export default LeaveAdjustment;
