import { useDispatch, useSelector } from 'react-redux';
import '../E_Approval.css';
import { useEffect, useState } from 'react';
import { callDocumentFolderAPI } from '../../../apis/e_approval/ApprovalDocumentFolderAPICalls';
import { FolderList } from '../../../components/e_approval/templateFolder/FolderList';
import { FolderManager } from '../../../components/e_approval/templateFolder/FolderManager';
import { TemplateManager } from '../../../components/e_approval/templateFolder/TemplateManager';
import { TemplateTable } from '../../../components/e_approval/templateFolder/TemplateTable';
import { fetchCurrentFolder } from '../../../modules/E_ApprovalModules';
import { FolderChangeModal } from '../../../components/e_approval/modal/FolderChangeModal';

export function DocumentTemplateFolderPage() {
    const dispatch = useDispatch();
    
    const { documentTemplateFolder, currentFolder } = useSelector(state => state.e_approvalReducer);
    const [folderSearchResult, setFolderSearchResult] = useState()
    const [folderChangeMode, setFolderChangeMode] = useState(false)
    useEffect(() => {
        dispatch(callDocumentFolderAPI());
        dispatch(fetchCurrentFolder(null))
    }, []);
    useEffect(() => {
        setFolderSearchResult(documentTemplateFolder)
    }, [documentTemplateFolder])


    return (
        folderSearchResult&&
        <>
            <div className="common-comp">
                <div className='title'>전자결재 양식 관리</div>
                <div className="flex-center align-center">
                    <div className='common-component' style={{ width: '25%' }}>
                        <div className='cc-header align-c'>폴더 목록</div>
                        <div className='cc-content align-l' style={{ height: '650px' }}>
                            <FolderManager setFolderSearchResult={setFolderSearchResult} />
                            <div className='scroll'>
                                {folderSearchResult.length > 0 ?
                                    <FolderList folders={folderSearchResult} />
                                    : (
                                        <p className='none-content-mini'>결과를 찾을 수 없습니다.</p>
                                    )}
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '20px' }}></div>
                    <div className='common-component' style={{ width: '100%' }}>
                        <div className='cc-header align-c'>폴더 상세</div>
                        {currentFolder ?
                            <div className='cc-content align-l' style={{ height: '650px' }}>
                                <TemplateManager setFolderChangeMode={setFolderChangeMode}/>
                                <TemplateTable />
                            </div> :
                            <div className='cc-content align-c' style={{ height: '650px' }}>
                                <div className='none-content-huge'>선택된 폴더가 없습니다.</div>
                            </div>}
                    </div>
                </div>
            </div>
            {folderChangeMode&&<FolderChangeModal setFolderChangeMode={setFolderChangeMode}/>}
        </>
    );
}
