import { getPayroll, getEarningCategories, getDeductionCategories, success, saveEmplPay, requestStart, requestFail } from "../modules/PayrollModules";
import { authRequest, request } from "./api";

export const callEmplPayAPI = () => {
    return async (dispatch, getState) => {
        try {
            // EmplPay
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
            const result = await authRequest.post('/payroll/save-emplpay', payrollData);

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
            dispatch(requestFail(error));
            return { success: false, error: error.message };
        }
    };
};