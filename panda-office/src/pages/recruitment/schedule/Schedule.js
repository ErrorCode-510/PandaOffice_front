import CalendarApi from "../../../utils/CalendarApi";
import ScheduleModal from "./ScheduleModal";

const Schedule = () => {

    return (
        <>
            <div className="schedule-calendar">
                <CalendarApi 
                    height='665px'
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                />
            </div>
            <ScheduleModal />
        </>
    )
}

export default Schedule;