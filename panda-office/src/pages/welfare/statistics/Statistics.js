import Footer from "../../../components/common/Footer"
import StatisticsLeft from "../../../components/welfare/statistics/StatisticsLeft"
import StatisticsRight from "../../../components/welfare/statistics/StatisticsRight"
import {Chart as ChartJS, CategoryScale,LinearScale, PointElement, LineElement,} from "chart.js";
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';


function Statistics() {
    
    // 좌측 구역`
    const statisticsLeftMaterials = {
        classNames:["all-respondent", "respondent-percent", "rank-response-result", "all-response-percent"],
        titles:["총 응답자수","직급별 응답","직급별 응답 결과","가장 많은 응답 결과"],
        graphs:[<Pie/>,<Bar/>]
    }


    return(
        <>
            <div className="statistics-area">
                <div className="cover-box">
                    <div className=" statistics-inner-area"> 
                        <div className="statistics-inner-left-area">
                            {
                                statisticsLeftMaterials.classNames.map((className,index)=>
                                    <StatisticsLeft key={index} className={className} title={statisticsLeftMaterials.titles[index]}/>
                                )
                            }
                            
                            
                        </div>
                        <div className="statistics-inner-right-area">
                            <StatisticsRight/>
                        </div>
                    </div>
                </div>   
            </div>

            <Footer/>
        </>
    )
}

export default Statistics;