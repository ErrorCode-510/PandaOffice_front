import { useState } from "react";
import { ApprovalModal } from "../modal/ApprovalModal";

export function ApprovalLine({ approvalDocument }) {
    const [approvalModal, setApprovalModal] = useState(false);
    const [selectLine, setSelectLine] = useState();
    const onClickApprovalHandler = (line) => {
        setSelectLine(line);
        setApprovalModal(true);
    }
    return (
        <>
            {approvalModal && <ApprovalModal documentId={approvalDocument.id} line={selectLine} setApprovalModal={setApprovalModal} />}
            <div className="template-set-inner">
                {approvalDocument.approvalLineList.length > 0 &&
                    <div className="approval-line-list">
                        {approvalDocument.approvalLineList.map(line => {
                            return (
                                <div className="border-bottom-padding" key={line.order}>
                                    <div className="new-line-preview-area">
                                        <div>
                                            <img src="/logo192.png" alt="logo" />
                                        </div>
                                        <div>
                                            {line.employee.department.name}
                                            <br />
                                            {line.employee.name}
                                            {line.employee.job.title}
                                        </div>
                                        {line.approvalAbleList.length > 0 &&
                                            line.employee.employeeId === approvalDocument.currentEmployee.employeeId &&
                                            <button style={{ marginLeft: "100px" }}
                                                onClick={() => { onClickApprovalHandler(line) }}>결재</button>
                                        }
                                    </div>
                                    {line.handlingDate &&
                                        <div>
                                            <div style={{ width: '50px' }}></div>
                                            <div>
                                                <div className="handling-box">{line.status.name} | {line.handlingDate}</div>
                                                <div className="handling-box-comment">{line.comment}</div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            );
                        })}
                    </div>
                }
            </div>
        </>
    )
}
