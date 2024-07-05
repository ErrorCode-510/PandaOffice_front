import { useEffect, useState } from "react";
import CalendarApi from "../../../utils/CalendarApi";

const ScheduleCreate = () => {

    const [time, setTime ] = useState("");

    useEffect(() => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        setTime(`${hours}:${minutes}`);
    }, []);

    console.log('면접 시간: ' + time);
    
    return (
        <>
            <h1 className="schedule-title">면접 일정 등록</h1>
            <div className="schedule-create">
                <div className="schedule-form">
                    <div className="schedule-title-main">일정입력</div>
                    <div className="schedule-input-wrap">
                        <table className="schedule-table">
                            <tbody>
                                <tr>
                                    <td className="schedule-label"><label>일정명</label></td>
                                    <td><input type="text" placeholder="일정명을 입력해 주세요." className="schedule-title-name" /></td>
                                </tr>
                                <tr>
                                    <td className="schedule-label"><label>시작날짜</label></td>
                                    <td>
                                        <div className="date-box">
                                            <input type="date" className="schedule-date" />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="schedule-label"><label>종료날짜</label></td>
                                    <td>
                                        <div className="date-box">
                                            <input type="date" className="schedule-date" />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="schedule-label"><label>시간</label></td>
                                    <td><input type="time" className="schedule-time" value={time} onChange={(e) => setTime(e.target.value)} /></td>
                                </tr>
                                <tr>
                                    <td className="schedule-label"><label>장소</label></td>
                                    <td>
                                        <select className="schedule-place">
                                            <option>면접실 선택</option>
                                            {/* <option value="">장소를 선택하세요</option>
                                            {places.map(place => (
                                                <option key={place.id} value={place.id}>
                                                    {place.name}
                                                </option>
                                            ))} */}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="schedule-label"><label>면접관</label></td>
                                    <td className="dis-flex">
                                        <div className="interviewer-list"></div>
                                        <div className="add-list"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="schedule-label"><label>면접자<br/><button>면접자목록</button></label></td>
                                    <td>
                                        <div className="applicant-list"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="schedule-btn">
                        <button>취소</button>
                        <button>등록</button>
                    </div>
                </div>
                <div className="schedule-calendar-emp">
                    <CalendarApi
                        height='700px'
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default ScheduleCreate;
