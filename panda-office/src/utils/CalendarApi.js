import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid";

function CalendarApi({ height, headerToolbar }) {
    return (
        <div>
            <FullCalendar
                height={height}
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                /* 캘린더 헤더 스타일 */
                headerToolbar={headerToolbar}
                /* 언어 설정 */
                locale="ko"
                /* 이벤트 편집 가능 */
                editable={true}
                /* 여러 날짜 선택 가능 */
                selectable={true}
            />
        </div>
    )
}

export default CalendarApi;