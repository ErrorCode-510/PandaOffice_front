import Header from "../components/common/Header";

import {Outlet} from "react-router-dom";
import Navbar from "../components/common/Navbar";

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