import CalendarApi from "../../../utils/CalendarApi";

const ScheduleCreate = () => {
    return (
        <>
            <h1 className="schedule-title">면접 일정 등록</h1>
            <div className="schedule-create">
                <div className="schedule-form">
                    <div className="schedule-title-main">일정입력</div>
                    <div className="schedule-input-wrap">
                        <label className="schedule-title-p">
                            <p>일정명</p>
                            <input type="text" placeholder="일정명" />
                        </label>
                        <label className="schedule-date">
                            <p>일정기간</p>
                            <div className="date-box">
                                <input type="date" /> ~ <input type="date"/>
                            </div>
                        </label>
                        <label className="schedule-time">
                            <p>시간</p>
                            <input type="time" />
                        </label>
                        <label className="schedule-place">
                            <p>장소</p>
                            <select>
                                <option>면접실 선택</option>
                            </select>
                        </label>
                        {/* <select value={selectedPlace} onChange={handlePlaceChange}>
                            <option value="">장소를 선택하세요</option>
                            {places.map(place => (
                                <option key={place.id} value={place.id}>
                                    {place.name}
                                </option>
                            ))}
                        </select> */}
                        <div className="interviewer">
                            <label>
                                <p>면접관</p>
                                <div className="interviewer-list"></div>
                                <div className="add-list"></div>
                            </label>
                        </div>
                        <div className="schedule-applicant">
                            <label>
                                <p>면접자</p>
                                <button>면접자 목록</button>
                                <div className="appkicant-list-modal"></div>
                                <div className="appkicant-add"></div>
                            </label>
                        </div>
                    </div>
                    <div className="schedule-btn">
                        <button>취소</button>
                        <button>등록</button>
                    </div>
                </div>
                <div className="schedule-calendar-emp">
                    <CalendarApi
                        height='670px'
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