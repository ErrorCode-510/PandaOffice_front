import {combineReducers} from "redux";

import memberReducer from "./MemberModules";
import e_approvalReducer from "./E_ApprovalModules";
import applicantReducer from "./ApplicantModules";
import payrollReducer from "./PayrollModules";
// import noticeReducer from "./NoticeModules";


const rootReducer = combineReducers({
     memberReducer,
     e_approvalReducer,
     applicantReducer,
     payrollReducer,
     // noticeReducer
});

export default rootReducer;