import { getPayroll, getEarningCategories, getDeductionCategories, success } from "../modules/PayrollModules";
import { request } from "./api";
import { getMemberId } from "../utils/TokenUtils";

export const callEmplPayAPI = () => {

    return async (dispatch, getState) => {
        try {
            // EmplPay
            const payrollResult = await request('GET', `/payroll/allemplpayroll`);
            console.log('payrollResult:', payrollResult);

            if (payrollResult.status === 200) {
                dispatch(getPayroll(payrollResult.data));
            }

            // 지급항목 카테고리
            const earningCategoryResult  = await request('GET', `/payroll/earningcategory`);
            console.log('earningCategoryResult:', earningCategoryResult );

            if (earningCategoryResult.status === 200) {
                dispatch(getEarningCategories(earningCategoryResult.data));
            }

            // 공제항목 카테고리
            const deductionCategoryResult  = await request('GET', `/payroll/deductioncategory`);
            console.log('deductionCategoryResult :', deductionCategoryResult );

            if (deductionCategoryResult.status === 200) {
                dispatch(getDeductionCategories(deductionCategoryResult.data));
            }

            dispatch(success());
        } catch (error) {
            console.error('Error :', JSON.stringify(error));
        }
    };
};