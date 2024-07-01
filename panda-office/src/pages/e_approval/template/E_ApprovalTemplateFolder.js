import { useDispatch, useSelector } from 'react-redux';
import '../E_Approval.css';
import { useEffect, useState } from 'react';
import { callDocumentFolderAPI } from '../../../apis/E_ApprovalAPICalls';
import { Folder } from '../../../components/e_approval/template/TemplateFolder';
import { FolderManager } from '../../../components/e_approval/template/FolderManager';
import { TemplateManager } from '../../../components/e_approval/template/TemplateManager';
import { TemplateTable } from '../../../components/e_approval/template/TemplateTable';
import { fetchCurrentFolder } from '../../../modules/E_ApprovalModules';

export function DocumentTemplateFolderPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callDocumentFolderAPI());
        dispatch(fetchCurrentFolder(null))
    }, [dispatch]);

    const { documentTemplateSearchResult, currentFolder } = useSelector(state => state.e_approvalReducer);


    return (
        <>
            <div className="common-comp">
                <div className='title'>전자결재 양식 관리</div>
                <div className="flex-center align-center">
                    <div className='common-component' style={{ width: '25%' }}>
                        <div className='cc-header align-c'>폴더 목록</div>
                        <div className='cc-content align-l' style={{ height: '650px' }}>
                            <FolderManager />
                            <div className='scroll'>
                                {documentTemplateSearchResult.length > 0 ? (
                                    documentTemplateSearchResult.map((folder) => (
                                        <Folder
                                            key={folder.folderId}
                                            folder={folder}
                                        />
                                    ))
                                ) : (
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
                                <TemplateManager />
                                <TemplateTable />
                            </div> :
                            <div className='cc-content align-c' style={{ height: '650px' }}>
                                <div className='none-content-huge'>선택된 폴더가 없습니다.</div>
                            </div>}
                    </div>
                </div>
            </div>
        </>
    );
}
