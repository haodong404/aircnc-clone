import React from "react";
import "./BCard.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

function BCard({ booking, data, handleAccept, handleDecline, handleDelete }) {
  return (
    <div class="flex font-sans bg-slate-100 shadow-lg rounded-lg">
      <div class="flex-none w-48 relative">
        <img
          src={data[booking.listingId].thumbnail}
          alt=""
          class="absolute inset-0 w-full h-full object-cover rounded-lg"
          loading="lazy"
        />
      </div>
      <div class="flex-auto p-6">
        <div class="flex flex-wrap">
          <h1 class="flex-auto text-lg font-semibold text-slate-900">
            状态：{booking?.status}
          </h1>
          <div class="text-lg font-semibold text-blue-400">
            ￥{booking?.totalPrice}
          </div>
        </div>
        <p class="text-sm text-slate-700 my-3">{}</p>
        <div class="flex space-x-4 mb-6 text-sm font-medium">
          <div class="flex-auto flex space-x-4">
            <button
              disabled={booking.status !== "pending"}
              onClick={(e) => {
                e.stopPropagation();
                handleAccept(booking.id);
              }}
              class={`h-10 px-6 font-semibold tracking-widest rounded-md text-white ${
                booking.status === "pending"
                  ? " bg-green-600 text-green-100"
                  : "text-zinc-700 bg-zinc-300"
              }`}
            >
              同意
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleUnpublish(data.id);
              }}
              class="h-10 px-6 font-semibold tracking-widest rounded-md bg-red-600 text-white"
            >
              拒绝
            </button>
            <button
              class="flex-none bg-red-100 flex items-center justify-center w-9 h-9 rounded-md text-red-300 border border-red-200"
              type="button"
              aria-label="Like"
            >
              <DeleteIcon className="text-red-600" sx={{ fontSize: 20 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
    // <div className='card'>
    //     <div></div>
    //     {data[booking.listingId] && <img src={data[booking.listingId].thumbnail} alt="" />}
    //     <div className="card__info">
    //         <h4>{'状态: '+ booking?.status}</h4>
    //         <h4>{'总金额: ￥ '+ booking?.totalPrice}</h4>
    //         {booking.status==="pending"&&<><Button onClick={()=>{handleAccept(booking.id)}}>同意</Button>
    //         <Button onClick={()=>{handleDecline(booking.id)}}>拒绝</Button></>}
    //         <Button onClick={()=>{handleDelete(booking.id)}}>删除</Button>
    //     </div>
    // </div>
  );
}

export default BCard;
