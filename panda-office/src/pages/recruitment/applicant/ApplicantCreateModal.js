import { useSelector, useDispatch } from "react-redux";
import { setModalStatus } from '../../../modules/ApplicantModules';
import { useEffect, useState } from "react";
import { callApplicantRegist } from "../../../apis/ApplicantAPICalls"

const ApplicantCreateModal = () => {

    const { modalStatus } = useSelector(state => state.applicantReducer)

    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        name: '',
        birthDate: '',
        gender: '',
        address: '',
        phone: '',
        email: ''
    })

    /* 필드 입력 데이터 받기 */
    const handlerInputChange = (e) => {
        const { name, value } = e.target;

        /* 전화번호 포맷팅 함수 */
        const formatPhoneNumber = (number) => {
            number = number.replace(/[^\d]/g, '');

            if (number.length < 4) return number;
            if (number.length < 8) {
                return `${number.slice(0, 3)}-${number.slice(3)}`;
            }
            return `${number.slice(0, 3)}-${number.slice(3, 7)}-${number.slice(7, 11)}`;
        };

        setFormValues(prevValues => ({
            ...prevValues,
            [name]: name === 'phone' ? formatPhoneNumber(value) : value
        }));
        console.log(value);
    };

    /* 면접자 등록 버튼 */
    const handlerCreateOnClick = () => {
        const { name, birthDate, gender, address, phone, email } = formValues;

        // 모든 필드가 채워져 있는지 확인
        if (name.trim() && birthDate.trim() && gender.trim() && address.trim() && phone.trim() && email.trim()) {
            dispatch(callApplicantRegist(formValues))
                /* 등록 후 모달창 닫기 */
                .then(() => {
                    closeModalHandler();
                })
                .catch((error) => {
                    console.error('등록 실패:', error);
                    alert('등록 중 오류가 발생했습니다.');
                });
        } else {
            alert('모든 필드를 입력하세요');
        }
    }

    /* 모달창 닫기 버튼 */
    const closeModalHandler = () => {
        dispatch(setModalStatus(false));

        /* 모달창 닫고 다시 오픈 시 중간에 작성 됐던 값 초기화 */
        setFormValues({
            name: '',
            birthDate: '',
            gender: '',
            address: '',
            phone: '',
            email: ''
        });
    }

    /* Esc 키로 모달 닫기 핸들러 */
    const handlerButtonOff = (e) => {
        if (e.key === 'Escape') {
            closeModalHandler();
        }
    }

    /* 모달 랩 클릭 핸들러 (이벤트 버블링 방지) */
    const handlerModalWrapClick = (e) => {
        e.stopPropagation();
    }

    /* Esc 모달창 닫기 */
    useEffect(() => {
        window.addEventListener('keydown', handlerButtonOff);

        return () => {
            window.removeEventListener('keydown', handlerButtonOff);
        }
    }, [modalStatus]);

    /* 주소 셀렉트 박스 옵션 */
    const cities = [
        '서울', '경기', '인천', '대전', '세종', '충남', '충북', '광주',
        '전남', '전북', '대구', '경북', '부산', '울산', '경남', '강원', '제주'
    ];

    return (
        <>
            {
                modalStatus &&
                <div className='modal-bg' onClick={closeModalHandler}>
                    <div className='modal-wrap' onClick={handlerModalWrapClick}>
                        <div className='applicant-info'>
                            <h1>면접자 인적사항 등록</h1>
                        </div>
                        <div className='applicant-info-wrap'>
                            <div className='applicant-flex-left'>
                                <div className='applicant-name'>
                                    <p>이름</p>
                                    <input
                                        type='text'
                                        name='name'
                                        onChange={handlerInputChange}
                                        placeholder='이름을 입력해주세요.'
                                        value={formValues.name}
                                    ></input>
                                </div>
                                <div className='applicant-gender'>
                                    <p>성별</p>
                                    <select
                                        className="acm-gender"
                                        onChange={handlerInputChange}
                                        name="gender"
                                        value={formValues.gender}
                                    >
                                        <option value="">선택</option>
                                        <option value="남">남</option>
                                        <option value="여">여</option>
                                    </select>
                                </div>
                            </div>
                            <div className='applicant-flex-right'>
                                <div className='applicant-phone'>
                                    <p>연락처</p>
                                    <input
                                        type='tel'
                                        name='phone'
                                        onChange={handlerInputChange}
                                        value={formValues.phone}
                                        placeholder='연락처를 입력해주세요.'
                                    ></input>
                                </div>
                                <div className='applicant-age'>
                                    <p>나이</p>
                                    <input
                                        type='date'
                                        name='birthDate'
                                        onChange={handlerInputChange}
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <div className='applicant-address'>
                            <p>주소</p>
                            <select
                                className="acm-address"
                                name="address"
                                onChange={handlerInputChange}
                                value={formValues.address}
                            >
                                <option value="">선택</option>
                                {cities.map((city, index) => (
                                    <option key={index} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                        <div className='applicant-email wd-420'>
                            <p>이메일</p>
                            <input
                                type='email'
                                name='email'
                                onChange={handlerInputChange}
                                placeholder='이메일을 입력해주세요.'
                                value={formValues.email}
                            ></input>
                        </div>
                        <div className='modal-btn'>
                            <button className='cancel-btn' onClick={closeModalHandler}>
                                닫기
                            </button>
                            <button className='modyfi-btn' onClick={handlerCreateOnClick}>
                                등록
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ApplicantCreateModal;