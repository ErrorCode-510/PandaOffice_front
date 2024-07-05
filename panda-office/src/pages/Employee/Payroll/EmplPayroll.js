import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ko from 'date-fns/locale/ko';
import './EmplPayroll.css';
import './MyPay';
import { callEmplPayAPI } from '../../../apis/PayrollAPICalls';

registerLocale('ko', ko);
setDefaultLocale('ko');

function EmplPayroll() {

    const dispatch = useDispatch();
    const { payroll, earningCategories, deductionCategories } = useSelector(state => state.payrollReducer);

    useEffect(() => {
        dispatch(callEmplPayAPI());
    }, [dispatch]);

    const employees = payroll;
    const e_category = earningCategories;
    const d_category = deductionCategories;

    const [option, setOption] = useState('payroll');
    const [rows, setRows] = useState([]);
    const [date, setDate] = useState(new Date());
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [categoryAmounts, setCategoryAmounts] = useState({});

    const handleAmountChange = (categoryId, amount) => {
        setCategoryAmounts(prevAmounts => ({
            ...prevAmounts,
            [categoryId]: amount
        }));
    };

    const calculateTotal = () => {
        return Object.values(categoryAmounts).reduce((sum, amount) => sum + Number(amount || 0), 0);
    };

    useEffect(() => {
        const filtered = e_category.filter(category => {
            if (option === 'payroll') {
                return category.earningCategoryId !== 102 && category.earningCategoryId !== 204;
            } else if (option === 'bonus') {
                return category.earningCategoryId === 102 || category.earningCategoryId === 204;
            } else if (option === 'payrollandbonus') {
                return true;
            }
        });
        setFilteredCategories(filtered);
    }, [e_category, option]);

    const handleRowClick = (emp) => {
        setSelectedEmployeeId(emp.employeeId);
        setRows({
            earnings: earningCategories.filter(category => category.employeeId === emp.employeeId),
            deductions: deductionCategories.filter(category => category.employeeId === emp.employeeId),
        });
    };

    const handleSearch = () => {
        setIsSearchClicked(true);
    };


    const fixedPaymentDate = new Date(date.getFullYear(), date.getMonth(), 26);
    const displayDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

    return (
        <div className="common-comp">
            <div className="title-container">
                <h2>급여자료입력</h2>
                <div className="button-container">
                    <button>수당/공제등록</button>
                    <button>재계산</button>
                    <button>완료</button>
                </div>
            </div>
            <div className="search-section">
                <span className="mypay-span">귀속연월</span>
                <DatePicker
                    selected={date}
                    onChange={setDate}
                    dateFormat="yyyy-MM"
                    showMonthYearPicker
                    locale="ko"
                    className="custom-date-picker"
                />
                <span className="mypay-span" style={{ marginLeft: "40px" }}>지급구분</span>
                <select className="select-pay" value={option} onChange={(e) => setOption(e.target.value)}>
                    <option value="payroll">급여</option>
                    <option value="bonus">상여</option>
                    <option value="payrollandbonus">급여 + 상여</option>
                </select>
                <span className="mypay-span">지급일</span>
                <input type="date" value={fixedPaymentDate.toISOString().split('T')[0]} disabled />
                <button type="submit" onClick={handleSearch}>조회</button>
            </div>

            <div className="emplPay-table-combine">
                <h3>사원</h3>
                <div className="emplPay-table-container">
                    <table className="emplPay-data-table">
                        <thead>
                            <tr>
                                <th>코드</th>
                                <th>이름</th>
                                <th>직급</th>
                            </tr>
                        </thead>
                        <tbody style={{ display: isSearchClicked ? 'table-row-group' : 'none' }}>
                            {employees.map(emp => (
                                <tr
                                    key={emp.employeeId}
                                    onClick={() => handleRowClick(emp)}
                                    className={emp.employeeId === selectedEmployeeId ? 'selected-row' : ''}>
                                    {console.log(emp)}
                                    <td>{emp.employeeId}</td>
                                    <td>{emp.name}</td>
                                    <td>{emp.jobTitle}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="tfoot-container">
                    <table className="emplPay-foot-table">
                        <tfoot className="emplPay-foot">
                            <tr>
                                <td style={{ letterSpacing: '18px', paddingLeft: "22px" }}>인원</td>
                                <td>{employees.length}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div className="emplPay-table-combine">
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
                            {rows.earnings && filteredCategories.map((category) => (
                                <tr key={`filtered-category-${category.earningCategoryId}`}>
                                    {console.log('e_category:', e_category)}
                                    <td>{category.name}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={categoryAmounts[category.earningCategoryId] || ''}
                                            onChange={(e) => handleAmountChange(category.earningCategoryId, e.target.value)}
                                        />
                                    </td>
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
                                <td></td>
                            </tr>
                            <tr>
                                <td style={{ letterSpacing: '3.5px' }}>비 과 세</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td style={{ letterSpacing: '1px' }}>지급액 계</td>
                                <td>{calculateTotal()}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div className="emplPay-table-combine">
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
                            {rows.deductions && d_category.map((category, index) => (
                                <tr key={`d_category-${index}`}>
                                    {/* {console.log('d_category:', d_category)} */}
                                    <td>{category.name}</td>
                                    <td>{category.deducationRate}</td>
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
                                <td></td>
                            </tr>
                            <tr>
                                <td style={{ letterSpacing: '1px' }}>차인지급액</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div className="emplAll-table-combine">
                <h3>전체 합계</h3>
                <div className="emplAll-container">
                    <table className="emplAll-data-table">
                        <thead>
                            <tr>
                                <th>지급항목</th>
                                <th>TX</th>
                                <th>금액</th>
                            </tr>
                        </thead>
                        <tbody style={{ display: isSearchClicked ? 'table-row-group' : 'none' }}>
                            <tr>
                                <td>sdf</td>
                                <td>sdf</td>
                                <td style={{ textAlign: "right" }}>sdf</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="tfoot-container">
                    <table className="myPay-foot-table">
                        <tfoot className="myPay-foot">
                            <tr>
                                <td style={{ letterSpacing: '18px', paddingLeft: "22px" }}>과 세</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td style={{ letterSpacing: '3.5px' }}>비 과 세</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td style={{ letterSpacing: '1px' }}>지급액 계</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div className="emplAll-container" style={{ marginTop: "20px" }}>
                    <table className="emplAll-data-table">
                        <thead>
                            <tr>
                                <th>공제항목</th>
                                <th>금액</th>
                            </tr>
                        </thead>
                        <tbody style={{ display: isSearchClicked ? 'table-row-group' : 'none' }}>
                            <tr>
                                <td>sdf</td>
                                <td style={{ textAlign: "right" }}>sdf</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="tfoot-container">
                    <table className="myPay-foot-table">
                        <tfoot className="myPay-foot">
                            <tr>
                                <td style={{ letterSpacing: '1px', wordSpacing: "8px" }}>공제액 계</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td style={{ letterSpacing: '1px' }}>차인지급액</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default EmplPayroll;