import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScheduleModalStatus } from "../../../modules/InterviewScheduleModules";
import { callEventsModifyAPI } from "../../../apis/InterviewScheduleAPICalls";

const ScheduleDetailModal = () => {

    const { scheduleModalStatus, selectedEvent } = useSelector(state => state.interviewScheduleReducer)

    const dispatch = useDispatch();

    const [isTrue, setIsTrue] = useState(false);
    const [formValues, setFormValues] = useState({
        id: '',
        name: '',
        employee: '',
        startDate: '',
        endDate: '',
        startTime: '',
        place: '',
        memo: '',
        applicantList: []
    });

    /* 수정 중 취소 버튼 핸들러 */
    const [initialValues, setInitialValues] = useState({
        id: '',
        name: '',
        employee: '',
        startDate: '',
        endDate: '',
        startTime: '',
        place: '',
        memo: '',
        applicantList: []
    });

    useEffect(() => {
        if (selectedEvent) {
            const initialFormValues = {
                id: selectedEvent.id || '',
                name: selectedEvent.title || '',
                employee: selectedEvent.extendedProps.employee || '',
                startDate: new Date(selectedEvent.start).toISOString().split('T')[0] || '',
                endDate: new Date(selectedEvent.end).toISOString().split('T')[0] || '',
                startTime: new Date(selectedEvent.start).toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute: '2-digit' }) || '',
                place: selectedEvent.extendedProps.place.id || {},
                memo: selectedEvent.extendedProps.memo || '',
                applicantList: selectedEvent.extendedProps.applicantList || []
            };
            setFormValues(initialFormValues);
            setInitialValues(initialFormValues);
        }
    }, [selectedEvent]);

    /* 모달창 닫기 ================================================================================================================ */

    /* 모달창 닫기 버튼 핸들러 */
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

    /* 모달창 수정 ================================================================================================================ */

    /* 수정 버튼 핸들러 */
    const handlerModifyOnClick = () => {
        setIsTrue(true);
    }

    /* 수정완료 버튼 핸들러 */
    const handlerAddModifyOnClick = () => {
        setIsTrue(false);
        handlerCancelOnClick();
        dispatch(callEventsModifyAPI(formValues));
    }

    /* 취소 버튼 핸들러 */
    const handlerClosedOnClick = () => {
        setIsTrue(false);
        setFormValues(initialValues);
    }

    /* 수정 필드 입력 핸들러 */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    return (
        <>
            {
                scheduleModalStatus &&
                <div className="sdm-wrap" onClick={handlerCloseOnClick}>
                    <div className="sdm-modal" onClick={handlerModalWrapClick}>
                        <div className="sdm-title-name">
                            <div className="flex">
                                <div className="sdm-title" style={{ marginRight: '10px' }}>일정명:</div>
                                <input
                                    className="sdm-name"
                                    value={formValues.name}
                                    disabled={!isTrue}
                                    readOnly={!isTrue}
                                    style={!isTrue ? { border: 'none', background: '#fff', color: '#000' } : {}}
                                    onChange={handleChange}
                                    name="name"
                                />
                            </div>
                            <div className="adm-applicantCount">
                                <div className="adm-applicant-name">면접자: {formValues.applicantList.length}명</div>
                            </div>
                        </div>
                        <div className="sdm-container">
                            <div>
                                <div className="sdm-emp">
                                    <div className="sdm-emp-name">면접관:</div>
                                    <input
                                        type="text"
                                        name="employee"
                                        className="sdm-emp-job"
                                        value={formValues.employee?.name || ''}
                                        disabled
                                        readOnly
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="sdm-date">
                                    <div className="sdm-date-name">시작날짜:</div>
                                    <input
                                        className="sdm-startDate"
                                        type="date"
                                        name="startDate"
                                        value={formValues.startDate}
                                        disabled={!isTrue}
                                        readOnly={!isTrue}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="sdm-date">
                                    <div className="sdm-date-name">종료날짜:</div>
                                    <input
                                        className="sdm-endDate"
                                        type="date"
                                        name="endDate"
                                        value={formValues.endDate}
                                        disabled={!isTrue}
                                        readOnly={!isTrue}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="sdm-time">
                                    <div className="sdm-time-name">일시:</div>
                                    <select
                                        className="sdm-startTime"
                                        name="startTime"
                                        disabled={!isTrue}
                                        readOnly={!isTrue}
                                        value={formValues.startTime}
                                        onChange={handleChange}
                                    >
                                        <option value="11:00">11:00</option>
                                        <option value="13:00">13:00</option>
                                        <option value="15:00">15:00</option>
                                    </select>
                                </div>
                                <div className="sdm-place">
                                    <div className="sdm-time-name">장소:</div>
                                    <select
                                        className="sdm-startTime"
                                        name="place"
                                        disabled={!isTrue}
                                        readOnly={!isTrue}
                                        value={formValues.place}
                                        onChange={handleChange}
                                    >
                                        <option value="1">면접1실</option>
                                        <option value="2">면접2실</option>
                                        <option value="3">면접3실</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <div className="sdm-memo">
                                    <div className="sdm-memo-name">비고:</div>
                                    <textarea
                                        className="sdm-memo-description"
                                        name="memo"
                                        placeholder="내용을 입력해 주세요."
                                        value={formValues.memo}
                                        disabled={!isTrue}
                                        readOnly={!isTrue}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="sdm-btn">
                            <button
                                className="sdm-cancel-btn"
                                onClick={isTrue ? handlerClosedOnClick : handlerCancelOnClick}
                            >
                                {!isTrue ? '닫기' : '취소'}
                            </button>
                            <button
                                className="sdm-modify-btn"
                                onClick={isTrue ? handlerAddModifyOnClick : handlerModifyOnClick}
                            >
                                {!isTrue ? '수정' : '수정완료'}
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ScheduleDetailModal;