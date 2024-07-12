export function ApprovalBox({ employee, status }) {

    return (
        employee ?
            <div className="approval-box">
                <div className="approval-box-cover">{employee.department.name}</div>
                <div className="approval-box-content">{employee.name}<br/>{employee.job.title}<br/>{status?status.name:''}</div>
                <div className="approval-box-cover"></div>
            </div>:
            <div className="approval-box">
                <div className="approval-box-cover"></div>
                <div className="approval-box-content">찾을 수<br/>없음</div>
                <div className="approval-box-cover"></div>
            </div>
    )
}