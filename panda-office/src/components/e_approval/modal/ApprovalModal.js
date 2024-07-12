import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom"
import { callApproveDocument } from "../../../apis/e_approval/ApprovalDocumentAPICalls";


export function ApprovalModal({ documentId, line, setApprovalModal }) {
    const dispatch = useDispatch();
    const [selectType, setSelectType] = useState();
    const [comment, setComment] = useState('');

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            setApprovalModal(false)
        }
    }

    useEffect(() => {
        if (line && line.approvalAbleList.length > 0) {
            setSelectType(line.approvalAbleList[0].value);
        }
    }, [line]);

    const onChangeInput = (e) => {
        console.log(selectType)
        setComment(e.target.value)
    }
    const onClickDraft = () => {
        const request = {
            documentId: documentId,
            order: line.order,
            type: selectType,
            comment: comment
        }
        dispatch(callApproveDocument(request))
    }

    return line &&
        <div className="modal-bg" onClick={handleBackgroundClick}>
            <div className="modal-min-wrap">
                <div className='modal-title'>결재</div>
                <div className='flex'>
                    <div className='modal-component'>
                        <div className='approval-modal-table'>
                            <table>
                                <tr>
                                    <th>결재 종류</th>
                                    <td><select onChange={(e) => {setSelectType(e.target.value)}}>
                                        {line.approvalAbleList.map(able => {
                                            return <option key={able.value} name={able.value} value={able.value}>{able.name}</option>
                                        })}
                                    </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>코멘트</th>
                                    <td><input type="text" onChange={onChangeInput}></input></td>
                                </tr>
                            </table>
                        </div>
                        <div className='modal-btn-area'>
                            <button className='cancel-btn'>
                                취소
                            </button>
                            {selectType ? (
                                <NavLink to="draft">
                                    <button className='modyfi-btn' onClick={onClickDraft}>
                                        결재
                                    </button>
                                </NavLink>
                            ) : (
                                <button className='modyfi-btn' onClick={onClickDraft}>
                                    결재
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
}