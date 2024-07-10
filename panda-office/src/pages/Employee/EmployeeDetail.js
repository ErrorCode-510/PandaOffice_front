import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Employee.css'; // Import the CSS file
import { formatDate } from "../../utils/DateUtils";
import FindPasswordModal from "../LoginForm/FindPasswordModal";
import VerificationCodeModal from "../LoginForm/VerificationCodeModal";
import ResetPasswordModal from "../LoginForm/ResetPasswordModal";
import {callChangePasswordAPI, callSendAuthCodeAPI, callVerifyAuthCodeAPI} from "../../apis/MemberAPICalls";
import {useDispatch} from "react-redux";


function EmployeeDetail() {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isVerificationCodeModalOpen, setIsVerificationCodeModalOpen] = useState(false);
    const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
    const [form, setForm] = useState({});
    const dispatch = useDispatch();
    const openPasswordModal = () => {
        setIsPasswordModalOpen(true);
    };
    const closePasswordModal = () => {
        setIsPasswordModalOpen(false);
    };
    const openVerificationCodeModal = () => {
        setIsVerificationCodeModalOpen(true);
    };

    const closeVerificationCodeModal = () => {
        setIsVerificationCodeModalOpen(false);
    };

    const openResetPasswordModal = () => {
        setIsResetPasswordModalOpen(true);
    };

    const closeResetPasswordModal = () => {
        setIsResetPasswordModalOpen(false);
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
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
    const onClickFindPasswordHandler = async (e) => {
        e.preventDefault();


        console.log(form);
        const email = form.email;
        const employeeId=form.employeeId;
        const name=form.name;

        try {
            // API 호출
            const result = await dispatch(callSendAuthCodeAPI({ name,employeeId,email }));

            // API 호출 결과에 따른 처리
            if (result?.status === 200) {
                // 성공적으로 처리된 경우
                alert('인증 코드를 전송했습니다.');
                openVerificationCodeModal();
            } else {
                // 오류 처리
                alert('인증 코드 전송 실패');
            }
        } catch (error) {
            // 네트워크 오류 등의 예외 처리
            console.error('비밀번호 찾기 API 호출 오류:', error);
            alert('비밀번호 찾기 과정에서 오류가 발생했습니다.');
        }
    };

    const onClickVerifyCodeHandler = async (e) => {
        e.preventDefault();
        const { verificationCode, email } = form;

        try {
            const result = await dispatch(callVerifyAuthCodeAPI({ email, verificationCode }));
            if (result?.status === 200) {
                alert('인증이 완료되었습니다. 새로운 비밀번호를 입력하세요.');
                openResetPasswordModal()
            } else {
                alert('인증 코드가 잘못되었습니다.');
            }
        } catch (error) {
            console.error('인증 코드 확인 API 호출 오류:', error);
            alert('인증 코드 확인 과정에서 오류가 발생했습니다.');
        }
    };
    const onSubmitNewPasswordHandler = async (e) => {
        e.preventDefault();
        const { newPassword} = form;



        try {
            const result = await dispatch(callChangePasswordAPI({ email: form.email, newPassword }));
            if (result?.status === 200) {
                alert("비밀번호가 성공적으로 변경되었습니다.");
                closeResetPasswordModal();
            } else {
                alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error('비밀번호 변경 API 호출 오류:', error);
            alert('비밀번호 변경 과정에서 오류가 발생했습니다.');
        }
    };


    return (
        <div className="employee-detail">
            <div className="header">
                <h1>{employee.employee.name}의 상세 정보</h1>
            </div>
            <div className="main-content">
                <div className="profile-section">
                    <img className="profile-photo" src={employee.photoPath} alt={`${employee.photoName}`}/>
                    <div className="profile-info">
                        <h2>{employee.employee.name}</h2>
                        <p><span className="label">사번</span> <span
                            className="value">{employee.employee.employeeId}</span></p>
                        <p><span className="label">입사일</span> <span
                            className="value">{formatDate(employee.employee.hireDate)}</span></p>
                        <p><span className="label">휴대전화</span> <span className="value">{employee.employee.phone}</span>
                        </p>
                        <p><span className="label">이메일</span> <span className="value">{employee.employee.email}</span>
                        </p>
                    </div>
                </div>
                <div className="details-section">
                    <div className="detail-card">
                        <h3>인사기본</h3>
                        <p><span className="label">부서</span> <span
                            className="value">{employee.employee.department ? employee.employee.department.name : ''}</span>
                        </p>
                        <p><span className="label">직위</span> <span
                            className="value">{employee.employee.job ? employee.employee.job.title : '직위 정보 없음'}</span>
                        </p>
                        <p><span className="label">재직상태</span> <span
                            className="value">{employee.employee.employmentStatus}</span></p>
                    </div>
                    <div className="detail-card">
                        <h3>인적사항</h3>
                        <p><span className="label">사번</span> <span
                            className="value">{employee.employee.employeeId}</span></p>
                        <p><span className="label">생년월일</span> <span
                            className="value">{formatDate(employee.employee.birthDate)}</span></p>
                        <p><span className="label">성별</span> <span className="value">{employee.employee.gender}</span>
                        </p>
                        <p><span className="label">국적</span> <span
                            className="value">{employee.employee.nationality}</span></p>
                        <p><span className="label">주소</span> <span className="value">{employee.employee.address}</span>
                        </p>
                        <p><span className="label">주민등록번호</span> <span className="value">{employee.employee.ssn}</span>
                        </p>
                    </div>
                    <div className="detail-card">
                        <h3>가족</h3>
                        {employee.familyMember && employee.familyMember.length > 0 ? (
                            employee.familyMember.map((member, index) => (
                                <div key={index}>
                                    <p><span className="label">{member.relationship}</span> {member.name}</p>
                                    <p></p>

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
                                    <p><span className="label">회사</span> <span
                                        className="value">{career.companyName}</span></p>
                                    <p><span className="label">직위</span> <span
                                        className="value">{career.lastPosition}</span></p>
                                    <p><span className="label">시작일</span> <span
                                        className="value">{formatDate(career.hireDate)}</span></p>
                                    <p><span className="label">종료일</span> <span
                                        className="value">{formatDate(career.endDate)}</span></p>
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
                                    <p><span className="label">학교</span> <span
                                        className="value">{education.schoolName}</span></p>
                                    <p><span className="label">전공</span> <span
                                        className="value">{education.major}</span></p>
                                    <p><span className="label">졸업일</span> <span
                                        className="value">{formatDate(education.graduationDate)}</span></p>
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
                                    <p><span className="label">발급기관</span> <span
                                        className="value">{license.issuingOrganization}</span></p>
                                    <p><span className="label">발급일</span> <span
                                        className="value">{formatDate(license.issueDate)}</span></p>
                                    <p><span className="label">이름</span> <span className="value">{license.name}</span>
                                    </p>
                                    <br/>
                                </div>
                            ))
                        ) : (
                            <p>자격 정보가 없습니다.</p>
                        )}
                    </div>

                </div>

                <FindPasswordModal
                    isOpen={isPasswordModalOpen}
                    onRequestClose={closePasswordModal}
                    onChangeHandler={onChangeHandler}
                    onClickFindPasswordHandler={onClickFindPasswordHandler}/>
                <VerificationCodeModal
                    isOpen={isVerificationCodeModalOpen}
                    onRequestClose={closeVerificationCodeModal}
                    onChangeHandler={onChangeHandler}
                    onClickVerifyCodeHandler={onClickVerifyCodeHandler}
                />
                <ResetPasswordModal
                    isOpen={isResetPasswordModalOpen}
                    onRequestClose={closeResetPasswordModal}
                    onChangeHandler={onChangeHandler}
                    onSubmitNewPasswordHandler={onSubmitNewPasswordHandler}

                />

            </div>
            <a href="#" onClick={openPasswordModal}>비밀번호 찾기</a>
        </div>
    );
}

export default EmployeeDetail;
