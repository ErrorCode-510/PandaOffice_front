

export function DraftBox({draftEmployee}) {


    return (
        <div className="approval-box">
            <div className="approval-box-cover">{draftEmployee.department.name}</div>
            <div className="approval-box-content">{draftEmployee.name}<br/>{draftEmployee.job.title}</div>
            <div className="approval-box-cover">{`${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`}</div>
        </div>
    )
}