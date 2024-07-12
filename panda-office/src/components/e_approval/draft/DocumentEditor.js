import { useDispatch, useSelector } from "react-redux";
import { DraftBox } from "../template/components/DraftBox";
import { DraftInfo } from "../template/components/DraftInfo";
import { ApprovalBox } from "./ApprovalBox";
import { WebEditor } from "../template/components/WebEditor";

export function DocumentEditor({ draftForm, onChangeFormHandler }) {
    const dispatch = useDispatch();
    const { approvalDocumentTemplate } = useSelector(state => state.e_approvalReducer)
    return (
        approvalDocumentTemplate &&
        <div className='cc-content align-l page-component-outer'>
            <div className='page-component-inner'>
                <div className="template-title">
                    {approvalDocumentTemplate.title}
                </div>
                <div className="flex">
                    <DraftInfo draftEmployee={approvalDocumentTemplate.draftEmployee}/>
                    <div className="approval-area">
                        <div className="approval-box-description">기안</div>
                        <DraftBox draftEmployee={approvalDocumentTemplate.draftEmployee} />
                        {draftForm.approvalLineList.length > 0 &&
                            <>
                                <div className="approval-box-description">결재</div>
                                {draftForm.approvalLineList.map(line => {
                                    const employee = approvalDocumentTemplate.employeeList.find(emp => emp.employeeId == line.employeeId)
                                    return <ApprovalBox employee={employee}/>
                                })}
                            </>
                        }
                    </div>
                </div>
                <div>
                    <WebEditor template={approvalDocumentTemplate.document} onChangeFormHandler={onChangeFormHandler} />
                </div>
            </div>
        </div>
    )
}