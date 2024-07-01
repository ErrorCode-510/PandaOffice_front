import { IoIosCheckbox, IoIosCheckboxOutline } from "react-icons/io"
import { useSelector } from "react-redux"

export function TemplateManager(){
    const {currentFolder} = useSelector(state=>state.e_approvalReducer)
    return currentFolder&&
    <>
    <div className="folder-head">
        <div className="folder-title-text">{currentFolder.name}</div>
        <div className="template-manager-button">
            <button className="template-button-navy">양식 추가</button>
            <button className="template-button-gery">양식 사용</button>
            <button className="template-button-gery">양식 미사용</button>
            <button className="template-button-gery">폴더 이동</button>
        </div>
    </div>
    </>
}