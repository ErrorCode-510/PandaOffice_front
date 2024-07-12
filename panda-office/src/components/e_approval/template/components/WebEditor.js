import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export function WebEditor({template, onChangeFormHandler}) {
    const dispatch = useDispatch();
    const editorRef = useRef(null);
    const [fontSize, setFontSize] = useState('16px');
    const [color, setColor] = useState('#000000');
    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.focus();
        }
        if (template) {
            editorRef.current.innerHTML = template;
        }
    }, []);

    const applyStyle = (style) => {
        /* 선택 영역 가져오기 */
        const selection = window.getSelection();
        /* 선택영역 없으면 종료 */
        if (!selection.rangeCount) return;

        /* 선택 범위 가져오기 (0부터) */
        const range = selection.getRangeAt(0);
        /* 선택 영역에 새로운 span 생성 */
        const span = document.createElement('span');

        /* 액션 타입 */
        switch (style) {
            case 'bold':
                span.style.fontWeight = 'bold';
                break;
            case 'italic':
                span.style.fontStyle = 'italic';
                break;
            case 'underline':
                span.style.textDecoration = 'underline';
                break;
            case 'fontSize':
                span.style.fontSize = fontSize;
                break;
            case 'color':
                span.style.color = color;
                break;
            default:
                break;
        }

        /* 선택영역 내용 저장하고 새로운 span에 담기 */
        const contents = range.extractContents();
        span.appendChild(contents);
        range.insertNode(span);

        /* 셀렉션 지우고 범위 재할당 */
        selection.removeAllRanges();
        selection.addRange(range);

        /* 현재 선택 범위에 포커싱 */
        editorRef.current.focus();
    };

    const insertTable = () => {
        const table = document.createElement('table');
        table.style.border = '1px solid black';
        table.style.borderCollapse = 'collapse';

        const row = table.insertRow();
        const cell = row.insertCell();
        cell.style.border = '1px solid black';
        cell.style.padding = '5px';
        cell.textContent = '내용';

        const selection = window.getSelection();
        if (selection.rangeCount) {
            const range = selection.getRangeAt(0);
            range.insertNode(table);
        }

        editorRef.current.focus();
    };

    return (
        <div>
            <div>
                <button onClick={() => applyStyle('bold')}>굵게</button>
                <button onClick={() => applyStyle('italic')}>기울임</button>
                <button onClick={() => applyStyle('underline')}>밑줄</button>
                <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
                    <option value="12px">12px</option>
                    <option value="16px">16px</option>
                    <option value="20px">20px</option>
                    <option value="24px">24px</option>
                </select>
                <button onClick={() => applyStyle('fontSize')}>폰트 크기 적용</button>
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
                <button onClick={() => applyStyle('color')}>색상 적용</button>
                <button onClick={insertTable}>테이블 삽입</button>
            </div>
            <div
                id="document"
                ref={editorRef}
                contentEditable={true}
                style={{
                    border: '1px solid black',
                    minHeight: '200px',
                    padding: '10px',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                }}
                onInput={onChangeFormHandler}
            />
        </div>
    );
}