import { useDispatch, useSelector } from "react-redux";
import { callApplicantListAPI } from "../../../apis/ApplicantAPICalls";
import { useState } from "react";
import { setCriteria } from "../../../modules/ApplicantModules";

const ApplicantSearch = () => {

    const dispatch = useDispatch();
    
    const [mainCriteria, setMainCriteria] = useState('all');
    const [subCriteria, setSubCriteria] = useState();
    const [searchCriteria, setSearchCriteria] = useState('');
    // const [params, setParams] = useState('');

    /* 검색 조건 */
    const handlerCriteriaChange = (e) => {
        const selectedCriteria = e.target.value;
        setMainCriteria(selectedCriteria);
        console.log('selectedCriteria: ' + selectedCriteria);
    }

    /* 검색 조건2 */
    const handlerSubCriteriaChange = (e) => {
        const selectedSubCriteria = e.target.value;
        setSubCriteria(selectedSubCriteria);
        // console.log('selectedSubCriteria: ' + selectedSubCriteria);
    }

    /* 이름 입력 */
    const handlerSearchChange = (e) => {
        const input = e.target.value;
        setSearchCriteria(input)
        // console.log('searchText: ' + input);
    }

    /* 조건 취합 후 API 요청 */
    const handlerOnClink = () => {
        const params = {mainCriteria, subCriteria, searchCriteria};
        // console.log('onClick LOG: ' + JSON.stringify(params))
        console.log(JSON.stringify(searchCriteria))
        dispatch(setCriteria(params))
    }

    /* 엔터키 입력 시 조회 */
    const onSubmitSearch = (e) => {
        if (e.key === 'Enter') {
            handlerOnClink();
        } else {
            console.log('error')
        }
    }

    return (
        <>
            <div className="as-criteria-wrap">
                <div className="as-main-selected">
                    <p>구분</p>
                    <select id="criteriaSelect" value={mainCriteria} onChange={handlerCriteriaChange}>
                        <option value='all'>전체</option>
                        <option value="gender">성별</option>
                        {/* <option value="age">나이</option> */}
                        <option value="address">주소</option>
                    </select>
                </div>
                <div className="as-sub-selected">
                    <p>상세구분</p>
                    <select id="criteriaSubSelect" value={subCriteria} onChange={handlerSubCriteriaChange} disabled={mainCriteria === 'all'}>
                        <option>선택</option>
                        {
                            mainCriteria === 'gender' &&
                            <>
                                <option value="남">남</option>
                                <option value="여">여</option>
                            </>
                        }
                        {/* {
                            mainCriteria === 'age' &&
                            <>
                                <option value="20">20대</option>
                                <option value="30">30대</option>
                                <option value="40">40대</option>
                            </>
                        } */}
                        {
                            mainCriteria === 'address' &&
                            <>
                                <option value="서울">서울</option>
                                <option value="경기">경기</option>
                                <option value="인천">인천</option>
                                <option value="대전">대전</option>
                                <option value="세종">세종</option>
                                <option value="충남">충남</option>
                                <option value="충북">충북</option>
                                <option value="광주">광주</option>
                                <option value="전남">전남</option>
                                <option value="전북">전북</option>
                                <option value="대구">대구</option>
                                <option value="경북">경북</option>
                                <option value="부산">부산</option>
                                <option value="울산">울산</option>
                                <option value="경남">경남</option>
                                <option value="강원">강원</option>
                                <option value="제주">제주</option>
                            </>
                        }
                    </select>
                </div>
                <div className="as-search-box">
                    <p>검색</p>
                    <input className="as-input-box" type="text" placeholder="이름을 입력해 주세요." value={searchCriteria} onChange={handlerSearchChange} onKeyDown={onSubmitSearch}></input>
                </div>
                <button className="as-search-btn" onClick={handlerOnClink}>조회</button>
                
            </div>
        </>
    )
}

export default ApplicantSearch;