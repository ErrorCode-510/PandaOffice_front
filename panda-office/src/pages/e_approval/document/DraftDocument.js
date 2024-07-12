import { useEffect, useState } from "react";
import { DraftApprovalLine } from "../../../components/e_approval/template/DraftApprovalLine";
import { DocumentEditor } from "../../../components/e_approval/draft/DocumentEditor";
import { useDispatch, useSelector } from "react-redux";
import { DocumentSetting } from "../../../components/e_approval/draft/DocumentSetting";
import {callPostNewApprovalDocument} from "../../../apis/e_approval/ApprovalDocumentAPICalls"


export function DraftDocument() {
    const dispatch = useDispatch();
    const { approvalDocumentTemplate } = useSelector(state => state.e_approvalReducer)
    const [draftForm, setDraftForm] = useState({
        name: '',
        documentTemplateId: null,
        document: '',
        approvalLineList: [
            // {order: 1, employeeId: 12453242}
        ]
    });
    
    const onChangeFormHandler = (e) => {
        setDraftForm(state => {
            console.log(state)
            if(e.target.id == 'document'){
                return {...state, [e.target.id]: e.target.innerHTML}
            } else{
                return { ...state, [e.target.name]: e.target.value }
            }
        }
        )
    }
    const onClickSubmit = () => {
        const formData = new FormData();
        const blobData = new Blob([JSON.stringify(draftForm)], { type: 'application/json' });
        formData.append('documentRequest', blobData)
        dispatch(callPostNewApprovalDocument(formData))
    }
    useEffect(() => {
        setDraftForm(state => ({ ...state, documentTemplateId: approvalDocumentTemplate?.id }))
    }, [approvalDocumentTemplate])
    return approvalDocumentTemplate &&
        <>
            <div className="common-comp">
                <div className='title'>전자결재 기안</div>
                <div className="flex" style={{ width: '100%' }}>
                    <div className='common-component'>
                        <div className='cc-header align-c'>기안 문서</div>
                        <DocumentEditor draftForm={draftForm} onChangeFormHandler={onChangeFormHandler} />
                    </div>
                    <div style={{ width: '20px' }}></div>
                    <div>                
                        <div className='common-component template-set-component'>
                            <div className='cc-header align-c '>문서</div>
                            <div className='cc-content align-l'>
                                <DocumentSetting setDraftForm={setDraftForm}/>
                            </div>
                        </div>
                        <div className='common-component template-set-component'>
                            <div className='cc-header align-c '>결재선</div>
                            <div className='cc-content align-l'>
                                <DraftApprovalLine draftForm={draftForm} setDraftForm={setDraftForm} />
                            </div>
                        </div>
                        <div className="align-c">
                        <button className="cancel-btn">취소</button>
                        <button className='modyfi-btn' onClick={onClickSubmit}>등록</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
}