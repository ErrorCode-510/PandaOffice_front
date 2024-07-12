import './AttendanceStatus.css';
import { IoIosArrowDown, IoIosArrowUp, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import { addMonths, subMonths, isAfter, format } from 'date-fns';
import { callAttendanceStatusAPI } from "../../../apis/AttendanceAPICalls";

registerLocale("ko", ko);

function AttendanceStatus() {
    const dispatch = useDispatch();
    const attendanceStatus = useSelector(state => state.attendanceReducer.attendanceStatus) || {
        attendanceRecordResponse: {
            calculatedAttendanceRecords: []
        },
        calculatedOverTimeAndLatenessRecordResponse: {
            calculatedOverTimeAndLatenessRecords: []
        }
    };

    const [openWeeks, setOpenWeeks] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());

    const toggleWeekContent = (week) => {
        const newState = !openWeeks[week];
        setOpenWeeks((prevState) => ({
            ...prevState,
            [week]: newState,
        }));
        localStorage.setItem(`week_${week}`, JSON.stringify(newState));
    };

    const handlePreviousMonth = () => {
        const newDate = subMonths(selectedDate, 1);
        setSelectedDate(newDate);
    };

    const handleNextMonth = () => {
        const currentDate = new Date();
        const newDate = addMonths(selectedDate, 1);

        if (!isAfter(newDate, currentDate)) {
            setSelectedDate(newDate);
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        const savedStates = {};
        [1, 2, 3, 4].forEach((weekNumber) => {
            const savedState = localStorage.getItem(`week_${weekNumber}`);
            if (savedState !== null) {
                savedStates[weekNumber] = JSON.parse(savedState);
            }
        });
        setOpenWeeks(savedStates);
    }, []);

    useEffect(() => {
        dispatch(callAttendanceStatusAPI(format(selectedDate, 'yyyy-MM-dd')));
    }, [dispatch, selectedDate]);

    if (!attendanceStatus.attendanceRecordResponse || !attendanceStatus.calculatedOverTimeAndLatenessRecordResponse) {
        return <div>로딩 중...</div>;
    }

    const attendanceRecord = attendanceStatus.attendanceRecordResponse?.calculatedAttendanceRecords[0] || {};
    const overTimeAndLatenessRecord = attendanceStatus.calculatedOverTimeAndLatenessRecordResponse?.calculatedOverTimeAndLatenessRecords[0] || {};

    const weekNumbers = [1, 2, 3, 4];
    const weeks = weekNumbers.map(num => `${num}주`);

    return (
        <>
            <h2>내 근태 현황</h2>
            <div className="date-navigation">
                <IoIosArrowBack className="navigation-icon" onClick={handlePreviousMonth} />
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy.MM"
                    showMonthYearPicker
                    locale="ko"
                    className="date-picker"
                    maxDate={new Date()}
                />
                <IoIosArrowForward
                    className={`navigation-icon ${isAfter(addMonths(selectedDate, 1), new Date()) ? 'disabled' : ''}`}
                    onClick={handleNextMonth}
                />
            </div>
            <div className="main-content">
                <div className="status-summary">
                    <div className="status-item">
                        <span className="status-title">이번주 누적</span>
                        <span className="status-value">{attendanceRecord.weeklyTotalTime || '0h 0m 0s'}</span>
                    </div>
                    <div className="divider"></div>
                    <div className="status-item">
                        <span className="status-title">이번주 초과</span>
                        <span className="status-value">{overTimeAndLatenessRecord.weeklyOverTime || '0h 0m 0s'}</span>
                    </div>
                    <div className="divider"></div>
                    <div className="status-item">
                        <span className="status-title">이번주 잔여</span>
                        <span className="status-value">{attendanceRecord.remainingTime || '0h 0m 0s'}</span>
                    </div>
                    <div className="divider"></div>
                    <div className="status-item">
                        <span className="status-title">이번달 누적</span>
                        <span className="status-value status-value-gray">{attendanceRecord.monthlyTotalTime || '0h 0m 0s'}</span>
                    </div>
                    <div className="divider"></div>
                    <div className="status-item">
                        <span className="status-title">이번달 연장</span>
                        <span className="status-value status-value-gray">{overTimeAndLatenessRecord.monthlyOverTime || '0h 0m 0s'}</span>
                    </div>
                </div>
            </div>

            <div className="AttendanceStatusWeekSection">
                {weeks.map((week, index) => (
                    <div key={index} className={`sidebar-item week ${openWeeks[weekNumbers[index]] ? 'open' : ''}`}>
                        <div onClick={() => toggleWeekContent(weekNumbers[index])}>
                            {openWeeks[weekNumbers[index]] ? <IoIosArrowDown className="sidebar-icons toggle-down" /> : <IoIosArrowUp className="sidebar-icons toggle-up" />}
                            <span className="icons-text fs-18 cursor-p">{week}</span>
                        </div>
                        {openWeeks[weekNumbers[index]] && attendanceRecord.weeklyStartEndTimes && (
                            <div className="week-content">
                                {Object.keys(attendanceRecord.weeklyStartEndTimes).map((weekKey) => {
                                    const weekData = attendanceRecord.weeklyStartEndTimes[weekKey].filter(day => parseInt(day.week) === weekNumbers[index]);
                                    return weekData.length > 0 && (
                                        <table key={weekKey} className="week-table">
                                            <thead>
                                                <tr>
                                                    <th>일</th>
                                                    <th>요일</th>
                                                    <th>업무 시작</th>
                                                    <th>업무 종료</th>
                                                    <th>총 근무 시간</th>
                                                    <th>근무 시간 상세</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {weekData.map((day, dayIndex) => (
                                                    <tr key={dayIndex}>
                                                        <td>{day.date}</td>
                                                        <td style={{ color: day.day === '일' ? 'red' : day.day === '토' ? 'blue' : 'black' }}>{day.day}</td>
                                                        <td>{day.start}</td>
                                                        <td>{day.end}</td>
                                                        <td>{day.dayDuration}</td>
                                                        <td>{`기본 ${day.dayDuration}`}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

export default AttendanceStatus;