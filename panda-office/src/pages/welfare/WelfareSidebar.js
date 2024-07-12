import { NavLink, useLocation } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useEffect, useState } from "react";

function WelfareSidebar() {
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

    /* 렌더링 후 마운트 될 떄 로컬에 저장 된 상태 값을 가져와서 파싱 된 문자열을 set 
    * 애플리케이션 재실행해도 저장 값이 남아있음 */
    useEffect(() => {
        const savedMainStorage = localStorage.getItem("mainHandler")
        if (savedMainStorage !== null) {
            setIsMainOpen(JSON.parse(savedMainStorage));
        }
    }, []);

    const togglesubHandler = () => {
        const newSubState = !isSubOpen;
        setIsSubOpen(newSubState);
        localStorage.setItem("subHandler", JSON.stringify(newSubState));
    };

    useEffect(() => {
        const savedSubStorage = localStorage.getItem("subHandler")
        if (savedSubStorage !== null) {
            setIsSubOpen(JSON.parse(savedSubStorage));
        }
    }, []);

    return (
        <>
            <div className={`side-wrap ${isRootPath ? 'collapsed' : ''}`}>
                <div className="side-bar">
                    <div className="title">민원관리</div>
                    <NavLink to="/welfare/surveyregination">
                        <button className="add-btn">설문등록</button>
                    </NavLink>
                    <ul className="mt-30 txt-align-left">
                        <li>
                            <div className="sidebar-item" onClick={toggleMainHandler}>
                                {isMainOpen ? <IoIosArrowDown className="sidebar-icons toggle-down" /> : <IoIosArrowUp className="sidebar-icons toggle-up" />}
                                <span className="icons-text fs-18 cursor-p">민원 관리</span>
                            </div>
                            {isMainOpen && (
                                <ul className="mt-10">
                                    <li>
                                        <div className="sidebar-item" onClick={togglesubHandler}>
                                            {isSubOpen ? <IoIosArrowDown className="sidebar-icons ml-20" /> : <IoIosArrowUp className="sidebar-icons ml-20" />}
                                            <span className="icons-text fs-14 cursor-p">설문조사</span>
                                        </div>
                                        {isSubOpen && (
                                            <ul className="mt-10">
                                                <NavLink to="/welfare/surveyprogress">
                                                    <li className="icons-text fs-12 mt-10 ml-55 cursor-p">설문참여</li>
                                                </NavLink>
                                                <NavLink to="/welfare/dashboard">
                                                    <li className="icons-text fs-12 mt-10 ml-55 cursor-p">설문결과</li>
                                                </NavLink>
                                            </ul>
                                        )}

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

export default WelfareSidebar;
