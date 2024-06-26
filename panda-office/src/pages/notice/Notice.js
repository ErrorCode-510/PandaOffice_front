import Footer from "../../components/common/Footer";
import NoticeSidebar from "../attendance/AttendanceSidebar";

function Notice() {
    return (
        <>
            <div className="side-comp">
                <NoticeSidebar/>
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

export default Notice;