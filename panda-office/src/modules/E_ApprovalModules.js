import { createActions, handleActions } from 'redux-actions';

const initialState = {
    sidebarStatus: {},
    departmentBox: {},
    approvalDocument: null,
    approvalDocumentList: {},
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
}
const SUCCESS = 'approvalDocument/SUCCESS';
const FETCH_SIDEBAR_STATUS = 'sidebar/FETCH_SIDEBAR_STATUS';
const SET_DEPARTMENT_BOX = 'sidebar/SET_DEPARTMENT_BOX';
const SET_APPROVAL_DOCUMENT_LIST = 'approvalDocument/SET_APPROVAL_DOCUMENT_LIST';
const SET_DETAIL_APPROVAL_DOCUMENT = 'approvalDocument/SET_DETAIL_APPROVAL_DOCUMENT';
const SET_DOCUMENT_TEMPLATE_FOLDER = 'documentTemplate/SET_DOCUMENT_TEMPLATE_FOLDER';
const FETCH_CURRENT_FOLDER = 'documentTemplate/FETCH_CURRENT_FOLDER';
const FETCH_SELECT_FOLDERS = 'documentTemplate/FETCH_SELECT_FOLDERS';
const FETCH_SELECT_DOCUMENTS = 'documentTemplate/FETCH_SELECT_DOCUMENTS'
const SET_FOLDER_EDIT_MODE = 'documentTemplate/SET_FOLDER_EDIT_MODE'
const FETCH_SELECT_TEMPLATES = 'documentTemplate/FETCH_SELECT_TEMPLATES'
const SET_INFO_FOR_CREATE = 'documentTemplate/SET_INFO_FOR_CREATE'
const SET_APPROVAL_DOCUMENT_TEMPLATE = 'documentTemplate/SET_APPROVAL_DOCUMENT_TEMPLATE'

export const { sidebar: { fetchSidebarStatus, setDepartmentBox },
    approvalDocument: { setApprovalDocumentList, setDetailApprovalDocument, success },
    documentTemplate: { setDocumentTemplateFolder,
        fetchCurrentFolder, fetchSelectFolders, fetchSelectDocuments, setFolderEditMode, fetchSelectTemplates,
        setInfoForCreate, updateDocumentTemplate,
        setApprovalDocumentTemplate

    } } = createActions({
        /* 성공값 반환 */
        [SUCCESS]: () => ({ success: true }),
        /* 사이드바 열림/닫힘 설정 */
        [FETCH_SIDEBAR_STATUS]: result => (result),
        /* 부서함 가져오기 셋 */
        [SET_DEPARTMENT_BOX]: result => (result),
        /* 문서함 문서 리스트 셋 */
        [SET_APPROVAL_DOCUMENT_LIST]: result => result,
        /* 문서 상세보기 셋 */
        [SET_DETAIL_APPROVAL_DOCUMENT]: result => (result),
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
        [SET_INFO_FOR_CREATE]: result => (result?.employeeList.length > 0 &&
            { ...result, employeeList: result.employeeList.sort((a, b) => a.job.id - b.job.id) }),
        [SET_APPROVAL_DOCUMENT_TEMPLATE]: result => (result),
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

    [SET_APPROVAL_DOCUMENT_LIST]: (state, { payload }) => ({
        ...state,
        approvalDocumentList: payload
    }),

    [SET_DETAIL_APPROVAL_DOCUMENT]: (state, { payload }) => ({
        ...state,
        approvalDocument: payload
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

    [SET_APPROVAL_DOCUMENT_TEMPLATE]: (state, { payload }) => ({
        ...state,
        approvalDocumentTemplate: payload
    })
}, initialState)

export default e_approvalReducer