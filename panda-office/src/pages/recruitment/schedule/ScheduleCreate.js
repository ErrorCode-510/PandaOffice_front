import CalendarApi from "../../../utils/CalendarApi";

const ScheduleCreate = () => {
    return (
        <>
            <h1 className="schedule-title">면접 일정 등록</h1>
            <div className="schedule-create">
                <div className="schedule-form"></div>
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