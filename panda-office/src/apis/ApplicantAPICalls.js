import { getApplicant } from '../modules/ApplicantModules';
import { authRequest, request } from './api';

/* 면접자 전체 조회 API */
export const callApplicantListAPI = ({ currentPage = 1 }) => {
    return async (dispatch, getState) => {
        // const result = await request (
        //     'GET',
        //     `/recruitment/applicant?page=${currentPage}`
        // );
        const result = await authRequest.get(`/recruitment/applicant?page=${currentPage}`)

        if (result.status === 200) {
        // console.log('API 호출 : ', result);
            dispatch(getApplicant(result))
        } else {
            console.error('callApplicantListAPI error : ', result);
        }
    }
}