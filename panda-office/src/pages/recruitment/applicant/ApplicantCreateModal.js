import Modal from "react-modal"

const ApplicantCreateModal = ({ isOpen, closeModal }) => {
    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
            >
                <h1>면접자 등로 모달</h1>
            </Modal>
        </>
    )
}

export default ApplicantCreateModal;