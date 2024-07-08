import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddNewLinePreview } from "./AddNewLinePreview";
import { insertApprovalLine } from "../../../../modules/E_ApprovalModules";

export function AddNewLine() {
    const dispatch = useDispatch();
    const { infoForCreate } = useSelector(state => state.e_approvalReducer);
    const [newLine, setNewLine] = useState({
        type: "employee",
        order: null,
        departmentId: null,
        employeeId: null,
        jobId: null,
        isSubmitAble: false
    });

    const typeHandler = (e) => {
        if (e.target.value == 'boss') {
            setNewLine({
                employeeId: infoForCreate.employeeList.find(emp => emp.job.title == '사장').employeeId,
                type: e.target.value
            })
        } else {
            setNewLine({
                type: e.target.value
            })
        }
    };

    const onChangeHandler = (e) => {
        setNewLine({
            ...newLine,
            [e.target.name]: e.target.value
        });
    };

    const onClickSubmit = () => {
        let action = {}
        switch (newLine.type) {
            case 'employee': action = insertApprovalLine({ employeeId: newLine.employeeId }); break;
            case 'job': action = insertApprovalLine({ jobId: newLine.jobId, departmentId: newLine.departmentId }); break;
            case 'boss': action = insertApprovalLine({ employeeId: newLine.employeeId });
        }
        dispatch(action)
    }

    /* 부서 변경시 사원, 직급 초기화 */
    useEffect(() => {
        setNewLine({
            ...newLine,
            employeeId: null,
            jobId: null
        })
    }, [newLine.departmentId])

    useEffect(() => {
        if ((newLine.departmentId &&
            newLine.employeeId) ||
            (newLine.departmentId &&
                newLine.jobId) ||
            newLine.type == 'boss'
        ) {
            setNewLine({
                ...newLine,
                isSubmitAble: true
            })
            console.log("line", newLine.employeeId)
        } else {
            setNewLine({
                ...newLine,
                isSubmitAble: false
            })
        }
    }, [newLine.employeeId, newLine.jobId, newLine.type])



    return newLine && (
        <div className="new-line-area">
            <AddNewLinePreview newLine={newLine} />
            <div>
                <select
                    onChange={typeHandler}
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
                {newLine.type === "employee" &&
                    <>
                        <select
                            name="departmentId"
                            onChange={onChangeHandler}
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
                                onChange={onChangeHandler}
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
                {newLine.type === "job" && <>
                    <select
                        name="departmentId"
                        onChange={onChangeHandler}
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
                            onChange={onChangeHandler}
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
                {newLine.isSubmitAble &&
                    <button
                        onClick={onClickSubmit}
                    >등록</button>}
            </div>
        </div>
    );
}
