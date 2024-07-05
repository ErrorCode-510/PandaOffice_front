import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

function RecruitmentSidebar() {
    const location = useLocation();
    const isRootPath = location.pathname === "/";
    const [isMainOpen, setIsMainOpen] = useState(false);
    const [isSubOpen, setIsSubOpen] = useState(false);

    const toggleMainHandler = () => {
        const newMainState = !isMainOpen;
        setIsMainOpen(newMainState);
        localStorage.setItem("mainHandler", JSON.stringify(newMainState));
    };

    const toggleSubHandler = () => {
        const newSubState = !isSubOpen;
        setIsSubOpen(newSubState);
        localStorage.setItem("subHandler", JSON.stringify(newSubState));
    };

    useEffect(() => {
        const savedMainStorage = localStorage.getItem("mainHandler");
        if (savedMainStorage !== null) {
            setIsMainOpen(JSON.parse(savedMainStorage));
        }
    }, []);

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
                    <div className="title">인사관리</div>
                    <button className="add-btn">사원 등록</button>
                    <ul className="mt-30 txt-align-left">
                        <li>
                            <div className="sidebar-item" onClick={toggleMainHandler}>
                                {isMainOpen ? <IoIosArrowDown className="sidebar-icons toggle-down" /> : <IoIosArrowUp className="sidebar-icons toggle-up" />}
                                <span className="icons-text fs-18 cursor-p">인사 관리</span>
                            </div>
                            {isMainOpen && (
                                <ul className="mt-10">
                                    <li className="icons-text fs-12 mt-10 ml-35 cursor-p">사원 조회(인사부)</li>
                                    <li className="icons-text fs-12 mt-10 ml-35 cursor-p">대충 개인 조회(일반사원)</li>
                                    <li className="icons-text fs-12 mt-10 ml-35 cursor-p">추가</li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <div className="sidebar-item" onClick={toggleSubHandler} style={{ marginTop: '20px' }}>
                                {isSubOpen ? <IoIosArrowDown className="sidebar-icons toggle-down" /> : <IoIosArrowUp className="sidebar-icons toggle-up" />}
                                <span className="icons-text fs-18 cursor-p">급여 관리</span>
                            </div>
                            {isSubOpen && (
                                <ul className>
                                    <li className="icons-text fs-12 mt-10 ml-35 cursor-p">
                                        <NavLink to="/employee/payroll/MyPay">급여(개인) 조회</NavLink>
                                    </li>
                                    <li className="icons-text fs-12 mt-10 ml-35 cursor-p">
                                        <NavLink to="/employee/payroll/EmplPayroll">급여자료입력</NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default RecruitmentSidebar;
