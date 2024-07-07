import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callInterviewerAPI } from "../../../apis/InterviewScheduleAPICalls";
import { GoPlus } from "react-icons/go";
import { getInterviewerId } from "../../../modules/InterviewScheduleModules";

const Interviewer = ({ onInterviewerChange }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callInterviewerAPI());
    }, [])

    const { interviewer } = useSelector(state => state.interviewScheduleReducer)
    // console.log('유즈 셀렉터 확인: ' + JSON.stringify(interviewer))

    /* 사원 ID 취득 핸들러 */
    const handleEmployeeClick = (selectedInterviewer) => {
        // console.log('사원 ID 확인: ' + JSON.stringify(selectedInterviewer))
        dispatch(getInterviewerId(selectedInterviewer));
        onInterviewerChange(selectedInterviewer.employeeId)
    }

    return (
        <>
            <div className="job-wrap">
                <p className="job-title">부장</p>
                {
                    interviewer.data &&
                    interviewer.data.filter(interviewer => interviewer.jobTitle === '부장').map(filteredInterviewer => (
                        <li className="emp-name" key={filteredInterviewer.employeeId} onClick={() => handleEmployeeClick(filteredInterviewer)}>
                            <p>{filteredInterviewer.name}</p>
                            <GoPlus />
                        </li>
                    ))
                }
                <p className="job-title">과장</p>
                {
                        interviewer.data &&
                        interviewer.data.filter(interviewer => interviewer.jobTitle === '과장').map(filteredInterviewer => (
                            <li className="emp-name" key={filteredInterviewer.employeeId} onClick={() => handleEmployeeClick(filteredInterviewer)}>
                                <p>{filteredInterviewer.name}</p>
                                <GoPlus />
                            </li>
                        ))
                }
                <p className="job-title">차장</p>
                {
                      interviewer.data &&
                      interviewer.data.filter(interviewer => interviewer.jobTitle === '차장').map(filteredInterviewer => (
                          <li className="emp-name" key={filteredInterviewer.employeeId} onClick={() => handleEmployeeClick(filteredInterviewer)}>
                              <p>{filteredInterviewer.name}</p>
                              <GoPlus />
                          </li>
                      ))
                }
                <p className="job-title">대리</p>
                {
                       interviewer.data &&
                       interviewer.data.filter(interviewer => interviewer.jobTitle === '대리').map(filteredInterviewer => (
                           <li className="emp-name" key={filteredInterviewer.employeeId} onClick={() => handleEmployeeClick(filteredInterviewer)}>
                               <p>{filteredInterviewer.name}</p>
                               <GoPlus />
                           </li>
                       ))
                }
            </div>
        </>
    )
}

export default Interviewer;