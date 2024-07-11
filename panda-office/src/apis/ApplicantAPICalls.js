import { getApplicant, setApplicantDetail, setApplicantModify, setApplicantDelete } from '../modules/ApplicantModules';
import { authRequest } from './api';

/* 면접자 전체 조회 API */
export const callApplicantListAPI = ({ criteria, currentPage = 1 }) => {
    let endpoint = `/recruitment/applicant/search?page=${currentPage}`

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

        try {
            const result = await authRequest.get(endpoint)

            if (result.status === 200) {
                dispatch(getApplicant(result))
            } else {
                alert("면접자 목록을 불러오는 데 실패했습니다. 잠시 후 다시 시도해 주세요.")
            }
        } catch (error) {
            alert("서버에 문제가 발생했습니다. 관리자에게 문의하세요.");
        }
    }
}


/* 면접자 ID 조회 API */
export const callApplicantDetail = (applicantId) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.get(`/recruitment/applicant/detail/${applicantId}`)

            if (result.status === 200) {
                dispatch(setApplicantDetail(result.data))
            } else {
                alert("면접자 세부 정보를 불러오는 데 실패했습니다. 잠시 후 다시 시도해 주세요.");
            }
        } catch (error) {
            alert("서버에 문제가 발생했습니다. 관리자에게 문의하세요.");
        }
    }
}


/* 면접자 정보 수정 API */
export const callApplicantModify = (formValues) => {
    return async (dispatch, getState) => {
        try {
            const { id, ...data } = formValues

            const result = await authRequest.put(`/recruitment/applicant/modify/${id}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (result.status === 200 || result.status === 201) {
                dispatch(setApplicantModify(result))
                alert('면접자 정보가 성공적으로 수정되었습니다.');
            } else {
                alert('면접자 정보 수정에 실패했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            alert('서버에 문제가 발생했습니다. 관리자에게 문의하세요.');
        }

    }
}


/* 면접자 정보 삭제 API */
export const callApplicantDelete = (id) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.delete(`/recruitment/applicant/delete/${id}`);

            if (result.status === 204) {
                dispatch(setApplicantDelete(result));
                alert('면접자 정보가 성공적으로 삭제되었습니다.');
            } else {
                alert('면접자 정보 삭제에 실패했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            alert('서버에 문제가 발생했습니다. 관리자에게 문의하세요.');
        }
    };
};


/* 면접자 등록 API */
export const callApplicantRegist = (formValues) => {
    return async (dispatch, getState) => {
        try {
            const { ...data } = formValues;

            const result = await authRequest.post('/recruitment/applicant/regist', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (result.status === 200 || result.status === 201) {
                alert('면접자가 성공적으로 등록되었습니다.');
            } else {
                alert('면접자 등록에 실패했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            alert('서버에 문제가 발생했습니다. 관리자에게 문의하세요.');
        }
    };
};

