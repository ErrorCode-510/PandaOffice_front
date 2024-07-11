import {createActions, handleActions} from "redux-actions";
import {produce} from 'immer';

/* 초기값 */
const initialState = {
    payroll: [],
    earningCategories: [],
    deductionCategories: [],
    success: false,
    loading: false,
    error: null
};

/* 액션 타입 */
const GET_PAYROLL = 'payroll/GET_PAYROLL';
const SAVE_EMPL_PAY = 'payroll/SAVE_EMPL_PAY';
const GET_EARNING_CATEGORIES = 'earningCategories/GET_EARNING_CATEGORIES';
const GET_DEDUCTION_CATEGORIES = 'deductionCategories/GET_DEDUCTION_CATEGORIES';
const SUCCESS = 'payroll/SUCCESS';
const REQUEST_START = 'payroll/REQUEST_START';
const REQUEST_FAIL = 'payroll/REQUEST_FAIL';
const RESET_SUCCESS = 'payroll/RESET_SUCCESS';

/* 액션 함수 */
export const { 
    payroll: { getPayroll, success, saveEmplPay , requestStart, requestFail, resetSuccess },
    earningCategories: { getEarningCategories },
    deductionCategories: { getDeductionCategories }
} = createActions({
    [GET_PAYROLL]: (payroll) => ({ payroll }),
    [GET_EARNING_CATEGORIES]: (earningCategories) => ({ earningCategories }),
    [GET_DEDUCTION_CATEGORIES]: (deductionCategories) => ({ deductionCategories }),
    [SUCCESS]: () => ({ success: true }),
    [SAVE_EMPL_PAY]: (payrollData) => ({ payrollData }),
    [REQUEST_START]: () => ({}),
    [REQUEST_FAIL]: (error) => ({ error }),
    [RESET_SUCCESS]: () => ({})
});

/* 리듀서 함수 */
const payrollReducer = handleActions({
    [GET_PAYROLL]: (state, { payload }) =>
        produce(state, draft => {
            draft.payroll = payload.payroll;
        }),
    [GET_EARNING_CATEGORIES]: (state, { payload }) =>
        produce(state, draft => {
            draft.earningCategories = payload.earningCategories;
        }),
    [GET_DEDUCTION_CATEGORIES]: (state, { payload }) =>
        produce(state, draft => {
            draft.deductionCategories = payload.deductionCategories;
        }),
    [SUCCESS]: (state) =>
        produce(state, draft => {
            draft.success = true;
            draft.loading = false;
            draft.error = null;
        }),
    [SAVE_EMPL_PAY]: (state, { payload }) =>
        produce(state, draft => {
            // 저장된 급여 정보를 state에 반영
            const index = draft.payroll.findIndex(p => p.employeeId === payload.payrollData.employeeId);
            if (index !== -1) {
                draft.payroll[index] = {
                    ...draft.payroll[index],
                    ...payload.payrollData
                };
            } else {
                draft.payroll.push(payload.payrollData);
            }
            draft.success = true;
            draft.loading = false;
            draft.error = null;
        }),
    [REQUEST_START]: (state) =>
        produce(state, draft => {
            draft.loading = true;
            draft.error = null;
        }),
    [REQUEST_FAIL]: (state, { payload }) =>
        produce(state, draft => {
            draft.loading = false;
            draft.error = payload.error;
        }),
    [RESET_SUCCESS]: (state) =>
        produce(state, draft => {
            draft.success = false;
        })
}, initialState);

export default payrollReducer;