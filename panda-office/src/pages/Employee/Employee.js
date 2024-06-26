import Footer from "../../components/common/Footer";
import EmployeeSidebar from "../attendance/AttendanceSidebar";

function Employee() {
    return (
        <>
            <div className="side-comp">
                <EmployeeSidebar/>
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

export default Employee;