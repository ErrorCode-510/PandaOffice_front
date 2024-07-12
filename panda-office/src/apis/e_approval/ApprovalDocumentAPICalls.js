import { authRequest } from "../api";
import { setDetailApprovalDocument, success } from "../../modules/E_ApprovalModules";


export const callPostNewApprovalDocument = (draftForm) => {
    return async (dispatch, getState)=>{
        const response = await authRequest.post('approval-document', draftForm)
        if(response.status === 201){
            dispatch(success());
        }
    }
}
export const callGetDetailDocument = (documentId) => {
    return async (dispatch, getState) => {
        const response = await authRequest.get(`approval-document/${documentId}`)
        if(response.status === 200){
            dispatch(setDetailApprovalDocument(response.data))
        }
    }
}
export const callApproveDocument = (request) => {
    return async (dispatch, getState) => {
        const response = await authRequest.put('approval-document', request)
        if(response.status === 204){
            callApproveDocument(request.documentId)
        }
    }
}