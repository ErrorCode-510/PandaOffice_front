import React from 'react';
import Modal from 'react-modal';

const TermsOfUseModal = ({ isOpen, onRequestClose }) => {
    const modalStyles = {
        content: {
            textAlign: 'left',
            overflowY: 'auto',
            maxWidth: '1000px',
            maxHeight: '1000px',
            margin: 'auto'
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="TermsOfUseModal"
            style={modalStyles}
            ariaHideApp={false}
        >
            <h3 className="modalTitle">이용 약관</h3>
            <div className="modalContent">
                <p>[PandaOffice] HR ERP 시스템(pandaoffice.com, 이하 "판다오피스")의 이용 약관은 [PandaOffice]에서 제공하는 ERP 시스템에 대한 접근 및 사용을 규율합니다. ERP 시스템을 이용함으로써 귀하는 본 약관에 동의하게 됩니다. 약관에 동의하지 않으시는 경우 ERP 시스템을 사용하실 수 없습니다.</p>
                <br/>
                <p><strong>1. 정의</strong></p>
                <br/>
                <p>1.1 "회사"는 [PandaOffice]을 의미합니다.</p>
                <p>1.2 "사용자"는 ERP 시스템에 접근하여 사용하는 개인 또는 법인을 의미합니다.</p>
                <p>1.3 "서비스"는 회사가 제공하는 ERP 시스템과 그와 관련된 모든 기능과 도구를 의미합니다.</p>
                <br/>
                <p><strong>2. 계정 및 보안</strong></p>
                <br/>
                <p>2.1 사용자는 ERP 시스템을 이용하기 위해 계정을 생성해야 합니다. 계정을 생성할 때 제공하는 모든 정보는 정확하고 최신의 것이어야 합니다.</p>
                <p>2.2 사용자는 계정의 비밀번호와 기타 보안 정보를 기밀로 유지할 책임이 있습니다. 사용자의 계정에서 발생하는 모든 활동에 대한 책임은 사용자에게 있습니다.</p>
                <p>2.3 계정 무단 사용 또는 보안 위반이 발생한 경우 즉시 회사에 통보해야 합니다.</p>
                <br/>
                <p><strong>3. 사용자의 의무</strong></p>
                <br/>
                <p>3.1 사용자는 ERP 시스템을 합법적인 목적에 한해 사용해야 합니다.</p>
                <p>3.2 사용자는 다음과 같은 행위를 하지 않기로 동의합니다:</p>
                <ul>
                    <li>불법적이거나 사기적인 활동</li>
                    <li>다른 사용자의 계정 또는 데이터에 대한 무단 접근 시도</li>
                    <li>ERP 시스템의 정상적인 운영을 방해하는 행위</li>
                </ul>
                <br/>
                <p><strong>4. 지적 재산권</strong></p>
                <br/>
                <p>4.1 ERP 시스템 및 그 내용물에 대한 모든 권리는 회사에 있습니다.</p>
                <p>4.2 사용자는 회사의 명시적인 사전 서면 동의 없이 ERP 시스템의 내용물을 복사, 수정, 배포, 판매 또는 기타 상업적 목적으로 사용해서는 안 됩니다.</p>
                <br/>
                <p><strong>5. 책임의 제한</strong></p>
                <br/>
                <p>5.1 ERP 시스템은 "있는 그대로" 제공되며, 회사는 서비스의 정확성, 완전성, 신뢰성에 대해 보증하지 않습니다.</p>
                <p>5.2 회사는 서비스 사용으로 인해 발생하는 직간접적 손해에 대해 책임지지 않습니다.</p>
                <br/>
                <p><strong>6. 약관의 변경</strong></p>
                <br/>
                <p>6.1 회사는 필요에 따라 본 약관을 변경할 수 있습니다. 약관이 변경되는 경우, 변경된 약관은 ERP 시스템을 통해 사용자에게 공지됩니다.</p>
                <p>6.2 변경된 약관은 공지된 후 효력을 발생하며, 사용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단해야 합니다.</p>
                <br/>
                <p><strong>7. 준거법 및 분쟁 해결</strong></p>
                <br/>
                <p>7.1 본 약관은 대한민국 법률에 따라 규율되고 해석됩니다.</p>
                <p>7.2 본 약관과 관련된 분쟁은 회사의 본사 소재지를 관할하는 법원에서 해결합니다.</p>
                <br/>
                <p><strong>8. 연락처</strong></p>
                <br/>
                <p>약관에 대한 문의 사항이 있으시면 아래의 연락처로 문의하시기 바랍니다:</p>
                <p>[PandaOffice]</p>
                <p>주소: [서울특별시 종로구 OOO-OO]</p>
                <p>전화: [02-0000-0000]</p>
                <p>이메일: [pandaoffice@example.com]</p>
                <br/>
                <p>본 약관은 [2012.01.15]부터 효력이 발생합니다.</p>
                <br/>
            </div>
        </Modal>
    );
};

export default TermsOfUseModal;
