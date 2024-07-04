import { useDispatch, useSelector } from 'react-redux';
import { setApplicantDetail } from '../../../modules/ApplicantModules';
import { useEffect, useState } from 'react';
import { callApplicantModify, callApplicantDelete } from '../../../apis/ApplicantAPICalls';

const ApplicantModal = () => {

    const { applicantDetail, applicantModify } = useSelector(state => state.applicantReducer)

    const dispatch = useDispatch();

    const [isTrue, setIsTrue] = useState(true);
    const [formValues, setFormValues] = useState({
        id:'',
        name: '',
        birthDate: '',
        gender: '',
        address: '',
        phone: '',
        email: '',
    });

    /* 모달 백그라운드 클릭 시 모달창 닫기 */
    const handlerCloseOnClick = () => {
        dispatch(setApplicantDetail(null));
        setIsTrue(true);
    }

    /* 모달창 닫기/취소 버튼 */
    const handlerCancelOnClick = () => {
        /* 참일 경우 모달창 닫기 및 상태 변화 */
        if (isTrue) {
            dispatch(setApplicantDetail(null));
            setIsTrue(true);
            /* 거짓일 경우 상태 변화 */
        } else {
            setIsTrue(true)
        }
    }

    /* 모달창 면접자 삭제 버튼 */
    const handlerDeleteOnClick = () => {
        const { id } = applicantDetail;
        dispatch(callApplicantDelete(id)).then(() => {
            dispatch(setApplicantDetail(null));
            setIsTrue(true);
        })
    }

    /* 모달 랩 클릭 핸들러 (이벤트 버블링 방지) */
    const handlerModalWrapClick = (e) => {
        e.stopPropagation();
    }

    /* 수정 버튼 클릭 시 상호작용 */
    const handlerModifyOnClick = async () => {
        if (isTrue) {
            setIsTrue(false);
        } else {
            // 데이터 유효성 검사: 이름 필드가 비어있는지 체크
            if (formValues.name.trim() === '') {
                alert('이름을 입력하세요');
                return;
            }
            else if (formValues.gender.trim() === '') {
                alert('성별을 입력하세요');
                return;
            }
            else if (formValues.phone.trim() === '') {
                alert('전화번호를 입력하세요');
                return;
            }
            else if (formValues.birthDate.trim() === '') {
                alert('생년월일을 입력하세요');
                return;
            }
            else if (formValues.email.trim() === '') {
                alert('이메일을 입력하세요');
                return;
            }
            else if (formValues.address.trim() === '') {
                alert('주소 입력하세요');
                return;
            }
    
            // callApplicantModify 호출 조건: formValues가 유효한 경우에만 호출
            await dispatch(callApplicantModify(formValues))
                .then(() => {
                    handlerCancelOnClick();
                    setIsTrue(true);
                })
                .catch((error) => {
                    console.error('수정 실패:', error);
                    alert('수정 중 오류가 발생했습니다.');
                });
        }
    }

    /* Esc 키로 모달 닫기 핸들러 */
    const handlerButtonOff = (e) => {
        if (e.key === 'Escape') {
            handlerCloseOnClick();
            // console.log('Esc 키 눌림');
        }
    }

    /* 면접자 로우 클릭 시 모달창에 정보 띄우기 */
    useEffect(() => {
        if (applicantDetail) {

            /* applicantDtail의 값을 formValuse에 set 해준다. 그 상태 값을 출력 */
            setFormValues({
                id: applicantDetail.id,
                name: applicantDetail.name,
                birthDate: applicantDetail.birthDate,
                gender: applicantDetail.gender,
                address: applicantDetail.address,
                phone: applicantDetail.phone,
                email: applicantDetail.email,
            })
        }
    }, [applicantDetail]);

    /* 윈도우 개체에 keydown 이벤트 리스너를 추가한다. */
    useEffect(() => {
        window.addEventListener('keydown', handlerButtonOff);

        return () => {
            window.removeEventListener('keydown', handlerButtonOff);
        }
    }, [])

    // 입력 필드 변경 핸들러
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

    if (!applicantDetail) {
        return null;
    }

    // 생일로부터 나이 계산 함수
    const calculateAge = (birthDate) => {
        if (!birthDate) return '';
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const month = today.getMonth() - birth.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return isNaN(age) ? '' : age;
    };

    return (
        <>
            <div className='modal-bg' onClick={handlerCloseOnClick}>
                <div className='modal-wrap' onClick={handlerModalWrapClick}>
                    <div className='applicant-info'>
                        <h1>면접자 인적사항</h1>
                    </div>
                    <div className='applicant-info-wrap'>
                        <div className='applicant-flex-left'>
                            <div className='applicant-name'>
                                <p>이름</p>
                                <input 
                                    type='text' 
                                    name='name' 
                                    value={formValues.name} 
                                    readOnly={isTrue}
                                    onChange={handlerInputChange}
                                ></input>
                            </div>
                            <div className='applicant-gender'>
                                <p>성별</p>
                                <select
                                        className='am-gender'
                                        name='gender'
                                        value={formValues.gender}
                                        onChange={handlerInputChange}
                                        disabled={isTrue}
                                    >
                                        <option value=''>선택</option>
                                        <option value='남'>남</option>
                                        <option value='여'>여</option>
                                    </select>
                            </div>
                        </div>
                        <div className='applicant-flex-right'>
                            <div className='applicant-phone'>
                                <p>연락처</p>
                                <input 
                                    type='tel' 
                                    name='phone' 
                                    value={formValues.phone} 
                                    readOnly={isTrue}
                                    onChange={handlerInputChange}
                                ></input>
                            </div>
                            <div className='applicant-age'>
                                <p>나이</p>
                                <input 
                                type={ isTrue ? 'text' : 'date'}
                                name='birthDate' 
                                value={ isTrue ? calculateAge(formValues.birthDate) : formValues.birthDate} 
                                readOnly={isTrue}
                                onChange={handlerInputChange}
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className='applicant-email wd-420'>
                        <p>이메일</p>
                        <input 
                        type='email' 
                        name='email' 
                        value={formValues.email} 
                        readOnly={isTrue}
                        onChange={handlerInputChange}
                        ></input>
                    </div>
                    <div className='applicant-address wd-420'>
                        <p>주소</p>
                        <input 
                        type='text' 
                        name='address' 
                        value={formValues.address} 
                        readOnly={isTrue}
                        onChange={handlerInputChange}
                        ></input>
                    </div>
                    <div className='modal-btn'>
                        <button className='cancel-btn' onClick={handlerCancelOnClick}>
                            {
                                isTrue ? '닫기' : '취소'
                            }
                        </button>
                        <button className='modyfi-btn' onClick={handlerModifyOnClick}>
                            {
                                isTrue ? '수정' : '수정완료'
                            }
                        </button>
                    </div>
                    <button className='delete-btn' style={{ display: isTrue ? 'block' : 'none' }}>
                        { isTrue ? '삭제' : '' }
                    </button>

                </div>
            </div>
        </>
    )
}

export default ApplicantModal;