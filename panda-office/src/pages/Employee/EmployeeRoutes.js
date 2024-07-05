import { Routes, Route } from "react-router-dom";

import EmployeeList from "./EmployeeList";
import AddNewEmployee from "./AddNewEmployee";
import EmployeeDetail from "./EmployeeDetail";
import {getMemberId, removeToken, saveToken} from "../../utils/TokenUtils";
import EditEmployee from "./EditEmployee";
import MyPay from './Payroll/MyPay';
import EmplPayroll from './Payroll/EmplPayroll';

function EmployeeRoutes() {
    console.log(getMemberId());
    return (
        <Routes>
            <Route path="test" element={<div>인사관리 라우팅 테스트</div>} />
            {/* 라우트 적용 */}
            <Route path="employeeList" element={<EmployeeList />} />
            <Route path="addNewEmployee" element={<AddNewEmployee />} />
            <Route path=":id" element={<EmployeeDetail />} />
            <Route path="editEmployee/:id" element={<EditEmployee />} />
            <Route path="payroll/MyPay" element={<MyPay />} />
            <Route path="payroll/EmplPayroll" element={<EmplPayroll />} />
        </Routes>

    );
}

export default EmployeeRoutes;
