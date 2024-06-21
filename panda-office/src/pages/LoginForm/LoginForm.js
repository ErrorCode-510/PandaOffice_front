import React from "react";
import "./LoginForm.css"
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { PiLineVerticalThin } from "react-icons/pi";

const LoginForm = () => {
    return (
        <>
        <div className="Login-wrapper">
                    <div className="main-logo">
                    <img src={`${process.env.PUBLIC_URL}/image/logo/logo_white.png`} alt="Logo" />
                    </div>
                    <div className="wrapper">
                        <form action="">
                            <h1>로그인</h1>
                            <div className="input-box">
                                <FaUserAlt className="icon"/>
                                <input type="text" placeholder="아이디 입력" required />
                            </div>
                            <div className="input-box">
                                <FaLock className="icon" />
                                <input type="password" placeholder="비밀번호 입력" required />
                            </div>

                            <div className="remember-forgot">
                                <label><input type="checkbox" />아이디 저장</label>
                            </div>

                            <button type="submit">로그인</button>

                            <div className="find-account">
                                <a href="#">아이디 찾기</a>
                                <PiLineVerticalThin />
                                <a href="#">비밀번호 찾기</a>
                            </div>
                        </form>
                    </div>
                    <div className="agree-link">
                        <a href="#">개인정보처리방침</a>
                        <a href="#">이용약관</a>
                    </div>
            </div>
        </>
    );
};

export default LoginForm;