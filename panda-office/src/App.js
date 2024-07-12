import './reset.css';
import './style.css';
import './pages/recruitment/recruitment.css';
import 'react-toastify/dist/ReactToastify.css';
import './components/main/calender/AnnualLeaveCalendar.css'
import './pages/welfare/welfare.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";

import Login from "./components/login/Login";
import ProtectedRoute from "./components/router/ProtectedRoute";
import Main from "./pages/main/Main";

import Error from "./pages/error/Error";
import Recruitment from "./pages/recruitment/RecruitmentLayout";
import Attendance from "./pages/attendance/AttendanceLayout";
import E_ApprovalLayout from './pages/e_approval/E_ApprovalLayout';
import E_ApprovalRoute from './pages/e_approval/E_ApprovalRoutes';
import NoticeRoutes from './pages/notice/NoticeRoutes';
import RecruitmentRoutes from './pages/recruitment/RecruitmentRoutes';
import AttendanceRoutes from './pages/attendance/AttendanceRoutes';
import Employee from './pages/Employee/EmployeeLayout';
import EmployeeRoutes from './pages/Employee/EmployeeRoutes';
import Welfare from './pages/welfare/WelfareLayout';
import WelfareRoutes from './pages/welfare/WelfareRoutes';
import NoticeLayout from "./pages/notice/NoticeLayout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute loginCheck={true}>
                        <Layout />
                    </ProtectedRoute>
                }>
                    <Route index element={<Main />} />
                    <Route path="notice" element={<NoticeLayout />} >
                        <Route path="*" element={<NoticeRoutes />} />
                    </Route>
                    <Route path="employee" element={<Employee />} >
                        <Route path="*" element={<EmployeeRoutes />} />
                    </Route>
                    <Route path="attendance" element={<Attendance />} >
                        <Route path="*" element={<AttendanceRoutes />} />   
                    </Route>
                    <Route path="e_approval" element={<E_ApprovalLayout />}>
                        <Route path="*" element={<E_ApprovalRoute />} />
                    </Route>
                    <Route path="recruitment" element={<Recruitment />} >
                        <Route path="*" element={<RecruitmentRoutes />} />
                    </Route>
                    <Route path="welfare" element={<Welfare />} >
                        <Route path="*" element={<WelfareRoutes />} />
                    </Route>
                </Route>

                <Route path="member">
                    <Route path="login" element={<ProtectedRoute loginCheck={false}><Login /></ProtectedRoute>} />
                    <Route index element={<Main />} />
                </Route>

                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
