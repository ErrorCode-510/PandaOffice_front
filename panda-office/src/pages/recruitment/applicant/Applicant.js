import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callApplicantListAPI } from "../../../apis/ApplicantAPICalls";
import ApplicantList from "./ApplicantList";
import PagingBar from "../PagingBar";

const Applicant = () => {

    const dispatch = useDispatch();
    /* 페이지 번호 상태 저장하기: 디폴트 1 */
    const [currentPage, setCurrentPage] = useState(1);
    const { applicant } = useSelector(state => state.applicantReducer)

    useEffect(() => {
        dispatch(callApplicantListAPI({ currentPage }))
    }, [currentPage]);

    return (
        <>
            {
                applicant &&
                <>
                    <ApplicantList applicant={applicant.data} />
                    <PagingBar pageInfo={applicant.pageInfo} setCurrentPage={setCurrentPage} />
                </>
            }
        </>
    )
}

export default Applicant;