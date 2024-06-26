import Footer from "../../components/common/Footer";
import WelfareSidebar from "../attendance/AttendanceSidebar";

function Welfare() {
    return (
        <>
            <div className="side-comp">
                <WelfareSidebar/>
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

export default Welfare;