import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ko from 'date-fns/locale/ko';
import './EmplPayroll.css';
import { callEmplPayAPI, callSaveEmplPayAPI } from '../../../apis/PayrollAPICalls';

registerLocale('ko', ko);
setDefaultLocale('ko');

/* 식대 고정값 */
const MEAL_ALLOWANCE = 100000;

function EmplPayroll() {
    const dispatch = useDispatch();
    const { payroll, earningCategories, deductionCategories } = useSelector(state => state.payrollReducer);

    useEffect(() => {
        dispatch(callEmplPayAPI());
    }, [dispatch]);

    // 지급일 : 선택한 달의 25일을 payrollDate로 설정
    const getPayrollDate = (selectedDate) => {
        const payrollDate = new Date(Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), 25));
        return payrollDate.toISOString().split('T')[0];
    };

    const handleSavePayroll = () => {
        if (Object.values(earningAmounts).some(empEarnings => !empEarnings || Object.values(empEarnings).some(amount => amount === undefined))) {
            alert("모든 필수 항목을 입력해주세요.");
            return;
        }

        const payrollDateString = getPayrollDate(date);

        const allPayrollData = payroll.map(employee => {
            const employeeId = employee.employeeId;

            // 각 사원의 지급 항목 계산
        const earningRecordList = filteredCategories.map(category => {
            let amount = 0;
            if (category.earningCategoryId === 101) {
                amount = Math.floor(employee.annualSalary / 12);
            } else if (category.earningCategoryId === 200) {
                amount = MEAL_ALLOWANCE;
            } else if (category.earningCategoryId === 205) {
                amount = Math.floor(employee.jobAllowance || 0);
            }
            return {
                earningCategoryId: category.earningCategoryId,
                amount: amount
            };
        });

        // 각 사원의 공제 항목 계산
        const deductionRecordList = deductionCategories.reduce((acc, category) => {
            const amount = calculateDeductionAmount(category, employeeId, acc.reduce((amounts, item) => ({...amounts, [item.deductionCategoryId]: item.amount}), {}));
            acc.push({
                deductionCategoryId: category.deductionCategoryId,
                amount: amount
            });
            return acc;
        }, []);

        return {
            employeeId: employeeId,
            payrollDate: payrollDateString,
            payStubPath: "",
            earningRecordList: earningRecordList,
            deductionRecordList: deductionRecordList
        };
        });

        // API 호출 및 응답 처리
    dispatch(callSaveEmplPayAPI(allPayrollData))
    .then(result => {
        if (result.success) {
            alert("모든 사원의 급여 정보가 저장되었습니다.");
        } else {
            alert("저장에 실패했습니다: " + result.error);
        }
    })
    .catch(error => {
        console.error("API 호출 중 예상치 못한 오류 발생:", error);
        alert("저장 중 오류가 발생했습니다.");
    });

console.log("Sending all payroll data:", allPayrollData); // 디버깅용 로그
    };

    const [option, setOption] = useState('payroll');
    const [rows, setRows] = useState([]);
    const [date, setDate] = useState(new Date());
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [earningAmounts, setEarningAmounts] = useState({});
    const [deductionAmounts, setDeductionAmounts] = useState({});

    const handleAmountChange = (employeeId, categoryId, amount, isDeduction = false) => {
        const intAmount = amount === '' ? 0 : Math.floor(Number(amount));
        if (isDeduction) {
            // 공제 항목 처리 로직 (필요시)
        } else {
            setEarningAmounts(prevAmounts => ({
                ...prevAmounts,
                [employeeId]: {
                    ...(prevAmounts[employeeId] || {}),
                    [categoryId]: intAmount
                }
            }));
        }
    };

    useEffect(() => {
        if (selectedEmployeeId && rows.earnings) {
            const selectedEmployee = payroll.find(emp => emp.employeeId === selectedEmployeeId);
            if (selectedEmployee) {
                const newEarningAmounts = { ...earningAmounts };
                newEarningAmounts[101] = Math.floor(selectedEmployee.annualSalary / 12);
                newEarningAmounts[200] = MEAL_ALLOWANCE;
                newEarningAmounts[205] = Math.floor(selectedEmployee.jobAllowance || 0);
                setEarningAmounts(newEarningAmounts);
            }
        }
    }, [selectedEmployeeId, payroll, rows.earnings]);

    useEffect(() => {
        if (selectedEmployeeId && rows.deductions) {
            const newDeductionAmounts = {};
            rows.deductions.forEach(category => {
                newDeductionAmounts[category.deductionCategoryId] = calculateDeductionAmount(category);
            });
            setDeductionAmounts(newDeductionAmounts);
        }
    }, [selectedEmployeeId, rows.deductions, earningAmounts[101]]);



    const calculateTotal = (amountsObj) => {
        return Math.floor(Object.values(amountsObj).reduce((sum, amount) => sum + (Number(amount) || 0), 0));
    };

    /* 개인사원 지급/공제 항목 총 금액 */
    const calculateTotalEarnings = () => calculateTotal(earningAmounts);
    const calculateDeductionAmount = (category, employeeId, currentDeductions) => {
        const baseSalary = earningAmounts[employeeId]?.[101] || 0;
        if (category.deductionCategoryId === 504) {
            const base502Amount = currentDeductions[502] || 0;
            return Math.floor(base502Amount * (category.deductionRate / 100));
        } else {
            return Math.floor(baseSalary * (category.deductionRate / 100));
        }
    };
    const calculateTotalDeductions = () => {
        if (!selectedEmployeeId || !deductionAmounts[selectedEmployeeId]) return 0;

        return Object.values(deductionAmounts[selectedEmployeeId]).reduce((total, amount) => total + amount, 0);
    };

    useEffect(() => {
        if (selectedEmployeeId && earningAmounts[selectedEmployeeId]) {
            console.log('Recalculating deductions for employee:', selectedEmployeeId);
            console.log('Current Earning Amounts:', earningAmounts[selectedEmployeeId]);
    
            const newDeductionAmounts = {};
            deductionCategories.forEach(category => {
                newDeductionAmounts[category.deductionCategoryId] = calculateDeductionAmount(category, selectedEmployeeId, newDeductionAmounts);
            });
    
            console.log('New Deduction Amounts:', newDeductionAmounts);
    
            setDeductionAmounts(prevAmounts => ({
                ...prevAmounts,
                [selectedEmployeeId]: newDeductionAmounts
            }));
        }
    }, [selectedEmployeeId, earningAmounts, deductionCategories]);

    /* 전체사원 지급/공제 항목 총 금액 */
    const calculateTotalEarningsForAllEmployees = () => {
        return payroll.reduce((total, emp) => {
            filteredCategories.forEach(category => {
                let amount = 0;
                if (category.earningCategoryId === 101) {
                    amount = Math.floor(emp.annualSalary / 12);
                } else if (category.earningCategoryId === 200) {
                    amount = MEAL_ALLOWANCE;
                } else if (category.earningCategoryId === 205) {
                    amount = Math.floor(emp.jobAllowance || 0);
                }
                if (category.isTax === 'Y') {
                    total.taxable[category.earningCategoryId] = (total.taxable[category.earningCategoryId] || 0) + amount;
                } else {
                    total.nonTaxable[category.earningCategoryId] = (total.nonTaxable[category.earningCategoryId] || 0) + amount;
                }
            });
            return total;
        }, { taxable: {}, nonTaxable: {} });
    };
    const calculateTotalDeductionsForAllEmployees = () => {
        return payroll.reduce((total, emp) => {
            const baseSalary = Math.floor(emp.annualSalary / 12);
            const employeeDeductions = {};
            deductionCategories.forEach(category => {
                if (category.deductionCategoryId === 504) {
                    const base502Amount = employeeDeductions[502] || 0;
                    employeeDeductions[category.deductionCategoryId] = Math.floor(base502Amount * (category.deductionRate / 100));
                } else {
                    employeeDeductions[category.deductionCategoryId] = Math.floor(baseSalary * (category.deductionRate / 100));
                }
                total[category.deductionCategoryId] = (total[category.deductionCategoryId] || 0) + employeeDeductions[category.deductionCategoryId];
            });
            return total;
        }, {});
    };
    const [totalEarnings, setTotalEarnings] = useState({ taxable: {}, nonTaxable: {} });
    const [totalDeductions, setTotalDeductions] = useState({});

    useEffect(() => {
        if (isSearchClicked) {
            setTotalEarnings(calculateTotalEarningsForAllEmployees());
            setTotalDeductions(calculateTotalDeductionsForAllEmployees());
        }
    }, [isSearchClicked, payroll, filteredCategories, deductionCategories]);



    /* 옵션: 급여 & 상여 & 급여/상여 */
    useEffect(() => {
        const filtered = earningCategories.filter(category => {
            if (option === 'payroll') return category.earningCategoryId !== 102 && category.earningCategoryId !== 204;
            if (option === 'bonus') return category.earningCategoryId === 102 || category.earningCategoryId === 204;
            return true;
        });
        setFilteredCategories(filtered);
    }, [earningCategories, option]);

    /* 조회 버튼 */
    const handleSearch = () => {
        setIsSearchClicked(true);
        const newTotalEarnings = calculateTotalEarningsForAllEmployees();
        const newTotalDeductions = calculateTotalDeductionsForAllEmployees();
        setTotalEarnings(newTotalEarnings);
        setTotalDeductions(newTotalDeductions);
    };

    /* 지급/공제 row 클릭 핸들러 */
    const handleRowClick = (emp) => {
        setSelectedEmployeeId(emp.employeeId);
        setRows({
            earnings: earningCategories.filter(category => category.employeeId === emp.employeeId),
            deductions: deductionCategories.filter(category => category.employeeId === emp.employeeId),
        });

        const newEarningAmounts = {
            // 기본급 (카테고리 ID: 101)
            101: Math.floor(emp.annualSalary / 12),
            // 식대 (카테고리 ID: 200)
            200: MEAL_ALLOWANCE,
            // 직책수당 (카테고리 ID: 205)
            205: Math.floor(emp.jobAllowance || 0),
        };
        console.log('New Earning Amounts:', newEarningAmounts);
        setEarningAmounts(prevAmounts => ({
            ...prevAmounts,
            [emp.employeeId]: newEarningAmounts
        }));

        // 공제항목 계산
    const newDeductionAmounts = {};
    deductionCategories.forEach(category => {
        newDeductionAmounts[category.deductionCategoryId] = calculateDeductionAmount(category, emp.employeeId, newDeductionAmounts);
    });
    setDeductionAmounts(prevAmounts => ({
        ...prevAmounts,
        [emp.employeeId]: newDeductionAmounts
    }));
    };
    // console.log('Deduction Amounts:', deductionAmounts);
    // console.log('Selected Employee Deductions:', deductionAmounts[selectedEmployeeId]);


    return (
        <div className="common-comp">
            <div className="title-container">
                <h2>급여자료입력</h2>
                <div className="button-container">
                    <button>수당/공제등록</button>
                    <button>재계산</button>
                    <button onClick={handleSavePayroll}>완료</button>
                </div>
            </div>
            <div className="pay-search-section">
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
                <input type="date" value={getPayrollDate(date)} disabled />
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
                            {payroll.map(emp => (
                                <tr
                                    key={emp.employeeId}
                                    onClick={() => handleRowClick(emp)}
                                    className={emp.employeeId === selectedEmployeeId ? 'selected-row' : ''}>
                                    {/* {console.log(emp)} */}
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
                                <td>{isSearchClicked ? payroll.length : ''}</td>
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
                                    <td>{category.name}</td>
                                    <td>
                                        {(earningAmounts[category.earningCategoryId] ?? 0).toLocaleString()}
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
                                <td>
                                    {filteredCategories
                                        .filter(category => category.isTax === 'Y')
                                        .reduce((total, category) => total + (earningAmounts[category.earningCategoryId] ?? 0), 0)
                                        .toLocaleString()}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ letterSpacing: '3.5px' }}>비 과 세</td>
                                <td>
                                    {filteredCategories
                                        .filter(category => category.isTax === 'N')
                                        .reduce((total, category) => total + (earningAmounts[category.earningCategoryId] ?? 0), 0)
                                        .toLocaleString()}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ letterSpacing: '1px' }}>지급액 계</td>
                                <td>{calculateTotalEarnings().toLocaleString()}</td>
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
                            {rows.deductions && deductionCategories.map((category, index) => {
                                const deductionAmount = deductionAmounts[selectedEmployeeId]?.[category.deductionCategoryId] || 0;
                                console.log(`Deduction for category ${category.name}:`, deductionAmount);

                                return (
                                    <tr key={`d_category-${index}`}>
                                        <td>{category.name}</td>
                                        <td style={{ textAlign: 'right' }}>
                                            {deductionAmount.toLocaleString()}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="tfoot-container">
                    <table className="myPay-foot-table">
                        <tfoot className="myPay-foot">
                            <tr>
                                <td style={{ letterSpacing: '1px', wordSpacing: "8px" }}>공제액 계</td>
                                <td style={{ textAlign: 'right' }}>
                                    {calculateTotalDeductions().toLocaleString()}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ letterSpacing: '1px' }}>차인지급액</td>
                                <td style={{ textAlign: 'right' }}>
                                    {(calculateTotalEarnings() - calculateTotalDeductions()).toLocaleString()}
                                </td>
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
                            {filteredCategories.map((category) => (
                                <tr key={`all-category-${category.earningCategoryId}`}>
                                    <td>{category.name}</td>
                                    <td>{category.isTax === 'Y' ? '과세' : '비과세'}</td>
                                    <td style={{ textAlign: "right" }}>
                                        {(
                                            (category.isTax === 'Y' ? totalEarnings.taxable : totalEarnings.nonTaxable)[category.earningCategoryId] ?? 0
                                        ).toLocaleString()}
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
                                <td>
                                    {Object.values(totalEarnings.taxable).reduce((a, b) => a + b, 0).toLocaleString()}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ letterSpacing: '3.5px' }}>비 과 세</td>
                                <td>
                                    {Object.values(totalEarnings.nonTaxable).reduce((a, b) => a + b, 0).toLocaleString()}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ letterSpacing: '1px' }}>지급액 계</td>
                                <td>
                                    {(
                                        Object.values(totalEarnings.taxable).reduce((a, b) => a + b, 0) +
                                        Object.values(totalEarnings.nonTaxable).reduce((a, b) => a + b, 0)
                                    ).toLocaleString()}
                                </td>
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
                            {deductionCategories.map((category, index) => (
                                <tr key={`all-deduction-${index}`}>
                                    <td>{category.name}</td>
                                    <td style={{ textAlign: "right" }}>
                                        {(totalDeductions[category.deductionCategoryId] ?? 0).toLocaleString()}
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
                                <td style={{ letterSpacing: '1px', wordSpacing: "8px" }}>공제액 계</td>
                                <td>{Object.values(totalDeductions).reduce((a, b) => a + b, 0).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td style={{ letterSpacing: '1px' }}>차인지급액</td>
                                <td>
                                    {(
                                        Object.values(totalEarnings.taxable).reduce((a, b) => a + b, 0) +
                                        Object.values(totalEarnings.nonTaxable).reduce((a, b) => a + b, 0) -
                                        Object.values(totalDeductions).reduce((a, b) => a + b, 0)
                                    ).toLocaleString()}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default EmplPayroll;