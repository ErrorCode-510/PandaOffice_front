import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './notice.css';
import { callAddNoticeAPI, callNoticeByCategoryAPI  } from '../../apis/NoticeAPICalls';

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
    viewCount: 0,  // 초기값을 0으로 설정
    status: 'Y', // 초기값을 'Y'로 설정
  });

  useEffect(() => {
  }, [formData])

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    const response = await dispatch(callAddNoticeAPI(formData));

    // 응답이 성공적으로 처리되었는지 확인
    if (response && response.status === 201) {
      const redirectUrl = `/notice/category/filter?category=${formData.category}&subCategory=${formData.subCategory}`;
      navigate(redirectUrl);

      // 목록 갱신을 위해 추가 API 호출
      await dispatch(callNoticeByCategoryAPI ({
        category: formData.category,
        subCategory: formData.subCategory,
        currentPage: 1
      }));
    } else {
      console.error('Error creating notice:', response);
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
