import { NavLink, useLocation } from "react-router-dom";
import { IoIosArrowDown, IoMdSettings, IoIosArrowForward, IoIosArrowRoundForward, IoIosArrowUp } from "react-icons/io";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSidebarStatus } from "../../modules/E_ApprovalModules";
import { callDepartmentBox } from "../../apis/E_ApprovalAPICalls";
import './E_Approval.css';

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
                                                <NavLink to="draft-box"> <li className="icons-text fs-12 mt-10 ml-55 cursor-p">내 기안 문서</li></NavLink>
                                                <NavLink to="pending-box"><li className="icons-text fs-12 mt-10 ml-55 cursor-p">결재 대기 문서</li></NavLink>
                                                <NavLink to="scheduled-box"><li className="icons-text fs-12 mt-10 ml-55 cursor-p">결재 예정 문서</li></NavLink>
                                                <NavLink to="archived-box"><li className="icons-text fs-12 mt-10 ml-55 cursor-p">후열 문서</li></NavLink>
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
                                            <IoMdSettings className="setting-icon icons-text cursor-p" />
                                        </div>
                                        {sidebarStatus.Ab &&
                                            <ul className="mt-10">
                                                {
                                                    departmentBox.data.map(box => (
                                                        <NavLink to={`department-box?boxId=${box.departmentBoxId}`}>
                                                            <li key={box.departmentBoxId} className="icons-text fs-12 mt-10 ml-55 cursor-p">
                                                                {box.name}
                                                            </li>
                                                        </NavLink>
                                                    ))
                                                }
                                            </ul>
                                        }
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                    <div className="approval-setting-sidebar icons-text cursor-p">
                        <NavLink to="document-template">
                            <IoMdSettings className="setting-icon" />전자결재 양식 관리
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default E_ApprovalSidebar;