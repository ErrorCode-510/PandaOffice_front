import { useDispatch} from 'react-redux';
import { callApplicantDetail } from '../../../apis/ApplicantAPICalls';

const ApplicantListItem = ({ applicant: { id, name, birthDate, gender, phone, address, email } }) => {

    const dispatch = useDispatch();

    /* 로우 클릭 시 해당 ID로 면접자 정보 찾음 */
    const handlerOnClick = () => {
        dispatch(callApplicantDetail(id));
    }
    
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
            <div className="ali-comp">
                <ul className="ali-ul" onClick={handlerOnClick}>
                    <li>{name}</li>
                    <li>{calculateAge(birthDate)}</li>
                    <li>{gender}</li>
                    <li>{address}</li>
                    <li>{phone}</li>
                    <li>{email}</li>
                </ul>
            </div>
        </>
    )
}

export default ApplicantListItem;
