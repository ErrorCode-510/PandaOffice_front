import { useState } from "react";
import { IoIosAdd, IoIosFolder, IoIosListBox, IoIosRemove } from "react-icons/io";
import '../../../pages/e_approval/E_Approval.css';

export function Folder({ folder, setCurrentFolder, currentFolder }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleFolder = () => {
        setIsOpen(!isOpen);
    };

    const isSelected = currentFolder === folder;

    return (
        <div style={{ marginLeft: '20px', borderLeft: '1px solid #ccc' }} className="no-select">
            <div className="flex">
                <div className='folder-icon' onClick={toggleFolder}>
                    {isOpen ? <IoIosRemove /> : <IoIosAdd />}
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className='folder-icon'><IoIosFolder /></div>
                    <span
                        onClick={() => setCurrentFolder(folder)}
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
                                    setCurrentFolder={setCurrentFolder}
                                    currentFolder={currentFolder}
                                />
                            ))}
                        </div>
                    )}
                    {folder.documentList.length > 0 && (
                        <ul className="document-list">
                            {folder.documentList.map((doc) => (
                                <li key={doc.documentId} className="flex">
                                    <div className='folder-icon'></div>
                                    <div className='folder-icon'></div>
                                    <div className='folder-icon'><IoIosListBox /></div>
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
