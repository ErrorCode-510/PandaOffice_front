import { useEffect, useState } from "react";
import { IoIosAdd, IoIosDocument, IoIosFolder, IoIosListBox, IoIosPaper, IoIosRemove } from "react-icons/io";
import '../../../pages/e_approval/E_Approval.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentFolder } from "../../../modules/E_ApprovalModules";

export function Folder({ folder }) {

    const dispatch = useDispatch();

    const {currentFolder, searchWord} = useSelector(state=>state.e_approvalReducer)

    const [isOpen, setIsOpen] = useState(false);
    const toggleFolder = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if(searchWord == ''){
            setIsOpen(false);
        } else {
            setIsOpen(true)
        }
    }, [searchWord]);

    const isSelected = currentFolder === folder;

    return (
        <div className="no-select left-border">
            <div className="flex">
                <div className='folder-icon' onClick={toggleFolder}>
                    {isOpen ? <IoIosRemove /> : <IoIosAdd />}
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className='folder-icon'><IoIosFolder /></div>
                    <span
                        onClick={() => dispatch(fetchCurrentFolder(folder))}
                        className={isSelected ? "selected-folder-name" : "folder-name"}
                    >
                        {folder.name}
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
                                <li key={doc.documentId} className="flex left-border" onClick={()=>{dispatch(fetchCurrentFolder(folder))}}>
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
