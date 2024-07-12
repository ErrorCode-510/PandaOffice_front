import React from 'react';
import Current from './Current';
import Search from './Search';
import './AttendanceRequestStatus.css';

const AttendanceRequestStatus = () => {
    return (
        <div>
            <Current />
            <Search />
        </div>
    );
};

export default AttendanceRequestStatus;
