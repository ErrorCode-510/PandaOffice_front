import './AttendanceStatus.css';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useEffect, useState } from "react";


function AttendanceStatus() {

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
    useEffect( () => {
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

    useEffect( () => {
        const savedSubStorage = localStorage.getItem("subHandler")
        if (savedSubStorage !== null) {
            setIsSubOpen(JSON.parse(savedSubStorage));
        }
    }, []);



    return (
        <>
            <h2>내 근태 현황</h2>
            <div className="main-content">
                <div className="status-summary">
                    <div className="status-item">
                        <span className="status-title">이번주 누적</span>
                        <span className="status-value">16h 42m 48s</span>
                    </div>
                    <div className="divider"></div>
                    <div className="status-item">
                        <span className="status-title">이번주 초과</span>
                        <span className="status-value">0h 0m 0s</span>
                    </div>
                    <div className="divider"></div>
                    <div className="status-item">
                        <span className="status-title">이번주 잔여</span>
                        <span className="status-value">23h 17m 12s</span>
                    </div>
                    <div className="divider"></div>
                    <div className="status-item">
                        <span className="status-title">이번달 누적</span>
                        <span className="status-value status-value-gray">16h 42m 48s</span>
                    </div>
                    <div className="divider"></div>
                    <div className="status-item">
                        <span className="status-title">이번달 연장</span>
                        <span className="status-value status-value-gray">0h 0m 0s</span>
                    </div>
                </div>

                <div className="sidebar-item" onClick={toggleMainHandler}>
                                {isMainOpen ? <IoIosArrowDown className="sidebar-icons toggle-down"/> : <IoIosArrowUp className="sidebar-icons toggle-up"/>}
                                <span className="icons-text fs-18 cursor-p">근태 관리</span>
                </div>
            </div>
        </>
    );
}

export default AttendanceStatus;
