

export function DraftBox({draftSample}) {


    return (
        <div className="approval-box">
            <div className="approval-box-cover">{draftSample.department.name}</div>
            <div className="approval-box-content">{draftSample.name}<br/>{draftSample.job.title}</div>
            <div className="approval-box-cover">{`${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`}</div>
        </div>
    )
}