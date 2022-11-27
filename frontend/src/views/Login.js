import React, {useState} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useStateValue } from '../StateProvider';

function Login() {
  const [{user}, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
    const history = useNavigate();
    const handleSubmit = async () => {
      try {
        const response = await axios.post(`http://localhost:5005/user/auth/login`, {email, password:pass});
        // console.log(response);
        if(response.status==200){
          let token = response.data.token;
          localStorage.setItem('token', token);
          localStorage.setItem('name', email);
          dispatch(
            {
              type: 'SET_USER',
              user: { email },
            }
          );

          navigate('/')
        }
      } catch(err) {
        console.log(err);
        alert(err.response.data.error);
      }

    }
    return (
        <div >
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            height:400,
            padding:'10px',
            backgroundColor:'white',
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'gray' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5" >
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
            
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=>{
                setemail(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e)=>{
                setpass(e.target.value);
              }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              
              sx={{ mt: 3, mb: 2, backgroundColor:'gray'}}
              onClick={(e)=>{
                e.preventDefault();
                handleSubmit();
              }}
            >
              Sign In
            </Button>
            <Grid container>
              
              <Grid item>
                <Link href="#" variant="body2"  onClick={()=> { 
                  history('/register');
                }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
        </div>
    )
}

export default Login
