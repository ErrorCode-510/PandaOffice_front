import {NavLink, useLocation} from "react-router-dom";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {useEffect, useState} from "react";

function NoticeSidebar() {

    // 현재 경로를 확인하기 위해 location 훅 사용
    const location = useLocation();
    const isRootPath = location.pathname === "/";

    // 메인, 서브, 이벤트 섹션의 열림/닫힘 상태를 관리하는 상태 훅
    const [isMainOpen, setIsMainOpen] = useState(false);
    const [isSubOpen, setIsSubOpen] = useState(false);
    const [isEventOpen, setIsEventOpen] = useState(false);

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

    const toggleSubHandler = () => {
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

    const toggleEventHandler = () => {
        const newEventStatue = !isEventOpen;
        setIsEventOpen(newEventStatue);
        localStorage.setItem("eventHandler", JSON.stringify(newEventStatue));
    };

    useEffect(() => {
        const savedEventStorage = localStorage.getItem("eventHandler");
        if (savedEventStorage != null) {
            setIsEventOpen(JSON.parse(savedEventStorage));
        }
    }, []);

    return (
        <>
            <div className={`side-wrap ${isRootPath ? 'collapsed' : ''}`}>
                <div className="side-bar">
                    <div className="title">게시판</div>
                    <button className="add-btn">글쓰기</button>
                    <ul className="mt-30 txt-align-left">
                        <li>
                            <div className="sidebar-item" onClick={toggleMainHandler}>
                                {isMainOpen ? <IoIosArrowDown className="sidebar-icons toggle-down"/> :
                                    <IoIosArrowUp className="sidebar-icons toggle-up"/>}
                                <span className="icons-text fs-18 cursor-p">공지사항</span>
                            </div>
                            {isMainOpen && (
                                <ul className="mt-10">
                                        <NavLink to="/notice/all-notice">
                                            <li className="icons-text fs-14 cursor-p" style={{marginLeft:"51px"}}>전체공지</li>
                                        </NavLink>
                                    <li>

                                        <div className="sidebar-item" onClick={toggleSubHandler}>
                                            {isSubOpen ? <IoIosArrowDown className="sidebar-icons  mt-10 ml-20"/> :
                                                <IoIosArrowUp className="sidebar-icons ml-20"/>}
                                            <span className="icons-text fs-14 cursor-p">그룹공지</span>
                                        </div>
                                        {isSubOpen && (
                                            <ul>
                                                <NavLink to={"/accounting"}>
                                                    <li className="icons-text fs-12 mt-10 ml-55 cursor-p">회계</li>
                                                </NavLink>
                                                <NavLink to={"/sales"}>
                                                    <li className="icons-text fs-12 mt-10 ml-55 cursor-p">영업</li>
                                                </NavLink>
                                                <NavLink to={"/hr"}>
                                                    <li className="icons-text fs-12 mt-10 ml-55 cursor-p">인사</li>
                                                </NavLink>
                                                <NavLink to={"/marketing"}>
                                                    <li className="icons-text fs-12 mt-10 ml-55 cursor-p">마케팅</li>
                                                </NavLink>
                                                <NavLink to={"/planning"}>
                                                    <li className="icons-text fs-12 mt-10 ml-55 cursor-p">기획</li>
                                                </NavLink>
                                            </ul>
                                        )}
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <div className="sidebar-item" onClick={toggleEventHandler} style={{marginTop: '20px'}}>
                                {isEventOpen ? <IoIosArrowDown className="sidebar-icons toggle-down"/> :
                                    <IoIosArrowUp className="sidebar-icons toggle-up"/>}
                                <span className="icons-text fs-18 cursor-p">경조사</span>
                            </div>
                            {isEventOpen && (
                                <ul className="mt-10">
                                    <li className="icons-text fs-12 mt-10 ml-35 cursor-p">결혼</li>
                                    <li className="icons-text fs-12 mt-10 ml-35 cursor-p">부고</li>
                                    <li className="icons-text fs-12 mt-10 ml-35 cursor-p">돌잔치</li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default NoticeSidebar;