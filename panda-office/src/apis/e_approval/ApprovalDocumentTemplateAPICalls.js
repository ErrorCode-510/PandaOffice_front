import { fetchCurrentFolder, setApprovalLineOrder, setInfoForCreate, success } from "../../modules/E_ApprovalModules";
import { authRequest } from "../api"
import { callDocumentFolderAPI } from "./ApprovalDocumentFolderAPICalls";

export const callGetInfoForCreateTemplate = () => {
    return async (dispatch, getState) => {
        const response = await authRequest.get('approval-document-template/new');
        if (response.status === 200) {
            dispatch(setInfoForCreate(response.data))
        }
    }
}

export const callPostNewApprovalDocument = ({ request }) => {
    return async (dispatch, getState) => {
        // order 정렬 dispatch
        const orderedList = request.autoApprovalLineRequestList.map((line, index) => ({
            ...line,
            order: index + 1
        }));
        
        dispatch(setApprovalLineOrder(orderedList));
        const updatedState = getState().e_approvalReducer.createApprovalDocumentTemplateRequest;
        const response = await authRequest.post('approval-document-template', updatedState);
        if (response.status === 201) {
            dispatch(success());
        }
    }
}

export const callPutTemplateRefFolder = ({ request }) => {
    return async (dispatch, getState) => {
        const response = await authRequest.put('approval-document-template/ref-folder', request)
        if (request.status === 200) {
            dispatch(success())
            dispatch(callDocumentFolderAPI());
            dispatch(fetchCurrentFolder(response.data));
        }
    }
}