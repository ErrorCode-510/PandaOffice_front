import { useDispatch, useSelector } from "react-redux";
import { AddNewLine } from "./AddNewLine";
import { callPostNewApprovalDocument } from "../../../../apis/e_approval/ApprovalDocumentTemplateAPICalls";


export function ApprovalDocumentSetting() {
    const dispatch = useDispatch();
    const { createApprovalDocumentTemplateRequest } = useSelector(state => state.e_approvalReducer)

    const onClickHanderSubmit = () => {
        dispatch(callPostNewApprovalDocument({ request: createApprovalDocumentTemplateRequest }))
    }
    return (<>
        <AddNewLine />
        <button
            onClick={onClickHanderSubmit}
        >등록</button>
    </>)
}