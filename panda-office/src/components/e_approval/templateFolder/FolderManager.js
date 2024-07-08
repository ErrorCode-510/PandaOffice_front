import { useDispatch, useSelector } from "react-redux";
import {  setFolderEditMode } from "../../../modules/E_ApprovalModules";
import { callCreateDocumentFolderAPI, callRemoveDocumentFolderAPI } from "../../../apis/e_approval/ApprovalDocumentFolderAPICalls";

export function FolderManager({setFolderSearchResult}) {



    const dispatch = useDispatch();
    const { documentTemplateFolder, searchWord, folderEditMode, currentFolder } = useSelector(state => state.e_approvalReducer);

    const onChangeSearch = (e) => {
        const keyword = e.target.value;
        const searchResult = new Set();
        const addParentFolders = (folders, folderIdSet) => {
            let added = false;
            for (const folder of folders) {
                if (folderIdSet.has(folder.folderId) && folder.refFolderId !== null && !folderIdSet.has(folder.refFolderId)) {
                    folderIdSet.add(folder.refFolderId);
                    added = true;
                }
            }
            if (added) {
                addParentFolders(folders, folderIdSet);
            }
        }

        for (const folder of documentTemplateFolder) {
            // 폴더 이름 검색
            if (folder.name.includes(keyword)) {
                searchResult.add(folder.folderId);
            }

            // 문서 제목 검색
            for (const document of folder.documentList) {
                if (document.title.includes(keyword)) {
                    searchResult.add(folder.folderId);
                    break; // 문서가 검색되면 폴더를 추가하고 다음 폴더로 넘어감
                }
            }
        }
        addParentFolders(documentTemplateFolder, searchResult);
        const resultFolders = Array.from(searchResult).map(folderId =>
            documentTemplateFolder.find(folder => folder.folderId === folderId)
        );
        setFolderSearchResult(resultFolders);
    }

    return (
        <div className="align-c" style={{ height: '120px' }}>
            <span className="flex-center">
                <button className="folder-button-navy"
                    onClick={() => { dispatch(callCreateDocumentFolderAPI(currentFolder)) }}>폴더 추가</button>
                <button className="folder-button-grey" onClick={() => { dispatch(setFolderEditMode(!folderEditMode)) }}>
                    {folderEditMode ? "종료" : "수정"}
                </button>
                <button className="folder-button-grey"
                    onClick={() => { dispatch(callRemoveDocumentFolderAPI(currentFolder)) }}>삭제</button>
            </span>
            <input className="folder-search-input"
                placeholder="검색어를 입력해주세요."
                value={searchWord}
                onChange={onChangeSearch}>
            </input>
        </div>
    )
}