import { getPayroll, getEarningCategories, getDeductionCategories, getMyPay, success, saveEmplPay, requestStart, requestFail } from "../modules/PayrollModules";
import { authRequest, request } from "./api";
import { getMemberId } from "../utils/TokenUtils";

export const callEmplPayAPI = () => {
    return async (dispatch, getState) => {
        try {
            // 전체 사원 조회
            const payrollResult = await request('GET', `/payroll/all-emplpayroll`);
            console.log('payrollResult:', payrollResult);

            if (payrollResult.status === 200 || payrollResult.status === 201) {
                dispatch(getPayroll(payrollResult.data));
            }

            // 지급항목 카테고리
            const earningCategoryResult = await request('GET', `/payroll/earning-category`);
            console.log('earningCategoryResult:', earningCategoryResult);

            if (earningCategoryResult.status === 200 || earningCategoryResult.status === 201) {
                dispatch(getEarningCategories(earningCategoryResult.data));
            }

            // 공제항목 카테고리
            const deductionCategoryResult = await request('GET', `/payroll/deduction-category`);
            console.log('deductionCategoryResult :', deductionCategoryResult);

            if (deductionCategoryResult.status === 200 || deductionCategoryResult.status === 201) {
                dispatch(getDeductionCategories(deductionCategoryResult.data));
            }

            dispatch(success());
        } catch (error) {
            console.error('Error :', JSON.stringify(error));
        }
    };
};

/* 사원 급여 등록 */
export const callSaveEmplPayAPI = (payrollData) => {
    return async (dispatch) => {
        dispatch(requestStart());
        try {
            const formattedPayrollData = payrollData.map(payroll => ({
                employeeId: payroll.employeeId,
                payrollDate: payroll.payrollDate,
                payStubPath: payroll.payStubPath || "",
                earningRecordList: payroll.earningRecordList.map(earning => ({
                    earningCategoryId: earning.earningCategoryId,
                    amount: earning.amount
                })),
                deductionRecordList: payroll.deductionRecordList.map(deduction => ({
                    deductionCategoryId: deduction.deductionCategoryId,
                    amount: deduction.amount
                }))
            }));

            console.log('Formatted Payroll Data:', formattedPayrollData);

            const result = await authRequest.post('/payroll/save-emplpay', formattedPayrollData);

            console.log('[PayrollAPICalls] callSaveEmplPayAPI RESULT : ', result);

            if (result.status === 201) {
                dispatch(saveEmplPay(result.data));
                dispatch(success());
                return { success: true, data: result.data };
            } else {
                dispatch(requestFail({ error: 'Unexpected result status' }));
                return { success: false, error: 'Unexpected result status' };
            }
        } catch (error) {
            console.error('[PayrollAPICalls] callSaveEmplPayAPI ERROR : ', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
                dispatch(requestFail(error.response.data));
                return { success: false, error: error.response.data };
            } else {
                dispatch(requestFail({ error: error.message || 'An unexpected error occurred' }));
                return { success: false, error: error.message || 'An unexpected error occurred' };
            }
        }
    };
};

/* 개인조회 */
export const callMyPayAPI = () => {
    return async (dispatch, getState) => {
        try {
            const employeeId = getMemberId();
            // 사원 급여 조회
            const mypayResult = await request('GET', `/payroll/mypay/${employeeId}`);
            console.log('mypayResult:', mypayResult);
            if (mypayResult.status === 200 || mypayResult.status === 201) {
                dispatch(getMyPay(mypayResult.data));
            }
            dispatch(success());
        } catch (error) {
            console.error('Error :', JSON.stringify(error));
        }
    }
}