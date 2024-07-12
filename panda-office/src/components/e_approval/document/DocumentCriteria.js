


export function DocumentCriteria({setSearchCriteria, onClickSearch}) {
    const onChangeHandler = (e) => {
        setSearchCriteria(state=>({...state,
            [e.target.name]: e.target.value
        }))
    }
    return (
        <div className="document-search-bar">
            <div className="same-category">
                <label>기안일</label>
                <input type="date" name="startDate" onChange={onChangeHandler}></input>
                <label>~</label>
                <input type="date" name="endDate" onChange={onChangeHandler}></input>
            </div>
            <div className="same-category">
                <label>양식</label>
                <input placeholder="양식명" name="templateName" onChange={onChangeHandler}></input>
            </div>
            <div className="same-category">
                <label>제목</label>
                <input placeholder="제목" name="name" onChange={onChangeHandler}></input>
            </div>
            <div className="same-category">
                <label>작성자</label>
                <input placeholder="작성자명" style={{width: '100px'}} name="draftEmployeeName" onChange={onChangeHandler}></input>
            </div>
            <div className="same-category">
                <label>문서 상태</label>
                <select style={{width: '100px'}} name="documentStatus" onChange={onChangeHandler}>
                </select>
                <label>내 결재 상태</label>
                <select style={{width: '100px'}} name="approvalStatus" onChange={onChangeHandler}>
                </select>
            </div>
            
            <button onClick={onClickSearch}>조회</button>
        </div>
    )
}