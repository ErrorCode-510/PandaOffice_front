import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import Clock from '../../utils/Clock';
import { RiMegaphoneLine } from 'react-icons/ri';
import { FaRegUser } from 'react-icons/fa';
import { LiaBusinessTimeSolid } from 'react-icons/lia';
import { FaRegFolderOpen } from 'react-icons/fa6';
import { PiHandshakeLight } from 'react-icons/pi';
import { TfiHeadphoneAlt } from 'react-icons/tfi';
import { LiaSitemapSolid } from 'react-icons/lia';
import { callCheckInAPI, callCheckOutAPI } from '../attendance/AttendanceModules2';

function Navbar() {
    const dispatch = useDispatch();
    const location = useLocation();
    const isRootPath = location.pathname === "/";

    const handleCheckIn = () => {
        const attendanceData = {
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString()
        };
        dispatch(callCheckInAPI(attendanceData));
    };

    const handleCheckOut = () => {
        const attendanceData = {
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString()
        };
        dispatch(callCheckOutAPI(attendanceData));
    };

    return (
        <div className={`nav-wrap ${isRootPath ? '' : 'collapsed'}`}>
            <div className="side-nav">
                <div className="side-clock">
                    <Clock />
                </div>
                <div className="check-button">
                    <button onClick={handleCheckIn}>출근</button>
                    <button onClick={handleCheckOut}>퇴근</button>
                </div>
                <ul className="department-list">
                    <li>
                        <NavLink to="/notice/all-notice" className="nav-link">
                            <RiMegaphoneLine className="side-icons" />
                            <p>공지사항</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/employee/employeeList" className="nav-link">
                            <FaRegUser className="side-icons" />
                            <p>인사</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/attendance" className="nav-link">
                            <LiaBusinessTimeSolid className="side-icons" />
                            <p>근태</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/e_approval" className="nav-link">
                            <FaRegFolderOpen className="side-icons sub-1" />
                            <p>문서함</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/recruitment/schedule" className="nav-link">
                            <PiHandshakeLight className="side-icons" />
                            <p>채용면접</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/welfare" className="nav-link">
                            <TfiHeadphoneAlt className="side-icons" />
                            <p>사내민원</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link">
                            <LiaSitemapSolid className="side-icons" />
                            <p>조직도</p>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
