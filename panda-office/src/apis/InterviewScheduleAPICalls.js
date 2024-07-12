import { getApplicantList, getCalendar, getDetailCalendar, getInterviewer } from "../modules/InterviewScheduleModules"
import { authRequest } from "./api"

/* 면접관 호출 API */
export const callInterviewerAPI = () => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.get('/payroll/all-emplpayroll');

            if (result.status === 200) {
                dispatch(getInterviewer(result));
            } else {
                alert('면접관 정보를 불러오는 데 실패했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            alert('서버에 문제가 발생했습니다. 관리자에게 문의하세요.');
        }
    };
};


/* 면접관 검색 조건 없는 전체 호출 API */
export const callApplicantAllAPI = () => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.get('/recruitment/applicant');

            if (result.status === 200) {
                dispatch(getApplicantList(result.data));
            } else {
                alert('전체 면접자 목록을 불러오는 데 실패했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            alert('서버에 문제가 발생했습니다. 관리자에게 문의하세요.');
        }
    };
};


/* 면접 일정 전체 조회 API */
export const callEventsAPI = () => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.get('/recruitment/interview-schedule');

            if (result.status === 200) {
                dispatch(getCalendar(result.data));
            } else {
                alert('면접 일정을 불러오는 데 실패했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            alert('서버에 문제가 발생했습니다. 관리자에게 문의하세요.');
        }
    };
};


/* 면접 일정 등록 API */
export const callEventsRegitstAPI = (event) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.post('/recruitment/interview-schedule/regist', event);

            if (result.status === 201) {
                dispatch(callEventsAPI());
                alert('면접 일정이 성공적으로 등록되었습니다.');
            } else {
                alert('면접 일정 등록에 실패했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            alert('서버에 문제가 발생했습니다. 관리자에게 문의하세요.');
        }
    };
};


/* 면접 일정 상세 조회 API */
export const callEventsDetailAPI = (eventId) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.get(`/recruitment/interview-schedule/detail/${eventId}`);

            if (result.status === 200) {
                dispatch(getDetailCalendar(result.data));
            } else {
                alert('면접 일정 상세 정보를 불러오는 데 실패했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            alert('서버에 문제가 발생했습니다. 관리자에게 문의하세요.');
        }
    };
};


/* 면접 일정 수정 API */
export const callEventsModifyAPI = (formValues) => {
    const { id, name, mome, startDate, endDate, startTime, place, applicantList, employee } = formValues;

    const event = {
        name,
        mome,
        startDate,
        endDate,
        startTime,
        place: place,
        applicantList: applicantList.map(applicant => applicant.id),
        employee: employee.id
    };

    return async (dispatch, getState) => {
        try {
            const result = await authRequest.put(`/recruitment/interview-schedule/modify/${id}`, event);

            if (result.status === 201) {
                dispatch(callEventsAPI());
                alert('면접 일정이 성공적으로 수정되었습니다.');
            } else {
                alert('면접 일정이 성공적으로 수정되었습니다.');
            }
        } catch (error) {
            alert('서버에 문제가 발생했습니다. 관리자에게 문의하세요.');
        }
    };
};