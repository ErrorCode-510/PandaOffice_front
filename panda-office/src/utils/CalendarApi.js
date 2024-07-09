import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callEventsAPI } from "../apis/InterviewScheduleAPICalls";

const CalendarApi = ({ height, events }) => {

    const dispatch = useDispatch();

    const { calendar } = useSelector(state => state.interviewScheduleReducer);
    // console.log("리덕스 확인:" + JSON.stringify(calendar));

    useEffect(() => {
        dispatch(callEventsAPI());
    }, [dispatch])

    const formattedEvents = calendar.map((calendarEvent) => ({
        title: calendarEvent.name,
        start: calendarEvent.startDate,
        end: calendarEvent.endDate,
        extendedProps: calendarEvent.extendedProps
      }));

    //   console.log("formattedEvents 확인:" + JSON.stringify(formattedEvent));

    // console.log("eventsValue 데이터 확인: " + JSON.stringify({events}))

    // FullCalendar의 글로벌 로케일 설정 배열 초기화
    if (!FullCalendar.globalLocales) {
        FullCalendar.globalLocales = [];
    }

    // FullCalendar의 글로벌 로케일 설정 추가
    FullCalendar.globalLocales.push({
        code: 'ko',
        buttonText: {
            prev: '이전달',
            next: '다음달',
            today: '오늘',
            month: '월',
            week: '주',
            day: '일',
            list: '일정목록',
        },
        weekText: '주',
        allDayText: '종일',
        moreLinkText: '개',
        noEventsText: '일정이 없습니다',
    });

    // 날짜 셀의 내용을 커스터마이즈하는 함수
    const customDayCellContent = ({ date }) => {
        return <span>{date.getDate()}</span>; // 날짜에서 일(날짜 숫자)만 출력
    };

    /* 이벤트 클릭 핸들러 */
    const handleEventClick = (e) => {
        console.log('eventClick', e);
    }

    return (
        <div>
            <FullCalendar
                height={height}
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                /* 캘린더 헤더 스타일 */
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                /* 언어 설정 */
                locales={[FullCalendar.globalLocales[FullCalendar.globalLocales.length - 1]]}
                locale="ko"
                /* 이벤트 편집 기능(일정 bar를 선택하거나 드래그) */
                editable={true}
                /* 여러 날짜 선택 가능 */
                selectable={true}
                // 날짜 셀의 내용을 커스터마이즈하는 함수를 전달
                dayCellContent={customDayCellContent}
                /* 이벤트 렌더링 */
                events={formattedEvents}
                // events={formattedEvent ? [formattedEvent] : []}
                display='auto'
                eventClick={handleEventClick}
            />
        </div>
    );
};

export default CalendarApi;