import { createActions, handleActions } from 'redux-actions';

const initialState = {
    sidebarStatus: {},
    departmentBox: {},
    approvalDocumentList: {},
    detailApprovalDocument: {},
    /* 템플릿 폴더 리스트 */
    documentTemplateFolder: [{
        folderId: 0,
        name: 'none',
        documentList: [],
        refFolderId: 0
    }],
    currentFolder: null,
    selectFolders: [],
    selectDocuments: [],
    folderEditMode: false,
    selectTemplates: [],
    infoForCreate: null,
    createApprovalDocumentTemplateRequest: {
        title: null,
        document: "",
        folderId: "",
        autoApprovalLineRequestList: []
    }
}
const SUCCESS = 'approvalDocument/SUCCESS';
const FETCH_SIDEBAR_STATUS = 'sidebar/FETCH_SIDEBAR_STATUS';
const SET_DEPARTMENT_BOX = 'sidebar/SET_DEPARTMENT_BOX';
const GET_APPROVAL_DOCUMENT_LIST = 'approvalDocument/GET_APPROVAL_DOCUMENT_LIST';
const GET_DETAIL_APPROVAL_DOCUMENT = 'approvalDocument/GET_DETAIL_APPROVAL_DOCUMENT';
const SET_DOCUMENT_TEMPLATE_FOLDER = 'documentTemplate/SET_DOCUMENT_TEMPLATE_FOLDER';
const FETCH_CURRENT_FOLDER = 'documentTemplate/FETCH_CURRENT_FOLDER';
const FETCH_SELECT_FOLDERS = 'documentTemplate/FETCH_SELECT_FOLDERS';
const FETCH_SELECT_DOCUMENTS = 'documentTemplate/FETCH_SELECT_DOCUMENTS'
const SET_FOLDER_EDIT_MODE = 'documentTemplate/SET_FOLDER_EDIT_MODE'
const FETCH_SELECT_TEMPLATES = 'documentTemplate/FETCH_SELECT_TEMPLATES'
const SET_INFO_FOR_CREATE = 'documentTemplate/SET_INFO_FOR_CREATE'
const SET_CREATE_TEMPLATE_FORM = 'documentTemplate/SET_CREATE_TEMPLATE_FORM'
const INSERT_APPROVAL_LINE = 'documentTemplate/INSERT_APPROVAL_LINE'
const SET_APPROVAL_LINE_ORDER = 'documentTemplate/SET_APPROVAL_LINE_ORDER'
const REMOVE_APPROVAL_LINE = 'documentTemplate/REMOVE_APPROVAL_LINE';

export const { sidebar: { fetchSidebarStatus, setDepartmentBox },
    approvalDocument: { getApprovalDocumentList, getDetailApprovalDocument, success },
    documentTemplate: { setDocumentTemplateFolder,
        fetchCurrentFolder, fetchSelectFolders, fetchSelectDocuments, setFolderEditMode, fetchSelectTemplates,
        setInfoForCreate, setCreateTemplateForm, insertApprovalLine, updateDocumentTemplate, setApprovalLineOrder, removeApprovalLine

    } } = createActions({
        /* 성공값 반환 */
        [SUCCESS]: () => ({ success: true }),
        /* 사이드바 열림/닫힘 설정 */
        [FETCH_SIDEBAR_STATUS]: result => (result),
        /* 부서함 가져오기 셋 */
        [SET_DEPARTMENT_BOX]: result => (result),
        /* 문서함 문서 리스트 셋 */
        [GET_APPROVAL_DOCUMENT_LIST]: result => (result),
        /* 문서 상세보기 셋 */
        [GET_DETAIL_APPROVAL_DOCUMENT]: result => (result),
        /* 양식 폴더 셋 */
        [SET_DOCUMENT_TEMPLATE_FOLDER]: result => (result),
        /* 현재 조회중인 폴더 */
        [FETCH_CURRENT_FOLDER]: result => (result),
        /* 현재 선택한 폴더/양식 리스트 */
        [FETCH_SELECT_FOLDERS]: result => (result),
        [FETCH_SELECT_DOCUMENTS]: result => (result),
        /* 폴더 이름 수정상태 */
        [SET_FOLDER_EDIT_MODE]: result => (result),
        /* 테이블에서 선택한 템플릿 */
        [FETCH_SELECT_TEMPLATES]: result => (result),
        /* 새로운 양식을 등록하기 위한 정보 */
        [SET_INFO_FOR_CREATE]: result => ({ ...result, employeeList: result.employeeList.sort((a, b) => a.job.id - b.job.id) }),
        /* 새로운 양식을 등록하기 위한 폼 정보 */
        [SET_CREATE_TEMPLATE_FORM]: result => ({ name: result.name, value: result.value }),
        /* 결재선 등록 */
        [INSERT_APPROVAL_LINE]: line => ({
            employeeId: line.employeeId,
            departmentId: line.departmentId,
            jobId: line.jobId,
            /* 전결 권한 미구현 */
        }),
        /* 결재선 순서 정렬 */
        [SET_APPROVAL_LINE_ORDER]: result => result.map((line, index) => ({ ...line, order: index + 1 })),
        [REMOVE_APPROVAL_LINE]: line => line
    })

const e_approvalReducer = handleActions({
    [SUCCESS]: (state, { payload }) => ({
        ...state,
        success: payload.success
    }),
    [FETCH_SIDEBAR_STATUS]: (state, { payload }) => ({
        ...state,
        sidebarStatus: payload
    }),

    [SET_DEPARTMENT_BOX]: (state, { payload }) => ({
        ...state,
        departmentBox: payload
    }),

    [GET_APPROVAL_DOCUMENT_LIST]: (state, { payload }) => ({
        ...state,
        approvalDocumentList: payload
    }),

    [GET_DETAIL_APPROVAL_DOCUMENT]: (state, { payload }) => ({
        ...state,
        detailApprovalDocument: payload
    }),

    [SET_DOCUMENT_TEMPLATE_FOLDER]: (state, { payload }) => ({
        ...state,
        documentTemplateFolder: payload
    }),

    [FETCH_CURRENT_FOLDER]: (state, { payload }) => ({
        ...state,
        currentFolder: payload
    }),

    [FETCH_SELECT_FOLDERS]: (state, { payload }) => ({
        ...state,
        selectFolders: payload
    }),

    [FETCH_SELECT_DOCUMENTS]: (state, { payload }) => ({
        ...state,
        selectDocuments: payload
    }),

    [SET_FOLDER_EDIT_MODE]: (state, { payload }) => ({
        ...state,
        folderEditMode: payload
    }),

    [FETCH_SELECT_TEMPLATES]: (state, { payload }) => ({
        ...state,
        selectTemplates: payload
    }),

    [SET_INFO_FOR_CREATE]: (state, { payload }) => ({
        ...state,
        infoForCreate: payload
    }),

    [SET_CREATE_TEMPLATE_FORM]: (state, { payload }) => ({
        ...state,
        createApprovalDocumentTemplateRequest: {
            ...state.createApprovalDocumentTemplateRequest,
            [payload.name]: payload.value
        }
    }),

    [INSERT_APPROVAL_LINE]: (state, { payload }) => ({
        ...state,
        createApprovalDocumentTemplateRequest: {
            ...state.createApprovalDocumentTemplateRequest,
            autoApprovalLineRequestList: [
                ...state.createApprovalDocumentTemplateRequest.autoApprovalLineRequestList,
                payload
            ]
        }
    }),

    [SET_APPROVAL_LINE_ORDER]: (state, { payload }) => ({
        ...state,
        createApprovalDocumentTemplateRequest: {
            ...state.createApprovalDocumentTemplateRequest,
            autoApprovalLineRequestList: payload
        }
    }),

    [REMOVE_APPROVAL_LINE]: (state, { payload }) => ({
        ...state,
        createApprovalDocumentTemplateRequest: {
            ...state.createApprovalDocumentTemplateRequest,
            autoApprovalLineRequestList: state.createApprovalDocumentTemplateRequest.autoApprovalLineRequestList.filter(line => line !== payload)
        }
    })
}, initialState)

export default e_approvalReducer