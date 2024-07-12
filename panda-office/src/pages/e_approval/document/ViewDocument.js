import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { callGetDetailDocument } from "../../../apis/e_approval/ApprovalDocumentAPICalls";
import { setDetailApprovalDocument } from "../../../modules/E_ApprovalModules";
import { ApprovalDocument } from "../../../components/e_approval/document/ApprovalDocument";
import { ApprovalDocumentInfo } from "../../../components/e_approval/document/ApprovalDocumentInfo";
import { ApprovalLine } from "../../../components/e_approval/document/ApprovalLine";


export function ViewDocument() {
    const dispatch = useDispatch();
    const { documentId } = useParams();
    const { approvalDocument } = useSelector(state => state.e_approvalReducer)
    useEffect(() => {
        dispatch(callGetDetailDocument(documentId));
        return () => {
            dispatch(setDetailApprovalDocument(null))
        }
    }, [])
    return approvalDocument &&
        <div className="common-comp">
            <div className='title'>문서 조회</div>
            <div className="flex" style={{ width: '100%' }}>
                <div className='common-component'>
                    <div className='cc-header align-c'>기안 문서</div>
                    <ApprovalDocument approvalDocument={approvalDocument} />
                </div>
                <div style={{ width: '20px' }}></div>
                <div>
                    <div className='common-component template-set-component'>
                        <div className='cc-header align-c '>문서 정보</div>
                        <div className='cc-content align-l'>
                            <ApprovalDocumentInfo approvalDocument={approvalDocument} />
                        </div>
                    </div>
                    <div className='common-component template-set-component'>
                        <div className='cc-header align-c '>결재선</div>
                        <div className='cc-content align-l'>
                            <ApprovalLine approvalDocument={approvalDocument}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
}