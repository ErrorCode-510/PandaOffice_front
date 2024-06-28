import React, { useState } from 'react';
import EmployeeSidebar from "./EmployeeSidebar";
import "./Employee.css";

function AddNewEmployee() {
    const [rows, setRows] = useState([{ relation: '', name: '', dob: '', job: '', education: '', note: '' }]);
    const [employmentRows, setEmploymentRows] = useState([{ period: '', companyName: '', department: '', finalPosition: '', jobDescription: '' }]);

    const handleAddRow = () => {
        const newRow = { relation: '', name: '', dob: '', job: '', education: '', note: '' };
        setRows([...rows, newRow]);
    };

    const handleAddEmploymentRow = () => {
        const newRow = { period: '', companyName: '', department: '', finalPosition: '', jobDescription: '' };
        setEmploymentRows([...employmentRows, newRow]);
    };

    return (
        <>
            <div className="newEmployee-container">
                <div className="side-comp">
                    <EmployeeSidebar />
                </div>
                <div className="common-comp">
                    <div className="table-container">
                        <h1>사원 목록</h1>
                        <form>
                            <div className="flex-container">
                                <table>
                                    <tbody>
                                    <tr>
                                        <th rowSpan="2">사진</th>
                                        <td rowSpan="2">
                                            <input type="text" id="emp_id" name="emp_id"/>
                                        </td>
                                        <th>성명</th>
                                        <td>
                                            <input type="text" id="name" name="name"/>
                                        </td>
                                        <th>계좌번호</th>
                                        <td>
                                            <input type="text" id="account_number" name="account_number"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>전화번호</th>
                                        <td>
                                            <input type="text" id="phone" name="phone"/>
                                        </td>
                                        <th>주민등록번호</th>
                                        <td>
                                            <input type="text" id="ssn" name="ssn"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>성별</th>
                                        <td>
                                            <input type="text" id="gender" name="gender"/>
                                        </td>
                                        <th>입사일</th>
                                        <td>
                                            <input type="text" id="join_date" name="join_date"/>
                                        </td>
                                        <th>주소</th>
                                        <td>
                                            <input type="text" id="address" name="address"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>국적</th>
                                        <td>
                                            <input type="text" id="nationality" name="nationality"/>
                                        </td>
                                        <th>생년월일</th>
                                        <td>
                                            <input type="text" id="dob" name="dob"/>
                                        </td>
                                        <th>이메일</th>
                                        <td>
                                            <input type="text" id="email" name="email"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th colSpan="6">가족관계</th>
                                    </tr>
                                    <tr>
                                        <th>관계</th>
                                        <th>성명</th>
                                        <th>생년월일</th>
                                        <th>직업</th>
                                        <th>학력</th>
                                        <th>비고</th>
                                    </tr>
                                    {rows.map((row, index) => (
                                        <tr key={index}>
                                            <td><input type="text" value={row.relation} onChange={(e) => {
                                                const newRows = [...rows];
                                                newRows[index].relation = e.target.value;
                                                setRows(newRows);
                                            }} /></td>
                                            <td><input type="text" value={row.name} onChange={(e) => {
                                                const newRows = [...rows];
                                                newRows[index].name = e.target.value;
                                                setRows(newRows);
                                            }} /></td>
                                            <td><input type="text" value={row.dob} onChange={(e) => {
                                                const newRows = [...rows];
                                                newRows[index].dob = e.target.value;
                                                setRows(newRows);
                                            }} /></td>
                                            <td><input type="text" value={row.job} onChange={(e) => {
                                                const newRows = [...rows];
                                                newRows[index].job = e.target.value;
                                                setRows(newRows);
                                            }} /></td>
                                            <td><input type="text" value={row.education} onChange={(e) => {
                                                const newRows = [...rows];
                                                newRows[index].education = e.target.value;
                                                setRows(newRows);
                                            }} /></td>
                                            <td><input type="text" value={row.note} onChange={(e) => {
                                                const newRows = [...rows];
                                                newRows[index].note = e.target.value;
                                                setRows(newRows);
                                            }} /></td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="6" style={{textAlign: 'center'}}>
                                            <button type="button" onClick={handleAddRow} className="plus-button">+
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th colSpan="6">경력사항</th>
                                    </tr>
                                    <tr>
                                        <th>기간</th>
                                        <th>회사명</th>
                                        <th>근무부서</th>
                                        <th>최종직위</th>
                                        <th>업무내용</th>
                                        <th></th>
                                    </tr>
                                    {employmentRows.map((row, index) => (
                                        <tr key={index}>
                                            <td><input type="text" value={row.period} onChange={(e) => {
                                                const newRows = [...employmentRows];
                                                newRows[index].period = e.target.value;
                                                setEmploymentRows(newRows);
                                            }} /></td>
                                            <td><input type="text" value={row.companyName} onChange={(e) => {
                                                const newRows = [...employmentRows];
                                                newRows[index].companyName = e.target.value;
                                                setEmploymentRows(newRows);
                                            }} /></td>
                                            <td><input type="text" value={row.department} onChange={(e) => {
                                                const newRows = [...employmentRows];
                                                newRows[index].department = e.target.value;
                                                setEmploymentRows(newRows);
                                            }} /></td>
                                            <td><input type="text" value={row.finalPosition} onChange={(e) => {
                                                const newRows = [...employmentRows];
                                                newRows[index].finalPosition = e.target.value;
                                                setEmploymentRows(newRows);
                                            }} /></td>
                                            <td><input type="text" value={row.jobDescription} onChange={(e) => {
                                                const newRows = [...employmentRows];
                                                newRows[index].jobDescription = e.target.value;
                                                setEmploymentRows(newRows);
                                            }} /></td>
                                            <td></td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="6" style={{textAlign: 'center'}}>
                                            <button type="button" onClick={handleAddEmploymentRow} className="plus-button">+
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddNewEmployee;
