import { createActions, handleActions } from 'redux-actions'

/* 초기값 */
const initialState = {
    applicant: null,
    criteria: null,
    applicantDetail: null,
    applicatnModify: null,
    applicantDelete: null,
    modalRegist: null,
    modalStatus: false
};

/* 액션 타입 */
const GET_APPLICANT = 'applicant/GET_APPLICANT';
const SET_CRITERIA = 'applicant/SET_CRITERIA';
const SET_APPLICANT_DETAIL = 'applicant/SET_APPLICANT_DETAIL';
const SET_APPLICANT_MODIFY = 'applicant/SET_APPLICANT_MODIFY';
const SET_APPLICANT_DELETE = 'applicant/SET_APPLICANT_DELETE';
const SET_MODAL_REGIST = 'applicant/SET_MODAL_REGIST';
const SET_MODAL_STATUS = 'applicant/SET_MODAL_STATUS';

/* 액션 함수 */
export const { applicant: {
    getApplicant,
    setCriteria,
    setApplicantDetail,
    setApplicantModify,
    setApplicantDelete,
    setModalRegist,
    setModalStatus
} } = createActions({
    [GET_APPLICANT]: result => ({ applicant: result.data }),
    [SET_CRITERIA]: params => ({ criteria: params }),
    [SET_APPLICANT_DETAIL]: detail => ({ applicantDetail: detail }),
    [SET_APPLICANT_MODIFY]: modify => ({ applicatnModify: modify }),
    [SET_APPLICANT_DELETE]: deleteData => ({ applicantDelete: deleteData }),
    [SET_MODAL_REGIST]: regist => ({ modalRegist: regist }),
    [SET_MODAL_STATUS]: status => ({ modalStatus: status })
});

/* 리듀서 함수 */
const applicantReducer = handleActions({
    [GET_APPLICANT]: (state, { payload }) => ({ ...state, applicant: payload.applicant }),
    [SET_CRITERIA]: (state, { payload }) => ({
        ...state, criteria: payload.criteria
    }),
    [SET_APPLICANT_DETAIL]: (state, { payload }) => {
        return { ...state, applicantDetail: payload.applicantDetail }
    },
    [SET_APPLICANT_MODIFY]: (state, { payload }) => {
        return { ...state, applicatnModify: payload.applicatnModify }
    },
    [SET_APPLICANT_DELETE]: (state, { payload }) => {
        return { ...state, applicantDelete: payload.applicantDelete }
    },
    [SET_MODAL_REGIST]: (state, { payload }) => {
        return { ...state, modalRegist: payload.modalRegist }
    },
    [SET_MODAL_STATUS]: (state, { payload }) => {
        return { ...state, modalStatus: payload.modalStatus }
    }
}, initialState);

export default applicantReducer;