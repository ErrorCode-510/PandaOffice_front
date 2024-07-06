import Modal from "react-modal";
import React from "react";

const VerificationCodeModal = ({
                               isOpen,
                               onRequestClose,
                               onChangeHandler,
                                   onClickVerifyCodeHandler
                           }) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="verifycode"
        className="Modal"
        overlayClassName="Overlay"
        ariaHideApp={false}
    >
        <h3 className="modalTitle">비밀번호 찾기</h3>
        <div className="modalContent"></div>
        <div className="modalActions">
            <form>
                <input
                    type="text"
                    placeholder="인증 코드 입력"
                    required
                    onChange={onChangeHandler}
                    name="verificationCode"
                />

            </form>
            <div>
                <button onClick={onRequestClose}>취소</button>
                <button
                    style={{backgroundColor: "#1E1F31", color: "white"}}
                    onClick={onClickVerifyCodeHandler}
                >
                    찾기
                </button>
            </div>
        </div>
    </Modal>
);

export default VerificationCodeModal;