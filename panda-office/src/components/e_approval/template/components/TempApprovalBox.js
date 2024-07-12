import { useSelector } from "react-redux"



export function TempApprovalBox({ lineRequest }) {
    const { infoForCreate } = useSelector(state => state.e_approvalReducer)
    let employee = null;
    if(lineRequest.employeeId){
        employee = infoForCreate.employeeList.find(emp=>emp.employeeId == lineRequest.employeeId);
    } else if (lineRequest.departmentId == 0 && lineRequest.jobId){
        employee = {
            name: '', 
            job: infoForCreate.jobList.find(job=>job.id == lineRequest.jobId), 
            department: {id: 0, name: '기안부서'}}
    } else if (lineRequest.departmentId && lineRequest.jobId){
        employee = {
            name: '', 
            job: infoForCreate.jobList.find(job=>job.id == lineRequest.jobId),
            department: infoForCreate.departmentList.find(dept=>dept.id == lineRequest.departmentId)
        }
    } else {
        employee = {
            name: '',
            job: infoForCreate.jobList.find(job=>job.title == "사장"),
            department: {id: null, name: null}
        }
    }
    return (
        employee&&
        <div className="approval-box">
            <div className="approval-box-cover">{employee.department.name}</div>
            <div className="approval-box-content">{employee.name}<br/>{employee.job.title}</div>
            <div className="approval-box-cover"></div>
        </div>
    )
}

