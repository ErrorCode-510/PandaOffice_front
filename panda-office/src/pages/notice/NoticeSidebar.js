import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import React,{useEffect, useState} from "react";

const categories = {
    // 전체공지
    main: [
      { name: "전체공지", path: "/notice/all-notice" },
    ],
    // 그룹공지
    group: [
        { name: "회계", path: "/notice/category/group/accounting" },
        { name: "영업", path: "/notice/category/group/sales" },
        { name: "인사", path: "/notice/category/group/hr" },
        { name: "마케팅", path: "/notice/category/group/marketing" },
        { name: "기획", path: "/notice/category/group/planning" },
      ],
      // 경조사
      event: [
        { name: "결혼", path: "/notice/category/event/marriage" },
        { name: "부고", path: "/notice/category/event/obituary" },
        { name: "돌잔치", path: "/notice/category/event/dol" },
      ],
  };

function NoticeSidebar() {

    const location = useLocation();  // 현재 경로를 확인하기 위해 useLocation 훅 사용
    const isRootPath = location.pathname === "/";  // 루트 경로 확인
    const navigate = useNavigate();

    // 메인, 서브, 이벤트 섹션의 열림/닫힘 상태를 관리하는 상태 훅
    const [isMainOpen, setIsMainOpen] = useState(false);
    const [isSubOpen, setIsSubOpen] = useState(false);
    const [isEventOpen, setIsEventOpen] = useState(false);

    /* 공지사항 섹션 열림/닫힘 상태를 토글하고 로컬 스토리지에 저장 */
    const toggleMainHandler = () => {
        const newMainState = !isMainOpen;
        setIsMainOpen(newMainState);
        /* 로컬은 문자열만 저장이 가능하여 JSON 타입으로 파싱하여 저장 */
        localStorage.setItem("mainHandler", JSON.stringify(newMainState));
    };

    /* 렌더링 후 마운트 될 때 로컬에 저장 된 상태 값을 가져와서 파싱 된 문자열을 set 
    * 애플리케이션 재실행 해도 저장 값이 남아있음 */
    useEffect(() => {
        const savedMainStorage = localStorage.getItem("mainHandler")
        if (savedMainStorage !== null) {
            setIsMainOpen(JSON.parse(savedMainStorage));
        }
    }, []);

    // 그룹공지 섹션 열림/닫힘 상태를 토글하고 로컬 스토리지에 저장
    const toggleSubHandler = () => {
        const newSubState = !isSubOpen;
        setIsSubOpen(newSubState);
        localStorage.setItem("subHandler", JSON.stringify(newSubState));
    };

    useEffect(() => {
        // 로컬 스토리지에서 그룹공지 섹션 상태를 가져와 설정
        const savedSubStorage = localStorage.getItem("subHandler")
        if (savedSubStorage !== null) {
            setIsSubOpen(JSON.parse(savedSubStorage));
        }
    }, []);

    // 경조사 섹션 열림/닫힘 상태를 토글하고 로컬 스토리지에 저장
    const toggleEventHandler = () => {
        const newEventStatue = !isEventOpen;
        setIsEventOpen(newEventStatue);
        localStorage.setItem("eventHandler", JSON.stringify(newEventStatue));
    };

    useEffect(() => {
        // 로컬 스토리지에서 경조사 섹션 상태를 가져와 설정
        const savedEventStorage = localStorage.getItem("eventHandler");
        if (savedEventStorage != null) {
            setIsEventOpen(JSON.parse(savedEventStorage));
        }
    }, []);

    // 글쓰기 버튼 클릭 시 등록 페이지로 이동하는 함수
    const handleRegistButtonClick = () => {
        navigate('/notice/regist');
    };

    return (
        <>
          <div className={`side-wrap ${isRootPath ? 'collapsed' : ''}`}>
            <div className="side-bar">
                <div className="title">게시판</div>
                <button className="add-btn" onClick={handleRegistButtonClick}>글쓰기</button>
                <ul className="mt-30 txt-align-left">
                    <li>
                        <div className="sidebar-item" onClick={toggleMainHandler}>
                            {isMainOpen ? (
                                <IoIosArrowDown className="sidebar-icons toggle-down" />
                            ) : (
                                <IoIosArrowUp className="sidebar-icons toggle-up" />
                            )}
                            <span className="icons-text fs-18 cursor-p">공지사항</span>
                        </div>
                        {isMainOpen && (
                            <ul className="mt-10">
                                {categories.main.map((item) => (
                                    <NavLink to={item.path} key={item.name}>
                                        <li className="icons-text fs-14 cursor-p" style={{ marginLeft: "51px" }}>
                                            {item.name}
                                        </li>
                                    </NavLink>
                                ))}
                                <li>
                                    <div className="sidebar-item" onClick={toggleSubHandler}>
                                        {isSubOpen ? (
                                            <IoIosArrowDown className="sidebar-icons mt-10 ml-20" />
                                        ) : (
                                            <IoIosArrowUp className="sidebar-icons ml-20" />
                                        )}
                                        <span className="icons-text fs-14 cursor-p">그룹공지</span>
                                    </div>
                                    {isSubOpen && (
                                        <ul>
                                            {categories.group.map((item) => (
                                                <NavLink to={item.path} key={item.name}>
                                                    <li className="icons-text fs-12 mt-10 ml-55 cursor-p">
                                                        {item.name}
                                                    </li>
                                                </NavLink>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <div className="sidebar-item" onClick={toggleEventHandler} style={{ marginTop: "20px" }}>
                            {isEventOpen ? (
                                <IoIosArrowDown className="sidebar-icons toggle-down" />
                            ) : (
                                <IoIosArrowUp className="sidebar-icons toggle-up" />
                            )}
                            <span className="icons-text fs-18 cursor-p">경조사</span>
                        </div>
                        {isEventOpen && (
                            <ul className="mt-10">
                                {categories.event.map((item) => (
                                    <NavLink to={item.path} key={item.name}>
                                        <li className="icons-text fs-12 mt-10 ml-35 cursor-p">
                                            {item.name}
                                        </li>
                                    </NavLink>
                                ))}
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </div>
        </>
      );
}

export default NoticeSidebar;
