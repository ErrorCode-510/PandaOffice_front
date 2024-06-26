import Footer from "../../components/common/Footer";
import AttendanceSidebar from "../attendance/AttendanceSidebar";

function Attendance() {
    return (
        <>
            <div className="side-comp">
                <AttendanceSidebar/>
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

export default Attendance;