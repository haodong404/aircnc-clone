import React, {useState} from 'react'
import './Banner.css'
import {Button} from "@mui/material";
import Search from './Search';
import { useNavigate } from 'react-router-dom';

function Banner() {
    const history = useNavigate();
    const[showSearch, setShowSearch] = useState(false);
    return (
        <div className='banner'>
            
            <div className='banner__info'>
                <h1>Wander now? Not sure where to go? Perfect.</h1>
                <h5>
                A Destination For The New Millennium
                </h5>
                <Button onClick={() =>{ history('/properties')}}>Find your stay</Button>
                
                
            </div>
        </div>
    )
}

export default Banner
