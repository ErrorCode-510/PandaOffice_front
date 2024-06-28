import { Outlet } from "react-router-dom";
import Footer from "../../components/common/Footer";
import E_ApprovalSidebar from "./E_approvalSidebar";

function E_ApprovalLayout() {
    return (
        <>
            <E_ApprovalSidebar />
            <div className="common-comp">
                <div className="pd">
                    {/* 여기 안에 모든 걸 작성 */}
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default E_ApprovalLayout;