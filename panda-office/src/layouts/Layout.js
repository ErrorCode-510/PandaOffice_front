import Header from "../components/common/Header"
import Navbar from "../components/common/Navbar"
// import Footer from "../components/common/Footer"
import { Outlet } from "react-router-dom"

function Layout() {
    return (
        <div id="layout-wrap">
            <div class="layout-left" >
                <Navbar/>
            </div>
            <div class="layout-right" >
                <Header/>
                <Outlet/>
                {/* Footer는 Main에 위치 */}
            </div>
        </div>
    )
}

export default Layout