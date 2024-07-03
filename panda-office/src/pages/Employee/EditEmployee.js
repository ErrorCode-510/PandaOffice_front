import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import { formatDate } from '../../utils/DateUtils';
import EmployeeSidebar from "./EmployeeSidebar"; // 날짜 유틸리티 임포트

function EmployeeEdit() {

    const job = [
        { id: 600, name: '사원' },
        { id: 500, name: '주임' },
        { id: 400, name: '대리' },
        { id: 300, name: '과장' },
        { id: 200, name: '차장' },
        { id: 100, name: '부장' },
        { id: 1, name: '사장' }
    ];

    const department = [
        { id: 11, name: '인사' },
        { id: 12, name: '회계' },
        { id: 13, name: '영업' },
        { id: 14, name: '기획' },
        { id: 15, name: '마케팅' }
    ];
    const { id } = useParams();
    const navigate = useNavigate();
    const [rows, setRows] = useState([{ relationship: '', name: '', birthDate: '', job: '', education: '', note: '' }]);
    const [employmentRows, setEmploymentRows] = useState([{ hireDate: '', endDate: '', companyName: '', department: '', lastPosition: '', jobDescription: '' }]);
    const [educationRows, setEducationRows] = useState([{ admissionDate: '', graduationDate: '', schoolName: '', major: '', degree: '' }]);
    const [licensesRows, setLicenses] = useState([{ issuingOrganization: '', issueDate: '', name: '' }]);
    const [photo, setPhoto] = useState(null);
    // 직원 데이터를 저장할 상태 선언
    const [employee, setEmployee] = useState({
        employee: {
            name: '',
            employeeId: '',
            hireDate: '',
            phone: '',
            email: '',
            department: '',
            job: '',
            employmentStatus: '',
            birthDate: '',
            gender: '',
            nationality: '',
            address: '',
            ssn: ''
        },
        familyMember: [],
        careerHistory: [],
        educationHistory: [],
        licenses: []
    });

    useEffect(() => {
        // 직원 데이터를 가져오는 비동기 함수
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/api/v1/members/employees/${id}`);
                setEmployee(response.data); // 가져온 직원 데이터를 설정

            } catch (error) {
                console.error('Failed to fetch employee details:', error);
            }
        };

        fetchEmployee(); // fetchEmployee 함수 호출
    }, [id]);

    // 입력 필드 변경을 처리하는 핸들러
    const handleChange = (e, category) => {
        const { name, value, dataset } = e.target;
        if (category === 'familyMembers') {
            const index = dataset.index;
            setEmployee(prevEmployee => ({
                ...prevEmployee,
                familyMember: prevEmployee.familyMember.map((member, idx) => idx === index ? { ...member, [name]: value } : member)
            }));
        } else if (category === 'careerHistory') {
            const index = dataset.index;
            setEmployee(prevEmployee => ({
                ...prevEmployee,
                careerHistory: prevEmployee.careerHistory.map((career, idx) => idx === index ? { ...career, [name]: value } : career)
            }));
        } else {
            setEmployee(prevEmployee => ({
                ...prevEmployee,
                employee: {
                    ...prevEmployee.employee,
                    [name]: value
                }
            }));
        }
    };

    // 폼 제출을 처리하는 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8001/api/v1/members/employees/${id}`, employee); // PUT 요청으로 데이터 업데이트
            navigate(`/employees/${id}`); // 업데이트 후 직원 세부 정보 페이지로 이동
        } catch (error) {
            console.error('Failed to update employee details:', error);
        }
    };
    const handleAddRow = () => {
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            familyMember: [
                ...prevEmployee.familyMember,
                {
                    name: '',
                    relationship: '',
                    dateOfBirth: ''
                }
            ]
        }));
    };

    const handleAddEmploymentRow = () => {
        setEmploymentRows([...employmentRows, { hireDate: '', endDate: '', companyName: '', department: '', lastPosition: '', jobDescription: '' }]);
    };

    const handleAddEducationRow = () => {
        setEducationRows([...educationRows, { admissionDate: '', graduationDate: '', schoolName: '', major: '', degree: '' }]);
    };

    const handleAddCertificationRow = () => {
        setLicenses([...licensesRows, { issuingOrganization: '', issueDate: '', name: '' }]);
    };

    const handlePhotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto({ name: file.name, path: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePhotoClick = () => {
        document.getElementById('photo').click();
    };
    // 가족 구성원 추가 버튼 핸들러
    const handleAddFamilyMember = () => {
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            familyMember: [
                ...prevEmployee.familyMember,
                {
                    name: '',
                    relationship: '',
                    dateOfBirth: ''
                }
            ]
        }));
    };

    // 학력 추가 버튼 핸들러
    const handleAddEducation = () => {
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            educationHistory: [
                ...prevEmployee.educationHistory,
                {
                    institution: '',
                    degree: '',
                    startDate: '',
                    endDate: ''
                }
            ]
        }));
    };

    // 경력 추가 버튼 핸들러
    const handleAddCareer = () => {
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            careerHistory: [
                ...prevEmployee.careerHistory,
                {
                    company: '',
                    position: '',
                    startDate: '',
                    endDate: ''
                }
            ]
        }));
    };

    return (
        <>
            <div className="newEmployee-container">
                <div className="side-comp">
                    <EmployeeSidebar />
                </div>
                <div className="common-comp">
                    <div className="table-container">
                        <h1>사원 등록</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="flex-container">
                                <table>
                                    <tbody>
                                    <tr>
                                        <th rowSpan="2">사진</th>
                                        <td rowSpan="2">
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <input
                                                    type="file"
                                                    id="photo"
                                                    name="photo"
                                                    onChange={handlePhotoChange}
                                                    style={{display: 'none'}}
                                                />
                                                <button type="button" onClick={handlePhotoClick}
                                                        className="photo-button">
                                                    +
                                                </button>
                                                {photo && (
                                                    <img
                                                        src={photo.path}
                                                        alt="preview"
                                                        style={{
                                                            width: '50px',
                                                            height: '50px',
                                                            marginLeft: '10px',
                                                            objectFit: 'cover'
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </td>
                                        <th>성명</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="name"
                                                value={employee.employee.name}
                                                onChange={(e) => handleChange(e, 'employee')}
                                            />
                                        </td>

                                        <th>계좌번호</th>
                                        <td>
                                            <input type="text" id="account_number" name="accountNumber"
                                                   value={employee.accountNumber} onChange={handleChange}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>전화번호</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={employee.employee.phone}
                                                onChange={(e) => handleChange(e, 'employee')}
                                            />
                                        </td>
                                        <th>주민등록번호</th>
                                        <td>
                                            <input type="text" id="ssn" name="ssn" value={employee.ssn}
                                                   onChange={handleChange}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>성별</th>
                                        <td>
                                            <label htmlFor="male">남성</label>
                                            <input
                                                type="radio"
                                                id="male"
                                                name="gender"
                                                value="male"
                                                checked={employee.employee.gender === '남'}
                                                onChange={handleChange}
                                            />

                                            <label htmlFor="female">여성</label>
                                            <input
                                                type="radio"
                                                id="female"
                                                name="gender"
                                                value="female"
                                                checked={employee.employee.gender === '여'}
                                                onChange={handleChange}
                                            />
                                        </td>
                                        <th>입사일</th>
                                        <td>
                                            <input
                                                type="date"
                                                name="hireDate"
                                                value={employee.employee.hireDate}
                                                onChange={(e) => handleChange(e, 'employee')}
                                            />
                                        </td>
                                        <th>주소</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="address"
                                                value={employee.employee.address}
                                                onChange={(e) => handleChange(e, 'employee')}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>국적</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="nationality"
                                                value={employee.employee.nationality}
                                                onChange={(e) => handleChange(e, 'employee')}
                                            />
                                        </td>
                                        <th>생년월일</th>
                                        <td>
                                            <input
                                                type="date"
                                                name="birthDate"
                                                value={employee.employee.birthDate}
                                                onChange={(e) => handleChange(e, 'employee')}
                                            />
                                        </td>
                                        <th>이메일</th>
                                        <td>
                                            <input
                                                type="email"
                                                name="email"
                                                value={employee.employee.email}
                                                onChange={(e) => handleChange(e, 'employee')}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>영어이름</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="englishName"
                                                value={employee.employee.englishName}
                                                onChange={(e) => handleChange(e, 'employee')}
                                            /></td>
                                        <th>한자이름</th>
                                            <input
                                                type="text"
                                                name="hanjaName"
                                                value={employee.employee.hanjaName}
                                                onChange={(e) => handleChange(e, 'employee')}
                                            />
                                            <th>직위</th>
                                            <td>
                                                <select
                                                    id="job"
                                                    name="job"
                                                    value={employee.employee.job.id}  // 저장된 값이 선택됩니다.
                                                    onChange={(e) => handleChange(e, 'employee')}
                                                >
                                                    <option value="">직위를 선택하세요</option>
                                                    {job.map(job => (
                                                        <option key={job.id} value={job.id}>{job.name}</option>
                                                    ))}
                                                </select>
                                            </td>


                                    </tr>
                                    <tr>
                                        <th>부서</th>
                                        <td>
                                            <select
                                                id="department"
                                                name="department"
                                                value={employee.employee.department.id}  // 저장된 값이 선택됩니다.
                                                onChange={(e) => handleChange(e, 'employee')}
                                            >
                                                <option value="">부서를 선택하세요</option>
                                                {department.map(department => (
                                                    <option key={department.id} value={department.id}>{department.name}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <th>재직상태</th>
                                        <td>
                                            <label htmlFor="working">재직중</label>
                                            <input type="radio" id="working" name="employmentStatus" value="재직"
                                                   checked={employee.employee.employmentStatus === '재직'}
                                                   onChange={handleChange}/>
                                            <label htmlFor="resigned">퇴사함</label>
                                            <input type="radio" id="resigned" name="employmentStatus" value="퇴사"
                                                   checked={employee.employee.employmentStatus === '퇴사'}
                                                   onChange={handleChange}/>
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
                                    {employee.familyMember.map((member, index) => (
                                        <tr key={index}>
                                            <td><input type="text" value={member.relationship} data-index={index} name="relationship" onChange={(e) => handleChange(e, 'familyMembers')} /></td>
                                            <td><input type="text" value={member.name} data-index={index} name="name" onChange={(e) => handleChange(e, 'familyMembers')} /></td>
                                            <td><input type="date" value={member.dateOfBirth} data-index={index} name="dateOfBirth" onChange={(e) => handleChange(e, 'familyMembers')} /></td>
                                            <td><input type="text" value={member.job} data-index={index} name="job" onChange={(e) => handleChange(e, 'familyMembers')} /></td>
                                            <td><input type="text" value={member.education} data-index={index} name="education" onChange={(e) => handleChange(e, 'familyMembers')} /></td>
                                            <td><input type="text" value={member.note} data-index={index} name="note" onChange={(e) => handleChange(e, 'familyMembers')} /></td>
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
                                        <th>입사년월</th>
                                        <th>퇴사년월</th>
                                        <th>회사명</th>
                                        <th>근무부서</th>
                                        <th>최종직위</th>
                                        <th>업무내용</th>
                                    </tr>
                                    {employee.careerHistory.map((career, index) => (
                                        <tr key={index}>
                                            <td><input type="date" value={career.startDate} data-index={index}
                                                       name="startDate"
                                                       onChange={(e) => handleChange(e, 'careerHistory')}/></td>

                                            <td><input type="date" value={career.endDate} data-index={index}
                                                       name="endDate"
                                                       onChange={(e) => handleChange(e, 'careerHistory')}/></td>
                                            <td><input type="text" value={career.company} data-index={index}
                                                       name="company"
                                                       onChange={(e) => handleChange(e, 'careerHistory')}/></td>
                                            <td><input type="text" value={career.position} data-index={index}
                                                       name="position"
                                                       onChange={(e) => handleChange(e, 'careerHistory')}/></td>


                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="6" style={{textAlign: 'center'}}>
                                            <button type="button" onClick={handleChange}
                                                    className="plus-button">+
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th colSpan="6">학력사항</th>
                                    </tr>
                                    <tr>
                                        <th>입학일자</th>
                                        <th>졸업일자</th>
                                        <th>학교명</th>
                                        <th>전공</th>
                                        <th>학위</th>
                                        <th></th>
                                    </tr>
                                    {educationRows.map((row, index) => (
                                        <tr key={index}>
                                            <td><input type="date" value={row.admissionDate} onChange={(e) => {
                                                const newRows = [...educationRows];
                                                newRows[index].admissionDate = e.target.value;
                                                setEducationRows(newRows);
                                            }}/></td>
                                            <td><input type="date" value={row.graduationDate} onChange={(e) => {
                                                const newRows = [...educationRows];
                                                newRows[index].graduationDate = e.target.value;
                                                setEducationRows(newRows);
                                            }}/></td>
                                            <td><input type="text" value={row.schoolName} onChange={(e) => {
                                                const newRows = [...educationRows];
                                                newRows[index].schoolName = e.target.value;
                                                setEducationRows(newRows);
                                            }}/></td>
                                            <td><input type="text" value={row.major} onChange={(e) => {
                                                const newRows = [...educationRows];
                                                newRows[index].major = e.target.value;
                                                setEducationRows(newRows);
                                            }}/></td>
                                            <td><input type="text" value={row.degree} onChange={(e) => {
                                                const newRows = [...educationRows];
                                                newRows[index].degree = e.target.value;
                                                setEducationRows(newRows);
                                            }}/></td>
                                            <td></td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="6" style={{textAlign: 'center'}}>
                                            <button type="button" onClick={handleAddEducationRow}
                                                    className="plus-button">+
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th colSpan="6">자격증</th>
                                    </tr>
                                    <tr>
                                        <th>발행기관</th>
                                        <th>취득일자</th>
                                        <th>자격증명</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    {licensesRows.map((row, index) => (
                                        <tr key={index}>
                                            <td><input type="text" value={row.issuingOrganization} onChange={(e) => {
                                                const newRows = [...licensesRows];
                                                newRows[index].issuingOrganization = e.target.value;
                                                setLicenses(newRows);
                                            }}/></td>
                                            <td><input type="date" value={row.issueDate} onChange={(e) => {
                                                const newRows = [...licensesRows];
                                                newRows[index].issueDate = e.target.value;
                                                setLicenses(newRows);
                                            }}/></td>
                                            <td><input type="text" value={row.name} onChange={(e) => {
                                                const newRows = [...licensesRows];
                                                newRows[index].name = e.target.value;
                                                setLicenses(newRows);
                                            }}/></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="6" style={{textAlign: 'center'}}>
                                            <button type="button" onClick={handleAddCertificationRow}
                                                    className="plus-button">+
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <button type="submit">저장</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EmployeeEdit;
