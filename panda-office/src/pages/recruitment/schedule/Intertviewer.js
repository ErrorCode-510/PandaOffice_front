import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callInterviewerAPI } from "../../../apis/InterviewScheduleAPICalls";
import { GoPlus } from "react-icons/go";
import { getInterviewerId } from "../../../modules/InterviewScheduleModules";

const Interviewer = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callInterviewerAPI());
    }, [])

    const { interviewer } = useSelector(state => state.interviewScheduleReducer)
    // console.log('유즈 셀렉터 확인: ' + JSON.stringify(interviewer))

    /* 사원 ID 취득 핸들러 */
    const handlerEmployeeId = (employeeId) => {
        // console.log('사원 ID 확인: ' + JSON.stringify(employeeId))
        dispatch(getInterviewerId(employeeId));
    }

    return (
        <>
            <div className="job-wrap">
                <p className="job-title">부장</p>
                {
                    interviewer.data &&
                    interviewer.data.map(interviewer => (
                        interviewer.jobTitle === '부장' &&
                        /* handlerEmployeeId(interviewer.employeeId): interviewer는 배열이여서 핸들러에 인수 값을 명시 */
                        <li className="emp-name" key={interviewer.employeeId} onClick={() => handlerEmployeeId(interviewer.employeeId)}>
                            <p>{interviewer.name}</p>
                            <GoPlus />
                        </li>
                    ))
                }
                <p className="job-title">과장</p>
                {
                    interviewer.data &&
                    interviewer.data.map(interviewer => (
                        interviewer.jobTitle === '과장' &&
                        <li className="emp-name" key={interviewer.employeeId} onClick={() => handlerEmployeeId(interviewer.employeeId)}>
                            <p>{interviewer.name}</p>
                            <GoPlus />
                        </li>
                    ))
                }
                <p className="job-title">차장</p>
                {
                    interviewer.data &&
                    interviewer.data.map(interviewer => (
                        interviewer.jobTitle === '차장' &&
                        <li className="emp-name" key={interviewer.employeeId} onClick={() => handlerEmployeeId(interviewer.employeeId)}>
                            <p>{interviewer.name}</p>
                            <GoPlus />
                        </li>
                    ))
                }
                <p className="job-title">대리</p>
                {
                    interviewer.data &&
                    interviewer.data.map(interviewer => (
                        interviewer.jobTitle === '대리' &&
                        <li className="emp-name" key={interviewer.employeeId} onClick={() => handlerEmployeeId(interviewer.employeeId)}>
                            <p>{interviewer.name}</p>
                            <GoPlus />
                        </li>
                    ))
                }
            </div>
        </>
    )
}

export default Interviewer;