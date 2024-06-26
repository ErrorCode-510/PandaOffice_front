import React from "react";
import Modal from "react-modal";

const NewModal = ({ isOpen, onRequestClose, foundId }) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="New Modal"
        className="Modal show-modal"
        overlayClassName="Overlay"
        ariaHideApp={false}
    >
        <h3 className="modalTitle">아이디 찾기</h3>
        <div className="modalContent">
            <p>{foundId}</p>
        </div>
        <div className="modalActions">
            <button
                onClick={onRequestClose}
                style={{ backgroundColor: "#1E1F31", color: "white" }}
            >
                닫기
            </button>
        </div>
    </Modal>
);

export default NewModal;
