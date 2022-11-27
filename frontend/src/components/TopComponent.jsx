import { AppBar, Avatar, Button, TextField } from '@mui/material'
import { useNavigate, Link } from "react-router-dom";

import axios from 'axios';
import React from 'react'



function Header({ user, dispatch }) {
    const name = localStorage.getItem('name')
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const handleLogout = async (e) => {
        try {
            let response = await axios.post(`http://localhost:5005/user/auth/logout`, {}, { headers: { 'authorization': 'Bearer ' + token } });
            if (response.status === 200) {
                localStorage.removeItem('token');
                localStorage.removeItem('name');
                dispatch(
                    {
                        type: 'SET_USER',
                        user: null,
                    }
                )
                navigate("/");
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <AppBar style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'grey'}}>
            <div style={{ marginLeft: "20px" }}>
                <Link to="/" style={{ textDecoration: "none", color: 'white', display:'flex',alignItems:'center' }}><img src="https://cdn-icons-png.flaticon.com/512/34/34870.png" style={{height:'30px',width:'30px', marginRight:'5px'}}/><h2>airbrb</h2></Link>
            </div>
            

            {user && <><div style={{ justifyContent: 'right', margin: '10px' }}>
            <Button  style={{ margin: '10px',backgroundColor:'grey', color:'white', fontWeight:'bold', border:'1px solid black' }} onClick={() => { navigate('/properties') }}>所有民宿</Button>
                <Button  style={{ margin: '10px',backgroundColor:'grey', color:'white', fontWeight:'bold', border:'1px solid black'}} onClick={() => { navigate('/addListing') }}>发布民宿</Button>
                <Button  style={{ margin: '10px',backgroundColor:'grey', color:'white', fontWeight:'bold', border:'1px solid black' }}  onClick={() => { navigate('/myBooking') }}>我的订单</Button>
                <Button style={{ margin: '10px',backgroundColor:'grey', color:'white', fontWeight:'bold', border:'1px solid black' }} onClick={() => { navigate('/myProperties') }}>个人信息</Button>
                
            </div></>}
            {user ? <Button label="Logout" onClick={(e) => { handleLogout(e) }} style={{ margin: '15px', height: "50px", color: "white" }} ><Avatar>{name.substring(0,1).toUpperCase()}</Avatar> <h6 style={{marginLeft: "10px"}}>注销</h6></Button>
                : <Button color="secondary" variant="contained" style={{ margin: '10px',backgroundColor:'darkgray' }} onClick={() => { navigate("/login") }}>登录</Button>
            }

        </AppBar>
    )
}

export default Header
