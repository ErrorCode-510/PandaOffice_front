import { useDispatch, useSelector } from "react-redux";
import { getModal } from "../../../modules/AttendanceModules";
import { useEffect } from "react";

const Modal = ({ event }) => {
    const { modal } = useSelector(state => state.attendanceReducer);
    const dispatch = useDispatch();

    const handlerModal = () => {
        dispatch(getModal(false));
    }

    /* 모달 백그라운드 클릭 시 모달창 닫기 */
    const handlerCloseOnClick = () => {
        handlerModal();
    }

    /* Esc 키로 모달 닫기 핸들러 */
    const handlerButtonOff = (e) => {
        if (e.key === 'Escape') {
            handlerCloseOnClick();
        }
    }

    /* 윈도우 개체에 keydown 이벤트 리스너를 추가한다. */
    useEffect(() => {
        window.addEventListener('keydown', handlerButtonOff);

        return () => {
            window.removeEventListener('keydown', handlerButtonOff);
        }
    }, [])

    return (
        <>
            {
                modal &&
                <div className="modal-wrap" onClick={handlerCloseOnClick}>
                    <div className="table-container" onClick={e => e.stopPropagation()}>
                        <table>
                            <thead>
                                <tr>
                                    <th className="table-left ">이름</th>
                                    <th>직급</th>
                                    <th>시작일</th>
                                    <th className="table-right ">종료일</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{event.title.split(" ")[0]}</td>
                                    <td>{event.title.split(" ")[1]}</td>
                                    <td>{event.start}</td>
                                    <td>{event.end}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="button-container">
                            <button onClick={handlerModal}>확인</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Modal;
