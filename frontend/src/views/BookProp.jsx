import React, { useState, useEffect } from "react";
import axios from "axios";
import DateComp from "../components/DateComp";
import {
  Avatar,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import TextField from "@mui/material/TextField";
import { Paper } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IosShareIcon from "@mui/icons-material/IosShare";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import KeyIcon from "@mui/icons-material/Key";
import PoolIcon from "@mui/icons-material/Pool";
import SailingIcon from "@mui/icons-material/Sailing";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import { comment } from "postcss";
import { Box } from "@mui/system";
import {
  FormLabel,
  IconButton,
  ListItemDecorator,
  Menu,
  Textarea,
} from "@mui/joy";
import {
  FormatBold,
  FormatItalic,
  KeyboardArrowDown,
} from "@mui/icons-material";

function BookProp() {
  const [imgs, setimgs] = useState([]);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  const [listing, setlisting] = useState({ review: [] });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [price, setprice] = useState(0);
  const [rating, setrating] = useState("");
  const random = Math.ceil(Math.random() * 5);

  const handleBooking = async () => {
    try {
      const diffTime = Math.abs(startDate - endDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const res = await axios.post(
        `http://localhost:5005/bookings/new/${id}`,
        {
          dateRange: { start: startDate, end: endDate },
          totalPrice: diffDays * listing.price,
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        navigate("/myBooking");
      }
    } catch (e) {
      console.error(e);
      alert(e.response.data.error);
    }
  };

  const handleInputChange = (e) => {
    const r = e.target.value;
    setrating(r);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let l = listing;
      let ob = {
        text: rating,
      };
      l.reviews.push(ob);
      setlisting({ ...l });
      setrating("");
      // const response = await axios.put(`http://localhost:5005/listings/{listingid}/review/{bookingid}`)
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error);
    }
  };

  useEffect(() => {
    console.log("booknjsdksvdjsnvdjsnvkjdnskj");
    const fn = async () => {
      console.log(id);
      try {
        let res = await axios.get(`http://localhost:5005/listings/${id}`);
        console.log(res);
        if (res.status == 200) {
          setlisting({ ...res.data.listing });
          setprice(res.data.listing.price);
          let ls = [];
          ls.push(res.data.listing.thumbnail);
          if (res.data.listing.metadata.imgs) {
            ls = [...ls, ...res.data.listing.metadata?.imgs];
          }
          setimgs([...ls]);
        }
      } catch (e) {
        console.error(e);
        alert(e?.response?.data?.error);
      }
    };
    fn();
  }, []);

  useEffect(() => {
    const diffTime = Math.abs(startDate - endDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setprice(listing.price * diffDays);
  }, [startDate, endDate]);

  const properties = [
    {
      icon: <WorkspacePremiumIcon sx={{ fontSize: 30, color: "#888" }} />,
      title: "Jenny是超赞的房东",
      desc: "超赞房东经验丰富、评分很高，他们致力于为房客提供优质的住宿体验。",
    },
    {
      icon: <KeyIcon sx={{ fontSize: 30, color: "#888" }} />,
      title: "出色的入住体验",
      desc: "近期有100%房客对入住流程评给出了5星评分。",
    },
    {
      icon: <PoolIcon sx={{ fontSize: 30, color: "#888" }} />,
      title: "深入了解",
      desc: "这是该地区少数几处配备泳池的房源之一。",
    },
  ];

  const amenities = [
    {
      icon: <SailingIcon className="text-blue-600" sx={{ fontSize: 18 }} />,
      title: "海景",
    },
    {
      icon: (
        <BeachAccessIcon className="text-yellow-600" sx={{ fontSize: 18 }} />
      ),
      title: "海滩景观",
    },
    {
      icon: (
        <RestaurantIcon className=" text-purple-600" sx={{ fontSize: 18 }} />
      ),
      title: "可以做饭的厨房",
    },
    {
      icon: <WifiIcon className="text-green-600" sx={{ fontSize: 18 }} />,
      title: "无线网络",
    },
    {
      icon: <LocalParkingIcon className="text-red-600" sx={{ fontSize: 18 }} />,
      title: "免费停车位",
    },
  ];

  const comments = [
    {
      avatar:
        "https://a0.muscache.com/im/pictures/user/58ecdfcf-d2de-4f13-a5f1-305fb37db255.jpg?im_w=240",
      name: "Lydia",
      date: "2022年11月",
      comment:
        "这是我们住过的最好的地方之一！令人惊叹的景色和令人惊叹的日落--我们无法忍受它们。 房源装潢精良，非常舒适。这里有很多贴心的细节。我们住了一周，希望能再来。 喜欢靠近康斯坦提亚（ Constantia ） ，有令人惊叹的酒庄和餐厅。步行即可抵达鸟类世界（ World of Birds ） ，不容错过。 我们还租了邻近的小屋，共有8间卧室可供11人舒适入住。 Jen是一位回复迅速、乐于助人的房东， Thandi进行",
    },
    {
      avatar:
        "https://a0.muscache.com/im/pictures/user/44cf30ad-2a3f-4668-b32a-b196f3f465f6.jpg?im_w=240",
      name: "Zimkitha",
      date: "2022年11月",
      comment:
        "别墅的美丽与图片不符。 即使我们迟到了， Jen也用如此热情的双手迎接我们。 抵达时还提供免费葡萄酒和披萨。 房子设备齐全。 室外/花园灯坏了，游泳池清洁工（原谅术语）无法工作，但我们仍然喜欢室外空间。 非常美丽的住宿体验，感谢Jen出色的房东服务❤️",
    },
  ];
  return (
    <div className="mt-14 md:max-w-5xl mx-auto">
      <head className="flex flex-row justify-between pt-4">
        <div className="flex flex-col gap-3">
          <p className="text-3xl font-sans tracking-widest">{listing.title}</p>
          <div className="flex items-center gap-2">
            <Rating
              name="simple-controlled"
              value={3}
              size="small"
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />{" "}
            <span className=" underline font-bold">
              {listing?.reviews?.length}条评论
            </span>
            <section>
              <span className=" text-xs mr-1">🥇</span>
              <span className="text-sm">超赞房东</span>
            </section>
            <span className="text-sm underline font-bold">
              {listing?.address?.line1}
            </span>
          </div>
        </div>
        <div className="self-end flex gap-2 items-center">
          <Button variant="text" startIcon={<IosShareIcon />}>
            分享
          </Button>
          <Button variant="text" startIcon={<FavoriteBorderIcon />}>
            收藏
          </Button>
        </div>
      </head>

      <section className="grid mt-8 grid-cols-4 grid-rows-2 gap-2">
        {imgs.map((item, i) => (
          <Item key={i} item={item} index={i} />
        ))}
      </section>

      <section className="w-full gap-10 mt-11">
        <div className="float-left w-2/3">
          <section className="flex justify-between border-b-2 pb-6">
            <div>
              <p className="text-2xl font-semibold">由Jenny出租的整套别墅</p>
              <div className="flex gap-2 text-zinc-700">
                <span>可住 {2 * listing?.metadata?.beds} 人</span>·
                <span>{listing?.metadata?.bedrooms} 间卧室</span>·
                <span>{listing?.metadata?.bathrooms} 个卫生间</span>
              </div>
            </div>
            <Avatar
              alt="Remy Sharp"
              src="https://mui.com/static/images/avatar/1.jpg"
              sx={{ width: 56, height: 56 }}
            />
          </section>
          <ul className="mt-4 border-b-2 pb-3">
            {properties.map((element) => {
              return (
                <li className="flex items-center gap-6 py-3">
                  {element.icon}
                  <div>
                    <p className="text-lg font-semibold">{element.title}</p>
                    <p className="text-sm text-zinc-600">{element.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="py-6 text-base indent-6 border-b-2">
            这栋宁静的5卧室别墅可俯瞰豪特湾海滩，与全家人 一起放松身心*
            *从12月开始退房* 5间卧室– 3个卫生间
            这栋宽敞的现代家庭住宅有5间卧室。主卧室（套房内）有一张加大双人床，其余四间卧室配有标准双人床。
            开放式厨房和休息区，壁炉可俯瞰山脉。 厨房设备齐全。
          </p>
          <ul className="mt-3 flex gap-4">
            {amenities.map((element) => (
              <li className="flex gap-6 items-center py-2">
                <Chip
                  variant="outlined"
                  icon={element.icon}
                  label={element.title}
                />
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <section>
              <span className="text-3xl">评论</span>
            </section>
            <ul className="mb-6">
              {comments.map((element) => (
                <li className="pt-6">
                  <div className="flex gap-6">
                    <Avatar
                      alt="Remy Sharp"
                      src={element.avatar}
                      sx={{ width: 42, height: 42 }}
                    ></Avatar>
                    <div>
                      <p>{element.name}</p>
                      <p className="text-sm text-zinc-500">{element.date}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-zinc-600">{element.comment}</p>
                </li>
              ))}
            </ul>
            <FormControl
              style={{
                width: "100%",
              }}
            >
              <Textarea
                id="title-input"
                name="rating"
                placeholder="留下你的看法吧..."
                minRows={5}
                endDecorator={
                  <Box
                    sx={{
                      display: "flex",
                      gap: "var(--Textarea-paddingBlock)",
                      pt: "var(--Textarea-paddingBlock)",
                      borderTop: "1px solid",
                      borderColor: "divider",
                      flex: "auto",
                    }}
                  >
                    <IconButton
                      variant="plain"
                      color="neutral"
                      onClick={(event) => setAnchorEl(event.currentTarget)}
                    >
                      <FormatBold />
                      <KeyboardArrowDown fontSize="md" />
                    </IconButton>
                    <Menu
                      onClose={() => setAnchorEl(null)}
                      size="sm"
                      placement="bottom-start"
                      sx={{ "--List-decorator-size": "24px" }}
                    >
                      {["200", "normal", "bold"].map((weight) => (
                        <MenuItem>
                          <ListItemDecorator></ListItemDecorator>
                        </MenuItem>
                      ))}
                    </Menu>
                    <IconButton variant="soft" color="primary">
                      <FormatItalic />
                    </IconButton>
                    <Button type="submit" sx={{ ml: "auto" }}>
                      评论
                    </Button>
                  </Box>
                }
              />
            </FormControl>
          </div>
        </div>
        <div className="float-right w-1/3 px-6 flex justify-center relative">
          <div class="flex font-sans shadow-xl rounded-2xl border-2 sticky top-0 bg-white transition-all">
            <div class="flex-auto p-6">
              <div class="flex flex-wrap">
                <h1 class="flex-auto text-2xl font-semibold text-slate-900">
                  ￥{price} <span className="text-lg font-normal">晚</span>
                </h1>
                <div class="text-sm font-thin text-slate-700 flex items-center underline">
                  {listing?.reviews?.length} 条评价
                </div>
                <div class="w-full text-sm font-medium text-slate-700 mt-2 flex justify-center">
                  <FormControl sx={{ m: 1, width: "100%" }} size="small">
                    <InputLabel id="demo-select-small">人数</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      label="人数"
                    >
                      <MenuItem value={10}>2</MenuItem>
                      <MenuItem value={20}>4</MenuItem>
                      <MenuItem value={30}>5</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div class="flex items-baseline mb-6 border-b border-slate-200">
                <div class="">
                  <DateComp
                    style={{ zIndex: "100" }}
                    startDate={startDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    setStartDate={setStartDate}
                  />
                </div>
              </div>
              <div class="flex space-x-4 mb-6 text-sm font-medium">
                <div class="flex-auto flex space-x-4">
                  <button
                    disabled={!listing.published}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBooking();
                      navigate("/myBooking");
                    }}
                    className={`${
                      listing.published
                        ? "bg-blue-600 text-white"
                        : "text-zinc-600 bg-zinc-200"
                    } h-10 px-6 w-full font-semibold rounded-md tracking-widest`}
                  >
                    立即预定
                  </button>
                </div>
              </div>
              <p class="text-sm text-slate-700 text-center">您现在不会被收费</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    // <>
    //     <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'rgb(222,222,222)', height: '200%' }}>
    //         {/* picture */}
    //         <Carousel >
    //     {
    //         imgs.map( (item, i) => <Item key={i} item={item} /> )
    //     }
    // </Carousel>

    //         <div >
    //             {/* Title */}
    //             <h1 style={{ marginLeft: "50px" }}>{listing.title}</h1>
    //             <div style={{display:'flex',marginLeft: "50px"}}>
    //             {
    //                 Array(random).fill().map((_, i) => (<div style={{marginRight:'2px'}}>⭐</div>))
    //             }

    //         </div>
    //             <h2 style={{ marginLeft: "50px" }}>{listing.postedOn}</h2>
    //             {/* Price */}
    //             <h2 style={{ marginLeft: "50px" }}>{"$ " + price}</h2>
    //         </div>

    //         <div style={{ marginLeft: "50px", border: '2px solid gray', width: '500px', padding: '10px' }}>
    //             <p>{listing?.address?.line1}</p>
    //             <p>{listing?.address?.line2}</p>
    //             <p>{listing?.address?.line3}</p>
    //         </div>

    //         {/* Bedroom */}
    //         <h4 style={{ marginLeft: "50px" }}>客房数: {listing?.metadata?.bedrooms}</h4>
    //         <h4 style={{ marginLeft: "50px" }}>床位数: {listing?.metadata?.bedrooms}</h4>
    //         <h4 style={{ marginLeft: "50px" }}>卫生间数: {listing?.metadata?.bathrooms}</h4>
    //         <p style={{ marginLeft: "50px" }}>{"设施: "+listing?.metadata?.amenities}</p>
    //         <h3 style={{ marginLeft: "50px" }}> 评论</h3>

    //         {listing?.reviews?.length > 0 &&<div style={{marginLeft:'50px', marginBottom:'10px'}}>
    //             {listing.reviews.map((r, i)=>{
    //                 return <p key={i} style={{margin:'5px'}}>{"•  "+r.text}</p>
    //             })}
    //         </div>}
    //         <form onSubmit={handleSubmit} style={{marginLeft:'50px'}}>

    //             <TextField
    //                 id="title-input"
    //                 name="rating"
    //                 label="写下你的评价"
    //                 type="text"
    //                 multiline
    //                 rows={3}
    //                 value={rating}
    //                 onChange={handleInputChange}
    //                 style={{ marginBottom: "10px" , width:'60%'}}
    //             />
    //             <Button variant="contained" type="submit" style={{ backgroundColor: 'grey', marginLeft: '10px' }}>
    //                 提交
    //             </Button>

    //          </form>

    //         <div style={{ width: '200px', marginLeft: '50px', display: 'flex', height: "50px", width: "200px" }}>
    //             <DateComp style={{ zIndex: '100' }} startDate={startDate} endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate} />
    //             {listing.published ? <Button style={{ backgroundColor: 'red', marginLeft: '10px', borderRadius: "10px", color: 'white' }} variant="outlined" onClick={() => {
    //                 handleBooking()
    //                 navigate('/myBooking');
    //             }} >订购</Button> : <tagg style={{ marginLeft: '10px' }}>还未发布</tagg>}
    //         </div>

    //     </div>
    //     <div style={{ height: '500px', background: 'rgb(222,222,222)' }}></div></>
  );
}

function Item(props) {
  return (
    <img
      className={`${
        props.index == 0
          ? "col-span-2 row-span-2 rounded-tl-2xl rounded-bl-2xl"
          : ""
      }
      ${props.index == 2 ? "rounded-tr-2xl" : ""}
      ${props.index == 4 ? "rounded-br-2xl" : ""}
      h-full w-full hover:brightness-90 transition-all`}
      src={props.item}
      alt=""
    />
  );
}

export default BookProp;
