import Footer from "../../components/common/Footer";
import EmployeeSidebar from "./EmployeeSidebar";
import { Outlet } from "react-router-dom";

function Employee() {
    return (
        <>
            <EmployeeSidebar />
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

export default Employee;