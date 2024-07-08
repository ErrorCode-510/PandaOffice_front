import { useSelector } from "react-redux";
import { FiMinus } from "react-icons/fi";
import { useState } from "react";

const InterviewereAddList = () => {

    const { interviewerId, interviewer } = useSelector(state => state.interviewScheduleReducer)

    // const handleCancelOnClick = () => {
    //     /* 아~~~ 아무것도 생각이 안 난다~~~~~~~~~~~~~~~~~~~~~~~ 
    //     삭제를 어떻게하더라*/
    // }
    
    return (
        <>
        <p className="ial-p">면접관</p>
            {
                interviewer.data &&
                interviewer.data
                .filter(interviewer => interviewer.employeeId === interviewerId.employeeId)
                .map(filteredInterviewer => (
                    <li className="ial-li" key={filteredInterviewer.employeeId}>
                        <p>
                            {filteredInterviewer.name} {filteredInterviewer.jobTitle}
                        </p>
                        {/* <FiMinus/> */}
                    </li>
                ))
            }
        </>
    )
}

export default InterviewereAddList;