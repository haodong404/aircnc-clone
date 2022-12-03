import { AppBar, Avatar, Button, TextField } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";
import React from "react";

function Header({ user, dispatch }) {
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    try {
      let response = await axios.post(
        `http://localhost:5005/user/auth/logout`,
        {},
        { headers: { authorization: "Bearer " + token } }
      );
      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        dispatch({
          type: "SET_USER",
          user: null,
        });
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppBar
      style={{
        display: "flex",
        flexDirection: "row",
        height: "3rem",
        justifyContent: "space-between",
        backgroundColor: "white",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      <div className="flex h-full items-center">
        <h2 className=" text-zinc-600 font-semibold font-serif text-lg">
          <a href="/">AIRBNB</a>
        </h2>
      </div>

      {user && (
        <>
          <div className="flex items-center">
            <Button
              style={{
                color: "#202020",
              }}
              onClick={() => {
                navigate("/properties");
              }}
            >
              所有民宿
            </Button>
            <Button
              style={{
                color: "#202020",
              }}
              onClick={() => {
                navigate("/addListing");
              }}
            >
              发布民宿
            </Button>
            <Button
              style={{
                color: "#202020",
              }}
              onClick={() => {
                navigate("/myBooking");
              }}
            >
              我的订单
            </Button>
            <Button
              style={{
                color: "#202020",
              }}
              onClick={() => {
                navigate("/myProperties");
              }}
            >
              已发布的房源
            </Button>
          </div>
        </>
      )}
      {user ? (
        <Button
          label="Logout"
          onClick={(e) => {
            handleLogout(e);
          }}
          style={{}}
        >
          <Avatar style={{
            width: "2rem",
            height: "2rem"
          }}>{name.substring(0, 1).toUpperCase()}</Avatar>{" "}
          <h6 style={{ marginLeft: "10px" }}>注销</h6>
        </Button>
      ) : (
        <Button
          variant="contained"
          style={{ margin: "10px" }}
          onClick={() => {
            navigate("/login");
          }}
        >
          登录
        </Button>
      )}
    </AppBar>
  );
}

export default Header;
