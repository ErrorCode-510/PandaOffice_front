import Footer from "../../components/common/Footer";
import Calendar from "../../utils/CalendarApi";
import RecruitmentSidebar from "./RecruitmentSidebar";

function Recruitment() {
    return (
        <>
            <div className="side-comp">
                <RecruitmentSidebar/>
            </div>
            <div class="common-comp">
                    {/* <div className="rm-container">
                        <div className="rm-right-comp">
                            <ul className="rm-ul">
                                <li>
                                    테스트
                                </li>
                                <li>
                                    테스트2
                                </li>
                                <li>
                                    테스트3
                                </li>
                                <li>
                                    테스트4
                                </li>
                                <li>
                                    테스트5
                                </li>
                                <li>
                                    테스트6
                                </li>
                            </ul>
                            <button>등록</button>
                            <button>취소</button>
                        </div>
                        <div className="rm-calendar">
                            <Calendar height="700px"/>
                        </div>
                    </div> */}
                <div className="footer">
                    <Footer/>
                </div>
            </div>
        </>
    )
}

export default Recruitment;