import { useState } from "react";
import CalendarApi from "../../../utils/CalendarApi";
import ScheduleModal from "./ScheduleModal";

const Schedule = () => {

    const [onAddEvent, setOnAddEvent] = useState();

    return (
        <>
            <div className="schedule-calendar">
                <CalendarApi
                    height='745px'
                    events={onAddEvent}
                />
            </div>
            <ScheduleModal setOnAddEvent={setOnAddEvent} />
        </>
    )
}

export default Schedule;