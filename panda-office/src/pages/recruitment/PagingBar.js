function PagingBar({ pageInfo, setCurrentPage }) {

    const pageNumber = [];
    for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
        pageNumber.push(i);
    }

    return (
        <ul className="ali-paging-ul">
            <li>
                <button
                    className="ali-paging-btn ali-bd-radius-left"
                    disabled={pageInfo.currentPage <= 1}
                    onClick={() => setCurrentPage(1)}
                >
                    {`<<`}
                </button>
            </li>
            <li>
                <button
                    className="ali-paging-btn"
                    disabled={pageInfo.currentPage <= 1}
                    onClick={() => setCurrentPage(pageInfo.currentPage - 1)}
                >
                    &lt;
                </button>
            </li>
            {
                pageNumber.map(
                    num =>
                        <li key={num}>
                            <button
                                className="ali-no-paging-btn"
                                style={pageInfo.currentPage === num ? { backgroundColor: 'orange' } : null}
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
                    className="ali-paging-btn"
                    disabled={pageInfo.currentPage >= pageInfo.maxPage}
                    onClick={() => setCurrentPage(pageInfo.currentPage + 1)}
                >
                    &gt;
                </button>
            </li>
            <li>
                <button
                    className="ali-paging-btn ali-bd-radius-right"
                    disabled={pageInfo.currentPage >= pageInfo.maxPage}
                    onClick={() => setCurrentPage(pageInfo.maxPage)}
                >
                    &gt;&gt;
                </button>
            </li>
        </ul>
    );
}

export default PagingBar;