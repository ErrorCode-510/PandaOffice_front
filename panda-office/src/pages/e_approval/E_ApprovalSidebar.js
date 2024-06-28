import { NavLink, useLocation } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowDropright, IoIosArrowForward, IoIosArrowRoundForward, IoIosArrowUp } from "react-icons/io";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSidebarStatus } from "../../modules/E_ApprovalModules";
import { callDepartmentBox } from "../../apis/E_ApprovalAPICalls";

function E_ApprovalSidebar() {

    const dispatch = useDispatch();

    const { sidebarStatus, departmentBox } = useSelector(state => state.e_approvalReducer)

    /* 부서함 정보 호출 */
    useEffect(() => {
        dispatch(callDepartmentBox())
    }, [])

    /* 사이드바 열림/접힘 상태 관리 */
    const toggleHandler = (e) => {
        dispatch(fetchSidebarStatus({
            ...sidebarStatus,
            [e.target.id]: !sidebarStatus[e.target.id]
        }))
    };





    return (
        <>
            <div className={`side-wrap no-select`}>
                <div className="side-bar">
                    <div className="title">전자 결재</div>
                    <button className="add-btn">결재 기안</button>
                    <ul className="mt-30 txt-align-left">
                        <li>
                            <div className="sidebar-item" onClick={toggleHandler}>
                                {sidebarStatus.A ? <IoIosArrowDown className="sidebar-icons toggle-down" /> : <IoIosArrowForward className="sidebar-icons toggle-up" />}
                                <span className="icons-text fs-18 cursor-p" id="A">문서함</span>
                            </div>
                            {sidebarStatus.A && (
                                <ul className="mt-10">
                                    <li>
                                        <div className="sidebar-item" onClick={toggleHandler}>
                                            {sidebarStatus.Aa ? <IoIosArrowDown className="sidebar-icons ml-20" /> : <IoIosArrowForward className="sidebar-icons ml-20" />}
                                            <span className="icons-text fs-14 cursor-p" id="Aa">내 문서함</span>
                                        </div>
                                        {sidebarStatus.Aa && (
                                            <ul className="mt-10">
                                                <li className="icons-text fs-12 mt-10 ml-55 cursor-p">면접 일정</li>
                                                <li className="icons-text fs-12 mt-10 ml-55 cursor-p">면접 일정 등록</li>
                                                <li className="icons-text fs-12 mt-10 ml-55 cursor-p">면접 일정 수정/삭제</li>
                                            </ul>
                                        )}
                                    </li>
                                </ul>
                            )}
                            {sidebarStatus.A && (
                                <ul className="mt-10">
                                    <li>
                                        <div className="sidebar-item" onClick={toggleHandler}>
                                            {sidebarStatus.Ab ? <IoIosArrowDown className="sidebar-icons ml-20" /> : <IoIosArrowForward className="sidebar-icons ml-20" />}
                                            <span className="icons-text fs-14 cursor-p" id="Ab">부서함</span>
                                        </div>
                                        {sidebarStatus.Ab &&
                                            <ul className="mt-10">
                                                {
                                                    departmentBox.data.map(box => (
                                                        <li key={box.departmentBoxId} className="icons-text fs-12 mt-10 ml-55 cursor-p">
                                                            {box.name}
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        }
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default E_ApprovalSidebar;