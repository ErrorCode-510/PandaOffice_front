import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callInterviewerAPI } from "../../../apis/InterviewScheduleAPICalls";
import { GoPlus } from "react-icons/go";

const Interviewer = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callInterviewerAPI());
    }, [])

    const { interviewer } = useSelector(state => state.interviewScheduleReducer)
    // console.log('유즈 셀렉터 확인: ' + JSON.stringify(interviewer))

    return (
        <>
            <div className="job-wrap">
                <p className="job-title">부장</p>
                {
                    interviewer.data &&
                    interviewer.data.map(interviewer => (
                        interviewer.jobTitle === '부장' &&
                        <li className="emp-name" key={interviewer.employeeId}>
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
                        <li className="emp-name" key={interviewer.employeeId}>
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
                        <li className="emp-name" key={interviewer.employeeId}>
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
                        <li className="emp-name" key={interviewer.employeeId}>
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