import { useEffect, useState } from "react";
import { AddNewLinePreview } from "./AddNewLinePreview";
import { useSelector } from "react-redux";

export function AddNewLine({ setApprovalLineIdList }) {
    const { approvalDocumentTemplate } = useSelector(state => state.e_approvalReducer);
    const [selectedJob, setSelectJob] = useState();
    const [selectedDepartment, setSelectDepartment] = useState();
    const [findEmployee, setFindEmployee] = useState([]);
    const [employee, setEmployee] = useState();

    useEffect(() => {
        if (approvalDocumentTemplate && approvalDocumentTemplate.employeeList) {
            const filterResult = approvalDocumentTemplate.employeeList.filter(emp => 
                (selectedJob ? emp.job.id == selectedJob : true) &&
                (selectedDepartment ? emp.department.id == selectedDepartment : true)
            );
            setFindEmployee(filterResult);
            setEmployee(null);
        }
    }, [selectedJob, selectedDepartment, approvalDocumentTemplate]);
    useEffect(() => {
        if (approvalDocumentTemplate && selectedDepartment) {
            const firstJob = approvalDocumentTemplate.jobList[0];
            if (firstJob) {
                setSelectJob(firstJob.id);
            }
            setEmployee(null);
        }
    }, [selectedDepartment]);
    useEffect(() => {
        if (approvalDocumentTemplate && findEmployee.length > 0) {
            const firstEmployee = findEmployee[0];
            if (selectedJob) {
                setEmployee(firstEmployee);
            } else {
                setEmployee(null)
            }
        }
    }, [selectedJob, findEmployee]);
    

    const onClickSubmit = () => {
        setApprovalLineIdList(state=>[...state, employee.employeeId])
    };

    return (
        <div className="new-line-area">
            <AddNewLinePreview employee={employee} />
            <div>
                <select name="departmentId" value={selectedDepartment} onChange={(e) => setSelectDepartment(e.target.value)}>
                    <option value={null}>==</option>
                    {approvalDocumentTemplate?.departmentList?.map(dep => (
                        <option key={dep.id} value={dep.id}>
                            {dep.name}
                        </option>
                    ))}
                </select>
                <select name="job" value={selectedJob || ''} onChange={(e) => setSelectJob(e.target.value)}>
                    <option value={null}>==</option>
                    {approvalDocumentTemplate?.jobList?.map(job => (
                        <option key={job.id} value={job.id}>
                            {job.title}
                        </option>
                    ))}
                </select>
                {findEmployee && findEmployee.length > 0 && 
                <select name="employee" value={employee ? employee.employeeId : ''} onChange={(e) => {
                    const selectedEmp = findEmployee.find(emp => emp.employeeId == e.target.value);
                    setEmployee(selectedEmp);
                }}>
                    {findEmployee.map(emp => (
                        <option key={emp.employeeId} value={emp.employeeId}>
                            {emp.name} {emp.job.title}
                        </option>
                    ))}
                </select>}
                {employee && <button onClick={onClickSubmit}>등록</button>}
            </div>
        </div>
    );
}
