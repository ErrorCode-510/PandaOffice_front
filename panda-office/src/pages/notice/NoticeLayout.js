import {Outlet} from "react-router-dom";
import Footer from "../../components/common/Footer";
import NoticeSidebar from "./NoticeSidebar";
// import Notice from "./Notice";

function NoticeLayout() {
    return (
        <>
            <NoticeSidebar/>
            <div className="common-comp">
                <div className="pd">
                    <Outlet />
                </div>
                <Footer/>
            </div>
        </>
    );
}

export default NoticeLayout;