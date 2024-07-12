import { authRequest, request } from "../api";
import { fetchCurrentFolder, setDepartmentBox, setDocumentTemplateFolder, success } from "../../modules/E_ApprovalModules";

export const callDepartmentBox = () => {


    return async (dispatch, getState) => {
        const response = await authRequest.get('/department-box/sidebar')
        if(response.status === 200){
            dispatch(setDepartmentBox(response))
        }
    }
}

export const callDocumentFolderAPI = () => {
    return async (dispatch, getState)=>{
        console.log(123)
        const response = await authRequest.get('/approval-document-template-folders')
        if(response.status === 200){
            dispatch(setDocumentTemplateFolder(response.data))
        }
    }
}

export const callCreateDocumentFolderAPI = (currentFolder) => {
    return async (dispatch, getState)=>{
        const request = currentFolder?{name: '새로운 폴더', refFolderId: currentFolder.folderId}:{name: '새로운 폴더'}
        const response = await authRequest.post('approval-document-template-folder', request)
        if(response.status === 200){
            dispatch(fetchCurrentFolder(response.data))
            dispatch(success());
            dispatch(callDocumentFolderAPI());
            console.log(JSON.stringify(response.data))
        }
    }
}

export const callUpdateDocumentFolderAPI = ({folderId, name}) => {
    return async (dispatch, getState)=>{
        const response = await authRequest.put(`approval-document-template-folder?folderId=${folderId}&newName=${name}`)
        if (response.status === 200) {
            dispatch(success());
            dispatch(callDocumentFolderAPI());
            dispatch(fetchCurrentFolder(null));
        }
    }
}

export const callRemoveDocumentFolderAPI = (currentFolder) => {
    return async(dispatch, getState)=>{
        const response = await authRequest.delete(`http://localhost:8001/approval-document-template-folder/${currentFolder.folderId}`)
        if(response.status === 204) {
            dispatch(success());
            dispatch(callDocumentFolderAPI());
            dispatch(fetchCurrentFolder(null));
        }
    }
}

export const callUpdateTemplateStatusAPI = ({request})=>{
    return async(dispatch, getState)=>{
        const response = await authRequest.put('approval-document-template-status', request);
        if(response.status === 200){
            dispatch(success());
        }
        dispatch(callDocumentFolderAPI());
        dispatch(fetchCurrentFolder(response.data));
    }
}