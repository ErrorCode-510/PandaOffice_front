import { IoIosAdd, IoIosDocument, IoIosFolder, IoIosRemove } from "react-icons/io";


export function FolderSelect({ folder, folders, isOpen, setIsOpen, selectFolder, setSelectFolder }) {
    const selectIsOpen = isOpen[folder.folderId]
    const childrenFolder = folders.filter(fol => fol.refFolderId == folder.folderId)
    const toggleSelectFolder = () => {
        if (selectFolder && selectFolder.folderId === folder.folderId) {
            setSelectFolder(null);
        } else {
            console.log(folder.folderId)
            setSelectFolder(folder);
        }
    };

    const toggleFolder = (e) => {
        setIsOpen(state => ({
            ...state,
            [folder.folderId]: !selectIsOpen
        }))
    }
    return (
        <div className="no-select left-border">
            <div className="flex">
                <div className='folder-icon' onClick={toggleFolder}>
                    {selectIsOpen ? <IoIosRemove /> : <IoIosAdd />}
                </div>
                <div className="flex-center" onClick={toggleSelectFolder}>
                    <IoIosFolder />
                    {selectFolder?.folderId != folder.folderId ?
                        <div className="folder-name">{folder.name}</div> :
                        <div className="selected-folder-name">{folder.name}</div>}
                </div>
            </div>
            {selectIsOpen &&
                <>
                    {childrenFolder.length > 0 &&
                        childrenFolder.map(child => <FolderSelect
                            key={child.folderId}
                            folder={child}
                            folders={folders}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen} 
                            selectFolder={selectFolder}
                            setSelectFolder={setSelectFolder}/>
                        )}
                </>
            }
        </div>
    )
}