import { useSelector } from "react-redux";

function NoticeDetail() {

    const { detail } = useSelector(state => state.noticeReducer)
    // console.log('공지 상세 ID 확인: ' + JSON.stringify({detail}))
    
    return (
        <>
        <h1>공지 상세 테스트</h1>
        </>
    )
}

export default NoticeDetail;