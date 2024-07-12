import { useSelector } from "react-redux";

const InterviewereAddList = () => {

    const { interviewerId, interviewer } = useSelector(state => state.interviewScheduleReducer)

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
                        </li>
                    ))
            }
        </>
    )
}

export default InterviewereAddList;