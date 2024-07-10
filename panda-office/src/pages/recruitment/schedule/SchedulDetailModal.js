import { useSelector } from "react-redux";

const ScheduleDetailModal = () => {

    const { scheduleDetailModal } = useSelector(state => state.interviewScheduleReducer)

    return (
        <>
            {
                // scheduleDetailModal && 
                <div>
                    {/* 일정 등록부터 구현해야할듯 */}
                </div>

            }
        </>
    )
}

export default ScheduleDetailModal;