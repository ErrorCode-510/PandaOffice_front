import {combineReducers} from "redux";

import memberReducer from "./MemberModules";
import e_approvalReducer from "./E_ApprovalModules";


const rootReducer = combineReducers({
     memberReducer,
     e_approvalReducer
});

export default rootReducer;