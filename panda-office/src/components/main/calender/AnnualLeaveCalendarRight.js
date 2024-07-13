import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAnnualLeaveCalendarAPI } from "../../../apis/AttendanceAPICalls";
import Modal from "./Modal";
import { getModal } from "../../../modules/AttendanceModules";

const AnnualLeaveCalendar = () => {
    const { annualLeaveCalendar } = useSelector(state => state.attendanceReducer);
    const dispatch = useDispatch();
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        dispatch(callAnnualLeaveCalendarAPI());
    }, [dispatch]);

    /* 캘린더 db에서 꺼내서 조회 */
    const formattedEvents = annualLeaveCalendar && annualLeaveCalendar.annualLeaveRecordCalendars
        ? annualLeaveCalendar.annualLeaveRecordCalendars.map((calendarEvent) => ({
            title: `${calendarEvent.employeeName} ${calendarEvent.employeeJob}`,
            start: calendarEvent.usedStartDate,
            end: calendarEvent.usedEndDate || calendarEvent.usedStartDate, // 종료일이 없으면 시작일로 설정
            extendedProps: {
                usedLeaveType: calendarEvent.usedLeaveType
            }
        }))
        : [];

    // FullCalendar의 글로벌 로케일 설정 배열 초기화
    if (!FullCalendar.globalLocales) {
        FullCalendar.globalLocales = [];
    }

    // FullCalendar의 글로벌 로케일 설정 추가
    FullCalendar.globalLocales.push({
        code: 'ko',
        buttonText: {
            prev: '이전',
            next: '다음',
            today: '오늘',
            week: '주',
            day: '일',
            list: '일정목록',
        },
        weekText: '주',
        allDayText: '종일',
        moreLinkText: '개',
        noEventsText: '일정이 없습니다',
    });

    /* 날짜 셀의 내용을 커스터마이즈하는 함수 */
    const customDayCellContent = ({ date }) => {
        return <span>{date.getDate()}</span>;
    };

    /* 이벤트 클릭 핸들러 */
    const handleEventClick = (info) => {
        info.jsEvent.preventDefault(); // 이벤트 기본 동작 방지
        setSelectedEvent({
            title: info.event.title,
            start: info.event.start ? info.event.start.toISOString().split('T')[0] : '',
            end: info.event.end ? info.event.end.toISOString().split('T')[0] : info.event.start.toISOString().split('T')[0], // 종료일이 없으면 시작일로 설정
            usedLeaveType: info.event.extendedProps.usedLeaveType
        }); // 클릭한 이벤트를 상태로 저장
        dispatch(getModal(true)); // 모달을 띄움
    }

    return (
        <>
            <div className="Calendar" style={{ width: '780px' }}>
                <FullCalendar
                    height='570px'
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    initialView="timeGridWeek"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'timeGridWeek,timeGridDay'
                    }}
                    locales={[FullCalendar.globalLocales[FullCalendar.globalLocales.length - 1]]}
                    locale="ko"
                    editable={true}
                    selectable={true}
                    dayCellContent={customDayCellContent}
                    events={formattedEvents}
                    display='auto'
                    eventClick={handleEventClick} // 이벤트 클릭 핸들러 추가
                />
            </div>
            {selectedEvent && <Modal event={selectedEvent} />} {/* 모달에 이벤트 정보를 전달 */}
        </>
    );
}

export default AnnualLeaveCalendar;
