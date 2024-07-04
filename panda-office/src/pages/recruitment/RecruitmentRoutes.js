import { Routes, Route } from "react-router-dom";
import Applicant from "./applicant/Applicant";
import ApplicantModal from "./applicant/ApplicantModal";

function RecruitmentRoutes() {
    return (
        <Routes>
            <Route path="applicant" element={<Applicant/>} />
        </Routes>
    );
}

export default RecruitmentRoutes;
