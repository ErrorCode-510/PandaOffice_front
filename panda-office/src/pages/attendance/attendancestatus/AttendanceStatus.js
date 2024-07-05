import './AttendanceStatus.css';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useEffect, useState } from "react";

function AttendanceStatus() {
    const [openWeeks, setOpenWeeks] = useState({});

    const toggleWeekContent = (week) => {
        const newState = !openWeeks[week];
        setOpenWeeks((prevState) => ({
            ...prevState,
            [week]: newState,
        }));
        localStorage.setItem(`week_${week}`, JSON.stringify(newState));
    };

    useEffect(() => {
        const savedStates = {};
        ['1주', '2주', '3주', '4주', '5주'].forEach((week) => {
            const savedState = localStorage.getItem(`week_${week}`);
            if (savedState !== null) {
                savedStates[week] = JSON.parse(savedState);
            }
        });
        setOpenWeeks(savedStates);
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
            </div>

            <div className="AttendanceStatusWeekSection">
                {['1주', '2주', '3주', '4주', '5주'].map((week, index) => (
                    <div key={index} className={`sidebar-item week ${openWeeks[week] ? 'open' : ''}`}>
                        <div onClick={() => toggleWeekContent(week)}>
                            {openWeeks[week] ? <IoIosArrowDown className="sidebar-icons toggle-down" /> : <IoIosArrowUp className="sidebar-icons toggle-up" />}
                            <span className="icons-text fs-18 cursor-p">{week}</span>
                        </div>
                        {openWeeks[week] && (
                            <div className="week-content">
                                <table className="week-table">
                                    <thead>
                                        <tr>
                                            <th>번호</th>
                                            <th>일자</th>
                                            <th>업무 시작</th>
                                            <th>업무 종료</th>
                                            <th>총 근무 시간</th>
                                            <th>근무 시간 상세</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>24/월</td>
                                            <td>00:00</td>
                                            <td>00:00</td>
                                            <td>0h 0m</td>
                                            <td>기본 0h 0m / 연장 0h 0m / 휴일 0h 0m</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>31/금</td>
                                            <td>16:08</td>
                                            <td>17:06</td>
                                            <td>7h 18m</td>
                                            <td>기본 7h 18m / 연장 0h 0m / 휴일 0h 0m</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

export default AttendanceStatus;