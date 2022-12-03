import React, {useState} from 'react'

import Button from '@mui/material/Button';
import Search from './Search';

function DateComp({startDate, endDate, setEndDate, setStartDate}) {
    const[showSearch, setShowSearch] = useState(false);
    return (
        <div >
            <div className="w-full">
                {showSearch && <Search startDate={startDate} endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate}/>}
                <Button className="w-full" onClick={() => setShowSearch(!showSearch)} 
                variant='outlined'>
                {showSearch ? "隐藏" : "日期"}
                </Button>
            </div>
            
            
        </div>
    )
}

export default DateComp
