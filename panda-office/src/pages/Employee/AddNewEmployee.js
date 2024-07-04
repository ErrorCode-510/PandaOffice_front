import React, { useState } from 'react';
import EmployeeSidebar from "./EmployeeSidebar";
import "./Employee.css";
import axios from "axios";

function AddNewEmployee() {
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
    const [rows, setRows] = useState([{ relationship: '', name: '', birthDate: '', job: '', education: '', note: '' }]);
    const [employmentRows, setEmploymentRows] = useState([{ hireDate: '', endDate: '', companyName: '', department: '', lastPosition: '', jobDescription: '' }]);
    const [educationRows, setEducationRows] = useState([{ admissionDate: '', graduationDate: '', schoolName: '', major: '', degree: '' }]);
    const [licensesRows, setLicenses] = useState([{ issuingOrganization: '', issueDate: '', name: '' }]);
    const [photo, setPhoto] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        englishName : '',
        hanjaName : '',
        accountNumber: '',
        phone: '',
        personalId: '',
        gender: '',
        hireDate: '',
        address: '',
        nationality: '',
        birthDate: '',
        email: '',
        job:'',
        department:'',
        employmentStatus:'',


    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAddRow = () => {
        setRows([...rows, { relationship: '', name: '', birthDate: '', job: '', education: '', note: '' }]);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            employee: formData,
            familyMember: rows,
            careerHistory: employmentRows,
            educationHistory: educationRows,
            licenses: licensesRows,  // 수정
            photoName: photo ? photo.name : '',
            photoPath: photo ? photo.path : ''
        };
        console.log(data);
        try {
            const response = await axios.post('http://localhost:8001/api/v1/members/newEmployee', data);
            console.log('서버 응답:', response.data);

            alert('사원 정보가 성공적으로 저장되었습니다.');
            setRows([{ relationship: '', name: '', birthDate: '', job: '', education: '', note: '' }]);
            setEmploymentRows([{ hireDate: '', endDate: '', companyName: '', department: '', lastPosition: '', jobDescription: '' }]);
            setEducationRows([{ admissionDate: '', graduationDate: '', schoolName: '', major: '', degree: '' }]);
            setLicenses([{ issuingOrganization: '', issueDate: '', name: '' }]);
            setPhoto(null);
            setFormData({
                name: '',
                accountNumber: '',
                phone: '',
                personalId: '',
                gender: '',
                hireDate: '',
                address: '',
                nationality: '',
                birthDate: '',
                email: '',
                job:''
            });
        } catch (error) {
            console.error('서버 요청 실패:', error);
            alert('사원 정보 저장에 실패했습니다. 다시 시도해 주세요.');
        }
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
                                            <input type="text" id="name" name="name" value={formData.name}
                                                   onChange={handleChange}/>
                                        </td>

                                        <th>계좌번호</th>
                                        <td>
                                            <input type="text" id="account_number" name="accountNumber"
                                                   value={formData.accountNumber} onChange={handleChange}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>전화번호</th>
                                        <td>
                                            <input type="text" id="phone" name="phone" value={formData.phone}
                                                   onChange={handleChange}/>
                                        </td>
                                        <th>주민등록번호</th>
                                        <td>
                                            <input type="text" id="personalId" name="personalId" value={formData.personalId}
                                                   onChange={handleChange}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>성별</th>
                                        <td>
                                            <label htmlFor="male">남성</label>
                                            <input type="radio" id="male" name="gender" value="male"
                                                   checked={formData.gender === 'male'} onChange={handleChange}/>
                                            <label htmlFor="female">여성</label>
                                            <input type="radio" id="female" name="gender" value="female"
                                                   checked={formData.gender === 'female'} onChange={handleChange}/>
                                        </td>
                                        <th>입사일</th>
                                        <td>
                                            <input type="date" id="join_date" name="hireDate" value={formData.hireDate}
                                                   onChange={handleChange}/>
                                        </td>
                                        <th>주소</th>
                                        <td>
                                            <input type="text" id="address" name="address" value={formData.address}
                                                   onChange={handleChange}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>국적</th>
                                        <td>
                                            <input type="text" id="nationality" name="nationality"
                                                   value={formData.nationality} onChange={handleChange}/>
                                        </td>
                                        <th>생년월일</th>
                                        <td>
                                            <input type="date" id="birthDate" name="birthDate"
                                                   value={formData.birthDate} onChange={handleChange}/>
                                        </td>
                                        <th>이메일</th>
                                        <td>
                                            <input type="text" id="email" name="email" value={formData.email}
                                                   onChange={handleChange}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>영어이름</th>
                                        <td>
                                            <input type="text" id="englishName" name="englishName"
                                                   value={formData.englishName} onChange={handleChange}/>
                                        </td>
                                        <th>한자이름</th>
                                        <td>
                                            <input type="text" id="hanjaName" name="hanjaName"
                                                   value={formData.hanjaName}
                                                   onChange={handleChange}/>
                                        </td>
                                        <th>직위</th>
                                        <td>
                                            <select id="job" name="job" value={formData.job} onChange={handleChange}>
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
                                            <select id="department" name="department" value={formData.department}
                                                    onChange={handleChange}>
                                                <option value="">부서를 선택하세요</option>
                                                {department.map(department => (
                                                    <option key={department.id}
                                                            value={department.id}>{department.name}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <th>재직상태</th>
                                        <td>
                                            <label htmlFor="working">재직중</label>
                                            <input type="radio" id="working" name="employmentStatus" value="재직"
                                                   checked={formData.employmentStatus === '재직'}
                                                   onChange={handleChange}/>
                                            <label htmlFor="resigned">퇴사함</label>
                                            <input type="radio" id="resigned" name="employmentStatus" value="퇴사"
                                                   checked={formData.employmentStatus === '퇴사'}
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
                                    {rows.map((row, index) => (
                                        <tr key={index}>
                                        <td><input type="text" value={row.relationship} onChange={(e) => {
                                                const newRows = [...rows];
                                                newRows[index].relationship = e.target.value;
                                                setRows(newRows);
                                            }}/></td>
                                            <td><input type="text" value={row.name} onChange={(e) => {
                                                const newRows = [...rows];
                                                newRows[index].name = e.target.value;
                                                setRows(newRows);
                                            }}/></td>
                                            <td><input type="date" value={row.birthDate} onChange={(e) => {
                                                const newRows = [...rows];
                                                newRows[index].birthDate = e.target.value;
                                                setRows(newRows);
                                            }}/></td>
                                            <td><input type="text" value={row.job} onChange={(e) => {
                                                const newRows = [...rows];
                                                newRows[index].job = e.target.value;
                                                setRows(newRows);
                                            }}/></td>
                                            <td><input type="text" value={row.education} onChange={(e) => {
                                                const newRows = [...rows];
                                                newRows[index].education = e.target.value;
                                                setRows(newRows);
                                            }}/></td>
                                            <td><input type="text" value={row.note} onChange={(e) => {
                                                const newRows = [...rows];
                                                newRows[index].note = e.target.value;
                                                setRows(newRows);
                                            }}/></td>
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
                                    {employmentRows.map((row, index) => (
                                        <tr key={index}>
                                            <td><input type="date" value={row.hireDate} onChange={(e) => {
                                                const newRows = [...employmentRows];
                                                newRows[index].hireDate = e.target.value;
                                                setEmploymentRows(newRows);
                                            }}/></td>
                                            <td><input type="date" value={row.endDate} onChange={(e) => {
                                                const newRows = [...employmentRows];
                                                newRows[index].endDate = e.target.value;
                                                setEmploymentRows(newRows);
                                            }}/></td>
                                            <td><input type="text" value={row.companyName} onChange={(e) => {
                                                const newRows = [...employmentRows];
                                                newRows[index].companyName = e.target.value;
                                                setEmploymentRows(newRows);
                                            }}/></td>
                                            <td><input type="text" value={row.department} onChange={(e) => {
                                                const newRows = [...employmentRows];
                                                newRows[index].department = e.target.value;
                                                setEmploymentRows(newRows);
                                            }}/></td>
                                            <td><input type="text" value={row.lastPosition} onChange={(e) => {
                                                const newRows = [...employmentRows];
                                                newRows[index].lastPosition = e.target.value;
                                                setEmploymentRows(newRows);
                                            }}/></td>
                                            <td><input type="text" value={row.jobDescription} onChange={(e) => {
                                                const newRows = [...employmentRows];
                                                newRows[index].jobDescription = e.target.value;
                                                setEmploymentRows(newRows);
                                            }}/></td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="6" style={{textAlign: 'center'}}>
                                            <button type="button" onClick={handleAddEmploymentRow}
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

export default AddNewEmployee;
