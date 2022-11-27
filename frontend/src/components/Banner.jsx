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
                <h1>还在徘徊？不确定要去哪里？</h1>
                <h5>
                一个新的目的地
                </h5>
                <Button onClick={() =>{ history('/properties')}}>寻找住宿</Button>
            </div>
        </div>
    )
}

export default Banner
