import { React, useState } from 'react';
import './modal.css'
import { useDispatch, useSelector } from 'react-redux';
import { FolderSelect } from './FolderSelect';
import { IoIosArrowDown } from 'react-icons/io';
import { callPutTemplateRefFolder } from '../../../apis/e_approval/ApprovalDocumentTemplateAPICalls';

export function FolderChangeModal({ setFolderChangeMode }) {
    const dispatch = useDispatch();
    const { selectTemplates, documentTemplateFolder, currentFolder } = useSelector(state => state.e_approvalReducer)
    const [selectFolder, setSelectFolder] = useState(null);
    const [isOpen, setIsOpen] = useState({})
    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            setFolderChangeMode(false);
        }
    };
    const onClickSubmit = () => {
        const request = {
            request: {
                beforeFolderId: currentFolder.folderId,
                afterFolderId: selectFolder.folderId,
                templateIdList: selectTemplates
            }
        }
        dispatch(callPutTemplateRefFolder(request))
        setFolderChangeMode(false)
    }

    return (
        <div className="modal-bg" onClick={handleBackgroundClick}>
            <div className="modal-min-wrap">
                <div className='modal-title'>폴더 변경</div>
                <div className='flex'>
                    <div className='modal-component'>
                        <div className='modal-header align-c'>폴더 목록</div>
                        <div className='modal-content align-c'>
                            {documentTemplateFolder &&
                                <div className='modal-scroll'>
                                    {documentTemplateFolder
                                        .filter(folder => folder.refFolderId === null)
                                        .map(folder => {
                                            return <FolderSelect folder={folder}
                                                key={folder.folderId}
                                                folders={documentTemplateFolder}
                                                isOpen={isOpen}
                                                setIsOpen={setIsOpen}
                                                selectFolder={selectFolder}
                                                setSelectFolder={setSelectFolder} />
                                        })}
                                </div>
                            }
                        </div>
                    </div>
                    <div className='modal-component'>
                        <div className="now-folder">
                            <div className='modal-header align-c'>{currentFolder.name}</div>
                            <div className='modal-content align-c'>
                                <div className='target-template'>
                                    {currentFolder.documentList
                                        .filter(temp => selectTemplates.includes(temp.documentId))
                                        .map(temp => <div>{temp.title}</div>)}
                                </div>
                            </div>
                        </div>
                        <IoIosArrowDown style={{ fontSize: '30px' }} />
                        {selectFolder &&
                            <div className="now-folder">
                                <div className='modal-header align-c'>{selectFolder.name}</div>
                                <div className='modal-content align-c'>
                                    <div className='target-template'>
                                        {currentFolder.documentList
                                            .filter(temp => selectTemplates.includes(temp.documentId))
                                            .map(temp => <div>{temp.title}</div>)}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className='modal-btn-area'>
                    <button className='cancel-btn' onClick={() => { setFolderChangeMode(false) }}>
                        취소
                    </button>
                    <button className='modyfi-btn' onClick={onClickSubmit}>
                        변경
                    </button>
                </div>
            </div>
        </div>
    );
}
