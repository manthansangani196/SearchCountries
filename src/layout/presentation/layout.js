/**
 * @file Main Layout component which render with all other components
 */

import React, { useState, useEffect } from "react";
import { TableView } from "./table";
import { Loader } from "./Loader";

export const SearchCountriesView = () => {
    const [loading, setLoading] = useState();
    const [searchedText, setSearchedText] = useState('');
    const [countriesData, setCountriesData] = useState([]);

    useEffect(() => {
        if (searchedText !== '') {
            // Fetch Searched Countries request here and API request get after 1.2 Seconds
            const delayOnKeyStroke = setTimeout(async () => {
                setLoading(true);
                await fetch(`https://restcountries.com/v3.1/name/${searchedText}?fields=name,coatOfArms`)
                    .then((res) => {
                        let searchedData = res.json();
                        return searchedData;
                    })
                    .then((searchedData) => setCountriesData(searchedData?.status ? [] : searchedData));
                setLoading(false)
            }, 1200)
            return () => clearTimeout(delayOnKeyStroke);
        } else {
            getAllCountriesData();
        }
    }, [searchedText])

    // Fetch All Countries Data
    const getAllCountriesData = async () => {
        setLoading(true);
        await fetch(`https://restcountries.com/v3.1/all?fields=name,coatOfArms`)
            .then((result) => {
                let data = result.json();
                return data;
            })
            .then((data) => setCountriesData(data));
        setLoading(false);
    };

    // Set the value in the state entering in the search box
    const searchTheCountries = (event) => {
        setSearchedText(event.target.value);
    };

    const tableProps = {
        countriesData
    };

    return (<>
        <div className="m-2">
            <label htmlFor="seachCountriesInput" className="form-label">Search Countries</label>
            <input
                type='search'
                className='form-control'
                onChange={(event) => searchTheCountries(event)}
                style={{ width: '30%' }}
                placeholder='Search Country Name'
                aria-controls='dataTable' />
        </div>
        {loading ? <Loader isLoading={loading} /> : <TableView {...tableProps} />}
    </>);
};