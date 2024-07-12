import { fetchCurrentFolder, setApprovalDocumentTemplate, setInfoForCreate, success } from "../../modules/E_ApprovalModules";
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

export const callPostNewApprovalDocumentTemplate = (request) => {
    return async (dispatch, getState) => {
        const response = await authRequest.post('approval-document-template', request);
        if (response.status === 201) {
            dispatch(success());
        }
    }
}

export const callPutTemplateRefFolder = ({ request }) => {
    return async (dispatch, getState) => {
        const response = await authRequest.put('approval-document-template/ref-folder', request)
        if (response.status === 200) {
            dispatch(success())
            dispatch(callDocumentFolderAPI());
            dispatch(fetchCurrentFolder(response.data));
        }
    }
}

export const callGetDocumentTemplate = (documentId)=>{
    return async (dispatch, getState)=>{
        const response = await authRequest.get(`approval-document-template/${documentId}`)
        if(response.status === 200){
            dispatch(setApprovalDocumentTemplate(response.data))
        }
    }
}