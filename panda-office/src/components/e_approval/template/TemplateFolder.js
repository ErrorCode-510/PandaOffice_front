import { useRef, useEffect, useState } from "react";
import { IoIosAdd, IoIosDocument, IoIosFolder, IoIosListBox, IoIosPaper, IoIosRemove } from "react-icons/io";
import '../../../pages/e_approval/E_Approval.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentFolder, setFolderEditMode } from "../../../modules/E_ApprovalModules";
import { callDocumentFolderAPI, callUpdateDocumentFolderAPI } from "../../../apis/e_approval/ApprovalDocumentFolderAPICalls";

export function Folder({ folder }) {

    const dispatch = useDispatch();

    const { currentFolder, searchWord, folderEditMode } = useSelector(state => state.e_approvalReducer)

    const [isOpen, setIsOpen] = useState(false);
    const [folderName, setFolderName] = useState(folder.name);
    const inputRef = useRef(null);

    useEffect(() => {
        if (folderEditMode && folder === currentFolder) {
            inputRef.current.focus(); // input 요소에 포커스 설정
        }
    }, [folderEditMode, folder, currentFolder]);

    const toggleFolder = () => {
        setIsOpen(!isOpen);
    };
    const toggleDispatch = (folder) => {
        if (currentFolder == folder) {
            dispatch(fetchCurrentFolder(null))
        } else {
            dispatch(fetchCurrentFolder(folder))
        }
    }

    useEffect(() => {
        if (searchWord == '') {
            setIsOpen(false);
        } else {
            setIsOpen(true)
        }
    }, [searchWord]);

    const isSelected = currentFolder === folder;

    const handleNameChange = (e) => {
        setFolderName(e.target.value);
    };

    const handleBlur = () => {
        if (folderName !== folder.name) {
            dispatch(callUpdateDocumentFolderAPI({ folderId: currentFolder.folderId, name: folderName }))
            dispatch(setFolderEditMode(false))
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.target.blur();
        }
    };

    return (
        <div className="no-select left-border">
            <div className="flex">
                <div className='folder-icon' onClick={toggleFolder}>
                    {isOpen ? <IoIosRemove /> : <IoIosAdd />}
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className='folder-icon'><IoIosFolder /></div>
                    <span
                        onClick={() => { toggleDispatch(folder) }}
                        className={isSelected ? "selected-folder-name" : "folder-name"}
                    >
                        {folderEditMode && folder == currentFolder ?
                            <input
                                ref={inputRef}
                                name="name"
                                value={folderName}
                                onChange={handleNameChange}
                                onBlur={handleBlur}
                                onKeyDown={handleKeyDown}
                            />
                            : folder.name}
                    </span>
                </div>
            </div>
            {isOpen && (
                <>
                    {folder.subFolderList.length > 0 && (
                        <div className="subfolders">
                            {folder.subFolderList.map((subFolder) => (
                                <Folder
                                    key={subFolder.folderId}
                                    folder={subFolder}
                                />
                            ))}
                        </div>
                    )}
                    {folder.documentList.length > 0 && (
                        <ul className="document-list">
                            {folder.documentList.map((doc) => (
                                <li key={doc.documentId} className="flex left-border" onClick={() => { dispatch(fetchCurrentFolder(folder)) }}>
                                    <div className='folder-icon'></div>
                                    <div className='folder-icon'><IoIosPaper /></div>
                                    <span className="template-name">
                                        {doc.title}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
}
