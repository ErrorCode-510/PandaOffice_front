import { authRequest, request } from "./api";
import { setDepartmentBox } from "../modules/E_ApprovalModules";

export const callDepartmentBox = () => {


    return async (dispatch, getState) => {
        const response = await authRequest.get('/department-box/sidebar')
        console.log('result', response);
        if(response.status === 200){
            dispatch(setDepartmentBox(response))
        }
    }
}