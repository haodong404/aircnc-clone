import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Register({ dispatch }) {
    const navigate = useNavigate();
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [re, setre] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(re!==password) {
            alert("两次密码不一样");
            return;
        }
        try {
            const response = await axios.post(`http://localhost:5005/user/auth/register`, {
                name,
                email,
                password
            });
            // console.log(response);
            if (response.status === 200) {
                let token = response.data.token;
                localStorage.setItem('token', token);
                localStorage.setItem('name', email);
                dispatch(
                    {
                        type: 'SET_USER',
                        user: { email: email },
                    }
                )
                navigate("/");
            }

        } catch (err) {
            console.error(err);
            alert(err);
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    padding: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255,1)'
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary' }}>
                    {/* <LockOutlinedIcon /> */}
                </Avatar>
                <Typography component="h1" variant="h5">
                    注册
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="名字"
                        name="name"
                        autoComplete="email"
                        autoFocus
                        value={name}
                        onChange={(e) => {
                            setname(e.target.value);
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="电子邮箱"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => {
                            setemail(e.target.value);
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="passwod"
                        label="密码"
                        type="password"
                        id="password"
                        //autoComplete="current-password"
                        value={password}
                        onChange={(e) => {
                            setpassword(e.target.value);
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="re-passwod"
                        label="确认密码"
                        type="password"
                        id="re-password"
                        value={re}
                        onChange={(e) => {
                            setre(e.target.value);
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        style={{backgroundColor:'gray'}}
                        onClick={(e) => handleSubmit(e)}
                    >
                        注册
                    </Button>

                </Box>
            </Box>
        </Container>
    )
}

export default Register
