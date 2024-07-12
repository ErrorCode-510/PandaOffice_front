import Card from '../../components/main/card/Card.js';
import Calendar from '../../components/main/calender/Calendar.js';
import Announcement from '../../components/main/announcement/Announcement.js';
import Footer from '../../components/common/Footer.js';
import { BsCartFill } from "react-icons/bs";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { PiWarningFill } from "react-icons/pi";
import { FaFlag } from "react-icons/fa6";

function Main() {

    //클래스 이름 넘겨줌, 순서대로 당일예약건, 당일취소/환불, 금주예약건, 당월예약건(week, month는 이름 길어서 축약함)
    //색상 코드 넘겨줌
    //고정값이라 useState() 사용 안했음

    const cardMaterials ={
        classNames : ["order-received", "order-confirmation", "delivery-processing", "delivery-delay","delivery-completed"],
        cardColors:["#FD9B9B","#8EE7A2","#cf92d6","#FFCD6C","#9DE5FC"],
        cardTexts:["주문접수","발주확인","출고처리","출고지연","출고완료"],
        cardIcons:[<BsCartFill className='circle-icon'/>,<BsBookmarkCheckFill className='circle-icon'/>,<TbTruckDelivery className='circle-icon'/>,< PiWarningFill className='circle-icon'/>,<FaFlag className='circle-icon'/>],
        cardNums:[10,10,5,1,4]



    const announcementMaterials = {
        titles: ["사내 공지사항", "그룹 공지사항", "경조사 게시", "결재 문서"],
        classNames: ["internal-announcement", "group-announcement", "celebration-announcement", "official-document"]
    }



    return (
        <main className="panda-main">
            <div className='text-box'>

            <div className="card-area">
                {
                    cardMaterials.classNames.map((className, index) => 
                        <Card key={index}  className={className}  cardColor={cardMaterials.cardColors[index]} cardText={cardMaterials.cardTexts[index]} cardicon={cardMaterials.cardIcons[index]} cardNum={cardMaterials.cardNums[index]}/>
                    )
                }
            </div>
                <Calendar/>

                <div className="announcement-area">
                    {
                        announcementMaterials.classNames.map((className, index) =>
                            <Announcement key={index} className={className} title={announcementMaterials.titles[index]} />
                        )
                    }
                </div>
            </div>
            <div style={{marginTop: "40px"}}>
            <Footer/>
            </div>
        </main>
    );
}

export default Main;

