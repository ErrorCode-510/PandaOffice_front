import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScheduleModalStatus } from "../../../modules/InterviewScheduleModules";

const ScheduleDetailModal = () => {

    const { scheduleModalStatus, selectedEvent } = useSelector(state => state.interviewScheduleReducer)

    const dispatch = useDispatch();

    /* 모달창 닫기 ================================================================================================================ */

    /* 모달창 닫기/취소 버튼 */
    const handlerCancelOnClick = () => {
        dispatch(setScheduleModalStatus(false));
    }

    /* 모달 백그라운드 클릭 시 모달창 닫기 */
    const handlerCloseOnClick = () => {
        handlerCancelOnClick();
    }

    /* 모달 랩 클릭 핸들러 (이벤트 버블링 방지) */
    const handlerModalWrapClick = (e) => {
        e.stopPropagation();
    }

    /* Esc 키로 모달 닫기 핸들러 */
    const handlerButtonOff = (e) => {
        if (e.key === 'Escape') {
            handlerCloseOnClick();
        }
    }

    /* 윈도우 개체에 keydown 이벤트 리스너를 추가한다. */
    useEffect(() => {
        window.addEventListener('keydown', handlerButtonOff);

        return () => {
            window.removeEventListener('keydown', handlerButtonOff);
        }
    }, [])

    return (
        <>
            {
                scheduleModalStatus &&
                <div className="sdm-wrap" onClick={handlerCloseOnClick}>
                    <div className="sdm-modal" onClick={handlerModalWrapClick}>
                        <div className="sdm-title-name">
                            <div className="sdm-title">일정명:</div>
                            <div className="sdm-name">{selectedEvent?.title}</div>
                        </div>
                        <div className="sdm-container">
                            <div>
                                <div className="sdm-emp">
                                    <div className="sdm-emp-name">면접관:</div>
                                    <div className="sdm-emp-job">{selectedEvent?.extendedProps.employee.name}</div>
                                </div>
                                <div className="sdm-date">
                                    <div className="sdm-date-name">시작날짜:</div>
                                    <input className="sdm-startDate" type="date" name="startDate" value={new Date(selectedEvent.start).toISOString().split('T')[0]} disabled readOnly />
                                </div>
                                <div className="sdm-date">
                                    <div className="sdm-date-name">종료날짜:</div>
                                    <input className="sdm-endDate" type="date" name="endDate" value={new Date(selectedEvent.end).toISOString().split('T')[0]} disabled readOnly />
                                </div>
                                <div className="sdm-time">
                                    <div className="sdm-time-name">일시:</div>
                                    <select className="sdm-startTime" name="startTime" disabled readOnly>
                                        <option>{new Date(selectedEvent.start).toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute: '2-digit' })}</option>
                                    </select>
                                </div>
                                <div className="sdm-place">
                                    <div className="sdm-time-name">장소:</div>
                                    <select className="sdm-startTime" name="startTime" disabled readOnly >
                                        <option>{selectedEvent.extendedProps.place.name}</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <div className="sdm-memo">
                                    <div className="sdm-memo-name">비고:</div>
                                    <textarea className="sdm-memo-description" name="memo" placeholder="내용을 입력해 주세요." value={selectedEvent.extendedProps.memo} disabled readOnly></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="sdm-btn">
                            <button className="sdm-cancel-btn" onClick={handlerCancelOnClick}>닫기</button>
                        </div>
                    </div>
                </div>

            }
        </>
    )
}

export default ScheduleDetailModal;