import Footer from "../../components/common/Footer";
import EmployeeSidebar from "./EmployeeSidebar";
import "./Employee.css";
import { useEffect, useState } from "react";
import axios from "axios";

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState({
        emp_id: '',
        department: '',
        hire_date_start: '',
        hire_date_end: '',
        name: '',
        position: '',
        employment_status: '재직'
    });

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:8001/api/v1/members/employees');
                setEmployees(response.data);
                setFilteredEmployees(response.data);
            } catch (error) {
                console.error('Failed to fetch employee data:', error);
            }
        };

        fetchEmployees();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria({ ...searchCriteria, [name]: value });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        filterEmployees();
    };

    const filterEmployees = () => {
        console.log('Search criteria:', searchCriteria);

        const filtered = employees.filter(employee => {
            console.log('Checking employee:', employee);
            const matchesEmpId = searchCriteria.emp_id === '' || employee.employeeId.toString().includes(searchCriteria.emp_id);
            const matchesDepartment = searchCriteria.department === '' || (employee.department && employee.department.name.includes(searchCriteria.department));
            const matchesHireDate = (searchCriteria.hire_date_start === '' || searchCriteria.hire_date_end === '') ||
                (new Date(employee.hireDate) >= new Date(searchCriteria.hire_date_start) && new Date(employee.hireDate) <= new Date(searchCriteria.hire_date_end));
            const matchesName = searchCriteria.name === '' || employee.name.includes(searchCriteria.name);
            const matchesPosition = searchCriteria.position === '' || (employee.job && employee.job.title.includes(searchCriteria.position));
            const matchesStatus = searchCriteria.employment_status === '' || employee.employmentStatus === searchCriteria.employment_status;
            console.log(searchCriteria.employment_status);
            console.log(`Employee ID: ${employee.employeeId}, Employment Status: ${employee.employmentStatus}, Matches Status: ${matchesStatus}`);

            return matchesEmpId && matchesDepartment && matchesHireDate && matchesName && matchesPosition && matchesStatus;
        });

        console.log('Filtered employees:', filtered);
        setFilteredEmployees(filtered);
    };

    return (
        <>
            <div className="employee-container">
                <div className="side-comp">
                    <EmployeeSidebar />
                </div>
                <div className="common-comp">
                    <div className="table-container">
                        <h1>사원 목록</h1>
                        <form onSubmit={handleSearch}>
                            <div className="flex-container">
                                <table>
                                    <tbody>
                                    <tr>
                                        <th style={{borderTop: '2px solid black'}}>사번</th>
                                        <td style={{borderTop: '2px solid black'}}>
                                            <input type="text" id="emp_id" name="emp_id" value={searchCriteria.emp_id} onChange={handleInputChange} />
                                        </td>
                                        <th style={{borderTop: '2px solid black'}}>부서</th>
                                        <td style={{borderTop: '2px solid black'}}>
                                            <input type="text" id="department" name="department" value={searchCriteria.department} onChange={handleInputChange} />
                                        </td>
                                        <th style={{borderTop: '2px solid black'}}>입사일</th>
                                        <td style={{borderTop: '2px solid black'}}>
                                            <input type="date" id="hire_date_start" name="hire_date_start" value={searchCriteria.hire_date_start} onChange={handleInputChange} /> ~
                                            <input type="date" id="hire_date_end" name="hire_date_end" value={searchCriteria.hire_date_end} onChange={handleInputChange} />
                                        </td>
                                        <td rowSpan="2" style={{borderTop: '2px solid black'}}>
                                            <button type="submit" className="list-search-button">검색하기</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>성명</th>
                                        <td>
                                            <input type="text" id="name" name="name" value={searchCriteria.name} onChange={handleInputChange} />
                                        </td>
                                        <th>직위</th>
                                        <td>
                                            <input type="text" id="position" name="position" value={searchCriteria.position} onChange={handleInputChange} />
                                        </td>
                                        <th>재직여부</th>
                                        <td>
                                            <select id="employment_status" name="employment_status" value={searchCriteria.employment_status} onChange={handleInputChange}>
                                                <option value="active">재직중</option>
                                                <option value="inactive">퇴사</option>
                                            </select>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>

                    <div className="list-table">
                        <div className="table-container">
                            <table>
                                <thead className="employeeList">
                                <tr>
                                    <th>사번</th>
                                    <th>성명</th>
                                    <th>부서</th>
                                    <th>재직상태</th>
                                    <th>직위</th>
                                    <th>입사일</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredEmployees.map(employee => (
                                    <tr key={employee.employeeId}>
                                        <td>{employee.employeeId}</td>
                                        <td>{employee.name}</td>
                                        <td>{employee.department ? employee.department.name : ''}</td>
                                        <td>{employee.employmentStatus}</td>
                                        <td>{employee.job ? employee.job.title : ''}</td>
                                        <td>{employee.hireDate}</td>
                                    </tr>
                                ))}
                                </tbody>
                                <div className="button-container">
                                    <button>신규 사원 추가</button>
                                </div>
                            </table>

                        </div>

                        {/*<div className="footer">*/}
                        {/*    <Footer />*/}
                        {/*</div>*/}
                    </div>

            </div>
            </div>
        </>
    )
}

export default EmployeeList;
