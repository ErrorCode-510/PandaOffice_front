

export function ApprovalDocumentInfo({approvalDocument}) {
    return <>
        <div className="template-set-inner">
            <table>
                <tbody>
                    <tr>
                        <th>문서 제목</th>
                        <td>{approvalDocument.name}</td>
                    </tr>
                    <tr>
                        <th>기안자</th>
                        <td>{approvalDocument.draftEmployee.name}</td>
                    </tr>
                    <tr>
                        <th>기안일</th>
                        <td>{approvalDocument.draftDate}</td>
                    </tr>
                    <tr>
                        <th>문서 양식</th>
                        <td>{approvalDocument.templateName}</td>
                    </tr>
                    <tr>
                        <th>연동 기능</th>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <th>문서 상태</th>
                        <td>
                            {approvalDocument.status}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
}