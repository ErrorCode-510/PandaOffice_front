import {combineReducers} from "redux";

import memberReducer from "./MemberModules";
import applicantReducer from "./ApplicantModules";


const rootReducer = combineReducers({
     memberReducer, applicantReducer
});

export default rootReducer;