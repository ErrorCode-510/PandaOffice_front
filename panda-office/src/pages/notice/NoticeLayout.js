import {Outlet} from "react-router-dom";
import Footer from "../../components/common/Footer";
import NoticeSidebar from "./NoticeSidebar";

function NoticeLayout() {
    return (
        <>
            <NoticeSidebar/>   {/* 사이드바 컴포넌트 */}
            <div className="common-comp">
                <div className="pd">
                    <Outlet />  {/* 라우터가 렌더링할 컴포넌트가 표시되는 부분 */}
                </div>
                <Footer/>  {/* 푸터 컴포넌트 */}
            </div>
        </>
    );
}

export default NoticeLayout;