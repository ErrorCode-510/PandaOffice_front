import { Outlet } from "react-router-dom";
import Footer from "../../components/common/Footer";
import E_ApprovalSidebar from "./E_ApprovalSidebar";

function E_ApprovalLayout() {
    return (
        <>
            <E_ApprovalSidebar/>
            <div className="common-comp">
                <div className="pd">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default E_ApprovalLayout;