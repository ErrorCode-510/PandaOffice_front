import { getPlace } from "../modules/InterviewScheduleModules"
import { authRequest } from "./api"

/* 면접 장소 호출 API */
export const callPlaceListAPI = () => {
    return async (dispatch, getState) => {

        try {
            const result = await authRequest.get('/recruitment/place')

            if (result.status === 200) {
                dispatch(getPlace(result))
                console.log('면접장소 api 확인: ' + JSON.stringify(result))
            } else {
                console.error('CallPlaceListAPI error : ', result);
            }
        } catch (error) {
            console.error('catch: CallPlaceListAPI error : ', error);
        }
    }
}