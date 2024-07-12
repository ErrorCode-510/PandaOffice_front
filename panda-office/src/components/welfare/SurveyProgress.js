import React, { useState, useEffect } from 'react';
import { authRequest } from '../../apis/api';

function SurveyProgress({ surveyId }) {
  const [survey, setSurvey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [newOption, setNewOption] = useState({ options: [5, 4, 3, 2, 1] });
  const [employeeId, setEmployeeId] = useState('');
  const [jobId, setJobId] = useState('');

  useEffect(() => {
    // 토큰에서 employeeId와 jobId 추출
    const token = localStorage.getItem('access-token');
    if (token) {
      const parsedToken = JSON.parse(atob(token.split('.')[1])); // Base64 디코딩
      setEmployeeId(parsedToken.employeeId);
      setJobId(parsedToken.jobId);
    }
  }, []);

  useEffect(() => {
    console.log("Fetching survey with ID:", surveyId); // surveyId 확인을 위한 로그
    const fetchSurvey = async () => {
      try {
        const response = await authRequest.get(`/survey/survey-details/${surveyId}`);
        console.log("Fetched survey data:", response.data); // 서버에서 받은 데이터 구조 확인을 위한 로그
        setSurvey(response.data);
      } catch (error) {
        console.error('Failed to fetch survey:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (surveyId) {
      fetchSurvey();
    }
  }, [surveyId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!survey) {
    return <p>설문기간이 아닙니다</p>;
  }

  const handleOptionChange = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: parseInt(option, 10), // 문자열을 숫자로 변환
    });
  };

  const replySubmit = async (e) => {
    e.preventDefault();

       // 모든 질문에 대한 응답이 있는지 확인
       const unansweredQuestions = survey.questions.filter(q => !answers.hasOwnProperty(q.id));
       if (unansweredQuestions.length > 0) {
         alert('모든 문항에 응답해 주세요.');
         return;
       }

    const replyRequests = Object.keys(answers).map((questionId) => ({
        surveyId: surveyId,
        employeeId: employeeId,
        jobId: jobId,
        questionId: parseInt(questionId),
        answer: answers[questionId],
    }));

    console.log("Submitting reply data:", JSON.stringify(replyRequests)); // 전송할 데이터 로그

    try {
        // 각 요청을 개별적으로 전송
        for (const reply of replyRequests) {
            const response = await authRequest.post('/survey/reply-count', reply, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                },
            });

            if (response.status !== 201) {
                throw new Error('Network response was not ok');
            }
        }

        alert('응답이 완료되었습니다.');
        window.location.reload();

    } catch (error) {
        console.error('Failed to submit reply:', error);
        if (error.response && error.response.status === 400) {
            alert('이미 참여한 설문입니다.');
        } else {
            alert('제출 불가');
        }
    }
};
  return (
    <div className="survey-container">
      <div className='survey-progress-top-bar'/>
      <div className='survey-padding'>
      <h1>{survey.title}</h1>
      {/* <p>시작일: {survey.startDate}</p>
      <p>종료일: {survey.endDate}</p> */}
      <form onSubmit={replySubmit}>
        {survey.questions && survey.questions.map((question) => (
          <div key={question.id} className="question">
            <p style={{ fontSize: "25px", marginBottom: "25px" }}>{question.questionOrder}. {question.question}</p>
            <ul>
              {newOption.options.map((option, oIndex) => (
                <li key={oIndex}>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    onChange={() => handleOptionChange(question.id, option)}
                  />
                  <span style={{ fontSize: "20px" }} className='radio-name'>
                    {['매우 만족', '약간 만족', '보통', '약간 불만족', '매우 불만족'][oIndex]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button type="submit" className='progress-btn'>제출하기</button>
      </form>
    </div>
    </div>
  );
}

export default SurveyProgress;
