import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Search from "@mui/icons-material/Search";
import PeopleIcon from "@mui/icons-material/People";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function Listings() {
  const [titleSearch, settitleSearch] = useState("");
  const [citySearch, setcitySearch] = useState("");
  const [listings, setlistings] = useState([]);
  const [pOrder, setpOrder] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = async () => {
      let resp = await axios.get(`http://localhost:5005/listings`);
      if (resp.status === 200) {
        let ls = [];
        if (titleSearch) {
          for (let i = 0; i < resp.data.listings.length; i++) {
            if (resp.data.listings[i].title.startsWith(titleSearch)) {
              ls.push(resp.data.listings[i]);
            }
          }
        } else if (citySearch) {
          for (let i = 0; i < resp.data.listings.length; i++) {
            if (resp.data.listings[i].address.line3.startsWith(citySearch)) {
              ls.push(resp.data.listings[i]);
            }
          }
        } else {
          ls = resp.data.listings;
        }
        if (pOrder) {
          ls.sort((a, b) => {
            return a.price - b.price;
          });
        } else {
          ls.sort((a, b) => {
            return b.price - a.price;
          });
        }
        setlistings([...ls]);
      }
    };
    fn();
  }, [titleSearch, citySearch, pOrder]);

  return (
    <div className="mt-12 px-44">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        className=" px-4 gap-10 py-4"
      >
        <TextField
          placeholder="搜索标题"
          size="small"
          style={{
            color: "white",
          }}
          id="input-with-icon-textfield"
          label="根据标题搜索"
          variant="filled"
          name="title"
          value={titleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            settitleSearch(e.target.value);
            setcitySearch("");
          }}
        />
        <TextField
          placeholder="城市名称"
          size="small"
          id="input-with-icon-textfield"
          label="根据城市搜索"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
          variant="filled"
          value={citySearch}
          onChange={(e) => {
            setcitySearch(e.target.value);
            settitleSearch("");
          }}
        />
        <Button variant="outlined">按评价排序</Button>
        <Button
          variant="outlined"
          onClick={() => {
            setpOrder(!pOrder);
          }}
        >
          按价格排序
        </Button>
        <Button variant="outlined">选择日期</Button>
        <FormControl sx={{ m: 1, minWidth: 115 }} size="small">
          <InputLabel id="demo-simple-select-helper-label">房间数</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="房间"
            size="small"
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="grid grid-cols-2 gap-9">
        {listings.map((e, i) => {
          return <Card key={i} data={{ ...e, control: false }} />;
        })}
      </div>
    </div>
  );
}

export default Listings;
