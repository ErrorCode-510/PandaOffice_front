import { createActions, handleActions } from 'redux-actions';

const initialState = {
    sidebarStatus: {},
    departmentBox: {},
    approvalDocumentList: {},
    detailApprovalDocument: {},
    documentTemplateFolder: {data:[]},
    documentTemplateSearchResult: [],
    searchWord: '',
    currentFolder: null,
    selectFolders: [],
    selectDocuments: [],
    folderEditMode: false,
    selectTemplates: []
}
const SUCCESS = 'approvalDocument/SUCCESS';
const FETCH_SIDEBAR_STATUS = 'sidebar/FETCH_SIDEBAR_STATUS';
const SET_DEPARTMENT_BOX = 'sidebar/SET_DEPARTMENT_BOX';
const GET_APPROVAL_DOCUMENT_LIST = 'approvalDocument/GET_APPROVAL_DOCUMENT_LIST';
const GET_DETAIL_APPROVAL_DOCUMENT = 'approvalDocument/GET_DETAIL_APPROVAL_DOCUMENT';
const SET_DOCUMENT_TEMPLATE_FOLDER = 'documentTemplate/SET_DOCUMENT_TEMPLATE_FOLDER';
const FETCH_DOCUMENT_TEMPLATE_SEARCH = 'documentTemplate/FETCH_DOCUMENT_TEMPLATE_SEARCH';
const FETCH_SEARCH_WORD = 'documentTemplate/FETCH_SEARCH_WORD';
const FETCH_CURRENT_FOLDER = 'documentTemplate/FETCH_CURRENT_FOLDER';
const FETCH_SELECT_FOLDERS = 'documentTemplate/FETCH_SELECT_FOLDERS';
const FETCH_SELECT_DOCUMENTS = 'documentTemplate/FETCH_SELECT_DOCUMENTS'
const SET_FOLDER_EDIT_MODE = 'documentTemplate/SET_FOLDER_EDIT_MODE'
const FETCH_SELECT_TEMPLATES = 'documentTemplate/FETCH_SELECT_TEMPLATES'

export const { sidebar: { fetchSidebarStatus, setDepartmentBox },
    approvalDocument: { getApprovalDocumentList, getDetailApprovalDocument, success },
    documentTemplate: {setDocumentTemplateFolder, fetchDocumentTemplateSearch, fetchSearchWord,
        fetchCurrentFolder, fetchSelectFolders, fetchSelectDocuments, setFolderEditMode, fetchSelectTemplates
    } } = createActions({
        /* 성공값 반환 */
        [SUCCESS] : () => ({ success : true }),
        /* 사이드바 열림/닫힘 설정 */
        [FETCH_SIDEBAR_STATUS]: result => ({ sidebarStatus: result }),
        /* 부서함 가져오기 셋 */
        [SET_DEPARTMENT_BOX]: result => ({ departmentBox: result }),
        /* 문서함 문서 리스트 셋 */
        [GET_APPROVAL_DOCUMENT_LIST]: result => ({ approvalDocumentList: result }),
        /* 문서 상세보기 셋 */
        [GET_DETAIL_APPROVAL_DOCUMENT]: result => ({ detailApprovalDocument: result }),
        /* 양식 폴더 셋 */
        [SET_DOCUMENT_TEMPLATE_FOLDER]: result => ({ documentTemplateFolder: result }),
        /* 양식 폴더 검색 결과 */
        [FETCH_DOCUMENT_TEMPLATE_SEARCH]: result => ({ documentTemplateSearchResult: result}),
        /* 양식 폴더 검색어 */
        [FETCH_SEARCH_WORD]: result => ({searchWord: result}),
        /* 현재 조회중인 폴더 */
        [FETCH_CURRENT_FOLDER]: result=>({currentFolder: result}),
        /* 현재 선택한 폴더/양식 리스트 */
        [FETCH_SELECT_FOLDERS]: result=>({selectFolders: result}),
        [FETCH_SELECT_DOCUMENTS]: result=>({selectDocuments: result}),
        /* 폴더 이름 수정상태 */
        [SET_FOLDER_EDIT_MODE]: result=>({folderEditMode: result}),
        /* 테이블에서 선택한 템플릿 */
        [FETCH_SELECT_TEMPLATES]: result=>({selectTemplates: result})
    })

const e_approvalReducer = handleActions({
    [SUCCESS] : (state, {payload}) => ({
        ...state,
        success: payload.success
    }),
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
    }),

    [FETCH_DOCUMENT_TEMPLATE_SEARCH]: (state, {payload})=>({
        ...state,
        documentTemplateSearchResult: payload.documentTemplateSearchResult
    }),

    [FETCH_SEARCH_WORD]: (state, {payload})=>({
        ...state,
        searchWord: payload.searchWord
    }),

    [FETCH_CURRENT_FOLDER]: (state, {payload})=>({
        ...state,
        currentFolder: payload.currentFolder
    }),

    [FETCH_SELECT_FOLDERS]: (state, {payload})=>({
        ...state,
        selectFolders: payload.selectFolders
    }),

    [FETCH_SELECT_DOCUMENTS]: (state, {payload})=>({
        ...state,
        selectDocuments: payload.selectDocuments
    }),

    [SET_FOLDER_EDIT_MODE]: (state, {payload})=>({
        ...state,
        folderEditMode: payload.folderEditMode
    }),

    [FETCH_SELECT_TEMPLATES]: (state, {payload})=>({
        ...state,
        selectTemplates: payload.selectTemplates
    })
}, initialState)

export default e_approvalReducer