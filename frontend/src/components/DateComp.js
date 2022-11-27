import React, {useState} from 'react'

import Button from '@mui/material/Button';
import Search from './Search';

function DateComp({startDate, endDate, setEndDate, setStartDate}) {
    const[showSearch, setShowSearch] = useState(false);
    return (
        <div className='banner'>
            <div className='banner__search' style={{color:'green'}}>
                {showSearch && <Search startDate={startDate} endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate}/>}
                <Button onClick={() => setShowSearch(!showSearch)} 
                className='banner__searchButton'
                variant='outlined'>
                {showSearch ? "Hide" : "Search Dates"}
                </Button>
            </div>
            
            
        </div>
    )
}

export default DateComp
