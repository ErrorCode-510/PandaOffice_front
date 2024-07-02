import { Routes, Route } from "react-router-dom";
import Applicant from "./applicant/Applicant";

function RecruitmentRoutes() {
    return (
        <Routes>
            <Route path="applicant" element={<Applicant/>} />
        </Routes>
    );
}

export default RecruitmentRoutes;
