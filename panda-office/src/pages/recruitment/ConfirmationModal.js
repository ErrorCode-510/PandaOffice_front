const ConfirmationModal = ({message, onConfirm, onCancel}) => {
    return (
        <>
            <div className="confirmation-modal">
                <p className="cm-message">{message}</p>
                <div className="cm-confirm-btn">
                    <button className="cm-onCancel" onClick={onCancel}>취소</button>
                    <button className="cm-onConfirm" onClick={onConfirm}>확인</button>
                </div>
            </div>
        </>
    )
}

export default ConfirmationModal;