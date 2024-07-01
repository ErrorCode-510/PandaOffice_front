import { IoIosCheckboxOutline } from "react-icons/io"
import { useSelector } from "react-redux"

export function TemplateTable() {
    const { currentFolder } = useSelector(state => state.e_approvalReducer)

    return currentFolder&&<>
        <table className="template-folder-table">
            <colgroup>
                <col style={{ width: "10%" }} />
                <col style={{ width: "30%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
            </colgroup>
            <thead>

                <tr>
                    <th><IoIosCheckboxOutline /></th>
                    <th>제목</th>
                    <th>최종 수정자</th>
                    <th>최종 수정일</th>
                    <th>사용 여부</th>
                </tr>
            </thead>
            <tbody>
                {console.log(JSON.stringify(currentFolder))}
                {currentFolder.documentList.map(doc=>{return (
                    <tr key={doc.documentId}>
                        <td><IoIosCheckboxOutline/></td>
                        <td>{doc.title}</td>
                        <td>{`${doc.employeeName} ${doc.employeeJob}`}</td>
                        <td>{doc.lastEditDate}</td>
                        <td>{doc.status}</td>
                    </tr>
                )})}
            </tbody>
        </table>
    </>
}