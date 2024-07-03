import { useDispatch, useSelector } from 'react-redux';
import { setApplicantDetail } from '../../../modules/ApplicantModules';
import { useEffect, useState } from 'react';
import { callApplicantModify, callApplicantDelete } from '../../../apis/ApplicantAPICalls';

const ApplicantModal = () => {

    const { applicantDetail } = useSelector(state => state.applicantReducer)
    const { applicantModify } = useSelector(state => state.applicantReducer)

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

    /* 닫기 버튼: 버튼 클릭 시 값 비우기(값이 비워지면 if 문에서 return 됨) 
    * 삭제 버튼: 버튼 클릭 시 해당 값 삭제(DB에서 사라짐) */
    const handlerCancelDeleteOnClick = () => {
        if (isTrue) {
            dispatch(setApplicantDetail(null));
            setIsTrue(true);
        } else {
            const { id } = applicantDetail;
            dispatch(callApplicantDelete(id)).then(() => {
                dispatch(setApplicantDetail(null));
                setIsTrue(true);
            })
        }
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
            await dispatch(callApplicantModify(formValues))
            // console.log('모달창 수정 확인: ' + JSON.stringify(formValues));
            setIsTrue(true);
        }
    }

    /* Esc 키로 모달 닫기 핸들러 */
    const handlerButtonOff = (e) => {
        if (e.key === 'Escape') {
            handlerCloseOnClick();
            // console.log('Esc 키 눌림');
        }
    }

    /* applicantDetail이 비어있지 않을 때 윈도우 개체에 keydown 이벤트 리스너를 추가한다. */
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

            window.addEventListener('keydown', handlerButtonOff);

            return () => {
                window.removeEventListener('keydown', handlerButtonOff);
            }
        };
    }, [applicantDetail, applicantModify]);

    // 입력 필드 변경 핸들러
    const handlerInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
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
                                <input 
                                    type='text' 
                                    name='gender' 
                                    value={formValues.gender} 
                                    readOnly={isTrue}
                                    onChange={handlerInputChange}
                                    ></input>
                            </div>
                        </div>
                        <div className='applicant-flex-right'>
                            <div className='applicant-phone'>
                                <p>연락처</p>
                                <input 
                                    type='text' 
                                    name='phone' 
                                    value={formValues.phone} 
                                    readOnly={isTrue}
                                    onChange={handlerInputChange}
                                    ></input>
                            </div>
                            <div className='applicant-age'>
                                <p>나이</p>
                                <input 
                                type='text' 
                                name='age' 
                                value={calculateAge(formValues.birthDate)} 
                                readOnly={isTrue}
                                onChange={handlerInputChange}
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className='applicant-email wd-420'>
                        <p>이메일</p>
                        <input 
                        type='text' 
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
                        <button className='cancel-btn' onClick={handlerCancelDeleteOnClick}>
                            {
                                isTrue? '닫기' : '삭제'
                            }
                        </button>
                        <button className='modyfi-btn' onClick={handlerModifyOnClick}>
                            {
                                isTrue? '수정' : '수정완료'
                            }
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ApplicantModal;