import { Outlet } from "react-router-dom";
import Footer from "../../components/common/Footer";
import Calendar from "../../utils/CalendarApi";
import RecruitmentSidebar from "./RecruitmentSidebar";

function Recruitment() {
    return (
        <>
            <RecruitmentSidebar />
            <div className="common-comp">
                <div className="pd">
                    <Outlet />   {/* 메인 콘텐츠 레이아웃 (모르면 공부하셈) */ }
                </div>
                <div className="footer">
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Recruitment;