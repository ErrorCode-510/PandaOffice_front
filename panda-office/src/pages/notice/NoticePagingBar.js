import React from "react";
import './notice.css';

function PagingBar({ pageInfo, setCurrentPage }) {

    // 페이지 번호 배열을 생성
    const pageNumber = [];
    for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
        pageNumber.push(i);
    }

    return (
        <ul className="ali-paging-ul">
            <li>
                <button
                    className="ali-paging-btn ali-bd-radius-left ali-btn"
                    disabled={pageInfo.currentPage <= 1}  // 첫 페이지에서는 비활성화
                    onClick={() => setCurrentPage(1)}  // 첫 페이지로 이동
                    style={pageInfo.currentPage === 1 ? {border: '1px solid #c1c1c1'} : null}
                >
                    {`<<`} {/* 첫 페이지로 이동 */}
                </button>
            </li>
            <li>
                <button
                    className="ali-paging-btn ali-btn"
                    disabled={pageInfo.currentPage <= 1}  // 첫 페이지에서는 비활성화
                    onClick={() => setCurrentPage(pageInfo.currentPage - 1)}  // 이전 페이지로 이동
                    style={pageInfo.currentPage === 1 ? {border: '1px solid #c1c1c1'} : null}
                >
                    &lt; {/* 이전 페이지로 이동 */}
                </button>
            </li>
            {
                pageNumber.map(
                    num =>
                        <li key={num}>
                            <button
                                className="ali-no-paging-btn ali-btn"
                                style={pageInfo.currentPage === num ? { backgroundColor: '#ffffff', color: '#000000', border: '1px solid #000000' } : null}
                                disabled={pageInfo.currentPage === num}  // 현재 페이지는 비활성화
                                onClick={() => setCurrentPage(num)}  // 특정 페이지로 이동
                            >
                                {num} {/* 특정 페이지로 이동 */}
                            </button>
                        </li>
                )
            }
            <li>
                <button
                    className="ali-paging-btn ali-btn"
                    disabled={pageInfo.currentPage >= pageInfo.maxPage}  // 마지막 페이지에서는 비활성화
                    onClick={() => setCurrentPage(pageInfo.currentPage + 1)}  // 다음 페이지로 이동
                    style={pageInfo.currentPage === pageInfo.maxPage ? {border: '1px solid #c1c1c1'} : null}
                >
                    &gt; {/* 다음 페이지로 이동 */}
                </button>
            </li>
            <li>
                <button
                    className="ali-paging-btn ali-bd-radius-right ali-btn"
                    disabled={pageInfo.currentPage >= pageInfo.maxPage}  // 마지막 페이지에서는 비활성화
                    onClick={() => setCurrentPage(pageInfo.maxPage)}  // 마지막 페이지로 이동
                    style={pageInfo.currentPage === pageInfo.maxPage ? {border: '1px solid #c1c1c1'} : null}
                >
                    &gt;&gt; {/* 마지막 페이지로 이동 */}
                </button>
            </li>
        </ul>
    );
}

export default PagingBar;