import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callCheckInAPI, callCheckOutAPI } from '../../apis/AttendanceAPICalls';

export function AttendanceHandler() {
    const dispatch = useDispatch();
    const message = useSelector(state => state.attendance?.message);
    const attendanceState = useSelector(state => state.attendance);
    console.log('Attendance 상태:', attendanceState);

    useEffect(() => {
        if (message) {
            alert(message);
        }
    }, [message]);

    const handleCheckIn = async () => {
        const attendanceData = {
            date: new Date().toISOString().split('T')[0], // 'YYYY-MM-DD' 형식
            checkInTime: new Date().toTimeString().split(' ')[0] // 'HH:mm:ss' 형식
        };
        try {
            await dispatch(callCheckInAPI(attendanceData));
        } catch (error) {
            const errorMessage = error.response?.data?.message || "이미 출근하셨습니다.";
            alert(errorMessage);
        }
    };

    const handleCheckOut = async () => {
        const attendanceData = {
            date: new Date().toISOString().split('T')[0], // 'YYYY-MM-DD' 형식
            checkOutTime: new Date().toTimeString().split(' ')[0] // 'HH:mm:ss' 형식
        };
        try {
            await dispatch(callCheckOutAPI(attendanceData));
        } catch (error) {
            const errorMessage = error.response?.data?.message || "출근을 안하셨습니다.";
            alert(errorMessage);
        }
    };

    return (
        <div className="check-button" style={{marginLeft: 'auto', marginRight: 'auto'}}>
            <button onClick={handleCheckIn}>출근</button>
            <div style={{width: '10px'}}></div>
            <button onClick={handleCheckOut}>퇴근</button>
        </div>
    );
}
