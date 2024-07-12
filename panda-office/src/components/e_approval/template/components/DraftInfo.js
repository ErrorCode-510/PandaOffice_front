export function DraftInfo({draftSample}) {
    return (
        draftSample&&
        <div className="draft-info">
            <table>
                <tbody>
                    <tr>
                        <th>기안자</th>
                        <td>{draftSample.name}</td>
                    </tr>
                    <tr>
                        <th>기안부서</th>
                        <td>{draftSample.department.name}</td>
                    </tr>
                    <tr>
                        <th>기안일</th>
                        <td>{`${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`}</td>
                    </tr>
                    <tr>
                        <th>문서 번호</th>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}