import { getPayroll, getEarningCategories, getDeductionCategories, success, setPayroll, requestStart, requestFail } from "../modules/PayrollModules";
import { request } from "./api";
import { getMemberId } from "../utils/TokenUtils";

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
            const earningCategoryResult  = await request('GET', `/payroll/earning-category`);
            console.log('earningCategoryResult:', earningCategoryResult );

            if (earningCategoryResult.status === 200 || earningCategoryResult.status === 201) {
                dispatch(getEarningCategories(earningCategoryResult.data));
            }

            // 공제항목 카테고리
            const deductionCategoryResult  = await request('GET', `/payroll/deduction-category`);
            console.log('deductionCategoryResult :', deductionCategoryResult );

            if (deductionCategoryResult.status === 200 || deductionCategoryResult.status === 201) {
                dispatch(getDeductionCategories(deductionCategoryResult.data));
            }

            dispatch(success());
        } catch (error) {
            console.error('Error :', JSON.stringify(error));
        }
    };
};

export const callSaveEmplPayAPI = (payrollRequest) => {
    return async (dispatch, getState) => {
        dispatch(requestStart());  // 요청 시작 상태 설정
        try {
            const response = await request('POST', `/payroll/save-emplpay`, payrollRequest);
            console.log('saveEmplPay response:', response);

            if (response.status === 201 || response.status === 200) {
                dispatch(success());
                dispatch(setPayroll(response.data));
                return true;  // 성공 시 true 반환
            } else {
                console.error('Failed to save payroll:', response);
                dispatch(requestFail('Failed to save payroll'));
                return false;  // 실패 시 false 반환
            }
        } catch (error) {
            console.error('Error saving payroll:', error);
            dispatch(requestFail(error.message || 'Unknown error occurred'));
            return false;  // 에러 발생 시 false 반환
        }
    };
};