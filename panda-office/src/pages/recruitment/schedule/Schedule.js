import { useRef } from "react";
import CalendarApi from "../../../utils/CalendarApi";
import ScheduleModal from "./ScheduleModal";

const Schedule = () => {

    const calendarRef = useRef(null);

    const handleAddEvent = (event) => {
        if (calendarRef.current) {
            calendarRef.current.addEvent(event);
        }
    };

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
            <ScheduleModal onAddEvent={handleAddEvent} />
        </>
    )
}

export default Schedule;