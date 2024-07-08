import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRef, forwardRef, useImperativeHandle, useEffect } from "react";

const CalendarApi = forwardRef(({ height, headerToolbar }, ref) => {

    const calendarRef = useRef(null);

    useImperativeHandle(ref, () => ({
        addEvent: (event) => {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.addEvent(event);
        }
    }));

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

    return (
        <div>
            <FullCalendar
                ref={calendarRef}
                height={height}
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                /* 캘린더 헤더 스타일 */
                headerToolbar={headerToolbar}
                /* 언어 설정 */
                locales={[FullCalendar.globalLocales[FullCalendar.globalLocales.length - 1]]}
                locale="ko"
                /* 이벤트 편집 가능 */
                editable={true}
                /* 여러 날짜 선택 가능 */
                selectable={true}
                // 날짜 셀의 내용을 커스터마이즈하는 함수를 전달
                dayCellContent={customDayCellContent}

            />
        </div>
    );
});

export default CalendarApi;
