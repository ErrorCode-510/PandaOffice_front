import { Routes, Route, Navigate } from "react-router-dom";

import EmployeeList from "./EmployeeList";
import AddNewEmployee from "./AddNewEmployee";
import EmployeeDetail from "./EmployeeDetail";
import {getMemberId, getMemberDep, saveToken} from "../../utils/TokenUtils";
import EditEmployee from "./EditEmployee";
import MyPay from './Payroll/MyPay';
import EmplPayroll from './Payroll/EmplPayroll';
import {useEffect, useState} from "react";
import axios from "axios";

function EmployeeRoutes() {
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

    return (
        <Routes>

            <Route path="employeeList" element={depId === 11 ? <EmployeeList /> : <Navigate to={`/employee/${getMemberId()}`} replace />} />
            <Route path="addNewEmployee" element={depId === 11 ? <AddNewEmployee /> : <Navigate to={`/employee/${getMemberId()}`} replace />} />
            <Route path=":id" element={<EmployeeDetail />} />
            <Route path="editEmployee/:id" element={depId === 11 ? <EditEmployee /> : <Navigate to={`/employee/${getMemberId()}`} replace />} />
            <Route path="payroll/MyPay" element={<MyPay />} />
            <Route path="payroll/EmplPayroll" element={depId === 11 ? <EmplPayroll /> : <Navigate to={`/employee/${getMemberId()}`} replace />} />
        </Routes>
    );
}

export default EmployeeRoutes;
