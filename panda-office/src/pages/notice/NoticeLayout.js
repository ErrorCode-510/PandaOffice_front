import { Outlet } from "react-router-dom";
import Footer from "../../components/common/Footer";
import NoticeSidebar from "./NoticeSidebar";

function Notice() {
    return (
        <>
            <NoticeSidebar />
            <div className="common-comp">
                <div className="pd">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Notice;