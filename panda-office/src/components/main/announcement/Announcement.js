function Announcement({className,title}) {
    return(
               <div className={`announcement ${className}`}>
                        <div className="announcement-topbar">
                            <span className="announcement-title">{`${title}`}</span>
                            <button style={{float : "right", transform: "translate(-20%,40%)", border: 0 ,backgroundColor:"#292929", color: "white",cursor: "pointer"}}>더보기</button>
                        </div>
                        <div className="announcement-contents-area">
                            <div className="announcement-content">모래반지 빵야빵야</div> {/* 임시작성, props받아오기 위해 수정 */}
                            <div className="announcement-content">모래반지 빵야빵야</div>
                            <div className="announcement-content">모래반지 빵야빵야</div>
                            <div className="announcement-content">모래반지 빵야빵야</div>
                            <div className="announcement-content">모래반지 빵야빵야</div>
                        </div>
                </div>
    )
}

export default Announcement;