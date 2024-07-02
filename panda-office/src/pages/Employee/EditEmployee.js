import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Employee.css'; // Import the CSS file
import { formatDate } from "../../utils/DateUtils";

function EditEmployee() {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        accountNumber: '',
        phone: '',
        ssn: '',
        gender: '',
        hireDate: '',
        address: '',
        nationality: '',
        birthDate: '',
        email: ''
    });
    const [rows, setRows] = useState([{ relationship: '', name: '', birthDate: '', job: '', education: '', note: '' }]);
    const [employmentRows, setEmploymentRows] = useState([{ hireDate: '', endDate: '', companyName: '', department: '', lastPosition: '', jobDescription: '' }]);
    const [educationRows, setEducationRows] = useState([{ admissionDate: '', graduationDate: '', schoolName: '', major: '', degree: '' }]);
    const [licensesRows, setLicensesRows] = useState([{ issuingOrganization: '', issueDate: '', name: '' }]);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/api/v1/members/employees/${id}`);
                const employeeData = response.data;
                setEmployee(employeeData);
                setFormData({
                    name: employeeData.employee.name,
                    accountNumber: employeeData.accountNumber,
                    phone: employeeData.employee.phone,
                    ssn: employeeData.employee.ssn,
                    gender: employeeData.employee.gender,
                    hireDate: formatDate(employeeData.employee.hireDate),
                    address: employeeData.employee.address,
                    nationality: employeeData.employee.nationality,
                    birthDate: formatDate(employeeData.employee.birthDate),
                    email: employeeData.employee.email
                });
                setRows(employeeData.familyMember || [{ relationship: '', name: '', birthDate: '', job: '', education: '', note: '' }]);
                setEmploymentRows(employeeData.careerHistory || [{ hireDate: '', endDate: '', companyName: '', department: '', lastPosition: '', jobDescription: '' }]);
                setEducationRows(employeeData.educationHistory || [{ admissionDate: '', graduationDate: '', schoolName: '', major: '', degree: '' }]);
                setLicensesRows(employeeData.licenses || [{ issuingOrganization: '', issueDate: '', name: '' }]);
                if (employeeData.photoPath) {
                    setPhoto({ name: employeeData.photoName, path: employeeData.photoPath });
                }
            } catch (error) {
                console.error('Failed to fetch employee details:', error);
            }
        };

        fetchEmployee();
    }, [id]);

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

    const handleAddLicenseRow = () => {
        setLicensesRows([...licensesRows, { issuingOrganization: '', issueDate: '', name: '' }]);
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
            licenses: licensesRows,
            photoName: photo ? photo.name : '',
            photoPath: photo ? photo.path : ''
        };

        try {
            const response = await axios.put(`http://localhost:8001/api/v1/members/employees/${id}`, data);
            console.log('서버 응답:', response.data);
            alert('사원 정보가 성공적으로 수정되었습니다.');
            // Reset state or redirect as needed
        } catch (error) {
            console.error('서버 요청 실패:', error);
            alert('사원 정보 수정에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    if (!employee) {
        return <div>Loading...</div>;
    }

    return (
        <div className="edit-employee-container">
            <h1>사원 정보 수정</h1>
            <form onSubmit={handleSubmit}>
                {/* Render your form inputs with pre-filled data */}
            </form>
        </div>
    );
}

export default EditEmployee;
