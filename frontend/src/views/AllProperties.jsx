import React, { useState, useEffect } from 'react'
import Card from '../components/Card';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Search from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from "react-date-range";
import { useNavigate } from "react-router-dom";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


function Listings() {
  const [titleSearch, settitleSearch] = useState("")
  const [citySearch, setcitySearch] = useState("")
  const [listings, setlistings] = useState([]);
  const [pOrder, setpOrder] = useState(false);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fn = async () => {
      let resp = await axios.get(`http://localhost:5005/listings`);
      if (resp.status === 200) {
        let ls = []
        if (titleSearch) {
          for (let i = 0; i < resp.data.listings.length; i++) {
            if (resp.data.listings[i].title.startsWith(titleSearch)) {
              ls.push(resp.data.listings[i]);
            }
          }
        }
        else if (citySearch) {
          for (let i = 0; i < resp.data.listings.length; i++) {
            if (resp.data.listings[i].address.line3.startsWith(citySearch)) {
              ls.push(resp.data.listings[i]);
            }
          }
        }
        else {
          ls = resp.data.listings
        }
        if (pOrder) {
          ls.sort((a, b) => {
            return a.price - b.price;
          })
        }
        else {
          ls.sort((a, b) => {
            return b.price - a.price;
          })
        }
        setlistings([...ls])
      }
    }
    fn();
  }, [titleSearch, citySearch, pOrder])


  return (
    <div style={{ marginTop: "100px" }}>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems:'center' }}>

        <TextField 
          placeholder="Search by Title"
          size="small"
          style={{ backgroundColor: 'lightgray', padding: "10px", borderRadius: "10px", marginRight: "10px", height:'20px' }}
          id="input-with-icon-textfield"
          label=""
          name="title"
          value={titleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
          variant="standard"
          onChange={(e) => { settitleSearch(e.target.value); setcitySearch("") }}
        />
        <TextField
          placeholder="Search by City"
          size="small"
          style={{ backgroundColor: 'lightgray', padding: "10px", borderRadius: "10px", marginRight: "10px", height:'20px' }}
          id="input-with-icon-textfield"
          label=""
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
          variant="standard"
          value={citySearch}
          onChange={(e) => { setcitySearch(e.target.value); settitleSearch("") }}
        />
        <Button style={{ margin: '10px',backgroundColor:'grey', color:'white', fontWeight:'bold', border:'1px solid black' }} variant="outlined">按评价排序</Button>
        <Button style={{ margin: '10px',backgroundColor:'grey', color:'white', fontWeight:'bold', border:'1px solid black' }} variant="outlined" onClick={() => { setpOrder(!pOrder) }}>按价格排序</Button>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label" style={{ color: 'white'}}>房间数</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          // value={age}
          label="Bedrooms"
          size="small"
          // onChange={handleChange}
          style={{ backgroundColor:'gray', color: 'white'}}
        >
          
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
      </FormControl>
        <Button style={{ margin: '10px',backgroundColor:'grey', color:'white', fontWeight:'bold', border:'1px solid black' }} variant="outlined" >选择日期</Button>
      </div>
      <div style={{ marginLeft: '60px'}}>

      {listings.map((e, i) => {
        return (<Card key={i} data={{ ...e, control: false }} />)
      })}
      </div>
    </div>
  )
}

export default Listings
