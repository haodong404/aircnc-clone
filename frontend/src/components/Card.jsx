import React from "react";
import "./Card.css";
import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

function Card({ data, handleDelete, ob, fetchTrigger, setfetchTrigger }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const random = Math.ceil(Math.random() * 5);
  const handlePublish = async (id) => {
    try {
      let start = new Date();
      let end = new Date(new Date().getFullYear(), 11, 31);

      let response = await axios.put(
        `http://localhost:5005/listings/publish/${id}`,
        {
          availability: [{ start: start, end: end }],
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 200) {
        setfetchTrigger(fetchTrigger + 1);
      }
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error);
    }
  };

  const handleUnpublish = async (id) => {
    try {
      let response = await axios.put(
        `http://localhost:5005/listings/unpublish/${id}`,
        {},
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 200) {
        setfetchTrigger(fetchTrigger + 1);
      }
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error);
    }
  };

  return (
    <div class="flex font-sans bg-slate-100 shadow-lg rounded-lg">
      <div class="flex-none w-48 relative">
        <img
          src={data.thumbnail}
          alt=""
          class="absolute inset-0 w-full h-full object-cover rounded-lg"
          loading="lazy"
        />
      </div>
      <form class="flex-auto p-6">
        <div class="flex flex-wrap">
          <h1 class="flex-auto text-lg font-semibold text-slate-900">
            {data.title}
          </h1>
          <div class="text-lg font-semibold text-blue-400">
            {"￥" + data.price}
          </div>
          <div class="w-full flex flex-row text-sm font-medium text-slate-700 mt-2">
            {Array(random)
              .fill()
              .map((_, i) => (
                <div style={{ marginRight: "2px" }}>⭐</div>
              ))}
          </div>
        </div>
        <p class="text-sm text-slate-700 my-3">{data.address.line1}</p>
        <div class="flex space-x-4 mb-6 text-sm font-medium">
          <div class="flex-auto flex space-x-4">
            {data.control && (
              <>
                <button
                  onClick={() => {
                    handlePublish(data.id);
                  }}
                  class="h-10 px-6 font-semibold tracking-widest rounded-md bg-green-600 text-white"
                >
                  发布
                </button>
                <button
                  onClick={() => {
                    handleUnpublish(data.id);
                  }}
                  class="h-10 px-6 font-semibold tracking-widest rounded-md bg-red-600 text-white"
                >
                  取消发布
                </button>
                <button
                  class="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200"
                  type="button"
                  aria-label="Like"
                >
                  <EditIcon sx={{ fontSize: 20 }} />
                </button>
              </>
            )}
            {!data.control && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    localStorage.setItem("id", data.id);
                    navigate("/book");
                  }}
                  class="h-10 px-6 font-semibold tracking-widest rounded-md bg-blue-600 text-white"
                >
                  立即预定
                </button>
                <button
                  class="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200"
                  type="button"
                  aria-label="Like"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Card;
