import React from "react";
import Modal from "react-modal";
import "./LoginForm.css";
const UseOfPersonalInfoModal = ({
                                    isOpen,
                                    onRequestClose,
                                    onChangeHandler,
                                    onClickUseOfPersonalInfoHandler
                                }) => {
    const modalStyles = {
        content: {
            textAlign: "left", // 내용을 왼쪽 정렬로 변경
            overflowY: "auto", // 내용이 모달의 높이를 초과할 경우 수직 스크롤바 추가
            maxWidth: "1000px", // 모달 내용의 최대 너비 설정 예시
            maxHeight: "1000px", // 모달 내용의 최대 높이 설정 예시
            margin: "auto", // 수평 가운데 정렬


        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background for overlay
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="UseOfPersonalInfoModal"
            style={modalStyles}
            ariaHideApp={false}
        >
            <h3 className="modalTitle">개인정보 처리 방침</h3>
            <div className="modalContent">
                <p><strong>1. 개요</strong></p>
                <br/>
                <p>이 개인정보 처리 방침("방침")은 [회사명]("회사", "당사", "우리")가 직원의 개인정보를 수집, 이용, 저장 및 공유하는 방법과 목적을 설명합니다. 본 방침은 관련 데이터
                    보호
                    법규를 준수하기 위해 설계되었습니다.</p>
                <br/>
                <p><strong>2. 수집하는 개인정보의 항목</strong></p>
                <br/>
                <p>회사는 다음과 같은 직원의 개인정보를 수집합니다:</p><br/>
                <ul>
                    <li>성명, 주민등록번호, 연락처(전화번호, 이메일 주소 등)</li>
                    <br/>
                    <li>입사일, 부서, 직책, 급여, 근무기록, 성과 평가</li>
                    <br/>
                    <li>학력, 자격증, 이전 직장 경력</li>
                    <br/>
                    <li>비상 연락처, 건강 정보(의료 기록, 건강 검진 결과 등)</li>
                    <br/>
                </ul>

                <p><strong>3. 개인정보의 수집 및 이용 목적</strong></p><br/>
                <p>회사는 다음과 같은 목적을 위해 직원의 개인정보를 수집하고 이용합니다:</p><br/>
                <ul>
                    <li>인사 기록, 급여 지급, 복리후생 제공</li>
                    <br/>
                    <li>근로 계약 체결 및 유지</li>
                    <br/>
                    <li>세금, 사회 보험 처리</li>
                    <br/>
                    <li>건강 관리, 교육 및 훈련 제공</li>
                    <br/>
                </ul>

                <p><strong>4. 개인정보의 보유 및 이용 기간</strong></p><br/>
                <p>회사는 직원의 개인정보를 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 다만, 관련 법령에 따라 일정 기간 동안 보관해야 하는 경우에는 그 기간 동안
                    보관합니다.</p><br/>

                <p><strong>5. 개인정보의 제3자 제공</strong></p><br/>
                <p>회사는 원칙적으로 직원의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다:</p><br/>
                <ul>
                    <li>직원이 사전에 동의한 경우</li>
                    <br/>
                    <li>법령의 규정에 의하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사 기관의 요구가 있는 경우</li>
                    <br/>
                </ul>

                <p><strong>6. 개인정보의 처리 위탁</strong></p><br/>
                <p>회사는 직원의 개인정보 처리를 외부에 위탁할 수 있습니다. 이 경우, 위탁 받은 자가 개인정보를 안전하게 처리하도록 필요한 사항을 규정하고 감독합니다.</p><br/>

                <p><strong>7. 정보주체의 권리와 의무</strong></p><br/>
                <p>직원은 자신의 개인정보에 대해 열람, 수정, 삭제, 처리 정지 등을 요구할 권리가 있습니다. 이러한 권리를 행사하고자 할 경우, 회사의 개인정보 보호책임자에게 문의하시기
                    바랍니다.</p><br/>

                <p><strong>8. 개인정보의 보호를 위한 조치</strong></p><br/>
                <p>회사는 직원의 개인정보를 보호하기 위해 다음과 같은 조치를 취하고 있습니다:</p><br/>
                <ul>
                    <li>개인정보 접근 통제, 암호화</li>
                    <br/>
                    <li>개인정보 보호 교육, 개인정보 처리 인원의 최소화</li>
                    <br/>
                </ul>

                <p><strong>9. 개인정보 보호책임자</strong></p><br/>
                <p>회사의 개인정보 보호책임자는 다음과 같습니다:</p><br/>

                    <p>이름: 장미영</p>
                    <br/>
                    <p>직책: 과장</p>
                    <br/>
                    <p>연락처: 010-3601-1001 / miyoung.jang@example.com</p>
                    <br/>


                <p><strong>10. 변경에 대한 고지</strong></p><br/>
                <p>본 방침은 법령, 정책 또는 회사 내부 방침에 따라 변경될 수 있습니다. 방침이 변경될 경우, 회사는 변경 사항을 직원에게 공지합니다.</p><br/>

            </div>


        </Modal>
    );
};

export default UseOfPersonalInfoModal;
