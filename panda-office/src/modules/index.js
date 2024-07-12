import {combineReducers} from "redux";

import memberReducer from "./MemberModules";
import e_approvalReducer from "./E_ApprovalModules";
import applicantReducer from "./ApplicantModules";
import payrollReducer from "./PayrollModules";
import noticeReducer from "./NoticeModules";
import interviewScheduleReducer from "./InterviewScheduleModules";
import attendanceReducer from "./AttendanceModules";


const rootReducer = combineReducers({
     memberReducer,
     e_approvalReducer,
     applicantReducer,
     payrollReducer,
     noticeReducer,
     interviewScheduleReducer,
     attendanceReducer
});

export default rootReducer;