import React, { useState } from 'react';
// import './Search.css';
import "react-date-range/dist/styles.css";//main style file
import "react-date-range/dist/theme/default.css";
// theme css file
import { DateRangePicker } from "react-date-range";


// DATE PICKER COMPONENT
function Search({startDate,endDate,setEndDate,setStartDate}) {

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    };
    function handleSelect(ranges) {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }
    return (
        <div className=''>
            <DateRangePicker ranges={
                [selectionRange]} onChange=
                {handleSelect} />   
        </div>
    )
}

export default Search
