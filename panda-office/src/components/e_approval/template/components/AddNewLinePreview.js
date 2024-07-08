import { useSelector } from "react-redux";

export function AddNewLinePreview({ newLine }) {
    const { infoForCreate } = useSelector(state => state.e_approvalReducer);
    return (
        <div className="newLinePreview">
            <div>결재선 추가</div>
            <div className="new-line-preview-area">
                <div>
                    <img src="/logo192.png"></img>
                </div>
                <div>
                    {infoForCreate?.departmentList.filter(dep => dep.id == newLine.departmentId).map(dep => dep.name)}
                    <br />
                    {infoForCreate?.jobList.filter(job => job.id == newLine.jobId).map(job => job.title)}
                    {infoForCreate?.employeeList.filter(emp => emp.employeeId == newLine.employeeId).map(emp => emp.name)} {infoForCreate?.employeeList.filter(emp => emp.employeeId == newLine.employeeId).map(emp => emp.job.title)}
                </div>
            </div>
        </div>
    )
}