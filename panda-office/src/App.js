import './style.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";

import Login from "./components/login/Login";
import ProtectedRoute from "./components/router/ProtectedRoute";
import Main from "./pages/main/Main"


import Error from "./pages/error/Error";
import Recruitment from "./pages/recruitment/Recruitment";
import Notice from "./pages/notice/Notice";
import Attendance from "./pages/attendance/Attendance";

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
                    <Route path="/notice" element={<Notice />} />
                    <Route path="/employee" element={<Recruitment />} />
                    <Route path="/attendance" element={<Attendance />} />
                    <Route path="/e_approval" element={<Recruitment />} />
                    <Route path="/recruitment" element={<Recruitment />} />
                    <Route path="/welfare" element={<Recruitment />} />
                </Route>

                <Route path="/member">
                    <Route path="login" element={<ProtectedRoute loginCheck={false}><Login /></ProtectedRoute>} />
                    <Route index element={<Main />} />
                </Route>

                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
