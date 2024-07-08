import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AnnualLeaveAdjustment.css';
import AnnualLeaveHistory from './AnnualLeaveHistory';

const AnnualLeaveAdjustment = () => {
    const [selectedYear, setSelectedYear] = useState(new Date());

    const handleYearChange = (date) => {
        setSelectedYear(date);
    };

    return (
        <div className="annual-leave-adjustment">
            <div className="header">
                <h2>연차 조정</h2>
            </div>
            <div className="search-bar">
                <label>귀속년도</label>
                <DatePicker
                    selected={selectedYear}
                    onChange={handleYearChange}
                    showYearPicker
                    dateFormat="yyyy"
                    className="year-picker"
                />
                <button type="button" className="search-button">조회</button>
            </div>
            <div className="leave-info">
                <h2>연차 정보</h2>
                <table>
                    <thead>
                        <tr>
                            <th rowSpan="2">번호</th>
                            <th rowSpan="2">부서</th>
                            <th rowSpan="2">직급</th>
                            <th rowSpan="2">사원</th>
                            <th rowSpan="2">그룹입사일</th>
                            <th rowSpan="2">근속기간</th>
                            <th colSpan="6">부여</th>
                            <th colSpan="5">소진</th>
                            <th rowSpan="2" className="rounded-right">잔여</th>
                        </tr>
                        <tr>
                            <th className="no-radius">기본발생</th>
                            <th>가산</th>
                            <th>1년미만</th>
                            <th>보상</th>
                            <th>대체</th>
                            <th className="no-radius">합계</th>
                            <th>기본사용</th>
                            <th>1년미만</th>
                            <th>보상</th>
                            <th>대체</th>
                            <th className="no-radius">합계</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>인사팀</td>
                            <td>부장</td>
                            <td>박지연</td>
                            <td>2020-01-01</td>
                            <td>4년</td>
                            <td>15</td>
                            <td>1</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>16</td>
                            <td>2</td>
                            <td></td>
                            <td></td>
                            <td>2</td>
                            <td>4</td>
                            <td>4</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>인사팀</td>
                            <td>슈퍼바이저</td>
                            <td>윤승희</td>
                            <td>2021-01-01</td>
                            <td>3년</td>
                            <td>15</td>
                            <td></td>
                            <td></td>
                            <td>1</td>
                            <td></td>
                            <td>16</td>
                            <td>2</td>
                            <td></td>
                            <td>1</td>
                            <td>2</td>
                            <td>5</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>인사팀</td>
                            <td>매니저</td>
                            <td>이나라</td>
                            <td>2021-01-01</td>
                            <td>1년 미만</td>
                            <td>11</td>
                            <td></td>
                            <td>1</td>
                            <td></td>
                            <td></td>
                            <td>12</td>
                            <td>1</td>
                            <td></td>
                            <td></td>
                            <td>1</td>
                            <td>2</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>인사팀</td>
                            <td>팀장</td>
                            <td>최용수</td>
                            <td>2021-11-01</td>
                            <td>2년 2개월</td>
                            <td>15</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>15</td>
                            <td>2</td>
                            <td></td>
                            <td></td>
                            <td>2</td>
                            <td>4</td>
                            <td>4</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <AnnualLeaveHistory />
        </div>
    );
};

export default AnnualLeaveAdjustment;
