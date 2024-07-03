import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callApplicantListAPI } from "../../../apis/ApplicantAPICalls";
import ApplicantList from "./ApplicantList";
import PagingBar from "../PagingBar";
import ApplicantSearch from "./ApplicantSearch";
import ApplicantModal from "./ApplicantModal";
import ApplicantCreateModal from "./ApplicantCreateModal";
import { getModalStatusClosed } from '../../../modules/ApplicantModules';

const Applicant = () => {

    const dispatch = useDispatch();
    /* 페이지 번호 상태 저장하기: 디폴트 1 */
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalClose, setIsModalClose] = useState(true);
    
    const { applicant, criteria, modalStatus, modalStatusClosed } = useSelector(state => state.applicantReducer)



    useEffect(() => {
        dispatch(callApplicantListAPI({ criteria, currentPage }))
    }, [currentPage, criteria]);


    return (
        <>
            {
                applicant &&
                <>
                    <p className="applicant-title">면접자 목록</p>
                    <ApplicantSearch />
                    <div className="applicant-wrap">
                        <ApplicantList applicant={applicant.data} />
                        <PagingBar pageInfo={applicant.pageInfo} setCurrentPage={setCurrentPage} />
                    </div>
                    <ApplicantModal />
                    <ApplicantCreateModal/>
                </>
            }
        </>
    )
}

export default Applicant;