import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Employee.css'; // Import the CSS file
import { formatDate } from "../../utils/DateUtils";

function EmployeeDetail() {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                console.log("Fetching employee details...");
                const response = await axios.get(`http://localhost:8001/api/v1/members/employees/${id}`);
                setEmployee(response.data);
            } catch (error) {
                console.error('Failed to fetch employee details:', error);
            }
        };

        fetchEmployee();
    }, [id]);

    if (!employee) {
        return <div>Loading...</div>;
    }

    return (
        <div className="employee-detail">
            <div className="header">
                <h1>{employee.employee.name}의 상세 정보</h1>
            </div>
            <div className="main-content">
                <div className="profile-section">
                    <img className="profile-photo" src={employee.photoPath} alt={`${employee.photoName}`} />
                    <div className="profile-info">
                        <h2>{employee.employee.name}</h2>
                        <p>{employee.employee.employeeId}</p>
                        <p>입사일: {formatDate(employee.employee.hireDate)}</p>
                        <p>휴대전화: {employee.employee.phone}</p>
                        <p>이메일: {employee.employee.email}</p>
                    </div>
                </div>
                <div className="details-section">
                    <div className="detail-card">
                        <h3>인사기본</h3>
                        <p>부서: {employee.employee.department ? employee.employee.department.name : ''}</p>
                        <p>직위: {employee.employee.job ? employee.employee.job.title : '직위 정보 없음'}</p>
                        <p>재직상태: {employee.employee.employmentStatus}</p>
                    </div>
                    <div className="detail-card">
                        <h3>인적사항</h3>
                        <p>사번: {employee.employee.employeeId}</p>
                        <p>생년월일: {formatDate(employee.employee.birthDate)}</p>
                        <p>성별: {employee.employee.gender}</p>
                        <p>국적: {employee.employee.nationality}</p>
                        <p>주소: {employee.employee.address}</p>
                        <p>주민등록번호: {employee.employee.ssn}</p>
                    </div>
                    <div className="detail-card">
                        <h3>가족</h3>
                        {employee.familyMember && employee.familyMember.length > 0 ? (
                            employee.familyMember.map((member, index) => (
                                <div key={index}>
                                    <p>이름: {member.name}</p>
                                    <p>관계: {member.relationship}</p>
                                    <p>생일: {formatDate(member.birthDate)}</p>
                                    <br/>
                                </div>
                            ))
                        ) : (
                            <p>가족 정보가 없습니다.</p>
                        )}
                    </div>
                    <div className="detail-card">
                        <h3>경력</h3>
                        {employee.careerHistory && employee.careerHistory.length > 0 ? (
                            employee.careerHistory.map((career, index) => (
                                <div key={index}>
                                    <p>회사: {career.companyName}</p>
                                    <p>직위: {career.lastPosition}</p>
                                    <p>시작일: {formatDate(career.hireDate)}</p>
                                    <p>종료일: {formatDate(career.endDate)}</p>
                                    <br/>
                                </div>
                            ))
                        ) : (
                            <p>경력 정보가 없습니다.</p>
                        )}
                    </div>
                    <div className="detail-card">
                        <h3>학력</h3>
                        {employee.educationHistory && employee.educationHistory.length > 0 ? (
                            employee.educationHistory.map((education, index) => (
                                <div key={index}>
                                    <p>학교: {education.schoolName}</p>
                                    <p>전공: {education.major}</p>
                                    <p>졸업일: {formatDate(education.graduationDate)}</p>
                                    <br/>
                                </div>
                            ))
                        ) : (
                            <p>학력 정보가 없습니다.</p>
                        )}
                    </div>
                    <div className="detail-card">
                        <h3>자격</h3>
                        {employee.licenses && employee.licenses.length > 0 ? (
                            employee.licenses.map((license, index) => (
                                <div key={index}>
                                    <p>발급기관: {license.issuingOrganization}</p>
                                    <p>발급일: {formatDate(license.issueDate)}</p>
                                    <p>이름: {license.name}</p>
                                    <br/>
                                </div>
                            ))
                        ) : (
                            <p>자격 정보가 없습니다.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeDetail;
