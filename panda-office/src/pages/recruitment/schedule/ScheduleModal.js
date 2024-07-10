import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getScheduleStatus } from "../../../modules/InterviewScheduleModules";
import Interviewer from "./Intertviewer";
import InterviewereAddList from "./InterviewerAddList";
import { callApplicantAllAPI, callEventsRegitstAPI } from "../../../apis/InterviewScheduleAPICalls";

const ScheduleModal = () => {

    const { scheduleStatus } = useSelector(state => state.interviewScheduleReducer)
    const { applicantList } = useSelector(state => state.interviewScheduleReducer);

    const dispatch = useDispatch();

    const initialFormValues = {
        name: "",
        memo: "",
        startDate: "",
        endDate: "",
        startTime: "",
        place: "",
        employee: "",
        applicantList: []
    };

    const [formValues, setFormValues] = useState(initialFormValues)

    /* 이벤트 추가 핸들러 */
    const handleAddEvent = () => {
        const event =
        {
            name: formValues.name,
            memo: formValues.memo,
            startDate: formValues.startDate,
            endDate: formValues.endDate,
            startTime: formValues.startTime,
            place: formValues.place,
            employee: formValues.employee,
            applicantList: formValues.applicantList
        }

        /* 등록 api 호출 */
        dispatch(callEventsRegitstAPI(event));

        // alert("면접일정 등록 완료");
        handlerCancelModal();
    };

    /* 등록 이후 값이 비어졌는지 확인 */
    useEffect(() => {
        console.log("FormValues :" + JSON.stringify(formValues));
    }, [formValues]);

    /* 입력 필드 */
    const handlerFormOnChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    /* 마운트 시 Esc 키 활성화 */
    useEffect(() => {

        window.addEventListener('keydown', handlerButtonOff);

        return () => {
            window.removeEventListener('keydown', handlerButtonOff);
        }
    }, []);

    /* 취소 버튼 모달 상태 값 변경 */
    const handlerCancelModal = () => {
        dispatch(getScheduleStatus(false));
        setFormValues({
            name: "",
            memo: "",
            startDate: "",
            endDate: "",
            startTime: "",
            place: "",
            employee: "",
            applicantList: []
        });
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

    /* 면접자 목록 불러오기 핸들러 */
    const handleApplicantList = () => {
        dispatch(callApplicantAllAPI());
    }

    /* 면접관 변경 핸들러 */
    const handleInterviewerChange = (interviewerId) => {
        setFormValues(prevState => ({
            ...prevState,
            employee: interviewerId
        }));
    };

    /* 면접자 선택 핸들러 */
    const handleSelectApplicant = (applicantId) => {
        // 이미 선택된 applicantId인지 확인
        if (!formValues.applicantList.includes(applicantId)) {
            setFormValues(prevState => ({
                ...prevState,
                applicantList: [...prevState.applicantList, applicantId]
            }));
        }
    };

    /* 모달 열릴 때 formValues 초기화 */
    useEffect(() => {
        if (scheduleStatus) {
            setFormValues(initialFormValues);
        }
    }, [scheduleStatus]);

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
                                        <td>
                                            <select
                                                className="schedule-time"
                                                name="startTime"
                                                value={formValues.startTime}
                                                onChange={handlerFormOnChange}
                                            >
                                                <option>시간 선택</option>
                                                <option value="11:00">11:00</option>
                                                <option value="13:00">13:00</option>
                                                <option value="15:00">15:00</option>
                                            </select>
                                        </td>
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
                                                <option value="1">면접1실</option>
                                                <option value="2">면접2실</option>
                                                <option value="3">면접3실</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="schedule-label"><label>면접관</label></td>
                                        <td className="dis-flex">
                                            <div className="interviewer-list">
                                                <p className="interviewer-job-name">면접관 추가</p>
                                                <Interviewer onInterviewerChange={handleInterviewerChange} />
                                            </div>
                                            <div className="add-list">
                                                <InterviewereAddList />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="schedule-label">
                                            <label>
                                                면접자<br />
                                                <button onClick={handleApplicantList}>면접자목록</button>
                                            </label>
                                        </td>
                                        <td>
                                            <div className="applicant-list">
                                                <div className="applicant-item applicant-fixed">
                                                    <div>이름</div>
                                                    <div>생년월일</div>
                                                    <div>성별</div>
                                                </div>
                                                {
                                                    applicantList.data &&
                                                    applicantList.data.map(applicant => (
                                                        <div
                                                            key={applicant.id}
                                                            className="applicant-item applicant-hover"
                                                            /* 전체 선택 */
                                                            onClick={() => handleSelectApplicant(applicant.id)}
                                                        >
                                                            <div>{applicant.name}</div>
                                                            <div>{applicant.birthDate}</div>
                                                            <div>{applicant.gender}</div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="schedule-memo">
                            <div className="schedule-memo-title">메모</div>
                            <textarea
                                className="schedule-memo-text"
                                placeholder="내용을 입력해주세요."
                                onChange={handlerFormOnChange}
                                value={formValues.memo}
                                name="memo"
                            ></textarea>
                        </div>
                        <div className="schedule-btn">
                            <button onClick={handlerCancelModal}>취소</button>
                            <button onClick={handleAddEvent}>등록</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ScheduleModal;
