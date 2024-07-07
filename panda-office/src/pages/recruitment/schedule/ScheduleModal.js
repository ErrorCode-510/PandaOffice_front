import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getScheduleStatus } from "../../../modules/InterviewScheduleModules";

const ScheduleModal = () => {

    const { scheduleStatus } = useSelector(state => state.interviewScheduleReducer)

    const dispatch = useDispatch();

    const [time, setTime] = useState("");
    const [formValues, setFormValues] = useState({
        name: "",
        startDate: "",
        endDate: "",
        startTime: "",
        place: "",
        memo: ""
    })

    /* 시작시간 24시간 계산 */
    useEffect(() => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        setTime(`${hours}:${minutes}`);
    }, []);

    /* 입력 필드 */
    const handlerFormOnChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(value)
    }

    /* 닫기 버튼 모달 상태 값 변경 */
    const handlerCancelModal = () => {
        dispatch(getScheduleStatus(false));
    }

    /* Esc 키로 모달 닫기 핸들러 */
    const handlerButtonOff = (e) => {
        if (e.key === 'Escape') {
            handlerCancelModal();
        }
    }

    /* 모달창 외 영역 클릭 닫기 */
    const closeModalHandler = () => {
        handlerCancelModal();
    }

    /* 모달창 외 영역 클릭 시 모달창 닫기 제어 */
    const handlerModalWrapClick = (e) => {
        e.stopPropagation();
    }

    useEffect(() => {
        window.addEventListener('keydown', handlerButtonOff);

        return () => {
            window.removeEventListener('keydown', handlerButtonOff);
        }
    }, [getScheduleStatus])

    return (
        <>
            {
                scheduleStatus &&
                <div className="schedule-create" onClick={closeModalHandler}>
                    <div className="schedule-form" onClick={handlerModalWrapClick}>
                        <div className="schedule-title-main">일정입력</div>
                        <div className="schedule-input-wrap">
                            <table className="schedule-table">
                                <tbody>
                                    <tr>
                                        <td className="schedule-label"><label>일정명</label></td>
                                        <td><input
                                            type="text"
                                            name="name"
                                            placeholder="일정명을 입력해 주세요."
                                            className="schedule-title-name"
                                            onChange={handlerFormOnChange}
                                            value={formValues.name}
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td className="schedule-label"><label>시작날짜</label></td>
                                        <td>
                                            <div className="date-box">
                                                <input
                                                    type="date"
                                                    className="schedule-date"
                                                    name="startDate"
                                                    onChange={handlerFormOnChange}
                                                    value={formValues.startDate}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="schedule-label"><label>종료날짜</label></td>
                                        <td>
                                            <div className="date-box">
                                                <input
                                                    type="date"
                                                    className="schedule-date"
                                                    name="endDate"
                                                    onChange={handlerFormOnChange}
                                                    value={formValues.endDate}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="schedule-label"><label>시간</label></td>
                                        <td><input
                                            type="time"
                                            className="schedule-time"
                                            value={time} onChange={(e) => setTime(e.target.value)}
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td className="schedule-label"><label>장소</label></td>
                                        <td>
                                            <select
                                                className="schedule-place"
                                                name="place"
                                                onChange={handlerFormOnChange}
                                                value={formValues.place}
                                            >
                                                <option>면접실 선택</option>
                                                <option>면접1실</option>
                                                <option>면접2실</option>
                                                <option>면접3실</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="schedule-label"><label>면접관</label></td>
                                        <td className="dis-flex">
                                            <div className="interviewer-list"></div>
                                            <div className="add-list"></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="schedule-label"><label>면접자<br /><button>면접자목록</button></label></td>
                                        <td>
                                            <div className="applicant-list"></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="schedule-btn">
                            <button onClick={handlerCancelModal}>취소</button>
                            <button>등록</button>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}

export default ScheduleModal;