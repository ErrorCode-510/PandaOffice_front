import Modal from "react-modal";
import React from "react";

const ResetPasswordModal = ({
                                   isOpen,
                                   onRequestClose,
                                   onChangeHandler,
                                   onSubmitNewPasswordHandler
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
                    type="password"
                    placeholder="새 비밀번호 입력"
                    name="newPassword"
                    onChange={onChangeHandler}
                    required
                />

            </form>
            <div>
                <button onClick={onRequestClose}>취소</button>
                <button
                    style={{backgroundColor: "#1E1F31", color: "white"}}
                    onClick={onSubmitNewPasswordHandler}
                >
                    찾기
                </button>
            </div>
        </div>
    </Modal>
);

export default ResetPasswordModal;