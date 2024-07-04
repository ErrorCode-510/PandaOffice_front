import { IoIosCheckbox, IoIosCheckboxOutline } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { callUpdateTemplateStatusAPI } from "../../../apis/e_approval/ApprovalDocumentFolderAPICalls";

export function TemplateManager(){
    const {currentFolder, selectTemplates} = useSelector(state=>state.e_approvalReducer)
    const dispatch = useDispatch();

    function updateTemplateStatus({status}){
        const request = {
            folderId: currentFolder.folderId,
            status: status,
            documentIdList: selectTemplates
        }
        dispatch(callUpdateTemplateStatusAPI({request: request}))
    }

    return currentFolder&&
    <>
    <div className="folder-head">
        <div className="folder-title-text">{currentFolder.name}</div>
        <div className="template-manager-button">
            <button className="template-button-navy">양식 추가</button>
            <button className="template-button-gery"
            onClick={() => {updateTemplateStatus({status: true})}}>양식 사용</button>
            <button className="template-button-gery"
            onClick={() => {updateTemplateStatus({status: false})}}>양식 미사용</button>
            <button className="template-button-gery">폴더 이동</button>
        </div>
    </div>
    </>
}