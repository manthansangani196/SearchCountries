/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 * @file Create Pagination Presentation View
 */

import React from 'react';

export const Pagination = (props) => {
    const {
        goToPrevPage,
        pageNumbers,
        currentPage,
        setCurrentPage,
        goToNextPage
    } = props;

    return (
        <nav>
            <ul className='pagination float-end'>
                {/* Previous page button */}
                <li className="page-item">
                    <a className="page-link"
                        onClick={goToPrevPage}
                        href="#">
                        Previous
                    </a>
                </li>
                {/* Creating through each page number */}
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber}
                        className={`page-item ${currentPage === pgNumber ? 'active' : ''} `} >
                        <a onClick={() => setCurrentPage(pgNumber)}
                            className='page-link'
                            href='#'>
                            {pgNumber}
                        </a>
                    </li>
                ))}
                {/* Next page button */}
                <li className="page-item" disabled={currentPage === 13 ? true : false}>
                    <a className="page-link"
                        onClick={goToNextPage}
                        href='#'>
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    );
};
