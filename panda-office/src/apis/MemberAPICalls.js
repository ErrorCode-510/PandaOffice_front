import {authRequest, request} from "./api";
import {toast} from "react-toastify";
import {getMemberId, removeToken, saveToken} from "../utils/TokenUtils";
import {getProfile, success} from "../modules/MemberModules";
import axios from "axios";



export const callLoginAPI = ({loginRequest}) => {


    return async (dispatch, getState) => {
        const result = await request(
            'POST',
            '/login',
            {'Content-Type' : 'application/json' },
            JSON.stringify(loginRequest)
        );

        console.log('callLoginAPI result : ', result);

        if(result?.status === 200) {
            saveToken(result.headers);
            dispatch(success());
        } else {
            toast.warning("로그인에 실패하였습니다. 아이디와 비밀번호를 확인해주세요.");
        }



    }
}

export const callLogoutAPI = () => {

    return async (dispatch, getState) => {

        const result = await authRequest.post(`/api/v1/members/logout`);
        console.log('callLogoutAPI result : ', result);

        if(result.status === 200) {
            removeToken();
            dispatch(success());
            console.log("dispatch success");

        }

    }
}


export const callFindIdAPI = ({findIdRequest}) => {
    return async (dispatch, getState) => {



        const result = await request(
            'POST',
            '/api/v1/members/find-id',
            { 'Content-Type': 'application/json' },
            JSON.stringify(findIdRequest)
        );

        console.log('callFindIdAPI result : ', result);

        if (result?.status === 200) {
            // 아이디 조회 성공 시 처리할 로직
            // dispatch(success());
            // toast.success("아이디 조회에 성공했습니다.");

            // 예시: 조회된 아이디를 저장하거나, UI에 표시하는 등의 작업을 수행할 수 있습니다.
        } else {
            // 아이디 조회 실패 시 처리할 로직

            // toast.warning("아이디 조회에 실패했습니다. 입력 정보를 다시 확인해주세요.");
        }
        return(result);
    };

};
export const callSendAuthCodeAPI = ({ name, employeeId, email }) => {
    return async (dispatch, getState) => {

        const result = await request(
            'POST',
            '/api/v1/members/send-auth-code',
            { 'Content-Type': 'application/json' },
            JSON.stringify({ name, employeeId, email })
        );

        console.log('callSendAuthCodeAPI result : ', result);
        console.log('status : ', result?.status);

        if (result?.status === 200) {
            toast.success("인증 코드가 이메일로 전송되었습니다.");
        } else if (result?.status === 404) {
            toast.warning("일치하는 사용자 정보를 찾을 수 없습니다.");
        } else {
            toast.error("인증 코드 전송에 실패했습니다. 다시 시도해주세요.");
        }
        return(result);
    };
};


export const callVerifyAuthCodeAPI = ({ email, verificationCode }) => {
    return async (dispatch, getState) => {
        const result = await request(
            'POST',
            '/api/v1/members/verify-auth-code',
            { 'Content-Type': 'application/json' },
            JSON.stringify({ email, code: verificationCode }) // Match the backend structure
        );

        console.log('callVerifyAuthCodeAPI result : ', result);
        console.log('status : ', result?.status);

        if (result?.status === 200) {
            toast.success("인증이 완료되었습니다.");
        } else {
            toast.error("인증 코드가 잘못되었습니다. 다시 시도해주세요.");
        }
        return(result);
    };
};
export const callChangePasswordAPI = ({ email, newPassword }) => {
    return async (dispatch, getState) => {
        try {
            const result = await request(
                'POST',
                '/api/v1/members/change-password',
                { 'Content-Type': 'application/json' },
                JSON.stringify({ email, newPassword })
            );

            console.log('callChangePasswordAPI result : ', result);

            if (result?.status === 200) {
                toast.success("비밀번호가 성공적으로 변경되었습니다.");
                // Dispatch any success action or handle UI accordingly
            } else {
                toast.error("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
                // Handle failure case
            }
            return result;
        } catch (error) {
            console.error('비밀번호 변경 API 호출 오류:', error);
            toast.error("비밀번호 변경 과정에서 오류가 발생했습니다.");
            throw error; // Optionally re-throw the error for higher-level handling
        }
    };
};








