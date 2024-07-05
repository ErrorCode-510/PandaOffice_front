import { useDispatch, useSelector } from "react-redux";
import { DraftBox } from "./components/DraftBox";
import { DraftInfo } from "./components/DraftInfo";
import { ApprovalBox } from "./components/ApprovalBox";
import { setCreateTemplateForm } from "../../../modules/E_ApprovalModules";
import { WebEditor } from "./components/WebEditor";

function TemplateEditor({ draftSample }) {
    const dispatch = useDispatch();
    const { autoApprovalLineRequestList } = useSelector(state => state.e_approvalReducer.createApprovalDocumentTemplateRequest)
    const onChangeHandler = (e) => {
        dispatch(setCreateTemplateForm({
            name: e.target.name,
            value: e.target.value
        }));
    }


    return (
        draftSample &&
        <div className='cc-content align-l page-component-outer'>
            <div className='page-component-inner'>
                <div className="template-title">
                    <input placeholder="양식 제목을 입력해주세요."
                        name="title"
                        onChange={onChangeHandler} />
                </div>
                <div className="flex">
                    <DraftInfo draftSample={draftSample} />
                    <div className="approval-area">
                        <div className="approval-box-description">기안</div>
                        <DraftBox draftSample={draftSample} />
                        <div className="approval-box-description">결재</div>
                        {autoApprovalLineRequestList && autoApprovalLineRequestList.length != 0 &&
                            autoApprovalLineRequestList.map(lineRequest => {
                                console.log(autoApprovalLineRequestList.indexOf(lineRequest))
                                return <ApprovalBox key={autoApprovalLineRequestList.indexOf(lineRequest)} lineRequest={lineRequest} />
                            }
                            )
                        }
                    </div>
                </div>
                <div>
                    <WebEditor/>
                </div>
            </div>
        </div>
    )
}

export default TemplateEditor;