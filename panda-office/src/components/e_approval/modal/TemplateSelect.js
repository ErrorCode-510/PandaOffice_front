import { IoIosAdd, IoIosDocument, IoIosFolder, IoIosRemove } from "react-icons/io"


export function TemplateSelect({ folder, folders, isOpen, setIsOpen, selectTemplate, setSelectTemplate }) {
    const selectIsOpen = isOpen[folder.folderId]
    const childrenFolder = folders.filter(fol => fol.refFolderId == folder.folderId)
    const toggleFolder = (e) => {
        setIsOpen(state => ({
            ...state,
            [folder.folderId]: !selectIsOpen
        }))
    }
    const toggleCurrentTemplate = (e) => {
        if (selectTemplate && selectTemplate.documentId == e.currentTarget.id) {
            setSelectTemplate(null)
        } else {
            setSelectTemplate(folder.documentList.find(doc => doc.documentId == e.currentTarget.id))
        }
    };
    return <>
        <div className="no-select left-border">
            <div className="flex">
                <div className='folder-icon' onClick={toggleFolder}>
                    {selectIsOpen ? <IoIosRemove /> : <IoIosAdd />}
                </div>
                <div className="flex-center">
                    <IoIosFolder />
                    <div className="folder-name">{folder.name}</div>
                </div>
            </div>
            {selectIsOpen &&
                <>
                    {childrenFolder.length > 0 &&
                        childrenFolder.map(child => <TemplateSelect
                            key={child.folderId}
                            folder={child}
                            folders={folders}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            selectTemplate={selectTemplate}
                            setSelectTemplate={setSelectTemplate} />
                        )}
                    {folder.documentList.length > 0 &&
                        folder.documentList.map(doc => <div
                            key={doc.documentId}
                            className="flex"
                            style={{ marginLeft: '18px' }}>
                            <div className="flex-center"
                                onClick={toggleCurrentTemplate}
                                id={doc.documentId}> {/* id를 이 div에 지정 */}
                                <IoIosDocument />
                                {selectTemplate?.documentId != doc.documentId ?
                                    <div className="folder-name">{doc.title}</div> :
                                    <div className="selected-folder-name">{doc.title}</div>}
                            </div>
                        </div>)
                    }
                </>
            }
        </div>
    </>
}