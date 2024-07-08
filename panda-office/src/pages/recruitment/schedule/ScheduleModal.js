import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getScheduleStatus } from "../../../modules/InterviewScheduleModules";
import Interviewer from "./Intertviewer";
import InterviewereAddList from "./InterviewerAddList";
import { callApplicantAllAPI } from "../../../apis/InterviewScheduleAPICalls";

const ScheduleModal = ({ onAddEvent }) => {

    const { scheduleStatus } = useSelector(state => state.interviewScheduleReducer)
    const { applicantList } = useSelector(state => state.interviewScheduleReducer);

    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        name: "",
        startDate: "",
        endDate: "",
        startTime: "",
        place: "",
        interviewer: "",
        applicantList: []
    })

    /* 입력 필드 */
    const handlerFormOnChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log('이름 변경 확인: ' + JSON.stringify(value))
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
        setFormValues({})
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
            interviewer: interviewerId
        }));
        // console.log('면접관 변경 핸들러: ' + JSON.stringify(interviewerId));
    };

    /* 면접자 선택 핸들러 */
    const handleSelectApplicant = (applicantId) => {
        // 이미 선택된 applicantId인지 확인
        if (!formValues.applicantList.includes(applicantId)) {
            setFormValues(prevState => ({
                ...prevState,
                applicantList: [...prevState.applicantList, applicantId]
            }));
            // console.log('면접자 선택 핸들러: ' + JSON.stringify(applicantId));
        }
    };

    /* 이벤트 추가 핸들러 */
    const handleAddEvent = () => {
        const newEvent = {
            title: formValues.name,
            start: `${formValues.startDate}T${formValues.startTime}`,
            end: `${formValues.endDate}T${formValues.startTime}`,
            extendedProps: {
                interviewer: formValues.interviewer,
                place: formValues.place,
                applicantList: formValues.applicantList
            }
        };

        onAddEvent(newEvent);
        handlerCancelModal();
        alert("면접일정 등록 완료");
        console.log('데이터 확인: ' + JSON.stringify(formValues));
    };

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
                                                <option>11:00</option>
                                                <option>13:00</option>
                                                <option>15:00</option>
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
                                                <option>면접1실</option>
                                                <option>면접2실</option>
                                                <option>면접3실</option>
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
                                                        onClick={handleSelectApplicant(applicant.id)}
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
