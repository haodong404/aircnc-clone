import React, { useState } from 'react';
// import './Search.css';
import "react-date-range/dist/styles.css";//main style file
import "react-date-range/dist/theme/default.css";
// theme css file
import { DateRangePicker } from "react-date-range";
import Button from '@mui/material/Button';
import PeopleIcon from '@mui/icons-material/People';


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
        <div className='search'>
            <DateRangePicker ranges={
                [selectionRange]} onChange=
                {handleSelect} />
            <h2>
                人数
                <PeopleIcon />
            </h2>
            <input min={0}
                defaultValue={2}
                type="number" />
            
        </div>
    )
}

export default Search
