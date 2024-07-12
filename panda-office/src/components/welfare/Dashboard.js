import React, { useState, useEffect } from 'react';
import QuestionChart from './charts/QuestionChart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const COLORS = ['#125592','#4187c4','#a59fa0','#de6769','#97040b'];
const rankColors = ['#5971C0', '#9EC97F', '#84BFDB', '#F3C96B', '#d9d7d8'];


const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  if (percent === 0) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const outerRadiusAdjusted = outerRadius + 10; // Adjust outer radius for name label
  const xLine = cx + outerRadiusAdjusted * Math.cos(-midAngle * RADIAN);
  const yLine = cy + outerRadiusAdjusted * Math.sin(-midAngle * RADIAN);

  return (
    <>
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" style={{fontWeight:"bold"}}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      <text x={xLine} y={yLine} fill="black" textAnchor={xLine > cx ? 'start' : 'end'} dominantBaseline="central" style={{fontWeight:"bold"}}>
        {name}
      </text>
    </>
  );
};

const renderJobLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, name }) => {
  if (value === 0) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const outerRadiusAdjusted = outerRadius + 10; // Adjust outer radius for name label
  const xLine = cx + outerRadiusAdjusted * Math.cos(-midAngle * RADIAN);
  const yLine = cy + outerRadiusAdjusted * Math.sin(-midAngle * RADIAN);

  return (
    <>
      <text x={x} y={y} fill="black" textAnchor="middle" dominantBaseline="central" style={{fontWeight:"bold"}}>
        {value}명
      </text>
      <text x={xLine} y={yLine} fill="black" textAnchor={xLine > cx ? 'start' : 'end'} dominantBaseline="central" style={{fontWeight:"bold", color:"#ffffff"}}>
        {name}
      </text>
    </>
  );
};

const Dashboard = ({ surveyId }) => {
  const [surveyData, setSurveyData] = useState([]);
  const [totalResponses, setTotalResponses] = useState(0);
  const [satisfactionData, setSatisfactionData] = useState([]);
  const [jobData, setJobData] = useState([]);
  const [surveyTitle, setSurveyTitle] = useState(""); // 설문 제목 상태 추가

  useEffect(() => {
    const fetchSurveyData = async () => {
      console.log(`Fetching data from http://localhost:8001/survey/survey-details/${surveyId}`);
      const response = await fetch(`http://localhost:8001/survey/survey-details/${surveyId}`);
      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.log("Received content type:", contentType);
        throw new TypeError("Received content is not JSON");
      }

      const data = await response.json(); // JSON으로 변환
      console.log("Fetched data:", data);

      const { title, questions, replyRecords } = data;
      console.log("Reply Records:", replyRecords); // replyRecords 확인용 로그

      setSurveyTitle(title); // 설문 제목 상태 설정

      const formattedSurveyData = questions.map(question => {
        const answers = replyRecords.filter(record => record.questionId === question.id).map(record => record.answer);
        const totalAnswers = answers.length;

        console.log(`Question ${question.id} answers:`, answers);

        return {
          question: `${question.question}`,
          data: [
            { name: "매우 만족", value: Math.round((answers.filter(a => a === 5).length / totalAnswers) * 100) },
            { name: "약간 만족", value: Math.round((answers.filter(a => a === 4).length / totalAnswers) * 100) },
            { name: "보통", value: Math.round((answers.filter(a => a === 3).length / totalAnswers) * 100) },
            { name: "약간 불만족", value: Math.round((answers.filter(a => a === 2).length / totalAnswers) * 100) },
            { name: "매우 불만족", value: Math.round((answers.filter(a => a === 1).length / totalAnswers) * 100) }
          ]
        };
      });

      const uniqueResponses = Array.from(new Set(replyRecords.map(record => record.employeeId)));
      const totalResponses = uniqueResponses.length;

      const satisfactionData = [
        { name: "매우 만족", value: Math.round((replyRecords.filter(record => record.answer === 5).length / totalResponses) * 100) },
        { name: "약간 만족", value: Math.round((replyRecords.filter(record => record.answer === 4).length / totalResponses) * 100) },
        { name: "보통", value: Math.round((replyRecords.filter(record => record.answer === 3).length / totalResponses) * 100) },
        { name: "약간 불만족", value: Math.round((replyRecords.filter(record => record.answer === 2).length / totalResponses) * 100) },
        { name: "매우 불만족", value: Math.round((replyRecords.filter(record => record.answer === 1).length / totalResponses) * 100) }
      ];

      const jobTitlesMapping = {
        11: "사장",
        20: "부장",
        25: "차장",
        30: "과장",
        35: "대리",
        40: "주임",
        50: "사원"
      };

      // 직급별 응답자 수 집계
      const jobDataCounts = replyRecords.reduce((acc, record) => {
        const jobId = record.jobId;
        const employeeId = record.employeeId;

        if (!acc[jobId]) {
          acc[jobId] = { name: jobTitlesMapping[jobId], value: new Set() };
        }
        acc[jobId].value.add(employeeId);
        return acc;
      }, {});

      const jobData = Object.values(jobDataCounts).map(job => ({ ...job, value: job.value.size }));

      console.log("Job Data:", jobData); // jobData 확인용 로그

      setSurveyData(formattedSurveyData);
      setTotalResponses(totalResponses);
      setSatisfactionData(satisfactionData);
      setJobData(jobData);
    };

    fetchSurveyData();
  }, [surveyId]);

  return (
   <div className="dashboard-wrap" style={{width:"100%", backgroundColor:"white",borderRadius:"10px",border: "1px solid #ccc"}}>
      <div className="dashboard-top-bar" style={{width:"100%", height:"30px",borderRadius:"10px 10px 0 0", backgroundColor:"#1E1F31"}}/>
    <div className="dashboard-container">
      <h1 className="dashboard-title">{surveyTitle}</h1>
      <div className="dashboard-content">
        <div className="dashboard-item dashboard-item-large">
          <h2>총 응답자수</h2>
          <div className="dashboard-value">{totalResponses}</div>
        </div>
        <div className="dashboard-item dashboard-item-large">
          <h2>총 만족도</h2>
          {/* <div className='mini-box-wrap' style={{width:"120px", height:"100px", position:"absolute",  right:"0", display:"flex", gap:"20px"}}>
              <div className='mini-box-left' style={{width:"10%"}}>
                  <div className="mini-box1" style={{width:"23px", height:"12px", backgroundColor:"#125592", position:"absolute", left:"0",top:"10px"}}/>
                  <div className="mini-box2" style={{width:"23px", height:"12px", backgroundColor:"#4187c4", position:"absolute", left:"0",top:"30px"}}/>
                  <div className="mini-box3" style={{width:"23px", height:"12px", backgroundColor:"#a59fa0", position:"absolute", left:"0",top:"50px"}}/>
                  <div className="mini-box4" style={{width:"23px", height:"12px", backgroundColor:"#de6769", position:"absolute", left:"0",top:"70px"}}/>
                  <div className="mini-box5" style={{width:"23px", height:"12px", backgroundColor:"#97040b", position:"absolute", left:"0",top:"90px"}}/>
                </div>
                <div className="'mini-box-right"style={{width:"90%"}}>
                    <div>매우 만족</div>
                    <div>약간 만족</div>
                    <div>보통</div>
                    <div>약간 불만족</div>
                    <div>매우 불만족</div>
                </div>
            </div> */}
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={satisfactionData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={105}
                label={renderCustomizedLabel} // 커스텀 라벨 함수 사용
                labelLine={false} // 라벨 라인 비활성화
              >
                {satisfactionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="dashboard-item dashboard-item-large">
          <h2>직급별 응답자 수</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={jobData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={105}
                label={renderJobLabel} // 직급별 응답자 수 커스텀 라벨 함수 사용
                labelLine={false} // 라벨 라인 비활성화
              >
                {jobData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={ rankColors[index %  rankColors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        {surveyData.map((question, index) => (
          <div key={index} className="dashboard-item">
            <QuestionChart data={question.data} question={question.question} />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
