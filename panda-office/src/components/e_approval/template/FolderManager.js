import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchDocumentTemplateSearch, fetchSearchWord, setFolderEditMode } from "../../../modules/E_ApprovalModules";
import { callCreateDocumentFolderAPI, callRemoveDocumentFolderAPI } from "../../../apis/e_approval/ApprovalDocumentFolderAPICalls";

export function FolderManager() {



    const dispatch = useDispatch();

    const { documentTemplateFolder, searchWord, folderEditMode, currentFolder } = useSelector(state => state.e_approvalReducer);

    const filterFolders = (folders, word) => {
        return folders
            .map(folder => {
                if (folder.name.includes(word)) {
                    return folder;
                }

                const filteredSubFolders = filterFolders(folder.subFolderList, word);
                const filteredDocuments = folder.documentList.filter(doc => doc.title.includes(word));

                if (filteredSubFolders.length > 0 || filteredDocuments.length > 0) {
                    return {
                        ...folder,
                        subFolderList: filteredSubFolders,
                        documentList: filteredDocuments
                    };
                }

                return null;
            })
            .filter(folder => folder !== null);
    };

    useEffect(() => {
        if (documentTemplateFolder && documentTemplateFolder.data) {
            if (searchWord === '') {
                dispatch(fetchDocumentTemplateSearch(documentTemplateFolder.data));
            } else {
                const filteredFolders = filterFolders(documentTemplateFolder.data, searchWord);
                dispatch(fetchDocumentTemplateSearch(filteredFolders));
            }
        }
    }, [searchWord, documentTemplateFolder])

    return (
        <div className="align-c" style={{height: '120px'}}>
            <span className="flex-center">
                <button className="folder-button-navy"
                onClick={() => {dispatch(callCreateDocumentFolderAPI(currentFolder))}}>폴더 추가</button>
                <button className="folder-button-grey" onClick={() => {dispatch(setFolderEditMode(!folderEditMode))}}>
                    {folderEditMode?"종료":"수정"}
                </button>
                <button className="folder-button-grey"
                onClick={() => {dispatch(callRemoveDocumentFolderAPI(currentFolder))}}>삭제</button>
            </span>
            <input className="folder-search-input"
                placeholder="검색어를 입력해주세요."
                value={searchWord}
                onChange={(e) => {dispatch(fetchSearchWord(e.target.value))}}>

            </input>
        </div>
    )
}