import { useSelector } from "react-redux";
import { FiMinus } from "react-icons/fi";
import { useState } from "react";

const InterviewereAddList = () => {

    const { interviewerId, interviewer } = useSelector(state => state.interviewScheduleReducer)
    
    return (
        <>
            {
                interviewer.data &&
                interviewer.data
                .filter(interviewer => interviewer.employeeId === interviewerId.employeeId)
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