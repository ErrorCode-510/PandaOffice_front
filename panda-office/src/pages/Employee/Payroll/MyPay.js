import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callMyPayAPI } from '../../../apis/PayrollAPICalls';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import './MyPay.css';

function MyPay() {
    const dispatch = useDispatch();
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [paymentType, setPaymentType] = useState('payroll');
    const { mypay } = useSelector(state => state.payrollReducer);

    useEffect(() => {
        dispatch(callMyPayAPI());
    }, [dispatch]);

    const earningRecords = mypay?.earningRecordList || [];
    const deductionRecords = mypay?.deductionRecordList || [];

    const { taxableEarnings, nonTaxableEarnings } = earningRecords.reduce((acc, record) => {
        if (record.earningCategory.isTax === 'Y') {
            acc.taxableEarnings += record.amount;
        } else {
            acc.nonTaxableEarnings += record.amount;
        }
        return acc;
    }, { taxableEarnings: 0, nonTaxableEarnings: 0 });

    const totalEarnings = taxableEarnings + nonTaxableEarnings;
    const totalDeductions = deductionRecords.reduce((acc, record) => acc + record.amount, 0);
    const netSalary = totalEarnings - totalDeductions;

    useEffect(() => {
        if (mypay?.payrollDate) {
            setSelectedDate(new Date(mypay.payrollDate));
        }
    }, [mypay?.payrollDate]);

    const handleSearch = () => {
        if (selectedDate) {
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const searchDate = `${year}-${month}`;
            dispatch(callMyPayAPI({ payrollDate: searchDate }));
        }
    };

    return (
        <div className="common-comp">
            <div className="title-container">
                <h2>급여조회</h2>
            </div>
            <div className="pay-search-section">
                <span className="mypay-span">지급연월</span>
                <DatePicker
                    selected={selectedDate}
                    onChange={setSelectedDate}
                    dateFormat="yyyy-MM"
                    showMonthYearPicker
                    locale="ko"
                    className="custom-date-picker"
                />
                <span className="mypay-span">지급구분</span>
                <select className="select-pay" value={paymentType} onChange={e => setPaymentType(e.target.value)}>
                    <option value="payroll">급여</option>
                </select>
                <span className="mypay-span">대상자</span>
                <input type="text" defaultValue={mypay?.employeeId || ''} readOnly disabled />
                <input type="text" defaultValue={mypay?.employeeName || ''} readOnly disabled />
                <button type="button" onClick={handleSearch}>조회</button>
            </div>

            <div className="table-combine">
                <h3>지급항목</h3>
                <div className="empl-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>수당구분</th>
                                <th>금액</th>
                            </tr>
                        </thead>
                        <tbody>
                            {earningRecords.map((record, index) => (
                                <tr key={`earning-${index}`}>
                                    <td>{record.earningCategory?.name || ''}</td>
                                    <td>{record.amount.toLocaleString()}</td>
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
                                <td>{taxableEarnings.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td style={{ letterSpacing: '3.5px' }}>비 과 세</td>
                                <td>{nonTaxableEarnings.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td style={{ letterSpacing: '1px' }}>지급액 계</td>
                                <td>{totalEarnings.toLocaleString()}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div className="table-combine">
                <h3>공제항목</h3>
                <div className="additional-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>수당구분</th>
                                <th>금액</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deductionRecords.map((record, index) => (
                                <tr key={`deduction-${index}`}>
                                    <td>{record.deductionCategory?.name || ''}</td>
                                    <td>{record.amount.toLocaleString()}</td>
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
                                <td className="pay-detail">
                                    <input type="text" defaultValue={mypay?.departmentName || ''} readOnly />
                                </td>
                            </tr>
                            <tr>
                                <td className="pay-title">직위</td>
                                <td className="pay-detail">
                                    <input type="text" defaultValue={mypay?.jobTitle || ''} readOnly />
                                </td>
                            </tr>
                            <tr className="spacer-row"><td colSpan="2"></td></tr>
                            <tr>
                                <td className="pay-title">지급총액</td>
                                <td className="pay-detail">
                                    <input
                                        type="text"
                                        value={totalEarnings.toLocaleString()}
                                        readOnly
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="pay-title">야간근로비과세</td>
                                <td className="pay-detail">
                                    <input type="text" readOnly />
                                </td>
                            </tr>
                            <tr>
                                <td className="pay-title">해외근로비과세</td>
                                <td className="pay-detail"><input type="text" readOnly /></td>
                            </tr>
                            <tr>
                                <td className="pay-title">기타비과세</td>
                                <td className="pay-detail"><input type="text" readOnly /></td>
                            </tr>
                            <tr>
                                <td className="pay-title">공제총액</td>
                                <td className="pay-detail">
                                    <input
                                        type="text"
                                        value={totalDeductions.toLocaleString()}
                                        readOnly
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="pay-title">차인지급액</td>
                                <td className="pay-detail">
                                    <input
                                        type="text"
                                        value={netSalary.toLocaleString()}
                                        readOnly
                                    />
                                </td>
                            </tr>
                            <tr className="spacer-row"><td colSpan="2"></td></tr>
                            <tr>
                                <td className="pay-title">은행</td>
                                <td className="pay-detail">
                                    <input type="text" defaultValue={mypay?.bankName || ''} readOnly />
                                </td>
                            </tr>
                            <tr>
                                <td className="pay-title">계좌번호</td>
                                <td className="pay-detail">
                                    <input type="text" defaultValue={mypay?.accountNumber || ''} readOnly />
                                </td>
                            </tr>
                            <tr>
                                <td className="pay-title">예금주</td>
                                <td className="pay-detail">
                                    <input type="text" defaultValue={mypay?.employeeName || ''} readOnly />
                                </td>
                            </tr>
                            <tr className="spacer-row"><td colSpan="2"></td></tr>
                            <tr>
                                <td className="pay-title" style={{ textAlign: "center" }}>특이사항</td>
                                <td className="pay-detail" style={{ height: "127px" }}>
                                    <input type="text" style={{ height: "90%" }} readOnly />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyPay;