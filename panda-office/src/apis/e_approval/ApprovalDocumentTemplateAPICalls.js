import { setInfoForCreate, success } from "../../modules/E_ApprovalModules";
import { authRequest } from "../api"

export const callGetInfoForCreateTemplate = () => {
    return async (dispatch, getState) => {
        const response = await authRequest.get('approval-document-template/new');
        if(response.status === 200){
            dispatch(setInfoForCreate(response.data))
        }
    }
}

export const callPostNewApprovalDocument = ({request}) => {
    return async (dispatch, getState) => {
        const response = await authRequest.post('approval-document-template', request)
        if(response.status === 201) {
            dispatch(success());
        }
    }
}