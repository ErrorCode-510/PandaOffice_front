import { useEffect, useState } from "react"
import { IoIosCheckbox, IoIosCheckboxOutline } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { fetchSelectTemplates } from "../../../modules/E_ApprovalModules";

export function TemplateTable() {
    const { currentFolder, selectTemplates, documentTemplateFolder } = useSelector(state => state.e_approvalReducer)
    const dispatch = useDispatch();

    // const [selectTemplates, setSelectTemplates] = useState([]);
    const [selectAllTemplates, setSelectAllTemplates] = useState(false);

    const setSelect = (documentId) => {
        /* 상태값 매핑 */
        dispatch(fetchSelectTemplates(selectTemplates.includes(documentId)
                ? selectTemplates.filter(id => id !== documentId)
                : [...selectTemplates, documentId]
        ));
        setSelectAllTemplates(false);
    };
    const setSelectAll = () => {
        if(selectAllTemplates){
            dispatch(fetchSelectTemplates([]))
        } else {
            dispatch(fetchSelectTemplates(currentFolder.documentList.map(doc => doc.documentId)))
        }
        setSelectAllTemplates(!selectAllTemplates)
    }

    return currentFolder && <>
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
                    <th onClick={setSelectAll}>{selectAllTemplates
                        ? <IoIosCheckbox />
                        : <IoIosCheckboxOutline />}</th>
                    <th>제목</th>
                    <th>최종 수정자</th>
                    <th>최종 수정일</th>
                    <th>사용 여부</th>
                </tr>
            </thead>
            <tbody>
                {currentFolder.documentList.map(doc => {
                    return (
                        <tr key={doc.documentId}>
                            <td onClick={() => setSelect(doc.documentId)}>
                                {selectTemplates.includes(doc.documentId)
                                    ? <IoIosCheckbox />
                                    : <IoIosCheckboxOutline />}
                            </td>
                            <td>{doc.title}</td>
                            <td>{`${doc.lastEditorName} ${doc.lastEditorJob}`}</td>
                            <td>{doc.lastEditDate}</td>
                            <td>{doc.status}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </>
}