import { useSelector } from "react-redux";
import { IoIosCloseCircle } from "react-icons/io";


export function TempCurrentLine({ setApprovalLineList, line }) {

    const { infoForCreate } = useSelector(state => state.e_approvalReducer)

    const onClickRemoveLine = () => {
        setApprovalLineList(state=>{
            const index = state.indexOf(line)
            return state.filter((line, ind)=>ind != index)
        })
    }


    let employee = null;
    if (line.employeeId) {
        employee = infoForCreate.employeeList.find(emp => emp.employeeId == line.employeeId);
    } else if (line.departmentId == 0 && line.jobId) {
        employee = {
            name: '',
            job: infoForCreate.jobList.find(job => job.id == line.jobId),
            department: { id: 0, name: '기안부서' }
        }
    } else if (line.departmentId && line.jobId) {
        employee = {
            name: '',
            job: infoForCreate.jobList.find(job => job.id == line.jobId),
            department: infoForCreate.departmentList.find(dept => dept.id == line.departmentId)
        }
    } else {
        employee = infoForCreate.employeeList.find(emp => emp.job.title = '사장')
    }

    return <>
        <div className="new-line-preview-area border-bottom-padding">
            <div>
                <img src="/logo192.png"></img>
            </div>
            <div>
                {employee.department.name}
                <br />
                {employee.name}
                {employee.job.title}
            </div>
            <IoIosCloseCircle
                className="close-button"
                onClick={onClickRemoveLine}
                />
        </div>
    </>

}