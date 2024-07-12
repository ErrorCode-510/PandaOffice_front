import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddNewLinePreview } from "./AddNewLinePreview";

export function TempAddNewLine({ setApprovalLineList }) {
    const { infoForCreate } = useSelector(state => state.e_approvalReducer);
    const [newLine, setNewLine] = useState({});
    const [selectType, setSelectType] = useState('employee');
    const [submitAble, setSubmitAble] = useState(false);
    const onChangeSetSelectType = (e) => {
        setSelectType(e.target.value)
        if (e.target.value == 'boss') {
            const bossId = infoForCreate.jobList.find(job=>job.title == '사장').id
            setNewLine({jobId: bossId})
            setSubmitAble(true)
        } else {
            setNewLine({})
            setSubmitAble(false)
        }
    }
    const onChangeHandleWithSubmitAbleFalse = (e) => {
        setNewLine(state => ({ ...state, [e.target.name]: e.target.value }))
        setSubmitAble(false)
    }
    const onChangeHandlerWithSubmitAbleTrue = (e) => {
        setNewLine(state => ({ ...state, [e.target.name]: e.target.value }))
        setSubmitAble(true)
    }

    const onClickSubmit = () => {
        console.log(newLine)
        setApprovalLineList(state => [...state, newLine]);
    }


    return newLine && (
        <div className="new-line-area">
            <AddNewLinePreview newLine={newLine} />
            <div>
                <select
                    onChange={onChangeSetSelectType}
                >
                    <option
                        value="employee"
                        checked={newLine.type === "employee"}
                    >
                        사원
                    </option>
                    <option
                        value="job"
                        checked={newLine.type === "employee"}
                    >
                        직급
                    </option>
                    <option
                        value="boss"
                        checked={newLine.type === "employee"}
                    >
                        사장
                    </option>
                </select>
                {selectType === "employee" &&
                    <>
                        <select
                            name="departmentId"
                            onChange={onChangeHandleWithSubmitAbleFalse}
                        >
                            {infoForCreate.departmentList.map(dep => {
                                return (
                                    <option
                                        key={dep.id}
                                        value={dep.id}
                                    >
                                        {dep.name}
                                    </option>
                                )
                            })}
                        </select>
                        {newLine.departmentId &&
                            <select
                                name="employeeId"
                                onChange={onChangeHandlerWithSubmitAbleTrue}
                            >
                                {infoForCreate.employeeList
                                    .filter(emp => emp.department.id == newLine.departmentId)
                                    .map(emp => <option
                                        key={emp.employeeId}
                                        value={emp.employeeId}
                                    >
                                        {emp.name} {emp.job.title}
                                    </option>)}
                            </select>
                        }
                    </>
                }
                {selectType === "job" && <>
                    <select
                        name="departmentId"
                        onChange={onChangeHandleWithSubmitAbleFalse}
                    >
                        <option value={0}>기안 부서</option>
                        {infoForCreate.departmentList
                            .map(dep =>
                                <option
                                    key={dep.id}
                                    value={dep.id}
                                >
                                    {dep.name}
                                </option>
                            )
                        }
                    </select>
                    {newLine.departmentId &&
                        <select
                            name="jobId"
                            onChange={onChangeHandlerWithSubmitAbleTrue}
                        >
                            {infoForCreate.jobList
                                .filter(job => job.title != '사장')
                                .map(job =>
                                    <option
                                        key={job.id}
                                        value={job.id}
                                    >
                                        {job.title}
                                    </option>)}
                        </select>
                    }
                </>}
                {submitAble &&
                    <button onClick={onClickSubmit}
                    >등록</button>}
            </div>
        </div>
    );
}
