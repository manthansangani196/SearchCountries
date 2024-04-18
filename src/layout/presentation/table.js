/**
 * @file Create Table Presentation View
 */

import React, {useState} from "react";
import { Pagination } from "./pagination";

export const TableView = (props) => {
    const { countriesData } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(20);
    const filteredData = countriesData?.map((country, index) => { return { ...country, id: index + 1 } });
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredData?.slice(indexOfFirstRecord, indexOfLastRecord);
    const noOfPages = Math.ceil(filteredData.length / recordsPerPage)
    const pageNumbers = [...Array(noOfPages + 1).keys()].slice(1);

    // Click to Next page
    const goToNextPage = () => {
        if (currentPage !== noOfPages)
            setCurrentPage(currentPage + 1)
    };

    // Click to Previous page
    const goToPrevPage = () => {
        if (currentPage !== 1)
            setCurrentPage(currentPage - 1)
    };

    // Render countries data in the table
    const renderCountries = () => {
        return currentRecords?.map((row, index) => {
            return (
                <tr key={index}>
                    <td style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{row?.id}</td>
                    <td style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{row?.name?.common}</td>
                    <td style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <img src={row?.coatOfArms?.png} className="rounded" style={{ height: '30px' }} alt={row?.name?.common} />
                    </td>
                </tr>
            );
        });
    };

    const paginationProps = {
        goToPrevPage,
        pageNumbers,
        currentPage,
        setCurrentPage,
        goToNextPage
    };

    return (<>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Country Name</th>
                    <th scope="col">Country Flag</th>
                </tr>
            </thead>
            <tbody>
                {countriesData.length !== 0 ? renderCountries() : 'No Result Found!'}
            </tbody>
        </table>
        <Pagination {...paginationProps} />
    </>);
};