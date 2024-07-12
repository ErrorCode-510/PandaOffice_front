import { useLocation, useNavigate } from "react-router-dom"
import { DocumentCriteria } from "../../../components/e_approval/document/DocumentCriteria";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { callApprovalDocumentSearch } from "../../../apis/e_approval/ApprovalDocumentAPICalls";
import { DocumentTable } from "../../../components/e_approval/document/DocumentTable";
import { setApprovalDocumentList } from "../../../modules/E_ApprovalModules";


export function DocumentList({ title }) {
    const {approvalDocumentList} = useSelector(state=>state.e_approvalReducer)
    const dispatch = useDispatch();
    const [searchCriteria, setSearchCriteria] = useState();
    const location = useLocation();
    const navigate = useNavigate();

    const onClickSearch = () => {
        let query = 'approval-documents?'
        let isFirstParam = true;
        for (const name in searchCriteria) {
            if (searchCriteria[name] !== '') {
                if (!isFirstParam) {
                    query += '&';
                }
                query += `${name}=${searchCriteria[name]}`;
                isFirstParam = false;
            }
        }
        dispatch(callApprovalDocumentSearch(query))
    }

    useEffect(() => {
        return () => {
            setApprovalDocumentList(null)
        }
    }, [])

    return (
        <div className="common-comp">
            <div className='title'>{title ? title : '문서'}</div>
            <DocumentCriteria setSearchCriteria={setSearchCriteria} onClickSearch={onClickSearch} />
            <DocumentTable approvalDocumentList={approvalDocumentList}/>
        </div>
    )

}