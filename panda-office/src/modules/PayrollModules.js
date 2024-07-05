import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {
    payroll: [],
    earningCategories: [],
    deductionCategories: [],
    success: false
};

/* 액션 타입 */
const GET_PAYROLL = 'payroll/GET_PAYROLL';
const GET_EARNING_CATEGORIES = 'earningCategories/GET_EARNING_CATEGORIES';
const GET_DEDUCTION_CATEGORIES = 'deductionCategories/GET_DEDUCTION_CATEGORIES';
const SUCCESS = 'payroll/SUCCESS';

/* 액션 함수 */
export const { payroll: { getPayroll, success },
    earningCategories: { getEarningCategories },
    deductionCategories : { getDeductionCategories }} = createActions({
        [GET_PAYROLL]: (payroll) => ({ payroll }),
        [GET_EARNING_CATEGORIES]: (earningCategories) => ({ earningCategories }),
        [GET_DEDUCTION_CATEGORIES]: (deductionCategories) => ({ deductionCategories }),
        [SUCCESS]: () => ({ success: true })
    });

/* 리듀서 함수 */
const payrollReducer = handleActions({
    [GET_PAYROLL]: (state, { payload }) => ({
        ...state,
        payroll: payload.payroll
    }),
    [GET_EARNING_CATEGORIES]: (state, { payload }) => ({
        ...state,
        earningCategories: payload.earningCategories
    }),
    [GET_DEDUCTION_CATEGORIES]: (state, { payload }) => ({
        ...state,
        deductionCategories: payload.deductionCategories
    }),
    [SUCCESS]: (state) => ({
        ...state,
        success: true
    })
}, initialState);

export default payrollReducer;