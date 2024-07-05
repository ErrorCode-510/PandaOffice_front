import { Routes, Route } from "react-router-dom";
import Applicant from "./applicant/Applicant";
import Schedule from "./schedule/Schedule";
import ScheduleCreate from "./schedule/ScheduleCreate";

function RecruitmentRoutes() {
    return (
        <Routes>
            <Route path="applicant" element={<Applicant />} />
            <Route path="schedule">
                <Route index element={<Schedule />} />
                <Route path="create" element={<ScheduleCreate />} />
            </Route>
        </Routes>
    );
}

export default RecruitmentRoutes;
