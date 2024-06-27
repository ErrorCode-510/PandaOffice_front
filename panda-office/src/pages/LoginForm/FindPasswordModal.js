import React from "react";
import Modal from "react-modal";

const FindPasswordModal = ({
    isOpen,
    onRequestClose,
    onChangeHandler,
    onClickFindPasswordHandler
}) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Find Password Modal"
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
                    placeholder="이름 입력"
                    required
                    onChange={onChangeHandler}
                    name="name"
                />

                <br />
                <input
                    type="text"
                    placeholder="아이디 입력"
                    required
                    onChange={onChangeHandler}
                    name="employeeId"
                />
                <br />
                <input
                    type="email"
                    placeholder="이메일 입력"
                    required
                    onChange={onChangeHandler}
                    name="email"
                />
            </form>
            <div>
                <button onClick={onRequestClose}>취소</button>
                <button
                    style={{ backgroundColor: "#1E1F31", color: "white" }}
                    onClick={onClickFindPasswordHandler}
                >
                    찾기
                </button>
            </div>
        </div>
    </Modal>
);

export default FindPasswordModal;

