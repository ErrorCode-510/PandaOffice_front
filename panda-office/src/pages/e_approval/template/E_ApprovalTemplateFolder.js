import { useDispatch, useSelector } from 'react-redux';
import '../E_Approval.css';
import { useEffect, useState } from 'react';
import { callDocumentFolderAPI } from '../../../apis/E_ApprovalAPICalls';
import { Folder } from '../../../components/e_approval/template/TemplateFolder';
import { FolderManager } from '../../../components/e_approval/template/FolderManager';

export function DocumentTemplateFolderPage() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callDocumentFolderAPI())
    }, [])

    const { documentTemplateFolder } = useSelector(state => state.e_approvalReducer);

    const [currentFolder, setCurrentFolder] = useState({});

    return (

        <>
            <div className="common-comp flex-center align-center">
                <div className='common-component' style={{ width: '25%' }}>
                    <div className='cc-header align-c'>폴더</div>
                    <div className='cc-content align-l' style={{ height: '700px' }}>
                        <FolderManager />
                        {documentTemplateFolder.data.length > 0 ? (
                            documentTemplateFolder.data.map((folder) => (
                                <Folder key={folder.folderId} folder={folder} setCurrentFolder={setCurrentFolder} currentFolder={currentFolder} />
                            ))
                        ) : (
                            <p>No folders available.</p>
                        )}
                    </div>
                </div>
                <div style={{ width: '20px' }}></div>
                <div className='common-component' style={{ width: '100%' }}>
                    <div className='cc-header align-c'>{currentFolder.name}</div>
                    <div className='cc-content align-l' style={{ height: '700px' }}></div>
                </div>
            </div>
        </>
    )
}
