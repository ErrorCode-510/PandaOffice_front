import React, { useState } from 'react';
import './MyPay.css';

function MyPay() {
    const [rows, setRows] = useState([]);
    const [date, setDate] = useState('2024-07-15');
    const [employee, setEmployee] = useState({ id: '2314012', name: '이다온' });
    const [salary, setSalary] = useState({ base: 2500000, meal: 100000 });
    const [deductions, setDeductions] = useState({ nationalPension: 112500, healthInsurance: 83370, employmentInsurance: 20000, longTermCare: 8540 });

    const totalSalary = salary.base + salary.meal;
    const totalDeductions = Object.values(deductions).reduce((acc, curr) => acc + curr, 0);
    const netSalary = totalSalary - totalDeductions;

    const generateRow = (category, amount, categoryType) => ({
        id: rows.length + 1,
        categoryType: categoryType, // 지급, 공제 항목 구분
        column1: category,
        column2: amount.toLocaleString()
    });

    const addRow = (category, amount, categoryType) => {
        const newRow = generateRow(category, amount, categoryType);
        setRows(prevRows => [...prevRows, newRow]);
    };

    useState(() => {
        addRow('기본급', salary.base, 'payment');
        addRow('식대', salary.meal, 'payment');
        addRow('연장근로수당', 0, 'payment');
        addRow('휴일근로수당', 0, 'payment');
        addRow('직책수당', 0, 'payment');
        addRow('국민연금', deductions.nationalPension, 'deduction');
        addRow('건강보험', deductions.healthInsurance, 'deduction');
        addRow('고용보험', deductions.employmentInsurance, 'deduction');
        addRow('장기요양보험', deductions.longTermCare, 'deduction');
    }, []);

    return (
        <>
            <div className="common-comp">
                <h2>급여조회</h2>
                <div className="search-section">
                    <span>지급연월</span>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} />
                    <span>지급구분</span>
                    <select className="select-pay">
                        <option value="payroll">급여</option>
                        <option value="bonus">상여</option>
                        <option value="payrollandbonus">급여 + 상여</option>
                    </select>
                    <span>대상자</span>
                    <input type="text" value={employee.id} readOnly disabled />
                    <input type="text" value={employee.name} readOnly disabled />
                    <button type="submit">조회</button>
                </div>

                <div className="table-combine">
                    <h3>지급항목</h3>
                    <div className="table-container">
                        <table id="data-table" className="data-table">
                            <thead>
                                <tr>
                                    <th>수당구분</th>
                                    <th>금액</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.filter(row => row.categoryType === 'payment').map((row, index) => (
                                    <tr key={`payment-${index}`}>
                                        <td>{row.column1}</td>
                                        <td>{row.column2}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="tfoot-container">
                        <table className="myPay-foot-table">
                            <tfoot className="myPay-foot">
                                <tr>
                                    <td style={{ letterSpacing: '18px', paddingLeft: "22px" }}>과 세</td>
                                    <td>{totalSalary.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td style={{ letterSpacing: '3.5px' }}>비 과 세</td>
                                    <td>0</td>
                                </tr>
                                <tr>
                                    <td style={{ letterSpacing: '1px' }}>지급액 계</td>
                                    <td>{totalSalary.toLocaleString()}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>



                <div className="table-combine">
                    <h3>공제항목</h3>
                    <div className="additional-container">
                        <table id="data-table" className="data-table">
                            <thead>
                                <tr>
                                    <th>수당구분</th>
                                    <th>금액</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.filter(row => row.categoryType === 'deduction').map((row, index) => (
                                    <tr key={`deduction-${index}`}>
                                        <td>{row.column1}</td>
                                        <td>{row.column2}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                    <div className="tfoot-container">
                        <table className="myPay-foot-table">
                            <tfoot className="myPay-foot">
                                <tr>
                                    <td style={{ letterSpacing: '1px', wordSpacing: "8px" }}>공제액 계</td>
                                    <td>{totalDeductions.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td style={{ letterSpacing: '1px' }}>차인지급액</td>
                                    <td>{netSalary.toLocaleString()}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>


                <div className="result-table-combine">
                    <h3>계산결과</h3>
                    <div className="combine-container">
                        <table className="combine-table">
                            <tbody>
                                <tr>
                                    <td className="pay-title">소속부서</td>
                                    <td className="pay-detail"><input type="text" /></td>
                                </tr>
                                <tr>
                                    <td className="pay-title">직위</td>
                                    <td className="pay-detail"><input type="text" /></td>
                                </tr>
                                <tr className="spacer-row"><td colSpan="2"></td></tr>
                                <tr>
                                    <td className="pay-title">지급총액</td>
                                    <td className="pay-detail"><input type="text" /></td>
                                </tr>
                                <tr>
                                    <td className="pay-title">야간근로비과세</td>
                                    <td className="pay-detail"><input type="text" /></td>
                                </tr>
                                <tr>
                                    <td className="pay-title">해외근로비과세</td>
                                    <td className="pay-detail"><input type="text" /></td>
                                </tr>
                                <tr>
                                    <td className="pay-title">기타비과세</td>
                                    <td className="pay-detail"><input type="text" /></td>
                                </tr>
                                <tr>
                                    <td className="pay-title">공제총액</td>
                                    <td className="pay-detail"><input type="text" /></td>
                                </tr>
                                <tr>
                                    <td className="pay-title">차인지급액</td>
                                    <td className="pay-detail"><input type="text" /></td>
                                </tr>
                                <tr className="spacer-row"><td colSpan="2"></td></tr>
                                <tr>
                                    <td className="pay-title">은행</td>
                                    <td className="pay-detail"><input type="text" /></td>
                                </tr>
                                <tr>
                                    <td className="pay-title">계좌번호</td>
                                    <td className="pay-detail"><input type="text" /></td>
                                </tr>
                                <tr>
                                    <td className="pay-title">계좌이름</td>
                                    <td className="pay-detail"><input type="text" /></td>
                                </tr>
                                <tr className="spacer-row"><td colSpan="2"></td></tr>
                                <tr>
                                    <td className="pay-title" style={{ textAlign: "center" }}>특이사항</td>
                                    <td className="pay-detail" style={{ height: "127px" }}><input type="text" style={{ height: "90%" }} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyPay;