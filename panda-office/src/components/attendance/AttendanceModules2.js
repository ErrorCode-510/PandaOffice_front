// import { createActions, handleActions } from 'redux-actions';
// import { authRequest } from '.';

// /* 초기값 */
// const initialState = {
//     message: null,
// };

// /* 액션 타입 */
// const SAVE_ATTENDANCE_MESSAGE = 'attendance/SAVE_ATTENDANCE_MESSAGE';

// /* 액션 생성 함수 */
// export const { saveAttendanceMessage } = createActions({
//     [SAVE_ATTENDANCE_MESSAGE]: (message) => ({ message }),
// });

// /* 리듀서 */
// const attendanceReducer = handleActions(
//     {
//         [SAVE_ATTENDANCE_MESSAGE]: (state, { payload }) => ({
//             ...state,
//             message: payload.message,
//         }),
//     },
//     initialState
// );

// export default attendanceReducer;

// /* API 호출 및 액션 디스패치 함수 */
// export const callCheckInAPI = (attendanceData) => {
//     return async (dispatch) => {
//         const response = await authRequest.post('/attendance/check-in', attendanceData);
//         if (response.status === 200) {
//             dispatch(saveAttendanceMessage('출근 기록이 저장되었습니다.'));
//         }
//     };
// };

// export const callCheckOutAPI = (attendanceData) => {
//     return async (dispatch) => {
//         const response = await authRequest.post('/attendance/check-out', attendanceData);
//         if (response.status === 200) {
//             dispatch(saveAttendanceMessage('퇴근 기록이 저장되었습니다.'));
//         }
//     };
// };
