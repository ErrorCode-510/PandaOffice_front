import React from 'react';
import './AnnualLeaveRecord.css';

const AnnualLeaveRecord = () => {
    return (
        <div className="annual-leave-record">
            <div className="header">
                <span>내 연차 내역</span>
                <span className="current-date">현재 날짜 : 2024.06.03</span>
            </div>
            <div className="content">
                <div className="user-info">
                    <img src="user-image.png" alt="User" />
                    <span>이시호 부장</span>
                </div>
                <div className="leave-stats">
                    <div className="stat">
                        <span>발생 연차</span>
                        <span>15</span>
                    </div>
                    <div className="stat">
                        <span>부여 연차</span>
                        <span>0</span>
                    </div>
                    <div className="stat">
                        <span>총 연차</span>
                        <span>15</span>
                    </div>
                    <div className="stat">
                        <span>사용 연차</span>
                        <span>1</span>
                    </div>
                    <div className="stat">
                        <span>잔여 연차</span>
                        <span>14</span>
                    </div>
                </div>
            </div>
            <div className="annual-leave-search">
                <label>연차 사용기간</label>
                <input type="date" />
                <span>~</span>
                <input type="date" />
                <button type="button">검색</button>
            </div>
            <div className="leave-history">
                <h2>사용 내역</h2>
                <table>
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>부서명</th>
                            <th>휴가 종류</th>
                            <th>연차 사용기간</th>
                            <th>사용 연차</th>
                            <th>내용</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>이시호</td>
                            <td>인사팀</td>
                            <td>보상 연차</td>
                            <td>2024-06-03 ~ 2024-06-03</td>
                            <td>1</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>이시호</td>
                            <td>인사팀</td>
                            <td>대체 연차</td>
                            <td>2024-05-31 ~ 2024-05-31</td>
                            <td>0</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <h2>생성 내역</h2>
                <table>
                    <thead>
                        <tr>
                            <th>등록일</th>
                            <th>유효 기간</th>
                            <th>발생 일수</th>
                            <th>내용</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2024-01-01</td>
                            <td>2025-12-31</td>
                            <td>15</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AnnualLeaveRecord;
