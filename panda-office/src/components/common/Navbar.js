import { NavLink, useLocation } from "react-router-dom";
import Clock from "../../utils/Clock";
import { RiMegaphoneLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { FaRegFolderOpen } from "react-icons/fa6";
import { PiHandshakeLight } from "react-icons/pi";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { LiaSitemapSolid } from "react-icons/lia";
import {useEffect, useState} from "react";
// import { AttendanceHandler } from './AttendanceHandler';
import axios from "axios";
import {getMemberId} from "../../utils/TokenUtils";

function Navbar() {
    const [employee, setEmployee] = useState(null);
    const location = useLocation();
    const isRootPath = location.pathname === "/";
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                console.log("Fetching employee details...");
                const response = await axios.get(`http://localhost:8001/api/v1/members/employees/${getMemberId()}`);
                setEmployee(response.data);
                console.log(employee);
            } catch (error) {
                console.error('Failed to fetch employee details:', error);
            }
        };

        fetchEmployee();
    }, []);

    const depId = employee?.employee?.department?.id;


    return (
        <>
            <div className={`nav-wrap ${isRootPath ? '' : 'collapsed'}`}>
                <div className="side-nav">
                    <div className="side-clock">
                        <Clock/>
                    </div>
                    <div className="check-button">
                        <button>출근</button>
                        <button>퇴근</button>
                    </div>
                    <ul className="department-list">
                        <li>
                            <NavLink to="/notice/all-notice" className="nav-link">
                                <RiMegaphoneLine className="side-icons"/>
                                <p>공지사항</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/employee/${getMemberId()}`} className="nav-link">
                                <FaRegUser className="side-icons"/>
                                <p>인사</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/attendance" className="nav-link">
                                <LiaBusinessTimeSolid className="side-icons"/>
                                <p>근태</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/e_approval" className="nav-link">
                                <FaRegFolderOpen className="side-icons sub-1"/>
                                <p>문서함</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/recruitment/schedule" className="nav-link">
                                <PiHandshakeLight className="side-icons"/>
                                <p>채용면접</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/welfare/dashboard" className="nav-link">
                                <TfiHeadphoneAlt className="side-icons"/>
                                <p>사내민원</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link">
                                <LiaSitemapSolid className="side-icons"/>
                                <p>조직도</p>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar;