import {Routes, Route, Navigate} from "react-router-dom";
import Applicant from "./applicant/Applicant";
import Schedule from "./schedule/Schedule";
import ScheduleCreate from "./schedule/ScheduleCreate";
import {useEffect, useState} from "react";
import axios from "axios";
import {getMemberId} from "../../utils/TokenUtils";

function RecruitmentRoutes() {
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                console.log("Fetching employee details...");
                const response = await axios.get(`http://localhost:8001/api/v1/members/employees/${getMemberId()}`);
                setEmployee(response.data);
                console.log(employee);
            } catch (error) {
                console.error('Failed to fetch employee details:', error);
            }
        };

        fetchEmployee();
    }, []);
    const depId = employee?.employee?.department?.id;
    if (depId === 11) {return (

        <Routes>
            <Route path="applicant" element={<Applicant />} />
            <Route path="schedule" element={<Schedule />} />
        </Routes>
    );}else {
        // depId가 11이 아닐 때 루트 화면('/')으로 리다이렉트
        return <Navigate to="/" replace />;
    }
}

export default RecruitmentRoutes;
