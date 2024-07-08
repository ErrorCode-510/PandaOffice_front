import { useDispatch, useSelector } from "react-redux";
import { AddNewLine } from "./components/AddNewLine";
import { callPostNewApprovalDocument } from "../../../apis/e_approval/ApprovalDocumentTemplateAPICalls";
import { CurrentLine } from "./components/CurrentLine";
import { setApprovalLineOrder } from "../../../modules/E_ApprovalModules";


export function ApprovalDocumentSetting() {
    const dispatch = useDispatch();
    const { createApprovalDocumentTemplateRequest } = useSelector(state => state.e_approvalReducer)

    const onClickHanderSubmit = () => {
        dispatch(callPostNewApprovalDocument({ request: createApprovalDocumentTemplateRequest }));
    };
    return (<>
        <div className="approval-line-list">
            <div style={{border: '1px solid black'}}>현재 결재선
            {createApprovalDocumentTemplateRequest.autoApprovalLineRequestList.map(line => {
                return <CurrentLine
                    key={createApprovalDocumentTemplateRequest.autoApprovalLineRequestList.indexOf(line)}
                    line={line} />;
            })}
            </div>

        </div>
        <AddNewLine />
        <button
            onClick={onClickHanderSubmit}>
            등록
        </button>
    </>)
}