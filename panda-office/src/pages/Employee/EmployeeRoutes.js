import { Routes, Route } from "react-router-dom";
import EmployeeLayout from "./EmployeeLayout"
import MyPay from './Payroll/MyPay';
import EmplPayroll from './Payroll/EmplPayroll';

function EmployeeRoutes() {
    return (
        <Routes>
            <Route index="/employee" element={<EmployeeLayout />} />
            <Route path="payroll/MyPay" element={<MyPay />} />
            <Route path="payroll/EmplPayroll" element={<EmplPayroll />} />
        </Routes>
    );
}

export default EmployeeRoutes;
