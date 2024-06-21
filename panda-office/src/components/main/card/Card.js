function Card({className, cardColor,cardText, cardicon}){
  return(
        <div className={`card ${className}`}>
            <div className="colorbar" style={{backgroundColor:cardColor}}/>{/* 카드 상단 막대 */}
            <div className="card-flexbox">{/* 카드 내부 반으로 나눔 */}
                <div className="card-left">
                    <p className="card-text">{cardText}</p>
                    <p className="card-text card-num" style={{color : cardColor, fontSize : "35px", fontWeight: "bold", marginBottom:"10px"}}>15</p>
                </div>
                <div className="card-right">
                      <div className="card-circle" style={{backgroundColor:cardColor}}>
                                    {cardicon}
                      </div>
                </div>  
              </div>
        </div>
  )
}

export default Card;