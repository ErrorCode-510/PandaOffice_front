import { NavLink, useLocation } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useEffect, useState } from "react";

function AttendanceSidebar() {

    const location = useLocation();
    const isRootPath = location.pathname === "/";
    const [isMainOpen, setIsMainOpen] = useState(false);
    const [isSubOpen, setIsSubOpen] = useState(false);

    /* 로컬에 열림/닫힘 상태 값 boolean 형태로 저장하기 */
    const toggleMainHandler = () => {
        const newMainState = !isMainOpen;
        setIsMainOpen(newMainState);
        /* 로컬은 문자열만 저장이 가능하여 JSON 타입으로 파싱하여 저장 */
        localStorage.setItem("mainHandler", JSON.stringify(newMainState));
    };

    /* 렌더링 후 마운트 될 때 로컬에 저장된 상태 값을 가져와서 파싱된 문자열을 set 
    * 애플리케이션 재실행해도 저장 값이 남아있음 */
    useEffect(() => {
        const savedMainStorage = localStorage.getItem("mainHandler");
        if (savedMainStorage !== null) {
            setIsMainOpen(JSON.parse(savedMainStorage));
        }
    }, []);

    const toggleSubHandler = () => {
        const newSubState = !isSubOpen;
        setIsSubOpen(newSubState);
        localStorage.setItem("subHandler", JSON.stringify(newSubState));
    };

    useEffect(() => {
        const savedSubStorage = localStorage.getItem("subHandler");
        if (savedSubStorage !== null) {
            setIsSubOpen(JSON.parse(savedSubStorage));
        }
    }, []);

    return (
        <>
            <div className={`side-wrap ${isRootPath ? 'collapsed' : ''}`}>
                <div className="side-bar">
                    <div className="title">근태 관리</div>
                    <ul className="mt-30 txt-align-left">
                        <li>
                            <div className="sidebar-item" onClick={toggleMainHandler}>
                                {isMainOpen ? <IoIosArrowDown className="sidebar-icons toggle-down" /> : <IoIosArrowUp className="sidebar-icons toggle-up" />}
                                <span className="icons-text fs-18 cursor-p">근태 관리</span>
                            </div>
                            {isMainOpen && (
                                <ul className="mt-10">
                                    <li>
                                        <div className="sidebar-item" onClick={toggleSubHandler}>
                                            {isSubOpen ? <IoIosArrowDown className="sidebar-icons ml-20" /> : <IoIosArrowUp className="sidebar-icons ml-20" />}
                                            <span className="icons-text fs-14 cursor-p">내 근태 관리</span>
                                        </div>
                                        {isSubOpen && (
                                            <ul className="mt-10">
                                                <li>
                                                    <NavLink to="/attendance/management/status" className="icons-text fs-12 mt-10 ml-55 cursor-p">
                                                        내 근태 현황
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/attendance/management/annual_leave_record" className="icons-text fs-12 mt-10 ml-55 cursor-p">
                                                        내 연차 내역
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                    <li>
                                        <NavLink to="/attendance/request_status" className="icons-text fs-14 mt-10 ml-55 cursor-p">
                                            근태 신청 현황
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/attendance/annual_leave_adjustment" className="icons-text fs-14 mt-10 ml-55 cursor-p">
                                            전 사원 연차 내역
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default AttendanceSidebar;
