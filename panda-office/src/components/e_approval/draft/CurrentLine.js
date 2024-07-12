import { useSelector } from "react-redux";
import { IoIosCloseCircle } from "react-icons/io";


export function CurrentLine({ employee, setApprovalLineIdList }) {
    const onClickRemoveLine = () => {
        console.log(employee.index)
        setApprovalLineIdList(state=>  {
            const newState = state.filter((empId, index)=>index != employee.index)
            return newState
        })
    }

    return <>
        <div className="new-line-preview-area border-bottom-padding">
            <div>
                <img src="/logo192.png"></img>
            </div>
            <div>
                {employee.department.name}
                <br />
                {employee.name}
                {employee.job.title}
            </div>
            <IoIosCloseCircle
                className="close-button"
                onClick={onClickRemoveLine}
                />
        </div>
    </>

}