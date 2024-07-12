import { authRequest } from './api';
import { getNotice, getNoticeByCategory, setNotice, addNotice } from '../modules/NoticeModules';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

/* 공지사항 전체 조회 API */
export const callNoticeListAPI = ({ currentPage }) => {

    return async (dispatch, getState) => {
        const result = await authRequest.get(`/notice/notices?page=${currentPage}`);
        console.log(`Fetching all notices for page: ${currentPage}`);

        if (result.status === 200) {
            dispatch(getNotice(result));
            return result.data;  // tatalPages 값을 얻기 위해 반환
        } else {
            console.error('callNoticeListAPI error : ', result);
        }
    };
};

/* 공지사항 상세 조회 API */
export const callNoticeDetailAPI = (noticeId) => {
    return async (dispatch, getState) => {
        
        const result = await authRequest.get(`/notice/notices/${noticeId}`);
        if (result.status === 200) {
            dispatch(setNotice(result));
        } else {
            console.error('callNoticeDetailAPI error : ', result);
        }
    };
}

/* 카테고리 별 공지사항 조회 API (사이드바) */
export const callNoticeByCategoryAPI = ({ category, subCategory, currentPage }) => {
    return async (dispatch, getState) => {
        try {
            const apiUrl = `/notice/category/filter?category=${category}&subCategory=${subCategory}&page=${currentPage}`;
            console.log(`API 요청 URL ${apiUrl}`);
            const result = await authRequest.get(apiUrl);
            console.log(`API 응답: `, result);

            if (result.status === 200) {
                dispatch(getNoticeByCategory({
                    category,
                    subCategory,
                    data: result.data
                }));
                console.log('getNoticeByCategory 액션을 데이터와 함께 디스패치:', result.data);
                return result.data;
            } else {
                console.error('callNoticeByCategoryAPI error : ', result);
            }
        } catch (error) {
            console.error('callNoticeByCategoryAPI error : ', error);
        }
    };
}

/* 공지사항 등록 API */
// callAddNoticeAPI.js

export const callAddNoticeAPI = createAsyncThunk(
    'notices/addNotice',
    async (formData, thunkAPI) => {
      try {
        const response = await axios.post('http://localhost:8001/notice/regist', formData, {
          
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        
        if (response.status !== 201) {
            return thunkAPI.rejectWithValue(response.data.message || 'Error adding notice');
          }
    
          return response.data;
        } catch (error) {
          return thunkAPI.rejectWithValue(error.message);
        }
      }
    );
  
