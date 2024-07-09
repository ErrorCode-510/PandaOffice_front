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
    return async (dispatch, getState) => {
        dispatch(requestStart());

        try {
            const response = await authRequest.post('/payroll/save-emplpay', payrollData);

            if (response.status === 201) {
                const result = await response.json();
                console.log('[PayrollAPICalls] callSaveEmplPayAPI RESULT:', result);
                dispatch(saveEmplPay(result));
                dispatch(success());
                return { success: true, data: result }; // 호출자에게 성공 여부와 데이터 반환
            } else {
                const errorText = await response.text(); // 다른 상태 코드의 경우 텍스트로 오류 메시지를 읽어올 수 있음
                console.error('Unexpected status:', response.status, errorText);
                dispatch(requestFail(`Unexpected status: ${response.status}`));
                return { success: false, error: `Unexpected status: ${response.status}` };
            }
        } catch (error) {
            console.error('Error in callSaveEmplPayAPI:', error);
            dispatch(requestFail(error.message));
            return { success: false, error: error.message }; // 호출자에게 실패 이유 반환
        }
    };
};