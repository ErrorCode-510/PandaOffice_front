import { useDispatch, useSelector } from "react-redux";
import TemplateEditor from "../../../components/e_approval/template/TemplateEditor";
import { useEffect } from "react";
import { callGetInfoForCreateTemplate } from "../../../apis/e_approval/ApprovalDocumentTemplateAPICalls";
import { ApprovalDocumentSetting } from "../../../components/e_approval/template/ApprovalDocumentSetting";
import { setCreateTemplateForm } from "../../../modules/E_ApprovalModules";

function DocumentTemplateRegist() {

    const dispatch = useDispatch();
    const {currentFolder} = useSelector(state=>state.e_approvalReducer)

    useEffect(() => {
        dispatch(callGetInfoForCreateTemplate())
        currentFolder?.folderId&&
        dispatch(setCreateTemplateForm({name: 'folderId', value: currentFolder.folderId}))
    }, [])

    const { infoForCreate } = useSelector(state => state.e_approvalReducer)


    return (
        infoForCreate &&
        <div className="common-comp">
            <div className='title'>전자결재 양식 등록</div>
            <div className="flex" style={{ width: '100%' }}>
                <div className='common-component'>
                    <div className='cc-header align-c'>양식 입력</div>
                    <TemplateEditor draftSample={infoForCreate.draftEmployee} />
                </div>
                <div style={{ width: '20px' }}></div>
                <div className='common-component template-set-component'>
                    <div className='cc-header align-c '>양식 설정</div>
                    <div className='cc-content align-l'>
                        <ApprovalDocumentSetting/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DocumentTemplateRegist;