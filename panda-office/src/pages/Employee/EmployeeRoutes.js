import { Routes, Route } from "react-router-dom";

import EmployeeList from "./EmployeeList";
import AddNewEmployee from "./AddNewEmployee";
import EmployeeDetail from "./EmployeeDetail";
import {getMemberId, removeToken, saveToken} from "../../utils/TokenUtils";
import EditEmployee from "./EditEmployee";

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
        </Routes>

    );
}

export default EmployeeRoutes;
