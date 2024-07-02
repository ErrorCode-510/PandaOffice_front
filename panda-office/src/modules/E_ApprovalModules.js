import {createActions, handleActions} from 'redux-actions';

const initialState = {
    sidebarStatus: {},
    departmentBox: {},
    approvalDocumentList: {},
    detailApprovalDocument: {}
}

const FETCH_SIDEBAR_STATUS = 'sidebar/FETCH_SIDEBAR_STATUS';
const SET_DEPARTMENT_BOX = 'sidebar/SET_DEPARTMENT_BOX';
const GET_APPROVAL_DOCUMENT_LIST = 'approvalDocument/GET_APPROVAL_DOCUMENT_LIST';
const GET_DETAIL_APPROVAL_DOCUMENT = 'approvalDocument/GET_DETAIL_APPROVAL_DOCUMENT';

export const {sidebar:{fetchSidebarStatus, setDepartmentBox}, approvalDocument:{getApprovalDocumentList, getDetailApprovalDocument}} = createActions({
    [FETCH_SIDEBAR_STATUS]: result => ({sidebarStatus: result}),
    [SET_DEPARTMENT_BOX]: result => ({departmentBox: result}),
    [GET_APPROVAL_DOCUMENT_LIST]: result => ({approvalDocumentList: result}),
    [GET_DETAIL_APPROVAL_DOCUMENT]: result => ({detailApprovalDocument: result})
})

const e_approvalReducer = handleActions({
    [FETCH_SIDEBAR_STATUS]: (state, {payload}) => ({...state,
        sidebarStatus: payload.sidebarStatus
    }),

    [SET_DEPARTMENT_BOX]: (state, {payload}) => ({...state, 
        departmentBox: payload.departmentBox
    }),

    [GET_APPROVAL_DOCUMENT_LIST]: (state, {payload}) => ({...state, 
        approvalDocumentList: payload.approvalDocumentList
    }),

    [GET_DETAIL_APPROVAL_DOCUMENT]: (state, {payload}) => ({...state, 
        detailApprovalDocument: payload.detailApprovalDocument
    })
}, initialState)

export default e_approvalReducer