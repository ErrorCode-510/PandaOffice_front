import { React, useEffect, useState } from 'react';
import './modal.css'
import { useDispatch, useSelector } from 'react-redux';
import { callDocumentFolderAPI } from '../../../apis/e_approval/ApprovalDocumentFolderAPICalls';
import { TemplateSelect } from './TemplateSelect';
import { FolderSelect } from './FolderSelect';



export function DraftModal({ setDraftModal }) {
    const dispatch = useDispatch();
    const { documentTemplateFolder } = useSelector(state => state.e_approvalReducer)
    const [selectTemplate, setSelectTemplate] = useState(null);
    const [isOpen, setIsOpen] = useState({})
    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            setDraftModal(false)
        }
    }
    const onClickDraft = () => { }
    useEffect(() => {
        dispatch(callDocumentFolderAPI())
    }, [])
    return <div className="modal-bg" onClick={handleBackgroundClick}>
        <div className="modal-min-wrap">
            <div className='modal-title'>양식 선택</div>
            <div className='flex'>
                <div className='modal-component'>
                    <div className='modal-header align-c'>양식 목록</div>
                    <div className='modal-content align-c'>
                        {documentTemplateFolder &&
                            <div className='modal-scroll'>
                                {documentTemplateFolder
                                    .filter(folder => folder.refFolderId === null)
                                    .map(folder => <TemplateSelect
                                        folder={folder}
                                        key={folder.folderId}
                                        folders={documentTemplateFolder}
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        selectTemplate={selectTemplate}
                                        setSelectTemplate={setSelectTemplate} />)}
                            </div>
                        }
                    </div>
                </div>
                <div className='modal-component'>
                    <div className='current-template-info'>
                        <div className='modal-header align-c'>양식 정보</div>
                        <div className='modal-content align-c'>
                            {selectTemplate &&
                                <div className='target-template'>
                                    <table>
                                        <tr>
                                            <th>제목</th>
                                            <td>{selectTemplate.title}</td>
                                        </tr>
                                        <tr>
                                            <th>최종 수정자</th>
                                            <td>{selectTemplate.lastEditorName + " " + selectTemplate.lastEditorJob}</td>
                                        </tr>
                                        <tr>
                                            <th>최종 수정일</th>
                                            <td>{selectTemplate.lastEditDate}</td>
                                        </tr>
                                        <tr>
                                            <th>설명</th>
                                            <td>b</td>
                                        </tr>
                                    </table>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='modal-btn-area'>
                <button className='cancel-btn'>
                    취소
                </button>
                <button className='modyfi-btn'>
                    작성
                </button>
            </div>
        </div>
    </div>
}