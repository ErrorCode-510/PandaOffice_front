import { Routes, Route } from "react-router-dom";
import Applicant from "./applicant/Applicant";
import Schedule from "./schedule/Schedule";

function RecruitmentRoutes() {
    return (
        <Routes>
            <Route path="applicant" element={<Applicant />} />
            <Route path="schedule" element={<Schedule />} />
        </Routes>
    );
}

export default RecruitmentRoutes;
