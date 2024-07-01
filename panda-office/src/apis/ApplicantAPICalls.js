import { getApplicant, setCurrentPage } from '../modules/ApplicantModules';
import { authRequest, request } from './api';

/* 면접자 전체 조회 API */
export const callApplicantListAPI = ({ criteria, currentPage = 1 }) => {

    // console.log('api params 호출 : ' + JSON.stringify(params))
    
    let endpoint = `/recruitment/applicant/search?page=${currentPage}`

    /* 검색 조건이 true 일 때(비어있지 않을 때) */
    if (criteria) {
        const { mainCriteria, subCriteria, searchCriteria } = criteria;
    
        if (mainCriteria !== 'all' && subCriteria && searchCriteria) {
            /* mainCriteria가 all이 아니고 subCriteria와 searchCriteria가 모두 존재할 때 */
            endpoint += `&${mainCriteria}=${subCriteria}&name=${searchCriteria}`;
        } else if (mainCriteria !== 'all' && subCriteria) {
            /* mainCriteria가 all이 아니고 subCriteria만 존재할 때 */
            endpoint += `&${mainCriteria}=${subCriteria}`;
        } else if (mainCriteria === 'all' && searchCriteria) {
            /* mainCriteria가 all이 아니고 searchCriteria만 존재할 때 */
            endpoint += `&name=${searchCriteria}`;
        }
    }

    return async (dispatch, getState) => {
        // const result = await request (
        //     'GET',
        //     `/recruitment/applicant?page=${currentPage}`
        // );
        const result = await authRequest.get(endpoint)

        if (result.status === 200) {
            dispatch(getApplicant(result))
            // console.log('리듀서 함수: ' + JSON.stringify(result))
        } else {
            console.error('callApplicantListAPI error : ', result);
        }
    }
}