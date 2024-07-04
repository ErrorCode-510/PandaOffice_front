import CalendarApi from "../../../utils/CalendarApi";

const ScheduleCreate = () => {
    return (
        <>
            <h1 className="schedule-title">면접 일정 등록</h1>
            <div className="schedule-create">
                <div className="schedule-form">
                    <div className="schedule-input-wrap">
                        <label>일정명</label>
                        <input type="text" placeholder="일정명" />
                        <label>날짜</label>
                        <input type="date" /> ~ <input type="date"/>
                        <label>시간</label>
                        <input type="time" />
                        <label>장소</label>
                        <select>
                            <option>면접실 선택</option>
                        </select>
                        {/* <select value={selectedPlace} onChange={handlePlaceChange}>
                            <option value="">장소를 선택하세요</option>
                            {places.map(place => (
                                <option key={place.id} value={place.id}>
                                    {place.name}
                                </option>
                            ))}
                        </select> */}
                        <div className="interviewer">
                            <label></label>
                        </div>
                    </div>
                </div>
                <div className="schedule-calendar-emp">
                    <CalendarApi
                        height='620px'
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default ScheduleCreate;