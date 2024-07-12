import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BsCalendar, BsPencilSquare } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';

function SurveyRegistration() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ title: '', options: [5, 4, 3, 2, 1], disabled: false, isEditing: false });
  const [surveyTitle, setSurveyTitle] = useState('');
  const [startDate, setStartDate] = useState(null); // 초기값을 null로 설정
  const [endDate, setEndDate] = useState(null); // 초기값을 null로 설정
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const handleNewQuestionTitleChange = (e) => {
    setNewQuestion({ ...newQuestion, title: e.target.value });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addQuestion();
    }
  };

  const addQuestion = () => {
    setQuestions([...questions, { ...newQuestion, disabled: true, isEditing: false }]);
    setNewQuestion({ title: '', options: [5, 4, 3, 2, 1], disabled: false, isEditing: false });
  };

  const deleteQuestion = (index) => {
    const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(newQuestions);
  };

  const editQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].isEditing = true;
    setQuestions(newQuestions);
  };

  const saveQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].isEditing = false;
    setQuestions(newQuestions);
  };

  const surveySubmit = async (e) => {
    e.preventDefault();

    if (!surveyTitle || !startDate || !endDate || !selectedCategory || questions.length === 0) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    const surveyData = {
      title: surveyTitle,
      startDate: startDate,
      endDate: endDate,
      categoryId: selectedCategory,
      question: questions.map((q, index) => ({ order: index + 1, question: q.title }))
    };

    console.log('Sending survey data:', surveyData);

    try {
      const response = await fetch('http://localhost:8001/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(surveyData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message === 'The start date is already taken.') {
          alert('다른 시작일을 선택해주세요.');
        } else {
          throw new Error('Network response was not ok');
        }
      } else {
        const responseText = await response.text();
        if (responseText) {
          const responseData = JSON.parse(responseText);
          console.log('Success:', responseData);
        } else {
          console.log('Success: No response body');
        }

        alert('성공적으로 등록되었습니다');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('등록에 실패하셨습니다. ')
    }
  };

  return (
    <div className="survey-registration-bg">
      <div className='survey-registration-top-bar'/>
      <span className='survey-registration-title'>설문등록</span>
      <form onSubmit={surveySubmit} style={{width:"97%", margin:"0 auto"}}>
        <div className="survey-area">
          <div className="survey-title-date">
            <span>설문제목</span>
            <input
              type="text"
              placeholder='제목을 입력해주세요'
              className='survey-title'
              value={surveyTitle}
              onChange={(e) => setSurveyTitle(e.target.value)}
            />
            <br />
            <label style={{marginRight:"10px"}}>설문기간</label>
            <div className="custom-date-input">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="시작일을 선택하세요"
                dateFormat="yyyy-MM-dd"
                className="survey-date"
              />
              <BsCalendar className="calendar-icon" />
            </div>
            <span> - </span>
            <div className="custom-date-input">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText="종료일을 선택하세요"
                dateFormat="yyyy-MM-dd"
                className="survey-date"
              />
              <BsCalendar className="calendar-icon" />
            </div>
            <br />
            <label style={{marginRight:"10px"}}>카테고리</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            style={{padding:"8px 15px 8px 8px"}}>
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="question-register-area">
            <input
              type="text"
              className="question-title"
              placeholder="질문 제목을 입력하세요"
              value={newQuestion.title}
              onChange={handleNewQuestionTitleChange}
              onKeyPress={handleKeyPress}
            />
            <ul>
              {newQuestion.options.map((option, oIndex) => (
                <li key={oIndex}>
                  <input type="radio" value={option} name="new-question" disabled />
                  <span>{['매우 만족', '약간 만족', '보통이다', '약간 불만족', '매우 불만족'][oIndex]}</span>
                </li>
              ))}
            </ul>
            <div className='create-question-btn-area'>
              <button type="button" className="create-question-btn" onClick={addQuestion}>질문등록</button>
            </div>
          </div>

          <div className="survey-question-regination-area">
            {questions.map((question, index) => (
              <div key={index} className="survey-question-regination-box">
                <div className="survey-question-regination">
                  <input
                    type="text"
                    className="question-title"
                    placeholder="질문제목"
                    value={question.isEditing ? question.title : `${index + 1}. ${question.title}`}
                    disabled={!question.isEditing}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[index].title = e.target.value;
                      setQuestions(newQuestions);
                    }}
                  />
                  <ul>
                    {question.options.map((option, oIndex) => (
                      <li key={oIndex}>
                        <input type="radio" value={option} name={`level-${index}`} disabled />
                        <span>{['매우 만족', '약간 만족', '보통이다', '약간 불만족', '매우 불만족'][oIndex]}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="question-btn-area">
                    {question.isEditing ? (
                      <BsPencilSquare className="save-question-btn" onClick={() => saveQuestion(index)} />
                    ) : (
                      <BsPencilSquare className="edit-question-btn" onClick={() => editQuestion(index)} />
                    )}
                    <MdDelete className="delete-question-btn" onClick={() => deleteQuestion(index)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='survey-regist-btn-area'>
            <button type="submit" className='survey-regist-btn'>설문 등록</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SurveyRegistration;
