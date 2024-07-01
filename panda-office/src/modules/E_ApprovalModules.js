import { createActions, handleActions } from 'redux-actions';

const initialState = {
    sidebarStatus: {},
    departmentBox: {},
    approvalDocumentList: {},
    detailApprovalDocument: {},
    documentTemplateFolder: {data:[]}
}

const FETCH_SIDEBAR_STATUS = 'sidebar/FETCH_SIDEBAR_STATUS';
const SET_DEPARTMENT_BOX = 'sidebar/SET_DEPARTMENT_BOX';
const GET_APPROVAL_DOCUMENT_LIST = 'approvalDocument/GET_APPROVAL_DOCUMENT_LIST';
const GET_DETAIL_APPROVAL_DOCUMENT = 'approvalDocument/GET_DETAIL_APPROVAL_DOCUMENT';
const SET_DOCUMENT_TEMPLATE_FOLDER = 'documentTemplate/SET_DOCUMENT_TEMPLATE_FOLDER';

export const { sidebar: { fetchSidebarStatus, setDepartmentBox },
    approvalDocument: { getApprovalDocumentList, getDetailApprovalDocument },
    documentTemplate: {setDocumentTemplateFolder} } = createActions({
        /* 사이드바 열림/닫힘 설정 */
        [FETCH_SIDEBAR_STATUS]: result => ({ sidebarStatus: result }),
        /* 부서함 가져오기 셋 */
        [SET_DEPARTMENT_BOX]: result => ({ departmentBox: result }),
        /* 문서함 문서 리스트 셋 */
        [GET_APPROVAL_DOCUMENT_LIST]: result => ({ approvalDocumentList: result }),
        /* 문서 상세보기 셋 */
        [GET_DETAIL_APPROVAL_DOCUMENT]: result => ({ detailApprovalDocument: result }),
        /* 양식 폴더 셋 */
        [SET_DOCUMENT_TEMPLATE_FOLDER]: result => ({ documentTemplateFolder: result })
    })

const e_approvalReducer = handleActions({
    [FETCH_SIDEBAR_STATUS]: (state, { payload }) => ({
        ...state,
        sidebarStatus: payload.sidebarStatus
    }),

    [SET_DEPARTMENT_BOX]: (state, { payload }) => ({
        ...state,
        departmentBox: payload.departmentBox
    }),

    [GET_APPROVAL_DOCUMENT_LIST]: (state, { payload }) => ({
        ...state,
        approvalDocumentList: payload.approvalDocumentList
    }),

    [GET_DETAIL_APPROVAL_DOCUMENT]: (state, { payload }) => ({
        ...state,
        detailApprovalDocument: payload.detailApprovalDocument
    }),

    [SET_DOCUMENT_TEMPLATE_FOLDER]: (state, {payload})=>({
        ...state,
        documentTemplateFolder: payload.documentTemplateFolder
    })
}, initialState)

export default e_approvalReducer