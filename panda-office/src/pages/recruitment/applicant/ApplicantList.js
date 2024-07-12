import ApplicantInfoTitle from "./ApplicantInfoTitle";
import ApplicantListItem from "./ApplicantListItem";

const ApplicantList = ({ applicant }) => {
    return (
        <>
            <ApplicantInfoTitle />
            <div>
                {applicant && applicant.map(applicant => <ApplicantListItem key={applicant.id} applicant={applicant} />)}
            </div>
        </>
    )
}

export default ApplicantList;