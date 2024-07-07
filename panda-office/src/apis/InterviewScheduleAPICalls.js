import { getApplicantList, getInterviewer } from "../modules/InterviewScheduleModules"
import { authRequest } from "./api"

/* 면접관 호출 API */
export const callInterviewerAPI = () => {
    return async (dispatch, getState) => {

        try {
            const result = await authRequest.get('/payroll/allemplpayroll')

            if (result.status === 200) {
                dispatch(getInterviewer(result))
                // console.log('면접관 api 확인: ' + JSON.stringify(result))
            } else {
                console.error('CallInterviewerAPI error : ', result);
            }
        } catch (error) {
            console.error('catch: CallInterviewerAPI error : ', error);
        }
    }
}

/* 면접관 검색 조건 없는 전체 호출 API */
export const callApplicantAllAPI = () => {
    return async (dispatch, getState) => {

        try {
            const result = await authRequest.get('/recruitment/applicant')

            if (result.status === 200) {
                dispatch(getApplicantList(result.data))
                // console.log('API 호출 확인: ' + JSON.stringify(result))
            } else {
                console.error('CallApplicantAllAPI error : ', result);
            }
        } catch (error) {
            console.error('catch: CallApplicantAllAPI error : ', error);
        }
    }
}