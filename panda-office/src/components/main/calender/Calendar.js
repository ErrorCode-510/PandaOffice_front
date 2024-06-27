import CalendarApi from "../../../utils/CalendarApi"

function Calender() {
  return(
    <div className='main-calender'>
        <div className="calender-wrap">
            <div className="calender api">
                  <CalendarApi height="570px"/>
            </div>
            <div className="calender preview-area">
                <div className="preview">
                  
                </div>
            </div>
          </div>
      </div>
  )
}

export default Calender;