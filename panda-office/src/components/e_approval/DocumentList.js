import { useEffect, useState } from "react";


function DocumentList({ exceptColumn }) {

    return <>
        <style>
            {
                `
                    table {
                        border-collapse: collapse;
                    }
                    th, td {
                        border: 1px solid black;
                    }
                `
            }
        </style>
        <table>
            <thead>
                <tr>
                    {!exceptColumn.includes('template') && <th>결재 양식</th>}
                    {!exceptColumn.includes('title') && <th>제목</th>}
                    {!exceptColumn.includes('recived-date') && <th>수신일</th>}
                    {!exceptColumn.includes('draft-date') && <th>기안일</th>}
                    {!exceptColumn.includes('draft-employee') && <th>기안자</th>}
                    {!exceptColumn.includes('draft-department') && <th>기안 부서</th>}
                    {!exceptColumn.includes('status') && <th>진행 상태</th>}
                </tr>
            </thead>
            <tbody>
                {/* 값이 들어올 자리 */}
            </tbody>
        </table>
    </>
}

export default DocumentList;