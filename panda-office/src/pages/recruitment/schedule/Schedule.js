import { useState } from "react";
import CalendarApi from "../../../utils/CalendarApi";
import ScheduleModal from "./ScheduleModal";

const Schedule = () => {

    return (
        <>
            <div className="schedule-calendar">
                <CalendarApi
                    height='745px'
                />
            </div>
            <ScheduleModal />
        </>
    )
}

export default Schedule;