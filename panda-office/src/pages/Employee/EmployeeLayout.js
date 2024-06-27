import Footer from "../../components/common/Footer";
import EmployeeSidebar from "./EmployeeSidebar";
import { Outlet } from "react-router-dom";

function Employee() {
    return (
        <>
            <EmployeeSidebar />
            <div className="pd">
                <Outlet />   {/* 메인 콘텐츠 레이아웃 (모르면 공부하셈) */ }
            </div>
            <Footer />
        </>
    )
}

export default Employee;