import { useSelector } from 'react-redux';

const ApplicantModal = () => {

    const { applicantDetail } = useSelector(state => state.applicantReducer)
    // console.log("모달 확인: " + JSON.stringify(applicantDetail))

    if (!applicantDetail) {
        return null;
    }

    const { name, birthDate, gender, phone, address, email } = applicantDetail;

    // 생일로부터 나이 계산 함수
    const calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const month = today.getMonth() - birth.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <>
            <div className='modal-bg'>
                <div className='modal-wrap'>
                    <div className='applicant-info'>
                        <h1>면접자 인적사항</h1>
                    </div>
                    <div className='applicant-info-wrap'>
                        <div className='applicant-flex-left'>
                            <div className='applicant-name'>
                                <p>이름</p>
                                <input type='text' value={name} readOnly></input>
                            </div>
                            <div className='applicant-gender'>
                                <p>성별</p>
                                <input type='text' value={gender} readOnly></input>
                            </div>
                        </div>
                        <div className='applicant-flex-right'>
                            <div className='applicant-phone'>
                                <p>연락처</p>
                                <input type='text' value={phone} readOnly></input>
                            </div>
                            <div className='applicant-age'>
                                <p>나이</p>
                                <input type='text' value={calculateAge(birthDate)} readOnly></input>
                            </div>
                        </div>
                    </div>
                    <div className='applicant-email wd-414'>
                        <p>이메일</p>
                        <input type='text' value={email} readOnly></input>
                    </div>
                    <div className='applicant-address wd-414'>
                        <p>주소</p>
                        <input type='text' value={address} readOnly></input>
                    </div>
                    <div className='modal-btn'>
                        <button className='cancel-btn'>취소</button>
                        <button className='modyfi-btn'>수정</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ApplicantModal;