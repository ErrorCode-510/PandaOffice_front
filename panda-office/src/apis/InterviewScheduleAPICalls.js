import { getApplicantList, getCalendar, getInterviewer, setRegistCalendar } from "../modules/InterviewScheduleModules"
import { authRequest } from "./api"

/* 면접관 호출 API */
export const callInterviewerAPI = () => {
    return async (dispatch, getState) => {

        try {
            const result = await authRequest.get('/payroll/allemplpayroll')

            if (result.status === 200) {
                dispatch(getInterviewer(result))
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
            } else {
                console.error('CallApplicantAllAPI error : ', result);
            }
        } catch (error) {
            console.error('catch: CallApplicantAllAPI error : ', error);
        }
    }
}

/* 면접 일정 전체 조회 API */
export const callEventsAPI = () => {
    return async (dispatch, getState) => {

        try {
            const result = await authRequest.get('/recruitment/interview-schedule')

            if (result.status === 200) {
                dispatch(getCalendar(result.data))
            } else {
                console.error('CallApplicantAllAPI error : ', result);
            }
        } catch (error) {
            console.error('catch: CallApplicantAllAPI error : ', error);
        }
    }
}
/* 면접 일정 등록 API */
export const callEventsRegitstAPI = (event) => {
    return async (dispatch, getState) => {
        const result = await authRequest.post('/recruitment/interview-schedule/regist', event)
        if (result.status === 201) {
            dispatch(callEventsAPI())
        }
    }
}
