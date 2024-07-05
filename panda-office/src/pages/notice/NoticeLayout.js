import {Outlet} from "react-router-dom";
import Footer from "../../components/common/Footer";
import NoticeSidebar from "./NoticeSidebar";

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