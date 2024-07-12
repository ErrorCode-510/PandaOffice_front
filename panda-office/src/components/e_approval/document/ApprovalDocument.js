import { useEffect, useRef } from "react";
import { ApprovalBox } from "../draft/ApprovalBox";
import { DraftBox } from "../template/components/DraftBox";
import { DraftInfo } from "../template/components/DraftInfo";


export function ApprovalDocument({ approvalDocument }) {
    const divRef = useRef(null);
    useEffect(() => {
        divRef.current.innerHTML = approvalDocument.document
    },[])
    return <>
        <div className='cc-content align-l page-component-outer'>
            <div className='page-component-inner'>
                <div className="template-title">
                    {approvalDocument.title}
                </div>
                <div className="flex">
                    <DraftInfo draftEmployee={approvalDocument.draftEmployee} documentId={approvalDocument.id} />
                    <div className="approval-area">
                        <div className="approval-box-description">기안</div>
                        <DraftBox draftEmployee={approvalDocument.draftEmployee} />
                        {approvalDocument.approvalLineList.length > 0 &&
                            <>
                                <div className="approval-box-description">결재</div>
                                {approvalDocument.approvalLineList.map(line => {
                                    return <ApprovalBox key={line.order} employee={line.employee} status={line.status}/>
                                })}
                            </>
                        }
                    </div>
                </div>
                <div ref={divRef}>
                    {approvalDocument.document}
                </div>
            </div>
        </div>
    </>
}