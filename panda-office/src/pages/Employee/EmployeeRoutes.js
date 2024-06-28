import { Routes, Route } from "react-router-dom";

import EmployeeList from "./EmployeeList";
import AddNewEmployee from "./AddNewEmployee";

function EmployeeRoutes() {
    return (
        <Routes>
            <Route path="test" element={<div>인사관리 라우팅 테스트</div>} />
            {/* 라우트 적용 */}
            <Route path="employeeList" element={<EmployeeList />} />
            <Route path="addNewEmployee" element={<AddNewEmployee />} />
        </Routes>
    );
}

export default EmployeeRoutes;
