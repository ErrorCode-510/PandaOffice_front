import { TempAddNewLine } from "./components/TempAddNewLine";
import { TempCurrentLine } from "./components/TempCurrentLine";
import { useEffect, useState } from "react";


export function TempApprovalLine({onClickApprovalLineChange}) {
    const [approvalLineList, setApprovalLineList] = useState([]);
    useEffect(() => {
        onClickApprovalLineChange(approvalLineList)
    }, [approvalLineList])
    return (
        <div className="template-set-inner">
            {approvalLineList.length > 0 &&
                <div className="approval-line-list">
                    {approvalLineList.map(line => {
                        return <TempCurrentLine
                            key={approvalLineList.indexOf(line)}
                            line={line}
                            setApprovalLineList={setApprovalLineList}
                            />;
                    })}
                </div>
            }
            <TempAddNewLine setApprovalLineList={setApprovalLineList} />
        </div>
    )
}