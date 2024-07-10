import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid";

function CalendarApi({ height, headerToolbar }) {
    // 날짜 셀의 내용을 커스터마이즈하는 함수
    const customDayCellContent = ({ date }) => {
        return <span>{date.getDate()}</span>; // 날짜에서 일(날짜 숫자)만 출력
    };
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
                // 날짜 셀의 내용을 커스터마이즈하는 함수를 전달
                dayCellContent={customDayCellContent} 
            />
        </div>
    )
}

export default CalendarApi;