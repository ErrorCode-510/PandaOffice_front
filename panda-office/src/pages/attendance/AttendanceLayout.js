import { Outlet } from "react-router-dom";
import Footer from "../../components/common/Footer";
import AttendanceSidebar from "./AttendanceSidebar";

function Attendance() {
    return (
        <>
            <AttendanceSidebar />
            <div className="common-comp">
                <div className="pd">
                    <Outlet />  {/* 메인 콘텐츠 레이아웃 (모르면 공부하셈) */ }
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Attendance;