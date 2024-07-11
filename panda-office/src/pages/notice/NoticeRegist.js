import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './notice.css';
import axios from 'axios';

const categories = {
  전체공지: [],
  그룹공지: ['회계', '영업', '인사', '마케팅', '기획'],
  경조사: ['결혼', '부고', '돌잔치'],
};

const NoticeRegist = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    subCategory: '',
    status: 'Y', // 초기값을 'Y'로 설정
    employeeId: '201211001',
    postedDate: new Date().toISOString().split('T')[0],  // 현재 날짜
  });

  useEffect(() => {
    console.log("실시간 확인: " + JSON.stringify(formData))
  }, [formData])

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const employeeId = useSelector((state) => state.auth.employeeId);

  // useEffect(() => {
  //   if (employeeId) {
  //     setFormData((prevData) => ({ ...prevData, employeeId: parseInt(employeeId, 10) }));
  //   }
  // }, [employeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      ...(name === 'category' && { subCategory: '' }),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8001/notice/regist', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        if (formData.category === '전체공지') {
          navigate('/notice/all-notice');
        } else if (formData.category === '그룹공지') {
          if (formData.subCategory) {
            navigate(`/notice/group/${encodeURIComponent(formData.subCategory)}`);
          } else {
            navigate('/notice/group-notice');
          }
        } else if (formData.category === '경조사') {
          if (formData.subCategory) {
            navigate(`/notice/event/${encodeURIComponent(formData.subCategory)}`);
          } else {
            navigate('/notice/event-notice');
          }
        }
      }
    } catch (error) {
      console.error('Error creating notice:', error);
    }
  };

  const handleCancel = () => {
    navigate(-1);  // 바로 이전 페이지로 이동
  }

  return (
    <div className="notice-create">
      <h2>공지사항 등록</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">---분류---</option>
            {Object.keys(categories).map((cat) => (
              <option value={cat} key={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        {formData.category && categories[formData.category].length > 0 && (
          <div>
            <select name="subCategory" value={formData.subCategory} onChange={handleChange} required>
              <option value="">---소분류---</option>
              {categories[formData.category].map((sub) => (
                <option value={sub} key={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label>제목</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>내용</label>
          <textarea name="content" value={formData.content} onChange={handleChange} required></textarea>
        </div>
        <div>
          <label>공개설정</label>
          <div>
            <label>
              <input type="radio" name="status" value="Y" checked={formData.status === 'Y'} onChange={handleChange} /> Y
            </label>
            <label>
              <input type="radio" name="status" value="N" checked={formData.status === 'N'} onChange={handleChange} /> N
            </label>
          </div>
        </div>
        <button type="submit">등록</button>
        <button type="button" onClick={handleCancel}>취소</button>
      </form>
    </div>
  );
};

export default NoticeRegist;
