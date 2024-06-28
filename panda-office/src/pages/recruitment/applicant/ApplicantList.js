import ApplicantListItem from "./ApplicantListItem";

const ApplicantList = ({applicant}) => {
    // console.log("면접자 리스트 데이터 받기 : " + JSON.stringify((applicant)))
    return (
        <>
            <div>
                { applicant && applicant.map(applicant => <ApplicantListItem key={applicant.id} applicant={applicant} />)}
            </div>
        </>
    )
}

export default ApplicantList;