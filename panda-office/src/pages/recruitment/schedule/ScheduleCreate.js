import CalendarApi from "../../../utils/CalendarApi";
import ScheduleForm from "./ScheduleForm";

const ScheduleCreate = () => {

    return (
        <>
            <h1 className="schedule-title">면접 일정 등록</h1>
            <div className="schedule-create">
                <ScheduleForm />
                <div className="schedule-calendar-emp">
                    <CalendarApi
                        height='700px'
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default ScheduleCreate;
