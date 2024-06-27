import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"

function CalendarApi({height}) {    
    return (
        <div style={{marginLeft:"10px"}}>
            <FullCalendar 
                defaultView = "dayGridMonth" 
                plugins = {[
                    dayGridPlugin
                ]}
                 height={height}
                
            />
        </div>
    )
}

export default CalendarApi;