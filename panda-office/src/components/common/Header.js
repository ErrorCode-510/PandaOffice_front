import { useNavigate } from "react-router-dom";
import { TbBellFilled } from "react-icons/tb";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

function Header() {
    
    let navigate = useNavigate();
    
    
    return (
        <header className="panda-header">
                <Link to="/">
                    <div className="panda-logo"/>
                </Link>   
                <div className="icon-area">
                    <div className="icon" >
                        <Link to>
                            <TbBellFilled className="bell"/>
                        </Link>
                    </div>

                    <div className="icon">
                        <Link to>
                            <IoCalendarNumberOutline className="calender"/>
                        </Link>
                    </div>

                    <div className="icon">
                        <Link to>
                            <FiLogOut className="logout" />
                        </Link>
                    </div>

                </div>
        </header>
    )
}

export default Header;