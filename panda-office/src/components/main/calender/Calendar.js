import CalendarApi from "../../../utils/CalendarApi";
import AnnualLeaveCalendar from "./AnnualLeaveCalendar";



function Calendar() {
  return(
    <div className='main-calender'>
        <div className="calender-wrap">
            <div className="calender api">
                  <AnnualLeaveCalendar height="570px"/>
            </div>
            <div className="calender preview-area">
                <div className="preview">
                  
                </div>
            </div>
          </div>
      </div>
  )
}

export default Calendar;