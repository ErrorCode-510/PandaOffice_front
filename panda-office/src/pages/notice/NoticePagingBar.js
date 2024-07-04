import React from "react";
import './notice.css';

function PagingBar({ pageInfo, setCurrentPage }) {

    const pageNumber = [];
    for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
        pageNumber.push(i);
    }

    return (
        <ul className="ali-paging-ul">
            <li>
                <button
                    className="ali-paging-btn ali-bd-radius-left ali-btn"
                    disabled={pageInfo.currentPage <= 1}
                    onClick={() => setCurrentPage(1)}
                    style={pageInfo.currentPage === 1 ? {border: '1px solid #c1c1c1'} : null}
                >
                    {`<<`}
                </button>
            </li>
            <li>
                <button
                    className="ali-paging-btn ali-btn"
                    disabled={pageInfo.currentPage <= 1}
                    onClick={() => setCurrentPage(pageInfo.currentPage - 1)}
                    style={pageInfo.currentPage === 1 ? {border: '1px solid #c1c1c1'} : null}
                >
                    &lt;
                </button>
            </li>
            {
                pageNumber.map(
                    num =>
                        <li key={num}>
                            <button
                                className="ali-no-paging-btn ali-btn"
                                style={pageInfo.currentPage === num ? { backgroundColor: '#ffffff', color: '#000000', border: '1px solid #000000' } : null}
                                disabled={pageInfo.currentPage === num}
                                onClick={() => setCurrentPage(num)}
                            >
                                {num}
                            </button>
                        </li>
                )
            }
            <li>
                <button
                    className="ali-paging-btn ali-btn"
                    disabled={pageInfo.currentPage >= pageInfo.maxPage}
                    onClick={() => setCurrentPage(pageInfo.currentPage + 1)}
                    style={pageInfo.currentPage === pageInfo.maxPage ? {border: '1px solid #c1c1c1'} : null}
                >
                    &gt;
                </button>
            </li>
            <li>
                <button
                    className="ali-paging-btn ali-bd-radius-right ali-btn"
                    disabled={pageInfo.currentPage >= pageInfo.maxPage}
                    onClick={() => setCurrentPage(pageInfo.maxPage)}
                    style={pageInfo.currentPage === pageInfo.maxPage ? {border: '1px solid #c1c1c1'} : null}
                >
                    &gt;&gt;
                </button>
            </li>
        </ul>
    );
}

export default PagingBar;