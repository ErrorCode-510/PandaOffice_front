import AnnualLeaveCalendarLeft from "./AnnualLeaveCalendarLeft";
import AnnualLeaveCalendarRight from "./AnnualLeaveCalendarRight";

function Calendar() {
  return(
    <div className='main-calender'>
        <div className="calender-wrap">
            <div className="calender api">
                  <AnnualLeaveCalendarLeft height="570px"/>
            </div>
            <div className="calender preview-area">
              <AnnualLeaveCalendarRight height="570px"/>
                <div className="preview">
                
                  
                </div>
            </div>
          </div>
      </div>
  );
}

export default Calendar;
