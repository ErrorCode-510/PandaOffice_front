function Statistics({className,title}) {
    return(
            <>   
                    <div className={`statistics-left-card ${className}`}>
                        <p style={{fontSize:"20px", fontWeight:"bold"}}>{title}</p>
                    </div>  
        </>
    )
}

export default Statistics;