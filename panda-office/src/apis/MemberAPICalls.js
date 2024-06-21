import {authRequest, request} from "./api";
import {toast} from "react-toastify";
import {getMemberId, removeToken, saveToken} from "../utils/TokenUtils";
import {getProfile, success} from "../modules/MemberModules";

export const callSignupAPI = ({signupRequest}) => {


    return async (dispatch, getState) => {
        const result = await request(
            'POST',
            '/api/v1/members/signup',
            {'Content-Type' : 'application/json' },
            JSON.stringify(signupRequest)
        );

        console.log('callSignupAPI result : ', result);

        if(result?.status === 201) {
            dispatch(success());
        } else {
            toast.warning("회원 가입에 실패했습니다. 다시 시도해주세요.");
        }

    }
}

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
                JSON.stringify({findIdRequest})
            );

            console.log('callFindIdAPI result : ', result);

            if (result?.status === 200) {
                // 아이디 조회 성공 시 처리할 로직
                dispatch(success());
                toast.success("아이디 조회에 성공했습니다.");
                // 예시: 조회된 아이디를 저장하거나, UI에 표시하는 등의 작업을 수행할 수 있습니다.
            } else {
                // 아이디 조회 실패 시 처리할 로직

                toast.warning("아이디 조회에 실패했습니다. 입력 정보를 다시 확인해주세요.");
            }

    };
};














