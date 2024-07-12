import { IoIosAdd, IoIosDocument, IoIosFolder, IoIosRemove } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentFolder } from "../../../modules/E_ApprovalModules";


export function Folder({ folder, folders, isOpen, setIsOpen }) {
    const { currentFolder } = useSelector(state => state.e_approvalReducer)
    const dispatch = useDispatch();
    const currentIsOpen = isOpen[folder.folderId]
    const childrenFolder = folders.filter(fol => fol.refFolderId == folder.folderId)

    const toggleCurrentFolder = () => {
        if (currentFolder && currentFolder.folderId === folder.folderId) {
            dispatch(fetchCurrentFolder(null));
        } else {
            dispatch(fetchCurrentFolder(folder));
        }
    };
    const toggleFolder = (e) => {
        setIsOpen(state => ({
            ...state,
            [folder.folderId]: !currentIsOpen
        }))
    }
    return (
        <div className="no-select left-border">
            <div className="flex">
                <div className='folder-icon' onClick={toggleFolder}>
                    {currentIsOpen ? <IoIosRemove /> : <IoIosAdd />}
                </div>
                <div className="flex-center" onClick={toggleCurrentFolder}>
                    <IoIosFolder />
                    {currentFolder?.folderId != folder.folderId ?
                        <div className="folder-name">{folder.name}</div> :
                        <div className="selected-folder-name">{folder.name}</div>}
                </div>
            </div>
            {currentIsOpen &&
                <>
                    {childrenFolder.length > 0 &&
                        childrenFolder.map(child => <Folder
                            key={child.folderId}
                            folder={child}
                            folders={folders}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen} />
                        )}
                    {folder.documentList.length > 0 &&
                        folder.documentList.map(doc => <div
                            key={doc.documentId}
                            className="flex"
                            style={{ marginLeft: '18px' }}
                            onClick={toggleCurrentFolder}>
                            <div className='folder-icon'><IoIosDocument /></div>
                            {doc.title}
                        </div>)
                    }
                </>
            }
        </div>
    )
}