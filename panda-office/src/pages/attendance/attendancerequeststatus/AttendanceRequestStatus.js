import React from 'react';
import './AttendanceRequestStatus.css';

const AttendanceRequestStatus = () => {
    return (
        <div className="attendance-request-status">
            <div className="header">
                <span>내 근태 신청 현황</span>
                <span className="current-date">현재 날짜 : 2024.06.03</span>
            </div>
            <div className="content">
                <div className="user-info">
                    <img src="user-image.png" alt="User" />
                    <span>이시호 부장</span>
                </div>
                <div className="leave-stats">
                    <div className="stat">
                        <span>지각</span>
                        <span>1</span>
                    </div>
                    <div className="stat">
                        <span>연장 근무</span>
                        <span>1</span>
                    </div>
                    <div className="stat">
                        <span>휴일 근무</span>
                        <span>1</span>
                    </div>
                    <div className="stat">
                        <span>연차</span>
                        <span>5</span>
                    </div>
                    <div className="stat">
                        <span>총합</span>
                        <span>8</span>
                    </div>
                </div>
            </div>
            <div className="attendance-search">
                <label>조회 기간</label>
                <input type="date" />
                <span>~</span>
                <input type="date" />
                <button type="button">검색</button>
            </div>
            <div className="leave-history">
                <h2 className="left-align">지각: 총 2건</h2>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>근태 구분</th>
                            <th>시작일자 ~ 종료일자</th>
                            <th>소요 시간</th>
                            <th>작성 일자</th>
                            <th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>지각</td>
                            <td>2024-03-01 09:00 ~ 2024-03-02 09:32</td>
                            <td>0:32</td>
                            <td>2024-02-15</td>
                            <td>결재 완료</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>지각</td>
                            <td>2024-02-27 09:00 ~ 2024-02-27 18:00</td>
                            <td>8:00</td>
                            <td>2024-02-20</td>
                            <td>결재 진행</td>
                        </tr>
                    </tbody>
                </table>
                <h2 className="left-align">연장 근무 신청 현황: 총 2건</h2>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>근태 구분</th>
                            <th>시작일자 ~ 종료일자</th>
                            <th>소요 시간</th>
                            <th>작성 일자</th>
                            <th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>대체 근무</td>
                            <td>2024-03-01 18:00 ~ 2024-03-02 21:00</td>
                            <td>1:00</td>
                            <td>2024-02-15</td>
                            <td>결재 완료</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>휴일 근무</td>
                            <td>2024-02-27 09:00 ~ 2024-02-27 18:00</td>
                            <td>8:00</td>
                            <td>2024-02-20</td>
                            <td>결재 진행</td>
                        </tr>
                    </tbody>
                </table>
                <h2 className="left-align">연차 신청 현황: 총 2건</h2>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>연차 구분</th>
                            <th>시작일자 ~ 종료일자</th>
                            <th>소요 일</th>
                            <th>작성 일자</th>
                            <th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>기본 발생</td>
                            <td>2024-03-14 ~ 2024-03-15</td>
                            <td>2일</td>
                            <td>2024-03-10</td>
                            <td>결재 완료</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>대체 연차</td>
                            <td>2024-03-16 09:00 ~ 2024-03-16 13:00</td>
                            <td>0.5일</td>
                            <td>2024-03-10</td>
                            <td>결재 완료</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AttendanceRequestStatus;
