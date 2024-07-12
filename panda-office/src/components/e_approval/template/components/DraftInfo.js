export function DraftInfo({draftEmployee, documentId}) {
    return (
        draftEmployee&&
        <div className="draft-info">
            <table>
                <tbody>
                    <tr>
                        <th>기안자</th>
                        <td>{draftEmployee.name}</td>
                    </tr>
                    <tr>
                        <th>기안부서</th>
                        <td>{draftEmployee.department.name}</td>
                    </tr>
                    <tr>
                        <th>기안일</th>
                        <td>{`${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`}</td>
                    </tr>
                    <tr>
                        <th>문서 번호</th>
                        <td>{documentId?documentId:''}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}