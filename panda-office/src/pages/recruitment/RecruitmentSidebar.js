import { NavLink, useLocation } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setModalStatus } from "../../modules/ApplicantModules";

function RecruitmentSidebar() {

    const dispatch = useDispatch();

    const location = useLocation();
    const isRootPath = location.pathname === "/";

    const [isRecruitmentOpen, setIsRecruitmentOpen] = useState(false);
    const [isInterviewOpen, setIsInterviewOpen] = useState(false);
    const [isApplicantOpen, setIsApplicantOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    /* Main Handler ----------------------------------------------------------------------------------------------------------------------------------- */
    /* 로컬에 열림/닫힘 상태 값 boolean 형태로 저장하기 */
    const toggleRecruitmentHandler = () => {
        const newRecruitmentState = !isRecruitmentOpen;
        setIsRecruitmentOpen(newRecruitmentState);
        /* 로컬은 문자열만 저장이 가능하여 JSON 타입으로 파싱하여 저장 */
        localStorage.setItem("recruimentHandler", JSON.stringify(newRecruitmentState));
    };

    /* 렌더링 후 마운트 될 떄 로컬에 저장 된 상태 값을 가져와서 파싱 된 문자열을 set 
    * 애플리케이션 재실행해도 저장 값이 남아있음 */
    useEffect(() => {
        const savedMainStorage = localStorage.getItem("recruimentHandler")
        if (savedMainStorage !== null) {
            setIsRecruitmentOpen(JSON.parse(savedMainStorage));
        }
    }, []);

    /* Interview Handler ----------------------------------------------------------------------------------------------------------------------------------- */
    const toggleInterviewHandler = () => {
        const newInterviewState = !isInterviewOpen;
        setIsInterviewOpen(newInterviewState);
        localStorage.setItem("interviewHandler", JSON.stringify(newInterviewState));
    };

    useEffect(() => {
        const savedInterviewStorage = localStorage.getItem("interviewHandler")
        if (savedInterviewStorage !== null) {
            setIsInterviewOpen(JSON.parse(savedInterviewStorage));
        }
    }, []);

    /* Applicant Handler ----------------------------------------------------------------------------------------------------------------------------------- */
    const toggleApplicantHandler = () => {
        const newApplicantState = !isApplicantOpen;
        setIsApplicantOpen(newApplicantState);
        localStorage.setItem("applicantHandler", JSON.stringify(newApplicantState));
    };

    useEffect(() => {
        const savedApplicantStorage = localStorage.getItem("applicantHandler")
        if (savedApplicantStorage !== null) {
            setIsApplicantOpen(JSON.parse(savedApplicantStorage));
        }
    }, []);

    /* Modal Handler ----------------------------------------------------------------------------------------------------------------------------------- */
    /* 서브 사이드바의 위치에 따라 버튼 텍스트 동적 변경 */
    const getAddButtonText = () => {
        if (location.pathname.includes("/recruitment/applicant")) {
            return "면접자 등록"
        } else {
            return "면접일정 등록"
        }
    }

    /* 조건에 맞는 경로, 버튼 클릭 시 상호작용 */
    const handlerAddClick = () => {
        if (location.pathname.includes("/recruitment/applicant")) {
            handlerModarOpen();
        } else {
            console.log('경로 확인 불가능')
        }
    }

    /* 면접자 목록 경로 일 경우 면접자 등록 핸들러 */
    const handlerModarOpen = () => {
        dispatch(setModalStatus(true))
    }

    return (
        <>
            <div className={`side-wrap ${isRootPath ? 'collapsed' : ''}`}>
                <div className="side-bar">
                    <div className="title">채용/면접</div>
                    <button className="add-btn" onClick={handlerAddClick}>{getAddButtonText()}</button>
                    <ul className="mt-30 txt-align-left">
                        <li>
                            <div className="sidebar-item" onClick={toggleRecruitmentHandler}>
                                {isRecruitmentOpen ? <IoIosArrowDown className="sidebar-icons toggle-down" /> : <IoIosArrowForward className="sidebar-icons toggle-up" />}
                                <span className="icons-text fs-18 cursor-p">채용/면접 관리</span>
                            </div>
                            {isRecruitmentOpen && (
                                <ul className="mt-10">
                                    <li>
                                        <div className="sidebar-item" onClick={toggleInterviewHandler}>
                                            {isInterviewOpen ? <IoIosArrowDown className="sidebar-icons ml-20" /> : <IoIosArrowForward className="sidebar-icons ml-20" />}
                                            <span className="icons-text fs-14 cursor-p">면접일정 관리</span>
                                        </div>
                                        {isInterviewOpen && (
                                            <ul className="mt-10">
                                                <NavLink to="/recruitment">
                                                    <li className="icons-text fs-12 mt-10 ml-55 cursor-p">면접일정</li>
                                                </NavLink>
                                                <NavLink to="/recruitment/modify">
                                                    <li className="icons-text fs-12 mt-10 ml-55 cursor-p">면접일정 수정</li>
                                                </NavLink>
                                            </ul>
                                        )}
                                    </li>
                                    <li className="mt-10">
                                        <div className="sidebar-item" onClick={toggleApplicantHandler}>
                                            {isApplicantOpen ? <IoIosArrowDown className="sidebar-icons ml-20" /> : <IoIosArrowForward className="sidebar-icons ml-20" />}
                                            <span className="icons-text fs-14 cursor-p">면접자 관리</span>
                                        </div>
                                        {isApplicantOpen && (
                                            <ul className="mt-10">
                                                <NavLink to="/recruitment/applicant">
                                                    <li className="icons-text fs-12 mt-10 ml-55 cursor-p">면접자 목록</li>
                                                </NavLink>
                                            </ul>
                                        )}
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

export default RecruitmentSidebar;