import Footer from "../../components/common/Footer";
import E_approvalSidebar from "../attendance/AttendanceSidebar";

function E_approval() {
    return (
        <>
            <div className="side-comp">
                <E_approvalSidebar/>
            </div>
            <div class="common-comp">
                {/* 여기 안에 모든 걸 작성 */}
                <div className="footer">
                    <Footer/>
                </div>
            </div>
        </>
    )
}

export default E_approval;