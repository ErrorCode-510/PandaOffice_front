import { useSelector } from "react-redux";
import { FiMinus } from "react-icons/fi";

const InterviewereAddList = () => {

    const { interviewerId, interviewer } = useSelector(state => state.interviewScheduleReducer)
    
    return (
        <>
            {
                interviewer.data &&
                interviewer.data
                .filter(interviewer => interviewer.employeeId === interviewerId)
                .map(filteredInterviewer => (
                    <li className="ial-li" key={filteredInterviewer.employeeId}>
                        <p>
                            {filteredInterviewer.name} {filteredInterviewer.jobTitle}
                        </p>
                        <FiMinus/>
                    </li>
                ))
            }
        </>
    )
}

export default InterviewereAddList;