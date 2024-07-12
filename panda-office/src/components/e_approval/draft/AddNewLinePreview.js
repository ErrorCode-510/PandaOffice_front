export function AddNewLinePreview({employee}){
    return employee&&<>
    <div className="newLinePreview">
            <div className="new-line-preview-area">
                <div>
                    <img src="/logo192.png"></img>
                </div>
                <div>
                    {employee.department.name}
                    <br />
                    {employee.name}
                    {employee.job.title}
                </div>
            </div>
        </div>
    </>
}