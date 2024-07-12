import { useDispatch, useSelector } from "react-redux";
import { DraftBox } from "./components/DraftBox";
import { DraftInfo } from "./components/DraftInfo";
import { TempApprovalBox } from "./components/TempApprovalBox";
import { WebEditor } from "./components/WebEditor";
import { IntegrationTable } from "./components/IntegrationTable";

function TemplateEditor({ draftEmployee, onChangeFormHandler, templateRequest }) {


    return (
        draftEmployee &&
        <div className='cc-content align-l page-component-outer'>
            <div className='page-component-inner'>
                <div className="template-title">
                    <input placeholder="양식 제목을 입력해주세요."
                        name="title"
                        onChange={onChangeFormHandler}
                        />
                </div>
                <div className="flex">
                    <DraftInfo draftEmployee={draftEmployee}/>
                    <div className="approval-area">
                        <div className="approval-box-description">기안</div>
                        <DraftBox draftEmployee={draftEmployee} />
                        {templateRequest.autoApprovalLineRequestList && templateRequest.autoApprovalLineRequestList.length != 0 &&
                            <>
                                <div className="approval-box-description">결재</div>
                                {templateRequest.autoApprovalLineRequestList.map(lineRequest => {
                                    return <TempApprovalBox key={templateRequest.autoApprovalLineRequestList.indexOf(lineRequest)} lineRequest={lineRequest} />
                                })}
                            </>
                        }
                    </div>
                </div>
                <div>
                    <IntegrationTable/>
                    <WebEditor onChangeFormHandler={onChangeFormHandler}/>
                </div>
            </div>
        </div>
    )
}

export default TemplateEditor;