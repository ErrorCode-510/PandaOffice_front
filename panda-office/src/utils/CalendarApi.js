import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"

function CalendarApi() {    
    return (
        <div style={{marginLeft:"10px"}}>
            <FullCalendar 
                defaultView = "dayGridMonth" 
                plugins = {[
                    dayGridPlugin
                ]}
                 height={570}
                
            />
        </div>
    )
}

export default CalendarApi;