import { Routes, Route } from "react-router-dom";
import AttendanceStatus from './attendancestatus/AttendanceStatus';
import AnnualLeaveRecord from './annualleaverecord/AnnualLeaveRecord';
import AnnualLeaveCalendar from './annualLeaveCalendar/AnnualLeaveCalendar';
import AttendanceRequestStatus from './attendancerequeststatus/AttendanceRequestStatus';
import AnnualLeaveAdjustment from './annualleaveadjustment/AnnualLeaveAdjustment';


function AttendanceRoutes() {
    return (
        <Routes>
            <Route path="management/status" element={<AttendanceStatus />} />
            <Route path="management/annual_leave_record" element={<AnnualLeaveRecord />} />
            <Route path="annualCalendar" element={<AnnualLeaveCalendar />} />
            <Route path="request_status" element={<AttendanceRequestStatus />} />
            <Route path="annual_leave_adjustment" element={<AnnualLeaveAdjustment />} />
            
        </Routes>
    );
}

export default AttendanceRoutes;
