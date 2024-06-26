import { useState } from "react";
import { useDispatch } from "react-redux";
import {callLoginAPI, callFindIdAPI, callSendAuthCodeAPI, callVerifyAuthCodeAPI} from "../../apis/MemberAPICalls";
import React from "react";
import "./LoginForm.css";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { PiLineVerticalThin } from "react-icons/pi";
import FindIdModal from "./FindIdModal";
import NewModal from "./NewModal";
import FindPasswordModal from "./FindPasswordModal";
import VerificationCodeModal from "./VerificationCodeModal";

function LoginForm() {
    const dispatch = useDispatch();
    const [form, setForm] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [foundId, setFoundId] = useState("");
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isVerificationCodeModalOpen, setIsVerificationCodeModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openNewModal = () => {
        setIsNewModalOpen(true);
    };

    const closeNewModal = () => {
        setIsNewModalOpen(false);
    };
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


    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onClickLoginHandler = (e) => {
        e.preventDefault(); // 기본 동작 방지
        dispatch(callLoginAPI({ loginRequest: form }));
    };

    const onClickFindIdHandler = async (e) => {
        const result = await dispatch(callFindIdAPI({ findIdRequest: form }));
        console.log(result);
        console.log(result?.status);

        if (result?.status === 200) {
            const data = await result?.data; // API 응답 데이터를 추출
            console.log("data " + data);
            setFoundId("고객님의 아이디는 " + data + " 입니다.");
        } else {
            setFoundId("아이디를 찾지 못했습니다.");
        }
        // 기존 모달 닫기
        setIsModalOpen(false);

        // 새로운 모달 열기
        openNewModal();
    };
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
                // Here you could redirect to a password reset page or open another modal to reset the password
            } else {
                alert('인증 코드가 잘못되었습니다.');
            }
        } catch (error) {
            console.error('인증 코드 확인 API 호출 오류:', error);
            alert('인증 코드 확인 과정에서 오류가 발생했습니다.');
        }
    };



    return (
        <>
            <div className="Login-wrapper">
                <div className="main-logo">
                    <img
                        src={`${process.env.PUBLIC_URL}/image/logo/logo_white.png`}
                        alt="Logo"
                    />
                </div>
                <div className="wrapper">
                    <form action="">
                        <h1>로그인</h1>
                        <div className="input-box">
                            <FaUserAlt className="icon" />
                            <input
                                type="text"
                                placeholder="아이디 입력"
                                required
                                onChange={onChangeHandler}
                                name="memberId"
                            />
                        </div>
                        <div className="input-box">
                            <FaLock className="icon" />
                            <input
                                type="password"
                                placeholder="비밀번호 입력"
                                required
                                onChange={onChangeHandler}
                                name="memberPassword"
                            />
                        </div>

                        <div className="remember-forgot">
                            <label>
                                <input type="checkbox" />
                                아이디 저장
                            </label>
                        </div>

                        <button type="submit" onClick={onClickLoginHandler}>
                            로그인
                        </button>

                        <div className="remember-link">
                            <a href="#" onClick={openModal}>
                                아이디 찾기
                            </a>
                            <PiLineVerticalThin />
                            <a href="#" onClick={openPasswordModal}>비밀번호 찾기</a>
                        </div>
                    </form>
                </div>
                <div className="agree-link">
                    <a href="#">개인정보처리방침</a>
                    <a href="#">이용약관</a>
                </div>
                <FindIdModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    onChangeHandler={onChangeHandler}
                    onClickFindIdHandler={onClickFindIdHandler}
                />
                <NewModal
                    isOpen={isNewModalOpen}
                    onRequestClose={closeNewModal}
                    foundId={foundId}
                />
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
            </div>
        </>
    );
}

export default LoginForm;
