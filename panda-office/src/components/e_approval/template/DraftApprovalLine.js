import { useEffect, useState } from "react";
import { AddNewLine } from "../draft/AddNewLine";
import { useSelector } from "react-redux";
import { CurrentLine } from "../draft/CurrentLine";

export function DraftApprovalLine({ draftForm, setDraftForm }) {
    const { approvalDocumentTemplate } = useSelector(state => state.e_approvalReducer)
    const [approvalLineIdList, setApprovalLineIdList] = useState([]);
    useEffect(() => {
        setDraftForm(state => {
            const parseOrder = approvalLineIdList.map((empId, index) => ({ order: index + 1, employeeId: empId }));
            return { ...state, approvalLineList: parseOrder };
        });
    }, [approvalLineIdList]);

    return (
        <div className="template-set-inner">
            {approvalLineIdList.length > 0 &&
                <div className="approval-line-list">
                    {approvalLineIdList.map((empId, index) => {
                        const employee = approvalDocumentTemplate.employeeList.find(emp => emp.employeeId == empId)
                        employee.index = index
                        return <CurrentLine key={index} employee={employee} setApprovalLineIdList={setApprovalLineIdList} />
                    })
                    }
                </div>
            }
            <AddNewLine setApprovalLineIdList={setApprovalLineIdList} />
        </div>
    )
}