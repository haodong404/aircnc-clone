import React, { useState } from "react";
import "./Banner.css";
import { Button } from "@mui/material";
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import icon from "../assets/airbnb.png";

function Banner() {
  const history = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div className="banner flex items-center px-36 absolute top-0 left-0 right-0 bottom-0 ">
      <div className=" text-zinc-100 bg-gray-600/30 backdrop-blur-sm px-10 py-10 rounded-3xl">
        <h1 className="text-6xl font-sans font-bold tracking-widest">
          还在徘徊？不确定要住哪里？
        </h1>
        <h5 className="font-sans text-2xl text-zinc-300">
          AIRBNB给你一个舒适的家
        </h5>
        <button
          class=" px-7 mt-4 font-semibold py-3 text-xl rounded-md bg-blue-500 text-white"
          onClick={() => {
            history("/properties");
          }}
          type="submit"
        >
          寻找住宿
        </button>
      </div>
    </div>
  );
}

export default Banner;
