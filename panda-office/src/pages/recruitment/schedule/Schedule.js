import CalendarApi from "../../../utils/CalendarApi";

const Schedule = () => {
    return (
        <>
            <div className="schedule-calendar">
                <CalendarApi 
                    height='735px'
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                />
            </div>
        </>
    )
}

export default Schedule;