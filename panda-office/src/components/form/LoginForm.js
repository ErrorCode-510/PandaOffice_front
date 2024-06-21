import {useState} from "react";
import {useDispatch} from "react-redux";
import {callLoginAPI,callFindIdAPI} from "../../apis/MemberAPICalls";
import React from "react";
import "./LoginForm.css"
import Modal from 'react-modal';
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { PiLineVerticalThin } from "react-icons/pi";
function LoginForm(){
    const dispatch = useDispatch();
    const [form, setForm] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    
    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }
    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }


    const onClickLoginHandler = (e) => {
        e.preventDefault(); // 기본 동작 방지

        dispatch(callLoginAPI({ loginRequest: form }));
    }

    const onClickFindIdHandler = (e) => {

        dispatch(callFindIdAPI({findIdRequest : form }))
        closeModal(); // 모달 닫기
    }
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
                            <input type="text" placeholder="아이디 입력" required onChange={onChangeHandler} name="memberId"/>
                        </div>
                        <div className="input-box">
                            <FaLock className="icon" />
                            <input type="password" placeholder="비밀번호 입력" required onChange={onChangeHandler} name="memberPassword"/>
                        </div>

                        <div className="remember-forgot">
                            <label><input type="checkbox" />아이디 저장</label>
                        </div>

                        <button type="submit" onClick={ onClickLoginHandler }>로그인</button>

                        <div className="remember-link">
                            <a href="#" onClick={openModal}>아이디 찾기</a>
                            <PiLineVerticalThin />
                            <a href="#">비밀번호 찾기</a>
                        </div>
                    </form>
                </div>
                <div className="agree-link">
                    <a href="#">개인정보처리방침</a>
                    <a href="#">이용약관</a>
                </div>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Find ID Modal"
                    className="Modal"
                    overlayClassName="Overlay"
                >
                    <h3 class="modalTitle">아이디 찾기</h3>
                    <div className="modalActions">

                        <form>
                            <input
                                type="text"
                                placeholder="이름 입력"
                                required
                                onChange={onChangeHandler}
                                name="name"

                            />
                            <br/>
                            <input
                                type="email"
                                placeholder="이메일 입력"
                                required
                                onChange={onChangeHandler}
                                name="email"

                            />
                            <br/>
                            <input
                                type="date"
                                placeholder="생년월일 입력"
                                required
                                onChange={onChangeHandler}
                                name="birthDate"

                            />
                        </form>
                        <div>
                            <button onClick={closeModal}>취소</button>
                            <button style={{backgroundColor: '#1E1F31', color: 'white'}} onClick={onClickFindIdHandler}>찾기</button>
                        </div>

                    </div>
                </Modal>
            </div>

        </>
    );
}

export default LoginForm;